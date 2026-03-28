import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { pool } from './pool.js';

async function seed() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // ── L2 : Philosophie, Français, Histoire-Géo, Mathématiques ──
        const l2Subjects = {
            'Philosophie':       '98d1f519-53b1-42b5-a3c2-fb6d9aa7cc87',
            'Français':          '46022a0c-00dd-453f-b216-646d9c6774ea',
            'Histoire-Géographie': 'a94cfbcf-d46a-45ca-a8de-27ab10998c8e',
            'Mathématiques':     '5633cd7a-d740-43fe-9042-6bff22be8ff9',
        };

        // ── T : Mathématiques, Physique, Histoire-Géo, Français ──
        const tSubjects = {
            'Mathématiques':      '5aab8fbb-d5f3-4905-b764-88625cca774b',
            'Physique':           'dc43d22b-55a0-48e5-a7df-0af13a3e3dc0',
            'Sciences et Techniques': '06371a31-2dc7-479c-8dcf-3900ba9e5f0a',
            'Histoire-Géographie': '7d9ecf9f-8a53-47c9-97ae-62987e2b6edb',
            'Français':           '51b10f29-2bc1-4a15-abe9-15e27b9e0895',
        };

        const chaptersData = [
            // ── L2 Philosophie ──
            {
                subjectId: l2Subjects['Philosophie'],
                chapters: [
                    {
                        title: 'La conscience et l\'inconscient',
                        order: 1,
                        course_content: '# La conscience et l\'inconscient\n\n## La conscience\nLa conscience est la connaissance immédiate que le sujet a de ses propres états. Elle est **réflexive** (se retourne sur elle-même) et **intentionnelle** (toujours conscience de quelque chose).\n\n## L\'inconscient freudien\nFreud distingue : le **Ça** (pulsions), le **Moi** (instance médiatrice) et le **Surmoi** (intériorisation des interdits sociaux).\n\n## Citations clés\n- Descartes : "Je pense, donc je suis"\n- Freud : "Le moi n\'est pas maître dans sa propre maison"',
                        exercises: [
                            {
                                title: 'Conscience et réflexivité',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Qu\'est-ce qui distingue la conscience humaine selon Descartes ?',
                                options: ['La capacité à ressentir des émotions', 'Le cogito : la pensée comme certitude première', 'L\'instinct de survie', 'La mémoire des événements passés'],
                                correct_answer: 'B',
                                explanation: 'Descartes fonde la certitude de l\'existence sur la pensée : "Je pense donc je suis" (cogito ergo sum). La conscience se distingue par cette réflexivité — elle peut se prendre elle-même comme objet.',
                                hints: ['Pensez à la méthode du doute cartésien', 'Quelle est la première certitude indubitable pour Descartes ?'],
                                points: 2,
                            },
                            {
                                title: 'L\'inconscient freudien',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Dans la topique freudienne, quelle instance représente les pulsions refoulées ?',
                                options: ['Le Moi', 'Le Surmoi', 'Le Ça', 'La conscience morale'],
                                correct_answer: 'C',
                                explanation: 'Le "Ça" est le réservoir des pulsions et des désirs refoulés. Il fonctionne selon le principe de plaisir et est totalement inconscient. Le Moi médie entre le Ça et la réalité.',
                                hints: ['C\'est la partie la plus primitive de l\'appareil psychique', 'Elle fonctionne selon le principe de plaisir'],
                                points: 2,
                            },
                            {
                                title: 'Critique de l\'inconscient',
                                type: 'qcm',
                                difficulty: 'hard',
                                question: 'Quel argument Sartre oppose-t-il à la notion d\'inconscient freudien ?',
                                options: [
                                    'L\'inconscient n\'existe pas car le cerveau est trop complexe',
                                    'La mauvaise foi : on se ment à soi-même consciemment, pas inconsciemment',
                                    'Les rêves n\'ont aucune signification psychologique',
                                    'La psychanalyse n\'est pas une science rigoureuse',
                                ],
                                correct_answer: 'B',
                                explanation: 'Sartre critique l\'inconscient en montrant que ce que Freud appelle refoulement est en réalité une "mauvaise foi" : une fuite consciente devant sa propre liberté. L\'homme est condamné à être libre et responsable.',
                                hints: ['Sartre est existentialiste — pour lui l\'existence précède l\'essence', 'La mauvaise foi est un concept clé de "L\'Être et le Néant"'],
                                points: 3,
                            },
                        ],
                    },
                    {
                        title: 'La liberté et la responsabilité',
                        order: 2,
                        course_content: '# La liberté et la responsabilité\n\n## Le libre arbitre\nCapacité à choisir entre plusieurs possibles. Débat entre **déterminisme** (tout est causé) et **indéterminisme**.\n\n## Responsabilité morale\nOn n\'est responsable que de ce qui dépend de nous (**Épictète**). Pour Kant, la liberté est postulat de la raison pratique.\n\n## Sartre et la liberté\n"L\'existence précède l\'essence" — l\'homme est condamné à être libre.',
                        exercises: [
                            {
                                title: 'Déterminisme et liberté',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Pour Spinoza, l\'homme qui croit être libre est comparé à :',
                                options: [
                                    'Un roi sans royaume',
                                    'Une pierre lancée qui se croirait libre de voler',
                                    'Un enfant qui ignore les lois de la nature',
                                    'Un animal domestiqué',
                                ],
                                correct_answer: 'B',
                                explanation: 'Spinoza compare l\'illusion de la liberté à une pierre lancée qui, si elle était consciente, croirait voler librement. L\'homme ignore les causes qui le déterminent et se croit libre.',
                                hints: ['Spinoza est déterministe', 'Il fait référence à une pierre en mouvement dans ses lettres'],
                                points: 2,
                            },
                        ],
                    },
                    {
                        title: 'La vérité et la connaissance',
                        order: 3,
                        course_content: '# La vérité et la connaissance\n\n## Définitions\n- **Vérité** : adéquation de la pensée à la réalité (conception classique)\n- **Connaissance** : représentation justifiée et vraie (Platon : epistémè vs doxa)\n\n## Les sources de la connaissance\n1. **Rationalisme** (Descartes, Leibniz) : la raison est source première\n2. **Empirisme** (Hume, Locke) : l\'expérience est la seule source\n3. **Criticisme** (Kant) : synthèse raison + sensibilité\n\n## La vérité scientifique\nPopper : une théorie est scientifique si elle est **réfutable**.',
                        exercises: [
                            {
                                title: 'Rationalisme vs empirisme',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Selon Hume, quelle est la source unique de toute connaissance ?',
                                options: ['La raison innée', 'L\'intuition intellectuelle', 'L\'expérience sensible', 'La révélation divine'],
                                correct_answer: 'C',
                                explanation: 'Hume est un empiriste radical : toutes nos idées viennent de nos impressions sensibles. Il n\'y a pas d\'idées innées. La causalité elle-même n\'est qu\'une habitude de l\'esprit.',
                                hints: ['Hume est empiriste, à l\'opposé du rationalisme de Descartes', 'Il critique la notion de causalité nécessaire'],
                                points: 2,
                            },
                            {
                                title: 'Le critère de scientificité',
                                type: 'qcm',
                                difficulty: 'hard',
                                question: 'Pour Karl Popper, qu\'est-ce qui distingue une théorie scientifique d\'une pseudo-science ?',
                                options: [
                                    'Elle est confirmée par de nombreuses expériences',
                                    'Elle est approuvée par la communauté scientifique',
                                    'Elle est falsifiable (réfutable par l\'expérience)',
                                    'Elle est mathématiquement démontrable',
                                ],
                                correct_answer: 'C',
                                explanation: 'Popper propose la "falsifiabilité" comme critère de démarcation. Une théorie scientifique doit pouvoir être réfutée par l\'expérience. La psychanalyse freudienne ou l\'astrologie ne sont pas falsifiables → pseudo-sciences.',
                                hints: ['Popper a développé l\'épistémologie critique', 'Le critère n\'est pas la vérification mais la possibilité de réfutation'],
                                points: 3,
                            },
                        ],
                    },
                    {
                        title: 'L\'État et la politique',
                        order: 4,
                        course_content: '# L\'État et la politique\n\n## Origine de l\'État\n- **Hobbes** : contrat social par peur — état de nature = "guerre de tous contre tous"\n- **Locke** : l\'État protège les droits naturels (vie, liberté, propriété)\n- **Rousseau** : volonté générale, souveraineté du peuple\n\n## La démocratie\nRégime où le pouvoir appartient au peuple (Abraham Lincoln : "gouvernement du peuple, par le peuple, pour le peuple").\n\n## La justice\n**Rawls** : voile d\'ignorance — les principes justes sont ceux choisis sans savoir notre position sociale.',
                        exercises: [
                            {
                                title: 'L\'état de nature selon Hobbes',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Quelle expression Hobbes utilise-t-il pour décrire l\'état de nature sans société civile ?',
                                options: [
                                    '"L\'homme est un loup pour l\'homme"',
                                    '"La liberté est l\'obéissance à la loi qu\'on s\'est prescrite"',
                                    '"L\'homme est naturellement bon"',
                                    '"La propriété c\'est le vol"',
                                ],
                                correct_answer: 'A',
                                explanation: 'Hobbes reprend l\'expression "homo homini lupus" (l\'homme est un loup pour l\'homme) pour décrire l\'état de nature : sans État, c\'est la guerre permanente. Le Léviathan (État) est nécessaire pour garantir la paix.',
                                hints: ['Hobbes est l\'auteur du "Léviathan"', 'Son état de nature est pessimiste, à l\'opposé de Rousseau'],
                                points: 2,
                            },
                        ],
                    },
                ],
            },

            // ── L2 Français ──
            {
                subjectId: l2Subjects['Français'],
                chapters: [
                    {
                        title: 'Littérature africaine et francophone',
                        order: 1,
                        course_content: '# Littérature africaine et francophone\n\n## La négritude\nMouvement littéraire et politique fondé par **Aimé Césaire**, **Léopold Sédar Senghor** et **Léon-Gontran Damas** dans les années 1930.\n\n## Auteurs majeurs\n- **Senghor** : "Chants d\'ombre", "Éthiopiques"\n- **Camara Laye** : "L\'Enfant noir"\n- **Sembène Ousmane** : "Les Bouts de bois de Dieu"\n- **Birago Diop** : "Les Contes d\'Amadou Koumba"\n\n## Thèmes récurrents\nIdentité, décolonisation, tradition vs modernité, exil.',
                        exercises: [
                            {
                                title: 'La Négritude',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Quel auteur sénégalais est le principal fondateur de la Négritude ?',
                                options: ['Birago Diop', 'Léopold Sédar Senghor', 'Sembène Ousmane', 'Cheikh Hamidou Kane'],
                                correct_answer: 'B',
                                explanation: 'Léopold Sédar Senghor, premier président du Sénégal, est l\'un des fondateurs du mouvement de la Négritude avec Aimé Césaire (Martinique) et Léon-Gontran Damas (Guyane). Il théorisa l\'idée de "civilisation de l\'universel".',
                                hints: ['Il fut aussi le premier président du Sénégal', 'Il est membre de l\'Académie française'],
                                points: 1,
                            },
                            {
                                title: 'Sembène Ousmane',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Quel est le thème central de "Les Bouts de bois de Dieu" de Sembène Ousmane ?',
                                options: [
                                    'L\'amour impossible entre deux jeunes de ethnies différentes',
                                    'La grève des cheminots du Dakar-Niger en 1947-1948',
                                    'L\'exil d\'un étudiant africain à Paris',
                                    'La résistance à la colonisation au XVIIe siècle',
                                ],
                                correct_answer: 'B',
                                explanation: 'Le roman de Sembène retrace la grande grève des cheminots du chemin de fer Dakar-Niger (1947-1948). C\'est une fresque sociale qui montre la solidarité des travailleurs africains face au colonialisme.',
                                hints: ['C\'est un roman à caractère historique et social', 'Le titre désigne les hommes — "bouts de bois de Dieu" dans la tradition orale'],
                                points: 2,
                            },
                        ],
                    },
                    {
                        title: 'La dissertation littéraire',
                        order: 2,
                        course_content: '# La dissertation littéraire\n\n## Structure\n1. **Introduction** : accroche, présentation du sujet, problématique, annonce du plan\n2. **Développement** : 2 ou 3 parties équilibrées avec sous-parties\n3. **Conclusion** : bilan, réponse à la problématique, ouverture\n\n## Types de plans\n- **Dialectique** (thèse/antithèse/synthèse) — pour les sujets de jugement\n- **Analytique** (causes → faits → conséquences)\n- **Thématique** (pour les sujets descriptifs)\n\n## Connecteurs logiques\n- Addition : de plus, en outre, par ailleurs\n- Opposition : cependant, néanmoins, en revanche\n- Conclusion : ainsi, par conséquent, en définitive',
                        exercises: [
                            {
                                title: 'Structure de la dissertation',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Dans quelle partie de la dissertation annonce-t-on le plan ?',
                                options: ['Dans chaque transition', 'Dans la conclusion', 'Dans l\'introduction', 'Dans le premier paragraphe du développement'],
                                correct_answer: 'C',
                                explanation: 'L\'annonce du plan se fait à la fin de l\'introduction, après l\'accroche, la présentation du sujet et la problématique. Elle permet au lecteur de savoir comment la réflexion sera organisée.',
                                hints: ['L\'introduction a 4 composantes', 'La problématique précède l\'annonce du plan'],
                                points: 1,
                            },
                        ],
                    },
                ],
            },

            // ── L2 Histoire-Géographie ──
            {
                subjectId: l2Subjects['Histoire-Géographie'],
                chapters: [
                    {
                        title: 'La décolonisation en Afrique',
                        order: 1,
                        course_content: '# La décolonisation en Afrique\n\n## Contexte\nAprès la 2ème Guerre mondiale, les mouvements nationalistes s\'intensifient. L\'ONU proclame le droit des peuples à disposer d\'eux-mêmes.\n\n## Les indépendances africaines\n- **1956** : Maroc et Tunisie indépendants\n- **1957** : Ghana (1er pays d\'Afrique subsaharienne indépendant — Nkrumah)\n- **1960** : "Année de l\'Afrique" — 17 indépendances dont le Sénégal (4 avril)\n- **1962** : Algérie (après une guerre de 8 ans)\n\n## Le Sénégal\nIndépendance le **4 avril 1960**. Léopold Sédar Senghor devient président.',
                        exercises: [
                            {
                                title: 'L\'Année de l\'Afrique',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Combien de pays africains ont obtenu leur indépendance en 1960, l\'"Année de l\'Afrique" ?',
                                options: ['8', '12', '17', '24'],
                                correct_answer: 'C',
                                explanation: '1960 est surnommée "l\'Année de l\'Afrique" car 17 pays africains accèdent à l\'indépendance cette année-là, dont le Sénégal (4 avril), le Congo, la Côte d\'Ivoire, le Mali, le Niger, etc.',
                                hints: ['C\'est un chiffre symbolique dans l\'histoire de la décolonisation', 'Le Sénégal fait partie de ces pays'],
                                points: 1,
                            },
                            {
                                title: 'La décolonisation violente',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Quelle colonie française a connu une guerre de décolonisation (1954-1962) ?',
                                options: ['Le Sénégal', 'Le Maroc', 'L\'Algérie', 'La Tunisie'],
                                correct_answer: 'C',
                                explanation: 'L\'Algérie est le cas le plus violent de décolonisation française. La guerre d\'Algérie (1954-1962) a fait environ 1,5 million de morts côté algérien. Les Accords d\'Évian (1962) mettent fin au conflit.',
                                hints: ['Ce pays n\'était pas une simple colonie mais un département français', 'La guerre a duré 8 ans'],
                                points: 2,
                            },
                            {
                                title: 'Indépendance du Sénégal',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'À quelle date le Sénégal a-t-il officiellement obtenu son indépendance ?',
                                options: ['1er janvier 1958', '4 avril 1960', '20 août 1960', '15 octobre 1962'],
                                correct_answer: 'B',
                                explanation: 'Le Sénégal a obtenu son indépendance le 4 avril 1960, date célébrée comme fête nationale. Léopold Sédar Senghor devient le premier président de la République du Sénégal.',
                                hints: ['C\'est la fête nationale du Sénégal', 'C\'est en 1960, l\'Année de l\'Afrique'],
                                points: 1,
                            },
                        ],
                    },
                    {
                        title: 'La Première Guerre mondiale',
                        order: 2,
                        course_content: '# La Première Guerre mondiale (1914-1918)\n\n## Causes\n- **Immédiates** : Assassinat de l\'archiduc François-Ferdinand à Sarajevo (28 juin 1914)\n- **Profondes** : nationalisme, impérialisme, alliances militaires\n\n## Principaux belligérants\n- **Triple Entente** : France, Royaume-Uni, Russie\n- **Triple Alliance** (Triplice) : Allemagne, Autriche-Hongrie, Italie (puis Turquie)\n\n## Bilan\n- 18-20 millions de morts\n- Fin des empires ottoman, austro-hongrois, russe et allemand\n- Traité de Versailles (1919)',
                        exercises: [
                            {
                                title: 'Déclenchement de la Grande Guerre',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Quel événement a directement déclenché la Première Guerre mondiale ?',
                                options: [
                                    'L\'invasion de la Belgique par l\'Allemagne',
                                    'L\'assassinat de l\'archiduc François-Ferdinand à Sarajevo',
                                    'La déclaration de guerre de la France à l\'Allemagne',
                                    'La mobilisation générale en Russie',
                                ],
                                correct_answer: 'B',
                                explanation: 'L\'assassinat de l\'archiduc François-Ferdinand d\'Autriche à Sarajevo le 28 juin 1914 par Gavrilo Princip (nationaliste serbe) déclenche le mécanisme des alliances et conduit à la guerre généralisée.',
                                hints: ['C\'est un attentat dans les Balkans', 'L\'archiduc était l\'héritier de l\'empire austro-hongrois'],
                                points: 1,
                            },
                        ],
                    },
                ],
            },

            // ── L2 Mathématiques ──
            {
                subjectId: l2Subjects['Mathématiques'],
                chapters: [
                    {
                        title: 'Suites numériques',
                        order: 1,
                        course_content: '# Suites numériques\n\n## Définitions\n- **Suite arithmétique** : $u_{n+1} = u_n + r$ (raison $r$)\n  - Terme général : $u_n = u_0 + nr$\n  - Somme : $S = n \\times \\frac{u_0 + u_{n-1}}{2}$\n- **Suite géométrique** : $u_{n+1} = u_n \\times q$ (raison $q$)\n  - Terme général : $u_n = u_0 \\times q^n$\n  - Somme : $S = u_0 \\times \\frac{1 - q^n}{1 - q}$ (si $q \\neq 1$)\n\n## Convergence\nUne suite est convergente si elle admet une limite finie.',
                        exercises: [
                            {
                                title: 'Terme général d\'une suite arithmétique',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'La suite arithmétique (uₙ) vérifie u₀ = 3 et r = 5. Quelle est la valeur de u₄ ?',
                                options: ['18', '20', '23', '25'],
                                correct_answer: 'C',
                                explanation: 'Pour une suite arithmétique : uₙ = u₀ + n×r. Donc u₄ = 3 + 4×5 = 3 + 20 = 23.',
                                hints: ['Utilisez la formule uₙ = u₀ + n×r', 'n = 4, u₀ = 3, r = 5'],
                                points: 1,
                            },
                            {
                                title: 'Somme d\'une suite géométrique',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Calculer la somme S = 1 + 2 + 4 + 8 + 16 + 32',
                                options: ['62', '63', '64', '65'],
                                correct_answer: 'B',
                                explanation: 'C\'est une suite géométrique de raison q=2, u₀=1, n=6 termes. S = u₀×(1-qⁿ)/(1-q) = 1×(1-64)/(1-2) = (-63)/(-1) = 63.',
                                hints: ['C\'est une suite géométrique de raison 2', 'S = (qⁿ - 1)/(q - 1) × u₀'],
                                points: 2,
                            },
                            {
                                title: 'Convergence de suite',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'La suite géométrique de raison q = 1/3 est :',
                                options: ['Divergente vers +∞', 'Convergente vers 0', 'Convergente vers 1', 'Périodique'],
                                correct_answer: 'B',
                                explanation: 'Une suite géométrique converge vers 0 si et seulement si |q| < 1. Ici |1/3| = 1/3 < 1, donc la suite converge vers 0. Les termes uₙ = u₀ × (1/3)ⁿ → 0 quand n → +∞.',
                                hints: ['|q| < 1 implique convergence', 'Les puissances de 1/3 tendent vers 0'],
                                points: 2,
                            },
                        ],
                    },
                    {
                        title: 'Probabilités et statistiques',
                        order: 2,
                        course_content: '# Probabilités et statistiques\n\n## Probabilités\n- **Probabilité** : $P(A) = \\frac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$\n- **Événements indépendants** : $P(A \\cap B) = P(A) \\times P(B)$\n- **Formule de Bayes** : $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$\n\n## Statistiques\n- **Moyenne** : $\\bar{x} = \\frac{\\sum x_i}{n}$\n- **Variance** : $V = \\frac{\\sum (x_i - \\bar{x})^2}{n}$\n- **Écart-type** : $\\sigma = \\sqrt{V}$',
                        exercises: [
                            {
                                title: 'Calcul de probabilité',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'On lance un dé équilibré à 6 faces. Quelle est la probabilité d\'obtenir un nombre pair ?',
                                options: ['1/6', '1/3', '1/2', '2/3'],
                                correct_answer: 'C',
                                explanation: 'Les nombres pairs de 1 à 6 sont : 2, 4, 6. Il y a 3 cas favorables sur 6 cas possibles. P(pair) = 3/6 = 1/2.',
                                hints: ['Combien de nombres pairs entre 1 et 6 ?', 'P = cas favorables / cas possibles'],
                                points: 1,
                            },
                            {
                                title: 'Événements indépendants',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'On lance deux pièces. Quelle est la probabilité d\'obtenir deux faces ?',
                                options: ['1/4', '1/3', '1/2', '3/4'],
                                correct_answer: 'A',
                                explanation: 'Les deux lancers sont indépendants. P(face 1) = 1/2 et P(face 2) = 1/2. P(face ET face) = 1/2 × 1/2 = 1/4.',
                                hints: ['Les deux lancers sont indépendants', 'P(A ∩ B) = P(A) × P(B) si indépendants'],
                                points: 2,
                            },
                        ],
                    },
                ],
            },

            // ── T Mathématiques (Terminale technique) ──
            {
                subjectId: tSubjects['Mathématiques'],
                chapters: [
                    {
                        title: 'Calcul intégral',
                        order: 1,
                        course_content: '# Calcul intégral\n\n## Primitives usuelles\n| f(x) | F(x) |\n|------|------|\n| xⁿ (n≠-1) | xⁿ⁺¹/(n+1) |\n| 1/x | ln|x| |\n| eˣ | eˣ |\n| cos(x) | sin(x) |\n| sin(x) | -cos(x) |\n\n## Intégrale définie\n$$\\int_a^b f(x)\\,dx = [F(x)]_a^b = F(b) - F(a)$$\n\n## Applications\n- Aire entre courbe et axe des x\n- Calcul de valeur moyenne : $\\bar{f} = \\frac{1}{b-a}\\int_a^b f(x)\\,dx$',
                        exercises: [
                            {
                                title: 'Primitive d\'une fonction',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Quelle est une primitive de f(x) = 3x² + 2x ?',
                                options: ['6x + 2', 'x³ + x²', 'x³ + x² + C', '3x³ + 2x²'],
                                correct_answer: 'C',
                                explanation: 'La primitive de xⁿ est xⁿ⁺¹/(n+1). Donc primitive de 3x² = 3×x³/3 = x³ et primitive de 2x = 2×x²/2 = x². La primitive générale est F(x) = x³ + x² + C (constante).',
                                hints: ['Primitive de xⁿ = xⁿ⁺¹/(n+1)', 'N\'oubliez pas la constante C'],
                                points: 2,
                            },
                            {
                                title: 'Calcul d\'intégrale définie',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Calculer ∫₀² (2x + 1) dx',
                                options: ['4', '5', '6', '7'],
                                correct_answer: 'C',
                                explanation: '∫₀²(2x+1)dx = [x² + x]₀² = (4+2) - (0+0) = 6.',
                                hints: ['La primitive de 2x+1 est x²+x', 'Appliquez la formule [F(x)]₀²= F(2)-F(0)'],
                                points: 2,
                            },
                        ],
                    },
                    {
                        title: 'Équations différentielles',
                        order: 2,
                        course_content: '# Équations différentielles du 1er ordre\n\n## Forme générale\n$y\' + ay = f(x)$ ou $y\' = ky$\n\n## Solution de y\' = ky\nSolution générale : $y = Ce^{kx}$ (C constante)\n\n## Problème de Cauchy\nAvec condition initiale $y(x_0) = y_0$, on détermine C.\n\n## Applications\n- Croissance/décroissance exponentielle\n- Désintégration radioactive : $N(t) = N_0 e^{-\\lambda t}$\n- Population : $P(t) = P_0 e^{rt}$',
                        exercises: [
                            {
                                title: 'Solution d\'une équation différentielle',
                                type: 'qcm',
                                difficulty: 'hard',
                                question: 'La solution générale de y\' = 3y est :',
                                options: ['y = 3e^x', 'y = Ce^(3x)', 'y = C + 3x', 'y = 3Cx'],
                                correct_answer: 'B',
                                explanation: 'L\'équation y\' = ky a pour solution générale y = Ce^(kx). Ici k=3, donc y = Ce^(3x) où C est une constante réelle quelconque.',
                                hints: ['L\'équation est de la forme y\' = ky', 'La solution est toujours une exponentielle'],
                                points: 3,
                            },
                        ],
                    },
                ],
            },

            // ── T Physique ──
            {
                subjectId: tSubjects['Physique'],
                chapters: [
                    {
                        title: 'Électricité : circuits en courant continu',
                        order: 1,
                        course_content: '# Circuits en courant continu\n\n## Lois fondamentales\n- **Loi d\'Ohm** : $U = R \\times I$\n- **Loi de Joule** : $P = U \\times I = R \\times I^2$\n- **Loi des nœuds** : $\\sum I_{entrants} = \\sum I_{sortants}$\n- **Loi des mailles** : $\\sum U = 0$ (somme algébrique des tensions)\n\n## Résistances\n- En série : $R_{eq} = R_1 + R_2 + ...$\n- En parallèle : $\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + ...$\n\n## Condensateur\n$Q = C \\times U$ (charge, capacité, tension)',
                        exercises: [
                            {
                                title: 'Loi d\'Ohm',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Un résistor de 100 Ω est soumis à une tension de 12 V. Quel est le courant qui le traverse ?',
                                options: ['0,12 A', '1,2 A', '0,12 mA', '12 A'],
                                correct_answer: 'A',
                                explanation: 'Loi d\'Ohm : I = U/R = 12/100 = 0,12 A. C\'est bien 120 mA = 0,12 A.',
                                hints: ['Loi d\'Ohm : U = R × I donc I = U/R', 'U = 12 V, R = 100 Ω'],
                                points: 1,
                            },
                            {
                                title: 'Résistances en série',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Deux résistances R₁ = 20 Ω et R₂ = 30 Ω sont en série. Quelle est la résistance équivalente ?',
                                options: ['10 Ω', '12 Ω', '50 Ω', '600 Ω'],
                                correct_answer: 'C',
                                explanation: 'En série : Req = R1 + R2 = 20 + 30 = 50 Ω.',
                                hints: ['En série, les résistances s\'additionnent', 'Req = R1 + R2'],
                                points: 1,
                            },
                            {
                                title: 'Puissance dissipée',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Une ampoule de 60 Ω est traversée par un courant de 0,5 A. Quelle puissance dissipe-t-elle ?',
                                options: ['15 W', '30 W', '60 W', '120 W'],
                                correct_answer: 'A',
                                explanation: 'P = R × I² = 60 × (0,5)² = 60 × 0,25 = 15 W. Ou bien : U = R×I = 30 V, puis P = U×I = 30×0,5 = 15 W.',
                                hints: ['P = R × I²  ou  P = U × I', 'I² = (0,5)² = 0,25'],
                                points: 2,
                            },
                        ],
                    },
                    {
                        title: 'Mécanique : dynamique du point',
                        order: 2,
                        course_content: '# Dynamique du point\n\n## Lois de Newton\n1. **Principe d\'inertie** : Sans force, un corps est au repos ou en mouvement rectiligne uniforme\n2. **Principe fondamental** : $\\vec{F} = m\\vec{a}$ (somme des forces = masse × accélération)\n3. **Principe des actions réciproques** : Si A exerce $\\vec{F}$ sur B, alors B exerce $-\\vec{F}$ sur A\n\n## Chute libre\n- Accélération : $g = 9,8 \\text{ m/s}^2$\n- Vitesse : $v = gt$ (départ du repos)\n- Distance : $h = \\frac{1}{2}gt^2$\n\n## Travail et énergie\n$W = F \\times d \\times \\cos\\theta$',
                        exercises: [
                            {
                                title: 'Principe fondamental de la dynamique',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'Une force nette de 20 N s\'applique sur un objet de 4 kg. Quelle est son accélération ?',
                                options: ['0,2 m/s²', '2,5 m/s²', '5 m/s²', '80 m/s²'],
                                correct_answer: 'C',
                                explanation: '2ème loi de Newton : F = m×a → a = F/m = 20/4 = 5 m/s².',
                                hints: ['F = m × a, donc a = F/m', 'F = 20 N, m = 4 kg'],
                                points: 2,
                            },
                        ],
                    },
                ],
            },

            // ── T Sciences et Techniques ──
            {
                subjectId: tSubjects['Sciences et Techniques'],
                chapters: [
                    {
                        title: 'Technologie industrielle : matériaux',
                        order: 1,
                        course_content: '# Matériaux industriels\n\n## Classification\n1. **Métaux et alliages** : fer, acier, aluminium, cuivre\n2. **Polymères** : plastiques (PVC, polyéthylène), élastomères (caoutchouc)\n3. **Céramiques** : verre, porcelaine, béton\n4. **Composites** : fibre de carbone + résine\n\n## Propriétés mécaniques\n- **Dureté** : résistance à la rayure (Échelle Mohs, Vickers)\n- **Ductilité** : capacité à se déformer sans rupture\n- **Résistance à la traction** : contrainte maximale avant rupture\n\n## Traitements thermiques\n- **Trempe** : durcissement rapide\n- **Recuit** : adoucissement par refroidissement lent',
                        exercises: [
                            {
                                title: 'Classification des matériaux',
                                type: 'qcm',
                                difficulty: 'easy',
                                question: 'Dans quelle catégorie classe-t-on le PVC (Polychlorure de vinyle) ?',
                                options: ['Métal ferreux', 'Polymère thermoplastique', 'Céramique', 'Composite'],
                                correct_answer: 'B',
                                explanation: 'Le PVC est un polymère thermoplastique (plastique). Les thermoplastiques se ramollissent à la chaleur et peuvent être remoulés. Le PVC est très utilisé pour les tuyaux, câbles électriques, et menuiseries.',
                                hints: ['PVC = Polychlorure de vinyle → poly = polymère', 'Ce n\'est pas un métal'],
                                points: 1,
                            },
                            {
                                title: 'Propriétés des aciers',
                                type: 'qcm',
                                difficulty: 'medium',
                                question: 'La trempe de l\'acier a pour but principal de :',
                                options: [
                                    'Réduire sa masse volumique',
                                    'Augmenter sa conductivité électrique',
                                    'Augmenter sa dureté et sa résistance',
                                    'Améliorer sa résistance à la corrosion',
                                ],
                                correct_answer: 'C',
                                explanation: 'La trempe consiste à chauffer l\'acier à haute température puis à le refroidir rapidement (dans l\'eau ou l\'huile). Cela transforme la structure cristalline et augmente considérablement la dureté et la résistance mécanique.',
                                hints: ['La trempe implique un refroidissement rapide', 'Elle modifie la structure cristalline'],
                                points: 2,
                            },
                        ],
                    },
                ],
            },
        ];

        let totalChapters = 0;
        let totalExercises = 0;

        for (const { subjectId, chapters } of chaptersData) {
            for (const ch of chapters) {
                // Check if chapter already exists
                const existingCh = await client.query(
                    'SELECT id FROM chapters WHERE subject_id = $1 AND title = $2',
                    [subjectId, ch.title],
                );
                let chapterId;
                if (existingCh.rows.length > 0) {
                    chapterId = existingCh.rows[0].id;
                } else {
                    const r = await client.query(
                        `INSERT INTO chapters (id, subject_id, title, order_index, course_content, is_published)
                         VALUES (gen_random_uuid(), $1, $2, $3, $4, true) RETURNING id`,
                        [subjectId, ch.title, ch.order, ch.course_content],
                    );
                    chapterId = r.rows[0].id;
                    totalChapters++;
                }

                for (const ex of ch.exercises) {
                    const existingEx = await client.query(
                        'SELECT id FROM exercises WHERE chapter_id = $1 AND title = $2',
                        [chapterId, ex.title],
                    );
                    if (existingEx.rows.length === 0) {
                        const diffMap = { easy: 1, medium: 2, hard: 3 };
                    const diffInt = typeof ex.difficulty === 'string' ? (diffMap[ex.difficulty] ?? 2) : ex.difficulty;
                    await client.query(
                            `INSERT INTO exercises (id, chapter_id, title, type, difficulty, question_text, options, correct_answer, explanation, hints, points, is_published)
                             VALUES (gen_random_uuid(),$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true)`,
                            [
                                chapterId,
                                ex.title,
                                ex.type,
                                diffInt,
                                ex.question,
                                JSON.stringify(ex.options),
                                ex.correct_answer,
                                ex.explanation,
                                JSON.stringify(ex.hints),
                                ex.points,
                            ],
                        );
                        totalExercises++;
                    }
                }
            }
        }

        await client.query('COMMIT');
        console.log(`✅ ${totalChapters} chapitres + ${totalExercises} exercices créés pour L2 et T.`);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Erreur:', err.message);
    } finally {
        client.release();
        await pool.end();
    }
}

seed();
