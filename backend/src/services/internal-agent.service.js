import { pool } from '../db/pool.js';
import {
    correctStudentWork,
    generateChapterSummary,
    generateExercise,
} from './claude.service.js';
import { createSimplePdfBuffer } from './pdf.service.js';

function getActiveSerie(user, requestedSerie) {
    if (user.role === 'admin') {
        return requestedSerie ?? user.serie_code ?? 'S2';
    }

    return user.serie_code;
}

async function getAccessibleSubject(user, subjectId, serieCode) {
    if (!subjectId) {
        return null;
    }

    const params = [subjectId];
    let extraWhere = '';

    if (user.role !== 'admin') {
        params.push(user.serie_code);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    } else if (serieCode) {
        params.push(serieCode);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    }

    const result = await pool.query(
        `
            SELECT s.*
            FROM subjects s
            WHERE s.id = $1
            ${extraWhere}
        `,
        params,
    );

    return result.rows[0] ?? null;
}

async function getAccessibleChapter(user, chapterId, serieCode) {
    if (!chapterId) {
        return null;
    }

    const params = [chapterId];
    let extraWhere = '';

    if (user.role !== 'admin') {
        params.push(user.serie_code);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    } else if (serieCode) {
        params.push(serieCode);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    }

    const result = await pool.query(
        `
            SELECT
                c.*,
                s.id AS subject_id,
                s.name AS subject_name,
                s.serie_code,
                s.coefficient,
                s.icon
            FROM chapters c
            JOIN subjects s ON s.id = c.subject_id
            WHERE c.id = $1
            ${extraWhere}
        `,
        params,
    );

    return result.rows[0] ?? null;
}

async function getAccessibleExercise(user, exerciseId, serieCode) {
    const params = [exerciseId];
    let extraWhere = '';

    if (user.role !== 'admin') {
        params.push(user.serie_code);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    } else if (serieCode) {
        params.push(serieCode);
        extraWhere = ` AND s.serie_code = $${params.length}`;
    }

    const result = await pool.query(
        `
            SELECT
                e.*,
                s.name AS subject_name,
                s.serie_code,
                s.coefficient,
                c.title AS chapter_title
            FROM exercises e
            JOIN subjects s ON s.id = e.subject_id
            JOIN chapters c ON c.id = e.chapter_id
            WHERE e.id = $1
            ${extraWhere}
        `,
        params,
    );

    return result.rows[0] ?? null;
}

async function getSubjectProgressRows(user, serieCode) {
    const result = await pool.query(
        `
            WITH perf AS (
                SELECT
                    subject_id,
                    COUNT(*)::int AS exercises_done,
                    COUNT(*) FILTER (WHERE is_correct = true)::int AS exercises_correct
                FROM student_performances
                WHERE user_id = $1
                GROUP BY subject_id
            ),
            cp AS (
                SELECT
                    subject_id,
                    COALESCE(ROUND(AVG(completion_pct)), 0)::int AS completion_pct,
                    COALESCE(ROUND(AVG(simulated_grade), 2), 0) AS simulated_grade
                FROM chapter_progress
                WHERE user_id = $1
                GROUP BY subject_id
            )
            SELECT
                s.*,
                COALESCE(cp.completion_pct, 0) AS completion_pct,
                COALESCE(cp.simulated_grade, 0) AS simulated_grade,
                COALESCE(perf.exercises_done, 0) AS exercises_done,
                COALESCE(perf.exercises_correct, 0) AS exercises_correct
            FROM subjects s
            LEFT JOIN cp ON cp.subject_id = s.id
            LEFT JOIN perf ON perf.subject_id = s.id
            WHERE s.serie_code = $2
            ORDER BY COALESCE(cp.simulated_grade, 0) ASC, s.coefficient DESC, s.order_index
        `,
        [user.id, serieCode],
    );

    return result.rows;
}

async function getTodayTasks(userId) {
    const result = await pool.query(
        `
            SELECT
                dt.id,
                dt.task_type,
                dt.title,
                dt.description,
                dt.estimated_minutes,
                dt.is_completed,
                s.name AS subject_name,
                c.title AS chapter_title
            FROM daily_tasks dt
            LEFT JOIN subjects s ON s.id = dt.subject_id
            LEFT JOIN chapters c ON c.id = dt.chapter_id
            WHERE dt.user_id = $1
              AND dt.scheduled_date = CURRENT_DATE
            ORDER BY dt.created_at
        `,
        [userId],
    );

    return result.rows;
}

async function assertPhotoCorrectionAllowed(user) {
    if (user.is_premium) {
        return;
    }

    const usageResult = await pool.query(
        `
            SELECT COUNT(*)::int AS daily_count
            FROM ai_sessions
            WHERE user_id = $1
              AND created_at::date = CURRENT_DATE
        `,
        [user.id],
    );

    if ((usageResult.rows[0]?.daily_count ?? 0) >= 3) {
        throw new Error(
            'Correction photo réservée au premium après 3 essais gratuits par jour',
        );
    }
}

async function getWeakChapterForSubject(userId, subjectId) {
    const result = await pool.query(
        `
            SELECT
                c.*,
                COALESCE(cp.simulated_grade, 0) AS simulated_grade,
                COALESCE(cp.completion_pct, 0) AS completion_pct
            FROM chapters c
            LEFT JOIN chapter_progress cp
                ON cp.chapter_id = c.id
               AND cp.user_id = $1
            WHERE c.subject_id = $2
            ORDER BY COALESCE(cp.simulated_grade, 0) ASC,
                     COALESCE(cp.completion_pct, 0) ASC,
                     c.order_index
            LIMIT 1
        `,
        [userId, subjectId],
    );

    return result.rows[0] ?? null;
}

async function resolveAgentTarget(user, options = {}) {
    const serieCode = getActiveSerie(user, options.serieCode);

    if (options.chapterId) {
        const chapter = await getAccessibleChapter(user, options.chapterId, serieCode);

        if (!chapter) {
            throw new Error('Chapitre introuvable pour cette série');
        }

        const subject = await getAccessibleSubject(user, chapter.subject_id, serieCode);
        return { serieCode, subject, chapter };
    }

    if (options.subjectId) {
        const subject = await getAccessibleSubject(user, options.subjectId, serieCode);

        if (!subject) {
            throw new Error('Matière introuvable pour cette série');
        }

        const chapter = await getWeakChapterForSubject(user.id, subject.id);

        if (!chapter) {
            throw new Error('Aucun chapitre disponible pour cette matière');
        }

        return { serieCode, subject, chapter };
    }

    const progressRows = await getSubjectProgressRows(user, serieCode);
    const subject = progressRows[0] ?? null;

    if (!subject) {
        throw new Error('Aucune matière disponible pour cette série');
    }

    const chapter = await getWeakChapterForSubject(user.id, subject.id);

    if (!chapter) {
        throw new Error('Aucun chapitre disponible pour cette série');
    }

    return { serieCode, subject, chapter };
}

function buildRecommendation(context) {
    const weakSubject = context.weak_subjects[0];
    const nextTask = context.today_tasks.find((task) => !task.is_completed);

    if (nextTask) {
        return `Commence par "${nextTask.title}" puis enchaîne avec ${context.target.chapter.title}.`;
    }

    if (weakSubject) {
        return `Ta priorité du moment est ${weakSubject.name}. Travaille d'abord ${context.target.chapter.title} avant de refaire un exercice type BAC.`;
    }

    return `Poursuis sur ${context.target.subject.name} avec une lecture active du cours, puis un exercice d'application.`;
}

function buildStudyPackPdf(result) {
    return createSimplePdfBuffer({
        title: `Pack de révision - ${result.target.subject.name}`,
        fileName: `pack-revision-${result.target.subject.slug ?? 'bac'}.pdf`,
        sections: [
            {
                heading: 'Chapitre ciblé',
                body: `${result.target.chapter.title}\nSérie: ${result.target.subject.serie_code}\nRecommandation: ${result.recommendation}`,
            },
            {
                heading: 'Fiche de révision',
                body: result.summary,
            },
            {
                heading: 'Exercice conseillé',
                body: [
                    result.exercise.title,
                    '',
                    result.exercise.question_text,
                    '',
                    ...(result.exercise.options ?? []).map(
                        (option) => `${option.label}. ${option.text}`,
                    ),
                    '',
                    `Réponse attendue: ${result.exercise.correct_answer ?? 'Voir corrigé'}`,
                    `Explication: ${result.exercise.explanation}`,
                ].join('\n'),
            },
        ],
    });
}

function buildCorrectionPdf(result) {
    return createSimplePdfBuffer({
        title: `Correction - ${result.exercise.title}`,
        fileName: 'correction-exercice.pdf',
        sections: [
            {
                heading: 'Réponse de l’élève',
                body: result.answer,
            },
            {
                heading: 'Diagnostic',
                body: [
                    `Statut: ${result.verdict}`,
                    `Réponse correcte: ${result.correct_answer ?? 'Correction guidée'}`,
                    '',
                    result.feedback,
                ].join('\n'),
            },
            {
                heading: 'Conseils',
                body: result.next_steps.join('\n'),
            },
        ],
    });
}

function buildPhotoCorrectionPdf(result, subjectName) {
    return createSimplePdfBuffer({
        title: `Correction photo - ${subjectName}`,
        fileName: 'correction-photo.pdf',
        sections: [
            {
                heading: 'Correction',
                body: result.correction,
            },
            {
                heading: 'Note estimée',
                body: `${result.note_estimee}/20`,
            },
            {
                heading: 'Points à retravailler',
                body: result.points_a_retravailler.join('\n'),
            },
        ],
    });
}

export async function getStudentAgentContext(user, options = {}) {
    const { serieCode, subject, chapter } = await resolveAgentTarget(user, options);
    const [progressRows, todayTasks] = await Promise.all([
        getSubjectProgressRows(user, serieCode),
        getTodayTasks(user.id),
    ]);

    return {
        serie_code: serieCode,
        target: {
            subject,
            chapter,
        },
        weak_subjects: progressRows.slice(0, 3).map((row) => ({
            id: row.id,
            name: row.name,
            simulated_grade: Number(row.simulated_grade),
            completion_pct: Number(row.completion_pct),
            coefficient: row.coefficient,
        })),
        today_tasks: todayTasks,
        recommendation: buildRecommendation({
            weak_subjects: progressRows,
            today_tasks: todayTasks,
            target: { subject, chapter },
        }),
    };
}

export async function createStudyPack(user, options = {}) {
    const context = await getStudentAgentContext(user, options);
    const summaryResult = await generateChapterSummary(
        context.target.chapter,
        {
            name: context.target.subject.name,
            serie_code: context.target.subject.serie_code,
        },
    );
    const exerciseResult = await generateExercise(
        context.target.chapter,
        options.difficulty ?? 3,
        options.type ?? 'qcm',
    );

    const result = {
        target: context.target,
        recommendation: context.recommendation,
        weak_subjects: context.weak_subjects,
        today_tasks: context.today_tasks,
        summary: summaryResult.summary,
        summary_provider: summaryResult.provider,
        exercise: exerciseResult,
        exercise_provider: exerciseResult.provider ?? 'fallback',
    };

    if (options.includePdf !== false) {
        const pdf = buildStudyPackPdf(result);
        result.pdf = {
            file_name: pdf.file_name,
            mime_type: pdf.mime_type,
            base64: pdf.buffer.toString('base64'),
        };
    }

    return result;
}

export async function createAnswerCorrection(user, options) {
    const serieCode = getActiveSerie(user, options.serieCode);
    const exercise = await getAccessibleExercise(user, options.exerciseId, serieCode);

    if (!exercise) {
        throw new Error('Exercice introuvable pour cette série');
    }

    const normalizedAnswer = String(options.answer ?? '').trim().toLowerCase();
    const normalizedCorrect = String(exercise.correct_answer ?? '').trim().toLowerCase();

    let verdict = 'Correction guidée';
    let isCorrect = null;

    if (exercise.type === 'qcm' || exercise.type === 'vrai_faux') {
        isCorrect = normalizedAnswer === normalizedCorrect;
        verdict = isCorrect ? 'Bonne réponse' : 'Réponse à revoir';
    }

    const nextSteps = [
        `Relis l'explication officielle de ${exercise.chapter_title}.`,
        'Refais un exercice du même type sans regarder le corrigé.',
        'Note la méthode correcte dans ta fiche personnelle.',
    ];

    const result = {
        exercise,
        answer: options.answer,
        is_correct: isCorrect,
        verdict,
        correct_answer: exercise.correct_answer,
        feedback: exercise.explanation,
        next_steps: nextSteps,
        provider: 'internal',
    };

    if (options.includePdf !== false) {
        const pdf = buildCorrectionPdf(result);
        result.pdf = {
            file_name: pdf.file_name,
            mime_type: pdf.mime_type,
            base64: pdf.buffer.toString('base64'),
        };
    }

    return result;
}

export async function createPhotoCorrectionReport(user, options = {}) {
    const imageSizeBytes = Buffer.byteLength(options.imageBase64, 'base64');

    if (imageSizeBytes > 5 * 1024 * 1024) {
        throw new Error('Image trop volumineuse (max 5MB)');
    }

    await assertPhotoCorrectionAllowed(user);

    const serieCode = getActiveSerie(user, options.serieCode);
    const subject = options.subjectId
        ? await getAccessibleSubject(user, options.subjectId, serieCode)
        : null;

    if (options.subjectId && !subject) {
        throw new Error('Matière introuvable pour cette série');
    }

    const result = await correctStudentWork(
        options.imageBase64,
        options.mediaType,
        subject,
    );

    const response = {
        subject: subject
            ? {
                id: subject.id,
                name: subject.name,
                serie_code: subject.serie_code,
            }
            : null,
        ...result,
    };

    if (options.includePdf !== false) {
        const pdf = buildPhotoCorrectionPdf(
            result,
            subject?.name ?? 'Copie élève',
        );
        response.pdf = {
            file_name: pdf.file_name,
            mime_type: pdf.mime_type,
            base64: pdf.buffer.toString('base64'),
        };
    }

    return response;
}
