/**
 * seed-official-programs-part2.js
 * Programmes officiels BAC Sénégal – Partie 2
 * Sujets : Philosophie, Français, Anglais, Histoire-Géo, SVT, Physique, Chimie
 */

// ─── IDs sujets (mêmes que dans seed-official-programs.js) ───────────────────
const SID = {
  S1_EPS:     'e1f5d8a2-3b7c-4d9e-af1a-2c6b5e4d3a7f',
  S2_EPS:     'f2e6c9b3-4a8d-4e0f-9a2b-3d7c6f5e4b8a',
  S2_INFO:    'a3b7d0c4-5b9e-4f1a-8b3c-4e8d7a6f5c9b',
  L1_PHILO:   '5462163a-224b-4c13-883b-534e308fc46c',
  L1_HISTGEO: '781dcd75-2a1a-41fe-afa6-2de359c7340a',
  L1_FR:      '84ef8ad2-0716-4c3e-b924-7a24d4723da5',
  L1_EN:      'ac384102-fae9-4356-947a-aa61f76e3b11',
  L1_SVT:     '72b027b6-59b9-4655-bdfe-6747378823da',

  L2_PHILO:   '98d1f519-53b1-42b5-a3c2-fb6d9aa7cc87',
  L2_HISTGEO: 'a94cfbcf-d46a-45ca-a8de-27ab10998c8e',
  L2_FR:      '46022a0c-00dd-453f-b216-646d9c6774ea',
  L2_EN:      '7d81abfe-ccca-4546-9bf9-e9a789ccbb94',

  S1_PHILO:   '1c79092a-43d5-47a0-aa95-989348fdbc2c',
  S1_HISTGEO: '627be785-3dc6-4d8d-bead-530f90e550b6',
  S1_FR:      'f7628019-4791-4f93-b6cd-ace2f860f082',
  S1_EN:      'a46fb402-6a20-4dc4-b345-2a0bae25e53f',
  S1_SVT:     '5e15756b-129d-446c-805b-42ebbb75af03',
  S1_PHY:     '570ffd26-72a4-4185-b6eb-4fbcea192c99',
  S1_CHI:     '4b9d0f9e-57e6-4aef-a9ce-88b11ab28850',

  S2_PHILO:   'cc794b2c-f2ae-407f-95ef-18f7ce60df17',
  S2_HISTGEO: 'c8528812-dd47-4f95-bdad-0543d8d101d8',
  S2_FR:      '11c17863-aaab-4361-aa18-f3b7c10d9651',
  S2_EN:      '6006cff5-fa7f-4d36-8f2e-79437f6ffb34',
  S2_SVT:     '7558ceab-dcad-46f1-9ec3-38215d62af19',
  S2_PHY:     '8a7e0812-c11b-48ef-ba90-6402907db0be',
  S2_CHI:     'b82924d7-c598-4f24-bdbe-9f8fa0db59ce',
};

function opt(a, b, c, d) {
  return [
    { label: 'A', text: a },
    { label: 'B', text: b },
    { label: 'C', text: c },
    { label: 'D', text: d },
  ];
}

function ex(title, q, options, ans, expl, diff = 3) {
  return { title, question_text: q, options, correct_answer: ans, explanation: expl, difficulty: diff };
}

// ══════════════════════════════════════════════════════════════════════════════
// PHILOSOPHIE – Programme Terminale toutes séries (Office du Baccalauréat SN)
// 4 domaines : Réflexion philo · Vie sociale · Épistémologie · Esthétique
// ══════════════════════════════════════════════════════════════════════════════
const PHILO_CHAPTERS = [
  {
    title: "Réflexion philosophique – L'homme, la liberté et le bonheur",
    order_index: 1,
    summary: "La démarche philosophique, l'homme comme être de raison et de liberté, le déterminisme, la conception du bonheur.",
    key_formulas: [
      "La philosophie est la recherche rationnelle de la vérité et du sens de l'existence.",
      "L'homme est défini comme animal raisonnable (Aristote) et animal politique.",
      "Liberté = absence de contrainte extérieure (sens négatif) ou pouvoir d'autodétermination (sens positif).",
      "Déterminisme : tout effet a une cause ; s'oppose au libre arbitre.",
      "Le bonheur (eudémonisme) est la fin ultime de l'activité humaine selon Aristote.",
    ],
    course_content: `# Réflexion philosophique

## 1. La démarche philosophique
La philosophie (du grec *philos* = ami, *sophia* = sagesse) est l'amour de la sagesse. Elle se distingue des autres disciplines par :
- Son **objet** : les questions fondamentales (existence, connaissance, valeurs).
- Sa **méthode** : le raisonnement rigoureux, l'argumentation, le doute méthodique.
- Sa **visée** : la recherche de la vérité et du sens.

## 2. L'homme
Aristote définit l'homme comme **animal raisonnable** (*zoon logikon*) et **animal politique** (*zoon politikon*). La raison est la faculté qui distingue l'homme de l'animal.

## 3. La liberté
- **Sens négatif** (liberté-de) : absence de contraintes extérieures.
- **Sens positif** (liberté-pour) : capacité d'autodétermination, de choisir ses actes selon la raison.
- **Le libre arbitre** (Descartes) : pouvoir de choisir indépendamment de toute cause extérieure.
- **Le déterminisme** : tout phénomène est causalement déterminé. Pour Spinoza, la liberté est la conscience de la nécessité.

## 4. Le bonheur
- **Hédonisme** (Épicure) : le bonheur est le plaisir, principalement l'ataraxie (absence de trouble).
- **Eudémonisme** (Aristote) : le bonheur est la réalisation de la nature humaine par la vertu et la raison.
- **Stoïcisme** : le bonheur est la vertu, indépendante des biens extérieurs.`,
    exercises: [
      ex('Définition de la philosophie',
        'Quelle est la définition étymologique du mot "philosophie" ?',
        opt('Amour de la sagesse', 'Science de la nature', 'Art de bien parler', 'Étude des astres'),
        'A', "Philosophie vient du grec *philos* (ami/amant) et *sophia* (sagesse). C'est donc littéralement l'amour ou la recherche de la sagesse.", 2),
      ex('L\'homme selon Aristote',
        'Aristote définit l\'homme principalement comme :',
        opt('Un être divin', 'Un animal raisonnable et politique', 'Un être instinctif', 'Un être déterminé par ses passions'),
        'B', "Pour Aristote, l'homme est *zoon logikon* (animal raisonnable) et *zoon politikon* (animal politique), c'est-à-dire un être qui vit naturellement en société et use de la raison.", 2),
      ex('Liberté et déterminisme',
        'Le déterminisme affirme que :',
        opt('L\'homme est totalement libre de ses actes', 'Tout phénomène est causalement déterminé', 'La liberté est une illusion totale', 'La nature humaine est immuable'),
        'B', "Le déterminisme est la thèse selon laquelle tout événement, y compris les actes humains, est causalement déterminé par des facteurs antérieurs (physiques, psychologiques, sociaux). Il s'oppose au libre arbitre.", 3),
      ex('Le bonheur selon Épicure',
        'Pour Épicure, le bonheur consiste essentiellement en :',
        opt('L\'accumulation des richesses', 'La participation à la vie politique', 'L\'ataraxie – absence de trouble et de douleur', 'L\'obéissance aux lois divines'),
        'C', "Épicure (hédonisme) définit le bonheur comme l'ataraxie (absence de trouble de l'âme) et l'aponie (absence de douleur corporelle). Le vrai plaisir est la paix intérieure, non les plaisirs agités.", 3),
      ex('Le libre arbitre selon Descartes',
        'Pour Descartes, le libre arbitre est :',
        opt('Une illusion produite par les passions', 'La faculté de choisir sans être déterminé par aucune cause extérieure', 'Uniquement réservé aux hommes instruits', 'Identique à l\'obéissance à la raison'),
        'B', "Descartes définit le libre arbitre comme la faculté de se déterminer soi-même, indépendamment de toute contrainte extérieure. Il est infini chez l'homme, contrairement à l'entendement. C'est ce qui rapproche l'homme de Dieu.", 3),
      ex('Le stoïcisme et le bonheur',
        'Pour les stoïciens (Épictète, Marc Aurèle), le bonheur est atteint en :',
        opt('Fuyant la société et ses contraintes', 'Recherchant les plaisirs sensoriels intenses', 'Distinguant ce qui dépend de nous de ce qui n\'en dépend pas', 'Accumulant les connaissances scientifiques'),
        'C', "Le stoïcisme enseigne la distinction entre ce qui dépend de nous (nos jugements, désirs, volonté) et ce qui n'en dépend pas (la maladie, la mort, la réputation). Le bonheur consiste à maîtriser ce qui dépend de nous et à accepter le reste.", 3),
    ],
  },
  {
    title: "Vie sociale et politique – Société, État, Droit et Justice",
    order_index: 2,
    summary: "La nature de la société, le contrat social, le fondement de l'État, le droit naturel et positif, les théories de la justice.",
    key_formulas: [
      "Contrat social (Rousseau) : accord volontaire des individus pour former la société civile.",
      "État de nature (Hobbes) : 'la guerre de tous contre tous'.",
      "Droit naturel : droits inhérents à la nature humaine, antérieurs à toute loi positive.",
      "Droit positif : l'ensemble des lois en vigueur dans un État.",
      "Justice distributive (Aristote) : à chacun selon son mérite.",
    ],
    course_content: `# Vie sociale et politique

## 1. La société et son origine
- **Origine naturelle** (Aristote) : l'homme est naturellement un être social.
- **Origine conventionnelle** (contractualistes) : la société résulte d'un contrat.

## 2. Le contrat social
- **Hobbes** : à l'état de nature, la vie est "solitaire, misérable, dangereuse". Les hommes cèdent leurs droits à un souverain absolu (Léviathan) pour assurer la paix.
- **Locke** : le contrat social préserve les droits naturels (vie, liberté, propriété). Le souverain doit respecter ces droits.
- **Rousseau** : la volonté générale transcende les volontés particulières. Le contrat social fonde une communauté d'égaux.

## 3. L'État et le droit
- **L'État** : organisation politique dotée d'un pouvoir souverain sur un territoire et une population.
- **Droit naturel** : droits universels inhérents à la nature humaine (Locke, Rousseau).
- **Droit positif** : l'ensemble des lois édictées par les institutions d'un État.

## 4. La justice
- **Justice distributive** (Aristote) : chacun reçoit selon son mérite ou sa contribution.
- **Justice commutative** : égalité dans les échanges.
- **Justice sociale** (Rawls) : les inégalités ne sont acceptables que si elles profitent aux plus défavorisés.`,
    exercises: [
      ex("L'état de nature selon Hobbes",
        "Selon Hobbes, l'état de nature est caractérisé par :",
        opt("La paix et la coopération naturelle", "La guerre de tous contre tous", "L'égalité et la fraternité", "La domination des plus sages"),
        'B', "Pour Hobbes, sans autorité politique, l'état de nature est un état de guerre permanente ('bellum omnium contra omnes'). La vie y est 'solitaire, misérable, dangereuse, animale et brève'.", 3),
      ex("Le contrat social de Rousseau",
        "La 'volonté générale' chez Rousseau désigne :",
        opt("La somme des volontés individuelles", "La volonté du souverain", "La volonté du bien commun de la communauté", "La loi naturelle"),
        'C', "La volonté générale chez Rousseau n'est pas la somme des volontés particulières (volonté de tous), mais la volonté orientée vers le bien commun. Elle est inaliénable et infaillible.", 4),
      ex("Droit naturel vs droit positif",
        "Le droit positif se distingue du droit naturel parce qu'il est :",
        opt("Universel et immuable", "Fondé sur la nature humaine", "Édicté par les institutions d'un État", "Antérieur à toute société"),
        'C', "Le droit positif (jus positum) désigne l'ensemble des normes juridiques effectivement en vigueur dans un État donné à un moment donné. Il s'oppose au droit naturel, universel et antérieur à toute législation.", 3),
      ex("La justice selon John Rawls",
        "Selon Rawls, les inégalités sociales sont justes si elles :",
        opt("Récompensent le mérite individuel", "Sont approuvées par la majorité", "Profitent aux membres les plus défavorisés de la société", "Sont établies par un contrat librement consenti"),
        'C', "Dans *Théorie de la justice* (1971), Rawls formule le 'principe de différence' : les inégalités économiques et sociales ne sont acceptables que si elles avantangent les membres les moins favorisés de la société. C'est la conception libérale de la justice sociale.", 4),
      ex("L'État selon Max Weber",
        "Selon Max Weber, l'État se caractérise principalement par :",
        opt("Sa richesse économique", "Le monopole de la violence physique légitime sur un territoire", "La sagesse de ses dirigeants", "L'accord unanime de ses citoyens"),
        'B', "Max Weber définit l'État comme 'la communauté humaine qui revendique avec succès le monopole de la violence physique légitime à l'intérieur d'un territoire donné'. C'est la définition sociologique classique de l'État moderne.", 3),
    ],
  },
  {
    title: "Épistémologie et Esthétique – La science, la vérité et l'art",
    order_index: 3,
    summary: "Les méthodes scientifiques, la notion de vérité, la philosophie de l'art et la notion du beau.",
    key_formulas: [
      "Épistémologie : étude critique des fondements, méthodes et résultats des sciences.",
      "Vérité de cohérence : une proposition est vraie si elle est cohérente avec d'autres propositions.",
      "Vérité de correspondance : une proposition est vraie si elle correspond à la réalité.",
      "Méthode hypothético-déductive : hypothèse → déduction → expérimentation → confirmation/réfutation.",
      "L'art : activité de création de formes porteuses de sens et de beauté.",
    ],
    course_content: `# Épistémologie et Esthétique

## 1. L'épistémologie
L'épistémologie (du grec *epistémè* = science, *logos* = discours) est la philosophie des sciences. Elle étudie :
- Les **fondements** de la connaissance scientifique.
- Les **méthodes** utilisées par les sciences.
- Les **limites** et la **valeur** du savoir scientifique.

## 2. La vérité
- **Vérité de correspondance** : une proposition est vraie si elle correspond à la réalité (Aristote).
- **Vérité de cohérence** : une proposition est vraie si elle est logiquement cohérente avec un système.
- **Vérité pragmatique** (William James) : est vrai ce qui est utile, ce qui réussit dans la pratique.

## 3. La méthode scientifique
- **Méthode empirique** (Bacon) : observation → induction → loi générale.
- **Méthode hypothético-déductive** : hypothèse → déductions → expérimentation → vérification.
- **Principe de falsifiabilité** (Popper) : une théorie est scientifique si elle est réfutable.

## 4. L'art et le beau
- L'**esthétique** est la philosophie de l'art et du beau.
- **Le beau** : Kant distingue le beau (jugement désintéressé et universel) de l'agréable (subjectif).
- **L'art** : Hegel voit l'art comme une manifestation sensible de l'esprit absolu.
- **Mimèsis** (Platon/Aristote) : l'art comme imitation de la réalité.`,
    exercises: [
      ex('Définition de l\'épistémologie',
        'L\'épistémologie est :',
        opt('L\'étude des êtres vivants', 'La philosophie critique des fondements et méthodes des sciences', 'La science des astres', 'L\'étude des comportements humains'),
        'B', "L'épistémologie (du grec *epistémè* = science) est la branche de la philosophie qui étudie la nature, les fondements, les méthodes et les limites de la connaissance scientifique.", 2),
      ex('Principe de falsifiabilité',
        'Selon Karl Popper, une théorie est scientifique si elle est :',
        opt('Vérifiée par de nombreuses expériences', 'Réfutable (falsifiable) en principe', 'Acceptée par la communauté scientifique', 'Mathématiquement démontrable'),
        'B', "Pour Popper, le critère de démarcation entre science et pseudo-science est la *falsifiabilité* : une théorie est scientifique si elle peut en principe être réfutée par l'expérience. Une théorie non falsifiable (ex : astrologie) n'est pas scientifique.", 4),
      ex('Le beau selon Kant',
        'Pour Kant, le jugement esthétique (le beau) se caractérise par :',
        opt('Sa subjectivité pure', 'Son désintéressement et sa prétention à l\'universalité', 'Sa dépendance aux normes culturelles', 'Son fondement dans la sensation agréable'),
        'B', "Kant distingue l'agréable (subjectif : ce qui plaît à mes sens) du beau (jugement désintéressé qui prétend à l'universalité). Quand je dis 'c'est beau', je prétends que tous devraient être d'accord, même si ce jugement reste non démontrable.", 4),
      ex('La vérité pragmatique',
        'Selon William James, est vrai ce qui :',
        opt('Correspond exactement à la réalité physique', 'Est démontrable mathématiquement', 'Est utile et qui réussit dans la pratique', 'Est accepté par le plus grand nombre'),
        'C', "Le pragmatisme (William James, John Dewey) soutient que la vérité d'une idée se mesure à ses effets pratiques et à son utilité. Une idée est vraie si elle 'fonctionne', c'est-à-dire si elle permet d'agir efficacement sur le monde.", 3),
      ex('La mimèsis chez Platon',
        'Platon critique l\'art dans *La République* car il considère que l\'art est :',
        opt('Une création originale de beauté pure', 'Une imitation (mimèsis) d\'une imitation, donc doublement éloigné de la vérité', 'Un moyen d\'éduquer les citoyens à la vertu', 'Une expression de l\'âme humaine'),
        'B', "Platon considère que les objets sensibles sont déjà des copies des Idées (formes parfaites). L'art imite ces objets sensibles : c'est donc une imitation d'imitation, au troisième degré d'éloignement de la vérité. D'où sa méfiance envers les artistes dans la cité idéale.", 4),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// FRANÇAIS – Programme Terminale L et S (Office du Baccalauréat SN)
// Le Surréalisme · Esthétique des genres · Méthodes de travail
// ══════════════════════════════════════════════════════════════════════════════
const FR_CHAPTERS = [
  {
    title: 'Le Surréalisme – Histoire, caractéristiques et œuvres',
    order_index: 1,
    summary: "Contexte historique du surréalisme, manifestes d'André Breton, procédés d'écriture automatique, principaux auteurs sénégalais et français.",
    key_formulas: [
      "Surréalisme : mouvement artistique et littéraire né en 1924 avec le 1er Manifeste de Breton.",
      "L'écriture automatique : noter la pensée sans contrôle de la raison.",
      "Le hasard objectif : coïncidences porteuses de sens selon les surréalistes.",
      "Principaux auteurs : André Breton, Paul Éluard, Louis Aragon, René Char.",
    ],
    course_content: `# Le Surréalisme

## 1. Contexte et origine
Le surréalisme naît dans l'entre-deux-guerres, en réaction aux horreurs de la Première Guerre mondiale et au mouvement Dada. André Breton publie le **1er Manifeste du surréalisme en 1924** puis le **2e Manifeste en 1930**.

## 2. Définition et principes
Breton définit le surréalisme comme : *"Automatisme psychique pur par lequel on se propose d'exprimer, soit verbalement, soit par écrit, soit de toute autre manière, le fonctionnement réel de la pensée."*

Principes fondamentaux :
- **L'écriture automatique** : libérer l'écriture du contrôle de la raison.
- **Le rêve et l'inconscient** : explorer les profondeurs de la psyché (influence de Freud).
- **Le hasard objectif** : rencontres et coïncidences révélatrices.
- **La révolte** contre les valeurs bourgeoises et la logique rationnelle.

## 3. Procédés stylistiques
- Images insolites et associations inattendues.
- Métaphores audacieuses, comparaisons surprenantes.
- Ruptures syntaxiques, collages, cadavres exquis.

## 4. Principaux représentants
- **André Breton** : *Nadja*, *L'Amour fou*, *Manifestes du surréalisme*.
- **Paul Éluard** : *Capitale de la douleur*, *L'Amour la poésie*.
- **Louis Aragon** : *Le Paysan de Paris*.
- **René Char** : *Fureur et mystère*.`,
    exercises: [
      ex('Date du 1er Manifeste surréaliste',
        'Le premier Manifeste du surréalisme d\'André Breton est publié en :',
        opt('1916', '1924', '1930', '1945'),
        'B', "Le 1er Manifeste du surréalisme est publié par André Breton en 1924. Il définit le surréalisme et pose les bases du mouvement. Un 2e Manifeste suivra en 1930.", 2),
      ex('L\'écriture automatique',
        'L\'écriture automatique dans le surréalisme consiste à :',
        opt('Écrire très vite sans faire de fautes', 'Dicter un texte à voix haute', 'Écrire sans contrôle de la raison pour libérer l\'inconscient', 'Copier automatiquement des textes existants'),
        'C', "L'écriture automatique est la technique centrale du surréalisme : écrire en laissant venir les mots sans intervention de la raison, de la censure morale ou des préoccupations esthétiques, pour accéder à l'inconscient.", 2),
      ex('Influence sur le surréalisme',
        'Quel penseur a influencé les surréalistes dans leur intérêt pour l\'inconscient et le rêve ?',
        opt('Karl Marx', 'Sigmund Freud', 'Friedrich Nietzsche', 'Charles Darwin'),
        'B', "Sigmund Freud et sa psychanalyse ont profondément influencé les surréalistes. Les concepts d'inconscient, de rêve et d'associations libres sont au cœur de la démarche surréaliste.", 2),
      ex('Œuvre de Breton',
        'Parmi ces œuvres, laquelle est d\'André Breton ?',
        opt('Les Fleurs du mal', 'Nadja', 'L\'Étranger', 'Les Misérables'),
        'B', "*Nadja* (1928) est le roman autobiographique d'André Breton, chef de file du surréalisme. Il y raconte sa rencontre avec une jeune femme mystérieuse comme une expérience surréaliste vécue.", 2),
      ex('Le cadavre exquis',
        'Le "cadavre exquis" est une technique surréaliste consistant à :',
        opt('Écrire un texte sur la mort et le macabre', 'Créer collectivement un texte où chaque participant écrit sans voir ce qu\'a écrit le précédent', 'Illustrer des poèmes avec des dessins automatiques', 'Réciter des poèmes à voix haute en improvisant'),
        'B', "Le 'cadavre exquis' est un jeu d'écriture collective surréaliste : chaque participant écrit une partie du texte, plie la feuille pour cacher ce qu'il a écrit, et la passe au suivant. Le résultat est souvent insolite et surréaliste, libérant l'inconscient collectif.", 3),
      ex('Paul Éluard et le surréalisme',
        'Paul Éluard est l\'auteur de :',
        opt('*Le Paysan de Paris*', '*Capitale de la douleur*', '*Les Fleurs du mal*', '*Alcools*'),
        'B', "*Capitale de la douleur* (1926) est le recueil phare de Paul Éluard, poète surréaliste. Il y exprime la douleur de l'amour perdu et la puissance du désir, à travers des images innovantes libérées du contrôle rationnel. *Le Paysan de Paris* est d'Aragon ; *Alcools* d'Apollinaire.", 2),
    ],
  },
  {
    title: "Esthétique des genres littéraires – Poésie, Roman, Théâtre",
    order_index: 2,
    summary: "Caractéristiques esthétiques des trois grands genres : poésie (versification, figures), roman (narration, personnage), théâtre (dialogue, conflit dramatique).",
    key_formulas: [
      "Vers : unité rythmique de la poésie ; alexandrin = 12 syllabes.",
      "Rime : retour d'un même son en fin de vers (plates AABB, croisées ABAB, embrassées ABBA).",
      "Narrateur : instance qui raconte (omniscient, interne, externe).",
      "Schéma actantiel : sujet, objet, destinateur, destinataire, adjuvant, opposant.",
      "Les trois unités classiques au théâtre : temps, lieu, action.",
    ],
    course_content: `# Esthétique des genres littéraires

## 1. La poésie
**Le vers** : unité rythmique basée sur le nombre de syllabes.
- Alexandrin : 12 syllabes (vers noble du théâtre classique).
- Décasyllabe : 10 syllabes. Octosyllabe : 8 syllabes.

**La rime** : retour d'un son identique en fin de vers.
- Rimes plates (AABB), croisées (ABAB), embrassées (ABBA).

**Figures de style** : métaphore, comparaison, personnification, anaphore, antithèse, oxymore, allitération, assonance.

## 2. Le roman
**Le narrateur** :
- **Omniscient** : sait tout des personnages et de l'histoire.
- **Interne** : narration à la 1re personne, point de vue limité.
- **Externe** : observe sans accéder aux pensées des personnages.

**La construction du personnage** : nom, portrait physique/moral, statut social, évolution.

**Les types de romans** : réaliste, naturaliste, policier, psychologique, historique, autobiographique.

## 3. Le théâtre
**Les genres** : tragédie (conflit insoluble, chute du héros), comédie (dénouement heureux, critique sociale), drame (mélange des deux).

**Les unités classiques** : unité de temps (24h), de lieu (un seul endroit), d'action (une intrigue principale).

**Le schéma actantiel** (Greimas) : Sujet → Objet, aidé par des adjuvants, contré par des opposants, au nom d'un destinateur, pour un destinataire.`,
    exercises: [
      ex('L\'alexandrin',
        'Un alexandrin est un vers composé de :',
        opt('8 syllabes', '10 syllabes', '12 syllabes', '14 syllabes'),
        'C', "L'alexandrin est le vers français de 12 syllabes, divisé en deux hémistiches de 6 syllabes chacun (césure). C'est le vers noble par excellence du théâtre classique (Racine, Corneille) et de la poésie épique.", 2),
      ex('Types de rimes',
        'Dans le schéma ABAB, les rimes sont dites :',
        opt('Plates', 'Croisées', 'Embrassées', 'Libres'),
        'B', "Le schéma ABAB correspond aux rimes croisées : les vers riment alternativement (vers 1 avec vers 3, vers 2 avec vers 4). AABB = rimes plates ; ABBA = rimes embrassées.", 2),
      ex('Le narrateur omniscient',
        'Un narrateur omniscient est un narrateur qui :',
        opt('Raconte à la première personne', 'Ne connaît que les actions extérieures', 'Connaît les pensées, sentiments et actions de tous les personnages', 'Est un personnage du roman'),
        'C', "Le narrateur omniscient (ou hétérodiégétique omniscient) sait tout : il accède aux pensées intimes de tous les personnages, connaît le passé et peut anticiper l'avenir. C'est le narrateur type du roman réaliste du XIXe siècle.", 3),
      ex('Tragédie classique',
        'La règle des trois unités au théâtre classique impose l\'unité de :',
        opt('Style, ton et registre', 'Temps, lieu et action', 'Personnages, décors et costumes', 'Exposition, nœud et dénouement'),
        'B', "La règle des trois unités, codifiée par Boileau (*Art poétique*, 1674), impose : unité de temps (l'action doit tenir en 24h), de lieu (un seul endroit), d'action (une intrigue principale). Elle régit la tragédie classique (Corneille, Racine).", 3),
      ex('La métaphore',
        'La métaphore se distingue de la comparaison par :',
        opt('L\'utilisation d\'un outil de comparaison (comme, tel, ainsi que)', 'L\'absence d\'outil de comparaison : l\'identification est directe', 'Le fait qu\'elle ne concerne que les personnes', 'Sa longueur qui dépasse toujours une phrase'),
        'B', "La comparaison utilise un outil (comme, tel que, semblable à) : 'Son regard est comme une étoile'. La métaphore opère une identification directe, sans outil : 'Son regard est une étoile'. La métaphore est plus saisissante car elle crée une fusion immédiate.", 2),
      ex('Types de narrateur – focalisation',
        'Dans un récit en focalisation interne, le narrateur :',
        opt('Sait tout sur tous les personnages (omniscient)', 'Adopte le point de vue d\'un personnage spécifique et ne voit que ce qu\'il voit', 'Observe les personnages de l\'extérieur sans accéder à leurs pensées', 'Raconte des événements futurs'),
        'B', "La focalisation interne signifie que le récit est filtré par la conscience d'un personnage particulier : le lecteur ne sait que ce que ce personnage sait, ressent et perçoit. Ex. : *L'Étranger* de Camus (focalisation interne sur Meursault).", 3),
    ],
  },
  {
    title: "Méthodes de travail – Dissertation, Commentaire, Résumé",
    order_index: 3,
    summary: "Méthodologie de la dissertation littéraire, du commentaire composé et du résumé-discussion au Baccalauréat sénégalais.",
    key_formulas: [
      "Dissertation : thèse → antithèse → synthèse (plan dialectique) ou thèse + développements.",
      "Commentaire composé : introduction (texte + problématique) + axes d'analyse + conclusion.",
      "Résumé : réduire un texte à 1/4 de sa longueur sans déformer la pensée.",
      "Problématique : question centrale à laquelle le devoir répond.",
    ],
    course_content: `# Méthodes de travail

## 1. La dissertation littéraire
**Structure** :
1. **Introduction** : amorce → présentation du sujet → problématique → annonce du plan.
2. **Développement** (généralement 3 parties) : thèse illustrée par des exemples.
3. **Conclusion** : bilan → ouverture.

**Plans types** :
- Plan **dialectique** : thèse / antithèse / synthèse.
- Plan **thématique** : 3 aspects différents du sujet.
- Plan **analytique** : causes → faits → conséquences.

## 2. Le commentaire composé
Le commentaire composé analyse un texte littéraire selon **axes thématiques** (non linéaires).

**Structure** :
1. Introduction : situer le texte + problématique + annonce des axes.
2. Axes d'analyse (2-3) : chaque axe éclaire un aspect du texte, illustré par des citations.
3. Conclusion : synthèse + ouverture.

**Méthode d'analyse** : citer → observer → interpréter → commenter l'effet produit.

## 3. Le résumé et la discussion
**Le résumé** : reformuler fidèlement les idées de l'auteur en 1/4 de la longueur du texte.
- Règles : pas d'ajouts personnels, conserver la progression logique, pas de citations directes.

**La discussion** : réagir au texte résumé en apportant son point de vue argumenté.`,
    exercises: [
      ex('Structure de la dissertation',
        'Le plan dialectique de la dissertation suit l\'ordre :',
        opt('Introduction → développement → conclusion', 'Thèse → antithèse → synthèse', 'Problème → causes → solutions', 'Présentation → argumentation → illustration'),
        'B', "Le plan dialectique est organisé en trois mouvements : thèse (défense d'une position), antithèse (position contraire ou nuance), synthèse (dépassement des deux positions précédentes). C'est le plan le plus fréquent en dissertation philosophique et littéraire.", 2),
      ex('La problématique',
        'Dans un devoir de français, la problématique est :',
        opt('Le titre du sujet', 'La question centrale à laquelle le devoir répond', 'Le résumé de l\'argument principal', 'La liste des arguments'),
        'B', "La problématique est la question fondamentale que pose le sujet et à laquelle tout le développement doit répondre. Elle donne une direction à l'argumentation et justifie le plan choisi.", 2),
      ex('Le résumé',
        'Dans un résumé de texte, il faut :',
        opt('Donner son opinion sur les idées de l\'auteur', 'Ajouter des exemples personnels', 'Reformuler fidèlement les idées sans les trahir ni ajouter', 'Citer directement de longs passages du texte'),
        'C', "Le résumé exige fidélité à la pensée de l'auteur. Il faut reformuler les idées dans ses propres mots (pas de citations directes), conserver la progression logique du texte, et réduire à environ 1/4 de la longueur initiale.", 2),
      ex('L\'introduction d\'un devoir',
        'L\'introduction d\'une dissertation doit obligatoirement contenir :',
        opt('La conclusion anticipée et les réponses définitives', 'L\'amorce, la problématique et l\'annonce du plan', 'Uniquement les citations d\'auteurs célèbres', 'Une liste exhaustive des arguments'),
        'B', "Une introduction bien construite comprend : (1) une amorce ou accroche (entrée en matière), (2) la présentation et délimitation du sujet, (3) la problématique (question centrale), (4) l'annonce du plan (les grandes parties du développement).", 2),
      ex('Le commentaire composé',
        'Dans un commentaire composé, les axes d\'analyse doivent être organisés :',
        opt('De manière linéaire, ligne par ligne du texte', 'Par axes thématiques qui éclairent chacun un aspect du texte', 'Par ordre chronologique des événements du texte', 'Uniquement selon les figures de style identifiées'),
        'B', "Le commentaire composé (ou composé d'axes) s'organise en axes thématiques : chaque axe développe une idée centrale sur le texte, illustrée par des citations analysées. Il ne suit pas l'ordre du texte (contrairement à l'explication linéaire).", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// ANGLAIS – Programme Terminale L et S (Office du Baccalauréat SN)
// 9 thèmes · Compétences communicatives · Grammaire et phonologie
// ══════════════════════════════════════════════════════════════════════════════
const EN_CHAPTERS = [
  {
    title: 'Commerce, Économie et Société',
    order_index: 1,
    summary: "Topics: Trade & Professions, Economy, Free Time. Grammar: conditionals, modal verbs, reported speech.",
    key_formulas: [
      'Conditional type 2: If + past simple, would + infinitive (unreal present).',
      'Conditional type 3: If + past perfect, would have + past participle (unreal past).',
      'Reported speech: tense backshift (say → said, present → past).',
      'Modal verbs: can/could (ability), may/might (possibility), must/should (obligation/advice).',
    ],
    course_content: `# Commerce, Economy & Society

## Topic 1: Trade and Professions
**Vocabulary**: imports/exports, trade balance, tariffs, free trade, multinational, entrepreneur, supply/demand.
**Grammar focus**: Modal verbs (*must*, *should*, *can*, *may*) for obligations and possibilities.

## Topic 2: Economy
**Vocabulary**: GDP, inflation, recession, development, poverty, inequality, investment, budget.
**Grammar focus**: Conditional sentences type 2 (unreal present situations):
- *If Senegal increased exports, it would reduce the trade deficit.*

## Topic 3: Free Time / Leisure
**Vocabulary**: hobbies, sports, entertainment, internet, social media, tourism.
**Grammar focus**: Gerunds and infinitives after certain verbs.
- *enjoy + gerund* : I enjoy playing football.
- *want + infinitive* : I want to visit Dakar.

## Key Grammar: Reported Speech
Direct → Indirect speech: tense backshift and pronoun change.
- "I am working" → He said he **was** working.
- "We will come" → They said they **would** come.`,
    exercises: [
      ex('Conditional type 2',
        'Choose the correct form: "If Senegal _____ more in renewable energy, it _____ reduce its energy costs."',
        opt('invests / will', 'invested / would', 'had invested / would have', 'invest / reduces'),
        'B', "Conditional type 2 (unreal present): If + past simple, would + bare infinitive. 'If Senegal invested more..., it would reduce...' This describes a hypothetical (not current) situation.", 3),
      ex('Modal verbs',
        'Which sentence expresses a strong obligation or necessity?',
        opt('"You might study harder."', '"You could try again."', '"You must submit your application today."', '"You may leave early."'),
        'C', "*Must* expresses strong obligation or necessity (often from the speaker). *Might* = possibility; *could* = suggestion/ability; *may* = permission/possibility.", 2),
      ex('Reported speech tense',
        'She said: "I am preparing for the BAC." In reported speech: She said that she _____ for the BAC.',
        opt('is preparing', 'was preparing', 'has prepared', 'will prepare'),
        'B', "In reported speech, the present continuous shifts back to past continuous: 'am/is/are + -ing' → 'was/were + -ing'. Pronoun shift: 'I' → 'she'.", 2),
      ex('Trade vocabulary',
        'Which word describes the situation when a country imports more than it exports?',
        opt('Trade surplus', 'Trade deficit', 'Free trade', 'Trade balance'),
        'B', "A trade deficit (or unfavourable trade balance) occurs when the value of imports exceeds the value of exports. The opposite is a trade surplus (exports > imports). A trade balance is when they are equal.", 2),
      ex('Conditional type 3',
        'Complete: "If they _____ more in education, the literacy rate _____ improved."',
        opt('invested / would have', 'had invested / would have', 'invest / will have', 'invested / would'),
        'B', "Conditional type 3 expresses an unreal situation in the past: If + past perfect, would have + past participle. 'If they had invested... the rate would have improved.' This means they did NOT invest, and the rate did NOT improve.", 3),
    ],
  },
  {
    title: 'Sciences, Technologie et Santé',
    order_index: 2,
    summary: "Topics: Science & Technology, Health, Information & Communication. Grammar: passive voice, relative clauses, question tags.",
    key_formulas: [
      'Passive voice: subject + to be (conjugated) + past participle.',
      'Relative clauses: who (person), which/that (thing), whose (possession), where (place).',
      'Question tags: positive statement → negative tag; negative statement → positive tag.',
      'Present perfect: have/has + past participle (for recent events with present relevance).',
    ],
    course_content: `# Science, Technology & Health

## Topic 4: Science and Technology
**Vocabulary**: invention, discovery, research, innovation, artificial intelligence, space exploration, digital, robotics.
**Grammar focus**: **Passive voice** — used when the action is more important than the actor.
- Active: *Scientists discovered penicillin in 1928.*
- Passive: *Penicillin was discovered in 1928.*

## Topic 5: Health
**Vocabulary**: disease, prevention, treatment, vaccination, malaria, HIV/AIDS, malnutrition, public health.
**Grammar focus**: **Present perfect** — actions with present relevance.
- *Scientists have developed a new vaccine.*
- *Malaria has killed millions of people in Africa.*

## Topic 6: Information and Communication
**Vocabulary**: internet, smartphone, social networks, media, cybercrime, digital divide, broadcasting.
**Grammar focus**: **Relative clauses**.
- Defining: *The phone **that** you bought is very fast.*
- Non-defining: *The internet, **which** connects billions of people, has changed the world.*

## Question Tags
- Positive + negative tag: *You live in Dakar, **don't you**?*
- Negative + positive tag: *She isn't coming, **is she**?*`,
    exercises: [
      ex('Passive voice',
        'Transform: "Researchers are testing a new malaria vaccine." → Passive:',
        opt('A new malaria vaccine is being tested by researchers.', 'A new malaria vaccine has been tested by researchers.', 'Researchers test a new malaria vaccine.', 'A new malaria vaccine is tested by researchers.'),
        'A', "Present continuous passive: subject + is/are + being + past participle. 'Researchers are testing...' → 'A new malaria vaccine is being tested by researchers.' (present continuous passive).", 3),
      ex('Relative clauses',
        'Choose the correct relative pronoun: "The scientist _____ discovered penicillin was Alexander Fleming."',
        opt('which', 'whose', 'who', 'where'),
        'C', "*Who* is used for people in relative clauses. *Which/that* is for things. *Whose* indicates possession. *Where* indicates place. 'The scientist **who** discovered penicillin...'", 2),
      ex('Question tags',
        'Complete: "Dakar is the capital of Senegal, _____ ?"',
        opt("isn't it", "is it", "doesn't it", "wasn't it"),
        'A', "When the main clause is positive (Dakar is...), the question tag must be negative (isn't it?). The auxiliary in the tag matches the main verb tense: 'is' → 'isn't it?'.", 2),
      ex('Health vocabulary',
        'Which term refers to the process of making a population immune to a disease by administering a vaccine?',
        opt('Quarantine', 'Vaccination', 'Diagnosis', 'Prescription'),
        'B', "Vaccination (or immunisation) is the process of stimulating the immune system with an antigen (vaccine) to create immunity against a disease without causing the disease itself. It is one of the most effective public health interventions.", 2),
      ex('Present perfect vs simple past',
        'Choose the correct form: "Scientists _____ a new treatment for malaria in 2022."',
        opt('have discovered', 'discover', 'discovered', 'had discovered'),
        'C', "The simple past is used with a specific past time reference (in 2022). The present perfect (have discovered) is used for actions with no specific time or with recent relevance. Since '2022' is mentioned, the simple past 'discovered' is correct.", 2),
    ],
  },
  {
    title: "Culture, Patrimoine et Éducation",
    order_index: 3,
    summary: "Topics: Cultural Heritage, Events & Changes, Education. Grammar: past perfect, expressing contrast, essay writing skills.",
    key_formulas: [
      'Past perfect: had + past participle (action before another past action).',
      'Expressing contrast: although, even though, however, nevertheless, despite, in spite of.',
      'Cause and effect: because, since, as a result, therefore, consequently.',
      'Essay structure: introduction → body paragraphs (point + evidence + explanation) → conclusion.',
    ],
    course_content: `# Culture, Heritage & Education

## Topic 7: Cultural Heritage
**Vocabulary**: tradition, heritage, culture, colonisation, independence, identity, language, religion, festival.
**Grammar focus**: **Past perfect** — action that happened before another past action.
- *By 1960, Senegal **had gained** its independence.*
- *When he arrived, the ceremony **had already started**.*

## Topic 8: Events and Changes
**Vocabulary**: decolonisation, civil rights, revolution, globalisation, migration, urbanisation, environmental change.
**Grammar focus**: **Expressing contrast and concession**.
- *Although* / *Even though* + clause: *Although Africa is rich in resources, many people live in poverty.*
- *Despite* / *In spite of* + noun/gerund: *Despite independence, inequalities remain.*
- *However* / *Nevertheless* (linking adverbs, between sentences).

## Topic 9: Education
**Vocabulary**: literacy, scholarship, university, vocational training, distance learning, school dropout, curriculum.
**Essay writing**: Arguing for/against a position.
1. Introduction: background + thesis statement.
2. Body: 2-3 paragraphs, each with a **point**, **evidence**, **explanation** (PEE).
3. Conclusion: restate thesis + call to action or broader implication.`,
    exercises: [
      ex('Past perfect',
        'Choose the correct tense: "When students arrived, the teacher _____ the lesson."',
        opt('started', 'has started', 'had already started', 'was starting'),
        'C', "Past perfect (had + past participle) is used for an action completed before another past action. 'Had already started' shows the teacher began before the students arrived.", 3),
      ex('Expressing contrast',
        'Which sentence correctly expresses contrast?',
        opt('"Because Senegal has developed, it still faces challenges."', '"Despite economic growth, many Senegalese still live in poverty."', '"Since education improved, literacy rates rose."', '"As a result of poverty, many children drop out of school."'),
        'B', "'Despite + noun/gerund' expresses contrast. 'Despite economic growth' = 'although the economy grew'. Options A and C express cause, Option D expresses consequence.", 3),
      ex('Essay structure',
        'In the PEE method for essay writing, what does the second "E" stand for?',
        opt('Example', 'Evidence', 'Explanation', 'Extension'),
        'C', "PEE stands for Point → Evidence → Explanation. After stating your point and providing evidence (quote/example), you must **explain** how the evidence supports your point. This is the most analytical step.", 2),
      ex('Cultural heritage vocabulary',
        'Which word best describes the customs, arts, and social institutions inherited from previous generations?',
        opt('Identity', 'Heritage', 'Tradition', 'Culture'),
        'B', "Heritage refers specifically to what is inherited from the past and passed down to future generations: historical monuments, languages, customs, and values. Culture is broader (current practices); tradition refers to specific repeated practices; identity is how a group sees itself.", 2),
      ex('Cause and effect linking words',
        'Which sentence correctly uses a cause-and-effect connector?',
        opt('"Despite globalisation, local cultures are disappearing."', '"Although many languages exist, English is widely spoken."', '"As a result of urbanisation, rural areas are losing population."', '"However, migration has cultural benefits."'),
        'C', "'As a result of' introduces a consequence/effect. Option A uses 'despite' (contrast), B uses 'although' (concession), D uses 'however' (contrast). For cause/effect: because, since, therefore, as a result, consequently.", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// HISTOIRE-GÉOGRAPHIE – Programme Terminale toutes séries
// ══════════════════════════════════════════════════════════════════════════════
const HISTGEO_CHAPTERS = [
  {
    title: "Histoire – Décolonisation et émergence du Tiers-Monde (1945-1975)",
    order_index: 1,
    summary: "Le processus de décolonisation en Afrique et en Asie, la Conférence de Bandung (1955), la naissance du mouvement des non-alignés, l'indépendance du Sénégal.",
    key_formulas: [
      "Décolonisation : processus par lequel les colonies accèdent à l'indépendance (1945-1975).",
      "Conférence de Bandung (1955) : 29 pays d'Asie et d'Afrique ; naissance du Tiers-Monde.",
      "Non-alignement : refus de choisir entre bloc occidental et bloc soviétique.",
      "4 avril 1960 : indépendance du Sénégal (anciennement Sénégal-Soudan dans la Fédération du Mali).",
      "Léopold Sédar Senghor : 1er président du Sénégal (1960-1980).",
    ],
    course_content: `# Décolonisation et Tiers-Monde

## 1. La décolonisation : contexte et causes
Après la Seconde Guerre mondiale, le mouvement d'indépendance des peuples colonisés s'accélère.

**Causes** :
- Affaiblissement des puissances coloniales (France, Royaume-Uni).
- Développement des mouvements nationalistes (Gandhi en Inde, Lamine Guèye et Senghor au Sénégal).
- Rôle de l'ONU (Charte de 1945 : droit des peuples à disposer d'eux-mêmes).
- Guerre froide : USA et URSS soutiennent les indépendances pour contrer les empires coloniaux.

## 2. La Conférence de Bandung (avril 1955)
29 pays d'Asie et d'Afrique se réunissent en Indonésie. Naissance du concept de **Tiers-Monde** (terme forgé par Alfred Sauvy, 1952).

**Principes de Bandung** : paix, non-agression, non-ingérence, égalité, coexistence pacifique.

## 3. Le Mouvement des non-alignés
Fondé en 1961 (conférence de Belgrade). Refuse l'alignement sur les blocs américain ou soviétique.

## 4. L'indépendance du Sénégal
- **20 juin 1960** : indépendance de la Fédération du Mali (Sénégal + Soudan français).
- **20 août 1960** : le Sénégal se retire de la fédération. **4 avril 1960** est célébrée comme fête nationale.
- **Léopold Sédar Senghor** devient le 1er président (1960-1980).
- **Abdou Diouf** lui succède (1981-2000).`,
    exercises: [
      ex('Conférence de Bandung',
        'La Conférence de Bandung (1955) réunit :',
        opt('Les grandes puissances mondiales (USA, URSS, France, UK)', '29 pays d\'Asie et d\'Afrique nouvellement indépendants', 'Uniquement les pays africains', 'Les membres fondateurs de l\'ONU'),
        'B', "La Conférence de Bandung (avril 1955, Indonésie) réunit 29 nations d'Asie et d'Afrique, dont l'Inde (Nehru), l'Égypte (Nasser), la Chine (Zhou Enlai). Elle marque la naissance du Tiers-Monde comme acteur politique.", 2),
      ex('Indépendance du Sénégal',
        'Quel est le premier président de la République du Sénégal ?',
        opt('Abdou Diouf', 'Mamadou Dia', 'Léopold Sédar Senghor', 'Abdoulaye Wade'),
        'C', "Léopold Sédar Senghor (1906-2001) est le premier président de la République du Sénégal, de 1960 à 1980. Poète et homme d'État, il est aussi l'un des fondateurs de la Négritude avec Aimé Césaire.", 2),
      ex('Tiers-Monde',
        'Le concept de "Tiers-Monde" est forgé par Alfred Sauvy en :',
        opt('1945', '1952', '1960', '1975'),
        'B', "Alfred Sauvy forge le terme 'Tiers-Monde' en 1952, par analogie avec le Tiers-État de 1789. Il désigne les pays qui ne sont ni dans le bloc occidental ni dans le bloc communiste, et qui luttent pour leur développement.", 3),
      ex('Non-alignement',
        'Le mouvement des non-alignés est fondé lors de la conférence de :',
        opt('Bandung (1955)', 'Belgrade (1961)', 'Alger (1973)', 'Dakar (1960)'),
        'B', "Le mouvement des non-alignés est officiellement fondé lors de la conférence de Belgrade (1961), à l'initiative de Tito (Yougoslavie), Nehru (Inde) et Nasser (Égypte). Il regroupe les pays qui refusent de s'aligner sur l'un des deux blocs de la Guerre froide.", 3),
      ex('La décolonisation en Asie',
        'L\'Inde accède à l\'indépendance du Royaume-Uni sous la direction de :',
        opt('Mao Zedong', 'Hô Chi Minh', 'Mahatma Gandhi et Nehru', 'Soekarno'),
        'C', "L'Inde obtient son indépendance le 15 août 1947, après une longue lutte non-violente menée par Gandhi (résistance passive, désobéissance civile) et Nehru qui devient le premier Premier ministre. La partition crée simultanément l'Inde et le Pakistan.", 2),
      ex('Fête nationale du Sénégal',
        'La fête nationale du Sénégal est célébrée le 4 avril de chaque année. Cette date commémore :',
        opt('La naissance de Léopold Sédar Senghor', 'La signature de l\'accord d\'indépendance de la Fédération du Mali', 'L\'indépendance complète du Sénégal après la dissolution de la Fédération du Mali', 'La première élection présidentielle sénégalaise'),
        'C', "Le 4 avril 1960 est la date à laquelle le Sénégal (alors dans la Fédération du Mali avec le Soudan français) proclame son indépendance vis-à-vis de la France. La Fédération du Mali se dissout le 20 août 1960, mais c'est le 4 avril qui est célébré comme fête nationale.", 3),
    ],
  },
  {
    title: "Histoire – Relations internationales : Guerre Froide et monde bipolaire (1947-1991)",
    order_index: 2,
    summary: "Formation des deux blocs, crises majeures (Berlin, Cuba), course aux armements, détente, effondrement du bloc soviétique.",
    key_formulas: [
      "Guerre froide : affrontement idéologique USA-URSS sans conflit armé direct (1947-1991).",
      "Plan Marshall (1947) : aide économique américaine à l'Europe occidentale.",
      "OTAN (1949) : alliance militaire atlantique. Pacte de Varsovie (1955) : bloc soviétique.",
      "Crise des missiles de Cuba (1962) : moment le plus dangereux de la Guerre froide.",
      "Chute du mur de Berlin : 9 novembre 1989.",
    ],
    course_content: `# La Guerre Froide et le monde bipolaire

## 1. Origines et formation des blocs (1947-1949)
**Discours de Fulton** (Churchill, 1946) : dénonce le "rideau de fer" séparant l'Europe.
**Doctrine Truman** (1947) : les USA s'engagent à contenir l'expansion soviétique.
**Plan Marshall** (1947) : aide économique américaine à l'Europe pour empêcher la progression communiste.

**Deux blocs** :
- Bloc occidental : USA, OTAN (1949), économie de marché, démocratie libérale.
- Bloc soviétique : URSS, Pacte de Varsovie (1955), économie planifiée, régime communiste.

## 2. Les crises majeures
- **Blocus de Berlin** (1948-1949) : l'URSS bloque les accès à Berlin-Ouest. Pont aérien allié.
- **Guerre de Corée** (1950-1953) : premier conflit armé indirect entre blocs.
- **Crise des missiles de Cuba** (octobre 1962) : l'URSS installe des missiles à Cuba. Négociation Kennedy-Khrouchtchev. Risque nucléaire maximal.

## 3. La détente et la fin de la Guerre froide
- **Accords SALT** (1972) : limitation des armements stratégiques.
- **Accords d'Helsinki** (1975) : coopération et droits de l'homme.
- **Chute du mur de Berlin** (9 novembre 1989) : symbole de la fin de la division.
- **Dissolution de l'URSS** (décembre 1991) : fin officielle de la Guerre froide.`,
    exercises: [
      ex('Doctrine Truman',
        'La doctrine Truman (1947) visait à :',
        opt('Reconstruire l\'Europe dévastée par la guerre', 'Contenir l\'expansion du communisme soviétique', 'Créer une alliance militaire atlantique', 'Soutenir la décolonisation en Asie'),
        'B', "La doctrine Truman (mars 1947) engage les États-Unis à soutenir tout peuple libre résistant à une subjugation par des minorités armées ou à des pressions extérieures. Elle vise à contenir (policy of containment) l'expansion soviétique.", 2),
      ex('Crise de Cuba',
        'La crise des missiles de Cuba (1962) oppose :',
        opt('La France et l\'Algérie', 'Les États-Unis et Cuba seuls', 'Les États-Unis (Kennedy) et l\'URSS (Khrouchtchev)', 'L\'OTAN et le Pacte de Varsovie lors d\'une guerre'),
        'C', "La crise des missiles de Cuba (octobre 1962) est un face-à-face entre Kennedy (USA) et Khrouchtchev (URSS) après la découverte de missiles soviétiques à Cuba. C'est le moment le plus dangereux de la Guerre froide, résolu par négociation.", 2),
      ex('Chute du mur de Berlin',
        'Le mur de Berlin tombe le :',
        opt('3 octobre 1990', '9 novembre 1989', '25 décembre 1991', '8 mai 1945'),
        'B', "Le mur de Berlin tombe le 9 novembre 1989 (réunification officielle de l'Allemagne : 3 octobre 1990). C'est le symbole de la fin de la Guerre froide et de l'effondrement du bloc soviétique en Europe.", 2),
      ex('Le Plan Marshall',
        'Le Plan Marshall (1947) consistait principalement en :',
        opt('Un plan militaire d\'intervention américaine en Europe', 'Une aide économique américaine à la reconstruction de l\'Europe occidentale', 'La création de l\'OTAN', 'Un accord de désarmement nucléaire USA-URSS'),
        'B', "Le Plan Marshall (European Recovery Program, 1947-1952) est un programme d'aide économique américaine de 13 milliards de dollars destiné à la reconstruction de l'Europe occidentale dévastée par la guerre. Il visait aussi à endiguer l'influence communiste dans des économies affaiblies.", 2),
      ex('La course aux armements',
        'Le premier satellite artificiel mis en orbite, Spoutnik 1, est lancé par quel pays en 1957 ?',
        opt('Les États-Unis', 'L\'URSS', 'La France', 'La Chine'),
        'B', "Spoutnik 1 (4 octobre 1957) est le premier satellite artificiel, lancé par l'URSS. Cet événement marque le début de la 'course à l'espace' et choque l'Occident en démontrant la supériorité technologique soviétique à ce moment-là. Les USA lanceront Explorer 1 en janvier 1958.", 2),
    ],
  },
  {
    title: "Géographie – Le monde contemporain : développement et inégalités",
    order_index: 3,
    summary: "Indicateurs de développement (IDH, PIB), pays développés et en développement, mondialisation, défis environnementaux, place de l'Afrique.",
    key_formulas: [
      "IDH (Indice de Développement Humain) : combine espérance de vie, éducation, revenu.",
      "PIB : Produit Intérieur Brut – valeur totale de la production d'un pays sur un an.",
      "Mondialisation : intensification des échanges économiques, culturels et humains.",
      "Développement durable : répondre aux besoins présents sans compromettre les générations futures.",
      "Pays du Nord / Pays du Sud : distinction géopolitique basée sur le niveau de développement.",
    ],
    course_content: `# Le monde contemporain

## 1. Mesurer le développement
**PIB (Produit Intérieur Brut)** : indicateur économique de richesse produite, mais ne mesure pas le bien-être.

**IDH (Indice de Développement Humain)** : créé par le PNUD (1990). Combine :
- Espérance de vie à la naissance.
- Niveau d'éducation (durée moyenne de scolarisation).
- Revenu national brut par habitant.

## 2. Un monde inégal
- **Pays développés** (Nord) : IDH élevé, économies de services, urbanisation avancée.
- **Pays en développement** (Sud) : IDH faible à moyen, économies agricoles et extractives.
- **Pays émergents** : BRICS (Brésil, Russie, Inde, Chine, Afrique du Sud) – croissance rapide.

## 3. La mondialisation
Processus d'intensification des échanges (marchandises, capitaux, personnes, informations).
- **Centres** de la mondialisation : États-Unis, Europe, Asie du Pacifique (triade).
- **Inégalités** : fracture numérique, dette des pays du Sud, termes de l'échange défavorables.

## 4. L'Afrique dans le monde
- Continent le plus jeune (âge médian ~19 ans), fort taux de croissance démographique.
- Ressources naturelles considérables (pétrole, minerais, terres agricoles).
- Défis : pauvreté, conflits, migrations, changement climatique.
- **Le Sénégal** : démocratie stable, économie en croissance, émergence pétrolière et gazière.`,
    exercises: [
      ex('L\'IDH',
        'L\'Indice de Développement Humain (IDH) combine :',
        opt('PIB, exportations et taux d\'alphabétisation', 'Espérance de vie, éducation et revenu par habitant', 'Population, superficie et ressources naturelles', 'Taux de chômage, inflation et croissance économique'),
        'B', "L'IDH, créé par le PNUD en 1990, est un indice composite qui mesure le développement humain à travers trois dimensions : santé (espérance de vie), éducation (durée de scolarisation) et niveau de vie (revenu national brut par habitant).", 2),
      ex('La mondialisation',
        'Les trois pôles (triade) de la mondialisation économique sont :',
        opt('Chine, Inde et Brésil', 'États-Unis, Europe occidentale et Asie du Pacifique', 'Afrique, Amérique latine et Asie du Sud', 'OCDE, G7 et BRICS'),
        'B', "La triade désigne les trois grands centres de l'économie mondiale : les États-Unis (et Amérique du Nord), l'Europe occidentale, et l'Asie du Pacifique (Japon, Chine, Corée du Sud, etc.). Ces trois pôles concentrent l'essentiel des échanges et des investissements mondiaux.", 3),
      ex('Développement durable',
        'La définition du développement durable implique de répondre aux besoins présents :',
        opt('En maximisant la croissance économique', 'Sans compromettre la capacité des générations futures à répondre aux leurs', 'En priorité pour les pays développés', 'En exploitant pleinement les ressources naturelles disponibles'),
        'B', "Le développement durable est défini par le rapport Brundtland (1987) comme un développement qui 'répond aux besoins du présent sans compromettre la capacité des générations futures à répondre à leurs propres besoins'. Il articule développement économique, équité sociale et protection de l'environnement.", 2),
      ex('Les BRICS',
        'Parmi les pays suivants, lequel fait partie des BRICS ?',
        opt('Mexique', 'Turquie', 'Inde', 'Nigéria'),
        'C', "Les BRICS regroupent : Brésil, Russie, Inde, Chine et Afrique du Sud. Ce sont des pays émergents à fort potentiel économique. En 2024, de nouveaux membres ont rejoint le groupe (Éthiopie, Iran, Arabie Saoudite, etc.), mais les 5 membres fondateurs restent les plus emblématiques.", 2),
      ex('Changement climatique et Afrique',
        'L\'Accord de Paris sur le climat (2015) vise à :',
        opt('Interdire les énergies fossiles dans les pays développés', 'Limiter le réchauffement climatique à 1,5-2°C par rapport aux niveaux préindustriels', 'Créer un fonds commun pour acheter des terres agricoles', 'Geler la déforestation en Amazonie uniquement'),
        'B', "L'Accord de Paris (COP21, décembre 2015) est un traité international signé par presque tous les pays. Il vise à limiter le réchauffement climatique à bien moins de 2°C, et idéalement 1,5°C, par rapport aux niveaux préindustriels, en réduisant les émissions de gaz à effet de serre.", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// SVT – Programme Terminale (L2 / L1 approx.) – Office du Baccalauréat SN
// ══════════════════════════════════════════════════════════════════════════════
const SVT_L_CHAPTERS = [
  {
    title: "Relations organisme/milieu – Système nerveux et pression artérielle",
    order_index: 1,
    summary: "Organisation du système nerveux cérébro-spinal, structure de l'encéphale et de la moelle épinière, régulation de la pression artérielle.",
    key_formulas: [
      "Encéphale : cerveau + cervelet + tronc cérébral ; protégé par la boîte crânienne et les méninges.",
      "Moelle épinière : substance grise centrale (en H), substance blanche périphérique.",
      "Pression artérielle = force exercée par le sang sur les parois des artères.",
      "Régulation nerveuse : barorécepteurs → centre bulbaire → nerfs → cœur et vaisseaux.",
      "Régulation hormonale de la PA : adrénaline (augmente PA), ADH.",
    ],
    course_content: `# Système nerveux et pression artérielle

## 1. Organisation de l'encéphale
L'encéphale comprend :
- **Le cerveau** : deux hémisphères, siège des fonctions supérieures (mémoire, langage, pensée).
- **Le cervelet** : coordination des mouvements et équilibre.
- **Le tronc cérébral** : régulation des fonctions végétatives (respiration, rythme cardiaque).

**Protection** : boîte crânienne (os), méninges (3 enveloppes), liquide céphalorachidien (LCR).

## 2. La moelle épinière
Contenue dans le canal vertébral (colonne vertébrale + méninges + LCR).
- **Substance grise** (en H) : corps cellulaires des neurones.
- **Substance blanche** (périphérique) : axones myélinisés.
- Émet les **nerfs rachidiens** (31 paires).

## 3. Régulation de la pression artérielle
**PA = Débit cardiaque × Résistances périphériques**

**Régulation nerveuse** :
1. Les **barorécepteurs** (aorte, sinus carotidien) détectent les variations de PA.
2. Message nerveux → **centre bulbaire**.
3. Réponse via le système nerveux autonome (sympathique/parasympathique).

**Régulation hormonale** : adrénaline (médullosurrénale) augmente la PA ; ADH (hypothalamus) favorise la rétention d'eau.

**Hypertension artérielle** : PA > 140/90 mmHg. Facteurs de risque : alimentation, sédentarité, stress, hérédité.`,
    exercises: [
      ex('Structure de l\'encéphale',
        'Quel organe de l\'encéphale assure la coordination des mouvements et l\'équilibre ?',
        opt('Le cerveau', 'Le cervelet', 'Le tronc cérébral', 'Le bulbe rachidien'),
        'B', "Le cervelet assure la coordination des mouvements volontaires et l'équilibre. Une atteinte du cervelet provoque une ataxie (démarche instable, mouvements maladroits).", 2),
      ex('Moelle épinière',
        'Dans la moelle épinière, la substance grise est caractérisée par :',
        opt('Sa position périphérique et ses axones myélinisés', 'Sa position centrale en forme de H et les corps cellulaires des neurones', 'Sa couleur blanchâtre due à la myéline', 'Ses connexions directes avec l\'encéphale uniquement'),
        'B', "La substance grise de la moelle épinière est située en position centrale (forme de H ou de papillon). Elle contient les corps cellulaires (péricaryon) des neurones et les synapses. La substance blanche, riche en axones myélinisés, est périphérique.", 3),
      ex('Régulation de la PA',
        'Les barorécepteurs jouent un rôle dans la régulation de la pression artérielle en :',
        opt('Produisant de l\'adrénaline', 'Détectant les variations de pression et envoyant des signaux au centre bulbaire', 'Contractant directement les muscles cardiaques', 'Filtrant le sang dans les reins'),
        'B', "Les barorécepteurs sont des mécanorécepteurs situés dans la paroi de l'aorte et du sinus carotidien. Ils détectent les variations de pression artérielle et envoient des influx nerveux au centre cardio-vasculaire bulbaire qui ajuste le rythme cardiaque et le tonus vasculaire.", 3),
      ex('Rôle du cervelet',
        'Une personne dont le cervelet est lésé présentera des troubles principalement de :',
        opt('La mémoire et du langage', 'La vision et de l\'ouïe', 'La coordination motrice et de l\'équilibre', 'La régulation de la glycémie'),
        'C', "Le cervelet coordonne les mouvements volontaires et maintient l'équilibre. Une atteinte cérébellaire provoque une ataxie (démarche ébrieuse, mouvements désordonnés) et une dysarthrie (troubles de l'articulation). La mémoire et le langage dépendent du cortex cérébral.", 2),
      ex('Hypertension artérielle',
        'Une pression artérielle de 160/100 mmHg est considérée comme :',
        opt('Normale', 'Hypotension légère', 'Hypertension artérielle', 'Pression artérielle optimale'),
        'C', "La pression artérielle normale est inférieure à 120/80 mmHg. Une PA ≥ 140/90 mmHg définit l'hypertension artérielle. 160/100 mmHg indique une hypertension grade 2 (modérée à sévère), nécessitant un traitement médical.", 2),
    ],
  },
  {
    title: "Intégrité de l'organisme – Glycémie et Immunologie",
    order_index: 2,
    summary: "Régulation de la glycémie (insuline, glucagon, diabète), réponse immunitaire (non spécifique et spécifique, immunité humorale et cellulaire, VIH/SIDA).",
    key_formulas: [
      "Glycémie normale : 0,8 à 1,2 g/L de sang.",
      "Insuline (pancréas, cellules β) : hormone hypoglycémiante.",
      "Glucagon (pancréas, cellules α) : hormone hyperglycémiante.",
      "Diabète type 1 : absence d'insuline (destruction cellules β). Type 2 : résistance à l'insuline.",
      "Anticorps : protéines produites par les lymphocytes B contre un antigène spécifique.",
    ],
    course_content: `# Glycémie et Immunologie

## 1. Régulation de la glycémie
La **glycémie** est le taux de glucose dans le sang (valeur normale : 0,8–1,2 g/L).

**Système hypoglycémiant** :
- Après un repas : la glycémie augmente.
- Les cellules **β** des îlots de Langerhans (pancréas) secrètent l'**insuline**.
- L'insuline favorise l'entrée du glucose dans les cellules (muscles, foie) et la synthèse de glycogène.

**Système hyperglycémiant** :
- En jeûne : glycémie diminue.
- Les cellules **α** secrètent le **glucagon**, qui stimule la glycogénolyse (décomposition du glycogène en glucose).

**Diabète sucré** :
- Type 1 (insulinodépendant) : destruction auto-immune des cellules β.
- Type 2 : résistance à l'insuline (souvent lié à l'obésité).

## 2. La réponse immunitaire
**Non spécifique** : réaction inflammatoire, phagocytose (macrophages, neutrophiles).

**Spécifique** :
- **Immunité humorale** : lymphocytes B → plasmocytes → anticorps (immunoglobulines).
- **Immunité cellulaire** : lymphocytes T cytotoxiques détruisent les cellules infectées.
- **Mémoire immunitaire** : lymphocytes mémoire → réponse plus rapide lors d'un 2e contact.

## 3. VIH/SIDA
- **VIH** : virus à ARN, cible les **lymphocytes T4 (CD4+)**.
- Cycle : fixation → pénétration → transcription inverse → intégration → multiplication.
- **SIDA** : stade avancé de l'infection (CD4 < 200/mm³) ; infections opportunistes.
- **Transmission** : sang, rapports sexuels, mère-enfant.`,
    exercises: [
      ex('Glycémie normale',
        'La glycémie normale à jeun chez un adulte est de :',
        opt('0,4 à 0,6 g/L', '0,8 à 1,2 g/L', '1,5 à 2,0 g/L', '2,0 à 3,0 g/L'),
        'B', "La glycémie normale à jeun est comprise entre 0,8 et 1,2 g/L de sang (soit environ 4,4 à 6,6 mmol/L). En dessous de 0,7 g/L : hypoglycémie. Au-dessus de 1,26 g/L à jeun (confirmé) : diabète.", 2),
      ex('Rôle de l\'insuline',
        'L\'insuline est une hormone hypoglycémiante produite par :',
        opt('Les cellules α des îlots de Langerhans', 'Les cellules β des îlots de Langerhans', 'Le foie', 'Les glandes surrénales'),
        'B', "L'insuline est produite par les cellules β (bêta) des îlots de Langerhans du pancréas. Elle est libérée en réponse à une hyperglycémie et facilite la captation du glucose par les cellules, réduisant ainsi la glycémie.", 2),
      ex('Immunité humorale',
        'L\'immunité humorale implique principalement :',
        opt('Les lymphocytes T cytotoxiques', 'Les macrophages et la phagocytose', 'Les lymphocytes B et la production d\'anticorps', 'Les cellules NK (Natural Killer)'),
        'C', "L'immunité humorale (immunité à médiation humorale) repose sur les lymphocytes B qui se différencient en plasmocytes et sécrètent des anticorps (immunoglobulines) spécifiques de l'antigène reconnu.", 2),
      ex('VIH et cellules cibles',
        'Le VIH cible préférentiellement :',
        opt('Les hématies (globules rouges)', 'Les plaquettes sanguines', 'Les lymphocytes T4 (CD4+)', 'Les cellules musculaires'),
        'C', "Le VIH (Virus de l'Immunodéficience Humaine) infecte préférentiellement les lymphocytes T auxiliaires (T4 ou CD4+), qui coordonnent la réponse immunitaire. La destruction progressive de ces cellules conduit à l'immunodéficience caractéristique du SIDA.", 2),
      ex('Diabète de type 1',
        'Le diabète de type 1 se caractérise par :',
        opt('Une résistance des cellules à l\'insuline', 'Une destruction auto-immune des cellules β du pancréas entraînant un déficit en insuline', 'Une surproduction de glucagon par le pancréas', 'Un excès de sucre dans l\'alimentation uniquement'),
        'B', "Dans le diabète de type 1 (insulinodépendant), le système immunitaire détruit par erreur les cellules β des îlots de Langerhans. Sans insuline, le glucose ne peut entrer dans les cellules, la glycémie s'élève (hyperglycémie) et des complications graves apparaissent. Il nécessite des injections d'insuline.", 2),
      ex('Vaccination et mémoire immunitaire',
        'L\'efficacité d\'un vaccin repose sur :',
        opt('La destruction directe des agents pathogènes par le vaccin', 'La création de lymphocytes mémoire spécifiques qui permettent une réponse plus rapide lors d\'un contact ultérieur', 'L\'augmentation permanente du nombre de globules blancs', 'L\'immunité passive transmise par les anticorps du vaccin'),
        'B', "Un vaccin contient des antigènes (virus atténués, protéines virales, etc.) qui déclenchent une réponse immunitaire et la formation de lymphocytes mémoire (B et T). Lors d'une véritable infection, ces cellules mémoire permettent une réponse immunitaire secondaire rapide et efficace.", 3),
    ],
  },
  {
    title: "Reproduction et Hérédité",
    order_index: 3,
    summary: "Gamétogenèse (spermatogenèse, ovogenèse), méiose, fécondation, régulation hormonale des cycles, génétique et hérédité humaine.",
    key_formulas: [
      "Méiose : 2 divisions cellulaires successives → 4 cellules haploïdes (n chromosomes).",
      "Brassage chromosomique : interchromosomal (métaphase I) + intrachromosomal (crossing-over).",
      "Fécondation : fusion spermatozoïde + ovule → zygote diploïde (2n).",
      "Groupes sanguins ABO : déterminés par 3 allèles IA, IB, i.",
      "Hérédité liée au sexe : gènes portés sur le chromosome X (ex : daltonisme, hémophilie).",
    ],
    course_content: `# Reproduction et Hérédité

## 1. La gamétogenèse
**Spermatogenèse** (testicules) : production de spermatozoïdes (continue dès la puberté).
**Ovogenèse** (ovaires) : production d'ovules (cycles menstruels).

Les deux processus impliquent une **méiose** qui réduit le nombre de chromosomes de 2n à n.

## 2. La méiose
- **Division I** (réductionnelle) : séparation des chromosomes homologues → 2 cellules à n chromosomes.
- **Division II** (équationnelle) : séparation des chromatides → 4 cellules haploïdes.

**Brassage génétique** :
- **Interchromosomal** : assortiment indépendant des chromosomes à la métaphase I.
- **Intrachromosomal** (crossing-over) : échanges de segments entre chromosomes homologues à la prophase I.

## 3. La fécondation
Fusion du spermatozoïde et de l'ovule → **zygote** (2n chromosomes). Rétablissement de la diploïdie.
**Monospermie** : un seul spermatozoïde pénètre l'ovule (réaction corticale).

## 4. Hérédité humaine
**Groupes sanguins ABO** : 3 allèles (IA, IB, i). IA et IB codominants, i récessif.
| Génotype | Groupe sanguin |
|----------|----------------|
| IAIA ou IAi | A |
| IBIB ou IBi | B |
| IAIB | AB |
| ii | O |

**Facteur Rhésus** : Rh+ dominant sur Rh-.
**Albinisme** : autosomal récessif.`,
    exercises: [
      ex('La méiose',
        'La méiose produit des cellules :',
        opt('Diploïdes identiques à la cellule mère', 'Haploïdes génétiquement diverses', 'Diploïdes génétiquement diverses', 'Haploïdes identiques à la cellule mère'),
        'B', "La méiose est une double division cellulaire qui produit 4 cellules haploïdes (n chromosomes) à partir d'une cellule diploïde (2n). Les cellules filles sont génétiquement diverses grâce aux brassages (crossing-over et assortiment indépendant).", 2),
      ex('Groupe sanguin AB',
        'Un individu de groupe sanguin AB a le génotype :',
        opt('IAIA', 'IAi', 'IAIB', 'IBi'),
        'C', "Le groupe AB résulte de la codominance des allèles IA et IB. L'individu AB possède les deux antigènes A et B sur ses hématies. Son génotype est obligatoirement IAIB.", 2),
      ex('Brassage intrachromosomal',
        'Le brassage intrachromosomal (crossing-over) se produit lors de :',
        opt('La métaphase I', 'La prophase I', 'La métaphase II', 'La télophase II'),
        'B', "Les crossing-over (enjambements) se produisent lors de la prophase I de la méiose, au stade pachytène, quand les chromosomes homologues sont étroitement appariés (synapsis). Des échanges de segments entre chromatides non-sœurs créent une diversité génétique.", 3),
      ex('Hérédité liée au sexe – daltonisme',
        'Une femme daltonienne (xᵈxᵈ) et un homme normal (X Y). Parmi leurs enfants, les garçons seront :',
        opt('Tous normaux', 'Tous daltoniens', '50 % daltoniens', 'Aucun daltonien'),
        'B', "La mère daltonienne a le génotype xᵈxᵈ. Elle transmet obligatoirement xᵈ à tous ses fils. Le père transmet son chromosome Y aux fils. Les fils ont donc tous le génotype xᵈY : ils sont tous daltoniens. Les filles reçoivent xᵈ de la mère et X du père : XDxᵈ, toutes conductrices.", 3),
      ex('Fécondation et restauration de la diploïdie',
        'La fécondation restaure la diploïdie (2n chromosomes) car :',
        opt('Les chromosomes se dupliquent lors de la fusion des gamètes', 'Un gamète haploïde (n) s\'unit à un autre gamète haploïde (n) pour former un zygote diploïde (2n)', 'La méiose produit des cellules diploïdes', 'Les chromosomes supplémentaires sont éliminés après la fécondation'),
        'B', "La méiose réduit le nombre de chromosomes de 2n à n dans chaque gamète. La fécondation réunit un spermatozoïde (n) et un ovule (n) : le zygote résultant contient 2n chromosomes (restauration de la diploïdie). Chez l'humain : 23 + 23 = 46 chromosomes.", 2),
      ex('Albinisme – hérédité autosomale récessive',
        'L\'albinisme est une maladie autosomale récessive. Deux parents porteurs sains (Aa × Aa) ont une probabilité de __ d\'avoir un enfant albinos.',
        opt('0 %', '25 %', '50 %', '100 %'),
        'B', "Les parents Aa × Aa donnent : AA (1/4), Aa (2/4), aa (1/4). Un enfant aa (homozygote récessif) est albinos. La probabilité est donc 1/4 = 25 %. Les porteurs Aa sont phénotypiquement normaux mais transmettent l'allèle récessif.", 2),
      ex('Groupes sanguins – transfusion',
        'Un individu du groupe O peut donner son sang à :',
        opt('Uniquement aux personnes du groupe O', 'Toutes les personnes, car O est le donneur universel', 'Uniquement aux groupes A et O', 'Uniquement au groupe AB'),
        'B', "Le groupe O (génotype ii) ne présente ni l'antigène A ni l'antigène B sur les hématies. Les personnes O peuvent donc donner à tous les groupes (A, B, AB, O) sans déclencher de réaction antigène-anticorps. Le groupe AB est le receveur universel.", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// SVT S1 – Programme enrichi (9 thèmes, tissu nerveux + génétique)
// ══════════════════════════════════════════════════════════════════════════════
const SVT_S1_CHAPTERS = [
  ...SVT_L_CHAPTERS.map((ch, i) => ({ ...ch, order_index: i + 1 })),
  {
    title: "Tissu nerveux et influx nerveux",
    order_index: 4,
    summary: "Structure du neurone, potentiel d'action, conduction et transmission synaptique de l'influx nerveux.",
    key_formulas: [
      "Potentiel de repos : -70 mV (intérieur cellulaire négatif).",
      "Potentiel d'action : dépolarisation (entrée Na+) → repolarisation (sortie K+).",
      "Loi du tout ou rien : l'influx nerveux est déclenché si le seuil d'excitation est atteint.",
      "Synapse chimique : neurotransmetteur libéré dans la fente synaptique.",
      "Vitesse de conduction : plus rapide si axone myélinisé (conduction saltatoire).",
    ],
    course_content: `# Tissu nerveux et influx nerveux

## 1. Le neurone
**Structure** :
- **Corps cellulaire** (péricaryon) : noyau + organes cellulaires.
- **Dendrites** : prolongements courts qui reçoivent les informations.
- **Axone** : prolongement long qui transmet l'influx nerveux. Peut être myélinisé (gaine de myéline).

## 2. Le potentiel d'action
**Potentiel de repos** : -70 mV (membrane polarisée, K+ intracellulaire, Na+ extracellulaire).

**Potentiel d'action** :
1. **Dépolarisation** : ouverture des canaux Na+ → entrée massive de Na+ → potentiel monte jusqu'à +30 mV.
2. **Repolarisation** : fermeture des canaux Na+, ouverture des canaux K+ → sortie de K+ → retour au potentiel de repos.

**Loi du tout ou rien** : si le stimulus dépasse le seuil, un potentiel d'action de même amplitude est déclenché.

## 3. La transmission synaptique
- Le potentiel d'action arrive au **bouton synaptique**.
- Les **vésicules synaptiques** libèrent le **neurotransmetteur** dans la fente synaptique.
- Le neurotransmetteur se fixe sur les **récepteurs** de la membrane postsynaptique.
- Excitation (ex : acétylcholine) ou inhibition (ex : GABA) de la cellule postsynaptique.`,
    exercises: [
      ex('Potentiel d\'action',
        'Lors d\'un potentiel d\'action, la dépolarisation est due à :',
        opt('Une sortie massive d\'ions Na+', 'Une entrée massive d\'ions Na+', 'Une entrée massive d\'ions K+', 'Une sortie massive d\'ions Ca2+'),
        'B', "La phase de dépolarisation d'un potentiel d'action est due à l'ouverture des canaux Na+ voltage-dépendants, permettant une entrée massive d'ions sodium (Na+) dans le neurone. Le potentiel passe de -70 mV à environ +30 mV.", 3),
      ex('Loi du tout ou rien',
        'La loi du "tout ou rien" signifie que :',
        opt('L\'influx nerveux s\'arrête en cas d\'obstacle', 'Si le seuil est atteint, le potentiel d\'action a toujours la même amplitude', 'Plus le stimulus est fort, plus l\'influx est rapide', 'L\'influx ne peut aller que dans un sens'),
        'B', "La loi du tout ou rien stipule que si le stimulus atteint le seuil d'excitation, un potentiel d'action se déclenche avec une amplitude maximale constante. En dessous du seuil : rien. Au-dessus du seuil : l'amplitude reste identique (ne varie pas avec l'intensité du stimulus).", 3),
      ex('La synapse chimique',
        'Dans une synapse chimique, la transmission du signal implique :',
        opt('La diffusion directe d\'ions entre deux neurones', 'La libération de neurotransmetteurs dans la fente synaptique', 'La fusion des membranes pré- et post-synaptique', 'La propagation électrique directe'),
        'B', "Dans une synapse chimique, l'influx nerveux déclenche la libération de neurotransmetteurs (stockés dans des vésicules) dans la fente synaptique. Ces molécules se fixent sur des récepteurs spécifiques de la membrane postsynaptique, transmettant le signal.", 2),
      ex('Myélinisation et vitesse de conduction',
        'La conduction saltatoire dans les fibres myélinisées est plus rapide car :',
        opt('L\'axone est plus long', 'L\'influx saute de nœud de Ranvier en nœud de Ranvier, diminuant la distance à dépolariser', 'Les ions Na+ sont plus concentrés dans les fibres myélinisées', 'La gaine de myéline produit de l\'énergie supplémentaire'),
        'B', "Dans les fibres myélinisées, la gaine de myéline isole l'axone sauf aux nœuds de Ranvier. Le potentiel d'action 'saute' de nœud en nœud (conduction saltatoire), ce qui est beaucoup plus rapide (jusqu'à 120 m/s) que dans les fibres non myélinisées (1-2 m/s) et économise de l'énergie.", 3),
      ex('Potentiel de repos',
        'Le potentiel de repos (-70 mV) d\'un neurone est maintenu principalement par :',
        opt('L\'entrée permanente d\'ions Na+ dans la cellule', 'La pompe Na+/K+ ATPase qui expulse 3 Na+ pour 2 K+ entrants', 'La gaine de myéline qui isole la membrane', 'La présence d\'ions Ca2+ extracellulaires'),
        'B', "Le potentiel de repos est maintenu par la pompe Na+/K+ATPase (consommatrice d'ATP) qui expulse 3 Na+ vers l'extérieur et fait entrer 2 K+, maintenant une concentration élevée de K+ à l'intérieur et de Na+ à l'extérieur. Les canaux K+ de fuite maintiennent aussi le potentiel négatif.", 3),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// SVT S2 – Programme le plus complet (biotechnologies incluses)
// ══════════════════════════════════════════════════════════════════════════════
const SVT_S2_CHAPTERS = [
  ...SVT_S1_CHAPTERS,
  {
    title: "Génétique et Biotechnologies",
    order_index: 5,
    summary: "Génétique mendélienne, lois de Mendel, hérédité liée au sexe, notion de biotechnologies (OGM, clonage, ADN recombinant).",
    key_formulas: [
      "1ère loi de Mendel (uniformité des hybrides F1) : tous les descendants de 2 parents purs sont identiques.",
      "2ème loi de Mendel (disjonction) : en F2, ratio phénotypique 3:1 (monohybridisme).",
      "Test cross : croisement avec un homozygote récessif pour déterminer le génotype.",
      "OGM : organisme dont le génome a été modifié par insertion d'un gène étranger.",
      "PCR : amplification d'un fragment d'ADN in vitro.",
    ],
    course_content: `# Génétique et Biotechnologies

## 1. Les lois de Mendel
**Expérience** : Mendel travaille sur des pois (*Pisum sativum*) et étudie des caractères contrastés.

**1ère loi** (uniformité des hybrides F1) : Quand on croise deux parents homozygotes pour deux allèles différents, tous les individus F1 sont identiques (hétérozygotes). L'allèle dominant s'exprime.

**2ème loi** (disjonction des allèles) : En F2, les allèles se séparent et donnent un ratio **3:1** (phénotypiques) et **1:2:1** (génotypiques).

**Test cross** : croisement d'un individu de phénotype dominant avec un homozygote récessif. Si descendants 1:1, l'individu est hétérozygote.

## 2. Hérédité liée au sexe
Gènes portés sur le **chromosome X** (hémizygotie chez l'homme XY).
- **Daltonisme** (gène récessif lié à X) : plus fréquent chez l'homme.
- **Hémophilie** A et B : maladies hémorragiques récessives liées à X.

## 3. Biotechnologies
- **OGM** : introduction d'un gène étranger via plasmide bactérien ou vecteur viral.
- **Clonage** : reproduction d'un organisme génétiquement identique (ex : brebis Dolly, 1996).
- **PCR** (Polymerase Chain Reaction) : amplification in vitro d'un fragment d'ADN.
- **Applications** : médicaments (insuline humaine par bactéries OGM), agriculture, médecine légale.`,
    exercises: [
      ex('Ratio F2 en monohybridisme',
        'Lors d\'un croisement en F2 (monohybridisme), le ratio phénotypique attendu est :',
        opt('1:1', '1:2:1', '3:1', '9:3:3:1'),
        'C', "En F2 d'un croisement monohybride (Aa × Aa), on obtient 3/4 de phénotype dominant pour 1/4 de phénotype récessif = ratio 3:1. Le ratio génotypique est 1 AA : 2 Aa : 1 aa (soit 1:2:1).", 2),
      ex('Hérédité liée au sexe',
        'Le daltonisme est une maladie récessive liée à l\'X. Un homme daltonien a le génotype :',
        opt('XᵈXᵈ', 'XᵈY', 'XᴰXᵈ', 'XᴰY'),
        'B', "L'homme (XY) est hémizygote pour les gènes portés sur le chromosome X. Un homme daltonien possède l'allèle récessif xᵈ sur son unique chromosome X : génotype xᵈY. Chez la femme (XX), le daltonisme nécessite deux copies de l'allèle récessif (xᵈxᵈ).", 3),
      ex('Les OGM',
        'Un OGM (Organisme Génétiquement Modifié) est un organisme dont :',
        opt('Le phénotype a été modifié par l\'environnement', 'Le génome a été modifié par insertion d\'un gène étranger', 'La croissance a été accélérée par des hormones', 'La reproduction est artificielle'),
        'B', "Un OGM est un organisme dont le matériel génétique (ADN) a été modifié par insertion, délétion ou modification d'un ou plusieurs gènes, notamment via l'introduction d'un gène étranger (transgène) à l'aide de vecteurs (plasmides, virus).", 2),
      ex('Test cross (croisement-test)',
        'Un individu de phénotype dominant est croisé avec un homozygote récessif. Le résultat est 50 % phénotype dominant et 50 % phénotype récessif. L\'individu testé est donc :',
        opt('Homozygote dominant (AA)', 'Hétérozygote (Aa)', 'Homozygote récessif (aa)', 'On ne peut pas conclure'),
        'B', "Le test cross croise l'individu à tester avec un homozygote récessif (aa). Si le résultat est 1:1 (50 % dominant, 50 % récessif), l'individu est hétérozygote Aa (Aa × aa → 1/2 Aa + 1/2 aa). Si 100 % dominant, il est homozygote AA.", 3),
      ex('La PCR',
        'La PCR (Polymerase Chain Reaction) est une technique qui permet de :',
        opt('Séquencer l\'ADN d\'un organisme entier', 'Amplifier exponentiellement un fragment d\'ADN spécifique in vitro', 'Introduire un gène dans le génome d\'un organisme hôte', 'Observer les chromosomes au microscope'),
        'B', "La PCR (Polymerase Chain Reaction) permet d'amplifier un fragment d'ADN spécifique des millions de fois à partir d'une quantité infime. Elle utilise des amorces spécifiques, une ADN polymérase thermostable (Taq polymérase) et des cycles de dénaturation/hybridation/élongation.", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// SCIENCES PHYSIQUES – Programme Terminale S1 et S2 (7h/semaine)
// ══════════════════════════════════════════════════════════════════════════════
const PHY_S_CHAPTERS = [
  {
    title: "Mécanique – Cinématique, Dynamique et Gravitation universelle",
    order_index: 1,
    summary: "Cinématique du point (référentiels, vecteurs position/vitesse/accélération), lois de Newton, applications (projectile, satellite), gravitation universelle.",
    key_formulas: [
      "Vecteur vitesse instantanée : v = dx/dt (dérivée du vecteur position).",
      "Relation fondamentale de la dynamique (2e loi de Newton) : ΣF = ma.",
      "Loi de gravitation universelle : F = G·M·m/d² (G = 6,67×10⁻¹¹ N·m²·kg⁻²).",
      "3e loi de Kepler : T²/R³ = constante (pour un même astre central).",
      "Vitesse de satellisation : v = √(GM/R).",
    ],
    course_content: `# Mécanique

## 1. Cinématique du point
**Vecteur position** : OM(t) dans un référentiel.
**Vecteur vitesse** : $\\vec{v} = \\frac{d\\overrightarrow{OM}}{dt}$
**Vecteur accélération** : $\\vec{a} = \\frac{d\\vec{v}}{dt}$

**Types de mouvements** :
- Rectiligne uniforme : v = constante, a = 0.
- Rectiligne uniformément varié : a = constante.
- Circulaire uniforme : |v| = constante, a centripète vers le centre.

## 2. Dynamique – Lois de Newton
- **1re loi (inertie)** : dans un référentiel galiléen, si ΣF = 0, alors a = 0 (repos ou MCU).
- **2e loi (RFD)** : $\\sum \\vec{F} = m\\vec{a}$
- **3e loi (action-réaction)** : FAB = -FBA.

**Applications** :
- Chute libre : a = g = 9,8 m·s⁻².
- Plan incliné, pendule conique, mouvement parabolique.

## 3. Gravitation universelle
$$F = G\\frac{Mm}{d^2}$$
G = 6,67×10⁻¹¹ N·m²·kg⁻².

**Satellite en orbite circulaire** :
- La gravitation fournit la force centripète.
- Vitesse de satellisation : $v = \\sqrt{\\frac{GM}{R}}$
- **3e loi de Kepler** : $\\frac{T^2}{R^3} = \\frac{4\\pi^2}{GM}$ = constante.`,
    exercises: [
      ex('Relation fondamentale de la dynamique',
        'Un objet de masse 5 kg est soumis à une force résultante de 20 N. Son accélération est :',
        opt('4 m·s⁻²', '100 m·s⁻²', '0,25 m·s⁻²', '25 m·s⁻²'),
        'A', "D'après la 2e loi de Newton : a = ΣF/m = 20/5 = 4 m·s⁻². La relation fondamentale de la dynamique ΣF = ma donne l'accélération en divisant la force résultante par la masse.", 2),
      ex('Loi de gravitation',
        'Si la distance entre deux masses est doublée, la force de gravitation entre elles :',
        opt('Double', 'Est divisée par 2', 'Est divisée par 4', 'Reste la même'),
        'C', "La loi de Newton : F = G·M·m/d². Si d devient 2d : F' = G·M·m/(2d)² = G·M·m/(4d²) = F/4. La force est donc divisée par 4 (relation inverse du carré de la distance).", 3),
      ex('3e loi de Kepler',
        'Pour deux satellites en orbite autour de la Terre, si R₂ = 4R₁, alors T₂/T₁ =',
        opt('2', '4', '8', '16'),
        'C', "3e loi de Kepler : T²/R³ = cte. Donc (T₂/T₁)² = (R₂/R₁)³ = (4)³ = 64. T₂/T₁ = √64 = 8. Le satellite plus éloigné met 8 fois plus de temps pour effectuer une révolution.", 4),
      ex('Mouvement parabolique',
        'Un projectile lancé horizontalement avec une vitesse v₀ depuis une hauteur h. Le mouvement horizontal est :',
        opt('Uniformément décéléré', 'Uniformément accéléré', 'Rectiligne uniforme (v₀ = constante)', 'Circulaire'),
        'C', "En l'absence de frottements, aucune force horizontale n'agit sur le projectile. Donc d'après la 1re loi de Newton, le mouvement horizontal est rectiligne et uniforme : vₓ = v₀ = constante. Seul le mouvement vertical est accéléré (g).", 2),
      ex('Chute libre',
        'Un objet lâché sans vitesse initiale depuis une hauteur h = 80 m. La durée de chute est (g = 10 m/s²) :',
        opt('4 s', '8 s', '40 s', '2 s'),
        'A', "Chute libre : h = ½ g t². Donc t = √(2h/g) = √(2×80/10) = √16 = 4 s. La vitesse au sol sera v = g×t = 10×4 = 40 m/s.", 2),
    ],
  },
  {
    title: "Électromagnétisme – Champs magnétiques, Induction et Oscillations",
    order_index: 2,
    summary: "Champs magnétiques des courants (Biot-Savart, loi d'Ampère), force de Laplace, induction électromagnétique, dipôles R-L et R-C, oscillations électriques.",
    key_formulas: [
      "Force de Laplace : F = I·L·B·sin(θ).",
      "Loi de Faraday : e = -dΦ/dt (force électromotrice d'induction).",
      "Loi de Lenz : le courant induit s'oppose à la variation du flux qui le crée.",
      "Équation du dipôle R-L : E = R·i + L·(di/dt).",
      "Période propre d'un oscillateur L-C : T₀ = 2π√(LC).",
    ],
    course_content: `# Électromagnétisme

## 1. Champs magnétiques
**Champ d'un fil rectiligne infini** : B = μ₀I/(2πd), lignes de champ circulaires.
**Champ d'un solénoïde** : B = μ₀nI (n = nombre de spires par unité de longueur).

## 2. Force de Laplace
Conducteur parcouru par un courant I dans un champ B :
$$F = BIL\\sin\theta$$
(θ = angle entre I et B ; F ⊥ au plan formé par I et B)

**Mouvement d'une particule chargée** dans B : force de Lorentz = qvB → mouvement circulaire uniforme.

## 3. Induction électromagnétique
**Loi de Faraday** : $e = -\\frac{d\\Phi}{dt}$ (Φ = flux magnétique, B·S·cos θ)
**Loi de Lenz** : le courant induit s'oppose à la cause qui lui donne naissance.

## 4. Dipôles et oscillations
**Dipôle R-L** : $E = Ri + L\\frac{di}{dt}$ (charge d'une bobine)
**Dipôle R-C** : $E = Ri + \\frac{q}{C}$ (charge d'un condensateur)

**Circuit L-C** (oscillations libres) :
$$T_0 = 2\\pi\\sqrt{LC}$$

**Oscillations forcées** : résonance quand la fréquence d'excitation = fréquence propre.`,
    exercises: [
      ex('Force de Laplace',
        'Un fil de longueur L = 0,5 m parcouru par I = 2 A est plongé dans un champ B = 0,1 T (perpendiculaire au fil). La force de Laplace est :',
        opt('0,01 N', '0,1 N', '1 N', '0,001 N'),
        'B', "F = BIL·sin90° = 0,1 × 2 × 0,5 × 1 = 0,1 N. Quand le fil est perpendiculaire au champ (θ = 90°, sin 90° = 1), la force est maximale.", 2),
      ex('Loi de Lenz',
        'La loi de Lenz stipule que le courant induit :',
        opt('Amplifie la variation du flux qui le crée', 'S\'oppose à la variation du flux qui lui donne naissance', 'Est proportionnel au flux magnétique', 'Est toujours dans le même sens que le champ inducteur'),
        'B', "La loi de Lenz est un principe de conservation de l'énergie appliqué à l'induction : le courant induit crée un champ magnétique qui s'oppose à la variation du flux inducteur (Faraday + Lenz). C'est pourquoi e = -dΦ/dt (signe négatif).", 3),
      ex('Oscillations L-C',
        'La période propre d\'un circuit L-C avec L = 0,1 H et C = 10 µF est :',
        opt('T₀ = 2π×10⁻³ s', 'T₀ = 2π×10⁻² s', 'T₀ = 2π×10⁻¹ s', 'T₀ = 2π s'),
        'A', "T₀ = 2π√(LC) = 2π√(0,1 × 10×10⁻⁶) = 2π√(10⁻⁶) = 2π × 10⁻³ s. Avec L = 0,1 H et C = 10 µF = 10⁻⁵ F : LC = 10⁻⁶, √(LC) = 10⁻³.", 4),
      ex('Champ magnétique d\'un solénoïde',
        'Un solénoïde de 200 spires sur 0,4 m parcouru par I = 2 A crée un champ B (µ₀ = 4π×10⁻⁷ T·m/A) :',
        opt('B = µ₀×2×A (formule directe)', 'B = µ₀ × n × I = 4π×10⁻⁷ × 500 × 2 ≈ 1,26×10⁻³ T', 'B = 0,1 T', 'B = µ₀I/(2π×0,4)'),
        'B', "n = N/l = 200/0,4 = 500 spires/m. B = µ₀nI = 4π×10⁻⁷ × 500 × 2 = 4π×10⁻⁴ ≈ 1,257×10⁻³ T ≈ 1,26 mT. Pour un solénoïde infini, le champ est uniforme à l'intérieur et vaut B = µ₀nI.", 3),
      ex('Loi de Faraday',
        'Un circuit est soumis à une variation de flux magnétique de ΔΦ = 0,05 Wb en Δt = 0,01 s. La FEM induite est :',
        opt('0,0005 V', '5 V', '0,5 V', '50 V'),
        'B', "FEM = -ΔΦ/Δt (loi de Faraday). |e| = 0,05/0,01 = 5 V. Le signe négatif (loi de Lenz) indique que la FEM s'oppose à la variation du flux, mais l'amplitude vaut 5 V.", 2),
    ],
  },
  {
    title: "Phénomènes ondulatoires et corpusculaires",
    order_index: 3,
    summary: "Interférences lumineuses, effet photoélectrique, niveaux d'énergie de l'atome, réactions nucléaires (fission, fusion, radioactivité).",
    key_formulas: [
      "Frange brillante (interférences) : δ = k·λ (k entier).",
      "Interfrange : i = λD/a (D=distance, a=distance entre sources).",
      "Énergie d'un photon : E = hν = hc/λ (h = 6,63×10⁻³⁴ J·s).",
      "Effet photoélectrique : Ec_max = hν - Ws (Ws = travail d'extraction).",
      "Désintégration radioactive : N(t) = N₀·e^(-λt) ; T₁/₂ = ln2/λ.",
    ],
    course_content: `# Phénomènes ondulatoires et corpusculaires

## 1. Interférences lumineuses
**Conditions** : deux sources cohérentes (même fréquence, différence de phase constante).

**Conditions d'interférence** :
- Frange **brillante** : δ = k·λ (k ∈ ℤ)
- Frange **obscure** : δ = (2k+1)·λ/2

**Interfrange** : $i = \\frac{\\lambda D}{a}$
(D = distance source-écran, a = distance entre les deux sources)

## 2. Effet photoélectrique
Einstein (1905) : la lumière est quantifiée en **photons** d'énergie E = hν.

$$E_c^{max} = h\\nu - W_s$$

(Ec_max = énergie cinétique max de l'électron éjecté, Ws = travail d'extraction)

**Dualité onde-corpuscule** : la lumière a à la fois des propriétés ondulatoires (interférences) et corpusculaires (effet photoélectrique).

## 3. Réactions nucléaires
**Radioactivité** : désintégration spontanée d'un noyau instable.
- α : émission d'un noyau He-4 (A-4, Z-2)
- β⁻ : émission d'un électron (A=cte, Z+1)
- γ : émission d'un photon (A=cte, Z=cte)

**Loi de désintégration** : $N(t) = N_0 e^{-\\lambda t}$, $T_{1/2} = \\frac{\\ln 2}{\\lambda}$

**Fission** : rupture d'un noyau lourd (ex : U-235 + n → Ba + Kr + 3n + énergie).
**Fusion** : union de noyaux légers (ex : D + T → He-4 + n + énergie).`,
    exercises: [
      ex('Interfrange',
        'Dans une expérience d\'Young avec λ = 600 nm, D = 1 m et a = 0,3 mm. L\'interfrange est :',
        opt('0,2 mm', '2 mm', '0,2 cm', '2 cm'),
        'B', "i = λD/a = (600×10⁻⁹ × 1) / (0,3×10⁻³) = 6×10⁻⁷ / 3×10⁻⁴ = 2×10⁻³ m = 2 mm.", 3),
      ex('Énergie d\'un photon',
        'L\'énergie d\'un photon de fréquence ν = 6×10¹⁴ Hz est (h = 6,63×10⁻³⁴ J·s) :',
        opt('3,98×10⁻¹⁹ J', '3,98×10⁻²⁰ J', '9,98×10⁻¹⁹ J', '1,1×10⁻⁴⁸ J'),
        'A', "E = hν = 6,63×10⁻³⁴ × 6×10¹⁴ = 39,78×10⁻²⁰ = 3,978×10⁻¹⁹ ≈ 3,98×10⁻¹⁹ J.", 3),
      ex('Désintégration radioactive',
        'Un échantillon de N₀ = 10⁶ noyaux a une demi-vie T½ = 10 ans. Après 30 ans, il reste :',
        opt('500 000 noyaux', '250 000 noyaux', '125 000 noyaux', '333 000 noyaux'),
        'C', "30 ans = 3 × T½. Après 1 demi-vie : N₀/2 = 5×10⁵. Après 2 : N₀/4 = 2,5×10⁵. Après 3 : N₀/8 = 10⁶/8 = 125 000 noyaux.", 2),
      ex('Type de désintégration alpha',
        'Lors d\'une désintégration alpha (α), le noyau émetteur voit son nombre de masse A et son numéro atomique Z évoluer de la façon suivante :',
        opt('A augmente de 4, Z augmente de 2', 'A diminue de 4, Z diminue de 2', 'A reste constant, Z augmente de 1', 'A diminue de 1, Z reste constant'),
        'B', "Une particule alpha est un noyau d'hélium ₂⁴He. Lors d'une désintégration α : A → A−4 et Z → Z−2. Exemple : ²³⁸U → ²³⁴Th + ₂⁴He.", 2),
      ex('Effet photoélectrique – seuil',
        'L\'effet photoélectrique ne se produit que si :',
        opt('L\'intensité lumineuse est suffisamment élevée', 'La fréquence de la lumière dépasse une fréquence seuil (ν₀ = Ws/h)', 'La lumière est polarisée', 'Le métal est chauffé au préalable'),
        'B', "L'effet photoélectrique (Einstein, 1905) montre que les électrons ne sont éjectés que si chaque photon a une énergie E = hν supérieure au travail d'extraction Ws du métal. En dessous de la fréquence seuil ν₀ = Ws/h, aucun électron n'est éjecté, même avec une lumière très intense.", 3),
      ex('Fission nucléaire',
        'Dans la réaction de fission ²³⁵U + n → ⁹⁰Kr + ¹⁴³Ba + ? n, le nombre de neutrons libérés est :',
        opt('1', '2', '3', '4'),
        'C', "Conservation du nombre de masse : 235 + 1 = 90 + 143 + x × 1. Donc x = 236 − 233 = 3. La fission de l'uranium-235 libère en moyenne 2 à 3 neutrons, permettant la réaction en chaîne exploitée dans les centrales nucléaires.", 3),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// CHIMIE – Programme Terminale S1 et S2
// ══════════════════════════════════════════════════════════════════════════════
const CHI_S_CHAPTERS = [
  {
    title: "Chimie organique – Alcools, Amines et Acides carboxyliques",
    order_index: 1,
    summary: "Classification et propriétés des alcools (primaire, secondaire, tertiaire), amines, acides carboxyliques et leurs dérivés (esters, amides).",
    key_formulas: [
      "Alcool primaire : –CH₂–OH ; secondaire : =CH–OH ; tertiaire : ≡C–OH.",
      "Estérification : acide carboxylique + alcool ⇌ ester + eau (réversible, équilibre).",
      "Saponification : ester + soude → sel de l'acide + alcool (totale, irréversible).",
      "Amine : dérivé de l'ammoniac NH₃ avec substitution par groupes alkyle.",
      "Acides carboxyliques : groupe –COOH (acide acétique CH₃COOH, acide stéarique C₁₇H₃₅COOH).",
    ],
    course_content: `# Chimie organique

## 1. Les alcools
**Classification** :
- **Primaire** : –CH₂–OH (le carbone portant –OH est lié à 1 carbone)
- **Secondaire** : =CH–OH (lié à 2 carbones)
- **Tertiaire** : ≡C–OH (lié à 3 carbones)

**Propriétés** : les alcools peuvent s'oxyder (primaire → aldéhyde → acide carboxylique ; secondaire → cétone).

**Déshydratation** : alcool → alcène + eau (catalyse acide, température élevée).

## 2. Les amines
Dérivées de l'ammoniac (NH₃) par substitution d'un ou plusieurs H par des groupes alkyles.
- Amine primaire : R–NH₂ ; secondaire : R₂NH ; tertiaire : R₃N.
- **Caractère basique** des amines (accepteur de proton).

## 3. Les acides carboxyliques et dérivés
**Acides carboxyliques** : groupe fonctionnel –COOH.

**Estérification** (réversible, lente) :
$$R–COOH + R'–OH \\rightleftharpoons R–COO–R' + H_2O$$

Caractéristiques : réaction lente, équilibre, catalysée par les ions H+ (acide concentré).

**Saponification** (totale, irréversible) :
$$R–COO–R' + NaOH \\rightarrow R–COONa + R'–OH$$

Caractéristiques : rapide, totale, base forte nécessaire.

## 4. Acides α-aminés
Molécules portant à la fois –NH₂ et –COOH sur le même carbone α.
- Forment des **peptides** et des **protéines** (liaisons peptidiques).
- Stéréochimie : L ou D selon la configuration du carbone asymétrique.`,
    exercises: [
      ex('Classification des alcools',
        'Le 2-propanol (CH₃–CHOH–CH₃) est un alcool :',
        opt('Primaire', 'Secondaire', 'Tertiaire', 'Quaternaire'),
        'B', "Dans le 2-propanol, le carbone portant le groupe –OH est lié à deux autres carbones (CH₃ des deux côtés). C'est donc un alcool secondaire. Primaire : un seul carbone voisin ; tertiaire : trois.", 2),
      ex('Estérification',
        'La réaction d\'estérification entre un acide carboxylique et un alcool est caractérisée par :',
        opt('Sa rapidité et son caractère total', 'Sa lenteur, son caractère équilibré et sa réversibilité', 'Son caractère irréversible en présence d\'une base', 'Sa nécessité d\'un catalyseur enzymatique'),
        'B', "L'estérification est une réaction lente, reversible et équilibrée (état d'équilibre dynamique). Elle est catalysée par les ions H+ (acide concentré comme H₂SO₄). L'hydrolyse de l'ester (réaction inverse) est aussi lente et équilibrée.", 3),
      ex('Saponification',
        'La saponification d\'un ester par la soude est :',
        opt('Une réaction réversible en milieu acide', 'Une réaction totale et irréversible en milieu basique', 'Une réaction d\'estérification accélérée', 'Une réaction de neutralisation acide-base'),
        'B', "La saponification est la réaction d'un ester avec une base forte (NaOH ou KOH). C'est une réaction totale (va jusqu'au bout) et irréversible, contrairement à l'estérification/hydrolyse en milieu acide. Elle produit un sel d'acide carboxylique (savon si acide gras) et un alcool.", 3),
      ex('Oxydation d\'un alcool primaire',
        'L\'oxydation ménagée d\'un alcool primaire donne d\'abord :',
        opt('Une cétone', 'Un aldéhyde', 'Un acide carboxylique directement', 'Un alcène'),
        'B', "L'oxydation ménagée d'un alcool primaire donne d'abord un aldéhyde (–CHO), puis en excès d'oxydant un acide carboxylique (–COOH). L'alcool secondaire s'oxyde en cétone (–CO–). L'alcool tertiaire ne s'oxyde pas dans les conditions habituelles.", 2),
      ex('Formule semi-développée d\'un ester',
        'L\'ester formé par l\'acide éthanoïque (CH₃COOH) et l\'éthanol (C₂H₅OH) est :',
        opt('CH₃–CO–CH₃', 'CH₃–COO–C₂H₅', 'C₂H₅–COO–CH₃', 'CH₃–O–C₂H₅'),
        'B', "L'estérification entre CH₃COOH et C₂H₅OH donne l'acétate d'éthyle CH₃–COO–C₂H₅ (ou éthanoate d'éthyle) + H₂O. La liaison ester est –COO–. L'acide perd son –OH et l'alcool perd son H pour former l'ester et l'eau.", 2),
    ],
  },
  {
    title: "Cinétique chimique et équilibres acido-basiques",
    order_index: 2,
    summary: "Vitesse de réaction, facteurs cinétiques, notion d'équilibre, constante d'équilibre, pH des solutions aqueuses, réactions acide-base, dosages.",
    key_formulas: [
      "Vitesse de réaction : v = -d[R]/dt = +d[P]/dt.",
      "Facteurs cinétiques : température, concentration, catalyseur, surface de contact.",
      "Constante d'acidité : Ka = [A⁻][H₃O+]/[AH] ; pKa = -log Ka.",
      "pH = -log[H₃O+] ; [H₃O+][OH⁻] = Ke = 10⁻¹⁴ à 25°C.",
      "Relation de Henderson-Hasselbalch : pH = pKa + log([A⁻]/[AH]).",
    ],
    course_content: `# Cinétique et équilibres acido-basiques

## 1. Cinétique chimique
La **vitesse de réaction** mesure la rapidité de disparition des réactifs ou d'apparition des produits.

**Facteurs cinétiques** (qui influencent la vitesse) :
- **Température** : augmenter T accélère la réaction (règle de Van't Hoff : ×2 par 10°C).
- **Concentration** : augmenter [réactifs] accélère la réaction.
- **Catalyseur** : accélère sans être consommé.
- **Surface de contact** : solides pulvérisés réagissent plus vite.

## 2. Autoprotolyse de l'eau
$$H_2O + H_2O \\rightleftharpoons H_3O^+ + OH^-$$
$$K_e = [H_3O^+][OH^-] = 10^{-14} \\text{ à 25°C}$$

**Échelle de pH** : 0–14. pH = 7 (neutre), < 7 (acide), > 7 (basique).

## 3. Acides et bases faibles
Un acide faible AH n'est que partiellement dissocié :
$$AH + H_2O \\rightleftharpoons A^- + H_3O^+$$
$$K_a = \\frac{[A^-][H_3O^+]}{[AH]}\\quad ; \\quad pK_a = -\\log K_a$$

**Relation de Henderson-Hasselbalch** : $pH = pK_a + \\log\\frac{[A^-]}{[AH]}$

À l'équivalence (base forte + acide faible) : pH > 7 (solution basique, hydrolyse basique de A⁻).

## 4. Dosages acido-basiques
**Point d'équivalence** : quantité de base = quantité d'acide. Repéré par indicateur coloré ou pH-mètre.

Acide fort + base forte → sel + eau, pH équivalence = 7.
Acide faible + base forte → pH > 7 à l'équivalence.`,
    exercises: [
      ex('Facteurs cinétiques',
        'Un catalyseur augmente la vitesse de réaction en :',
        opt('Augmentant la température du milieu', 'Abaissant l\'énergie d\'activation de la réaction', 'Augmentant la concentration des réactifs', 'Étant consommé au cours de la réaction'),
        'B', "Un catalyseur agit en abaissant l'énergie d'activation de la réaction (Ea), offrant un chemin réactionnel alternatif plus favorable. Il n'est pas consommé au cours de la réaction et ne modifie pas l'état d'équilibre final.", 3),
      ex('pH et autoprotolyse',
        'Dans une solution aqueuse à 25°C, si [H₃O⁺] = 10⁻³ mol/L, le pH est de :',
        opt('11', '3', '7', '10⁻³'),
        'B', "pH = -log[H₃O+] = -log(10⁻³) = 3. La solution est acide (pH < 7). [OH⁻] = Ke/[H₃O+] = 10⁻¹⁴/10⁻³ = 10⁻¹¹ mol/L.", 2),
      ex('pKa et demi-équivalence',
        'À la demi-équivalence lors du dosage d\'un acide faible par une base forte, on a pH = :',
        opt('7', 'pKa de l\'acide', '14 – pKa', '2×pKa'),
        'B', "Au demi-point d'équivalence, la moitié de l'acide a été neutralisée : [AH] = [A⁻]. La relation de Henderson-Hasselbalch donne pH = pKa + log([A⁻]/[AH]) = pKa + log(1) = pKa. Ce point sert à déterminer expérimentalement le pKa.", 3),
      ex('Effet de la température sur la vitesse',
        'Si l\'on augmente la température de 10°C, la vitesse de la plupart des réactions chimiques :',
        opt('Diminue de moitié', 'Double environ (règle de Van\'t Hoff)', 'Reste inchangée', 'Augmente de 100 fois'),
        'B', "La règle de Van't Hoff stipule qu'une augmentation de 10°C environ double la vitesse de réaction. Cela s'explique par l'augmentation de l'énergie cinétique des molécules : plus de collisions efficaces dépassent l'énergie d'activation.", 2),
      ex('Acide fort vs acide faible',
        'L\'acide chlorhydrique (HCl) est un acide fort. Cela signifie que dans l\'eau :',
        opt('Il se dissocie partiellement (équilibre)', 'Il se dissocie totalement en H₃O⁺ et Cl⁻', 'Il ne change pas le pH', 'Il réagit lentement'),
        'B', "Un acide fort se dissocie totalement dans l'eau : HCl → H₃O⁺ + Cl⁻ (réaction totale, irréversible). La flèche simple (→) indique une réaction complète. Un acide faible (CH₃COOH) ne se dissocie que partiellement (⇌).", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// EPS – Programme Terminale S1 et S2 (Office du Baccalauréat SN)
// ══════════════════════════════════════════════════════════════════════════════
const EPS_S_CHAPTERS = [
  {
    title: "Théorie de l'entraînement sportif",
    order_index: 1,
    summary: "Principes biologiques et méthodologiques de l'entraînement : adaptation, charge, récupération, planification.",
    key_formulas: [
      "FC max ≈ 220 – âge (formule de Karvonen).",
      "Charge d'entraînement = volume × intensité × fréquence.",
      "Zone aérobie : 60–80 % de FC max ; zone anaérobie : > 80 % de FC max.",
      "Principe de surcompensation : repos après effort → performance supérieure au niveau initial.",
      "VO₂max : consommation maximale d'oxygène, indicateur de la capacité aérobie.",
    ],
    course_content: `# Théorie de l'entraînement sportif

## 1. Adaptation biologique à l'effort
L'entraînement repose sur la capacité du corps à s'adapter aux contraintes physiques répétées.

**Systèmes énergétiques** :
- **Système ATP-PC** (anaérobie alactique) : efforts très courts (< 10 s), puissance maximale.
- **Système glycolytique** (anaérobie lactique) : efforts intenses de 10 s à 2 min, production d'acide lactique.
- **Système oxydatif** (aérobie) : efforts prolongés (> 2 min), utilise oxygène, glucides et lipides.

## 2. Principes de l'entraînement
- **Principe de surcharge** : pour progresser, la charge doit dépasser le niveau habituel.
- **Principe de progressivité** : augmentation graduelle de la charge (volume puis intensité).
- **Principe de spécificité** : l'entraînement doit correspondre à l'activité ciblée.
- **Principe de récupération** : le repos permet la surcompensation (retour au-dessus du niveau de départ).
- **Principe de réversibilité** : les effets de l'entraînement disparaissent à l'arrêt (désentraînement).

## 3. Planification et périodisation
- **Microcycle** : 1 semaine d'entraînement.
- **Mésocycle** : 3–6 semaines (bloc thématique : endurance, force, vitesse…).
- **Macrocycle** : saison entière avec phases de préparation, compétition et récupération.

## 4. Fréquence cardiaque et intensité
FC max ≈ 220 – âge. Les zones d'entraînement :
| Zone | % FC max | Objectif |
|------|----------|----------|
| Récupération | 50–60 % | Régénération |
| Aérobie | 60–80 % | Endurance de base |
| Seuil anaérobie | 80–90 % | Amélioration VO₂max |
| Anaérobie | > 90 % | Puissance, vitesse |`,
    exercises: [
      ex('Fréquence cardiaque maximale',
        'Pour un lycéen de 17 ans, la fréquence cardiaque maximale théorique (formule de Karvonen) est :',
        opt('220 bpm', '203 bpm', '190 bpm', '210 bpm'),
        'B', "FC max ≈ 220 – âge = 220 – 17 = 203 bpm. Cette formule donne une estimation théorique. La FC max réelle peut varier selon les individus.", 2),
      ex('Systèmes énergétiques',
        'Un sprint de 8 secondes fait principalement appel au système énergétique :',
        opt('Aérobie (oxydatif)', 'Glycolytique (anaérobie lactique)', 'ATP-PC (anaérobie alactique)', 'Lipidique'),
        'C', "Les efforts très courts (< 10 s) et intenses utilisent les réserves d'ATP et de phosphocréatine (PC) directement disponibles dans le muscle, sans production d'acide lactique ni consommation d'oxygène.", 2),
      ex('Principe de surcompensation',
        'Le principe de surcompensation signifie qu\'après un effort suivi d\'un repos adapté, le niveau de performance :',
        opt('Revient exactement au niveau initial', 'Dépasse le niveau initial avant l\'effort', 'Diminue définitivement', 'Reste identique à celui observé pendant l\'effort'),
        'B', "La surcompensation est l'adaptation positive de l'organisme : après la fatigue (baisse de performance) et la récupération, les capacités dépassent le niveau de départ. C'est le fondement de la progression sportive.", 3),
      ex('VO₂max et entraînement',
        'La VO₂max représente :',
        opt('La vitesse maximale atteinte lors d\'un sprint', 'La consommation maximale d\'oxygène par unité de temps, indicateur de la capacité aérobie', 'La fréquence cardiaque maximale théorique', 'Le volume d\'air expiré par minute au repos'),
        'B', "La VO₂max est la quantité maximale d'oxygène qu'un individu peut consommer par minute (ml/min/kg). C'est le principal indicateur de la capacité cardiorespiratoire et de l'endurance aérobie. Elle peut être améliorée par l'entraînement aérobie.", 2),
      ex('Zone aérobie d\'entraînement',
        'Pour un lycéen de 17 ans (FC max = 203 bpm), la fréquence cardiaque de la zone aérobie (60–80 % de FC max) est comprise entre :',
        opt('60 et 80 bpm', '120 et 160 bpm', '122 et 162 bpm', '160 et 190 bpm'),
        'C', "Zone aérobie : 60–80 % de FC max = 60–80 % × 203. Borne inférieure : 0,60 × 203 ≈ 122 bpm. Borne supérieure : 0,80 × 203 ≈ 162 bpm. Cette zone développe l'endurance de base sans produire d'acide lactique en excès.", 2),
    ],
  },
  {
    title: "Athlétisme, sports collectifs et activités physiques",
    order_index: 2,
    summary: "Techniques de base en athlétisme (course, saut, lancer), règles et tactiques des sports collectifs, évaluation des performances.",
    key_formulas: [
      "Vitesse moyenne = distance / temps.",
      "Puissance mécanique P = F × v (force × vitesse).",
      "En saut en longueur : distance ≈ v₀² × sin(2θ) / g (projectile).",
      "IMC = masse (kg) / taille² (m²) ; normal entre 18,5 et 25.",
      "Débit cardiaque Q = FC × volume d'éjection systolique.",
    ],
    course_content: `# Athlétisme et sports collectifs

## 1. Athlétisme – Courses
**Épreuves** : sprint (100 m, 200 m, 400 m), demi-fond (800 m, 1500 m), fond (5 000 m, 10 000 m).

**Technique de course** :
- Appui efficace au sol (au niveau du centre de gravité).
- Amplitude et fréquence des foulées (distance = fréquence × amplitude).
- Départ bas en sprint (blousing) : angle de poussée optimal ≈ 45°.

**Courses de haies** : rythme entre haies (3 ou 4 foulées), franchissement en extension.

**Relais** : transmission du témoin dans la zone de passage (20 m). Techniques : méthode visuelle et méthode aveugle.

## 2. Athlétisme – Sauts et lancers
**Saut en longueur** : élan, appel (planche), suspension (position groupée ou tendue), réception.
**Saut en hauteur** : technique Fosbury (dos à la barre), franchissement des jambes en dernier.
**Lancer du poids** : poussée linéaire ou rotation (glide / rotation), angle de lâcher ≈ 40–45°.

## 3. Sports collectifs
**Principes communs** : attaque (créer les décalages), défense (repli, marquage, pressing).

**Football** : règles (offside, coup franc, penalty), systèmes tactiques (4-4-2, 4-3-3).
**Basketball** : règle des 3 secondes, 5 fautes personnelles, tir à 3 points.
**Volleyball** : 3 touches maximum, rotation obligatoire, libero.
**Handball** : zone de but (6 m), tir en suspension.

## 4. Évaluation et tests physiques
- **Test de Cooper** (12 min de course) : estimation de la VO₂max.
- **Test de Ruffier** : évaluation cardiaque après effort normalisé.
- **Test de Léger-Boucher** : vitesse à l'épuisement, paliers progressifs.`,
    exercises: [
      ex('Technique de sprint',
        'En course de sprint, pour maximiser la vitesse, on cherche à optimiser :',
        opt('Uniquement la fréquence des foulées', 'Uniquement l\'amplitude des foulées', 'La fréquence et l\'amplitude des foulées simultanément', 'Le poids du coureur'),
        'C', "La vitesse = fréquence × amplitude des foulées. Un sprinter efficace travaille les deux composantes : multiplier les appuis ET allonger chaque foulée. Sacrifier l'une pour l'autre réduit la performance.", 2),
      ex('Test de Cooper',
        'Le test de Cooper consiste à :',
        opt('Mesurer la FC après 30 secondes de saut', 'Courir le plus loin possible en 12 minutes', 'Réaliser 20 pompes chronométrées', 'Effectuer un 100 m plat'),
        'B', "Le test de Cooper (1968) mesure la distance parcourue en 12 minutes de course continue à allure maximale supportable. Il permet d'estimer la VO₂max et l'endurance aérobie du sujet.", 2),
      ex('Règle du volleyball',
        'Au volleyball, une équipe a droit au maximum de __ touches consécutives avant de renvoyer le ballon :',
        opt('2', '3', '4', '5'),
        'B', "La règle fondamentale du volleyball autorise 3 touches maximum par équipe avant le renvoi : généralement réception (manchette), passe (touche) et attaque (smash). Un 4e contact est une faute.", 1),
      ex('Saut en longueur – phases',
        'Lors d\'un saut en longueur, l\'ordre correct des phases est :',
        opt('Élan → réception → appel → suspension', 'Appel → élan → suspension → réception', 'Élan → appel → suspension → réception', 'Élan → suspension → appel → réception'),
        'C', "Les 4 phases du saut en longueur sont : (1) Élan (course d'approche accélérée), (2) Appel (impulsion sur la planche d'appel, pied d'appel), (3) Suspension (phase aérienne, technique groupée ou tendue), (4) Réception (dans le sable, bras vers l'avant).", 2),
      ex('Faute au basketball',
        'En basketball, un joueur est exclu définitivement du match après :',
        opt('3 fautes personnelles', '4 fautes personnelles', '5 fautes personnelles', '2 fautes techniques'),
        'C', "Dans le basketball FIBA, un joueur est disqualifié (exclu) après avoir commis 5 fautes personnelles. Aux USA (NBA), la limite est de 6 fautes. Les fautes techniques ou antisportives peuvent entraîner une exclusion immédiate.", 1),
    ],
  },
  {
    title: "Hygiène, santé et activité physique",
    order_index: 3,
    summary: "Relation entre activité physique et santé, prévention des blessures, nutrition sportive, dopage et éthique sportive.",
    key_formulas: [
      "Dépense énergétique totale = Métabolisme de base + Thermogenèse + Activité physique.",
      "Glucides : 4 kcal/g ; Lipides : 9 kcal/g ; Protéines : 4 kcal/g.",
      "Hydratation recommandée pendant l'effort : 0,5 L par 30 min d'activité intense.",
      "Fréquence recommandée OMS : au moins 150 min/semaine d'activité modérée.",
      "Métabolisme de base (homme adulte) ≈ 1 kcal/kg/h.",
    ],
    course_content: `# Hygiène, santé et activité physique

## 1. Bienfaits de l'activité physique
L'OMS recommande au moins **150 min/semaine** d'activité physique modérée pour les adultes.

**Effets bénéfiques** :
- Cardiovasculaires : diminution FC repos, augmentation volume cardiaque, meilleure vascularisation.
- Métaboliques : régulation glycémie, prévention obésité et diabète type 2.
- Osseux : densification osseuse (prévention ostéoporose).
- Psychologiques : réduction stress, libération d'endorphines, amélioration sommeil.

## 2. Nutrition sportive
**Macronutriments** :
- **Glucides** (4 kcal/g) : carburant principal de l'effort, reconstitution du glycogène.
- **Lipides** (9 kcal/g) : énergie pour les efforts prolongés de faible intensité.
- **Protéines** (4 kcal/g) : reconstruction musculaire, à consommer après l'effort.

**Hydratation** : la déshydratation de 2 % du poids corporel réduit la performance de 20 %.

**Stratégie nutritionnelle** :
- Avant l'effort (3 h) : repas riche en glucides complexes.
- Pendant (> 1 h) : boisson isotonique (eau + glucides + sels minéraux).
- Après : protéines + glucides dans les 30 min (fenêtre anabolique).

## 3. Prévention des blessures
- **Échauffement** (15–20 min) : élévation progressive de la FC, mobilisation articulaire.
- **Étirements** : dynamiques avant l'effort, statiques après.
- **Blessures fréquentes** : entorse (ligament), tendinite (tendon), contracture/déchirure (muscle), fracture de fatigue.
- **Protocole RICE** : Rest, Ice, Compression, Elevation.

## 4. Dopage et éthique sportive
Le dopage est l'utilisation de substances ou méthodes interdites par le Code mondial antidopage (AMA).

**Produits dopants** : anabolisants (gain musculaire), EPO (augmentation globules rouges), stimulants, corticoïdes.

**Risques** : maladies cardiovasculaires, troubles hormonaux, dépendance, mort subite.

**Valeurs du sport** : fair-play, respect de l'adversaire, intégrité, dépassement de soi.`,
    exercises: [
      ex('Nutrition – apport calorique',
        'Parmi les macronutriments, celui qui fournit le plus de calories par gramme est :',
        opt('Les glucides (4 kcal/g)', 'Les protéines (4 kcal/g)', 'Les lipides (9 kcal/g)', 'Les fibres (2 kcal/g)'),
        'C', "Les lipides (graisses) fournissent 9 kcal par gramme, soit plus du double des glucides et protéines (4 kcal/g). C'est pourquoi ils constituent une réserve énergétique dense, utilisée lors des efforts prolongés de faible intensité.", 2),
      ex('Protocole RICE',
        'En cas d\'entorse fraîche, le protocole RICE recommande en premier lieu de :',
        opt('Reprendre l\'activité physique immédiatement', 'Masser vigoureusement la zone blessée', 'Mettre au repos la zone lésée (Rest)', 'Appliquer de la chaleur'),
        'C', "RICE : Rest (repos), Ice (glace 15–20 min), Compression (bandage), Elevation (surélever le membre). Le repos immédiat évite d'aggraver la lésion. La glace réduit l'œdème et la douleur. La chaleur est contre-indiquée en phase aiguë.", 2),
      ex('Dopage',
        'L\'EPO (érythropoïétine) est une substance dopante qui agit en :',
        opt('Augmentant la masse musculaire directement', 'Stimulant la production de globules rouges pour améliorer le transport d\'oxygène', 'Réduisant la sensibilité à la douleur', 'Accélérant la synthèse de testostérone'),
        'B', "L'EPO est une hormone qui stimule la production de globules rouges (érythrocytes) dans la moelle osseuse. Plus de globules rouges → meilleur transport de l'oxygène vers les muscles → amélioration de l'endurance. Elle est interdite car elle augmente aussi le risque de thrombose.", 3),
      ex('Échauffement – objectifs',
        'L\'échauffement avant une activité physique sert principalement à :',
        opt('Augmenter la masse musculaire', 'Préparer progressivement l\'organisme à l\'effort et réduire le risque de blessures', 'Compenser un manque de sommeil', 'Remplacer l\'entraînement principal'),
        'B', "L'échauffement prépare l'organisme à l'effort en augmentant progressivement la température corporelle, la fréquence cardiaque et respiratoire, et en améliorant la souplesse articulaire. Il réduit les risques de blessures musculaires et tendineuses (déchirures, contractures).", 1),
      ex('Hydratation et performance',
        'Une déshydratation de 2 % du poids corporel d\'un sportif entraîne une baisse de performance d\'environ :',
        opt('2 %', '5 %', '10 %', '20 %'),
        'D', "Même une légère déshydratation (2 % du poids corporel) peut réduire les performances sportives d'environ 20 %. Cela affecte la concentration, la force musculaire et l'endurance. Il est donc essentiel de s'hydrater avant, pendant et après l'effort.", 2),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// INFORMATIQUE – Programme Terminale S2 (Office du Baccalauréat SN)
// ══════════════════════════════════════════════════════════════════════════════
const INFO_S2_CHAPTERS = [
  {
    title: "Algorithmique et programmation",
    order_index: 1,
    summary: "Notion d'algorithme, structures de contrôle (séquence, condition, boucle), fonctions, tableaux et introduction à la programmation en Python.",
    key_formulas: [
      "Complexité linéaire O(n) : parcours simple d'un tableau.",
      "Complexité quadratique O(n²) : doubles boucles imbriquées (tri à bulles).",
      "Récursivité : une fonction qui s'appelle elle-même avec un cas de base.",
      "Tri par sélection : sélectionner le minimum, l'échanger avec le premier élément non trié.",
      "Recherche dichotomique : O(log n), applicable sur tableau trié.",
    ],
    course_content: `# Algorithmique et programmation

## 1. Notion d'algorithme
Un **algorithme** est une suite d'instructions finies, non ambiguës, permettant de résoudre un problème.

**Propriétés** : lisibilité, efficacité, terminaison (l'algorithme s'arrête), correction (produit le bon résultat).

## 2. Structures de contrôle
**Séquence** : instructions exécutées dans l'ordre.
**Alternative** :
\`\`\`python
if condition:
    # bloc vrai
else:
    # bloc faux
\`\`\`
**Boucle for** (nombre d'itérations connu) :
\`\`\`python
for i in range(n):
    # répéter n fois
\`\`\`
**Boucle while** (condition d'arrêt) :
\`\`\`python
while condition:
    # répéter tant que vrai
\`\`\`

## 3. Fonctions et procédures
\`\`\`python
def nom_fonction(parametre1, parametre2):
    # corps
    return resultat
\`\`\`
**Portée des variables** : locale (dans la fonction) vs globale.

## 4. Tableaux (listes en Python)
\`\`\`python
tab = [3, 1, 4, 1, 5]
tab[0]      # accès au 1er élément (indice 0)
len(tab)    # longueur du tableau
tab.append(9)  # ajouter en fin
\`\`\`

## 5. Algorithmes de tri
**Tri à bulles** : comparer les éléments adjacents, échanger si désordre. Complexité : O(n²).
**Tri par sélection** : trouver le minimum du sous-tableau non trié, le placer en tête. O(n²).
**Tri par insertion** : insérer chaque élément à sa place dans la partie triée. O(n²).

## 6. Recherche dichotomique
Sur un tableau **trié**, comparer l'élément cherché au milieu, puis restreindre l'intervalle de moitié à chaque étape. Complexité : **O(log n)** (beaucoup plus rapide que la recherche séquentielle O(n)).`,
    exercises: [
      ex('Structure de boucle',
        'Quelle structure utilise-t-on quand on ne connaît pas à l\'avance le nombre d\'itérations ?',
        opt('La boucle for', 'La boucle while', 'La séquence', 'La fonction récursive'),
        'B', "La boucle 'while' s'exécute tant qu'une condition est vraie, sans connaître à l'avance le nombre d'itérations (ex. : lire des données jusqu'à ce que l'utilisateur entre 0). La boucle 'for' est préférable quand le nombre d'itérations est connu (parcours d'un tableau).", 2),
      ex('Complexité algorithmique',
        'La recherche dichotomique dans un tableau trié de n éléments a une complexité de :',
        opt('O(1)', 'O(n)', 'O(n²)', 'O(log n)'),
        'D', "La dichotomie divise l'espace de recherche par 2 à chaque étape. Pour 1024 éléments, il faut au maximum log₂(1024) = 10 comparaisons. C'est beaucoup plus efficace que la recherche séquentielle O(n) qui nécessiterait jusqu'à 1024 comparaisons.", 3),
      ex('Indice de tableau',
        'En Python, le premier élément d\'une liste tab est accessible par :',
        opt('tab[1]', 'tab[0]', 'tab[-1]', 'tab.first()'),
        'B', "En Python (et dans la plupart des langages), les tableaux (listes) sont indexés à partir de 0. tab[0] est le premier élément, tab[1] le deuxième, etc. tab[-1] est le dernier élément (indexation négative Python).", 1),
      ex('Récursivité',
        'Une fonction récursive doit obligatoirement contenir :',
        opt('Une boucle while', 'Un cas de base (condition d\'arrêt) et un appel récursif', 'Un tableau comme paramètre', 'Des variables globales'),
        'B', "Une fonction récursive s'appelle elle-même. Pour éviter une récursion infinie, elle doit contenir : (1) un cas de base (condition d'arrêt) qui retourne un résultat sans appel récursif, et (2) un appel récursif qui rapproche le problème du cas de base.", 2),
      ex('Tri à bulles – nombre de comparaisons',
        'Le tri à bulles appliqué à une liste de 5 éléments effectue au maximum :',
        opt('5 comparaisons', '10 comparaisons', '25 comparaisons', '120 comparaisons'),
        'B', "Le tri à bulles effectue au pire n(n-1)/2 comparaisons pour n éléments. Pour n=5 : 5×4/2 = 10 comparaisons. La complexité O(n²) signifie que le nombre d'opérations croît comme le carré du nombre d'éléments.", 3),
    ],
  },
  {
    title: "Systèmes d'exploitation et réseaux informatiques",
    order_index: 2,
    summary: "Rôle du système d'exploitation, gestion des fichiers, notion de réseau, protocoles TCP/IP, adressage IP, Internet et sécurité.",
    key_formulas: [
      "Adresse IPv4 : 4 octets (ex. 192.168.1.1), notée en décimal pointé.",
      "Masque sous-réseau : ex. 255.255.255.0 (/24 en notation CIDR).",
      "Nombre d'hôtes dans un sous-réseau /24 : 2⁸ – 2 = 254 hôtes.",
      "Débit binaire : bits transmis / temps (en bits/s ou bps).",
      "Modèle OSI : 7 couches (Physique → Liaison → Réseau → Transport → Session → Présentation → Application).",
    ],
    course_content: `# Systèmes d'exploitation et réseaux

## 1. Système d'exploitation (SE)
Le **système d'exploitation** est le logiciel fondamental qui gère les ressources matérielles et fournit les services aux applications.

**Fonctions principales** :
- Gestion du **processeur** (ordonnancement des processus).
- Gestion de la **mémoire** (allocation RAM, mémoire virtuelle).
- Gestion des **fichiers** (arborescence, permissions).
- Gestion des **entrées/sorties** (périphériques).

**Exemples** : Windows, Linux (Ubuntu, Debian), macOS, Android.

**Arborescence Linux** :
\`\`\`
/ (racine)
├── /home   (répertoires utilisateurs)
├── /etc    (configuration système)
├── /bin    (commandes essentielles)
└── /var    (données variables : logs, spool)
\`\`\`

## 2. Réseaux informatiques
Un **réseau** connecte des machines pour partager des ressources et communiquer.

**Topologies** : bus, étoile (la plus courante), anneau, maille.

**Types** : LAN (réseau local), WAN (réseau étendu), Internet (réseau mondial).

**Équipements** : switch (commutation niveau 2), routeur (niveau 3, interconnexion réseaux), point d'accès Wi-Fi.

## 3. Protocoles TCP/IP
**TCP** (Transmission Control Protocol) : connexion fiable, contrôle de flux, garantie de livraison.
**IP** (Internet Protocol) : adressage et routage des paquets.
**UDP** : sans connexion, plus rapide mais non fiable (streaming, jeux en ligne).

**Adressage IPv4** : 192.168.1.10 / 255.255.255.0
- Adresse réseau : 192.168.1.0
- Broadcast : 192.168.1.255
- Plage hôtes : 192.168.1.1 à 192.168.1.254

## 4. Sécurité informatique
- **Pare-feu (firewall)** : filtre le trafic selon des règles.
- **Chiffrement** : rendre les données illisibles sans la clé (HTTPS = HTTP + TLS).
- **Mot de passe fort** : ≥ 12 caractères, majuscules + chiffres + symboles.
- **Menaces** : virus, malware, phishing, ransomware.`,
    exercises: [
      ex('Adressage IP',
        'Dans l\'adresse IP 192.168.10.5 avec le masque /24 (255.255.255.0), l\'adresse réseau est :',
        opt('192.168.10.5', '192.168.10.0', '192.168.10.255', '255.255.255.0'),
        'B', "Le masque /24 signifie que les 24 premiers bits identifient le réseau. Pour 192.168.10.5, on remplace le dernier octet par 0 : l'adresse réseau est 192.168.10.0. L'adresse de broadcast est 192.168.10.255.", 3),
      ex('Rôle du routeur',
        'Dans un réseau informatique, le routeur a pour rôle principal de :',
        opt('Connecter des appareils au sein d\'un même réseau local', 'Amplifier le signal Wi-Fi', 'Interconnecter des réseaux différents et acheminer les paquets', 'Protéger contre les virus'),
        'C', "Le routeur opère au niveau 3 (réseau) du modèle OSI et prend des décisions d'acheminement basées sur les adresses IP. Il interconnecte des réseaux différents (ex. LAN domestique ↔ Internet). Le switch connecte des machines dans le même réseau local.", 2),
      ex('Protocole TCP vs UDP',
        'Le protocole UDP est préféré au TCP pour la diffusion vidéo en direct (streaming) car :',
        opt('Il garantit la livraison de tous les paquets', 'Il est plus lent mais plus fiable', 'Il privilégie la rapidité au détriment de la fiabilité', 'Il chiffre automatiquement les données'),
        'C', "UDP ne vérifie pas si les paquets arrivent à destination (pas d'accusé de réception). Cette absence de contrôle le rend plus rapide, idéal pour la vidéo/audio en direct où un léger manque de données est acceptable, mais où une retransmission provoquerait des délais inacceptables.", 3),
      ex('Commandes Linux essentielles',
        'Dans un terminal Linux, la commande pour lister le contenu d\'un répertoire est :',
        opt('dir', 'ls', 'list', 'show'),
        'B', "La commande 'ls' (list) affiche le contenu d'un répertoire sous Linux/Unix. Options courantes : ls -l (liste détaillée), ls -a (fichiers cachés), ls -lh (tailles lisibles). 'dir' est l'équivalent Windows.", 1),
      ex('Sécurité – HTTPS',
        'HTTPS est différent de HTTP car il :',
        opt('Est plus rapide que HTTP', 'Chiffre les communications entre navigateur et serveur grâce à TLS/SSL', 'N\'utilise pas le protocole TCP', 'Est réservé aux sites gouvernementaux'),
        'B', "HTTPS (HTTP Secure) ajoute une couche de chiffrement TLS (Transport Layer Security, anciennement SSL) au protocole HTTP. Les données échangées sont chiffrées, empêchant les interceptions. Identifiable par le cadenas dans la barre d'adresse du navigateur.", 2),
    ],
  },
  {
    title: "Bases de données relationnelles",
    order_index: 3,
    summary: "Modèle relationnel, tables et clés, langage SQL (SELECT, INSERT, UPDATE, DELETE, jointures), normalisation.",
    key_formulas: [
      "Clé primaire (PRIMARY KEY) : identifiant unique de chaque enregistrement.",
      "Clé étrangère (FOREIGN KEY) : référence la clé primaire d'une autre table.",
      "SELECT col FROM table WHERE condition ORDER BY col LIMIT n.",
      "JOIN : SELECT * FROM A INNER JOIN B ON A.id = B.a_id.",
      "Première forme normale (1FN) : pas de valeur répétée, attributs atomiques.",
    ],
    course_content: `# Bases de données relationnelles

## 1. Modèle relationnel
Une **base de données relationnelle** organise les informations en **tables** (relations) constituées de lignes (tuples/enregistrements) et de colonnes (attributs).

**Concepts clés** :
- **Clé primaire** : attribut (ou combinaison) qui identifie de manière unique chaque ligne.
- **Clé étrangère** : attribut qui référence la clé primaire d'une autre table (intégrité référentielle).
- **Cardinalité** : 1-1, 1-N (un à plusieurs), N-N (plusieurs à plusieurs).

## 2. Langage SQL
SQL (Structured Query Language) est le langage standard pour interroger et manipuler les bases de données.

### Requêtes de lecture (SELECT)
\`\`\`sql
-- Sélectionner toutes les colonnes
SELECT * FROM eleves;

-- Avec condition et tri
SELECT nom, prenom, note
FROM eleves
WHERE note >= 10
ORDER BY note DESC;

-- Compter
SELECT COUNT(*) FROM eleves WHERE serie = 'S2';
\`\`\`

### Jointures (JOIN)
\`\`\`sql
-- Relier deux tables
SELECT eleves.nom, classes.libelle
FROM eleves
INNER JOIN classes ON eleves.classe_id = classes.id;
\`\`\`

### Modifications
\`\`\`sql
INSERT INTO eleves (nom, prenom, note) VALUES ('Diallo', 'Fatou', 15);
UPDATE eleves SET note = 16 WHERE nom = 'Diallo';
DELETE FROM eleves WHERE note < 5;
\`\`\`

## 3. Conception : diagramme entité-association
Avant de créer les tables, on modélise les entités et leurs relations :
- **Entité** : objet du monde réel (Élève, Classe, Matière).
- **Association** : lien entre entités (un élève est inscrit dans une classe).
- **Attribut** : propriété d'une entité (nom, prénom, date de naissance).

## 4. Normalisation
Les formes normales évitent les redondances et anomalies :
- **1FN** : attributs atomiques, pas de groupes répétés.
- **2FN** : 1FN + tout attribut dépend entièrement de la clé primaire.
- **3FN** : 2FN + pas de dépendance transitive.`,
    exercises: [
      ex('Clé primaire',
        'Dans une table SQL, la clé primaire (PRIMARY KEY) garantit que :',
        opt('Les valeurs de la colonne sont toutes identiques', 'Chaque enregistrement est identifié de manière unique', 'La colonne ne peut contenir que des nombres entiers', 'La table peut être jointe avec n\'importe quelle autre table'),
        'B', "La clé primaire est un attribut (ou combinaison d'attributs) dont la valeur est unique pour chaque ligne de la table. Elle permet d'identifier sans ambiguïté chaque enregistrement et sert de référence pour les clés étrangères dans d'autres tables.", 2),
      ex('Requête SQL SELECT',
        'La clause WHERE dans une requête SQL permet de :',
        opt('Trier les résultats', 'Filtrer les lignes selon une condition', 'Grouper les résultats', 'Limiter le nombre de colonnes retournées'),
        'B', "WHERE filtre les lignes : seules celles qui satisfont la condition sont retournées. ORDER BY trie, SELECT sélectionne les colonnes, GROUP BY regroupe, HAVING filtre les groupes, LIMIT restreint le nombre de lignes.", 2),
      ex('Jointure INNER JOIN',
        'La jointure INNER JOIN entre deux tables retourne :',
        opt('Toutes les lignes des deux tables y compris sans correspondance', 'Uniquement les lignes qui ont une correspondance dans les deux tables', 'Uniquement les lignes sans correspondance', 'La union des deux tables'),
        'B', "INNER JOIN (ou JOIN) retourne uniquement les lignes pour lesquelles la condition de jointure est vérifiée dans les deux tables. Si une ligne de la table A n'a pas de correspondance dans la table B, elle est exclue du résultat. LEFT JOIN conserverait toutes les lignes de A.", 3),
      ex('Modèle entité-association',
        'Dans un diagramme entité-association, une association de type "1-N" entre Classe et Élèves signifie :',
        opt('Une classe peut avoir plusieurs élèves, et un élève peut appartenir à plusieurs classes', 'Une classe contient un seul élève', 'Une classe peut avoir plusieurs élèves, mais un élève n\'appartient qu\'à une seule classe', 'Il n\'y a aucune relation entre classe et élèves'),
        'C', "La cardinalité 1-N (un à plusieurs) signifie : du côté 1 (Classe), une instance est liée à plusieurs instances de l'autre côté (Élèves) ; du côté N (Élève), une instance n'est liée qu'à une seule instance de Classe. En SQL, cela se traduit par une clé étrangère dans la table Élèves.", 2),
      ex('Normalisation – 1FN',
        'Une table est en première forme normale (1FN) si :',
        opt('Elle possède une clé primaire unique', 'Tous ses attributs sont atomiques (non divisibles) et il n\'y a pas de groupes répétés', 'Elle ne contient aucune valeur NULL', 'Toutes ses colonnes sont de type texte'),
        'B', "La 1ère forme normale exige que : (1) chaque cellule contient une valeur atomique (non divisible, ex. : pas de liste dans une cellule), (2) pas de groupes répétés (pas de colonnes du type matière1, matière2, matière3). C'est la base de toute conception relationnelle correcte.", 3),
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════════════
// ASSEMBLAGE FINAL
// ══════════════════════════════════════════════════════════════════════════════
export const PROGRAMS_PART2 = {

  // ── PHILOSOPHIE ──────────────────────────────────────────────────────────
  [SID.L1_PHILO]:   { chapters: PHILO_CHAPTERS },
  [SID.L2_PHILO]:   { chapters: PHILO_CHAPTERS },
  [SID.S1_PHILO]:   { chapters: PHILO_CHAPTERS },
  [SID.S2_PHILO]:   { chapters: PHILO_CHAPTERS },

  // ── FRANÇAIS ─────────────────────────────────────────────────────────────
  [SID.L1_FR]:  { chapters: FR_CHAPTERS },
  [SID.L2_FR]:  { chapters: FR_CHAPTERS },
  [SID.S1_FR]:  { chapters: FR_CHAPTERS },
  [SID.S2_FR]:  { chapters: FR_CHAPTERS },

  // ── ANGLAIS ──────────────────────────────────────────────────────────────
  [SID.L1_EN]:  { chapters: EN_CHAPTERS },
  [SID.L2_EN]:  { chapters: EN_CHAPTERS },
  [SID.S1_EN]:  { chapters: EN_CHAPTERS },
  [SID.S2_EN]:  { chapters: EN_CHAPTERS },

  // ── HISTOIRE-GÉOGRAPHIE ──────────────────────────────────────────────────
  [SID.L1_HISTGEO]: { chapters: HISTGEO_CHAPTERS },
  [SID.L2_HISTGEO]: { chapters: HISTGEO_CHAPTERS },
  [SID.S1_HISTGEO]: { chapters: HISTGEO_CHAPTERS },
  [SID.S2_HISTGEO]: { chapters: HISTGEO_CHAPTERS },

  // ── SVT ──────────────────────────────────────────────────────────────────
  [SID.L1_SVT]: { chapters: SVT_L_CHAPTERS },
  [SID.S1_SVT]: { chapters: SVT_S1_CHAPTERS },
  [SID.S2_SVT]: { chapters: SVT_S2_CHAPTERS },

  // ── SCIENCES PHYSIQUES ───────────────────────────────────────────────────
  [SID.S1_PHY]: { chapters: PHY_S_CHAPTERS },
  [SID.S2_PHY]: { chapters: PHY_S_CHAPTERS },

  // ── CHIMIE ───────────────────────────────────────────────────────────────
  [SID.S1_CHI]: { chapters: CHI_S_CHAPTERS },
  [SID.S2_CHI]: { chapters: CHI_S_CHAPTERS },

  // ── EPS ──────────────────────────────────────────────────────────────────
  [SID.S1_EPS]: { chapters: EPS_S_CHAPTERS },
  [SID.S2_EPS]: { chapters: EPS_S_CHAPTERS },

  // ── INFORMATIQUE ─────────────────────────────────────────────────────────
  [SID.S2_INFO]: { chapters: INFO_S2_CHAPTERS },
};
