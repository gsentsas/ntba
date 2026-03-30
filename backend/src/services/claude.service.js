import Anthropic from '@anthropic-ai/sdk';
import Redis from 'ioredis';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

import { getDaysUntilBac } from '../utils/helpers.js';

const MODEL_NAME = 'claude-sonnet-4-20250514';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promptPath = path.resolve(__dirname, '../../prompts/tutor.system.md');

const generatedExerciseSchema = z.object({
    title: z.string().min(5),
    question_text: z.string().min(10),
    options: z.array(
        z.object({
            label: z.enum(['A', 'B', 'C', 'D']),
            text: z.string().min(1),
        }),
    ).length(4),
    correct_answer: z.enum(['A', 'B', 'C', 'D']),
    explanation: z.string().min(10),
    hints: z.array(z.string().min(3)).min(2).max(3),
    estimated_time_minutes: z.number().int().min(1).max(60),
    points: z.number().int().min(1).max(100),
});

let redisClient;

function getAnthropicClient() {
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.includes('REMPLACER')) {
        return null;
    }

    return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

function getRedisClient() {
    if (redisClient) {
        return redisClient;
    }

    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
        return null;
    }

    redisClient = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        lazyConnect: true,
    });

    redisClient.on('error', () => {});
    return redisClient;
}

const summaryMemoryCache = new Map();

function buildFallbackChapterSummary(chapter, subject) {
    return `### ${chapter.title}\n\n- **Matière** : ${subject.name}\n- **Idée clé** : comprendre la notion centrale du chapitre.\n- **Formules** : ${(chapter.key_formulas ?? []).join(' ; ')}\n- **Conseil BAC** : refaire au moins un QCM et un exercice rédigé.\n- **Mnémo** : partir du cours puis vérifier avec une application simple.`;
}

function inferLevel(context) {
    const totalPoints = Number(context?.user?.total_points ?? 0);

    if (totalPoints >= 200) {
        return 'Avancé';
    }

    if (totalPoints >= 50) {
        return 'Intermédiaire';
    }

    return 'Débutant';
}

async function buildSystemPrompt(context) {
    const template = await readFile(promptPath, 'utf8');

    return template
        .replaceAll('{{prenom}}', context?.user?.prenom ?? 'Élève')
        .replaceAll('{{serie}}', context?.user?.serie_code ?? 'S2')
        .replaceAll('{{matiere}}', context?.subject?.name ?? 'Général')
        .replaceAll('{{chapitre}}', context?.chapter?.title ?? 'Aucun chapitre sélectionné')
        .replaceAll('{{niveau}}', inferLevel(context))
        .replaceAll('{{jours_restants}}', String(getDaysUntilBac()));
}

function buildFallbackTutorText(message, context) {
    const subject = context?.subject?.name ?? 'ta matière';
    const chapter = context?.chapter?.title ?? 'ce point du programme';
    const formulas = Array.isArray(context?.chapter?.key_formulas) && context.chapter.key_formulas.length > 0
        ? context.chapter.key_formulas : null;
    const mnemonics = Array.isArray(context?.chapter?.mnemonics) && context.chapter.mnemonics.length > 0
        ? context.chapter.mnemonics : null;
    const summary = context?.chapter?.summary ?? null;

    const lines = [
        `**${subject} — ${chapter}**\n`,
    ];

    if (summary) {
        lines.push(summary);
        lines.push('');
    } else {
        lines.push(`Pour répondre à ta question sur *"${message}"*, voici les points essentiels du chapitre :\n`);
    }

    if (formulas) {
        lines.push('**Formules et définitions clés :**');
        formulas.slice(0, 5).forEach((f) => lines.push(`- ${f}`));
        lines.push('');
    }

    if (mnemonics) {
        lines.push('**Mémo BAC :**');
        mnemonics.slice(0, 3).forEach((m) => lines.push(`- ${m}`));
        lines.push('');
    }

    lines.push('**Méthode de travail :**');
    lines.push(`1. Identifie la notion centrale liée à "${message}".`);
    lines.push('2. Rédige la définition ou formule utile de mémoire.');
    lines.push('3. Applique-la sur un exemple simple du BAC Sénégal.');
    lines.push('4. Vérifie avec ton cours ou annales.');

    return lines.join('\n');
}

function buildFallbackPhotoCorrection(subject) {
    const subjectName = subject?.name ?? 'la matière choisie';

    return {
        correction: [
            `Correction de secours pour **${subjectName}**.`,
            '',
            "Je n'ai pas pu lancer l'analyse avancée de l'image, mais voici une méthode fiable pour t'auto-corriger :",
            '1. relis attentivement la consigne et surligne les verbes demandés ;',
            '2. vérifie les définitions, formules ou dates clés attendues ;',
            '3. repère les oublis de justification, les erreurs de calcul ou les confusions de vocabulaire ;',
            '4. réécris une version plus propre de ta réponse avec une idée par ligne ou par paragraphe.',
            '',
            'Conseil BAC : compare ta copie au cours, puis refais un exercice proche pour consolider.',
        ].join('\n'),
        note_estimee: 10,
        points_a_retravailler: [
            'Relire la consigne mot par mot',
            'Justifier davantage la réponse',
            'Vérifier les notions ou formules clés du chapitre',
        ],
    };
}

function buildFallbackSimulationSubject(subject, serie, year) {
    const title = `Simulation BAC ${year} - ${subject.name} (${serie})`;

    return {
        subject_text: [
            `# ${title}`,
            '',
            '## Consignes générales',
            '- Lis toutes les questions avant de commencer.',
            '- Rédige de manière claire et structurée.',
            '- Justifie les étapes importantes de ton raisonnement.',
            '',
            '## Partie 1 - Restitution du cours',
            `1. Présente les notions essentielles du programme de **${subject.name}** pour la série **${serie}**.`,
            '2. Donne deux applications ou exemples classiques vus au BAC.',
            '',
            '## Partie 2 - Application guidée',
            `3. Traite un exercice type portant sur un chapitre central de **${subject.name}**.`,
            '4. Explique chaque étape de ta méthode avant de donner le résultat final.',
            '',
            '## Partie 3 - Réflexion et synthèse',
            '5. Rédige une réponse argumentée ou une conclusion structurée selon la logique de la matière.',
        ].join('\n'),
        correction_key: [
            `# Corrigé indicatif - ${subject.name}`,
            '',
            '## Ce qu’on attend',
            '- Une bonne maîtrise du cours.',
            '- Une méthode claire et progressive.',
            '- Des exemples précis, justes et directement liés au programme.',
            '',
            '## Barème indicatif',
            '- Partie 1 : 6 points',
            '- Partie 2 : 8 points',
            '- Partie 3 : 6 points',
            '',
            '## Conseils de correction',
            '- Valoriser les réponses structurées.',
            '- Retirer des points en cas de confusion majeure sur les notions de base.',
            '- Accorder du crédit aux démarches justes même si le résultat final est incomplet.',
        ].join('\n'),
        duration_minutes: 180,
    };
}

async function streamFallback(text, onChunk) {
    const chunks = text.match(/.{1,80}/g) ?? [text];

    for (const chunk of chunks) {
        onChunk(chunk);
        await new Promise((resolve) => setTimeout(resolve, 10));
    }

    return {
        fullResponse: text,
        inputTokens: Math.ceil(text.length / 4),
        outputTokens: Math.ceil(text.length / 4),
        provider: 'fallback',
    };
}

export async function streamTutorResponse(message, conversationHistory, context, onChunk) {
    const client = getAnthropicClient();
    const system = await buildSystemPrompt(context);
    const history = (conversationHistory ?? []).slice(-10).map((item) => ({
        role: item.role,
        content: item.content,
    }));

    if (!client) {
        const fallbackText = buildFallbackTutorText(message, context);
        return streamFallback(fallbackText, onChunk);
    }

    try {
        const stream = await client.messages.stream({
            model: MODEL_NAME,
            max_tokens: 1024,
            system,
            messages: [...history, { role: 'user', content: message }],
        });

        let fullResponse = '';
        for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
                const text = event.delta.text;
                fullResponse += text;
                onChunk(text);
            }
        }

        const finalMessage = await stream.finalMessage();

        return {
            fullResponse,
            inputTokens: finalMessage.usage?.input_tokens ?? 0,
            outputTokens: finalMessage.usage?.output_tokens ?? 0,
            provider: 'anthropic',
        };
    } catch (error) {
        // Fallback gracieux si l'API est indisponible (clé invalide, quota, solde vide, etc.)
        if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 429) {
            const fallbackText = buildFallbackTutorText(message, context);
            return streamFallback(fallbackText, onChunk);
        }
        throw error;
    }
}

function buildFallbackExercise(chapter, difficulty, type) {
    const title = `${chapter.title} — Révision niveau ${difficulty}`;
    const formulas = Array.isArray(chapter.key_formulas) && chapter.key_formulas.length > 0
        ? chapter.key_formulas : null;
    const firstFormula = formulas?.[0] ?? null;

    if (firstFormula) {
        return {
            title,
            question_text: `Concernant le chapitre "${chapter.title}", laquelle de ces affirmations est correcte ?`,
            options: [
                { label: 'A', text: firstFormula },
                { label: 'B', text: formulas?.[1] ? `Contrairement à : ${formulas[1]}` : 'Cette notion ne fait pas partie du programme BAC' },
                { label: 'C', text: 'Cette notion est hors programme DGEX Sénégal' },
                { label: 'D', text: 'Aucune des affirmations précédentes' },
            ],
            correct_answer: 'A',
            explanation: `La réponse A est correcte : ${firstFormula}. ${chapter.summary ? chapter.summary.slice(0, 150) + '…' : ''}`,
            hints: [
                `Relis la section "${chapter.title}" dans ton cours.`,
                formulas.length > 1 ? `Formule clé : ${formulas[0]}` : 'Repère la notion fondamentale du chapitre.',
            ],
            estimated_time_minutes: Math.max(3, difficulty * 2),
            points: difficulty * 5,
        };
    }

    return {
        title,
        question_text: `Dans le chapitre "${chapter.title}", quelle est la notion centrale à maîtriser pour le BAC ?`,
        options: [
            { label: 'A', text: `La définition et l'application de ${chapter.title}` },
            { label: 'B', text: 'Une notion hors programme DGEX' },
            { label: 'C', text: 'Un concept non évalué au BAC Sénégal' },
            { label: 'D', text: 'Aucune réponse correcte' },
        ],
        correct_answer: 'A',
        explanation: `La maîtrise de "${chapter.title}" est essentielle pour le BAC. ${chapter.summary ? chapter.summary.slice(0, 120) + '…' : 'Revois ton cours de révision.'}`,
        hints: ['Relis le résumé du chapitre.', 'Concentre-toi sur la définition principale.'],
        estimated_time_minutes: Math.max(3, difficulty * 2),
        points: difficulty * 5,
    };
}

async function parseExerciseResponse(rawText) {
    const parsedJson = JSON.parse(rawText);
    return generatedExerciseSchema.parse(parsedJson);
}

export async function generateExercise(chapter, difficulty, type) {
    const client = getAnthropicClient();

    if (!client) {
        return {
            ...generatedExerciseSchema.parse(
                buildFallbackExercise(chapter, difficulty, type),
            ),
            provider: 'fallback',
        };
    }

    const prompt = `
Génère un exercice BAC Sénégal en JSON pur uniquement.
Chapitre: ${chapter.title}
Difficulté: ${difficulty}
Type: ${type}

Format attendu:
{
  "title": "...",
  "question_text": "...",
  "options": [{"label":"A","text":"..."},{"label":"B","text":"..."},{"label":"C","text":"..."},{"label":"D","text":"..."}],
  "correct_answer": "A",
  "explanation": "...",
  "hints": ["...", "..."],
  "estimated_time_minutes": 5,
  "points": 10
}
`;

    let lastError;

    for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
            const response = await client.messages.create({
                model: MODEL_NAME,
                max_tokens: 1200,
                messages: [{ role: 'user', content: prompt }],
            });

            const rawText = response.content
                .filter((block) => block.type === 'text')
                .map((block) => block.text)
                .join('');

            return {
                ...(await parseExerciseResponse(rawText)),
                provider: 'anthropic',
            };
        } catch (error) {
            // Si erreur d'authentification/solde, utiliser le fallback immédiatement
            if (
                error.status === 400 ||
                error.status === 401 ||
                error.status === 403 ||
                error.status === 429
            ) {
                return {
                    ...generatedExerciseSchema.parse(
                        buildFallbackExercise(chapter, difficulty, type),
                    ),
                    provider: 'fallback',
                };
            }
            lastError = error;
        }
    }

    throw lastError;
}

export async function generateChapterSummary(chapter, subject) {
    const cacheKey = `summary:v2:${chapter.id}`;
    const redis = getRedisClient();

    if (redis) {
        try {
            await redis.connect();
            const cached = await redis.get(cacheKey);
            if (cached) {
                return { summary: cached, provider: 'anthropic' };
            }
        } catch (_error) {}
    }

    const memoryCached = summaryMemoryCache.get(cacheKey);
    if (memoryCached && memoryCached.expiresAt > Date.now()) {
        return { summary: memoryCached.value, provider: 'anthropic' };
    }

    const client = getAnthropicClient();
    let summary;
    let shouldCache = false;

    if (!client) {
        summary = buildFallbackChapterSummary(chapter, subject);
    } else {
        try {
            const response = await client.messages.create({
                model: MODEL_NAME,
                max_tokens: 1200,
                messages: [
                    {
                        role: 'user',
                        content: `Rédige une fiche de révision structurée en Markdown pour le chapitre "${chapter.title}" de la matière "${subject.name}" pour un élève sénégalais de série ${subject.serie_code}.`,
                    },
                ],
            });

            summary = response.content.filter((block) => block.type === 'text').map((block) => block.text).join('');
            shouldCache = true;
        } catch (error) {
            if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 429) {
                summary = buildFallbackChapterSummary(chapter, subject);
            } else {
                throw error;
            }
        }
    }

    if (shouldCache && redis) {
        try {
            await redis.set(cacheKey, summary, 'EX', 60 * 60 * 24);
        } catch (_error) {}
    }

    if (shouldCache) {
        summaryMemoryCache.set(cacheKey, {
            value: summary,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
    } else {
        summaryMemoryCache.delete(cacheKey);
    }

    return {
        summary,
        provider: shouldCache ? 'anthropic' : 'fallback',
    };
}

export async function correctStudentWork(imageBase64, mediaType, subject) {
    const client = getAnthropicClient();

    if (!client) {
        return { ...buildFallbackPhotoCorrection(subject), provider: 'fallback' };
    }

    try {
        const response = await client.messages.create({
            model: MODEL_NAME,
            max_tokens: 1500,
            messages: [{
                role: 'user',
                content: [
                    {
                        type: 'image',
                        source: { type: 'base64', media_type: mediaType, data: imageBase64 },
                    },
                    {
                        type: 'text',
                        text: `Tu es un professeur correcteur du BAC Sénégal pour la matière "${subject?.name ?? 'Général'}". Analyse cette copie d'élève et fournis une correction en JSON uniquement avec ce format exact:\n{"correction":"Correction détaillée et bienveillante en Markdown (2-4 paragraphes)","note_estimee":<note sur 20>,"points_a_retravailler":["point 1","point 2","point 3"]}\nSois précis sur les erreurs, encourage l'élève, et donne des conseils concrets.`,
                    },
                ],
            }],
        });

        const rawText = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Format de réponse IA invalide');
        const parsed = JSON.parse(jsonMatch[0]);

        return {
            correction: parsed.correction ?? rawText,
            note_estimee: Math.min(20, Math.max(0, Number(parsed.note_estimee ?? 10))),
            points_a_retravailler: Array.isArray(parsed.points_a_retravailler) ? parsed.points_a_retravailler : [],
            provider: 'anthropic',
        };
    } catch (error) {
        if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 429) {
            return { ...buildFallbackPhotoCorrection(subject), provider: 'fallback' };
        }
        throw error;
    }
}

export async function generateSimulationSubject(subject, serie, year) {
    const client = getAnthropicClient();

    if (!client) {
        return { ...buildFallbackSimulationSubject(subject, serie, year), provider: 'fallback' };
    }

    try {
        const response = await client.messages.create({
            model: MODEL_NAME,
            max_tokens: 3000,
            messages: [{
                role: 'user',
                content: `Tu es un concepteur de sujets du BAC Sénégal. Génère un sujet d'examen complet en JSON pour:\n- Matière: ${subject.name}\n- Série: ${serie}\n- Session simulée: ${year}\n\nFormat JSON attendu:\n{"subject_text":"Le sujet complet en Markdown avec parties/exercices numérotés","correction_key":"Le corrigé indicatif complet en Markdown","duration_minutes":<durée en minutes>}\n\nLe sujet doit être réaliste, conforme au programme officiel DGEX Sénégal, et de niveau BAC.`,
            }],
        });

        const rawText = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('Format de réponse IA invalide');
        const parsed = JSON.parse(jsonMatch[0]);

        return {
            subject_text: parsed.subject_text ?? rawText,
            correction_key: parsed.correction_key ?? '',
            duration_minutes: Number(parsed.duration_minutes ?? 240),
            provider: 'anthropic',
        };
    } catch (error) {
        if (error.status === 400 || error.status === 401 || error.status === 403 || error.status === 429) {
            return { ...buildFallbackSimulationSubject(subject, serie, year), provider: 'fallback' };
        }
        throw error;
    }
}
