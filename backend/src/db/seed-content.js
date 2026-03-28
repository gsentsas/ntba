/**
 * seed-content.js
 * Ajoute les chapitres et exercices pour les séries S1, L1, L2, STEG, G, T
 * Utilise le même schéma que le seed principal, sans doublons.
 */
import { randomUUID } from 'node:crypto';
import { pool, testDatabaseConnection } from './pool.js';

// ─────────────────────────────────────────────────────────────
// CONTENU PAR SÉRIE
// ─────────────────────────────────────────────────────────────

const CONTENT = {

  // ── S1 : similaire à S2 mais SVT plus poussée ──────────────
  S1: {
    'Mathématiques': {
      chapters: [
        { title: 'Suites numériques', formulas: ['u_n = u_0 + nr (arithmétique)', 'u_n = u_0 × q^n (géométrique)', 'Somme géom : S = u_0(1-q^n)/(1-q)'] },
        { title: 'Dérivées et applications', formulas: ["f'(x) = lim[f(x+h)-f(x)]/h", "(uv)' = u'v + uv'", "(u/v)' = (u'v - uv')/v²"] },
        { title: 'Intégrales et primitives', formulas: ['∫x^n dx = x^(n+1)/(n+1) + C', '∫e^x dx = e^x + C', 'Aire = ∫[a,b]|f(x)|dx'] },
        { title: 'Probabilités et statistiques', formulas: ['P(A∪B) = P(A)+P(B)-P(A∩B)', 'E(X) = Σ x_i × p_i', 'Var(X) = E(X²) - [E(X)]²'] },
        { title: 'Géométrie dans l\'espace', formulas: ['Cos θ = (u⃗·v⃗)/(|u⃗||v⃗|)', 'Équation plan: ax+by+cz+d=0', 'Distance point-plan: |ax₀+by₀+cz₀+d|/√(a²+b²+c²)'] },
      ],
      exercises: {
        'Suites numériques': [
          { q: 'Une suite arithmétique a pour premier terme u_0 = 3 et raison r = 5. Quel est u_4 ?', opts: ['A. 20','B. 23','C. 18','D. 25'], ans: 'B', expl: 'u_4 = u_0 + 4r = 3 + 4×5 = 23. Pour une suite arithmétique, chaque terme augmente de r = 5.' },
          { q: 'La somme des 5 premiers termes d\'une suite géométrique de raison 2 et de premier terme 1 est :', opts: ['A. 10','B. 31','C. 16','D. 25'], ans: 'B', expl: 'S = 1×(1-2^5)/(1-2) = (1-32)/(-1) = 31.' },
          { q: 'Une suite géométrique vérifie u_0 = 4 et u_3 = 32. Sa raison est :', opts: ['A. 2','B. 4','C. 8','D. 16'], ans: 'A', expl: 'u_3 = 4 × q^3 = 32 donc q^3 = 8, soit q = 2.' },
          { q: 'La limite d\'une suite géométrique de raison q vérifie |q| < 1. Elle vaut :', opts: ['A. +∞','B. 0','C. 1','D. q'], ans: 'B', expl: 'Si |q| < 1, q^n → 0 donc u_n = u_0 × q^n → 0. La suite converge vers 0.' },
          { q: 'Une suite arithmétique de raison r > 0 est :', opts: ['A. décroissante','B. constante','C. croissante','D. divergente'], ans: 'C', expl: 'u_(n+1) - u_n = r > 0 : chaque terme est plus grand que le précédent. La suite est strictement croissante.' },
        ],
        'Dérivées et applications': [
          { q: 'La dérivée de f(x) = x³ - 2x + 1 est :', opts: ['A. 3x² - 2','B. x² - 2x','C. 3x - 2','D. x³ - 2'], ans: 'A', expl: 'On dérive terme à terme : (x³)\'=3x², (-2x)\'=-2, (1)\'=0. Donc f\'(x) = 3x² - 2.' },
          { q: 'Si f\'(x) > 0 sur ]a;b[, alors f est :', opts: ['A. décroissante sur ]a;b[','B. constante sur ]a;b[','C. croissante sur ]a;b[','D. nulle sur ]a;b['], ans: 'C', expl: 'Le signe positif de f\' indique que f monte. C\'est la règle fondamentale des tableaux de variation.' },
          { q: 'La dérivée de f(x) = e^(2x) est :', opts: ['A. e^(2x)','B. 2e^(2x)','C. 2xe^(2x)','D. e^x'], ans: 'B', expl: 'Par la règle de composition, (e^(u))\'= u\'×e^u avec u = 2x donc u\'= 2. Résultat : 2e^(2x).' },
          { q: 'En un point de maximum local, la dérivée f\'(x) vaut :', opts: ['A. +∞','B. f(x)','C. 1','D. 0'], ans: 'D', expl: 'En tout extremum (max ou min) local, f\'= 0. La tangente est horizontale au sommet de la courbe.' },
          { q: 'La dérivée du produit u(x)v(x) est :', opts: ['A. u\'×v\'','B. u\'v + uv\'','C. uv\'/u\'','D. (u+v)\''], ans: 'B', expl: 'Règle de Leibniz : (uv)\'= u\'v + uv\'. Indispensable au BAC pour les produits de fonctions.' },
        ],
        'Probabilités et statistiques': [
          { q: 'P(A) = 0,4 et P(B) = 0,3, A et B indépendants. P(A∩B) vaut :', opts: ['A. 0,7','B. 0,12','C. 0,1','D. 0,4'], ans: 'B', expl: 'Si A et B sont indépendants, P(A∩B) = P(A)×P(B) = 0,4×0,3 = 0,12.' },
          { q: 'L\'espérance E(X) d\'une variable aléatoire X représente :', opts: ['A. la valeur maximale','B. la valeur la plus fréquente','C. la moyenne pondérée par les probabilités','D. la variance'], ans: 'C', expl: 'E(X) = Σ x_i p_i. C\'est la moyenne théorique si on répète l\'expérience un grand nombre de fois.' },
          { q: 'Dans un tirage sans remise de 2 boules parmi 5 rouges et 3 bleues, P(2 rouges) =', opts: ['A. 25/64','B. 10/28','C. 1/2','D. 5/28'], ans: 'B', expl: 'P = C(5,2)/C(8,2) = 10/28 = 5/14. On utilise les combinaisons pour les tirages sans remise.' },
          { q: 'La variance d\'une variable aléatoire constante X = k est :', opts: ['A. k','B. k²','C. 0','D. 1'], ans: 'C', expl: 'Si X est toujours égale à k, il n\'y a aucune dispersion. La variance, mesure de dispersion, est donc 0.' },
          { q: 'P(A|B) est appelée :', opts: ['A. probabilité conjointe','B. probabilité conditionnelle de A sachant B','C. probabilité marginale','D. probabilité indépendante'], ans: 'B', expl: 'P(A|B) = P(A∩B)/P(B). C\'est la probabilité que A se réalise en sachant que B est déjà réalisé.' },
        ],
      }
    },
    'SVT': {
      chapters: [
        { title: 'Génétique et brassage génétique', formulas: ['Monohybridisme : 3/4 dominant, 1/4 récessif', 'Dihybridisme : 9/3/3/1 si indépendance', 'Test-cross : A_ × aa'] },
        { title: 'Expression du génome', formulas: ['ADN → (transcription) → ARNm → (traduction) → Protéine', 'Un codon = 3 nucléotides = 1 acide aminé', 'ARNm lu de 5\' vers 3\''] },
        { title: 'Immunologie et défenses', formulas: ['Réponse primaire lente, secondaire rapide', 'Anticorps = immunoglobulines', 'Clonage lymphocytaire après contact antigénique'] },
        { title: 'Neurophysiologie', formulas: ['Potentiel de repos ≈ -70 mV', 'Synapse : neurotransmetteur libéré vers fente synaptique', 'Sommation spatiale et temporelle'] },
        { title: 'Géologie et tectonique', formulas: ['Dorsales = divergence, subduction = convergence', 'Isostasie : équilibre lithosphère/asthénosphère', 'Âge de la croûte océanique par inversions magnétiques'] },
        { title: 'Physiologie végétale', formulas: ['6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (photosynthèse)', 'Absorption racinaire par osmose', 'Transpiration stomacale régulée par la lumière'] },
      ],
      exercises: {
        'Génétique et brassage génétique': [
          { q: 'Deux parents AA × aa donnent une génération F1 :', opts: ['A. 50% AA et 50% aa','B. 100% Aa','C. 25% AA, 50% Aa, 25% aa','D. 100% aa'], ans: 'B', expl: 'Chaque parent donne un allèle. AA donne A, aa donne a. Tous les enfants sont Aa (hétérozygotes). Le phénotype dominant s\'exprime.' },
          { q: 'En dihybridisme (AaBb × AaBb), la proportion 9:3:3:1 suppose que les gènes sont :', opts: ['A. liés sur le même chromosome','B. indépendants','C. codominants','D. léthaux'], ans: 'B', expl: 'La loi de Mendel sur l\'indépendance stipule que des gènes sur chromosomes différents ségrèguent indépendamment, d\'où 9:3:3:1.' },
          { q: 'Un test-cross permet de :', opts: ['A. trouver la fréquence d\'un allèle dans une population','B. révéler le génotype d\'un individu de phénotype dominant','C. créer des OGM','D. mesurer la sélection naturelle'], ans: 'B', expl: 'Le test-cross (individu × homozygote récessif aa) révèle si l\'individu dominant est AA ou Aa selon les proportions observées.' },
          { q: 'La mutation génique est une modification :', opts: ['A. du caryotype','B. de la séquence nucléotidique de l\'ADN','C. de la membrane cellulaire','D. du nombre de chromosomes'], ans: 'B', expl: 'Une mutation génique affecte la séquence de bases de l\'ADN (substitution, délétion, insertion). Elle peut être silencieuse ou modifier la protéine.' },
          { q: 'En génétique humaine, le gène de la couleur des yeux est porté par :', opts: ['A. les chromosomes sexuels uniquement','B. un autosome','C. la mitochondrie','D. l\'ARNt'], ans: 'B', expl: 'La couleur des yeux est déterminée par des gènes autosomaux (chromosomes 1 à 22), principalement le gène OCA2.' },
        ],
        'Expression du génome': [
          { q: 'La transcription produit :', opts: ['A. une protéine directement','B. un brin d\'ADN complémentaire','C. un ARN messager','D. des ribosomes'], ans: 'C', expl: 'La transcription (dans le noyau) copie le gène en ARNm, qui sort ensuite vers le cytoplasme pour la traduction.' },
          { q: 'Les ribosomes lisent l\'ARNm par groupes de :', opts: ['A. 1 nucléotide','B. 2 nucléotides','C. 3 nucléotides (codons)','D. 4 nucléotides'], ans: 'C', expl: 'Le code génétique est un triplet : chaque codon de 3 bases code pour 1 acide aminé. 64 codons possibles, 20 acides aminés.' },
          { q: 'La traduction se déroule :', opts: ['A. dans le noyau','B. dans la mitochondrie','C. dans les chloroplastes','D. au niveau des ribosomes dans le cytoplasme'], ans: 'D', expl: 'La traduction a lieu dans le cytoplasme sur les ribosomes (libres ou fixés au RE rugueux). Les ARNt apportent les acides aminés.' },
          { q: 'Une mutation qui ne change pas l\'acide aminé codé est dite :', opts: ['A. non-sens','B. faux-sens','C. silencieuse','D. frameshift'], ans: 'C', expl: 'En raison de la redondance du code génétique, plusieurs codons peuvent coder le même acide aminé. La mutation est alors sans effet sur la protéine.' },
          { q: 'L\'ARN messager est synthétisé par :', opts: ['A. les ribosomes','B. l\'ARN polymérase','C. l\'ADN polymérase','D. la ligase'], ans: 'B', expl: 'L\'ARN polymérase II (chez les eucaryotes) déroule l\'ADN et synthétise l\'ARNm complémentaire du brin matrice, de 5\' vers 3\'.' },
        ],
        'Immunologie et défenses': [
          { q: 'La réponse immunitaire adaptative met en jeu :', opts: ['A. uniquement les phagocytes','B. les lymphocytes B et T','C. seulement la fièvre','D. les globules rouges'], ans: 'B', expl: 'L\'immunité adaptative implique les lymphocytes B (production d\'anticorps) et T (cytotoxicité, aide). Elle est spécifique et mémorisée.' },
          { q: 'Les anticorps sont produits par :', opts: ['A. les lymphocytes T cytotoxiques','B. les macrophages','C. les plasmocytes (lymphocytes B différenciés)','D. les cellules NK'], ans: 'C', expl: 'Les lymphocytes B activés par un antigène se différencient en plasmocytes qui sécrètent des anticorps spécifiques de cet antigène.' },
          { q: 'La mémoire immunitaire est assurée par :', opts: ['A. les phagocytes','B. les cellules mémoire B et T','C. le complément','D. la barrière cutanée'], ans: 'B', expl: 'Après une première réponse, des cellules mémoire à longue durée de vie persistent. Elles permettent une réponse secondaire rapide et intense.' },
          { q: 'Un vaccin agit en :', opts: ['A. tuant directement les bactéries','B. remplaçant les anticorps','C. induisant une mémoire immunitaire sans maladie','D. détruisant les cellules infectées'], ans: 'C', expl: 'Le vaccin présente des antigènes atténués ou inactivés. Le système immunitaire crée une mémoire sans déclencher la maladie.' },
          { q: 'Le SIDA détruit principalement les :', opts: ['A. globules rouges','B. lymphocytes T4 (CD4+)','C. plaquettes','D. neutrophiles'], ans: 'B', expl: 'Le VIH infecte les lymphocytes T4 (CD4+), orchestrateurs de la réponse immunitaire. Leur destruction cause l\'immunodéficience.' },
        ],
      }
    },
    'Physique': {
      chapters: [
        { title: 'Mécanique newtonienne', formulas: ['ΣF = ma', 'P = mg', 'Ec = ½mv²', 'Em = Ec + Ep (conservée si pas de frottement)'] },
        { title: 'Ondes mécaniques', formulas: ['v = λ × f', 'T = 1/f', 'λ = v/f'] },
        { title: 'Optique et lumière', formulas: ['n = c/v', 'n₁ sin i₁ = n₂ sin i₂ (Snell-Descartes)', '1/OA\' - 1/OA = 1/f'] },
        { title: 'Électricité (RC, RL)', formulas: ['τ = RC', 'τ = L/R', 'Uc(t) = E(1-e^(-t/τ))'] },
        { title: 'Radioactivité', formulas: ['A = λN', 't½ = ln2/λ', 'N(t) = N₀ × e^(-λt)'] },
      ],
      exercises: {
        'Mécanique newtonienne': [
          { q: 'Un objet de masse 2 kg accélère à 3 m/s². La force résultante est :', opts: ['A. 5 N','B. 6 N','C. 1,5 N','D. 0,67 N'], ans: 'B', expl: 'Deuxième loi de Newton : F = ma = 2 × 3 = 6 N. Les unités sont bien kg × m/s² = N (Newton).' },
          { q: 'L\'énergie mécanique est conservée quand :', opts: ['A. il y a des frottements','B. les frottements sont nuls','C. la vitesse est constante','D. la masse varie'], ans: 'B', expl: 'En l\'absence de frottements (forces non conservatives), l\'énergie mécanique Em = Ec + Ep reste constante.' },
          { q: 'Un projectile lancé horizontalement subit :', opts: ['A. uniquement la poussée d\'Archimède','B. uniquement son poids','C. poids + frottements de l\'air','D. aucune force'], ans: 'B', expl: 'Dans le modèle du BAC (sans frottements), seul le poids P = mg s\'applique. Le mouvement est parabolique.' },
          { q: 'La vitesse d\'un objet en chute libre après t = 3 s (g = 10 m/s²) est :', opts: ['A. 10 m/s','B. 30 m/s','C. 90 m/s','D. 3 m/s'], ans: 'B', expl: 'v = v₀ + gt = 0 + 10 × 3 = 30 m/s. La vitesse augmente linéairement (accélération constante g).' },
          { q: 'La 3ème loi de Newton (réciprocité des forces) dit que :', opts: ['A. action = 2 × réaction','B. toutes les forces sont nulles','C. action et réaction sont égales et opposées','D. F = mv'], ans: 'C', expl: 'À toute force exercée par A sur B correspond une force exercée par B sur A, égale en intensité, même direction, sens opposé.' },
        ],
        'Radioactivité': [
          { q: 'La désintégration alpha émet :', opts: ['A. un électron','B. un noyau d\'hélium (2 protons, 2 neutrons)','C. un photon gamma','D. un neutrino'], ans: 'B', expl: 'La particule α est un noyau d\'⁴He (Z=2, A=4). Sa charge positive et sa masse importante lui donnent un faible pouvoir pénétrant.' },
          { q: 'La demi-vie t½ est le temps au bout duquel :', opts: ['A. tous les noyaux se sont désintégrés','B. la moitié des noyaux se sont désintégrés','C. la vitesse de désintégration double','D. l\'activité devient nulle'], ans: 'B', expl: 'À t = t½, il reste N = N₀/2 noyaux radioactifs. C\'est une propriété intrinsèque de chaque noyau radioactif.' },
          { q: 'Dans une réaction nucléaire ⁶⁰₂₇Co → ⁶⁰₂₈Ni + X, X est :', opts: ['A. un proton','B. un neutron','C. un électron (β⁻)','D. un noyau α'], ans: 'C', expl: 'Z augmente de 1 (27→28) sans changement de A (60). C\'est une désintégration β⁻ : un neutron se convertit en proton + électron + antineutrino.' },
          { q: 'L\'activité d\'un échantillon radioactif est exprimée en :', opts: ['A. Joule (J)','B. Becquerel (Bq)','C. Watt (W)','D. Coulomb (C)'], ans: 'B', expl: 'L\'activité A = nombre de désintégrations par seconde. 1 Bq = 1 désintégration/seconde. Le Curie (Ci) est une ancienne unité.' },
          { q: 'La radioactivité γ est :', opts: ['A. un flux d\'électrons','B. un rayonnement électromagnétique de haute énergie','C. un flux de neutrons','D. un noyau d\'hélium'], ans: 'B', expl: 'Le rayonnement γ est un photon (onde électromagnétique) sans masse ni charge. Il accompagne souvent les désintégrations α ou β.' },
        ],
      }
    }
  },

  // ── L1 : Série littéraire franco-arabe ────────────────────
  L1: {
    'Philosophie': {
      chapters: [
        { title: 'La conscience et l\'inconscient', formulas: ['Conscience = rapport à soi et au monde', 'Freud : Ça, Moi, Surmoi', 'Freudisme ≠ déterminisme absolu'] },
        { title: 'La liberté et le déterminisme', formulas: ['Liberté = pouvoir d\'agir autrement', 'Déterminisme : tout effet a une cause', 'Sartre : l\'existence précède l\'essence'] },
        { title: 'La connaissance et la vérité', formulas: ['Empirisme : connaissance par les sens', 'Rationalisme : connaissance par la raison', 'Vérité = adéquation entre jugement et réalité'] },
        { title: 'Le travail et la technique', formulas: ['Travail = transformation de la nature', 'Technique = moyen au service d\'une fin', 'Aliénation (Marx) : travail qui déshumanise'] },
        { title: 'L\'État et la politique', formulas: ['État = territoire + population + gouvernement', 'Légitimité vs légalité', 'Contrat social (Rousseau, Hobbes, Locke)'] },
        { title: 'La religion et la foi', formulas: ['Religion = lien entre hommes et divin', 'Foi vs raison (Pascal, Kant)', 'Critique de la religion : Feuerbach, Nietzsche'] },
      ],
      exercises: {
        'La liberté et le déterminisme': [
          { q: 'Selon Sartre, l\'être humain est :', opts: ['A. entièrement déterminé par ses gènes','B. condamné à être libre','C. libéré par la société','D. libre uniquement en rêve'], ans: 'B', expl: '"L\'existence précède l\'essence" : l\'homme n\'a pas de nature fixe. Il se définit par ses choix et ses actes. C\'est une liberté parfois angoissante.' },
          { q: 'Le déterminisme affirme que :', opts: ['A. tout est possible','B. rien n\'a de cause','C. tout événement a une cause suffisante','D. la liberté est absolue'], ans: 'C', expl: 'Pour le déterminisme, toute action humaine est le résultat de causes antérieures (biologiques, sociales, psychologiques). Il nie le libre arbitre strict.' },
          { q: 'Pour Kant, la liberté morale consiste à :', opts: ['A. suivre ses désirs naturels','B. obéir à la loi de la cité','C. agir selon la raison (loi morale universelle)','D. rejeter toute contrainte'], ans: 'C', expl: 'La liberté selon Kant n\'est pas l\'absence de contrainte, mais l\'autonomie : se donner à soi-même la loi morale dictée par la raison.' },
          { q: 'L\'inconscient freudien contient principalement :', opts: ['A. les souvenirs récents','B. les désirs refoulés et les pulsions','C. la conscience morale','D. les capacités intellectuelles'], ans: 'B', expl: 'Pour Freud, l\'inconscient est le réservoir des pulsions refoulées (surtout sexuelles). Il influence nos actes à notre insu.' },
          { q: 'La "mauvaise foi" chez Sartre désigne :', opts: ['A. le mensonge délibéré à autrui','B. le refus d\'assumer sa liberté','C. l\'ignorance philosophique','D. la faiblesse de volonté'], ans: 'B', expl: 'La mauvaise foi, c\'est se mentir à soi-même en prétendant être déterminé (ex: "je suis comme ça, je ne peux pas changer"). Sartre y voit une fuite de la liberté.' },
        ],
        'La connaissance et la vérité': [
          { q: 'L\'empirisme soutient que la connaissance vient :', opts: ['A. uniquement de la raison','B. de l\'expérience sensible','C. de la révélation divine','D. de l\'intuition intellectuelle seule'], ans: 'B', expl: 'Locke, Hume, Berkeley : l\'esprit est une "table rase". Toute connaissance provient de l\'expérience et des sens. La raison seule ne suffit pas.' },
          { q: 'Pour Descartes, le fondement de la certitude est :', opts: ['A. "Je mange donc je suis"','B. "Je pense donc je suis" (cogito)','C. "Je sens donc je suis"','D. "La société fait l\'homme"'], ans: 'B', expl: '"Cogito ergo sum" : même en doutant de tout, je dois exister pour douter. C\'est la première certitude irréfutable selon Descartes.' },
          { q: 'La méthode scientifique repose sur :', opts: ['A. la foi et la tradition','B. l\'autorité des anciens','C. l\'observation, l\'hypothèse et l\'expérimentation','D. la logique pure sans expérience'], ans: 'C', expl: 'La démarche hypothético-déductive : observer → formuler une hypothèse → expérimenter → conclure. Elle peut invalider mais jamais prouver définitivement.' },
          { q: 'La vérité "relative" signifie :', opts: ['A. qu\'il n\'y a aucune vérité','B. que toute vérité dépend d\'un contexte ou d\'un point de vue','C. que la vérité est accessible à tous','D. que la vérité est immuable'], ans: 'B', expl: 'Le relativisme (Protagoras : "l\'homme est la mesure de toutes choses") affirme que la vérité varie selon les individus ou les cultures.' },
          { q: 'Un syllogisme est :', opts: ['A. une expérience de laboratoire','B. un raisonnement déductif à 3 termes','C. une observation directe','D. un préjugé courant'], ans: 'B', expl: '"Tous les hommes sont mortels. Socrate est un homme. Donc Socrate est mortel." C\'est le syllogisme aristotélicien : 2 prémisses → 1 conclusion nécessaire.' },
        ],
        'L\'État et la politique': [
          { q: 'Selon Hobbes, sans l\'État, la vie humaine serait :', opts: ['A. heureuse et libre','B. "solitaire, misérable, brutale et brève"','C. organisée naturellement','D. spirituellement épanouie'], ans: 'B', expl: 'Dans l\'état de nature hobbesien, la guerre de "tous contre tous" règne. L\'État (Léviathan) est nécessaire pour garantir la paix et la sécurité.' },
          { q: 'La démocratie directe se distingue de la représentative car :', opts: ['A. les élus décident seuls','B. les citoyens votent directement les lois','C. seuls les experts gouvernent','D. il n\'y a pas d\'élection'], ans: 'B', expl: 'En démocratie directe (Athènes antique), les citoyens participent eux-mêmes aux décisions. En représentative, ils élisent des représentants.' },
          { q: 'La légitimité d\'un pouvoir désigne :', opts: ['A. sa conformité aux lois écrites','B. son ancienneté','C. sa reconnaissance et son acceptation par les gouvernés','D. sa puissance militaire'], ans: 'C', expl: 'La légitimité (Weber) est l\'acceptation volontaire d\'un pouvoir. Elle se distingue de la légalité (conformité aux lois) et de la force brute.' },
          { q: 'Le contrat social de Rousseau repose sur :', opts: ['A. la force du plus puissant','B. la volonté générale exprimée par tous','C. l\'autorité naturelle des nobles','D. les lois divines'], ans: 'B', expl: 'Pour Rousseau, la souveraineté appartient au peuple qui exprime sa "volonté générale". L\'État légitime est fondé sur ce contrat librement consenti.' },
          { q: 'La séparation des pouvoirs (Montesquieu) divise l\'État en :', opts: ['A. Président, Parlement, Armée','B. Exécutif, Législatif, Judiciaire','C. Central, Régional, Local','D. Laïque, Religieux, Militaire'], ans: 'B', expl: 'Dans "De l\'Esprit des Lois", Montesquieu propose de séparer le pouvoir exécutif (gouverner), législatif (faire les lois) et judiciaire (juger) pour éviter le despotisme.' },
        ],
      }
    },
    'Français': {
      chapters: [
        { title: 'La dissertation littéraire', formulas: ['Thèse / Antithèse / Synthèse', 'Introduction : accroche → contexte → problématique → annonce plan', 'Conclusion : bilan → ouverture'] },
        { title: 'Le commentaire de texte', formulas: ['Axe 1 : fond (sens, thèmes)', 'Axe 2 : forme (style, figures)', 'Citez toujours le texte entre guillemets'] },
        { title: 'Les figures de style', formulas: ['Métaphore : comparaison sans outil', 'Anaphore : répétition en début de phrase', 'Oxymore : deux contraires associés'] },
        { title: 'Les genres littéraires', formulas: ['Roman : narratif, long, en prose', 'Théâtre : dialogue, actes et scènes', 'Poésie : vers, rimes, rythme'] },
        { title: 'Argumentation et rhétorique', formulas: ['Ethos (image de l\'orateur), Logos (logique), Pathos (émotion)', 'Argument, exemple, explication', 'Réfuter : "Certes... mais..."'] },
      ],
      exercises: {
        'Les figures de style': [
          { q: '"Mes yeux sont deux soleils" est un exemple de :', opts: ['A. comparaison','B. métaphore','C. personnification','D. hyperbole'], ans: 'B', expl: 'La métaphore identifie directement deux réalités sans mot comparatif ("comme", "tel que"). Ici, les yeux SONT des soleils, image directe et forte.' },
          { q: 'L\'anaphore consiste à :', opts: ['A. interrompre la phrase','B. répéter un mot à la fin des phrases','C. répéter un mot au début de plusieurs phrases successives','D. inverser l\'ordre des mots'], ans: 'C', expl: 'Exemple : "J\'ai rêvé d\'un pays. J\'ai rêvé d\'un peuple. J\'ai rêvé de liberté." La répétition initiale crée un effet d\'insistance et de rythme.' },
          { q: 'Un oxymore associe :', opts: ['A. deux synonymes','B. deux termes contradictoires','C. un nom et un verbe','D. deux métaphores'], ans: 'B', expl: '"Une obscure clarté", "cette obscure clarté qui tombe des étoiles" (Corneille). L\'oxymore crée une tension expressive par la contradiction.' },
          { q: 'La personnification attribue à un objet ou abstraction :', opts: ['A. une couleur symbolique','B. des caractéristiques humaines','C. une sonorité particulière','D. un chiffre mystique'], ans: 'B', expl: '"La nature pleure", "Le vent murmure". On prête des qualités humaines (émotions, actions) à des éléments non humains.' },
          { q: 'L\'hyperbole est une figure qui :', opts: ['A. diminue la réalité','B. exagère fortement pour créer un effet','C. compare deux éléments semblables','D. inverse la construction normale'], ans: 'B', expl: '"Je meurs de faim !" : personne ne meurt littéralement de faim après un repas raté. L\'exagération vise l\'effet comique, dramatique ou emphatique.' },
        ],
        'Argumentation et rhétorique': [
          { q: 'Dans un texte argumentatif, la thèse est :', opts: ['A. la liste des arguments','B. la position défendue par l\'auteur','C. la conclusion seulement','D. un récit d\'expérience'], ans: 'B', expl: 'La thèse est l\'opinion, la prise de position centrale. Elle répond à la question "Que défend l\'auteur ?" Tout le texte l\'argumente.' },
          { q: 'Un argument est renforcé par :', opts: ['A. une répétition du même argument','B. un exemple concret qui l\'illustre','C. une digression hors sujet','D. un vocabulaire technique incompréhensible'], ans: 'B', expl: 'L\'exemple ancre l\'argument dans le réel et le rend vérifiable. Il doit être précis et directement lié à la thèse soutenue.' },
          { q: 'La concession ("Certes X, mais Y") permet de :', opts: ['A. abandonner sa thèse','B. reconnaître une partie de la thèse adverse tout en maintenant la sienne','C. citer une autorité','D. poser une question rhétorique'], ans: 'B', expl: 'La concession montre qu\'on a envisagé l\'objection, ce qui renforce la crédibilité. Le "mais" rétablit ensuite la position principale.' },
          { q: 'Un texte injonctif vise à :', opts: ['A. raconter une histoire','B. décrire un paysage','C. expliquer un phénomène','D. donner des ordres ou des conseils'], ans: 'D', expl: 'Le texte injonctif (recette, règlement, mode d\'emploi) utilise l\'impératif ou l\'infinitif pour guider le lecteur dans une action à accomplir.' },
          { q: 'L\'ironie consiste à :', opts: ['A. exagérer pour faire rire','B. dire le contraire de ce qu\'on pense pour critiquer','C. répéter une idée plusieurs fois','D. utiliser des mots savants'], ans: 'B', expl: 'Voltaire, maître de l\'ironie, dit l\'inverse de ce qu\'il pense pour que le lecteur comprenne la critique. C\'est une arme rhétorique redoutable.' },
        ],
      }
    },
    'Histoire-Géographie': {
      chapters: [
        { title: 'L\'Afrique et la colonisation', formulas: ['Berlin 1884-1885 : partage de l\'Afrique', 'Colonisation : domination politique, économique, culturelle', 'Décolonisation : 1945-1975 (vague principale)'] },
        { title: 'Les indépendances africaines', formulas: ['1960 : Année de l\'Afrique (17 indépendances)', 'Pan-africanisme : Nkrumah, Sékou Touré', 'OUA fondée en 1963 à Addis-Abeba'] },
        { title: 'Le monde après 1945', formulas: ['Guerre froide : USA vs URSS (1947-1991)', 'ONU fondée en 1945', 'Décolonisation + Mouvement des Non-Alignés (1955)'] },
        { title: 'Géographie du Sénégal', formulas: ['Superficie : 196 722 km²', 'Population : ~18 millions (2024)', '14 régions administratives'] },
        { title: 'Géographie de l\'Afrique', formulas: ['55 États membres de l\'Union Africaine', 'Sahel : zone de transition Sahara / Afrique tropicale', 'Grands fleuves : Nil, Congo, Niger, Zambèze'] },
      ],
      exercises: {
        'L\'Afrique et la colonisation': [
          { q: 'La conférence de Berlin (1884-1885) a pour objectif principal :', opts: ['A. libérer l\'Afrique de l\'esclavage','B. organiser le partage de l\'Afrique entre puissances européennes','C. créer une union africaine','D. établir le commerce triangulaire'], ans: 'B', expl: 'Les puissances européennes se sont réunies à Berlin pour définir des règles de partage de l\'Afrique. L\'Afrique n\'y était pas représentée.' },
          { q: 'Le Sénégal obtient son indépendance de la France en :', opts: ['A. 1944','B. 1960','C. 1970','D. 1956'], ans: 'B', expl: 'Le 4 avril 1960, le Sénégal accède à l\'indépendance. Léopold Sédar Senghor devient le premier président. Le 4 avril est aujourd\'hui la fête nationale.' },
          { q: 'La colonisation a introduit en Afrique :', opts: ['A. uniquement des bénéfices économiques','B. une domination politique et l\'exploitation des ressources','C. la démocratie participative','D. le commerce équitable'], ans: 'B', expl: 'La colonisation a imposé une domination politique (administration), économique (exploitation), et culturelle (missions, écoles). Elle a laissé des séquelles durables.' },
          { q: 'Le pan-africanisme prône :', opts: ['A. la supériorité d\'un groupe africain','B. l\'isolationnisme des États africains','C. l\'unité et la solidarité des peuples africains','D. le retour à la colonisation'], ans: 'C', expl: 'Le pan-africanisme (Nkrumah, Du Bois, Garvey) défend l\'unité politique, économique et culturelle de tous les peuples africains et de la diaspora.' },
          { q: 'L\'Organisation de l\'Unité Africaine (OUA) a été fondée en :', opts: ['A. 1945','B. 1960','C. 1963','D. 1980'], ans: 'C', expl: 'L\'OUA est fondée le 25 mai 1963 à Addis-Abeba (Éthiopie). Elle devient l\'Union Africaine (UA) en 2002, avec une ambition d\'intégration plus poussée.' },
        ],
        'Le monde après 1945': [
          { q: 'La Guerre froide oppose principalement :', opts: ['A. la France et l\'Allemagne','B. les États-Unis et l\'URSS','C. l\'Asie et l\'Europe','D. la Chine et le Japon'], ans: 'B', expl: 'La Guerre froide (1947-1991) est une confrontation idéologique (capitalisme vs communisme) entre les deux superpuissances, sans conflit armé direct entre elles.' },
          { q: 'L\'ONU est fondée en :', opts: ['A. 1919','B. 1939','C. 1945','D. 1950'], ans: 'C', expl: 'L\'Organisation des Nations Unies est fondée le 24 octobre 1945 à San Francisco, après la Seconde Guerre mondiale, pour maintenir la paix internationale.' },
          { q: 'La conférence de Bandung (1955) marque la naissance :', opts: ['A. de la Guerre froide','B. du Mouvement des Non-Alignés','C. de l\'Union Européenne','D. de la Francophonie'], ans: 'B', expl: 'À Bandung (Indonésie), 29 pays afro-asiatiques refusent de choisir entre bloc américain et soviétique. C\'est la naissance du Mouvement des Non-Alignés.' },
          { q: 'Le plan Marshall (1948) visait à :', opts: ['A. reconstruire l\'Europe avec l\'aide américaine','B. créer l\'URSS','C. coloniser l\'Afrique','D. fonder l\'OTAN'], ans: 'A', expl: 'Le plan Marshall est un programme d\'aide économique américaine à l\'Europe occidentale après 1945. Il visait aussi à contenir l\'influence soviétique.' },
          { q: 'La décolonisation en Afrique est surtout massive dans les années :', opts: ['A. 1920-1930','B. 1945-1975','C. 1980-2000','D. 1900-1914'], ans: 'B', expl: '1960 est surnommée "l\'Année de l\'Afrique" (17 indépendances). La vague de décolonisation s\'étend de 1945 (fin de la Seconde Guerre mondiale) à 1975.' },
        ],
      }
    }
  },

  // ── STEG : Économie, Gestion, Comptabilité ───────────────
  STEG: {
    'Économie': {
      chapters: [
        { title: 'Les grands concepts économiques', formulas: ['PIB = C + I + G + (X-M)', 'Croissance = variation du PIB réel', 'Inflation = hausse générale des prix (IPC)'] },
        { title: 'Les marchés et la concurrence', formulas: ['Offre et demande : équilibre au prix de marché', 'Concurrence pure et parfaite : 5 conditions', 'Monopole : un seul offreur'] },
        { title: 'La monnaie et le crédit', formulas: ['Masse monétaire M1 = billets + dépôts à vue', 'Taux d\'intérêt = prix du crédit', 'Banque centrale : politique monétaire'] },
        { title: 'Le commerce international', formulas: ['Balance commerciale = exportations - importations', 'Avantage comparatif (Ricardo)', 'OMC : organisation mondiale du commerce'] },
        { title: 'Le développement et l\'UEMOA', formulas: ['IDH : revenus + éducation + santé', 'UEMOA : 8 pays, franc CFA', 'PIB/habitant ≠ développement humain'] },
      ],
      exercises: {
        'Les grands concepts économiques': [
          { q: 'Le PIB mesure :', opts: ['A. la richesse totale accumulée','B. la valeur des biens et services produits en 1 an','C. le niveau de bonheur','D. les exportations uniquement'], ans: 'B', expl: 'Le Produit Intérieur Brut (PIB) mesure la valeur de la production nationale sur une période (généralement une année). C\'est l\'indicateur principal de l\'activité économique.' },
          { q: 'L\'inflation correspond à :', opts: ['A. une baisse du chômage','B. une hausse générale et durable des prix','C. une augmentation du PIB','D. une dévaluation de la monnaie'], ans: 'B', expl: 'L\'inflation est mesurée par l\'Indice des Prix à la Consommation (IPC). Elle réduit le pouvoir d\'achat si les salaires n\'augmentent pas autant.' },
          { q: 'Le taux de chômage est :', opts: ['A. la part des retraités dans la population','B. la proportion d\'actifs sans emploi qui en cherchent un','C. le nombre total de chômeurs','D. la part des salariés du secteur public'], ans: 'B', expl: 'Taux de chômage = (chômeurs / population active) × 100. Un chômeur cherche activement un emploi et est disponible pour travailler.' },
          { q: 'La croissance économique est positive quand :', opts: ['A. le PIB diminue','B. le PIB reste stable','C. le PIB augmente en termes réels','D. les importations augmentent'], ans: 'C', expl: 'La croissance économique = hausse du PIB réel (corrigé de l\'inflation). Elle traduit une augmentation de la production nationale de biens et services.' },
          { q: 'Le solde de la balance commerciale est positif quand :', opts: ['A. les importations > exportations','B. les exportations > importations','C. la dette publique diminue','D. le déficit budgétaire est nul'], ans: 'B', expl: 'Excédent commercial = exportations > importations. La balance commerciale du Sénégal est souvent déficitaire car le pays importe beaucoup (pétrole, riz, équipements).' },
        ],
        'La monnaie et le crédit': [
          { q: 'Le franc CFA est la monnaie de :', opts: ['A. 10 pays africains et de la France','B. des pays de la zone UEMOA et CEMAC','C. du Sénégal uniquement','D. de l\'Afrique du Sud'], ans: 'B', expl: 'Le franc CFA est utilisé dans 2 zones : l\'UEMOA (Afrique de l\'Ouest, 8 pays) et la CEMAC (Afrique Centrale, 6 pays). Il est garanti par le Trésor français.' },
          { q: 'La politique monétaire est pilotée par :', opts: ['A. le gouvernement directement','B. la banque centrale','C. les entreprises privées','D. le FMI'], ans: 'B', expl: 'Dans la zone UEMOA, la BCEAO (Banque Centrale des États de l\'Afrique de l\'Ouest) fixe les taux et gère la monnaie. Son objectif principal est la stabilité des prix.' },
          { q: 'Un taux d\'intérêt élevé a tendance à :', opts: ['A. stimuler l\'investissement','B. freiner l\'investissement et le crédit','C. augmenter la consommation','D. réduire l\'épargne'], ans: 'B', expl: 'Un taux d\'intérêt élevé renchérit le crédit. Les ménages et entreprises empruntent moins. Cela peut freiner la croissance (effet restrictif de la politique monétaire).' },
          { q: 'L\'épargne d\'un ménage est :', opts: ['A. la partie du revenu consommée','B. la partie du revenu non consommée','C. les impôts payés','D. les dettes du ménage'], ans: 'B', expl: 'Épargne = Revenu - Consommation. C\'est la partie du revenu mise de côté. Elle peut être placée en banque, investie, ou conservée en liquide.' },
          { q: 'La dévaluation d\'une monnaie rend les exportations :', opts: ['A. plus chères pour les étrangers','B. moins chères pour les étrangers (compétitives)','C. impossibles','D. identiques en prix'], ans: 'B', expl: 'Dévaluer = baisser la valeur de sa monnaie. Résultat : les produits nationaux coûtent moins cher en devises étrangères → les exportations augmentent.' },
        ],
      }
    },
    'Comptabilité': {
      chapters: [
        { title: 'Le bilan comptable', formulas: ['Actif = Passif (toujours équilibré)', 'Actif = emplois des ressources', 'Passif = sources de financement'] },
        { title: 'Le compte de résultat', formulas: ['Résultat = Produits - Charges', 'Bénéfice si Produits > Charges', 'Perte si Charges > Produits'] },
        { title: 'Les opérations courantes', formulas: ['Achat HT × taux TVA = TVA', 'TVA à décaisser = TVA collectée - TVA déductible', 'Remise : % sur le prix brut'] },
        { title: 'La paie et les charges sociales', formulas: ['Salaire brut - cotisations = salaire net', 'Charges patronales ≈ 20% du brut', 'Congés payés : 2,5 jours/mois travaillé'] },
      ],
      exercises: {
        'Le bilan comptable': [
          { q: 'Dans un bilan, l\'actif représente :', opts: ['A. les dettes de l\'entreprise','B. les capitaux propres','C. les emplois (ce que possède l\'entreprise)','D. les bénéfices de l\'année'], ans: 'C', expl: 'L\'actif regroupe les emplois : immobilisations (bâtiments, machines), stocks, créances, trésorerie. Il répond à "qu\'est-ce que l\'entreprise possède ?"' },
          { q: 'Le passif du bilan représente :', opts: ['A. les biens achetés','B. les ressources (dettes + capitaux propres)','C. les ventes réalisées','D. les stocks de marchandises'], ans: 'B', expl: 'Le passif répond à "comment l\'entreprise se finance ?". Il comprend les capitaux propres (fonds des associés) et les dettes (emprunts, fournisseurs).' },
          { q: 'La règle fondamentale du bilan est :', opts: ['A. Actif > Passif','B. Actif = Passif','C. Actif < Passif','D. Actif = 2 × Passif'], ans: 'B', expl: 'Le bilan est toujours équilibré : Actif = Passif. C\'est le principe de la partie double : chaque ressource a un emploi correspondant.' },
          { q: 'Les capitaux propres comprennent :', opts: ['A. les dettes bancaires','B. le capital social, les réserves et le résultat','C. les dettes fournisseurs','D. la trésorerie'], ans: 'B', expl: 'Les capitaux propres = apports des associés (capital) + bénéfices non distribués (réserves) + résultat de l\'exercice. Ce sont des ressources internes stables.' },
          { q: 'Une immobilisation corporelle est :', opts: ['A. une dette à long terme','B. un bien physique durable (machine, bâtiment)','C. une créance client','D. un stock de produits'], ans: 'B', expl: 'Les immobilisations corporelles sont des biens physiques utilisés durablement (> 1 an) dans l\'activité : terrains, bâtiments, machines, véhicules.' },
        ],
        'Le compte de résultat': [
          { q: 'Le résultat net d\'une entreprise est :', opts: ['A. le chiffre d\'affaires','B. la différence entre produits et charges','C. le capital social','D. la valeur des stocks'], ans: 'B', expl: 'Résultat = Produits - Charges. Si positif → bénéfice. Si négatif → perte. C\'est la "performance" économique de l\'exercice.' },
          { q: 'Le chiffre d\'affaires (CA) est :', opts: ['A. le bénéfice réalisé','B. le total des ventes hors taxes','C. les charges de personnel','D. la valeur du bilan'], ans: 'B', expl: 'CA = prix × quantités vendues (HT). C\'est le premier poste de produits. Un CA élevé ne garantit pas la rentabilité si les charges sont trop importantes.' },
          { q: 'Les charges comprennent :', opts: ['A. uniquement les salaires','B. les achats, salaires, loyers, amortissements...','C. seulement les intérêts d\'emprunt','D. uniquement les impôts'], ans: 'B', expl: 'Les charges sont toutes les consommations : achats de marchandises, frais de personnel, loyers, énergie, amortissements, impôts, intérêts...' },
          { q: 'L\'excédent brut d\'exploitation (EBE) mesure :', opts: ['A. le résultat net après impôts','B. la performance industrielle avant éléments financiers et exceptionnels','C. les capitaux propres','D. le montant des amortissements'], ans: 'B', expl: 'L\'EBE = CA - achats - charges externes - charges de personnel. Il mesure la création de richesse par l\'activité courante, avant politique financière.' },
          { q: 'La TVA collectée par une entreprise doit être :', opts: ['A. conservée comme bénéfice','B. reversée à l\'État','C. distribuée aux employés','D. placée en réserves'], ans: 'B', expl: 'La TVA est collectée par l\'entreprise pour le compte de l\'État. Elle verse la TVA nette (collectée - déductible). L\'entreprise n\'en est que le collecteur.' },
        ],
      }
    }
  },

  // ── G : Série Gestion ─────────────────────────────────────
  G: {
    'Gestion': {
      chapters: [
        { title: 'Fonctions de l\'entreprise', formulas: ['Fayol : planifier, organiser, commander, coordonner, contrôler (POCCC)', 'Direction générale → départements fonctionnels', 'Structure hiérarchique vs matricielle'] },
        { title: 'Marketing et commercialisation', formulas: ['4P : Produit, Prix, Place (distribution), Promotion', 'Segmentation → ciblage → positionnement', 'Part de marché = CA entreprise / CA total marché'] },
        { title: 'Ressources humaines', formulas: ['Recrutement → intégration → formation → évaluation', 'Contrat CDI vs CDD vs Intérim', 'Pyramide de Maslow : physiologique → sécurité → social → estime → accomplissement'] },
      ],
      exercises: {
        'Marketing et commercialisation': [
          { q: 'Le mix marketing repose sur les 4P. "P" de Prix désigne :', opts: ['A. la politique de promotion','B. la stratégie de tarification','C. le plan de production','D. la performance'], ans: 'B', expl: 'Le prix est l\'un des 4P du mix marketing. Il doit couvrir les coûts, être accepté par le marché, et positionner l\'offre par rapport à la concurrence.' },
          { q: 'La segmentation marketing consiste à :', opts: ['A. fixer un prix unique pour tous','B. diviser le marché en groupes de consommateurs homogènes','C. fermer des points de vente','D. réduire la gamme de produits'], ans: 'B', expl: 'On segmente pour adapter l\'offre à chaque groupe (âge, revenu, comportement). Ensuite, on cible les segments rentables et on se positionne distinctement.' },
          { q: 'La part de marché d\'une entreprise est :', opts: ['A. son bénéfice rapporté au chiffre d\'affaires','B. son CA divisé par le CA total du marché','C. son nombre de clients','D. sa valeur boursière'], ans: 'B', expl: 'PDM (%) = (CA entreprise / CA total marché) × 100. Une PDM de 20% signifie que l\'entreprise réalise 20% des ventes totales du secteur.' },
          { q: 'La fidélisation des clients vise à :', opts: ['A. attirer uniquement de nouveaux clients','B. réduire les prix indéfiniment','C. maintenir une relation durable avec les clients existants','D. éliminer les concurrents'], ans: 'C', expl: 'Fidéliser coûte moins cher qu\'acquérir. Les outils : cartes de fidélité, service après-vente, personnalisation, programme de récompenses.' },
          { q: 'Le positionnement d\'un produit définit :', opts: ['A. son prix de revient','B. sa place en magasin','C. l\'image qu\'il veut donner dans l\'esprit du consommateur','D. sa date de lancement'], ans: 'C', expl: 'Le positionnement = "quelle place veut-on occuper dans l\'esprit du client ?" Il distingue le produit des concurrents sur des critères valorisés (qualité, prix, image...).' },
        ],
      }
    }
  },
};

// ─────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES
// ─────────────────────────────────────────────────────────────

function slugify(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
}

// ─────────────────────────────────────────────────────────────
// SCRIPT PRINCIPAL
// ─────────────────────────────────────────────────────────────

async function main() {
  await testDatabaseConnection();
  console.log('✅ Connexion BD OK\n');

  let chaptersCreated = 0;
  let exercisesCreated = 0;

  for (const [serieCode, subjects] of Object.entries(CONTENT)) {
    console.log(`\n📚 Série ${serieCode}`);

    for (const [subjectName, data] of Object.entries(subjects)) {
      // Trouver la matière
      const subjectResult = await pool.query(
        'SELECT id FROM subjects WHERE serie_code = $1 AND name = $2',
        [serieCode, subjectName]
      );

      if (subjectResult.rowCount === 0) {
        console.log(`  ⚠️  Matière introuvable : ${serieCode} / ${subjectName}`);
        continue;
      }

      const subjectId = subjectResult.rows[0].id;
      console.log(`  ✓ ${subjectName} (${serieCode})`);

      for (let i = 0; i < data.chapters.length; i++) {
        const chap = data.chapters[i];
        const slug = `${slugify(chap.title)}-${serieCode.toLowerCase()}`;

        // Vérifier si le chapitre existe déjà
        const existing = await pool.query(
          'SELECT id FROM chapters WHERE subject_id = $1 AND title = $2',
          [subjectId, chap.title]
        );

        let chapterId;

        if (existing.rowCount > 0) {
          chapterId = existing.rows[0].id;
        } else {
          const chapResult = await pool.query(
            `INSERT INTO chapters (id, subject_id, title, slug, order_index, key_formulas, course_content, is_published)
             VALUES ($1, $2, $3, $4, $5, $6, $7, true) RETURNING id`,
            [
              randomUUID(), subjectId, chap.title, slug, i + 1,
              JSON.stringify(chap.formulas ?? []),
              `# ${chap.title}\n\nCe chapitre couvre les notions essentielles du programme ${serieCode} DGEX concernant **${chap.title}**.\n\n## Formules clés\n${(chap.formulas ?? []).map(f => `- ${f}`).join('\n')}\n\n## À retenir pour le BAC\nMaîtrisez les définitions, les formules et sachez les appliquer dans des exercices variés de difficulté croissante.`
            ]
          );
          chapterId = chapResult.rows[0].id;
          chaptersCreated++;
        }

        // Exercices pour ce chapitre
        const chapExercises = data.exercises?.[chap.title] ?? [];

        for (let j = 0; j < chapExercises.length; j++) {
          const ex = chapExercises[j];

          // Vérifier si l'exercice existe
          const exExisting = await pool.query(
            'SELECT id FROM exercises WHERE chapter_id = $1 AND question_text = $2',
            [chapterId, ex.q]
          );

          if (exExisting.rowCount > 0) {
continue;
}

          const opts = ex.opts.map((o, idx) => ({
            label: ['A', 'B', 'C', 'D'][idx],
            text: o.substring(3), // retirer "A. " du texte
          }));

          await pool.query(
            `INSERT INTO exercises (id, chapter_id, subject_id, type, difficulty, question_text, options, correct_answer, explanation, hints, is_annale, estimated_time_minutes, points, is_published)
             VALUES ($1,$2,$3,'qcm',$4,$5,$6,$7,$8,$9,false,5,10,true)`,
            [
              randomUUID(), chapterId, subjectId,
              Math.floor(j / 2) + 2, // difficultés 2-3
              ex.q,
              JSON.stringify(opts),
              ex.ans,
              ex.expl,
              JSON.stringify(['Relis la définition du cours.', 'Élimine d\'abord les réponses clairement fausses.']),
            ]
          );
          exercisesCreated++;
        }
      }
    }
  }

  console.log(`\n✅ Terminé : ${chaptersCreated} chapitres + ${exercisesCreated} exercices créés.`);
  process.exit(0);
}

main().catch(e => {
  console.error('❌ Erreur :', e.message);
  process.exit(1);
});
