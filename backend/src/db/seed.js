import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';

import { pool, testDatabaseConnection } from './pool.js';

// UUIDs fixes pour que seed-official-programs.js puisse cibler les bonnes matières
const FIXED_IDS = {
    'L1:Philosophie':         '5462163a-224b-4c13-883b-534e308fc46c',
    'L1:Histoire-Géographie': '781dcd75-2a1a-41fe-afa6-2de359c7340a',
    'L1:Français':            '84ef8ad2-0716-4c3e-b924-7a24d4723da5',
    'L1:Anglais':             'ac384102-fae9-4356-947a-aa61f76e3b11',
    'L1:Mathématiques':       '4a26d746-e1b6-4df9-865e-1cc9a43efbc0',
    'L1:Sciences Naturelles': '72b027b6-59b9-4655-bdfe-6747378823da',
    'L2:Français':            '46022a0c-00dd-453f-b216-646d9c6774ea',
    'L2:Anglais':             '7d81abfe-ccca-4546-9bf9-e9a789ccbb94',
    'L2:Philosophie':         '98d1f519-53b1-42b5-a3c2-fb6d9aa7cc87',
    'L2:Histoire-Géographie': 'a94cfbcf-d46a-45ca-a8de-27ab10998c8e',
    'L2:Mathématiques':       '5633cd7a-d740-43fe-9042-6bff22be8ff9',
    'S1:Mathématiques':       '7dcd9aee-3fc7-4eff-a5e2-76a90f7212cf',
    'S1:Physique':            '570ffd26-72a4-4185-b6eb-4fbcea192c99',
    'S1:Chimie':              '4b9d0f9e-57e6-4aef-a9ce-88b11ab28850',
    'S1:SVT':                 '5e15756b-129d-446c-805b-42ebbb75af03',
    'S1:Philosophie':         '1c79092a-43d5-47a0-aa95-989348fdbc2c',
    'S1:Français':            'f7628019-4791-4f93-b6cd-ace2f860f082',
    'S1:Anglais':             'a46fb402-6a20-4dc4-b345-2a0bae25e53f',
    'S1:Histoire-Géographie': '627be785-3dc6-4d8d-bead-530f90e550b6',
    'S2:Mathématiques':       '758ff260-26c5-4cbf-a4b7-6344c164ed80',
    'S2:Physique':            '8a7e0812-c11b-48ef-ba90-6402907db0be',
    'S2:Chimie':              'b82924d7-c598-4f24-bdbe-9f8fa0db59ce',
    'S2:SVT':                 '7558ceab-dcad-46f1-9ec3-38215d62af19',
    'S2:Philosophie':         'cc794b2c-f2ae-407f-95ef-18f7ce60df17',
    'S2:Français':            '11c17863-aaab-4361-aa18-f3b7c10d9651',
    'S2:Anglais':             '6006cff5-fa7f-4d36-8f2e-79437f6ffb34',
    'S2:Histoire-Géographie': 'c8528812-dd47-4f95-bdad-0543d8d101d8',
    'S1:EPS':                 'e1f5d8a2-3b7c-4d9e-af1a-2c6b5e4d3a7f',
    'S2:EPS':                 'f2e6c9b3-4a8d-4e0f-9a2b-3d7c6f5e4b8a',
    'S2:Informatique':        'a3b7d0c4-5b9e-4f1a-8b3c-4e8d7a6f5c9b',
};

const SERIES_SUBJECTS = {
    S2: [
        { name: 'Mathématiques', coefficient: 7, icon: '📐', color: '#1D9E75', description: 'Analyse, algèbre et géométrie pour la série S2.' },
        { name: 'Physique', coefficient: 5, icon: '⚛️', color: '#2563EB', description: 'Mécanique, électricité, optique et ondes.' },
        { name: 'Chimie', coefficient: 5, icon: '🧪', color: '#D85A30', description: 'Transformations chimiques, équilibres et organique.' },
        { name: 'SVT', coefficient: 4, icon: '🧬', color: '#0F766E', description: 'Génétique, immunologie, écologie et évolution.' },
        { name: 'Philosophie', coefficient: 3, icon: '💭', color: '#7F77DD', description: 'Notions philosophiques au programme du BAC.' },
        { name: 'Français', coefficient: 3, icon: '📘', color: '#EF9F27', description: 'Expression écrite et compréhension.' },
        { name: 'Anglais', coefficient: 2, icon: '🇬🇧', color: '#0EA5E9', description: 'Langue vivante anglaise.' },
        { name: 'Histoire-Géographie', coefficient: 2, icon: '🗺️', color: '#92400E', description: 'Repères historiques et géographiques.' },
        { name: 'EPS', coefficient: 1, icon: '🏃', color: '#059669', description: 'Éducation physique et sportive.' },
        { name: 'Informatique', coefficient: 1, icon: '💻', color: '#475569', description: 'Bases d’algorithmique et d’usage numérique.' },
    ],
    S1: [
        { name: 'Mathématiques', coefficient: 6 },
        { name: 'Physique', coefficient: 5 },
        { name: 'Chimie', coefficient: 4 },
        { name: 'SVT', coefficient: 5 },
        { name: 'Philosophie', coefficient: 3 },
        { name: 'Français', coefficient: 3 },
        { name: 'Anglais', coefficient: 2 },
        { name: 'Histoire-Géographie', coefficient: 2 },
        { name: 'EPS', coefficient: 1 },
    ],
    L1: [
        { name: 'Philosophie', coefficient: 5 },
        { name: 'Français', coefficient: 5 },
        { name: 'Histoire-Géographie', coefficient: 4 },
        { name: 'Anglais', coefficient: 3 },
        { name: 'Arabe', coefficient: 3 },
        { name: 'Mathématiques', coefficient: 2 },
        { name: 'Sciences Naturelles', coefficient: 2 },
        { name: 'EPS', coefficient: 1 },
    ],
    L2: [
        { name: 'Français', coefficient: 5 },
        { name: 'Anglais', coefficient: 4 },
        { name: 'Philosophie', coefficient: 4 },
        { name: 'Histoire-Géographie', coefficient: 4 },
        { name: '2ème Langue Vivante', coefficient: 3 },
        { name: 'Mathématiques', coefficient: 2 },
        { name: 'EPS', coefficient: 1 },
    ],
    STEG: [
        { name: 'Économie', coefficient: 4 },
        { name: 'Gestion', coefficient: 4 },
        { name: 'Mathématiques', coefficient: 4 },
        { name: 'Histoire-Géographie', coefficient: 3 },
        { name: 'Français', coefficient: 3 },
        { name: 'Anglais', coefficient: 2 },
        { name: 'Comptabilité', coefficient: 4 },
        { name: 'EPS', coefficient: 1 },
    ],
    G: [
        { name: 'Gestion', coefficient: 5 },
        { name: 'Comptabilité', coefficient: 5 },
        { name: 'Mathématiques', coefficient: 3 },
        { name: 'Économie', coefficient: 3 },
        { name: 'Français', coefficient: 3 },
        { name: 'Anglais', coefficient: 2 },
        { name: 'Informatique', coefficient: 2 },
        { name: 'EPS', coefficient: 1 },
    ],
    T: [
        { name: 'Sciences et Techniques', coefficient: 6 },
        { name: 'Mathématiques', coefficient: 5 },
        { name: 'Physique', coefficient: 4 },
        { name: 'Français', coefficient: 3 },
        { name: 'Anglais', coefficient: 2 },
        { name: 'Histoire-Géographie', coefficient: 2 },
        { name: 'EPS', coefficient: 1 },
    ],
};

const S2_CHAPTERS = {
    Chimie: [
        { title: 'Thermochimie et loi de Hess', formulas: ['ΔH = ΣΔHf(produits) - ΣΔHf(réactifs)', 'Q = m × c × ΔT'] },
        { title: 'Cinétique chimique', formulas: ['v = -d[R]/dt', 't1/2 = ln(2) / k pour un ordre 1'] },
        { title: 'Équilibres chimiques', formulas: ['K = Π[produits]^ν / Π[réactifs]^ν', 'Q_r compare l’état du système à K'] },
        { title: 'Acides, bases et pH', formulas: ['pH = -log[H3O+]', 'pH = pKa + log([base]/[acide])'] },
        { title: 'Oxydoréduction', formulas: ['Ox + ne- ⇌ Red', 'Q = n × F pour l’électrolyse'] },
        { title: 'Piles électrochimiques', formulas: ['E = E°cathode - E°anode', 'ΔG = -nFE'] },
        { title: 'Chimie organique', formulas: ['CnH2n+2 pour les alcanes', 'Une estérification forme ester + eau'] },
    ],
    Mathématiques: [
        { title: 'Suites numériques', formulas: ['u_{n+1} = u_n + r', 'u_n = u_0 × q^n pour une suite géométrique'] },
        { title: 'Limites et continuité', formulas: ['lim(f + g) = lim f + lim g', 'Une fonction continue conserve le passage à la limite'] },
        { title: 'Dérivées et variations', formulas: ['(uv)\' = u\'v + uv\'', 'Le signe de f\' donne les variations de f'] },
        { title: 'Intégrales', formulas: ['∫ x^n dx = x^{n+1}/(n+1) + C', 'Aire = ∫[a,b] f(x) dx'] },
        { title: 'Probabilités', formulas: ['P(A∩B) = P(A)P(B) si indépendants', 'P(A|B) = P(A∩B)/P(B)'] },
        { title: 'Géométrie vectorielle', formulas: ['AB⃗ = (xB-xA ; yB-yA)', 'u·v = ||u|| ||v|| cos θ'] },
        { title: 'Nombres complexes', formulas: ['z = a + ib', '|z| = √(a²+b²)'] },
        { title: 'Arithmétique', formulas: ['a = bq + r', 'pgcd(a,b) × ppcm(a,b) = a × b'] },
    ],
    Physique: [
        { title: 'Lois de Newton et mouvements', formulas: ['ΣF⃗ = m a⃗', 'v = v0 + at'] },
        { title: 'Projectiles et chute libre', formulas: ['x = v0 cos α × t', 'y = v0 sin α × t - 1/2 gt²'] },
        { title: 'Circuits RC et RL', formulas: ['uC(t) = E(1-e^{-t/RC})', 'τ = L/R pour un circuit RL'] },
        { title: 'Oscillations et RLC', formulas: ['T0 = 2π√(LC)', 'q(t) = Qm cos(ωt + φ)'] },
        { title: 'Optique géométrique', formulas: ['1/f = 1/p\' - 1/p', 'n1 sin i = n2 sin r'] },
        { title: 'Ondes et physique atomique', formulas: ['v = λf', 'ΔE = hν'] },
    ],
    SVT: [
        { title: 'Génétique mendélienne', formulas: ['Monohybridisme: 3/4 phénotype dominant, 1/4 récessif', 'Test-cross pour révéler le génotype'] },
        { title: 'Biologie moléculaire', formulas: ['ADN → ARNm → Protéine', 'Un codon correspond à un acide aminé'] },
        { title: 'Immunologie', formulas: ['Antigène + anticorps = complexe immun', 'La mémoire immunitaire accélère la réponse secondaire'] },
        { title: 'Évolution et sélection naturelle', formulas: ['Les caractères avantageux augmentent la survie', 'La variation génétique nourrit la sélection'] },
        { title: 'Écologie et écosystèmes', formulas: ['Chaîne alimentaire = transfert de matière et d’énergie', 'Un facteur limitant modifie l’équilibre d’un milieu'] },
    ],
};

const CHAPTER_HINTS = [
    'Repère la notion centrale du chapitre avant de calculer.',
    'Vérifie les unités et le vocabulaire scientifique attendu au BAC.',
];

function slugify(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
}

function defaultSubjectMeta(subject, index) {
    const icons = ['📚', '🧠', '📝', '🧪', '📐', '🌍', '💼', '💻'];
    const colors = ['#1D9E75', '#7F77DD', '#EF9F27', '#D85A30', '#2563EB', '#0F766E', '#64748B', '#9333EA'];

    return {
        icon: subject.icon ?? icons[index % icons.length],
        color: subject.color ?? colors[index % colors.length],
        description: subject.description ?? `Programme ${subject.name} pour la série ${subject.serie_code}.`,
    };
}

function createQcm(subjectName, chapterTitle, chapterIndex, exerciseIndex) {
    const base = `${subjectName} · ${chapterTitle}`;

    const templates = {
        Chimie: [
            {
                question: `Dans ${chapterTitle}, quelle grandeur permet de mesurer l’avancement thermique d’une réaction ?`,
                options: ['A. L’enthalpie de réaction ΔH', 'B. La masse molaire M', 'C. Le volume molaire Vm', 'D. La densité d'],
                answer: 'A',
                explanation:
                    'Au BAC, on utilise ΔH pour savoir si la réaction libère ou absorbe de l’énergie. Une réaction exothermique a un ΔH négatif, une réaction endothermique un ΔH positif.',
            },
            {
                question: `En cinétique chimique, augmenter la température a généralement pour effet de :`,
                options: ['A. ralentir la réaction', 'B. ne rien changer', 'C. accélérer la réaction', 'D. supprimer le catalyseur'],
                answer: 'C',
                explanation:
                    'Quand la température augmente, davantage de collisions franchissent l’énergie d’activation. La vitesse de réaction augmente donc en général.',
            },
            {
                question: `Pour une solution acide, la bonne relation est :`,
                options: ['A. pH > 7', 'B. pH = 7', 'C. pH < 7', 'D. pOH < 0'],
                answer: 'C',
                explanation:
                    'Une solution acide contient plus d’ions H3O+ que OH-. Son pH est donc inférieur à 7 dans les conditions usuelles du programme.',
            },
            {
                question: `Dans un couple oxydant/réducteur, l’oxydant est l’espèce qui :`,
                options: ['A. gagne des électrons', 'B. perd des neutrons', 'C. libère des protons', 'D. augmente forcément le pH'],
                answer: 'A',
                explanation:
                    'L’oxydant capte des électrons et se réduit. Le moyen mnémotechnique demandé dans la spec est “OxAn RedCat”, utile pour bien situer les échanges.',
            },
            {
                question: `En chimie organique, un alcane est un composé :`,
                options: ['A. saturé en liaisons simples', 'B. portant obligatoirement un groupe -OH', 'C. aromatique uniquement', 'D. ionique'],
                answer: 'A',
                explanation:
                    'Les alcanes sont des hydrocarbures saturés. Leur formule générale est CnH2n+2 pour les chaînes acycliques simples.',
            },
        ],
        Mathématiques: [
            {
                question: `Pour une suite géométrique de raison q, l’expression correcte est :`,
                options: ['A. u_n = u_0 + nq', 'B. u_n = u_0 × q^n', 'C. u_n = q/u_0', 'D. u_n = u_0 - q^n'],
                answer: 'B',
                explanation:
                    'Une suite géométrique se construit par multiplication répétée par q. On obtient donc u_n = u_0 × q^n.',
            },
            {
                question: `Le signe de la dérivée f’ sur un intervalle permet de connaître :`,
                options: ['A. le domaine de définition uniquement', 'B. les unités de f', 'C. les variations de f', 'D. la parité de f'],
                answer: 'C',
                explanation:
                    'Si f’ est positive, la fonction est croissante; si f’ est négative, elle est décroissante. C’est la base des tableaux de variation.',
            },
            {
                question: `La formule de probabilité conditionnelle correcte est :`,
                options: ['A. P(A|B) = P(B|A)', 'B. P(A|B) = P(A∩B)/P(B)', 'C. P(A|B) = P(A)+P(B)', 'D. P(A|B) = 1-P(B)'],
                answer: 'B',
                explanation:
                    'La probabilité conditionnelle mesure la probabilité de A sachant que B est réalisé. On divise l’intersection par la probabilité de la condition.',
            },
            {
                question: `Dans le plan complexe, le module de z = a + ib vaut :`,
                options: ['A. a+b', 'B. a-b', 'C. √(a²+b²)', 'D. ab'],
                answer: 'C',
                explanation:
                    'Le module correspond à la distance du point image à l’origine. On applique le théorème de Pythagore.',
            },
            {
                question: `Dans la division euclidienne de a par b, on écrit :`,
                options: ['A. a = b + r', 'B. a = bq + r', 'C. a = qr', 'D. a = b/r'],
                answer: 'B',
                explanation:
                    'La division euclidienne s’écrit a = bq + r avec 0 ≤ r < b. C’est le point de départ des exercices d’arithmétique au BAC.',
            },
        ],
        Physique: [
            {
                question: `La deuxième loi de Newton s’écrit :`,
                options: ['A. ΣF⃗ = m a⃗', 'B. P = UI', 'C. E = mc²', 'D. v = λ/T²'],
                answer: 'A',
                explanation:
                    'La somme vectorielle des forces extérieures est égale au produit de la masse par l’accélération. C’est la base de toute étude mécanique.',
            },
            {
                question: `Dans un mouvement de projectile sans frottement, l’accélération est :`,
                options: ['A. nulle', 'B. horizontale uniquement', 'C. verticale de valeur g vers le bas', 'D. variable selon x'],
                answer: 'C',
                explanation:
                    'Sans frottement, seule la pesanteur agit. L’accélération est constante, verticale et dirigée vers le bas.',
            },
            {
                question: `Pour un circuit RC, la constante de temps vaut :`,
                options: ['A. R/C', 'B. RC', 'C. C/R', 'D. R+ C'],
                answer: 'B',
                explanation:
                    'La constante de temps du circuit RC est τ = RC. Elle règle la rapidité de charge et de décharge du condensateur.',
            },
            {
                question: `La relation de conjugaison d’une lentille mince est :`,
                options: ['A. 1/f = 1/p\' - 1/p', 'B. f = p + p\'', 'C. 1/f = p/p\'', 'D. p = fp\''],
                answer: 'A',
                explanation:
                    'La relation de conjugaison relie la focale et les positions de l’objet et de l’image. Elle est centrale en optique géométrique.',
            },
            {
                question: `Pour une onde périodique, la relation fondamentale est :`,
                options: ['A. v = λf', 'B. v = f/λ', 'C. λ = f+v', 'D. T = λv'],
                answer: 'A',
                explanation:
                    'La célérité d’une onde est le produit de sa longueur d’onde par sa fréquence. Cette relation est utilisée en ondes et en physique atomique.',
            },
        ],
        SVT: [
            {
                question: `Dans un croisement monohybride de deux hétérozygotes, la proportion phénotypique classique est :`,
                options: ['A. 1/2 - 1/2', 'B. 3/4 - 1/4', 'C. 1/4 - 3/4 génotypique seulement', 'D. 100% identique'],
                answer: 'B',
                explanation:
                    'Pour un caractère dominant simple, on observe en général 3/4 de phénotype dominant et 1/4 de phénotype récessif.',
            },
            {
                question: `La transcription correspond au passage de :`,
                options: ['A. protéine vers ARN', 'B. ARN vers ADN', 'C. ADN vers ARN messager', 'D. glucose vers ATP'],
                answer: 'C',
                explanation:
                    'La transcription copie une portion d’ADN en ARN messager. C’est l’étape médiane de la chaîne ADN → ARNm → protéine.',
            },
            {
                question: `La mémoire immunitaire permet :`,
                options: ['A. une réponse secondaire plus rapide', 'B. de supprimer toute infection', 'C. d’éviter les mutations', 'D. d’empêcher les antigènes d’entrer'],
                answer: 'A',
                explanation:
                    'Après un premier contact, l’organisme conserve des cellules mémoire. La réponse secondaire est alors plus rapide et plus efficace.',
            },
            {
                question: `La sélection naturelle agit principalement sur :`,
                options: ['A. les caractères avantageux dans un milieu donné', 'B. le hasard pur sans variation', 'C. les seuls caractères acquis', 'D. les espèces immuables'],
                answer: 'A',
                explanation:
                    'Les individus les mieux adaptés ont plus de chances de survivre et se reproduire. Le milieu trie les variations existantes.',
            },
            {
                question: `Dans un écosystème, un facteur limitant est un facteur qui :`,
                options: ['A. n’a aucun effet', 'B. règle la croissance d’une population', 'C. remplace tous les autres', 'D. agit seulement en mer'],
                answer: 'B',
                explanation:
                    'Un facteur limitant comme l’eau, la lumière ou les nutriments contrôle le développement des populations et l’équilibre du milieu.',
            },
        ],
    };

    const template = templates[subjectName][exerciseIndex % templates[subjectName].length];
    const correctLabel = template.options.find((option) => option.startsWith(`${template.answer}.`)) ?? template.options[0];

    return {
        id: randomUUID(),
        type: 'qcm',
        difficulty: (exerciseIndex % 5) + 1,
        title: `${base} — QCM ${exerciseIndex + 1}`,
        question_text: template.question,
        options: template.options.map((label) => ({
            label: label.slice(0, 1),
            text: label.slice(3),
        })),
        correct_answer: template.answer,
        explanation: `${template.explanation} Réponse correcte: ${correctLabel}.`,
        hints: [
            CHAPTER_HINTS[0],
            `${CHAPTER_HINTS[1]} Ici, pense à: ${chapterTitle}.`,
        ],
        is_annale: chapterIndex === 0 && exerciseIndex < 2,
        annale_year: chapterIndex === 0 && exerciseIndex < 2 ? 2020 + exerciseIndex : null,
        annale_session: chapterIndex === 0 && exerciseIndex < 2 ? 'Principale' : null,
        estimated_time_minutes: 6,
        points: 10,
        ai_generated: false,
        is_published: true,
    };
}

async function seed() {
    console.log('Connexion PostgreSQL...');
    await testDatabaseConnection();
    console.log('Connexion PostgreSQL OK');

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query(`
            DELETE FROM forum_likes;
            DELETE FROM forum_replies;
            DELETE FROM forum_posts;
            DELETE FROM ai_sessions;
            DELETE FROM daily_tasks;
            DELETE FROM revision_plans;
            DELETE FROM chapter_progress;
            DELETE FROM student_performances;
            DELETE FROM payments;
            DELETE FROM exercises;
            DELETE FROM chapters;
            DELETE FROM subjects;
            DELETE FROM users WHERE email IN ('admin@bac-senegal.sn', 'test@bac-senegal.sn');
        `);

        const subjectMap = new Map();

        for (const [serieCode, subjects] of Object.entries(SERIES_SUBJECTS)) {
            for (const [index, rawSubject] of subjects.entries()) {
                const subjectId = FIXED_IDS[`${serieCode}:${rawSubject.name}`] ?? randomUUID();
                const meta = defaultSubjectMeta({ ...rawSubject, serie_code: serieCode }, index);

                await client.query(
                    `
                        INSERT INTO subjects (
                            id, serie_code, name, slug, coefficient, icon, color, description, order_index
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    `,
                    [
                        subjectId,
                        serieCode,
                        rawSubject.name,
                        slugify(rawSubject.name),
                        rawSubject.coefficient,
                        meta.icon,
                        meta.color,
                        meta.description,
                        index + 1,
                    ],
                );

                subjectMap.set(`${serieCode}:${rawSubject.name}`, subjectId);
            }
        }

        let chaptersInserted = 0;
        let exercisesInserted = 0;

        for (const [subjectName, chapters] of Object.entries(S2_CHAPTERS)) {
            const subjectId = subjectMap.get(`S2:${subjectName}`);

            for (const [chapterIndex, chapter] of chapters.entries()) {
                const chapterId = randomUUID();

                await client.query(
                    `
                        INSERT INTO chapters (
                            id, subject_id, title, slug, order_index, course_content, summary, key_formulas, mnemonics, is_published
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10)
                    `,
                    [
                        chapterId,
                        subjectId,
                        chapter.title,
                        slugify(chapter.title),
                        chapterIndex + 1,
                        `Cours synthétique sur ${chapter.title} pour le BAC Sénégal S2.`,
                        `Résumé du chapitre ${chapter.title}.`,
                        JSON.stringify(chapter.formulas),
                        JSON.stringify(['Relire la définition clé', 'Faire un exercice d’application directe']),
                        true,
                    ],
                );

                chaptersInserted += 1;

                for (let exerciseIndex = 0; exerciseIndex < 5; exerciseIndex += 1) {
                    const exercise = createQcm(subjectName, chapter.title, chapterIndex, exerciseIndex);

                    await client.query(
                        `
                            INSERT INTO exercises (
                                id, chapter_id, subject_id, type, difficulty, title, question_text, options, correct_answer,
                                explanation, hints, is_annale, annale_year, annale_session, estimated_time_minutes,
                                points, ai_generated, is_published, created_at
                            ) VALUES (
                                $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11::jsonb, $12, $13, $14, $15, $16, $17, $18, NOW()
                            )
                        `,
                        [
                            exercise.id,
                            chapterId,
                            subjectId,
                            exercise.type,
                            exercise.difficulty,
                            exercise.title,
                            exercise.question_text,
                            JSON.stringify(exercise.options),
                            exercise.correct_answer,
                            exercise.explanation,
                            JSON.stringify(exercise.hints),
                            exercise.is_annale,
                            exercise.annale_year,
                            exercise.annale_session,
                            exercise.estimated_time_minutes,
                            exercise.points,
                            exercise.ai_generated,
                            exercise.is_published,
                        ],
                    );

                    exercisesInserted += 1;
                }
            }
        }

        const adminPasswordHash = await bcrypt.hash('Admin123!', 12);
        const testPasswordHash = await bcrypt.hash('eleve123', 12);

        await client.query(
            `
                INSERT INTO users (
                    id, email, password_hash, prenom, nom, serie_code, role, total_points, streak_days, longest_streak, is_premium
                ) VALUES
                    ($1, $2, $3, $4, $5, $6, $7, 0, 0, 0, true),
                    ($8, $9, $10, $11, $12, $13, $14, 0, 0, 0, false)
            `,
            [
                '00000000-0000-4000-a000-000000000001',
                'admin@bac-senegal.sn',
                adminPasswordHash,
                'Admin',
                'BAC',
                'S2',
                'admin',
                '00000000-0000-4000-a000-000000000002',
                'test@bac-senegal.sn',
                testPasswordHash,
                'Aminata',
                'Diallo',
                'S2',
                'eleve',
            ],
        );

        await client.query('COMMIT');

        console.log(`Matières insérées: ${subjectMap.size}`);
        console.log(`Chapitres S2 insérés: ${chaptersInserted}`);
        console.log(`Exercices S2 insérés: ${exercisesInserted}`);
        console.log('Utilisateurs de démonstration créés: 2');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

seed().catch((error) => {
    console.error('Échec du seed:', error);
    process.exitCode = 1;
});
