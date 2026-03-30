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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- comprendre ce qui distingue la philosophie des autres formes de savoir
- réfléchir à la nature de l'homme
- analyser les notions de liberté, de déterminisme et de libre arbitre
- comparer plusieurs conceptions du bonheur

## 2. La démarche philosophique
La philosophie est une réflexion rationnelle sur les questions fondamentales de l'existence, de la connaissance et des valeurs.

### Ce qui la caractérise
- elle pose des questions radicales
- elle refuse les opinions toutes faites
- elle argumente au lieu d'affirmer sans preuve
- elle cherche le sens, la vérité et la cohérence

### Philosophie et opinion
L'opinion est immédiate, souvent vague ou non justifiée.
La philosophie commence au contraire quand on interroge l'évidence.

### Philosophie et mythe
Le mythe raconte, symbolise et transmet une sagesse imagée.
La philosophie, elle, cherche à démontrer, distinguer et argumenter.
Elle ne se contente pas de raconter le monde : elle veut en rendre raison.

### Philosophie et science
La science étudie des objets précis avec des méthodes définies.
La philosophie interroge les principes, les limites et le sens des savoirs.
Elle ne remplace pas la science, mais réfléchit sur ses fondements et ses enjeux.

## 3. L'homme
L'homme peut être défini de plusieurs manières.

### Aristote
Aristote présente l'homme comme :
- un **animal raisonnable**
- un **animal politique**

L'homme se distingue ainsi par la pensée, le langage et la vie en société.

### L'homme comme être de culture
L'homme n'est pas seulement un être biologique.
Il vit dans un monde de langage, de techniques, de règles et de symboles.

### L'homme comme conscience
L'homme se distingue aussi par sa capacité à se rapporter à lui-même.
Il se sait vivant, mortel, capable de se juger, d'anticiper et de donner un sens à ses actes.
C'est pourquoi la question de l'homme ouvre immédiatement sur celles de la morale, de la liberté et du bonheur.

## 4. La liberté
La liberté est une notion centrale en philosophie.

### Sens négatif
Être libre peut signifier ne pas subir de contrainte extérieure.

### Sens positif
Être libre peut aussi signifier se donner à soi-même sa propre loi, agir par raison et non par impulsion.

### Le libre arbitre
Pour Descartes, le libre arbitre est la capacité de choisir.
Il manifeste la dignité de la personne humaine.

### La liberté comme conquête
La liberté n'est pas toujours donnée immédiatement.
Elle peut demander un travail sur soi, une éducation, une maîtrise des passions et une lucidité plus grande.
Être libre, ce n'est donc pas faire tout ce que l'on veut, mais apprendre à vouloir de manière éclairée.

## 5. Liberté et déterminisme
Le déterminisme affirme que tout phénomène a une cause.

### Problème philosophique
Si nos actes sont déterminés par :
- notre corps
- notre éducation
- notre histoire
- notre milieu social

sommes-nous encore libres ?

### Réponse de Spinoza
Spinoza ne nie pas la nécessité.
Pour lui, être libre ne consiste pas à échapper aux causes, mais à comprendre ce qui nous détermine.
La liberté devient alors connaissance de la nécessité.

### Enjeu philosophique
Le problème n'oppose donc pas seulement liberté et contrainte.
Il oblige à se demander si la vraie liberté est indépendance absolue ou autonomie raisonnable.

## 6. La responsabilité
La question de la liberté engage celle de la responsabilité.
On ne peut juger moralement un acte que si son auteur est considéré comme capable de choisir.

La responsabilité suppose donc une certaine forme de liberté.

## 7. Le bonheur
Le bonheur désigne l'état de satisfaction durable auquel les hommes aspirent.

### Épicure
Le bonheur réside dans le plaisir, mais un plaisir mesuré.
Le vrai plaisir est l'absence de trouble de l'âme et de douleur du corps.

### Aristote
Le bonheur est la réalisation accomplie de la nature humaine.
Il passe par la raison, la vertu et une vie équilibrée.

### Les stoïciens
Le bonheur ne dépend pas des biens extérieurs.
Il consiste à vivre conformément à la raison et à accepter ce qui ne dépend pas de nous.

### Bonheur et désir
La réflexion sur le bonheur conduit souvent à interroger le désir.
Faut-il satisfaire tous ses désirs pour être heureux ?
Ou faut-il apprendre à les hiérarchiser, à les maîtriser et à distinguer l'essentiel du superflu ?

Cette question traverse la philosophie antique comme la philosophie moderne.

## 8. Repères d'auteurs et problématiques utiles
Pour enrichir une copie, il faut savoir mobiliser les auteurs à bon escient.

### Quelques repères utiles
- **Socrate** : l'exigence de l'examen de soi et du dialogue.
- **Aristote** : l'homme comme animal raisonnable et politique ; le bonheur comme activité conforme à la vertu.
- **Descartes** : la liberté comme puissance de choisir et l'importance de la raison.
- **Spinoza** : la liberté comme compréhension de la nécessité.
- **Épicure** : le bonheur comme absence de trouble.
- **Épictète** : distinguer ce qui dépend de nous de ce qui n'en dépend pas.

### Problématiques fréquentes
- L'homme est-il naturellement libre ?
- Être libre, est-ce faire ce que l'on veut ?
- Le bonheur dépend-il de nous ?
- La connaissance de soi rend-elle plus libre ?
- Le désir est-il un obstacle ou un moteur du bonheur ?

Un bon devoir ne cite pas un auteur pour faire savant. Il s'en sert pour éclairer un problème précis et faire progresser l'argumentation.

## 9. Méthode de réflexion philosophique
Pour traiter une question philosophique :

1. définir les notions du sujet
2. mettre en évidence le problème
3. confronter plusieurs thèses
4. argumenter avec rigueur
5. aboutir à une conclusion nuancée

### Exigences d'une bonne copie
- ne pas réciter des définitions sans lien avec le sujet ;
- faire apparaître une vraie tension ou difficulté ;
- utiliser les auteurs pour éclairer un problème, non pour décorer le devoir ;
- toujours distinguer exemple, argument et thèse.

### Formulations utiles dans une copie
- "Le sujet oppose en apparence..., mais il invite en réalité à se demander si..."
- "Cette thèse montre que..., cependant elle rencontre une limite..."
- "Il faut ici distinguer... afin d'éviter une confusion fréquente."
- "L'enjeu n'est donc pas seulement de définir..., mais de comprendre dans quelle mesure..."

## 10. Sujets types pour s'entraîner
Voici quelques sujets classiques qui permettent de réviser ce chapitre :

- L'homme est-il condamné à désirer sans jamais être heureux ?
- Être libre, est-ce n'obéir à personne ?
- Le bonheur dépend-il des circonstances extérieures ?
- La connaissance de soi suffit-elle à rendre l'homme libre ?

### Ce qu'on attend dans ce type de sujet
- une définition précise des notions ;
- une vraie tension entre plusieurs thèses ;
- des auteurs bien choisis ;
- une conclusion nuancée et non récitative.

## 11. À retenir
- la philosophie est une recherche rationnelle et critique
- l'homme est un être de raison, de langage et de société
- la liberté se pense toujours avec ses limites
- le bonheur reçoit des interprétations différentes selon les philosophes`,
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
      ex('Vrai ou faux – liberté',
        'Vrai ou faux : pour Spinoza, être libre consiste à échapper à toute cause.',
        opt('Vrai', 'Faux', 'Vrai seulement en morale', 'Le cours ne tranche pas'),
        'B', "C'est faux. Pour Spinoza, la liberté n'est pas l'absence de causes, mais la compréhension de ce qui nous détermine. La liberté est donc liée à la connaissance de la nécessité.", 3),
      ex('QCM – bonheur et désir',
        'La réflexion philosophique sur le bonheur conduit souvent à interroger :',
        opt('La vitesse du progrès technique', 'Le désir et sa maîtrise', 'Le calcul mathématique', 'La géographie politique'),
        'B', "Dans le cours, la question du bonheur est liée à celle du désir : faut-il satisfaire tous ses désirs, les hiérarchiser ou apprendre à les maîtriser pour être heureux ?", 2),
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- expliquer l'origine et la nécessité de la société
- comprendre les grandes théories du contrat social
- définir l'État, le droit et la justice
- comparer plusieurs conceptions philosophiques du politique

## 2. La société
L'homme ne vit pas isolé. Il appartient à une société faite d'institutions, de règles et de rapports sociaux.

### Deux grandes thèses
- pour Aristote, la société est naturelle
- pour les contractualistes, elle résulte d'un accord entre individus

La société protège, éduque et organise la coexistence des hommes.

### Ambivalence de la société
La société protège, mais elle contraint aussi.
Elle civilise l'individu, mais elle lui impose des normes.
Le problème philosophique consiste donc à penser ensemble l'exigence de vivre avec les autres et le désir de liberté.

## 3. Le contrat social
Le contrat social est une théorie expliquant le passage de l'état de nature à la société civile.

### Hobbes
À l'état de nature, chacun cherche à se conserver.
Cela conduit à la guerre de tous contre tous.
Pour en sortir, les individus remettent leur puissance à un souverain fort.

### Locke
Les hommes possèdent des droits naturels : vie, liberté, propriété.
Le pouvoir politique doit garantir ces droits, non les supprimer.

### Rousseau
Le contrat social fonde un corps politique dans lequel chacun obéit à la volonté générale.
L'autorité légitime doit viser le bien commun.

### Enjeu du contractualisme
Les théories du contrat social ne décrivent pas forcément un événement historique réel.
Elles proposent surtout une manière de penser le fondement légitime du pouvoir politique.

## 4. L'État
L'État est une organisation politique dotée :

- d'un territoire
- d'une population
- d'un pouvoir souverain

Il garantit l'ordre, édicte les lois et exerce l'autorité publique.

### Fonctions de l'État
L'État n'est pas seulement un appareil de contrainte.
Il assure aussi la sécurité, la justice, l'administration, l'éducation et parfois la solidarité sociale.

### Weber
Selon Max Weber, l'État détient le monopole de la violence physique légitime sur un territoire donné.

## 5. Le droit
### Droit naturel
Le droit naturel désigne les droits considérés comme universels et inhérents à l'homme.

### Droit positif
Le droit positif est l'ensemble des lois effectivement en vigueur dans une société donnée.

### Tension philosophique
Une loi peut être légale sans être juste.
La réflexion philosophique interroge donc le rapport entre légalité et légitimité.

On peut alors se demander :
- faut-il toujours obéir à la loi ?
- qu'est-ce qu'une loi injuste ?
- dans quelles conditions la désobéissance peut-elle être moralement justifiée ?

## 6. La justice
La justice renvoie à l'idée d'équité, de droit et de juste répartition.

### Justice distributive
Chez Aristote, elle consiste à attribuer à chacun selon son mérite ou sa place.

### Justice commutative
Elle concerne l'égalité dans les échanges.

### Justice sociale
Chez Rawls, les inégalités ne sont acceptables que si elles améliorent la situation des plus défavorisés.

### Justice et égalité
L'égalité ne signifie pas toujours identité de traitement.
Selon les conceptions, être juste peut vouloir dire :
- traiter tout le monde de la même façon ;
- donner à chacun ce qui lui revient ;
- corriger certaines inégalités de départ.

## 7. Liberté et autorité politique
La vie en société suppose des règles.
La question est donc de savoir comment obéir à la loi sans perdre sa liberté.

Rousseau répond que l'on reste libre quand on obéit à une loi que l'on s'est prescrite collectivement.

## 8. Repères d'auteurs et questions classiques
### Quelques auteurs à mobiliser
- **Aristote** : la cité est naturelle et l'homme est un animal politique.
- **Hobbes** : sans pouvoir commun, les hommes risquent la guerre de tous contre tous.
- **Locke** : l'État doit protéger les droits naturels.
- **Rousseau** : la légitimité politique repose sur la volonté générale.
- **Montesquieu** : la séparation des pouvoirs protège la liberté.
- **Rawls** : une société juste doit aussi penser le sort des plus défavorisés.

### Questions fréquentes
- La société limite-t-elle nécessairement la liberté ?
- Faut-il toujours obéir aux lois ?
- Une loi légale est-elle forcément juste ?
- L'État est-il un protecteur ou une menace pour la liberté ?
- L'égalité suffit-elle à définir la justice ?

## 9. Méthode de réflexion
Pour traiter un sujet politique :

1. définir société, État, droit ou justice
2. repérer le problème
3. mobiliser les auteurs adaptés
4. distinguer faits, normes et valeurs
5. conclure sans simplifier abusivement

### Conseil utile
Dans une dissertation politique, il faut éviter deux pièges :
- parler seulement de l'actualité sans problématiser ;
- parler seulement des auteurs sans montrer l'enjeu concret des notions.

### Formulations utiles
- "L'État apparaît d'abord comme..., mais il peut aussi..."
- "Il faut distinguer la légalité, qui renvoie à..., et la légitimité, qui renvoie à..."
- "La justice ne se réduit pas à l'égalité arithmétique, car..."
- "Le problème central est de savoir comment concilier autorité politique et liberté individuelle."

## 10. À retenir
- la société peut être pensée comme naturelle ou conventionnelle
- l'État organise la vie commune
- le droit n'épuise pas toujours la justice
- la philosophie politique cherche les conditions d'un pouvoir légitime`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- comprendre ce qu'est une connaissance scientifique
- distinguer plusieurs conceptions de la vérité
- connaître les grandes méthodes de la science
- réfléchir à la nature de l'art et du beau

## 2. L'épistémologie
L'épistémologie est la réflexion philosophique sur la science.

Elle étudie :
- les conditions de validité du savoir scientifique
- les méthodes utilisées
- les limites de la science
- la différence entre science, opinion et croyance

### Pourquoi cette réflexion est importante
La science a un immense prestige, mais il faut encore savoir ce qui fait sa valeur.
L'épistémologie cherche donc à distinguer le savoir démontré, l'hypothèse, la croyance, l'idéologie ou la pseudo-science.

## 3. La vérité
La vérité est un problème central de la philosophie.

### Vérité de correspondance
Une proposition est vraie si elle correspond à la réalité.

### Vérité de cohérence
Une proposition est vraie si elle s'accorde logiquement avec un ensemble de propositions.

### Vérité pragmatique
Pour les pragmatistes, est vrai ce qui fonctionne dans la pratique et produit des effets satisfaisants.

### Enjeu du problème
Ces conceptions montrent que la vérité n'est pas une notion simple.
On peut alors se demander si la vérité est découverte, construite, vérifiée ou simplement approchée.

## 4. La méthode scientifique
La science repose sur des procédures rigoureuses.

### Observation et expérimentation
Le savant recueille des faits, formule des hypothèses puis les confronte à l'expérience.

### Méthode hypothético-déductive
Elle suit le schéma :

1. hypothèse
2. déduction de conséquences vérifiables
3. expérimentation
4. confirmation provisoire ou réfutation

### Popper
Selon Popper, une théorie n'est scientifique que si elle est falsifiable, c'est-à-dire susceptible d'être réfutée par l'expérience.

### Science et progrès
Le progrès scientifique ne consiste pas seulement à accumuler des vérités définitives.
Il passe aussi par des rectifications, des remises en cause, des crises et des réorganisations du savoir.

## 5. Science et limites
La science produit un savoir puissant, mais limité :

- elle ne répond pas à toutes les questions existentielles
- elle n'épuise pas les questions morales ou esthétiques
- ses théories restent révisables

## 6. L'art
L'art est une activité de création humaine.
Il donne forme sensible à une signification, une émotion ou une vision du monde.

### L'œuvre d'art
Une œuvre d'art n'est pas un simple objet utile.
Elle porte un style, une intention, une forme, et suscite une expérience singulière chez celui qui la reçoit.

## 7. Le beau
Le beau n'est pas seulement ce qui plaît.

### Kant
Le jugement esthétique est désintéressé et prétend à une certaine universalité.

### Différence entre beau et agréable
- l'agréable relève du goût personnel
- le beau appelle une adhésion plus large, même sans démonstration

### Le jugement esthétique
Quand on dit qu'une œuvre est belle, on n'exprime pas seulement une préférence privée.
On prétend souvent, au moins implicitement, que d'autres peuvent reconnaître cette beauté.

## 8. L'art comme imitation ou création
### Mimèsis
Chez Platon et Aristote, l'art est souvent pensé comme imitation.

### Hegel
Chez Hegel, l'art est une manifestation sensible de l'esprit.

L'art ne copie donc pas seulement le réel : il peut l'interpréter, le transformer et lui donner sens.

### Art et vérité
Une œuvre peut révéler quelque chose du monde, de l'homme, du temps ou de la condition humaine.
L'art n'est donc pas étranger à la vérité, même si sa vérité n'est pas celle de la science.

## 9. Fonction de l'art
L'art peut :
- émouvoir
- révéler une vérité humaine
- critiquer la société
- exprimer l'imaginaire

## 10. Méthode de réflexion
Pour un sujet sur la science ou l'art :

1. définir clairement les notions
2. distinguer science, vérité, art, beauté
3. poser le problème central
4. confronter plusieurs thèses
5. conclure avec nuance

### Erreurs fréquentes
- opposer trop vite science et philosophie ;
- réduire l'art à la décoration ;
- confondre beau, utile et agréable ;
- croire qu'une théorie scientifique est vraie une fois pour toutes.

## 11. Repères et questions utiles
### Quelques repères
- **Descartes** valorise la clarté, la méthode et l'évidence.
- **Claude Bernard** insiste sur la démarche expérimentale.
- **Karl Popper** fait de la réfutabilité un critère du savoir scientifique.
- **Thomas Kuhn** montre que les sciences évoluent aussi par changements de paradigme.
- **Platon** se méfie de l'art comme imitation éloignée de la vérité.
- **Kant** analyse le beau comme un jugement désintéressé.

### Questions classiques
- La science dit-elle toute la vérité sur le réel ?
- Peut-on parler d'une vérité absolue en science ?
- L'art doit-il imiter la réalité ?
- Le beau est-il seulement affaire de goût ?
- Le progrès scientifique garantit-il le progrès humain ?

## 12. À retenir
- l'épistémologie réfléchit sur la science
- la vérité peut recevoir plusieurs sens
- la science repose sur des méthodes rigoureuses mais révisables
- l'art ne se réduit ni à l'utile ni à l'agréable`,
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

## Objectifs du chapitre
- Situer la naissance du surréalisme dans son contexte historique et culturel.
- Comprendre les grands principes du mouvement.
- Identifier les procédés d'écriture et d'image propres aux surréalistes.
- Être capable d'exploiter ces notions dans un sujet de dissertation, de commentaire ou de résumé.

## 1. Contexte historique et origine
Le surréalisme apparaît dans l'entre-deux-guerres, à une époque marquée par la crise des valeurs, le traumatisme de la Première Guerre mondiale et le rejet des certitudes rationnelles. Il prolonge certains aspects du mouvement Dada, mais il s'en distingue par un projet plus construit : explorer l'esprit humain et transformer la vie.

Le texte fondateur est le **Premier Manifeste du surréalisme** publié par **André Breton en 1924**. Un **Second Manifeste** paraît en **1930**. Le mouvement touche d'abord la littérature, puis la peinture, la photographie, le cinéma et même la réflexion politique.

## 2. Définition et vision du monde
Breton définit le surréalisme comme un **automatisme psychique pur**, c'est-à-dire une tentative d'exprimer le fonctionnement réel de la pensée sans le contrôle de la raison ni les contraintes morales ou esthétiques.

Le mot **surréalisme** signifie littéralement ce qui est **au-dessus du réel** ou **au-delà du réel visible**. Il ne s'agit pas de fuir la réalité, mais d'en découvrir une dimension plus profonde grâce au rêve, au désir, à l'inconscient et à l'imagination.

## 3. Les principes essentiels du surréalisme
### a. L'écriture automatique
L'écriture automatique consiste à écrire rapidement, en laissant venir les mots, les images et les associations sans les corriger immédiatement. Cette pratique vise à libérer l'inconscient et à contourner la censure de la raison.

### b. Le rêve et l'inconscient
Les surréalistes sont fortement influencés par la psychanalyse de **Sigmund Freud**. Le rêve devient une source de vérité poétique, car il révèle des désirs cachés, des peurs, des souvenirs et des images inattendues.

### c. Le hasard objectif
Le hasard objectif désigne des rencontres ou des coïncidences qui semblent avoir un sens secret. Les surréalistes considèrent que certaines surprises de la vie quotidienne révèlent des liens profonds entre le réel et le désir.

### d. La révolte contre l'ordre établi
Le surréalisme refuse les normes bourgeoises, la logique trop rigide, les conventions morales et les formes artistiques figées. Il valorise la liberté, la créativité et l'audace.

## 4. Les procédés d'écriture et d'expression
Les textes surréalistes se reconnaissent souvent par :
- des **images insolites** et des associations inattendues ;
- des **métaphores surprenantes** ;
- des ruptures de logique ou de syntaxe ;
- l'abondance de symboles, de visions, de fragments et d'objets détournés ;
- des pratiques collectives comme le **cadavre exquis**.

Dans un texte surréaliste, le lecteur peut être déstabilisé, mais cette déstabilisation a un sens : elle oblige à dépasser la lecture ordinaire pour entrer dans un univers plus libre.

### Effets produits sur le lecteur
Le texte surréaliste peut :
- surprendre ;
- déranger ;
- émerveiller ;
- troubler la logique habituelle ;
- ouvrir un espace d'interprétation plus large.

Le lecteur n'est plus placé devant un discours purement explicatif, mais devant une expérience poétique.

## 5. Principaux auteurs et œuvres
- **André Breton** : *Nadja*, *L'Amour fou*, *Manifestes du surréalisme*.
- **Paul Éluard** : *Capitale de la douleur*, *L'Amour la poésie*.
- **Louis Aragon** : *Le Paysan de Paris*.
- **René Char** : *Fureur et mystère*.

### Quelques repères d'analyse
- Chez **Breton**, on observe souvent le mélange entre autobiographie, rêve, hasard et quête d'absolu.
- Chez **Éluard**, le lyrisme amoureux se combine avec des images neuves et une grande liberté verbale.
- Chez **Aragon**, la ville moderne peut devenir un espace de dérive, de découverte et de fascination.
- Chez **René Char**, la densité poétique donne au langage une force à la fois mystérieuse et méditative.

Il faut aussi retenir que le surréalisme n'est pas limité à la France. Son influence s'étend à de nombreuses littératures et formes artistiques, y compris dans l'espace francophone.

## 6. Le surréalisme dans les autres arts
Le surréalisme ne se réduit pas à la poésie ou au roman.
Il touche également :
- la peinture ;
- la photographie ;
- le cinéma ;
- le collage ;
- les jeux d'écriture collectifs.

Cette extension montre qu'il s'agit moins d'un simple style que d'une manière nouvelle d'explorer l'esprit et le réel.

## 7. Ce qu'il faut savoir faire au Bac
Dans un sujet d'examen, on peut vous demander :
- de définir le surréalisme ;
- de montrer l'importance du rêve, de l'inconscient ou de l'écriture automatique ;
- d'identifier les procédés surréalistes dans un poème ou un extrait narratif ;
- de comparer le surréalisme à d'autres mouvements littéraires.

Pour bien répondre, il faut toujours :
1. situer le mouvement dans son époque ;
2. rappeler les principes essentiels ;
3. illustrer avec un auteur ou une œuvre ;
4. expliquer l'effet produit sur le lecteur.

### Formulations utiles
- "Le texte rompt avec la logique ordinaire..."
- "L'image poétique associe ici deux réalités éloignées..."
- "Le rêve devient un moyen d'exploration de l'inconscient..."
- "Le poète cherche à libérer la parole des contraintes rationnelles..."

## 8. Sujets types et pistes d'analyse
### Exemples de sujets possibles
- Montrez que le surréalisme est à la fois une révolution poétique et une révolte contre l'ordre établi.
- En quoi le rêve et l'inconscient transforment-ils l'écriture surréaliste ?
- Le surréalisme cherche-t-il à fuir le réel ou à le dépasser ?

### Réflexes d'analyse
- partir d'un procédé précis avant de généraliser ;
- relier l'image poétique à la liberté créatrice ;
- montrer que l'étrangeté produit du sens, et pas seulement de la surprise ;
- penser le surréalisme comme une vision du monde, non comme un simple style.

## 9. Erreurs fréquentes
- Confondre surréalisme et simple imagination sans règles.
- Réduire le mouvement à des textes incompréhensibles.
- Oublier le rôle de Breton et des manifestes.
- Négliger l'influence du rêve et de l'inconscient.

## 10. À retenir
Le surréalisme est un mouvement littéraire et artistique majeur du XXe siècle. Il cherche à libérer la pensée de la domination de la raison en valorisant le rêve, l'inconscient, l'écriture automatique et les images inattendues. Il représente à la fois une révolution poétique, une attitude de révolte et une nouvelle manière de regarder le monde.`,
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
      ex('Vrai ou faux – surréalisme',
        'Vrai ou faux : le surréalisme cherche uniquement à décrire la réalité visible de manière fidèle.',
        opt('Vrai', 'Faux', 'Vrai seulement dans le roman', 'Le manifeste affirme les deux'),
        'B', "C'est faux. Le surréalisme veut dépasser le réel visible pour explorer le rêve, l'inconscient, le désir et les associations inattendues.", 2),
      ex('QCM – autres arts',
        'Le surréalisme ne s\'est pas limité à la littérature. Il a aussi marqué :',
        opt('Seulement la musique religieuse', 'La peinture, la photographie et le cinéma', 'Uniquement la sculpture antique', 'Aucun autre art'),
        'B', "Le chapitre rappelle que le surréalisme a touché plusieurs arts : peinture, photographie, cinéma, collage et jeux d'écriture collectifs.", 1),
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

## Objectifs du chapitre
- Distinguer les grandes caractéristiques de la poésie, du roman et du théâtre.
- Maîtriser le vocabulaire d'analyse littéraire lié à chaque genre.
- Reconnaître les procédés propres à un texte poétique, narratif ou théâtral.
- Utiliser ces notions avec précision dans un commentaire ou une dissertation.

## 1. Notion de genre littéraire
Un **genre littéraire** regroupe des œuvres qui partagent des formes, des thèmes, des procédés et des effets dominants. Les genres ne sont pas des cases totalement fermées, mais ils permettent d'identifier les attentes du lecteur et les choix de l'auteur.

Au programme, les trois grands genres à bien maîtriser sont la **poésie**, le **roman** et le **théâtre**.

## 2. La poésie
La poésie est le genre de la sensibilité, du rythme, de la musicalité et de la concentration du langage. Elle cherche souvent à exprimer une émotion, une vision du monde ou une expérience intérieure.

### a. Les éléments de versification
- **Le vers** est l'unité rythmique du poème.
- **L'alexandrin** comporte 12 syllabes.
- **Le décasyllabe** comporte 10 syllabes.
- **L'octosyllabe** comporte 8 syllabes.
- La **strophe** est un groupement de vers.
- La **césure** coupe souvent l'alexandrin en deux hémistiches.

### b. Les rimes
La rime est le retour d'un même son à la fin de plusieurs vers.
- Rimes **plates** : AABB
- Rimes **croisées** : ABAB
- Rimes **embrassées** : ABBA

### c. Les figures de style fréquentes
- **Comparaison**
- **Métaphore**
- **Personnification**
- **Anaphore**
- **Antithèse**
- **Oxymore**
- **Allitération**
- **Assonance**

Ces procédés servent à créer des images, à renforcer une émotion, à produire une musique ou à mettre en valeur une idée.

### Registres poétiques fréquents
La poésie peut relever de plusieurs registres :
- lyrique ;
- élégiaque ;
- satirique ;
- épique ;
- engagé.

Reconnaître le registre aide à comprendre l'intention du poète et l'effet recherché.

## 3. Le roman
Le roman est un récit de fiction en prose qui met en scène des personnages dans une histoire plus ou moins longue. Il peut représenter la société, explorer la psychologie, raconter une aventure ou proposer une critique du monde.

### a. Le narrateur et le point de vue
- **Narrateur omniscient** : il sait tout des personnages et des événements.
- **Narrateur interne** : il adopte le point de vue d'un personnage.
- **Narrateur externe** : il montre les faits de l'extérieur sans entrer dans les consciences.

Bien analyser le narrateur permet de comprendre comment le récit est construit et comment le lecteur reçoit l'information.

### b. Le personnage
Le personnage se construit à travers :
- son identité ;
- son portrait physique et moral ;
- sa parole ;
- ses relations avec les autres ;
- son évolution dans le récit.

### c. Quelques types de romans
- **Roman réaliste**
- **Roman naturaliste**
- **Roman psychologique**
- **Roman historique**
- **Roman autobiographique**
- **Roman policier**

Chaque type de roman possède ses priorités esthétiques, mais tous reposent sur une organisation du récit et un travail de représentation.

### Outils d'analyse du roman
Pour commenter un extrait de roman, on peut étudier :
- la focalisation ;
- le rythme du récit ;
- la description ;
- le portrait ;
- la place du narrateur ;
- le rapport entre narration et dialogue.

## 4. Le théâtre
Le théâtre est à la fois un texte et un spectacle. Il est écrit pour être joué devant un public. Sa matière première est le **dialogue**, accompagné de **didascalies** qui précisent gestes, décors, déplacements ou intonations.

### a. Les grands genres théâtraux
- **La tragédie** : personnages élevés, conflit grave, destin, chute du héros.
- **La comédie** : situations souvent amusantes, critique des défauts humains, fin heureuse ou apaisée.
- **Le drame** : mélange de registres et recherche d'une plus grande liberté.

### b. Les règles classiques
Le théâtre classique insiste sur les **trois unités** :
- unité de temps ;
- unité de lieu ;
- unité d'action.

Il valorise aussi la vraisemblance et la bienséance.

### c. Le conflit dramatique
Le théâtre progresse grâce à un conflit entre des volontés opposées. Ce conflit structure l'action et donne son intensité aux scènes.

On peut aussi utiliser le **schéma actantiel** :
- un **sujet** cherche un **objet** ;
- il reçoit l'aide d'**adjuvants** ;
- il affronte des **opposants** ;
- l'action s'inscrit dans une relation entre **destinateur** et **destinataire**.

### Notions utiles au théâtre
Il faut aussi maîtriser :
- la **double énonciation** ;
- le **monologue** ;
- la **tirade** ;
- le **quiproquo** ;
- les **didascalies**.

Ces notions permettent de mieux analyser l'efficacité dramatique d'une scène.

## 5. Comment comparer les trois genres
### La poésie
Elle privilégie le rythme, l'image, la suggestion et la musicalité.

### Le roman
Il privilégie le récit, l'univers fictif, la durée, la construction des personnages et la narration.

### Le théâtre
Il privilégie l'action, le dialogue, la parole vivante, le conflit et la représentation scénique.

## 6. Méthode d'analyse au Bac
Pour analyser un texte, il faut d'abord identifier son genre, puis observer :
- sa forme ;
- son vocabulaire ;
- sa structure ;
- les procédés dominants ;
- l'effet produit sur le lecteur ou le spectateur.

Un bon devoir ne se contente pas de nommer les procédés : il montre à quoi ils servent.

### Exemples de questions à se poser
- Qu'est-ce qui fait la musicalité de ce poème ?
- Quel regard le narrateur impose-t-il au lecteur ?
- Comment le dialogue théâtral fait-il naître le conflit ?
- En quoi la forme choisie renforce-t-elle le sens du texte ?

## 7. Plans d'analyse utiles
### Pour un poème
- identifier le thème dominant ;
- observer rythme, images et sonorités ;
- montrer comment la forme produit une émotion ou une vision du monde.

### Pour un extrait de roman
- étudier le narrateur et la focalisation ;
- analyser la construction du personnage ou du décor ;
- expliquer l'effet produit sur le lecteur.

### Pour une scène de théâtre
- repérer le conflit ;
- étudier la parole, les didascalies et la dynamique scénique ;
- montrer comment la scène agit sur le spectateur.

## 8. Erreurs fréquentes
- Confondre narrateur et auteur.
- Réduire la poésie à la simple présence de rimes.
- Oublier que le théâtre est fait pour être joué.
- Citer une figure de style sans en expliquer l'effet.

## 9. À retenir
La poésie, le roman et le théâtre sont trois grands genres littéraires qui possèdent chacun leurs codes, leurs formes et leurs objectifs. Les maîtriser permet de mieux lire les textes, de mieux les commenter et de mieux argumenter dans les devoirs du Bac.`,
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
      ex('Vrai ou faux – théâtre',
        'Vrai ou faux : au théâtre, les didascalies donnent des indications de jeu, de geste ou de décor.',
        opt('Vrai', 'Faux', 'Vrai seulement dans la tragédie', 'Vrai seulement dans la comédie'),
        'A', "C'est vrai. Les didascalies accompagnent le dialogue et renseignent sur les gestes, le ton, les déplacements, le décor ou le contexte scénique.", 1),
      ex('QCM – genre poétique',
        'Parmi les éléments suivants, lequel relève directement de la versification ?',
        opt('Le narrateur omniscient', 'La césure', 'Le schéma actantiel', 'La double énonciation'),
        'B', "La césure est un élément de versification, notamment dans l'alexandrin. Les autres notions relèvent du roman ou du théâtre.", 1),
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

## Objectifs du chapitre
- Maîtriser la méthodologie de la dissertation, du commentaire composé et du résumé-discussion.
- Savoir organiser un devoir de manière claire et convaincante.
- Éviter les erreurs fréquentes de méthode au Baccalauréat.
- Développer une argumentation précise, cohérente et bien illustrée.

## 1. La dissertation littéraire
La dissertation est un exercice de réflexion argumentée. Elle consiste à répondre à une question posée sur la littérature, une œuvre, un genre ou une idée, en construisant un raisonnement organisé.

### a. Les étapes de préparation
Avant de rédiger, il faut :
1. lire attentivement le sujet ;
2. repérer les mots-clés ;
3. définir les notions importantes ;
4. reformuler le problème posé ;
5. chercher des idées, arguments et exemples ;
6. choisir un plan cohérent.

### b. Structure de la dissertation
#### Introduction
L'introduction comprend généralement :
- une **amorce** ;
- la **présentation du sujet** ;
- la **problématique** ;
- l'**annonce du plan**.

#### Développement
Le développement est organisé en parties et en paragraphes. Chaque partie défend une idée forte. Chaque paragraphe doit contenir :
- une idée directrice ;
- une explication ;
- un exemple précis tiré d'une œuvre ou du cours ;
- une petite conclusion partielle ou transition.

#### Conclusion
La conclusion fait :
- le bilan de la réflexion ;
- la réponse claire à la problématique ;
- éventuellement une ouverture mesurée.

### c. Les principaux types de plans
- **Plan dialectique** : thèse, antithèse, synthèse.
- **Plan thématique** : étude de plusieurs aspects complémentaires d'un sujet.
- **Plan analytique** : causes, manifestations, conséquences ou problèmes, analyses, solutions.

Le choix du plan dépend du sujet. Un bon plan répond exactement à la question posée.

### d. Ce qui fait une bonne dissertation
Une bonne dissertation ne juxtapose pas des idées apprises par cœur.
Elle construit progressivement une réponse à une question précise.
Chaque partie doit donc faire avancer le raisonnement.

### e. Les exemples littéraires
Un bon devoir de français s'appuie sur des références précises.
Il vaut mieux quelques exemples bien exploités que beaucoup d'œuvres simplement citées.
L'exemple doit toujours servir l'argument.

## 2. Le commentaire composé
Le commentaire composé consiste à analyser un texte littéraire pour montrer comment il produit du sens et des effets. Il ne s'agit pas de raconter le texte, mais de l'étudier.

### a. Travail préparatoire
Il faut d'abord :
- lire plusieurs fois le texte ;
- identifier le genre, le thème, le ton, le registre ;
- relever les procédés importants ;
- dégager une problématique ;
- construire deux ou trois axes d'analyse.

### b. Structure du commentaire
#### Introduction
- présentation du texte et de l'auteur si nécessaire ;
- situation de l'extrait ;
- annonce de la problématique ;
- annonce des axes.

#### Développement
Chaque axe rassemble plusieurs remarques organisées autour d'une idée forte. On appuie l'analyse sur des citations courtes et précises.

La bonne méthode est :
**citer -> observer -> interpréter -> montrer l'effet produit**.

### d. Ce qu'il faut éviter
- paraphraser le texte ;
- aligner des procédés sans interprétation ;
- citer trop longuement ;
- perdre de vue la problématique.

### e. Les bons réflexes
- annoncer clairement l'idée du paragraphe ;
- citer brièvement ;
- commenter immédiatement la citation ;
- relier l'analyse à la problématique générale.

#### Conclusion
La conclusion résume les résultats de l'analyse et peut ouvrir sur une autre perspective.

### c. Ce qu'on attend vraiment
Un bon commentaire doit :
- rester fidèle au texte ;
- organiser les remarques ;
- éviter la paraphrase ;
- expliquer en quoi les procédés sont significatifs.

## 3. Le résumé de texte
Le résumé consiste à condenser fidèlement un texte en respectant sa pensée et sa progression.

### Règles essentielles
- ne pas donner son avis ;
- ne pas ajouter d'exemple personnel ;
- ne pas supprimer les idées essentielles ;
- reformuler avec ses propres mots ;
- respecter le volume demandé.

Dans beaucoup de cas, on demande de ramener le texte à **un quart** de sa longueur.

### Méthode pratique
1. Lire le texte pour en saisir l'idée générale.
2. Repérer les idées essentielles paragraphe par paragraphe.
3. Éliminer répétitions, exemples secondaires et détails accessoires.
4. Reformuler de façon claire et concise.
5. Vérifier la fidélité au texte de départ.

### Difficulté principale
Le résumé demande à la fois fidélité et reformulation.
Il faut être précis sans recopier, synthétique sans trahir, et bref sans appauvrir la pensée.

### Astuce utile
Après un premier résumé, il faut relire en vérifiant trois points :
- ai-je gardé toutes les idées essentielles ?
- ai-je supprimé les détails secondaires ?
- ai-je respecté l'ordre logique du texte ?

## 4. La discussion
La discussion prolonge parfois le résumé. Elle demande au candidat de réagir à une idée du texte par une argumentation personnelle.

Il faut alors :
- formuler clairement sa position ;
- organiser ses arguments ;
- illustrer par des exemples pertinents ;
- rester mesuré, logique et cohérent.

### Esprit de la discussion
Il ne s'agit pas d'écrire une opinion vague.
Il faut partir d'une idée du texte, prendre position et construire une argumentation personnelle, organisée et nuancée.

Il faut aussi éviter le ton polémique ou purement affectif : une discussion réussie reste argumentée, claire et mesurée.

## 5. Conseils de rédaction
- Soigner l'introduction et la conclusion.
- Utiliser des connecteurs logiques.
- Éviter les phrases trop longues ou vagues.
- Employer un vocabulaire précis.
- Illustrer les arguments avec des œuvres, auteurs ou textes étudiés.
- Relire pour corriger fautes, répétitions et maladresses.

### Formulations utiles
Pour annoncer une idée :
- "On peut d'abord montrer que..."
- "Cependant, cette thèse rencontre une limite..."
- "Il convient enfin de dépasser cette opposition..."

Pour commenter un texte :
- "Ce procédé met en valeur..."
- "L'auteur suggère ainsi que..."
- "On voit ici apparaître..."

## 6. Gérer son temps le jour de l'épreuve
Une bonne copie dépend aussi de l'organisation du temps.

### Répartition conseillée
- prendre quelques minutes pour lire et analyser le sujet ;
- réserver un vrai temps de brouillon pour trouver la problématique et le plan ;
- garder l'essentiel du temps pour un développement soigné ;
- conserver quelques minutes finales pour la relecture.

### Réflexes utiles
- ne pas commencer à rédiger avant d'avoir une direction claire ;
- éviter de passer trop de temps sur l'introduction ;
- surveiller l'équilibre entre les parties ;
- relire les transitions et la conclusion.

## 7. Petite boîte à outils pour la rédaction
### Connecteurs logiques utiles
- addition : "de plus", "en outre", "par ailleurs"
- opposition : "cependant", "pourtant", "toutefois", "en revanche"
- conséquence : "ainsi", "donc", "par conséquent"
- conclusion : "en somme", "au total", "en définitive"

### Ce qui rend une copie convaincante
- une problématique nette ;
- des parties équilibrées ;
- des exemples précis ;
- des transitions visibles ;
- une expression simple, correcte et rigoureuse.

## 8. Erreurs fréquentes
- Hors-sujet parce que la problématique n'a pas été comprise.
- Récitation du cours sans lien avec la question.
- Paraphrase du texte au lieu d'analyse.
- Arguments sans exemples.
- Résumé infidèle ou trop long.
- Plan déséquilibré ou mal annoncé.

## 9. À retenir
La réussite en français dépend autant de la culture littéraire que de la méthode. Un candidat efficace comprend le sujet, construit un plan adapté, rédige avec clarté et appuie ses idées sur des exemples précis. La dissertation, le commentaire et le résumé-discussion exigent tous rigueur, logique et expression correcte.`,
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
      ex('Vrai ou faux – résumé',
        'Vrai ou faux : dans un résumé de texte, on peut ajouter librement ses propres exemples pour clarifier l\'idée.',
        opt('Vrai', 'Faux', 'Vrai seulement si le texte est difficile', 'Vrai si le résumé est très court'),
        'B', "C'est faux. Le résumé doit rester fidèle au texte de départ : il ne faut ni ajouter d'exemples personnels ni donner son avis.", 2),
      ex('QCM – gestion du temps',
        'Quel est un bon réflexe méthodologique le jour de l\'épreuve ?',
        opt('Rédiger immédiatement sans brouillon', 'Garder quelques minutes finales pour la relecture', 'Passer tout son temps sur l\'introduction', 'Éviter les transitions pour aller plus vite'),
        'B', "Le cours insiste sur l'importance d'une bonne gestion du temps, y compris quelques minutes finales pour relire la copie, corriger les fautes et vérifier l'équilibre du devoir.", 1),
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

## Learning goals
- Master key vocabulary related to trade, economy, jobs and leisure.
- Use modal verbs, conditional sentences and reported speech correctly.
- Speak and write about social and economic issues in clear English.
- Prepare for comprehension, essay writing and oral production at BAC level.

## 1. Trade and professions
This topic helps students discuss business activities, jobs and economic exchanges between countries.

### Key vocabulary
- imports / exports
- trade balance
- tariffs
- free trade
- multinational company
- entrepreneur
- unemployment
- salary / wage
- supply and demand

### Useful ideas
Trade connects countries, creates jobs and allows access to goods and services. However, trade can also produce inequalities, unfair competition or dependence on foreign products.

### Useful sentences
- *Senegal exports fish, peanuts and other products.*
- *Many young people want to become entrepreneurs.*
- *Governments should support local industries.*

### Expressing opinion
- *In my opinion, trade can create opportunities.*
- *I think unemployment is one of the biggest social issues.*
- *From my point of view, young people need more professional training.*

## 2. Economy
Students must be able to describe the economy of a country, its problems and possible solutions.

### Key vocabulary
- GDP
- inflation
- recession
- development
- poverty
- inequality
- investment
- budget
- public debt
- growth

### Talking about economic issues
When discussing the economy, students should link facts and consequences:
- *Inflation reduces purchasing power.*
- *Investment can create jobs.*
- *If a country improves education, it may develop faster.*

### Useful connectors
- *because*
- *therefore*
- *however*
- *as a result*
- *on the one hand / on the other hand*

## 3. Free time and leisure
This topic is closer to students' daily lives and often appears in writing or oral tasks.

### Key vocabulary
- hobbies
- sports
- music
- entertainment
- tourism
- internet
- social media
- relaxation

### Communicative use
Students should be able to:
- describe hobbies and preferences;
- explain how they spend their free time;
- discuss the positive and negative effects of social media and entertainment.

### Sample speaking ideas
- *In my free time, I usually...*
- *Leisure activities help young people relax and develop social skills.*
- *Social media can be useful, but it can also waste time.*

## 4. Grammar focus: modal verbs
Modal verbs express ability, obligation, advice, permission or possibility.

### Main modals
- **can / could**: ability or possibility
- **must**: strong obligation
- **should**: advice
- **may / might**: possibility

### Examples
- *Students must work hard to pass the BAC.*
- *Young people should use social media responsibly.*
- *Senegal can develop renewable energy.*
- *The government might reduce taxes.*

## 5. Grammar focus: conditional sentences
### Conditional type 2
Used for unreal or hypothetical situations in the present.
Structure: **If + past simple, would + infinitive**

Example:
- *If Senegal increased exports, it would reduce the trade deficit.*

### Conditional type 3
Used for unreal situations in the past.
Structure: **If + past perfect, would have + past participle**

Example:
- *If they had invested more in education, literacy would have improved.*

## 6. Grammar focus: gerunds and infinitives
Some verbs are followed by a gerund, others by an infinitive.

### Common patterns
- *enjoy + verb-ing*
- *avoid + verb-ing*
- *want + to + verb*
- *decide + to + verb*

Examples:
- *I enjoy playing football.*
- *She wants to study economics.*

## 7. Grammar focus: reported speech
Reported speech is used to report what someone said without repeating the exact words.

### Main changes
- present -> past
- present continuous -> past continuous
- will -> would
- can -> could

Examples:
- *"I am working."* -> He said he **was working**.
- *"We will come."* -> They said they **would come**.

Pronouns and time expressions may also change:
- *today* -> *that day*
- *tomorrow* -> *the next day*

## 8. Method for BAC tasks
In writing or speaking, students should:
1. introduce the topic clearly;
2. use relevant vocabulary;
3. give examples;
4. express cause, consequence or opinion;
5. conclude with a clear idea.

### Helpful expressions for BAC writing
- *First of all...*
- *Another important point is...*
- *For example...*
- *As a consequence...*
- *To conclude...*

### Speaking and debate toolkit
Students should also know how to react orally in a simple but natural way.

- *I agree with this idea because...*
- *I partly agree, but we should also consider...*
- *In everyday life, we can see that...*
- *This problem affects young people in many ways.*
- *A possible solution would be to...*

### Paragraph model
A short BAC paragraph can follow this pattern:
1. state the idea;
2. explain it;
3. give one example;
4. add a concluding sentence.

Example:
*Unemployment is a major problem in many countries. It affects young people more than adults because they often lack experience. For example, many graduates struggle to find their first job. This is why professional training is essential.*

## 9. Common mistakes
- Mixing up *must* and *should*.
- Using *will* instead of *would* in type 2 conditionals.
- Forgetting tense changes in reported speech.
- Writing short answers without explanation.

## 10. What to remember
This chapter develops the language needed to discuss trade, jobs, economy and leisure. At BAC level, students must combine vocabulary with grammar accuracy and be able to explain social realities in simple, correct and organised English.`,
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

## Learning goals
- Use vocabulary related to science, health and communication.
- Understand and apply the passive voice, present perfect, relative clauses and question tags.
- Discuss technological progress and health challenges in clear English.
- Improve written and oral expression on modern social issues.

## 1. Science and technology
Science and technology play a major role in development. They improve communication, medicine, transport, agriculture and education.

### Key vocabulary
- invention
- discovery
- research
- innovation
- artificial intelligence
- robotics
- laboratory
- digital technology
- experiment
- space exploration

### Communicative objectives
Students should be able to:
- describe inventions and discoveries;
- explain the importance of scientific progress;
- mention the advantages and risks of technology.

Examples:
- *Technology has changed the way people learn.*
- *Artificial intelligence can improve productivity.*
- *Scientific research is essential for development.*

## 2. Health
This topic helps students speak about diseases, prevention and public health policies.

### Key vocabulary
- disease
- prevention
- treatment
- vaccination
- malaria
- HIV/AIDS
- malnutrition
- public health
- hygiene
- awareness campaign

### Main ideas
Health is not only a personal issue but also a social issue. Governments, schools, hospitals and communities all play a role in prevention.

Examples:
- *Vaccination prevents many diseases.*
- *Malaria remains a major health problem in Africa.*
- *Public awareness can save lives.*

## 3. Information and communication
Modern life is deeply influenced by communication technologies.

### Key vocabulary
- internet
- smartphone
- social networks
- media
- cybercrime
- digital divide
- online learning
- broadcasting
- information access

### Main issues
Communication technologies make information easier to access, but they can also spread false news, addiction or online insecurity.

### Useful discussion points
- technology improves learning opportunities
- access remains unequal in many regions
- communication tools can both connect and isolate people

## 4. Grammar focus: passive voice
The passive voice is used when the action is more important than the doer.

### Structure
**subject + be + past participle**

Examples:
- *Scientists discovered penicillin in 1928.*  
  -> *Penicillin was discovered in 1928.*
- *Researchers are testing a vaccine.*  
  -> *A vaccine is being tested.*

The passive is common in scientific and formal English because it focuses on results.

## 5. Grammar focus: present perfect
The present perfect links the past to the present.

### Structure
**have/has + past participle**

Examples:
- *Scientists have developed a new vaccine.*
- *Technology has transformed communication.*

It is often used for recent events, life experience or past actions with present relevance.

## 6. Grammar focus: relative clauses
Relative clauses give extra information about a person, thing, place or possession.

### Main pronouns
- **who** for people
- **which / that** for things
- **whose** for possession
- **where** for place

Examples:
- *The scientist who discovered penicillin became famous.*
- *The phone that you bought is very fast.*
- *The village where I was born has electricity now.*

## 7. Grammar focus: question tags
Question tags are short questions added at the end of a sentence to seek confirmation.

### Rule
- positive statement -> negative tag
- negative statement -> positive tag

Examples:
- *You live in Dakar, don't you?*
- *She isn't coming, is she?*

Question tags are frequent in spoken English and help make communication more natural.

## 8. Skills for the BAC
Students may be asked to:
- write about a scientific invention;
- discuss health problems in Africa;
- explain the benefits and dangers of the internet;
- complete grammar exercises using passive forms or relative clauses.

To succeed, they should combine relevant vocabulary, clear sentences and well-structured ideas.

### Helpful expressions
- *It is often said that...*
- *One major advantage is...*
- *A serious drawback is...*
- *This shows that...*

### Useful oral expressions
- *Nowadays, technology plays a central role in our lives.*
- *On the one hand..., on the other hand...*
- *This development can improve..., but it may also create...*
- *In the field of health, prevention is better than cure.*
- *Access to technology should be improved for everyone.*

### How to build a balanced answer
When students discuss science or health, they should try to present:
1. one benefit;
2. one limitation or danger;
3. one concrete example;
4. one short conclusion.

This makes the answer clearer, more mature and easier to follow.

## 9. Common mistakes
- Confusing active and passive forms.
- Using the simple past instead of the present perfect.
- Mixing *who* and *which*.
- Forming incorrect question tags.

## 10. What to remember
This chapter prepares students to talk about modern life through science, technology, health and communication. It also strengthens important grammar structures often tested in BAC exercises and useful in everyday English.`,
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

## Learning goals
- Speak and write about culture, heritage, change and education.
- Use the past perfect and connectors of contrast correctly.
- Organise a short English essay with clear arguments.
- Develop accurate vocabulary on identity, history and schooling.

## 1. Cultural heritage
Cultural heritage includes what a people receives from the past and transmits to the next generation: languages, beliefs, customs, monuments, music, literature and values.

### Key vocabulary
- tradition
- heritage
- culture
- identity
- language
- religion
- festival
- independence
- colonisation

### Main ideas
Heritage helps people understand who they are. It creates national identity and social cohesion. At the same time, modern societies must preserve heritage while adapting to change.

Examples:
- *Gorée Island is part of Senegal's historical heritage.*
- *Traditional music is an important element of cultural identity.*

## 2. Events and changes
This topic focuses on social, political and historical transformations.

### Key vocabulary
- decolonisation
- civil rights
- revolution
- globalisation
- migration
- urbanisation
- environmental change
- independence

### Communicative use
Students should be able to explain:
- how societies change over time;
- how colonisation and independence shaped African countries;
- how globalisation affects traditions and ways of life.

## 3. Education
Education is a major theme because it is linked to development, citizenship and professional success.

### Key vocabulary
- literacy
- scholarship
- university
- vocational training
- distance learning
- curriculum
- school dropout
- equal opportunity

### Main ideas
Education helps reduce poverty, improve health and promote development. However, many countries still face problems such as lack of infrastructure, unequal access or school dropout.

### Possible discussion angles
- girls' education
- equal access to school
- quality of teaching
- digital learning
- vocational training

## 4. Grammar focus: past perfect
The past perfect expresses an action completed before another action in the past.

### Structure
**had + past participle**

Examples:
- *By 1960, Senegal had gained its independence.*
- *When he arrived, the ceremony had already started.*

This tense is useful when telling historical events in sequence.

## 5. Grammar focus: contrast and concession
To write more mature English, students must show opposition and nuance.

### Main connectors
- **although / even though** + clause
- **despite / in spite of** + noun or gerund
- **however / nevertheless** between sentences

Examples:
- *Although Africa is rich in resources, many people live in poverty.*
- *Despite progress, many schools still lack equipment.*
- *Education has improved. However, inequalities remain.*

## 6. Cause and effect
Students should also use connectors that explain relations between ideas.

### Useful connectors
- because
- since
- therefore
- as a result
- consequently

Examples:
- *Many children drop out of school because their families are poor.*
- *Urbanisation has increased; as a result, cities are expanding rapidly.*

## 7. Essay writing skills
At BAC level, students may write a short essay to express an opinion or discuss a topic.

### Basic structure
1. **Introduction**: introduce the topic and state the main idea.
2. **Body paragraphs**: each paragraph contains a point, evidence and explanation.
3. **Conclusion**: summarise the main argument and end clearly.

### PEE method
- **Point**
- **Evidence**
- **Explanation**

This method helps students avoid vague writing and produce organised paragraphs.

### Useful essay phrases
- *Nowadays, many people believe that...*
- *There are several reasons for this.*
- *For instance...*
- *In contrast...*
- *In conclusion...*

## 8. Skills expected at the BAC
Students may be asked to:
- discuss the importance of culture or education;
- describe a social change;
- write about school challenges;
- compare tradition and modernity.

They should aim for simple, correct and meaningful English rather than overly complex sentences.

### What examiners usually value
- clarity of ideas
- correct grammar
- relevant vocabulary
- logical paragraphing
- coherent conclusion

### Useful expressions for essays and oral work
- *Cultural heritage should be preserved because it shapes identity.*
- *Education remains one of the keys to development.*
- *Although progress has been made, many challenges remain.*
- *This situation has changed over time.*
- *If more students had access to school, society would benefit.*

### A simple argumentative pattern
For many BAC topics, students can organise their answer like this:
1. introduce the theme;
2. explain why it matters;
3. present an example from Senegal, Africa or daily life;
4. mention a challenge or limit;
5. end with a constructive conclusion.

## 9. Common mistakes
- Using simple past instead of past perfect when sequence matters.
- Confusing *although* and *despite*.
- Writing essays without clear paragraph structure.
- Using vocabulary without context or explanation.

## 10. What to remember
This chapter brings together language for discussing identity, historical change and education. It is important because it prepares students to speak about society in a thoughtful way while strengthening grammar, connectors and essay organisation.`,
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

## Objectifs du chapitre
- Expliquer les causes et les formes de la décolonisation après 1945.
- Situer les grandes étapes de l'indépendance en Asie et en Afrique.
- Comprendre la naissance du Tiers-Monde et du non-alignement.
- Relier l'histoire mondiale au cas du Sénégal.

## 1. Contexte général après 1945
Au lendemain de la Seconde Guerre mondiale, les empires coloniaux européens sont fragilisés. La guerre a affaibli économiquement et moralement les puissances coloniales, tandis que les peuples colonisés réclament davantage de liberté, de justice et d'égalité.

La période 1945-1975 correspond à la grande vague de décolonisation en Asie puis en Afrique.

## 2. Les causes de la décolonisation
### a. L'affaiblissement des métropoles
La France, le Royaume-Uni, la Belgique ou les Pays-Bas sortent affaiblis du conflit mondial. Ils ont moins de moyens pour maintenir leur domination.

### b. La montée des nationalismes
Dans les colonies, des élites politiques, syndicales et intellectuelles revendiquent l'autonomie puis l'indépendance. Elles s'appuient sur le sentiment national, l'injustice coloniale et l'aspiration à la souveraineté.

### c. Le rôle du contexte international
La Charte de l'ONU de 1945 affirme le droit des peuples à disposer d'eux-mêmes. Les États-Unis et l'URSS critiquent aussi les vieux empires coloniaux, même si chacun agit selon ses propres intérêts stratégiques.

## 3. Les formes de la décolonisation
La décolonisation ne suit pas partout le même chemin.

### Décolonisation pacifique
Certaines colonies accèdent à l'indépendance par négociation, par exemple plusieurs territoires d'Afrique noire française ou britannique.

### Décolonisation violente
Dans d'autres cas, elle passe par de longues guerres, comme en Indochine ou en Algérie. Ces conflits montrent la résistance des métropoles et la détermination des mouvements indépendantistes.

## 4. La décolonisation en Asie
L'Asie ouvre la voie dès les années 1940.

- **1947** : indépendance de l'Inde et création du Pakistan.
- **1949** : indépendance de l'Indonésie vis-à-vis des Pays-Bas.
- **1954** : fin de la guerre d'Indochine avec les accords de Genève.

L'Asie devient ainsi un espace majeur d'affirmation des peuples anciennement colonisés.

### Acteurs importants
- Gandhi : lutte non violente
- Nehru : construction de l'Inde indépendante
- Hô Chi Minh : combat anticolonial en Indochine
- Soekarno : figure de l'indépendance indonésienne

## 5. La décolonisation en Afrique
En Afrique, le mouvement s'accélère surtout dans les années 1950 et 1960.

- **1956** : indépendance du Maroc et de la Tunisie.
- **1957** : indépendance du Ghana, premier État d'Afrique noire britannique indépendant.
- **1960** : "année de l'Afrique", avec de nombreuses indépendances.

La décolonisation africaine est diverse : certaines indépendances sont négociées, d'autres arrachées dans la violence.

### Diversité des situations
L'Afrique du Nord, l'Afrique noire, les colonies portugaises ou l'Afrique australe n'évoluent pas au même rythme. Il faut donc éviter toute vision uniforme du continent.

## 6. Bandung et la naissance du Tiers-Monde
En **avril 1955**, la conférence de **Bandung** en Indonésie réunit 29 pays d'Asie et d'Afrique. C'est un moment politique majeur.

### Principes défendus
- respect de la souveraineté
- non-agression
- non-ingérence
- égalité entre les nations
- coexistence pacifique

Bandung donne une visibilité internationale aux peuples du Sud et prépare l'affirmation du **Tiers-Monde**, expression proposée par **Alfred Sauvy** en 1952.

## 7. Le non-alignement
Le mouvement des non-alignés est officiellement structuré en **1961 à Belgrade**. Il regroupe des pays qui refusent de s'aligner sur le bloc américain ou sur le bloc soviétique.

Le non-alignement ne signifie pas neutralité absolue, mais volonté d'autonomie politique, diplomatique et économique.

Parmi ses grandes figures, on retient :
- Nehru
- Nasser
- Tito
- Soekarno

## 8. L'indépendance du Sénégal
Le Sénégal obtient son indépendance dans le contexte général de la décolonisation africaine.

### Repères essentiels
- **4 avril 1960** : proclamation de l'indépendance au sein de la Fédération du Mali.
- **20 août 1960** : éclatement de la Fédération du Mali.
- **Léopold Sédar Senghor** devient le premier président de la République du Sénégal.

Le Sénégal se distingue par un accès relativement pacifique à l'indépendance, même si cette évolution s'inscrit dans un long processus politique.

## 9. Conséquences de la décolonisation
La décolonisation transforme profondément le monde :
- disparition progressive des grands empires coloniaux
- multiplication des États indépendants
- entrée des pays du Sud dans les relations internationales
- naissance de nouveaux défis : développement, unité nationale, dépendance économique

### Limites des indépendances
L'indépendance politique n'entraîne pas toujours une indépendance économique réelle. Beaucoup de nouveaux États restent dépendants des anciennes puissances, des marchés extérieurs ou des aides internationales.

## 10. Méthode pour un devoir
Pour traiter un sujet sur la décolonisation, il faut :
1. définir le terme ;
2. situer la période ;
3. montrer les causes ;
4. distinguer les formes de décolonisation ;
5. donner des exemples précis ;
6. ouvrir sur le Tiers-Monde et le non-alignement.

### Repères à maîtriser
- 1947 : indépendance de l'Inde
- 1955 : Bandung
- 1960 : année de l'Afrique
- 1961 : Belgrade
- 4 avril 1960 : indépendance du Sénégal

### Formulations utiles dans une copie
- "La décolonisation s'explique à la fois par l'affaiblissement des métropoles et par la montée des nationalismes."
- "Il faut distinguer les indépendances négociées des indépendances conquises par la guerre."
- "Bandung marque une étape décisive dans l'affirmation politique des peuples du Sud."
- "L'indépendance politique ne supprime pas automatiquement les dépendances économiques."

## 11. Erreurs fréquentes
- Confondre décolonisation et simple changement administratif.
- Oublier que les indépendances n'ont pas toutes été pacifiques.
- Réduire Bandung à une simple réunion diplomatique.
- Négliger le cas du Sénégal dans le contexte africain.

## 12. À retenir
La décolonisation est l'un des grands bouleversements du XXe siècle. Elle marque la fin des empires coloniaux, l'émergence du Tiers-Monde et l'entrée de nombreux États africains et asiatiques sur la scène internationale.`,
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

## Objectifs du chapitre
- Définir la Guerre froide et ses caractéristiques.
- Comprendre la formation des deux blocs.
- Identifier les grandes crises et les phases d'apaisement.
- Expliquer les causes de la fin du monde bipolaire.

## 1. Définition de la Guerre froide
La Guerre froide est un affrontement durable entre les **États-Unis** et l'**URSS** de **1947 à 1991**. Cet affrontement est idéologique, politique, économique, diplomatique, militaire et technologique, mais il n'oppose presque jamais directement les deux superpuissances sur le champ de bataille.

On parle donc de "guerre" par la tension permanente, et de "froide" parce qu'il n'y a pas de guerre directe totale entre les deux camps.

## 2. La formation des deux blocs
Après 1945, les anciens alliés de la Seconde Guerre mondiale deviennent des adversaires.

### a. Le bloc occidental
Dirigé par les États-Unis, il défend :
- la démocratie libérale
- l'économie de marché
- l'influence politique et militaire américaine

### b. Le bloc soviétique
Dirigé par l'URSS, il repose sur :
- le parti unique
- l'économie planifiée
- l'extension du modèle communiste

### c. Les textes et décisions fondatrices
- **Discours de Fulton** de Churchill en 1946 : dénonciation du rideau de fer.
- **Doctrine Truman** en 1947 : politique de containment.
- **Plan Marshall** en 1947 : aide américaine à l'Europe occidentale.
- **Doctrine Jdanov** en 1947 : réponse idéologique soviétique.

## 3. Le monde bipolaire
Le monde se structure autour de deux pôles opposés.

### Alliances militaires
- **OTAN** en 1949 pour le camp occidental
- **Pacte de Varsovie** en 1955 pour le camp soviétique

### Une rivalité globale
La compétition concerne :
- l'Europe
- l'Asie
- l'Afrique
- l'Amérique latine
- l'espace et la technologie

### Logique d'affrontement
La Guerre froide ne se réduit pas à des discours idéologiques : elle se traduit aussi par des alliances, des aides économiques, des coups d'État soutenus de l'extérieur, des guerres périphériques et une propagande intense.

## 4. Les grandes crises de la Guerre froide
### Berlin
Berlin est un lieu symbolique majeur de la division du monde.
- **1948-1949** : blocus de Berlin
- **1961** : construction du mur de Berlin

### La guerre de Corée
De **1950 à 1953**, elle oppose indirectement les deux blocs et montre que la Guerre froide peut provoquer des guerres périphériques très violentes.

### La crise de Cuba
En **octobre 1962**, l'installation de missiles soviétiques à Cuba provoque la plus grave crise de la Guerre froide. Le monde frôle alors la guerre nucléaire.

## 5. La course aux armements et à l'espace
Les deux superpuissances cherchent à prouver leur supériorité.

### Armements
La possession de l'arme nucléaire crée un équilibre de la terreur. Chaque camp peut détruire l'autre, ce qui dissuade l'affrontement direct.

### Conquête spatiale
- **1957** : Spoutnik 1 lancé par l'URSS
- **1961** : Youri Gagarine, premier homme dans l'espace
- **1969** : les États-Unis marchent sur la Lune

### Enjeu symbolique
La conquête spatiale n'est pas seulement scientifique. Elle sert à démontrer la puissance technique, militaire et idéologique de chaque bloc.

## 6. La détente
À partir des années 1960-1970, les deux camps cherchent par moments à réduire les tensions.

### Quelques repères
- téléphone rouge après Cuba
- **Accords SALT** en 1972
- **Accords d'Helsinki** en 1975

La détente n'efface pas la rivalité, mais elle en limite certains risques.

## 7. La reprise des tensions et l'effondrement du bloc soviétique
À la fin des années 1970, les tensions reprennent. Puis l'URSS s'affaiblit.

### Facteurs de crise du bloc soviétique
- difficultés économiques
- retard technologique
- contestations internes
- coût de la course aux armements

### Réformes de Gorbatchev
- **Perestroïka**
- **Glasnost**

Ces réformes accélèrent les transformations sans sauver le système.

### Pays de l'Est
L'effondrement du bloc soviétique s'explique aussi par la contestation dans les démocraties populaires d'Europe de l'Est, où les régimes communistes perdent progressivement leur légitimité.

## 8. La fin de la Guerre froide
Plusieurs dates sont essentielles :
- **9 novembre 1989** : chute du mur de Berlin
- **1990** : réunification allemande
- **1991** : disparition de l'URSS

Le monde bipolaire prend fin et les États-Unis apparaissent alors comme la seule superpuissance.

## 9. Méthode pour réussir au Bac
Dans un devoir, il faut :
1. définir la Guerre froide ;
2. montrer la bipolarisation du monde ;
3. illustrer avec des crises précises ;
4. distinguer tension, détente et fin du conflit ;
5. utiliser les bonnes dates.

### Dates-clés à connaître
- 1947 : doctrine Truman et plan Marshall
- 1948-1949 : blocus de Berlin
- 1962 : crise de Cuba
- 1972 : accords SALT
- 1989 : chute du mur de Berlin
- 1991 : disparition de l'URSS

### Formulations utiles dans une copie
- "La Guerre froide est un affrontement global qui oppose deux modèles de société."
- "La bipolarisation du monde se traduit par des alliances, des crises et une forte compétition idéologique."
- "La détente limite les risques sans faire disparaître la rivalité entre les deux blocs."
- "La fin de la Guerre froide résulte à la fois de l'affaiblissement soviétique et des transformations de l'Europe de l'Est."

## 10. Erreurs fréquentes
- Dire que les États-Unis et l'URSS se sont affrontés directement dans une guerre mondiale.
- Oublier l'importance des doctrines de 1947.
- Confondre chute du mur de Berlin et dissolution de l'URSS.
- Réduire la Guerre froide à l'Europe uniquement.

## 11. À retenir
La Guerre froide a structuré les relations internationales pendant près d'un demi-siècle. Elle oppose deux modèles de société et organise le monde en deux blocs rivaux jusqu'à l'effondrement du bloc soviétique.`,
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

## Objectifs du chapitre
- Comprendre comment on mesure le développement.
- Expliquer les inégalités entre espaces du monde.
- Définir la mondialisation et ses effets.
- Situer la place de l'Afrique et du Sénégal dans le monde actuel.

## 1. Mesurer le développement
Le développement ne se réduit pas à la richesse économique. Il prend en compte le niveau de vie, la santé, l'éducation et l'accès aux services essentiels.

### Le PIB
Le **Produit Intérieur Brut** mesure la richesse produite dans un pays pendant une année. C'est un indicateur utile, mais incomplet : il ne mesure ni les inégalités, ni le bien-être réel, ni la qualité de l'environnement.

### L'IDH
L'**Indice de Développement Humain** a été proposé par le PNUD pour corriger cette vision trop étroite. Il combine :
- l'espérance de vie ;
- l'éducation ;
- le revenu par habitant.

L'IDH permet de mieux comparer les niveaux de développement.

## 2. Un monde marqué par de fortes inégalités
Le monde contemporain est profondément inégal.

### Les pays développés
Ils se caractérisent généralement par :
- un IDH élevé ;
- une forte urbanisation ;
- des économies dominées par les services et l'industrie avancée ;
- de bonnes infrastructures.

### Les pays en développement
Ils connaissent souvent :
- un IDH faible ou moyen ;
- des économies fragiles ou dépendantes ;
- des difficultés d'accès à l'éducation, à la santé ou à l'emploi.

### Les pays émergents
Les pays émergents connaissent une croissance rapide et un poids croissant dans la mondialisation, mais ils conservent souvent de fortes inégalités internes.

### Inégalités à plusieurs échelles
Il faut distinguer :
- les inégalités entre pays ;
- les inégalités à l'intérieur d'un même pays ;
- les inégalités entre villes et campagnes ;
- les inégalités d'accès aux services, au numérique ou à l'emploi.

## 3. Les facteurs d'inégalités
Les écarts entre pays et à l'intérieur des pays s'expliquent par plusieurs facteurs :
- héritages historiques
- niveau d'industrialisation
- accès aux ressources
- qualité de la gouvernance
- intégration plus ou moins favorable à la mondialisation

## 4. La mondialisation
La mondialisation est l'intensification des échanges de marchandises, de capitaux, d'informations, de services et de personnes à l'échelle planétaire.

### Les grands centres d'impulsion
Les principaux pôles de la mondialisation se situent dans :
- l'Amérique du Nord
- l'Europe occidentale
- l'Asie orientale et pacifique

Cette concentration des flux renforce l'idée de **triade**.

### Effets positifs
- circulation rapide des informations
- développement du commerce
- diffusion des innovations

### Effets négatifs
- aggravation de certaines inégalités
- dépendance économique
- uniformisation culturelle
- pression sur l'environnement

### Acteurs de la mondialisation
La mondialisation repose sur l'action combinée :
- des États ;
- des entreprises multinationales ;
- des organisations internationales ;
- des métropoles ;
- des réseaux de transport et de communication.

## 5. Développement durable et défis environnementaux
Le développement durable vise à répondre aux besoins du présent sans compromettre ceux des générations futures.

Les grands défis contemporains sont :
- changement climatique
- déforestation
- pollution
- désertification
- épuisement de certaines ressources

## 6. L'Afrique dans le monde
L'Afrique occupe une place de plus en plus importante dans la géographie mondiale.

### Atouts
- population jeune
- richesses minières et agricoles
- marchés en expansion
- potentiel énergétique

### Difficultés
- pauvreté persistante
- inégalités sociales
- fragilité de certains États
- pression démographique
- vulnérabilité climatique

### Une lecture nuancée
Il ne faut ni réduire l'Afrique à ses difficultés, ni l'idéaliser. Le continent combine des dynamiques de croissance, des innovations, des ressources importantes et des défis structurels majeurs.

L'Afrique n'est donc ni un continent uniforme ni un espace marginal : elle est un espace de contrastes, de défis et d'opportunités.

## 7. Le Sénégal dans la mondialisation
Le Sénégal est inséré dans les échanges régionaux et mondiaux.

On peut retenir :
- la stabilité politique relative ;
- le rôle de Dakar comme métropole et carrefour ;
- les échanges avec la sous-région et le reste du monde ;
- les enjeux liés à la croissance, à l'emploi, aux ressources énergétiques et à l'environnement.

## 8. Méthode de travail
Pour réussir un sujet de géographie :
1. définir les notions ;
2. hiérarchiser les idées ;
3. utiliser des exemples précis ;
4. articuler échelles mondiale, africaine et sénégalaise ;
5. montrer les contrastes.

### Démarche attendue
Une bonne copie de géographie doit :
- définir les notions ;
- organiser l'espace étudié ;
- faire apparaître centres, périphéries, flux et contrastes ;
- mobiliser des exemples concrets et actuels.

### Formulations utiles
- "Le développement ne peut pas être réduit à la seule croissance économique."
- "La mondialisation crée à la fois des opportunités et de nouvelles formes d'inégalités."
- "L'analyse doit se faire à plusieurs échelles : mondiale, régionale et locale."
- "L'Afrique occupe une place contrastée dans la mondialisation contemporaine."

## 9. Erreurs fréquentes
- Réduire le développement au seul PIB.
- Opposer mécaniquement Nord et Sud sans nuance.
- Présenter l'Afrique comme un bloc homogène.
- Oublier les effets ambivalents de la mondialisation.

## 10. À retenir
Le monde contemporain est à la fois intégré et inégal. La mondialisation rapproche les espaces, mais elle ne supprime pas les écarts de développement. L'Afrique et le Sénégal y occupent une place en évolution, entre contraintes fortes et potentialités réelles.`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- connaître l'organisation générale du système nerveux cérébro-spinal
- distinguer cerveau, cervelet, tronc cérébral et moelle épinière
- comprendre le rôle des centres nerveux dans la régulation
- expliquer comment la pression artérielle est contrôlée

## 2. Organisation générale du système nerveux
Le système nerveux comprend :

- le **système nerveux central** : encéphale et moelle épinière
- le **système nerveux périphérique** : nerfs et ganglions

Il assure trois grandes fonctions :
- recevoir les informations du milieu extérieur et intérieur ;
- traiter ces informations ;
- commander des réponses adaptées.

Le système nerveux est donc un système de coordination rapide de l'organisme.

## 3. L'encéphale
L'encéphale est logé dans la boîte crânienne.

### Ses grandes parties
- **cerveau** : perception, mémoire, langage, pensée, motricité volontaire
- **cervelet** : équilibre, posture, coordination motrice
- **tronc cérébral** : centres vitaux, respiration, activité cardiaque

### Protection
L'encéphale est protégé par :
- la boîte crânienne
- les méninges
- le liquide céphalo-rachidien

### Intérêt fonctionnel
Chaque région ne travaille pas de manière isolée. Les structures nerveuses communiquent en permanence pour intégrer les messages sensitifs et produire des réponses motrices ou végétatives.

## 4. La moelle épinière
La moelle épinière se situe dans le canal vertébral.

### Structure
- **substance grise** centrale en forme de H
- **substance blanche** périphérique

### Rôles
- conduction de l'influx entre encéphale et organes
- participation aux réflexes médullaires

### Réflexe médullaire
Dans un réflexe simple, la moelle épinière peut suffire à élaborer une réponse rapide sans intervention immédiate du cerveau.

## 5. Pression artérielle
La pression artérielle correspond à la force exercée par le sang sur la paroi des artères.

Elle dépend principalement de :
- l'activité cardiaque
- le diamètre des vaisseaux
- le volume sanguin

On peut résumer par :
$$PA = Débit\\ cardiaque \\times Résistances\\ périphériques$$

### Importance biologique
Une pression artérielle correcte garantit l'irrigation des organes, notamment le cerveau, les reins et le cœur.

## 6. Régulation nerveuse de la pression artérielle
Cette régulation est rapide.

### Étapes
1. les **barorécepteurs** détectent une variation de pression
2. ils envoient des messages vers le **centre bulbaire**
3. une réponse nerveuse est transmise au cœur et aux vaisseaux

### Conséquences
- si la PA augmente : ralentissement du cœur, vasodilatation
- si la PA baisse : accélération du cœur, vasoconstriction

### Idée essentielle
La régulation nerveuse fonctionne selon un mécanisme de rétrocontrôle qui tend à ramener la pression vers une valeur normale.

## 7. Régulation hormonale
Elle complète la régulation nerveuse.

### Hormones importantes
- **adrénaline** : augmente la fréquence cardiaque et la pression artérielle
- **ADH** : favorise la rétention d'eau, augmente le volume sanguin

Ces mécanismes participent au maintien de l'homéostasie.

### Complément utile
La régulation hormonale est plus lente que la régulation nerveuse, mais ses effets peuvent durer plus longtemps.

## 8. Hypertension artérielle
On parle d'hypertension artérielle lorsque la pression reste élevée de façon durable.

### Risques
- accidents vasculaires
- atteintes cardiaques
- atteintes rénales

### Facteurs favorisants
- alimentation trop salée
- sédentarité
- stress
- obésité
- hérédité

### Prévention
La prévention repose sur l'hygiène de vie, le contrôle médical et la réduction des facteurs de risque.

## 9. Schéma fonctionnel à maîtriser
Pour bien raisonner, il faut savoir reconstituer la chaîne de régulation :

- variation de la pression artérielle ;
- détection par les barorécepteurs ;
- transmission du message nerveux ;
- intégration au niveau bulbaire ;
- réponse des effecteurs ;
- retour vers une valeur plus stable.

Cette logique permet d'expliquer clairement le rôle de chaque organe sans réciter le cours.

## 10. Méthode à retenir
Dans un exercice de régulation :

1. identifier le paramètre perturbé
2. repérer les récepteurs sensoriels
3. préciser le centre intégrateur
4. décrire les effecteurs
5. conclure sur le retour à l'équilibre

### Lecture de document
Face à un schéma, un tableau ou une courbe, il faut toujours se demander :
- quel paramètre varie ?
- quel organe détecte cette variation ?
- quelle réponse est mise en place ?
- cette réponse ramène-t-elle l'organisme vers l'équilibre ?

## 11. Erreurs fréquentes
- confondre cerveau et cervelet
- croire que la moelle épinière ne fait que transmettre les messages
- oublier le rôle des barorécepteurs
- confondre régulation nerveuse rapide et régulation hormonale plus lente

## 12. À retenir
- le système nerveux central traite l'information
- la pression artérielle est régulée en permanence
- barorécepteurs, centre bulbaire et effecteurs agissent en chaîne
- la régulation de la PA illustre le maintien de l'homéostasie`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- définir la glycémie et expliquer sa régulation
- distinguer insuline et glucagon
- comprendre les grands types de diabète
- présenter les grandes lignes de la réponse immunitaire
- expliquer le mode d'action du VIH

## 2. La glycémie
La glycémie est la concentration de glucose dans le sang.

### Valeur normale
Chez un adulte à jeun, elle est comprise entre :
$$0{,}8 \\text{ et } 1{,}2\\ g/L$$

Le maintien de cette valeur est indispensable au bon fonctionnement de l'organisme, notamment du cerveau.

## 3. Régulation hormonale de la glycémie
Le pancréas endocrine contient les îlots de Langerhans.

### Rôle de l'insuline
Les cellules **β** sécrètent l'insuline lorsque la glycémie augmente.

L'insuline :
- favorise l'entrée du glucose dans les cellules
- stimule la formation de glycogène
- fait donc baisser la glycémie

### Rôle du glucagon
Les cellules **α** sécrètent le glucagon lorsque la glycémie diminue.

Le glucagon :
- stimule la dégradation du glycogène
- favorise la libération de glucose dans le sang
- fait donc augmenter la glycémie

## 4. Homéostasie glycémique
La régulation de la glycémie fonctionne comme un système de rétrocontrôle.

- hyperglycémie → sécrétion d'insuline
- hypoglycémie → sécrétion de glucagon

Ce mécanisme permet de maintenir une valeur stable malgré les repas ou le jeûne.

### Organes impliqués
Le foie, les muscles et le tissu adipeux jouent un rôle important dans le stockage ou la libération du glucose.

## 5. Le diabète
### Diabète de type 1
- destruction auto-immune des cellules β
- déficit en insuline
- traitement par apport d'insuline

### Diabète de type 2
- résistance des tissus à l'insuline
- souvent favorisé par la sédentarité, l'obésité et l'âge

### Conséquences possibles
Un diabète mal contrôlé peut provoquer des complications vasculaires, rénales, nerveuses ou oculaires.

## 6. La réponse immunitaire non spécifique
C'est la première ligne de défense.

Elle comprend :
- la réaction inflammatoire
- la phagocytose
- l'action des macrophages et polynucléaires

Elle est rapide mais non ciblée.

### Caractère essentiel
Elle agit de la même manière face à des agents pathogènes variés.

## 7. La réponse immunitaire spécifique
Elle est dirigée contre un antigène précis.

### Immunité humorale
- les lymphocytes B reconnaissent l'antigène
- ils se différencient en plasmocytes
- les plasmocytes fabriquent des anticorps

### Immunité cellulaire
- les lymphocytes T cytotoxiques détruisent les cellules infectées

### Mémoire immunitaire
Une partie des lymphocytes devient mémoire.
Lors d'un second contact, la réponse est plus rapide et plus efficace.

## 8. Anticorps et antigènes
Un antigène est une substance reconnue comme étrangère par l'organisme.
Un anticorps est une protéine spécifique produite contre cet antigène.

La liaison antigène-anticorps participe à l'élimination de l'agent pathogène.

### Idée importante
La spécificité antigène-anticorps explique l'efficacité ciblée de la réponse immunitaire acquise.

## 9. VIH et SIDA
Le VIH est un virus qui cible principalement les lymphocytes T4 (CD4+).

### Conséquences
- diminution progressive des défenses immunitaires
- infections opportunistes
- évolution vers le SIDA si l'infection n'est pas contrôlée

### Transmission
- voie sexuelle
- voie sanguine
- transmission mère-enfant

### Prévention
La prévention repose sur l'information, la protection lors des rapports sexuels, la sécurité transfusionnelle et le dépistage.

## 10. Vaccination
La vaccination repose sur la mémoire immunitaire.
Elle prépare l'organisme à réagir rapidement lors d'un contact futur avec l'agent pathogène.

Elle constitue l'une des stratégies majeures de santé publique.

## 11. Lecture biologique à maîtriser
Dans un document sur la glycémie ou l'immunité, il faut relier les variations observées aux mécanismes étudiés.

### Exemples de raisonnement
- si la glycémie augmente après un repas, cela stimule la sécrétion d'insuline ;
- si des anticorps apparaissent après un contact avec un antigène, cela traduit l'activation de l'immunité humorale ;
- si le nombre de lymphocytes T4 diminue, cela peut affaiblir l'ensemble de la réponse immunitaire.

L'objectif n'est pas seulement de décrire la courbe ou le tableau, mais d'expliquer le mécanisme biologique correspondant.

## 12. Méthode à retenir
Pour un exercice sur l'immunité :

1. identifier l'agent pathogène
2. distinguer réponse non spécifique et spécifique
3. préciser les cellules impliquées
4. conclure sur l'élimination ou la mémoire immunitaire

### Formulations utiles
- "La variation observée s'explique par..."
- "Cette réponse traduit l'intervention de..."
- "Le document met en évidence un rétrocontrôle..."
- "La mémoire immunitaire permet ici une réponse plus rapide et plus intense."

## 13. Erreurs fréquentes
- confondre insuline et glucagon
- croire que tous les diabètes ont la même origine
- confondre immunité humorale et immunité cellulaire
- réduire le VIH à une maladie qui détruit "tous les globules blancs"

## 14. À retenir
- la glycémie est régulée par insuline et glucagon
- l'immunité associe défenses immédiates et spécifiques
- le VIH affaiblit le système immunitaire en détruisant les lymphocytes T4
- la vaccination utilise la mémoire immunitaire`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- expliquer la formation des gamètes
- comprendre le rôle de la méiose
- montrer comment la fécondation rétablit la diploïdie
- interpréter quelques cas classiques d'hérédité humaine

## 2. La gamétogenèse
La gamétogenèse est la formation des cellules sexuelles.

### Spermatogenèse
Elle a lieu dans les testicules.
Elle est continue à partir de la puberté et produit des spermatozoïdes.

### Ovogenèse
Elle a lieu dans les ovaires.
Elle est cyclique et conduit à la formation d'un ovule.

Dans les deux cas, il y a passage de cellules diploïdes à des cellules haploïdes.

### Intérêt biologique
La gamétogenèse prépare la reproduction sexuée en produisant des cellules spécialisées capables de fusionner lors de la fécondation.

## 3. La méiose
La méiose comporte deux divisions successives.

### Première division
Elle sépare les chromosomes homologues.

### Deuxième division
Elle sépare les chromatides.

Au final, une cellule diploïde donne quatre cellules haploïdes.

### Importance
La méiose réduit de moitié le nombre de chromosomes, ce qui rend possible la restauration ultérieure de la diploïdie lors de la fécondation.

## 4. Le brassage génétique
### Brassage interchromosomique
Il résulte de la répartition aléatoire des chromosomes homologues lors de la méiose.

### Brassage intrachromosomique
Il résulte du crossing-over entre chromatides homologues au cours de la prophase I.

Ces brassages expliquent la diversité génétique des gamètes.

### Conséquence
Deux parents peuvent ainsi engendrer des descendants très différents, même au sein d'une même fratrie.

## 5. La fécondation
La fécondation correspond à l'union d'un gamète mâle et d'un gamète femelle.

### Conséquence essentielle
Elle restaure la diploïdie :
$$n + n = 2n$$

Le produit de la fécondation est le **zygote**.

Elle marque le point de départ du développement embryonnaire.

## 6. Régulation hormonale des cycles
Chez la femme, l'activité reproductrice est rythmée par un cycle sous contrôle hormonal.

### Hormones principales
- **FSH** : stimule la maturation folliculaire ;
- **LH** : déclenche l'ovulation ;
- **œstrogènes** : participent à la prolifération de la muqueuse utérine ;
- **progestérone** : prépare et maintient l'endomètre après l'ovulation.

### Logique d'ensemble
Au cours du cycle :
- un follicule se développe dans l'ovaire ;
- l'ovulation libère l'ovocyte ;
- le corps jaune sécrète surtout la progestérone ;
- en l'absence de fécondation, les taux hormonaux chutent et les règles apparaissent.

### Intérêt biologique
Cette régulation coordonne l'activité ovarienne et l'état de l'utérus afin de rendre possible une éventuelle grossesse.

## 7. Hérédité humaine
L'hérédité est la transmission des caractères des parents aux descendants.

### Groupes sanguins ABO
Ils sont déterminés par trois allèles :
- $I^A$
- $I^B$
- $i$

Les allèles $I^A$ et $I^B$ sont codominants, l'allèle $i$ est récessif.

| Génotype | Groupe sanguin |
|----------|----------------|
| IAIA ou IAi | A |
| IBIB ou IBi | B |
| IAIB | AB |
| ii | O |

### Facteur Rhésus
Le facteur Rh+ est dominant sur Rh-.

## 8. Hérédité autosomale et liée au sexe
### Autosomale
Le gène est porté par un autosome.
Exemple : albinisme autosomal récessif.

### Liée au sexe
Le gène est porté par le chromosome X.
Exemples : daltonisme, hémophilie.

Chez l'homme, un allèle récessif porté par X s'exprime plus facilement car le chromosome Y ne porte pas l'allèle correspondant.

## 9. Lecture d'un croisement
Pour interpréter un exercice :

1. identifier les allèles
2. préciser dominance, récessivité ou codominance
3. écrire les génotypes parentaux
4. construire les gamètes
5. déduire les génotypes et phénotypes de la descendance

### Outil utile
Le tableau de croisement permet d'organiser clairement les possibilités génétiques.

## 10. Importance biologique
La méiose, la fécondation et les brassages génétiques assurent :

- la stabilité du nombre de chromosomes de génération en génération
- la diversité génétique des individus

Ces mécanismes sont au cœur de l'évolution et de la variabilité humaine.

## 11. Méthode de raisonnement
Dans un exercice de génétique, il faut éviter de se précipiter vers la réponse.

### Réflexes utiles
- partir des phénotypes observés ;
- remonter aux génotypes possibles ;
- vérifier la cohérence des croisements ;
- distinguer ce qui relève du sexe, d'un autosome ou d'une codominance.

## 12. Erreurs fréquentes
- confondre mitose et méiose
- oublier que la fécondation réunit deux cellules haploïdes
- confondre dominance et fréquence d'un caractère
- mal lire les génotypes des groupes sanguins

## 13. À retenir
- la méiose produit des gamètes haploïdes
- la fécondation rétablit la diploïdie
- les cycles hormonaux coordonnent ovaires et utérus
- les lois de transmission permettent d'expliquer de nombreux caractères humains
- brassage génétique et reproduction sexuée expliquent la diversité biologique`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- connaître la structure du neurone
- expliquer la naissance du potentiel d'action
- comprendre la propagation de l'influx nerveux
- décrire la transmission synaptique

## 2. Le neurone
Le neurone est la cellule spécialisée du système nerveux.

### Ses parties principales
- **corps cellulaire** : contient le noyau
- **dendrites** : reçoivent les messages
- **axone** : conduit l'influx nerveux
- **terminaisons synaptiques** : transmettent le message à une autre cellule

Certains axones sont entourés d'une gaine de myéline.

## 3. Potentiel de repos
Au repos, la membrane du neurone est polarisée.
Le potentiel de repos vaut environ :
$$-70\\ mV$$

Cette polarisation résulte de la répartition inégale des ions et du fonctionnement de la pompe sodium/potassium.

## 4. Potentiel d'action
Quand le seuil d'excitation est atteint, un potentiel d'action apparaît.

### Étapes
1. dépolarisation : entrée massive de Na+
2. repolarisation : sortie de K+
3. retour au potentiel de repos

### Loi du tout ou rien
Si le seuil n'est pas atteint, il n'y a pas de potentiel d'action.
S'il est atteint, l'amplitude du potentiel d'action reste la même.

## 5. Propagation de l'influx nerveux
Le potentiel d'action se propage le long de l'axone.

### Fibres non myélinisées
La propagation est continue et relativement lente.

### Fibres myélinisées
La propagation est saltatoire de nœud de Ranvier en nœud de Ranvier.
Elle est plus rapide et plus économique.

## 6. Synapse chimique
La synapse est la zone de communication entre deux cellules.

### Étapes de la transmission
1. arrivée du potentiel d'action au bouton synaptique
2. libération du neurotransmetteur
3. diffusion dans la fente synaptique
4. fixation sur les récepteurs postsynaptiques
5. réponse de la cellule cible

## 7. Neurotransmetteurs
Les neurotransmetteurs sont des molécules chimiques de signalisation.

Ils peuvent avoir un effet :
- excitateur
- inhibiteur

## 8. Sens biologique
Le tissu nerveux assure :
- la perception
- la transmission rapide de l'information
- la coordination des réponses de l'organisme

## 9. Méthode à retenir
Pour interpréter un schéma nerveux :

1. identifier la cellule ou la structure
2. préciser le sens du message
3. distinguer phénomène électrique et transmission chimique

## 10. À retenir
- le neurone est l'unité fonctionnelle du système nerveux
- le potentiel d'action obéit à la loi du tout ou rien
- la synapse chimique assure la transmission entre deux cellules`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- appliquer les lois de Mendel
- interpréter un croisement monohybride
- reconnaître une hérédité liée au sexe
- présenter les grandes biotechnologies modernes

## 2. Les lois de Mendel
Mendel a travaillé sur des lignées pures de pois possédant des caractères contrastés.

### Première loi
Le croisement de deux lignées pures différentes donne une génération F1 uniforme.

### Deuxième loi
Lors du croisement des hybrides F1, les allèles se séparent et donnent en F2 :
- un ratio phénotypique 3:1
- un ratio génotypique 1:2:1

## 3. Dominance et récessivité
Dans un couple d'allèles :
- l'allèle dominant s'exprime chez l'hétérozygote
- l'allèle récessif ne s'exprime qu'à l'état homozygote

## 4. Croisement-test
Le croisement-test ou **test cross** consiste à croiser un individu de phénotype dominant avec un homozygote récessif.

### Intérêt
Il permet de déterminer si l'individu dominant est :
- homozygote
- ou hétérozygote

## 5. Hérédité liée au sexe
Certains gènes sont portés par le chromosome X.

### Conséquence
Chez l'homme, qui possède XY, un allèle récessif porté par X peut s'exprimer directement.

### Exemples
- daltonisme
- hémophilie

## 6. Notions de biotechnologie
Les biotechnologies utilisent les êtres vivants ou leurs constituants pour produire ou modifier des substances.

### OGM
Un OGM est un organisme dont le génome a été modifié, souvent par insertion d'un gène étranger.

### Clonage
Le clonage permet d'obtenir un individu génétiquement identique à un autre.

### PCR
La PCR permet d'amplifier rapidement un fragment d'ADN spécifique.

## 7. Applications
Les biotechnologies sont utilisées en :
- médecine
- agriculture
- recherche
- identification génétique

## 8. Enjeux
Les biotechnologies soulèvent aussi des questions :
- éthiques
- sanitaires
- environnementales

## 9. Méthode à retenir
Pour un exercice de génétique :

1. choisir les symboles des allèles
2. écrire le génotype des parents
3. construire les gamètes
4. établir le tableau de croisement
5. interpréter les proportions

## 10. À retenir
- les lois de Mendel restent la base de la génétique classique
- le test cross révèle le génotype
- les biotechnologies reposent sur la maîtrise du matériel génétique`,
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

## 1. Objectifs du chapitre
En Terminale S2, la mécanique doit permettre de :

- décrire un mouvement dans un référentiel donné
- calculer vitesse et accélération
- appliquer les lois de Newton
- étudier le mouvement d'un projectile ou d'un satellite
- utiliser la gravitation universelle dans les problèmes astronomiques

## 2. Référentiel et repérage
Un mouvement ne se décrit jamais de manière absolue : il se décrit dans un **référentiel**.

### Référentiel galiléen
On assimile à un référentiel galiléen un référentiel dans lequel le principe d'inertie est vérifié.

Exemples usuels :
- référentiel terrestre pour des mouvements proches de la surface terrestre
- référentiel géocentrique pour l'étude des satellites
- référentiel héliocentrique pour l'étude du mouvement des planètes

## 3. Cinématique du point
La cinématique décrit le mouvement sans chercher ses causes.

### Vecteurs fondamentaux
- vecteur position : $\\overrightarrow{OM}(t)$
- vecteur vitesse : $\\vec{v}=\\frac{d\\overrightarrow{OM}}{dt}$
- vecteur accélération : $\\vec{a}=\\frac{d\\vec{v}}{dt}$

### Interprétation
- la vitesse indique la rapidité et la direction du mouvement
- l'accélération indique comment la vitesse varie

## 4. Types de mouvements
### Mouvement rectiligne uniforme
- trajectoire : droite
- vitesse constante
- accélération nulle

### Mouvement rectiligne uniformément varié
- trajectoire rectiligne
- accélération constante
- relations usuelles :
  - $v(t)=v_0+at$
  - $x(t)=x_0+v_0t+\\frac{1}{2}at^2$
  - $v^2-v_0^2=2a(x-x_0)$

### Mouvement circulaire uniforme
- norme de la vitesse constante
- direction de la vitesse change en permanence
- accélération centripète dirigée vers le centre

## 5. Dynamique : les lois de Newton
La dynamique relie le mouvement à ses causes : les forces.

### Première loi de Newton
Dans un référentiel galiléen, si la somme des forces extérieures est nulle, alors le corps reste au repos ou en mouvement rectiligne uniforme.

### Deuxième loi de Newton
$$\\sum \\vec{F}=m\\vec{a}$$

Elle permet de calculer l'accélération à partir du bilan des forces.

### Troisième loi de Newton
Si un corps A exerce une force sur un corps B, alors B exerce sur A une force :

- de même direction
- de même intensité
- de sens opposé

## 6. Bilan des forces usuelles
Dans les exercices, on rencontre souvent :

- le poids : $\\vec{P}=m\\vec{g}$
- la réaction du support
- la tension d'un fil
- la force de frottement
- la force gravitationnelle

Le schéma de forces est indispensable avant tout calcul.

## 7. Chute libre et projectile
### Chute libre
En négligeant les frottements de l'air, seule la pesanteur agit :
$$\\vec{a}=\\vec{g}$$

### Mouvement d'un projectile
On décompose le mouvement selon deux axes :

- horizontal : mouvement rectiligne uniforme
- vertical : mouvement uniformément accéléré par $g$

Cette décomposition explique la trajectoire parabolique.

## 8. Gravitation universelle
Deux masses $M$ et $m$ séparées par une distance $d$ s'attirent avec une force :
$$F=G\\frac{Mm}{d^2}$$

où :
- $G=6{,}67\\times 10^{-11}\\ \\mathrm{N\\cdot m^2\\cdot kg^{-2}}$

### Caractéristiques
- force attractive
- dirigée selon la droite joignant les centres des masses
- proportionnelle au produit des masses
- inversement proportionnelle au carré de la distance

## 9. Satellites et mouvement orbital
Pour un satellite en orbite circulaire, la gravitation fournit la force centripète.

### Vitesse orbitale
$$v=\\sqrt{\\frac{GM}{R}}$$

### Période
En combinant la cinématique circulaire et la gravitation, on obtient :
$$\\frac{T^2}{R^3}=\\frac{4\\pi^2}{GM}$$

Cette relation correspond à la troisième loi de Kepler.

## 10. Méthode type pour un exercice
1. choisir le référentiel
2. faire le schéma du système
3. établir le bilan des forces
4. projeter la relation fondamentale sur les axes utiles
5. résoudre avec les conditions initiales

## 11. Erreurs fréquentes
- oublier le référentiel
- confondre vitesse constante et accélération nulle en mouvement circulaire
- oublier qu'une force est un vecteur
- appliquer les formules de chute libre sur un axe mal orienté

## 12. À retenir
- la cinématique décrit le mouvement
- la dynamique l'explique
- la gravitation permet d'étudier aussi bien une chute qu'une orbite satellitaire`,
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

## 1. Objectifs du chapitre
Ce chapitre doit permettre de :

- caractériser un champ magnétique créé par un courant
- déterminer la force exercée sur un conducteur ou une charge en mouvement
- comprendre le phénomène d'induction
- modéliser les dipôles R-L, R-C et les oscillations L-C

## 2. Champ magnétique
Un champ magnétique est une grandeur vectorielle notée $\\vec{B}$.
Il s'exprime en tesla (T).

### Champ créé par un fil rectiligne infini
À une distance $d$ d'un fil parcouru par un courant $I$ :
$$B=\\frac{\\mu_0 I}{2\\pi d}$$

Le champ est tangent à des cercles centrés sur le fil.
Le sens se détermine par la règle de la main droite.

### Champ créé par un solénoïde
À l'intérieur d'un solénoïde long :
$$B=\\mu_0 n I$$
où $n$ est le nombre de spires par mètre.

Le champ y est pratiquement uniforme.

## 3. Force de Laplace et force de Lorentz
### Force de Laplace
Un conducteur rectiligne de longueur $L$, parcouru par un courant $I$, plongé dans un champ magnétique $B$, subit une force :
$$F=BIL\\sin\\theta$$

où $\\theta$ est l'angle entre la direction du courant et celle du champ.

### Sens de la force
La force est perpendiculaire :

- au conducteur
- au champ magnétique

Elle se détermine par une règle d'orientation adaptée au cours.

### Particule chargée en mouvement
Une charge $q$ animée d'une vitesse $\\vec{v}$ dans un champ magnétique subit une force magnétique.
Quand $\\vec{v}$ est perpendiculaire à $\\vec{B}$, cette force peut engendrer un mouvement circulaire.

## 4. Flux magnétique
Le flux magnétique à travers une surface $S$ vaut :
$$\\Phi=B S \\cos\\theta$$

Le flux dépend :
- de l'intensité du champ
- de la surface
- de l'orientation de la surface par rapport au champ

## 5. Induction électromagnétique
Quand le flux magnétique à travers un circuit varie, il apparaît une force électromotrice induite.

### Loi de Faraday
$$e=-\\frac{d\\Phi}{dt}$$

### Loi de Lenz
Le courant induit s'oppose à la variation du flux qui lui donne naissance.

Le signe négatif dans la loi de Faraday traduit cette opposition.

## 6. Dipôle R-L
Pour un circuit comprenant une résistance $R$ et une bobine d'inductance $L$ :
$$E=Ri+L\\frac{di}{dt}$$

### Interprétation
- le terme $Ri$ correspond à la chute de tension ohmique
- le terme $L\\frac{di}{dt}$ traduit l'auto-induction

Dans un circuit R-L, le courant ne s'établit pas instantanément.

## 7. Dipôle R-C
Pour un circuit comprenant une résistance $R$ et un condensateur $C$ :
$$E=Ri+\\frac{q}{C}$$

avec :
$$i=\\frac{dq}{dt}$$

Le condensateur emmagasine de l'énergie électrique.

## 8. Oscillations électriques
### Circuit L-C
Dans un circuit L-C idéal, il y a échange périodique d'énergie entre :

- le condensateur
- la bobine

La période propre vaut :
$$T_0=2\\pi\\sqrt{LC}$$

### Résonance
Dans un régime forcé, l'amplitude devient maximale lorsque la fréquence excitatrice est voisine de la fréquence propre.

## 9. Méthode pratique
### Pour un champ magnétique
1. identifier la source du champ
2. choisir la formule adaptée
3. vérifier les unités

### Pour une force de Laplace
1. repérer l'angle entre courant et champ
2. appliquer $F=BIL\\sin\\theta$
3. vérifier le sens de la force

### Pour une induction
1. calculer le flux initial et final
2. évaluer sa variation
3. appliquer la loi de Faraday

## 10. Erreurs fréquentes
- oublier le sinus dans la force de Laplace
- utiliser la formule du solénoïde pour un fil rectiligne
- oublier que l'induction n'apparaît que si le flux varie
- confondre tension, intensité et flux magnétique

## 11. À retenir
- les courants créent des champs magnétiques
- un champ magnétique agit sur les charges et les conducteurs
- l'induction est un phénomène fondamental de conversion électromagnétique`,
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

## 1. Objectifs du chapitre
Ce chapitre relie optique, physique quantique élémentaire et physique nucléaire. Il faut savoir :

- décrire des interférences lumineuses
- exploiter la relation de l'interfrange
- utiliser le modèle photonique de la lumière
- appliquer l'équation d'Einstein pour l'effet photoélectrique
- reconnaître les principaux types de radioactivité
- exploiter la loi de décroissance radioactive

## 2. Interférences lumineuses
Les interférences apparaissent lorsque deux ondes lumineuses cohérentes se superposent.

### Conditions de cohérence
Les deux sources doivent :
- avoir la même fréquence
- garder une différence de phase constante

### Différence de marche
On note $\\delta$ la différence de marche entre les deux ondes.

### Conditions d'interférence
- frange brillante : $\\delta=k\\lambda$
- frange sombre : $\\delta=(2k+1)\\frac{\\lambda}{2}$

où $k$ est un entier relatif.

### Interfrange
Dans les fentes d'Young :
$$i=\\frac{\\lambda D}{a}$$

avec :
- $\\lambda$ : longueur d'onde
- $D$ : distance entre les fentes et l'écran
- $a$ : distance entre les deux sources

## 3. Nature ondulatoire de la lumière
La lumière manifeste un comportement ondulatoire à travers :

- les interférences
- la diffraction
- la propagation avec longueur d'onde et fréquence

Cette vision explique la répartition en franges claires et sombres.

## 4. Nature corpusculaire de la lumière
La lumière peut aussi être décrite comme un flux de photons.

### Énergie d'un photon
$$E=h\\nu=\\frac{hc}{\\lambda}$$

où :
- $h$ est la constante de Planck
- $\\nu$ la fréquence
- $c$ la célérité de la lumière

## 5. Effet photoélectrique
Lorsqu'un métal reçoit une lumière suffisamment énergétique, il peut émettre des électrons.

### Équation d'Einstein
$$E_c^{max}=h\\nu-W_s$$

où :
- $E_c^{max}$ est l'énergie cinétique maximale de l'électron
- $W_s$ est le travail d'extraction du métal

### Fréquence seuil
L'effet photoélectrique n'a lieu que si :
$$h\\nu\\ge W_s$$

soit :
$$\\nu\\ge \\nu_0=\\frac{W_s}{h}$$

### Conséquence importante
Une lumière plus intense ne suffit pas si la fréquence est inférieure à la fréquence seuil.

## 6. Dualité onde-corpuscule
La lumière possède à la fois :

- des propriétés d'onde
- des propriétés de particule

Ce double aspect constitue la dualité onde-corpuscule.

## 7. Radioactivité
La radioactivité est la transformation spontanée d'un noyau instable en un autre noyau.

### Radioactivité alpha
Émission d'un noyau d'hélium :
- nombre de masse : $A\\to A-4$
- numéro atomique : $Z\\to Z-2$

### Radioactivité bêta moins
Émission d'un électron :
- nombre de masse inchangé
- numéro atomique : $Z\\to Z+1$

### Rayonnement gamma
Émission d'un photon :
- $A$ inchangé
- $Z$ inchangé

## 8. Loi de décroissance radioactive
Le nombre de noyaux restants à l'instant $t$ est :
$$N(t)=N_0e^{-\\lambda t}$$

où $\\lambda$ est la constante radioactive.

### Demi-vie
La demi-vie $T_{1/2}$ est la durée au bout de laquelle il reste la moitié des noyaux initiaux :
$$T_{1/2}=\\frac{\\ln 2}{\\lambda}$$

## 9. Réactions nucléaires
### Fission
La fission correspond à la rupture d'un noyau lourd en noyaux plus légers avec libération d'énergie.

### Fusion
La fusion correspond à l'union de deux noyaux légers pour former un noyau plus lourd avec libération d'énergie.

## 10. Conservation dans les réactions nucléaires
Dans toute réaction nucléaire, il faut conserver :

- le nombre de masse
- le numéro atomique

Cette règle permet de compléter une équation nucléaire.

## 11. Méthode pratique
### Pour les interférences
1. identifier la formule utile
2. convertir les unités
3. calculer l'interfrange ou la différence de marche

### Pour l'effet photoélectrique
1. calculer l'énergie du photon
2. comparer à $W_s$
3. conclure sur l'émission ou non d'électrons

### Pour la radioactivité
1. repérer le type de désintégration
2. conserver $A$ et $Z$
3. utiliser la demi-vie ou la loi exponentielle si besoin

## 12. À retenir
- les interférences prouvent le caractère ondulatoire de la lumière
- l'effet photoélectrique montre son aspect corpusculaire
- la radioactivité et les réactions nucléaires obéissent à des lois de conservation précises`,
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

## 1. Objectifs du chapitre
En Terminale S2, ce chapitre doit permettre de :

- reconnaître les principales fonctions organiques du programme
- classer les alcools, amines et acides carboxyliques
- comprendre les transformations chimiques usuelles
- distinguer estérification et saponification
- relier la chimie organique aux biomolécules comme les acides aminés

## 2. Les alcools
Les alcools sont des composés organiques possédant le groupe hydroxyle **–OH** porté par un carbone saturé.

### Classification
On classe les alcools selon le nombre de carbones liés au carbone portant –OH :

- alcool **primaire** : ce carbone est lié à un seul autre carbone
- alcool **secondaire** : il est lié à deux autres carbones
- alcool **tertiaire** : il est lié à trois autres carbones

### Exemples
- éthanol : alcool primaire
- propan-2-ol : alcool secondaire
- tert-butanol : alcool tertiaire

## 3. Réactions des alcools
### Oxydation
- alcool primaire → aldéhyde → acide carboxylique
- alcool secondaire → cétone
- alcool tertiaire : pas d'oxydation ménagée usuelle

### Déshydratation
Sous l'action d'un acide et de la chaleur :
$$\\text{alcool} \\rightarrow \\text{alcène} + H_2O$$

Cette réaction élimine une molécule d'eau.

## 4. Les amines
Les amines dérivent de l'ammoniac NH₃ par substitution d'un ou plusieurs atomes d'hydrogène par des groupements alkyles.

### Types d'amines
- amine primaire : $R-NH_2$
- amine secondaire : $R_2NH$
- amine tertiaire : $R_3N$

### Propriété essentielle
Les amines ont un **caractère basique** car l'atome d'azote possède un doublet libre capable de capter un proton.

## 5. Les acides carboxyliques
Les acides carboxyliques possèdent le groupe fonctionnel :
$$-COOH$$

Ils présentent un caractère acide en solution aqueuse.

### Exemples
- acide méthanoïque
- acide éthanoïque
- acides gras à longue chaîne

## 6. Les esters
Les esters possèdent la fonction :
$$-COO-$$

Ils sont souvent responsables d'odeurs fruitées.

### Estérification
Un acide carboxylique réagit avec un alcool selon :
$$R-COOH + R'-OH \\rightleftharpoons R-COO-R' + H_2O$$

### Caractéristiques
- réaction lente
- limitée par un équilibre
- réversible
- catalysée par un acide

## 7. La saponification
La saponification est l'hydrolyse basique d'un ester :
$$R-COO-R' + NaOH \\rightarrow R-COONa + R'-OH$$

### Caractéristiques
- réaction rapide
- totale
- irréversible
- produit un alcool et le sel d'un acide carboxylique

La saponification des corps gras est à la base de la fabrication des savons.

## 8. Différence entre estérification et saponification
### Estérification
- réactifs : acide + alcool
- produit : ester + eau
- lente et équilibrée

### Saponification
- réactifs : ester + base forte
- produit : alcool + sel
- rapide et totale

## 9. Les acides α-aminés
Les acides α-aminés portent à la fois :

- une fonction amine $-NH_2$
- une fonction acide carboxylique $-COOH$

sur le même carbone dit **carbone α**.

### Importance biologique
Les acides aminés sont les unités de base des protéines.
Ils se lient entre eux par une **liaison peptidique**.

## 10. Méthode pour reconnaître une fonction organique
1. repérer le groupe caractéristique
2. identifier la famille chimique
3. relier la famille aux propriétés connues
4. vérifier si une transformation est possible

## 11. Erreurs fréquentes
- confondre alcool secondaire et tertiaire
- croire que tous les alcools s'oxydent de la même façon
- confondre ester et acide carboxylique
- oublier que l'estérification est réversible
- oublier que la saponification se fait en milieu basique

## 12. À retenir
- la fonction chimique détermine le comportement de la molécule
- les alcools, amines et acides carboxyliques sont des familles fondamentales
- l'estérification et la saponification sont deux transformations opposées mais de nature différente`,
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

## 1. Objectifs du chapitre
Ce chapitre permet de :

- définir la vitesse d'une réaction chimique
- identifier les facteurs cinétiques
- utiliser les notions de pH, $K_e$, $K_a$ et $pK_a$
- étudier l'équilibre d'un couple acide/base
- exploiter un dosage acido-basique

## 2. Cinétique chimique
La cinétique chimique étudie l'évolution d'une réaction au cours du temps.

### Vitesse de réaction
La vitesse mesure la rapidité de disparition d'un réactif ou d'apparition d'un produit :
$$v=-\\frac{d[R]}{dt}=\\frac{d[P]}{dt}$$

Cette grandeur dépend du temps et des conditions expérimentales.

## 3. Facteurs cinétiques
### Température
Quand la température augmente, l'agitation moléculaire augmente et les collisions efficaces deviennent plus nombreuses.

### Concentration
Plus la concentration des réactifs est grande, plus les collisions sont fréquentes.

### Catalyseur
Un catalyseur accélère une réaction sans être consommé à la fin.
Il abaisse l'énergie d'activation.

### Surface de contact
Pour un solide, une poudre réagit plus vite qu'un bloc compact.

## 4. Autoprotolyse de l'eau
L'eau peut jouer à la fois le rôle d'acide et de base :
$$H_2O + H_2O \\rightleftharpoons H_3O^+ + OH^-$$

À 25°C :
$$K_e=[H_3O^+][OH^-]=10^{-14}$$

Dans l'eau pure :
$$[H_3O^+]=[OH^-]=10^{-7}\\ \\text{mol·L}^{-1}$$
donc :
$$pH=7$$

## 5. pH d'une solution
Le pH est défini par :
$$pH=-\\log[H_3O^+]$$

### Interprétation
- solution acide : $pH<7$
- solution neutre : $pH=7$
- solution basique : $pH>7$

## 6. Acides et bases faibles
Un acide faible ne se dissocie que partiellement dans l'eau :
$$AH + H_2O \\rightleftharpoons A^- + H_3O^+$$

La constante d'acidité vaut :
$$K_a=\\frac{[A^-][H_3O^+]}{[AH]}$$

et :
$$pK_a=-\\log K_a$$

### Sens physique
- plus $K_a$ est grand, plus l'acide est fort
- plus $pK_a$ est petit, plus l'acide est fort

## 7. Couple acide/base et relation de Henderson-Hasselbalch
Pour un couple $AH/A^-$ :
$$pH=pK_a+\\log\\frac{[A^-]}{[AH]}$$

Cette relation est fondamentale pour les solutions tampons et les dosages.

### Cas particulier
Si $[A^-]=[AH]$, alors :
$$pH=pK_a$$

Ce cas apparaît au point de demi-équivalence dans le dosage d'un acide faible par une base forte.

## 8. Notion d'équilibre chimique
Une réaction limitée atteint un état d'équilibre dynamique.

À l'équilibre :
- les réactifs et produits coexistent
- les vitesses directe et inverse sont égales

Un catalyseur n'en change pas la composition finale, il aide seulement à l'atteindre plus vite.

## 9. Dosages acido-basiques
Le dosage consiste à déterminer la concentration d'une espèce en la faisant réagir avec une solution de concentration connue.

### Point d'équivalence
À l'équivalence, les quantités de matière sont dans les proportions stoechiométriques.

### Cas classiques
- acide fort + base forte : $pH=7$ à l'équivalence
- acide faible + base forte : $pH>7$ à l'équivalence

Le point d'équivalence peut être repéré :
- par un indicateur coloré
- par un suivi pH-métrique

## 10. Méthode pratique pour un dosage
1. écrire l'équation de réaction
2. identifier les espèces réagissantes
3. repérer la stoechiométrie
4. utiliser la relation à l'équivalence
5. calculer la concentration inconnue

## 11. Erreurs fréquentes
- confondre acide fort et solution acide
- oublier l'unité de concentration
- croire qu'un catalyseur change l'équilibre
- oublier qu'à la demi-équivalence on a $pH=pK_a$
- confondre $K_e$, $K_a$ et $pK_a$

## 12. À retenir
- la cinétique décrit la vitesse d'évolution d'une réaction
- le pH traduit l'acidité d'une solution
- l'équilibre acido-basique se lit avec $K_a$ et $pK_a$
- le dosage est un outil expérimental central en chimie analytique`,
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

## Objectifs du chapitre
- Comprendre ce qu'est un algorithme et pourquoi il doit être correct et lisible.
- Maîtriser les structures de base de la programmation.
- Manipuler des variables, fonctions, listes et traitements classiques.
- Développer une logique de résolution de problème en Python.

## 1. Qu'est-ce qu'un algorithme ?
Un **algorithme** est une suite finie d'instructions ordonnées qui permet de résoudre un problème. Il doit être compréhensible, exécutable et conduire à un résultat correct.

### Qualités d'un bon algorithme
- **clarté**
- **terminaison**
- **correction**
- **efficacité**

Un algorithme ne dépend pas d'abord d'un langage : il traduit une démarche logique.

## 2. De l'analyse du problème au programme
Avant de coder, il faut :
1. comprendre le problème ;
2. identifier les entrées et les sorties ;
3. découper le problème en étapes ;
4. écrire un pseudo-code ou un organigramme ;
5. seulement ensuite programmer.

Cette méthode évite de coder au hasard.

## 3. Structures de contrôle
Toute programmation de base repose sur trois structures.

### Séquence
Les instructions s'exécutent dans l'ordre.

### Alternative
On choisit entre plusieurs cas.
\`\`\`python
if condition:
    action_1
else:
    action_2
\`\`\`

### Répétition
On répète une action.

#### Boucle for
Elle est utilisée quand le nombre d'itérations est connu.
\`\`\`python
for i in range(n):
    print(i)
\`\`\`

#### Boucle while
Elle est utilisée quand on répète tant qu'une condition reste vraie.
\`\`\`python
while condition:
    traitement()
\`\`\`

## 4. Variables, types et expressions
Une variable est un espace mémoire qui contient une valeur.

### Types de base
- entier
- réel
- chaîne de caractères
- booléen

Il faut savoir affecter, modifier et afficher une valeur.

\`\`\`python
age = 17
nom = "Awa"
admis = True
\`\`\`

## 5. Fonctions et modularité
Une fonction permet de regrouper un traitement réutilisable.

\`\`\`python
def carre(x):
    return x * x
\`\`\`

### Intérêt des fonctions
- éviter les répétitions ;
- clarifier le programme ;
- faciliter les tests ;
- découper un problème complexe en sous-problèmes.

Il faut aussi distinguer **variables locales** et **variables globales**.

## 6. Listes et tableaux
En Python, les tableaux du programme sont souvent représentés par des **listes**.

\`\`\`python
notes = [12, 15, 9, 18]
print(notes[0])
notes.append(14)
\`\`\`

### Opérations courantes
- accéder à un élément ;
- parcourir la liste ;
- ajouter ou supprimer ;
- calculer une somme ou un maximum ;
- rechercher une valeur.

## 7. Recherche et parcours
### Recherche séquentielle
On parcourt les éléments un à un jusqu'à trouver la valeur cherchée.

### Recherche dichotomique
Elle s'applique sur un tableau **trié**. À chaque étape, on compare avec l'élément du milieu et on élimine la moitié inutile.

Son intérêt est majeur :
- recherche séquentielle : **O(n)**
- recherche dichotomique : **O(log n)**

## 8. Algorithmes de tri
Le tri consiste à ranger les éléments dans un ordre donné.

### Tri à bulles
On compare les éléments voisins et on échange s'ils sont mal placés.

### Tri par sélection
On cherche le minimum de la partie non triée, puis on le place au bon endroit.

### Tri par insertion
On insère chaque nouvel élément dans la partie déjà triée.

Ces tris sont simples à comprendre mais peu efficaces pour de grands ensembles.

## 9. Récursivité
Une fonction récursive s'appelle elle-même pour résoudre un problème plus petit.

Elle doit obligatoirement contenir :
- un **cas de base** ;
- un **appel récursif** qui rapproche de ce cas de base.

## 10. Méthode pour écrire un bon programme
1. analyser l'énoncé ;
2. identifier les données ;
3. choisir l'algorithme adapté ;
4. écrire le code ;
5. tester avec plusieurs cas ;
6. corriger les erreurs.

## 11. Erreurs fréquentes
- Confondre le signe d'affectation = et l'opérateur de comparaison ==.
- Oublier d'initialiser une variable.
- Créer une boucle infinie avec une instruction while mal contrôlée.
- Utiliser la recherche dichotomique sur une liste non triée.
- Écrire un programme sans le tester.

## 12. À retenir
L'algorithmique apprend à raisonner avec rigueur. La programmation, elle, traduit ce raisonnement dans un langage. Pour réussir, il faut être à la fois logique, méthodique et attentif aux détails.`,
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

## Objectifs du chapitre
- Comprendre le rôle du système d'exploitation dans un ordinateur.
- Maîtriser les notions de base sur les fichiers, processus et périphériques.
- Identifier les composants et le fonctionnement d'un réseau informatique.
- Comprendre l'adressage IP, les protocoles et les enjeux de sécurité.

## 1. Le système d'exploitation
Le **système d'exploitation** est le logiciel de base qui permet à l'ordinateur de fonctionner. Il sert d'intermédiaire entre le matériel, les applications et l'utilisateur.

Sans système d'exploitation, un ordinateur ne peut pas exécuter facilement des programmes ni organiser ses ressources.

### Fonctions principales
- gestion du processeur ;
- gestion de la mémoire ;
- gestion des fichiers ;
- gestion des périphériques ;
- gestion des utilisateurs et des droits.

### Exemples
- Windows
- Linux
- macOS
- Android

## 2. Fichiers, dossiers et organisation
Le système d'exploitation organise les données dans une **arborescence**.

### Sous Linux
\`\`\`
/        racine
/home    dossiers des utilisateurs
/etc     configuration
/bin     commandes essentielles
/var     données variables
\`\`\`

Il faut savoir distinguer :
- un fichier ;
- un dossier ;
- un chemin absolu ;
- un chemin relatif.

## 3. Processus et mémoire
Un **processus** est un programme en cours d'exécution. Le système d'exploitation doit partager le processeur entre plusieurs tâches et gérer la mémoire disponible.

### Mémoire
- **RAM** : mémoire vive, rapide mais volatile
- **stockage** : disque dur ou SSD, plus durable mais plus lent

Le système d'exploitation alloue et libère ces ressources selon les besoins.

## 4. Réseaux informatiques
Un réseau relie plusieurs équipements afin de partager des ressources et d'échanger des données.

### Types de réseaux
- **LAN** : réseau local
- **WAN** : réseau étendu
- **Internet** : réseau mondial de réseaux

### Topologies
- bus
- étoile
- anneau
- maille

La topologie en étoile est très courante dans les réseaux modernes.

## 5. Équipements réseau
- **switch** : connecte plusieurs machines dans un même réseau local
- **routeur** : relie plusieurs réseaux différents
- **point d'accès Wi-Fi** : permet la connexion sans fil
- **modem** : interface avec le fournisseur d'accès

## 6. Protocoles et modèle TCP/IP
Les échanges sur un réseau reposent sur des règles appelées **protocoles**.

### IP
Le protocole IP assure l'adressage et l'acheminement des paquets.

### TCP
TCP assure une communication fiable :
- établissement de connexion ;
- contrôle d'erreur ;
- remise dans l'ordre des paquets.

### UDP
UDP est plus rapide mais moins fiable. Il est utilisé quand la rapidité est prioritaire.

## 7. Adressage IPv4
Une adresse IPv4 est composée de 4 octets, par exemple :
\`\`\`
192.168.1.10
\`\`\`

Avec un masque /24, on distingue :
- l'adresse réseau ;
- les adresses hôtes ;
- l'adresse de broadcast.

Exemple :
- réseau : 192.168.1.0
- broadcast : 192.168.1.255

## 8. Internet et services
Internet permet de nombreux services :
- navigation web ;
- courrier électronique ;
- transfert de fichiers ;
- visioconférence ;
- cloud ;
- réseaux sociaux.

Chaque service s'appuie sur des protocoles spécifiques comme HTTP, HTTPS, SMTP ou FTP.

## 9. Sécurité informatique
La sécurité est indispensable pour protéger les données, les utilisateurs et les équipements.

### Menaces courantes
- virus
- malware
- phishing
- ransomware
- vol de mot de passe

### Moyens de protection
- pare-feu
- antivirus
- mots de passe robustes
- mises à jour régulières
- chiffrement des communications

HTTPS protège les échanges web grâce au chiffrement.

## 10. Méthode de raisonnement
Dans un exercice, il faut savoir :
1. identifier le rôle d'un équipement ;
2. reconnaître le bon protocole ;
3. distinguer réseau local et Internet ;
4. lire correctement une adresse IP et son masque ;
5. proposer une mesure de sécurité adaptée.

## 11. Erreurs fréquentes
- Confondre switch et routeur.
- Penser qu'Internet est synonyme de web.
- Croire que HTTPS accélère le site au lieu de le sécuriser.
- Mal interpréter l'adresse réseau et l'adresse d'un hôte.

## 12. À retenir
Le système d'exploitation organise les ressources de l'ordinateur, tandis que les réseaux permettent la communication entre machines. Ces deux notions sont inséparables dans le monde numérique actuel et doivent être maîtrisées à la fois techniquement et pratiquement.`,
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

## Objectifs du chapitre
- Comprendre comment une base relationnelle organise l'information.
- Identifier les notions de table, clé, relation et cardinalité.
- Savoir écrire les principales requêtes SQL.
- Concevoir une base simple sans redondance excessive.

## 1. Qu'est-ce qu'une base de données relationnelle ?
Une base de données relationnelle stocke les informations dans des **tables** composées de lignes et de colonnes.

Chaque table représente un ensemble cohérent d'informations :
- une table eleves
- une table classes
- une table matieres

Ce modèle permet d'organiser les données de façon structurée, claire et interrogeable.

## 2. Les notions fondamentales
### Table, ligne, colonne
- une **table** contient des données sur un même sujet ;
- une **ligne** correspond à un enregistrement ;
- une **colonne** représente un attribut.

### Clé primaire
La **clé primaire** identifie de manière unique chaque enregistrement.

### Clé étrangère
La **clé étrangère** établit un lien avec une autre table.

### Cardinalité
Les relations entre entités peuvent être :
- un à un ;
- un à plusieurs ;
- plusieurs à plusieurs.

## 3. Modélisation avant création
Avant d'écrire du SQL, il faut réfléchir au modèle de données.

### Entité-association
- **entité** : objet du monde réel
- **attribut** : propriété de l'entité
- **association** : lien entre plusieurs entités

Exemple :
- un **élève** appartient à une **classe**
- une **classe** contient plusieurs **élèves**

## 4. Le langage SQL
SQL est le langage utilisé pour interroger et modifier les bases de données.

### Lire des données : SELECT
\`\`\`sql
SELECT nom, prenom, note
FROM eleves
WHERE note >= 10
ORDER BY note DESC;
\`\`\`

Cette requête sélectionne certains champs, applique un filtre et trie les résultats.

### Ajouter des données : INSERT
\`\`\`sql
INSERT INTO eleves (nom, prenom, note)
VALUES ('Diallo', 'Fatou', 15);
\`\`\`

### Modifier des données : UPDATE
\`\`\`sql
UPDATE eleves
SET note = 16
WHERE nom = 'Diallo';
\`\`\`

### Supprimer des données : DELETE
\`\`\`sql
DELETE FROM eleves
WHERE note < 5;
\`\`\`

## 5. Les jointures
Une jointure permet de relier des tables entre elles.

\`\`\`sql
SELECT eleves.nom, classes.libelle
FROM eleves
INNER JOIN classes ON eleves.classe_id = classes.id;
\`\`\`

Cette requête relie chaque élève à sa classe.

### Importance des jointures
Sans jointures, une base relationnelle perd tout son intérêt. Elles permettent de reconstituer l'information répartie dans plusieurs tables.

## 6. Intégrité et cohérence des données
Une bonne base doit éviter :
- les doublons inutiles ;
- les valeurs incohérentes ;
- les liens cassés entre tables.

Les clés primaires et étrangères garantissent cette cohérence.

## 7. Normalisation
La normalisation sert à réduire les redondances et les anomalies.

### Première forme normale (1FN)
Les attributs doivent être atomiques. On évite les listes dans une cellule.

### Deuxième forme normale (2FN)
Chaque attribut non clé doit dépendre entièrement de la clé primaire.

### Troisième forme normale (3FN)
On évite les dépendances transitives entre attributs non clés.

## 8. Exemples d'application
Dans un contexte scolaire, on peut modéliser :
- les élèves ;
- les classes ;
- les matières ;
- les notes ;
- les enseignants.

Chaque information doit être rangée dans la bonne table pour faciliter les requêtes.

## 9. Méthode pour réussir un exercice
1. identifier les entités ;
2. déterminer les relations ;
3. choisir la clé primaire ;
4. écrire la requête demandée ;
5. vérifier le sens de la condition ou de la jointure.

## 10. Erreurs fréquentes
- Confondre clé primaire et clé étrangère.
- Utiliser WHERE pour trier au lieu de ORDER BY.
- Oublier la condition de jointure.
- Mettre plusieurs valeurs dans une seule cellule.
- Concevoir des tables avec trop de répétitions.

## 11. À retenir
Les bases de données relationnelles permettent d'organiser, de relier et d'interroger efficacement l'information. Pour bien les maîtriser, il faut comprendre à la fois la logique du modèle relationnel et les commandes essentielles du SQL.`,
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
