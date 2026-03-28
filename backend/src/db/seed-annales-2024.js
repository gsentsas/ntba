/**
 * seed-annales-2024.js
 * Importe les annales BAC 2024 depuis le manifest officedubac.sn
 * Crée un chapitre "Annales 2024" par matière et insère les épreuves comme exercises
 * avec is_annale=true, pdf_url, corrige_url.
 *
 * Usage: npm run seed:annales-2024
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { v4 as uuidv4 } from 'uuid';

import { pool, testDatabaseConnection } from './pool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Mapping Libellé → { subjectName, series[] } ────────────────────────────
// Détection du nom de matière à partir du libellé manifest
function detectSubject(libelle) {
    const l = libelle.trim().toUpperCase();

    if (/\bMATHS?\b/.test(l) || l.startsWith('MATHS') || l.startsWith('MATH'))
        return 'Mathématiques';
    if (/\bSVT\b/.test(l))
        return 'SVT';
    if (/\bSCPH\b/.test(l) || /\bSC[\s-]?PH\b/.test(l) || /SCIEN/.test(l))
        return 'Physique';
    if (/\bANGLAIS\b/.test(l) || /\bANGL\b/.test(l) || /\bANG\b/.test(l))
        return 'Anglais';
    if (/\bFRANCAIS\b/.test(l) || /\bFRANC\b/.test(l) || /\bFRAN\b/.test(l))
        return 'Français';
    if (/\bPHILO\b/.test(l))
        return 'Philosophie';
    if (/\bHG\b/.test(l) || /\bHIST[\s-]?GEO\b/.test(l) || /\bHISTOIRE\b/.test(l))
        return 'Histoire-Géographie';
    if (/\bECO\b/.test(l) || /\bECONOMIE\b/.test(l))
        return 'Économie';
    if (/\bDROIT\b/.test(l))
        return 'Droit';
    if (/\bCOMPTA\b/.test(l) || /\bGEST/.test(l) || /\bCOMPT/.test(l))
        return 'Comptabilité';
    if (/\bINFOR\b/.test(l) || /\bINFORMATIQUE\b/.test(l))
        return 'Informatique';
    if (/\bCMC\b/.test(l) || /\bCONST[\s-]?MECA\b/.test(l) || /\bCONS[\s-]?MECA\b/.test(l))
        return 'Construction Mécanique';
    if (/\bARABE\b/.test(l))
        return 'Arabe';
    if (/\bESPAGNOL\b/.test(l) || /\bESP\b/.test(l))
        return 'Espagnol';
    if (/\bLLA\b/.test(l) || /\bLITT\b/.test(l))
        return 'Littérature';
    if (/\bAF\s*TG\b/.test(l) || /\bAUTO\b/.test(l))
        return 'Automatique';
    if (/\bCIV\b/.test(l) || /\bCIVIL\b/.test(l))
        return 'Civilisation';
    if (/\bMANAG\b/.test(l) || /\bMAN(G|AG)\b/.test(l) || /\bORG\b/.test(l))
        return 'Gestion';
    if (/\bSCIENCE\s*ECO\b/.test(l) || /\bSCI\s*ECO\b/.test(l))
        return 'Économie';
    if (/\bPHYS\b/.test(l))
        return 'Physique';

    return null; // unknown
}

// Normalisation des codes séries du manifest → serie_code en DB
// Ex: 'L' dans le manifest = 'L1' en DB (série littéraire de base)
//     'S' dans le manifest = S1+S2 (épreuves communes à toutes les S)
const SERIES_NORM = {
    L: ['L1'],
    S: ['S1', 'S2'], // épreuves communes sciences
};

function parseSeries(seriesStr) {
    const raw = seriesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const expanded = [];
    for (const s of raw) {
        if (SERIES_NORM[s]) {
            expanded.push(...SERIES_NORM[s]);
        } else {
            expanded.push(s);
        }
    }
    // Dédoublonner
    return [...new Set(expanded)];
}

// Séries que la plateforme gère (correspondant aux serie_code en DB)
const HANDLED_SERIES = new Set(['S1', 'S2', 'L1', 'L2', 'STEG']);

// Durée estimée par matière (minutes)
const SUBJECT_DURATION = {
    'Mathématiques': 240,
    'Physique': 180,
    'SVT': 180,
    'Anglais': 120,
    'Français': 180,
    'Philosophie': 180,
    'Histoire-Géographie': 180,
    'Économie': 180,
    'Droit': 180,
    'Comptabilité': 180,
    'Informatique': 120,
};

// Description textuelle de l'exercice annale
function buildQuestionText(libelle, groupe, mois, year) {
    return `Épreuve officielle du BAC ${year} – ${libelle.trim()} (${groupe}, session de ${mois}).`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function seedAnnales() {
    const manifestPath = path.join(
        __dirname,
        '../../../Sujets-Bac-et-Corrections/2024/officedubac_2024_par_serie/officedubac_2024_manifest_par_serie.json',
    );

    console.log('📚 Chargement du manifest…');
    const manifestRaw = await readFile(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestRaw);

    console.log(`   ${manifest.length} entrées dans le manifest`);

    // Séparer épreuves et corrigés
    const epreuves = manifest.filter((e) => e['Type'] === 'Épreuve');
    const corriges = manifest.filter((e) => e['Type'] === 'Corrigé');

    console.log(`   ${epreuves.length} épreuves | ${corriges.length} corrigés`);

    await testDatabaseConnection();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // ── 1. Charger tous les subjects de la DB ──────────────────────────
        console.log('\n🔍 Chargement des matières en base…');
        const subjectsRes = await client.query(
            'SELECT id, serie_code, name FROM subjects ORDER BY serie_code, name',
        );
        const subjectsDb = subjectsRes.rows;
        console.log(`   ${subjectsDb.length} matières trouvées`);

        // Index: "S1:Mathématiques" → { id, serie_code, name }
        const subjectIndex = {};
        for (const s of subjectsDb) {
            subjectIndex[`${s.serie_code}:${s.name}`] = s;
        }

        // ── 2. Créer/réutiliser chapitres "Annales 2024" par subject ───────
        console.log('\n📁 Création des chapitres "Annales 2024"…');

        // Supprimer les anciens enregistrements d'annales 2024 pour éviter les doublons
        const existingAnnaleChapters = await client.query(
            "SELECT id FROM chapters WHERE title = 'Annales 2024'",
        );
        const annaleChapterIds = existingAnnaleChapters.rows.map((r) => r.id);

        if (annaleChapterIds.length > 0) {
            console.log(`   ♻️  Suppression de ${annaleChapterIds.length} chapitres annales existants…`);
            for (const chId of annaleChapterIds) {
                await client.query('DELETE FROM daily_tasks WHERE chapter_id=$1', [chId]);
                await client.query('DELETE FROM chapter_progress WHERE chapter_id=$1', [chId]);
                await client.query('DELETE FROM ai_sessions WHERE chapter_id=$1', [chId]);
                await client.query('DELETE FROM student_performances WHERE chapter_id=$1', [chId]);
                await client.query('DELETE FROM exercises WHERE chapter_id=$1', [chId]);
            }
            await client.query("DELETE FROM chapters WHERE title = 'Annales 2024'");
        }

        // Map subject_id → annale chapter_id (créés à la demande)
        const annaleChapterMap = {}; // subject_id → chapter_id

        async function getOrCreateAnnaleChapter(subjectId) {
            if (annaleChapterMap[subjectId]) return annaleChapterMap[subjectId];

            const chId = uuidv4();
            const orderRes = await client.query(
                'SELECT COALESCE(MAX(order_index), 0) + 1 AS next FROM chapters WHERE subject_id=$1',
                [subjectId],
            );
            const orderIndex = orderRes.rows[0].next;

            await client.query(
                `INSERT INTO chapters (id, subject_id, title, summary, order_index, is_published)
                 VALUES ($1, $2, 'Annales 2024', 'Sujets officiels du BAC 2024 avec corrigés.', $3, true)`,
                [chId, subjectId, orderIndex],
            );
            annaleChapterMap[subjectId] = chId;
            return chId;
        }

        // ── 3. Construire index des corrigés pour matching rapide ──────────
        // Clé: normalizedLibelle|groupe|mois
        function normalizeLibelle(lib) {
            return lib.trim().toUpperCase()
                .replace(/\s+/g, ' ')
                .replace(/[^A-Z0-9 ]/g, '');
        }

        function corrigeKey(entry) {
            const base = normalizeLibelle(entry['Libellé']);
            return `${base}|${entry['Groupe']}|${entry['Mois source']}`;
        }

        // Un corrigé peut matcher plusieurs séries → on le garde par key
        const corrigeByKey = {};
        for (const c of corriges) {
            const key = corrigeKey(c);
            if (!corrigeByKey[key]) corrigeByKey[key] = [];
            corrigeByKey[key].push(c);
        }

        // ── 4. Traiter chaque épreuve ───────────────────────────────────────
        console.log('\n📝 Insertion des annales…');
        let inserted = 0;
        let skipped = 0;

        for (const ep of epreuves) {
            const libelle = ep['Libellé'].trim();
            const groupe = ep['Groupe'];
            const mois = ep['Mois source'];
            const pdfUrl = ep['URL PDF'];
            const rawSeries = parseSeries(ep['Séries détectées']);

            // Filtrer sur les séries gérées par la plateforme
            const series = rawSeries.filter((s) => HANDLED_SERIES.has(s));
            if (series.length === 0) {
                skipped++;
                continue;
            }

            // Détecter la matière
            const subjectName = detectSubject(libelle);
            if (!subjectName) {
                console.log(`   ⚠️  Matière inconnue pour: "${libelle}" – ignoré`);
                skipped++;
                continue;
            }

            // Trouver le corrigé correspondant
            const key = `${normalizeLibelle(libelle)}|${groupe}|${mois}`;
            const matchingCorriges = corrigeByKey[key] ?? [];
            const corrigeUrl = matchingCorriges.length > 0
                ? matchingCorriges[0]['URL PDF']
                : null;

            // Session label
            const session = `${groupe} – ${mois} 2024`;
            const duration = SUBJECT_DURATION[subjectName] ?? 180;
            const questionText = buildQuestionText(libelle, groupe, mois, 2024);

            // Insérer pour chaque série concernée
            for (const serieCode of series) {
                const subjectKey = `${serieCode}:${subjectName}`;
                const subject = subjectIndex[subjectKey];

                if (!subject) {
                    // Essayer des variantes de nom
                    const altKey = Object.keys(subjectIndex).find(
                        (k) => k.startsWith(`${serieCode}:`) && k.toLowerCase().includes(subjectName.toLowerCase().split(' ')[0]),
                    );
                    if (!altKey) {
                        console.log(`   ⚠️  Matière "${subjectName}" introuvable pour série ${serieCode} – ignoré`);
                        skipped++;
                        continue;
                    }
                    // Use alt
                    const altSubject = subjectIndex[altKey];
                    const chapterId = await getOrCreateAnnaleChapter(altSubject.id);

                    await client.query(
                        `INSERT INTO exercises
                         (id, chapter_id, subject_id, type, difficulty, title, question_text,
                          explanation, hints, is_annale, annale_year, annale_session,
                          estimated_time_minutes, points, pdf_url, corrige_url, is_published)
                         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
                        [
                            uuidv4(), chapterId, altSubject.id,
                            'dissertation', 4,
                            `${libelle} – BAC 2024`,
                            questionText,
                            corrigeUrl
                                ? `Corrigé officiel disponible en téléchargement.`
                                : 'Corrigé non disponible pour cette session.',
                            JSON.stringify([]),
                            true, 2024, session,
                            duration, 50,
                            pdfUrl, corrigeUrl ?? null,
                            true,
                        ],
                    );
                    inserted++;
                    continue;
                }

                const chapterId = await getOrCreateAnnaleChapter(subject.id);

                await client.query(
                    `INSERT INTO exercises
                     (id, chapter_id, subject_id, type, difficulty, title, question_text,
                      explanation, hints, is_annale, annale_year, annale_session,
                      estimated_time_minutes, points, pdf_url, corrige_url, is_published)
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
                    [
                        uuidv4(), chapterId, subject.id,
                        'dissertation', 4,
                        `${libelle} – BAC 2024`,
                        questionText,
                        corrigeUrl
                            ? `Corrigé officiel disponible en téléchargement.`
                            : 'Corrigé non disponible pour cette session.',
                        JSON.stringify([]),
                        true, 2024, session,
                        duration, 50,
                        pdfUrl, corrigeUrl ?? null,
                        true,
                    ],
                );
                inserted++;
            }
        }

        await client.query('COMMIT');

        console.log(`\n✅ Import terminé !`);
        console.log(`   ${inserted} annales insérées`);
        console.log(`   ${Object.keys(annaleChapterMap).length} chapitres "Annales 2024" créés`);
        console.log(`   ${skipped} épreuves ignorées (séries hors plateforme ou matière inconnue)`);

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

seedAnnales()
    .catch((err) => {
        console.error('❌ Échec:', err);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
