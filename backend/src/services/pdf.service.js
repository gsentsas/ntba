function escapePdfText(value) {
    return String(value)
        .replaceAll('\\', '\\\\')
        .replaceAll('(', '\\(')
        .replaceAll(')', '\\)');
}

function stripMarkdown(text) {
    return String(text ?? '')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')
        .replace(/^\s*[-*]\s+/gm, '- ')
        .replace(/^\s*\d+\.\s+/gm, '- ')
        .replace(/\r/g, '')
        .trim();
}

function wrapLine(line, maxChars = 88) {
    if (line.length <= maxChars) {
        return [line];
    }

    const words = line.split(/\s+/);
    const lines = [];
    let current = '';

    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;

        if (candidate.length <= maxChars) {
            current = candidate;
        } else {
            if (current) {
                lines.push(current);
            }
            current = word;
        }
    }

    if (current) {
        lines.push(current);
    }

    return lines;
}

function toPdfLines(title, sections = []) {
    const lines = [String(title ?? 'Document')];

    for (const section of sections) {
        lines.push('');

        if (section.heading) {
            lines.push(String(section.heading));
        }

        const content = stripMarkdown(section.body ?? '');

        if (!content) {
            continue;
        }

        for (const paragraph of content.split('\n')) {
            const trimmed = paragraph.trim();

            if (!trimmed) {
                lines.push('');
                continue;
            }

            lines.push(...wrapLine(trimmed));
        }
    }

    return lines;
}

function buildPageContent(lines) {
    const commands = ['BT', '/F1 11 Tf'];
    let y = 800;

    for (const line of lines) {
        const printable = line.length > 0 ? line : ' ';
        commands.push(`1 0 0 1 48 ${y} Tm (${escapePdfText(printable)}) Tj`);
        y -= line === '' ? 10 : 16;
    }

    commands.push('ET');
    return commands.join('\n');
}

export function createSimplePdfBuffer({ title, sections = [], fileName = 'document.pdf' }) {
    const rawLines = toPdfLines(title, sections);
    const pages = [];
    let current = [];

    for (const line of rawLines) {
        current.push(line);

        if (current.length >= 46) {
            pages.push(current);
            current = [];
        }
    }

    if (current.length > 0) {
        pages.push(current);
    }

    const objects = [];
    const pageObjectIds = [];
    const fontId = 3;
    let nextObjectId = 4;

    for (const pageLines of pages) {
        const pageId = nextObjectId;
        const contentId = nextObjectId + 1;
        pageObjectIds.push(pageId);

        const content = buildPageContent(pageLines);
        objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
        objects[contentId] =
            `<< /Length ${Buffer.byteLength(content, 'utf8')} >>\nstream\n${content}\nendstream`;
        nextObjectId += 2;
    }

    objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objects[2] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjectIds.length} >>`;
    objects[3] = '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    const maxObjectId = objects.length - 1;

    for (let id = 1; id <= maxObjectId; id += 1) {
        offsets[id] = Buffer.byteLength(pdf, 'utf8');
        pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, 'utf8');
    pdf += `xref\n0 ${maxObjectId + 1}\n`;
    pdf += '0000000000 65535 f \n';

    for (let id = 1; id <= maxObjectId; id += 1) {
        pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${maxObjectId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return {
        file_name: fileName,
        mime_type: 'application/pdf',
        buffer: Buffer.from(pdf, 'utf8'),
    };
}
