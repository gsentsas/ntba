const PAGE_WIDTH = 595;
const PAGE_HEIGHT = 842;
const MARGIN_X = 46;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
const BODY_FONT_SIZE = 11;
const BODY_LINE_HEIGHT = 16;
const SECTION_GAP = 18;
const SECTION_LABEL_FONT_SIZE = 9;
const SMALL_TEXT_SIZE = 9;

const COLORS = {
    ink: [0.11, 0.14, 0.17],
    muted: [0.38, 0.43, 0.49],
    green: [0.11, 0.53, 0.42],
    greenDark: [0.06, 0.39, 0.31],
    greenSoft: [0.93, 0.97, 0.95],
    greenMid: [0.77, 0.89, 0.84],
    border: [0.88, 0.91, 0.9],
    white: [1, 1, 1],
    amber: [0.86, 0.53, 0.16],
};

const CP1252_MAP = new Map([
    ['€', 0x80],
    ['‚', 0x82],
    ['ƒ', 0x83],
    ['„', 0x84],
    ['…', 0x85],
    ['†', 0x86],
    ['‡', 0x87],
    ['ˆ', 0x88],
    ['‰', 0x89],
    ['Š', 0x8a],
    ['‹', 0x8b],
    ['Œ', 0x8c],
    ['Ž', 0x8e],
    ['‘', 0x91],
    ['’', 0x92],
    ['“', 0x93],
    ['”', 0x94],
    ['•', 0x95],
    ['–', 0x96],
    ['—', 0x97],
    ['˜', 0x98],
    ['™', 0x99],
    ['š', 0x9a],
    ['›', 0x9b],
    ['œ', 0x9c],
    ['ž', 0x9e],
    ['Ÿ', 0x9f],
]);

function formatNumber(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function toColor(color) {
    return color.map((part) => formatNumber(part)).join(' ');
}

function encodePdfHex(value) {
    const bytes = [];

    for (const char of String(value ?? '')) {
        const code = char.codePointAt(0) ?? 0x3f;

        if (CP1252_MAP.has(char)) {
            bytes.push(CP1252_MAP.get(char));
            continue;
        }

        if (code >= 0x20 && code <= 0x7e) {
            bytes.push(code);
            continue;
        }

        if (code >= 0xa0 && code <= 0xff) {
            bytes.push(code);
            continue;
        }

        if (code === 0x0a || code === 0x0d || code === 0x09) {
            bytes.push(0x20);
            continue;
        }

        bytes.push(0x3f);
    }

    return Buffer.from(bytes).toString('hex').toUpperCase();
}

function stripMarkdown(text) {
    return String(text ?? '')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')
        .replace(/\r/g, '')
        .trim();
}

function normalizeLine(text) {
    return String(text ?? '')
        .replace(/\s+/g, ' ')
        .trim();
}

function estimateTextWidth(text, fontSize = BODY_FONT_SIZE) {
    let units = 0;

    for (const char of String(text)) {
        if ('ilI.,:;!|'.includes(char)) {
            units += 0.28;
        } else if ('MW@#%&'.includes(char)) {
            units += 0.9;
        } else if ('()[]{}"'.includes(char)) {
            units += 0.35;
        } else if (char === ' ') {
            units += 0.28;
        } else {
            units += 0.56;
        }
    }

    return units * fontSize;
}

function wrapText(text, maxWidth, fontSize = BODY_FONT_SIZE) {
    const normalized = normalizeLine(text);

    if (!normalized) {
        return [];
    }

    const words = normalized.split(' ');
    const lines = [];
    let current = '';

    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;

        if (
            current &&
            estimateTextWidth(candidate, fontSize) > maxWidth
        ) {
            lines.push(current);
            current = word;
        } else {
            current = candidate;
        }
    }

    if (current) {
        lines.push(current);
    }

    return lines;
}

function parseSectionBody(text) {
    const content = stripMarkdown(text);

    if (!content) {
        return [];
    }

    return content.split('\n').map((rawLine) => {
        const line = rawLine.trim();

        if (!line) {
            return { type: 'spacer' };
        }

        const bulletMatch = line.match(/^[-*]\s+(.*)$/);
        const numberedMatch = line.match(/^\d+\.\s+(.*)$/);

        if (bulletMatch) {
            return { type: 'bullet', text: normalizeLine(bulletMatch[1]) };
        }

        if (numberedMatch) {
            return { type: 'bullet', text: normalizeLine(numberedMatch[1]) };
        }

        return { type: 'paragraph', text: normalizeLine(line) };
    });
}

function layoutSection(section) {
    const heading = normalizeLine(section.heading || 'Section');
    const blocks = parseSectionBody(section.body ?? '');
    const lines = [];

    for (const block of blocks) {
        if (block.type === 'spacer') {
            lines.push({ type: 'spacer', height: 8 });
            continue;
        }

        if (block.type === 'bullet') {
            const wrapped = wrapText(
                block.text,
                CONTENT_WIDTH - 26,
                BODY_FONT_SIZE,
            );

            wrapped.forEach((line, index) => {
                lines.push({
                    type: 'text',
                    text: line,
                    bullet: index === 0,
                    indent: index === 0 ? 18 : 32,
                    font: 'F1',
                    size: BODY_FONT_SIZE,
                    color: COLORS.ink,
                });
            });

            continue;
        }

        const wrapped = wrapText(block.text, CONTENT_WIDTH - 12, BODY_FONT_SIZE);

        wrapped.forEach((line) => {
            lines.push({
                type: 'text',
                text: line,
                indent: 12,
                font: 'F1',
                size: BODY_FONT_SIZE,
                color: COLORS.ink,
            });
        });
    }

    const bodyHeight = lines.reduce(
        (total, line) => total + (line.type === 'spacer' ? line.height : BODY_LINE_HEIGHT),
        0,
    );

    return {
        heading,
        lines,
        height: 36 + bodyHeight + 16,
    };
}

function createPage(pageNumber, title, documentLabel) {
    const commands = [];
    let y = PAGE_HEIGHT - 52;

    if (pageNumber === 1) {
        commands.push(
            `q ${toColor(COLORS.greenDark)} rg ${MARGIN_X} 714 ${CONTENT_WIDTH} 92 re f Q`,
        );
    } else {
        commands.push(
            `q ${toColor(COLORS.greenMid)} rg ${MARGIN_X} 782 ${CONTENT_WIDTH} 2 re f Q`,
        );
        commands.push(
            `q ${toColor(COLORS.greenSoft)} rg ${MARGIN_X} 738 ${CONTENT_WIDTH} 34 re f Q`,
        );
        commands.push(
            `BT /F2 11 Tf ${toColor(COLORS.greenDark)} rg 1 0 0 1 ${MARGIN_X + 14} 751 Tm <${encodePdfHex(
                documentLabel || title,
            )}> Tj ET`,
        );
        y = 716;
    }

    commands.push(
        `q ${toColor(COLORS.border)} RG 1 w ${MARGIN_X} 36 m ${PAGE_WIDTH - MARGIN_X} 36 l S Q`,
    );
    commands.push(
        `BT /F1 9 Tf ${toColor(COLORS.muted)} rg 1 0 0 1 ${MARGIN_X} 22 Tm <${encodePdfHex(
            'BAC Sénégal IA',
        )}> Tj ET`,
    );
    commands.push(
        `BT /F1 9 Tf ${toColor(COLORS.muted)} rg 1 0 0 1 ${PAGE_WIDTH - MARGIN_X - 36} 22 Tm <${encodePdfHex(
            `Page ${pageNumber}`,
        )}> Tj ET`,
    );

    return {
        commands,
        y,
    };
}

function drawText(commands, {
    text,
    x,
    y,
    font = 'F1',
    size = BODY_FONT_SIZE,
    color = COLORS.ink,
}) {
    commands.push(
        `BT /${font} ${size} Tf ${toColor(color)} rg 1 0 0 1 ${formatNumber(
            x,
        )} ${formatNumber(y)} Tm <${encodePdfHex(text)}> Tj ET`,
    );
}

function drawMetaCard(commands, index, item) {
    const gap = 10;
    const width = (CONTENT_WIDTH - gap * 2) / 3;
    const x = MARGIN_X + index * (width + gap);
    const y = 654;

    commands.push(
        `q ${toColor(COLORS.greenSoft)} rg ${formatNumber(x)} ${y} ${formatNumber(
            width,
        )} 46 re f Q`,
    );
    commands.push(
        `q ${toColor(COLORS.greenMid)} RG 0.8 w ${formatNumber(x)} ${y} ${formatNumber(
            width,
        )} 46 re S Q`,
    );
    drawText(commands, {
        text: String(item.label ?? '').toUpperCase(),
        x: x + 12,
        y: y + 28,
        font: 'F2',
        size: SMALL_TEXT_SIZE,
        color: COLORS.greenDark,
    });
    drawText(commands, {
        text: item.value,
        x: x + 12,
        y: y + 12,
        font: 'F1',
        size: 11,
        color: COLORS.ink,
    });
}

function createContentPages({
    title,
    subtitle,
    documentLabel,
    meta,
    sections,
}) {
    const pages = [];
    let pageNumber = 1;
    let page = createPage(pageNumber, title, documentLabel);

    if (pageNumber === 1) {
        drawText(page.commands, {
            text: documentLabel || 'DOCUMENT AGENT',
            x: MARGIN_X + 18,
            y: 784,
            font: 'F2',
            size: 10,
            color: COLORS.greenSoft,
        });
        drawText(page.commands, {
            text: title,
            x: MARGIN_X + 18,
            y: 754,
            font: 'F2',
            size: 22,
            color: COLORS.white,
        });

        if (subtitle) {
            const subtitleLines = wrapText(subtitle, CONTENT_WIDTH - 36, 10);
            subtitleLines.slice(0, 2).forEach((line, index) => {
                drawText(page.commands, {
                    text: line,
                    x: MARGIN_X + 18,
                    y: 734 - index * 12,
                    font: 'F1',
                    size: 10,
                    color: COLORS.greenSoft,
                });
            });
        }

        meta.slice(0, 3).forEach((item, index) => drawMetaCard(page.commands, index, item));
        page.y = 628;
    }

    for (const [index, rawSection] of sections.entries()) {
        const section = layoutSection(rawSection);

        if (page.y - section.height < 72) {
            pages.push(page.commands.join('\n'));
            pageNumber += 1;
            page = createPage(pageNumber, title, documentLabel);
        }

        drawText(page.commands, {
            text: `SECTION ${index + 1}`,
            x: MARGIN_X + 12,
            y: page.y,
            font: 'F2',
            size: SECTION_LABEL_FONT_SIZE,
            color: COLORS.green,
        });

        page.commands.push(
            `q ${toColor(COLORS.green)} rg ${MARGIN_X} ${formatNumber(
                page.y - 6,
            )} 4 30 re f Q`,
        );

        drawText(page.commands, {
            text: section.heading,
            x: MARGIN_X + 16,
            y: page.y - 20,
            font: 'F2',
            size: 15,
            color: COLORS.ink,
        });

        page.commands.push(
            `q ${toColor(COLORS.border)} RG 0.8 w ${MARGIN_X + 12} ${formatNumber(
                page.y - 30,
            )} m ${PAGE_WIDTH - MARGIN_X} ${formatNumber(page.y - 30)} l S Q`,
        );

        let lineY = page.y - 50;

        for (const line of section.lines) {
            if (line.type === 'spacer') {
                lineY -= line.height;
                continue;
            }

            if (line.bullet) {
                drawText(page.commands, {
                    text: '•',
                    x: MARGIN_X + 12,
                    y: lineY,
                    font: 'F2',
                    size: BODY_FONT_SIZE,
                    color: COLORS.greenDark,
                });
            }

            drawText(page.commands, {
                text: line.text,
                x: MARGIN_X + line.indent,
                y: lineY,
                font: line.font,
                size: line.size,
                color: line.color,
            });
            lineY -= BODY_LINE_HEIGHT;
        }

        page.y = lineY - SECTION_GAP;
    }

    pages.push(page.commands.join('\n'));
    return pages;
}

export function createSimplePdfBuffer({
    title,
    subtitle = '',
    documentLabel = 'AGENT INTERNE',
    meta = [],
    sections = [],
    fileName = 'document.pdf',
}) {
    const pages = createContentPages({
        title: normalizeLine(title || 'Document'),
        subtitle: normalizeLine(subtitle || ''),
        documentLabel: normalizeLine(documentLabel || 'AGENT INTERNE'),
        meta: Array.isArray(meta) ? meta : [],
        sections,
    });

    const objects = [];
    const pageObjectIds = [];
    const fontRegularId = 3;
    const fontBoldId = 4;
    let nextObjectId = 5;

    for (const pageContent of pages) {
        const pageId = nextObjectId;
        const contentId = nextObjectId + 1;
        pageObjectIds.push(pageId);

        objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`;
        objects[contentId] =
            `<< /Length ${Buffer.byteLength(pageContent, 'ascii')} >>\nstream\n${pageContent}\nendstream`;
        nextObjectId += 2;
    }

    objects[1] = '<< /Type /Catalog /Pages 2 0 R >>';
    objects[2] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjectIds.length} >>`;
    objects[3] =
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
    objects[4] =
        '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>';

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    const maxObjectId = objects.length - 1;

    for (let id = 1; id <= maxObjectId; id += 1) {
        offsets[id] = Buffer.byteLength(pdf, 'ascii');
        pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(pdf, 'ascii');
    pdf += `xref\n0 ${maxObjectId + 1}\n`;
    pdf += '0000000000 65535 f \n';

    for (let id = 1; id <= maxObjectId; id += 1) {
        pdf += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    }

    pdf += `trailer\n<< /Size ${maxObjectId + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    return {
        file_name: fileName,
        mime_type: 'application/pdf',
        buffer: Buffer.from(pdf, 'ascii'),
    };
}
