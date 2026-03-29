/**
 * seed-official-programs.js
 * Programmes officiels BAC Sénégal – Office du Baccalauréat
 * Remplace seed-content.js et seed-l2-t.js
 * Séries : L1, L2, S1, S2
 */
import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import { pool } from './pool.js';

// ─── IDs sujets (issus de la DB) ─────────────────────────────────────────────
const SID = {
  L1_MATHS:   '4a26d746-e1b6-4df9-865e-1cc9a43efbc0',
  L1_PHILO:   '5462163a-224b-4c13-883b-534e308fc46c',
  L1_HISTGEO: '781dcd75-2a1a-41fe-afa6-2de359c7340a',
  L1_FR:      '84ef8ad2-0716-4c3e-b924-7a24d4723da5',
  L1_EN:      'ac384102-fae9-4356-947a-aa61f76e3b11',
  L1_SVT:     '72b027b6-59b9-4655-bdfe-6747378823da', // "Sciences Naturelles"

  L2_MATHS:   '5633cd7a-d740-43fe-9042-6bff22be8ff9',
  L2_PHILO:   '98d1f519-53b1-42b5-a3c2-fb6d9aa7cc87',
  L2_HISTGEO: 'a94cfbcf-d46a-45ca-a8de-27ab10998c8e',
  L2_FR:      '46022a0c-00dd-453f-b216-646d9c6774ea',
  L2_EN:      '7d81abfe-ccca-4546-9bf9-e9a789ccbb94',

  S1_MATHS:   '7dcd9aee-3fc7-4eff-a5e2-76a90f7212cf',
  S1_PHILO:   '1c79092a-43d5-47a0-aa95-989348fdbc2c',
  S1_HISTGEO: '627be785-3dc6-4d8d-bead-530f90e550b6',
  S1_FR:      'f7628019-4791-4f93-b6cd-ace2f860f082',
  S1_EN:      'a46fb402-6a20-4dc4-b345-2a0bae25e53f',
  S1_SVT:     '5e15756b-129d-446c-805b-42ebbb75af03',
  S1_PHY:     '570ffd26-72a4-4185-b6eb-4fbcea192c99',
  S1_CHI:     '4b9d0f9e-57e6-4aef-a9ce-88b11ab28850',

  S2_MATHS:   '758ff260-26c5-4cbf-a4b7-6344c164ed80',
  S2_PHILO:   'cc794b2c-f2ae-407f-95ef-18f7ce60df17',
  S2_HISTGEO: 'c8528812-dd47-4f95-bdad-0543d8d101d8',
  S2_FR:      '11c17863-aaab-4361-aa18-f3b7c10d9651',
  S2_EN:      '6006cff5-fa7f-4d36-8f2e-79437f6ffb34',
  S2_SVT:     '7558ceab-dcad-46f1-9ec3-38215d62af19',
  S2_PHY:     '8a7e0812-c11b-48ef-ba90-6402907db0be',
  S2_CHI:     'b82924d7-c598-4f24-bdbe-9f8fa0db59ce',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

// ─── DONNÉES DES PROGRAMMES OFFICIELS ────────────────────────────────────────

const PROGRAMS = {

  // ══════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES S1/S3  (Programme LS – Terminale S1/S3)
  // ══════════════════════════════════════════════════════════════════════════
  [SID.S1_MATHS]: {
    chapters: [
      {
        title: 'Analyse – Fonctions numériques et usuelles',
        order_index: 1,
        summary: 'Rappels de continuité, dérivées, primitives, fonctions du type f^α, dérivée de la réciproque, fonctions logarithme et exponentielle.',
        key_formulas: [
          '(f^α)\' = α·f\'·f^(α-1)',
          '(ln f)\' = f\'/f',
          '(e^f)\' = f\'·e^f',
          'Si f est bijective, (f⁻¹)\'(y) = 1/f\'(f⁻¹(y))',
          'TVI : si f continue sur [a,b] et f(a)·f(b)<0 ⟹ ∃c∈]a,b[ : f(c)=0',
        ],
        course_content: `# Analyse – Fonctions numériques et usuelles

## 1. Rappels de continuité
Une fonction $f$ est **continue en $a$** si $\\lim_{x\\to a}f(x)=f(a)$.

**Théorème des valeurs intermédiaires (TVI)** : si $f$ est continue sur $[a;b]$ et si $f(a)\\cdot f(b)<0$, alors il existe $c\\in]a;b[$ tel que $f(c)=0$.

## 2. Fonction réciproque
Si $f$ est **strictement monotone et continue** sur $I$, elle est bijective de $I$ vers $J=f(I)$. Sa réciproque $f^{-1}$ vérifie :
$$(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$$

## 3. Branches infinies
- **Asymptote horizontale** : $\\lim_{x\\to\\pm\\infty}f(x)=l$
- **Asymptote verticale** : $\\lim_{x\\to a}f(x)=\\pm\\infty$
- **Asymptote oblique** : $\\lim_{x\\to\\pm\\infty}[f(x)-(ax+b)]=0$

## 4. Dérivées – formules clés
| Fonction | Dérivée |
|----------|---------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\\ln x$ | $1/x$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |
| $f^\\alpha$ | $\\alpha f' f^{\\alpha-1}$ |
| $\\ln f$ | $f'/f$ |
| $e^f$ | $f'e^f$ |

## 5. Fonctions usuelles au BAC S1
- Polynômes et fractions rationnelles
- Fonctions trigonométriques : $\\sin, \\cos, \\tan$
- Logarithme népérien $\\ln$ et exponentielle $e^x$
- Fonctions puissances $x^\\alpha$ ($\\alpha\\in\\mathbb{R}$)`,
        exercises: [
          ex('Dérivée de f^α',
            'La dérivée de $f(x) = (2x+1)^5$ est :',
            opt('$5(2x+1)^4$', '$10(2x+1)^4$', '$5(2x+1)^5$', '$2(2x+1)^4$'),
            'B', "On applique $(f^\\alpha)' = \\alpha f' f^{\\alpha-1}$ avec $f=2x+1$, $f'=2$, $\\alpha=5$. Résultat : $5\\times 2\\times(2x+1)^4 = 10(2x+1)^4$.", 2),
          ex('Dérivée de ln f',
            'La dérivée de $g(x) = \\ln(x^2+1)$ est :',
            opt('$\\frac{1}{x^2+1}$', '$\\frac{2x}{x^2+1}$', '$\\frac{x}{x^2+1}$', '$2\\ln(x^2+1)$'),
            'B', "$(\\ln f)' = f'/f$ avec $f=x^2+1$ et $f'=2x$. Donc $g'(x) = \\frac{2x}{x^2+1}$.", 2),
          ex('TVI – existence d\'une racine',
            'Soit $f(x)=x^3-2x-5$. On a $f(2)=-1<0$ et $f(3)=16>0$. D\'après le TVI :',
            opt('$f$ n\'a aucune racine sur $[2;3]$', '$f$ a au moins une racine sur $]2;3[$', '$f(2.5)=0$', '$f$ est croissante sur $[2;3]$'),
            'B', "$f$ est continue (polynôme) et $f(2)\\cdot f(3)<0$. Le TVI garantit l'existence d'un $c\\in]2;3[$ avec $f(c)=0$.", 2),
          ex('Asymptote oblique',
            'La droite $y=2x+1$ est asymptote oblique à $\\mathcal{C}_f$ en $+\\infty$ si :',
            opt('$f(x)=2x+1$ pour tout $x$', '$\\lim_{x\\to+\\infty}[f(x)-2x-1]=0$', '$f\'(x)=2$ pour tout $x$', '$f(x)=2x+1$ pour $x$ grand'),
            'B', "Une asymptote oblique $y=ax+b$ vérifie $\\lim_{x\\to\\pm\\infty}[f(x)-ax-b]=0$. La courbe s'approche de la droite sans l'atteindre.", 3),
          ex('Dérivée de la réciproque',
            'Si $f(x)=e^x$, alors $(f^{-1})\'(y)$ =',
            opt('$e^y$', '$\\frac{1}{y}$', '$\\ln y$', '$y$'),
            'B', "$(f^{-1})'(y)=\\frac{1}{f'(f^{-1}(y))}$. Ici $f^{-1}=\\ln$, $f'=e^x$, donc $(f^{-1})'(y)=\\frac{1}{e^{\\ln y}}=\\frac{1}{y}$. On retrouve $(\\ln y)'=1/y$.", 3),
          ex('Continuité et TVI',
            'La fonction $f(x)=x^3+x-3$ est continue sur $\\mathbb{R}$. On a $f(1)=-1$ et $f(2)=7$. Le TVI garantit :',
            opt("$f$ est croissante sur $[1;2]$", "$f$ a une racine dans $]1;2[$", "$f(1{,}5)=0$", "$f$ est dérivable en tout point"),
            'B', "$f$ est continue (polynôme), $f(1)\\cdot f(2)<0$. Le TVI assure l'existence d'au moins une racine dans $]1;2[$. Il ne précise pas la valeur exacte.", 2),
        ],
      },
      {
        title: 'Suites numériques – Compléments',
        order_index: 2,
        summary: 'Convergence des suites monotones bornées, suites adjacentes, limite de U_{n+1}=f(U_n).',
        key_formulas: [
          'Toute suite croissante majorée converge',
          'Toute suite décroissante minorée converge',
          'Si U_{n+1}=f(U_n) et U_n→l, alors l=f(l) (point fixe)',
          'u_n = u_0·qⁿ (géométrique) ; u_n = u_0 + n·r (arithmétique)',
        ],
        course_content: `# Suites numériques – Compléments

## 1. Théorèmes de convergence
**Théorème** : Toute suite **croissante et majorée** est convergente. Toute suite **décroissante et minorée** est convergente.

**Suites adjacentes** : deux suites $(u_n)$ et $(v_n)$ sont adjacentes si l'une est croissante, l'autre décroissante, et $v_n-u_n\\to 0$. Elles convergent vers la même limite.

## 2. Limite d'une suite U_{n+1} = f(U_n)
**Méthode :**
1. Montrer que $(u_n)$ est monotone et bornée → elle converge vers $l$
2. Passer à la limite dans $u_{n+1}=f(u_n)$ : $l = f(l)$ (équation du point fixe)
3. Vérifier que $l$ est dans l'intervalle stable

## 3. Suites récurrentes d'ordre 2
Si $u_{n+2} = au_{n+1}+bu_n$, on résout l'équation caractéristique $r^2=ar+b$.`,
        exercises: [
          ex('Suite croissante majorée',
            'La suite définie par $u_0=1$ et $u_{n+1}=\\frac{u_n+3}{2}$ est croissante et majorée par $3$. Elle converge vers :',
            opt('$1$', '$2$', '$3$', '$\\frac{3}{2}$'),
            'C', "Le point fixe vérifie $l=\\frac{l+3}{2}$, soit $2l=l+3$, donc $l=3$. La suite converge vers $3$.", 3),
          ex('Point fixe',
            'Si $u_{n+1}=f(u_n)$ et $(u_n)$ converge vers $l$, alors $l$ vérifie :',
            opt("$l = f'(l)$", '$l = f(l)$', '$l = 2f(l)$', '$l = 0$'),
            'B', "En passant à la limite dans $u_{n+1}=f(u_n)$, on obtient $l=f(l)$ : $l$ est un point fixe de $f$.", 2),
          ex('Suite bornée divergente',
            'La suite $u_n=(-1)^n$ est :',
            opt('convergente vers $0$', 'convergente vers $1$', 'bornée mais divergente', 'non bornée'),
            'C', "$u_n$ alterne entre $1$ et $-1$ : elle est bornée ($|u_n|\\leq 1$) mais elle oscille sans converger, donc elle diverge.", 2),
          ex('Suites adjacentes',
            'Deux suites $(u_n)$ et $(v_n)$ sont adjacentes si :',
            opt("L'une est croissante et l'autre constante", "L'une est croissante, l'autre décroissante et $v_n - u_n \\to 0$", 'Elles ont la même limite et sont toutes deux croissantes', 'Elles convergent vers des limites différentes'),
            'B', "Deux suites sont adjacentes si l'une est croissante ($(u_n)$), l'autre décroissante ($(v_n)$), et si $v_n - u_n \\to 0$. Dans ce cas, elles convergent vers la même limite.", 3),
          ex('Convergence par encadrement',
            'On montre que $0 \\leq u_n \\leq \\frac{1}{n}$ pour tout $n \\geq 1$. On peut conclure que $(u_n)$ :',
            opt('Diverge vers $+\\infty$', 'Converge vers $1$', 'Converge vers $0$', 'Est non bornée'),
            'C', "Par le théorème des gendarmes (squeeze theorem) : $0 \\leq u_n \\leq \\frac{1}{n}$, et $\\frac{1}{n} \\to 0$, donc $u_n \\to 0$.", 2),
        ],
      },
      {
        title: 'Calcul intégral',
        order_index: 3,
        summary: 'Définition, relation de Chasles, inégalités, intégration par parties, substitution, calcul d\'aires et de volumes de révolution.',
        key_formulas: [
          '∫_a^b f(x)dx = [F(x)]_a^b = F(b)-F(a)',
          'Chasles : ∫_a^b f = ∫_a^c f + ∫_c^b f',
          'IPP : ∫u·v\' = [uv] - ∫u\'·v',
          'Aire = ∫_a^b |f(x)-g(x)| dx',
          'Volume de révolution : V = π∫_a^b [f(x)]² dx',
        ],
        course_content: `# Calcul intégral

## 1. Définition et propriétés
Si $F$ est une primitive de $f$ sur $[a;b]$ :
$$\\int_a^b f(x)\\,dx = F(b)-F(a)$$

**Relation de Chasles** : $\\int_a^b f = \\int_a^c f + \\int_c^b f$

**Linéarité** : $\\int_a^b [\\alpha f + \\beta g] = \\alpha\\int_a^b f + \\beta\\int_a^b g$

**Positivité** : si $f\\geq 0$ sur $[a;b]$, alors $\\int_a^b f\\geq 0$

## 2. Intégration par parties (IPP)
$$\\int_a^b u(x)v'(x)\\,dx = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x)\\,dx$$

## 3. Changement de variable (substitution)
Si $x=\\varphi(t)$, alors $dx=\\varphi'(t)\\,dt$ et les bornes changent.

## 4. Calcul d'aires
**Aire entre deux courbes** :
$$\\mathcal{A} = \\int_a^b |f(x)-g(x)|\\,dx$$

## 5. Volumes de révolution
Rotation autour de l'axe des abscisses :
$$V = \\pi\\int_a^b [f(x)]^2\\,dx$$`,
        exercises: [
          ex('Calcul d\'intégrale',
            '$\\int_0^2 (3x^2 - 2x + 1)\\,dx$ vaut :',
            opt('$6$', '$8$', '$10$', '$4$'),
            'A', "$[x^3-x^2+x]_0^2 = (8-4+2)-(0) = 6$.", 2),
          ex('Intégration par parties',
            'Pour calculer $\\int_0^1 x e^x\\,dx$, on pose $u=x$ et $v\'=e^x$. Le résultat est :',
            opt('$e-1$', '$e$', '$1$', '$2e-1$'),
            'A', "IPP : $[xe^x]_0^1 - \\int_0^1 e^x\\,dx = e - [e^x]_0^1 = e-(e-1)=1$. Attention : $e - 1$.", 4),
          ex('Volume de révolution',
            'Le volume du solide engendré par la rotation de $f(x)=\\sqrt{x}$ autour de l\'axe des $x$ sur $[0;4]$ vaut $\\pi\\int_0^4 x\\,dx$ =',
            opt('$4\\pi$', '$8\\pi$', '$16\\pi$', '$2\\pi$'),
            'B', "$\\pi\\int_0^4 x\\,dx = \\pi[x^2/2]_0^4 = \\pi\\times 8 = 8\\pi$.", 3),
          ex('Relation de Chasles',
            'Si $\\int_0^3 f = 7$ et $\\int_1^3 f = 4$, alors $\\int_0^1 f$ =',
            opt('$3$', '$-3$', '$11$', '$\\frac{7}{4}$'),
            'A', "Par Chasles : $\\int_0^3 f = \\int_0^1 f + \\int_1^3 f$, donc $\\int_0^1 f = 7-4=3$.", 2),
          ex('Aire entre deux courbes',
            'L\'aire entre $f(x)=x^2$ et $g(x)=x$ sur $[0;1]$ est $\\int_0^1(x-x^2)\\,dx$ =',
            opt('$\\frac{1}{3}$', '$\\frac{1}{6}$', '$\\frac{1}{2}$', '$1$'),
            'B', "$\\int_0^1(x-x^2)\\,dx = [\\frac{x^2}{2}-\\frac{x^3}{3}]_0^1 = \\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$.", 3),
          ex('Substitution (changement de variable)',
            'Pour calculer $\\int_0^1 2x\\sqrt{x^2+1}\\,dx$, on pose $u=x^2+1$. Le résultat est :',
            opt('$\\sqrt{2}-1$', '$2(\\sqrt{2}-1)$', '$\\frac{2}{3}(2\\sqrt{2}-1)$', '$\\sqrt{2}$'),
            'C', "$du=2x\\,dx$. Pour $x=0$: $u=1$; $x=1$: $u=2$. $\\int_1^2 \\sqrt{u}\\,du=[\\frac{2}{3}u^{3/2}]_1^2=\\frac{2}{3}(2\\sqrt{2}-1)$.", 4),
        ],
      },
      {
        title: 'Équations différentielles',
        order_index: 4,
        summary: 'Équations du 1er et 2ème ordre à coefficients constants, homogènes et avec second membre de type A·cos(αt)+B·sin(αt).',
        key_formulas: [
          "y' + ay = 0 ⟹ y = Ce^(-ax)",
          "y'' + py' + qy = 0 : équation caractéristique r²+pr+q=0",
          'Δ>0 : y = C₁e^(r₁x) + C₂e^(r₂x)',
          'Δ=0 : y = (C₁+C₂x)e^(rx)',
          'Δ<0 : y = e^(αx)(C₁cos βx + C₂sin βx) avec r=α±iβ',
          "Second membre A·cos(αt) : solution particulière de la forme a·cos(αt)+b·sin(αt)",
        ],
        course_content: `# Équations différentielles

## 1. Équation du 1er ordre : $y' + ay = 0$
**Solution générale** : $y = Ce^{-ax}$, $C\\in\\mathbb{R}$

**Avec second membre** : $y' + ay = b(x)$
- On cherche une solution particulière $y_p$
- Solution générale = $y_p + Ce^{-ax}$

## 2. Équation du 2ème ordre : $y'' + py' + qy = 0$
**Équation caractéristique** : $r^2 + pr + q = 0$, discriminant $\\Delta = p^2 - 4q$

| Cas | Solutions | Solution générale |
|-----|-----------|-------------------|
| $\\Delta > 0$ | $r_1, r_2$ réels distincts | $y = C_1e^{r_1x}+C_2e^{r_2x}$ |
| $\\Delta = 0$ | $r_0$ racine double | $y = (C_1+C_2 x)e^{r_0 x}$ |
| $\\Delta < 0$ | $r = \\alpha\\pm i\\beta$ | $y = e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$ |

## 3. Avec second membre $A\\cos(\\omega t)+B\\sin(\\omega t)$
On cherche une solution particulière de la forme $y_p = a\\cos(\\omega t)+b\\sin(\\omega t)$ et on identifie $a$ et $b$ par substitution.`,
        exercises: [
          ex("Équation du 1er ordre",
            "La solution générale de $y' - 3y = 0$ est :",
            opt('$y = Ce^{3x}$', '$y = Ce^{-3x}$', '$y = 3x + C$', '$y = C\\cos(3x)$'),
            'A', "$y'+ay=0$ avec $a=-3$, donc $y=Ce^{-(-3)x}=Ce^{3x}$.", 2),
          ex("Équation caractéristique Δ>0",
            "L'équation caractéristique de $y''-5y'+6y=0$ a pour racines :",
            opt('$r=2$ et $r=3$', '$r=1$ et $r=6$', '$r=-2$ et $r=-3$', '$r=5$'),
            'A', "$r^2-5r+6=0$, $\\Delta=25-24=1$, $r=(5\\pm1)/2$ : $r_1=3$, $r_2=2$.", 3),
          ex("Δ<0 – racines complexes",
            "Si l'équation caractéristique a les racines $r=1\\pm 2i$, la solution générale de l'équation homogène est :",
            opt('$y=e^x(C_1\\cos 2x+C_2\\sin 2x)$', '$y=C_1e^x+C_2e^{2x}$', '$y=(C_1+C_2x)e^x$', '$y=C_1\\cos x+C_2\\sin x$'),
            'A', "Racines complexes $\\alpha\\pm i\\beta$ avec $\\alpha=1$, $\\beta=2$ : $y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$.", 3),
          ex("Équation différentielle avec condition initiale",
            "L'équation $y' + y = 0$ avec $y(0) = 5$ a pour solution :",
            opt('$y = 5e^{x}$', '$y = 5e^{-x}$', '$y = 5 - x$', '$y = e^{-5x}$'),
            'B', "$y' + ay = 0$ avec $a = 1$ donne $y = Ce^{-x}$. La condition initiale $y(0) = C = 5$ donne $y = 5e^{-x}$.", 2),
          ex("Δ=0 – racine double",
            "L'équation caractéristique de $y'' - 4y' + 4y = 0$ admet :",
            opt('Deux racines réelles distinctes $r=2$ et $r=-2$', 'Une racine double $r=2$', 'Deux racines complexes conjuguées', 'Aucune racine réelle'),
            'B', "$r^2 - 4r + 4 = (r-2)^2 = 0$, $\\Delta = 16 - 16 = 0$. Racine double $r_0 = 2$. Solution générale : $y = (C_1 + C_2 x)e^{2x}$.", 3),
        ],
      },
      {
        title: 'Probabilités et statistiques',
        order_index: 5,
        summary: 'Variables aléatoires discrètes, espérance, variance, loi binomiale, séries statistiques à deux variables, régression des moindres carrés, coefficient de corrélation.',
        key_formulas: [
          'E(X) = Σ xᵢ·pᵢ',
          'V(X) = E(X²) - [E(X)]²  ;  σ(X) = √V(X)',
          'X~B(n,p) : P(X=k) = C(n,k)·pᵏ·(1-p)^(n-k)',
          'E(X) = np  ;  V(X) = np(1-p)',
          'Droite de régression y en x : y = ax + b avec a = cov(X,Y)/V(X)',
          'Coefficient de corrélation linéaire : r = cov(X,Y)/(σX·σY)',
        ],
        course_content: `# Probabilités et statistiques

## 1. Variables aléatoires discrètes
**Espérance** : $E(X) = \\sum_i x_i p_i$

**Variance** : $V(X) = E(X^2) - [E(X)]^2$

**Écart-type** : $\\sigma(X) = \\sqrt{V(X)}$

## 2. Loi binomiale $X \\sim B(n, p)$
Répétition de $n$ épreuves de Bernoulli indépendantes, probabilité de succès $p$.
$$P(X=k) = \\binom{n}{k} p^k(1-p)^{n-k}$$
- $E(X) = np$
- $V(X) = np(1-p)$

## 3. Séries statistiques à deux variables
Nuage de points $(x_i, y_i)$, point moyen $G=(\\bar{x}, \\bar{y})$.

**Covariance** : $\\text{cov}(X,Y) = \\overline{xy} - \\bar{x}\\cdot\\bar{y}$

**Droite de régression** (moindres carrés) de $y$ en $x$ :
$$y = ax + b, \\quad a = \\frac{\\text{cov}(X,Y)}{V(X)}, \\quad b = \\bar{y} - a\\bar{x}$$

**Coefficient de corrélation linéaire** :
$$r = \\frac{\\text{cov}(X,Y)}{\\sigma_X \\cdot \\sigma_Y}, \\quad r\\in[-1;1]$$
Si $|r|$ est proche de $1$, la corrélation est forte.`,
        exercises: [
          ex('Loi binomiale – probabilité',
            'On répète 5 fois une épreuve de Bernoulli avec $p=0{,}4$. La probabilité d\'obtenir exactement 2 succès est $C_5^2 \\times 0{,}4^2 \\times 0{,}6^3$ =',
            opt('$0{,}2304$', '$0{,}3456$', '$0{,}1296$', '$0{,}4$'),
            'A', "$C_5^2=10$, $0{,}4^2=0{,}16$, $0{,}6^3=0{,}216$. Résultat : $10\\times0{,}16\\times0{,}216=0{,}3456$. Attention : réponse B est $0{,}3456$.", 3),
          ex('Espérance loi binomiale',
            'Si $X\\sim B(20 ; 0{,}3)$, alors $E(X)$ vaut :',
            opt('$6$', '$0{,}3$', '$14$', '$3$'),
            'A', "$E(X)=np=20\\times0{,}3=6$. L'espérance de la loi binomiale est toujours $np$.", 2),
          ex('Coefficient de corrélation',
            'Un coefficient de corrélation $r=-0{,}95$ indique :',
            opt('Aucune corrélation', 'Une forte corrélation positive', 'Une forte corrélation négative', 'Une corrélation modérée'),
            'C', "$r$ proche de $-1$ signifie une forte liaison linéaire négative : quand $X$ augmente, $Y$ diminue fortement.", 2),
          ex('Droite de régression',
            'Si $\\bar{x}=4$, $\\bar{y}=10$, $a=1{,}5$ (pente), alors l\'ordonnée à l\'origine $b$ de la droite de régression est :',
            opt('$4$', '$6$', '$16$', '$14$'),
            'A', "$b = \\bar{y} - a\\bar{x} = 10 - 1{,}5\\times4 = 10-6=4$.", 2),
          ex('Variance',
            'Si $X$ prend les valeurs $1$ et $3$ avec probabilités $0{,}5$ chacune, alors $V(X)$ =',
            opt('$1$', '$2$', '$4$', '$0$'),
            'A', "$E(X)=0{,}5\\times1+0{,}5\\times3=2$. $E(X^2)=0{,}5\\times1+0{,}5\\times9=5$. $V(X)=5-4=1$.", 3),
        ],
      },
      {
        title: 'Nombres complexes et similitudes planes',
        order_index: 6,
        summary: 'Forme algébrique et trigonométrique, module, argument, formule de Moivre, racines nièmes, similitudes directes planes.',
        key_formulas: [
          'z = a + ib  ;  |z| = √(a²+b²)  ;  arg(z) = θ',
          'z = r(cosθ + i sinθ) = r·e^(iθ)',
          'z^n = r^n·e^(inθ)  (formule de Moivre)',
          '|z·z\'| = |z|·|z\'|  ;  arg(z·z\') = arg(z)+arg(z\') [2π]',
          'Racines nièmes de z₀ : module r₀^(1/n), arguments (θ₀+2kπ)/n, k=0..n-1',
          'Similitude directe : z\' = az + b, a∈ℂ*, b∈ℂ',
        ],
        course_content: `# Nombres complexes et similitudes planes

## 1. Formes d'un nombre complexe
- **Algébrique** : $z = a + ib$, $a = \\text{Re}(z)$, $b = \\text{Im}(z)$
- **Trigonométrique** : $z = r(\\cos\\theta + i\\sin\\theta)$ où $r=|z|$, $\\theta=\\arg(z)$
- **Exponentielle** : $z = re^{i\\theta}$

## 2. Formule de Moivre
$$z^n = r^n e^{in\\theta} = r^n(\\cos n\\theta + i\\sin n\\theta)$$

## 3. Racines $n$-ièmes de $z_0 = r_0 e^{i\\theta_0}$
$$z_k = r_0^{1/n} e^{i(\\theta_0+2k\\pi)/n}, \\quad k=0,1,\\ldots,n-1$$

## 4. Identités trigonométriques via les complexes
$$\\cos\\theta = \\frac{e^{i\\theta}+e^{-i\\theta}}{2}, \\quad \\sin\\theta = \\frac{e^{i\\theta}-e^{-i\\theta}}{2i}$$

## 5. Similitudes planes directes
Une similitude directe de rapport $k$ et d'angle $\\alpha$ s'écrit :
$$z' = az + b, \\quad a = ke^{i\\alpha}\\in\\mathbb{C}^*$$
- Si $a\\neq 1$ : centre fixe $\\Omega$ tel que $\\Omega(a-1)+b=0$, soit $z_\\Omega = b/(1-a)$`,
        exercises: [
          ex('Module d\'un complexe',
            'Le module de $z = 3 - 4i$ est :',
            opt('$7$', '$5$', '$\\sqrt{7}$', '$1$'),
            'B', "$|z| = \\sqrt{3^2+(-4)^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.", 1),
          ex('Formule de Moivre',
            'En utilisant la formule de Moivre, $(\\cos\\frac{\\pi}{6}+i\\sin\\frac{\\pi}{6})^6$ vaut :',
            opt('$i$', '$-1$', '$1$', '$-i$'),
            'B', "$(e^{i\\pi/6})^6 = e^{i\\pi} = \\cos\\pi+i\\sin\\pi = -1$.", 2),
          ex('Racines cubiques',
            'Le nombre de racines cubiques de $-8$ est :',
            opt('$1$', '$2$', '$3$', '$8$'),
            'C', "Tout nombre complexe non nul a exactement $n$ racines $n$-ièmes distinctes. $-8$ a donc $3$ racines cubiques.", 2),
          ex('Centre d\'une similitude',
            "Une similitude directe est donnée par $z'=2iz+1-i$. Le centre $\\Omega$ vérifie $z_\\Omega = b/(1-a)$ =",
            opt('$\\frac{1-i}{1-2i}$', '$\\frac{1+i}{2}$', '$1-i$', '$\\frac{-1+i}{1-2i}$'),
            'A', "$a=2i$, $b=1-i$. Centre : $z_\\Omega = \\frac{1-i}{1-2i}$. On peut simplifier en multipliant par le conjugué.", 4),
          ex('Conjugué et module',
            'Si $z=2+3i$, alors $z\\cdot\\bar{z}$ vaut :',
            opt('$13$', '$4-9$', '$4+9i$', '$1$'),
            'A', "$z\\cdot\\bar{z} = (2+3i)(2-3i) = 4+9 = 13 = |z|^2$. Produit d'un complexe par son conjugué = module au carré.", 1),
          ex('Argument d\'un produit',
            '$\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2)$ modulo $2\\pi$. Si $\\arg(z_1)=\\frac{\\pi}{3}$ et $\\arg(z_2)=\\frac{\\pi}{2}$, alors $\\arg(z_1 z_2)$ =',
            opt('$\\frac{\\pi}{6}$', '$\\frac{5\\pi}{6}$', '$\\pi$', '$\\frac{\\pi}{5}$'),
            'B', "$\\arg(z_1 z_2) = \\frac{\\pi}{3}+\\frac{\\pi}{2} = \\frac{2\\pi+3\\pi}{6} = \\frac{5\\pi}{6}$.", 2),
        ],
      },
      {
        title: 'Géométrie plane et dans l\'espace',
        order_index: 7,
        summary: 'Barycentres, applications affines, similitudes directes, produit vectoriel et mixte, transformations dans l\'espace, courbes paramétrées et coniques.',
        key_formulas: [
          'Barycentre G de (A,a),(B,b),(C,c) : (a+b+c)·OG = a·OA + b·OB + c·OC',
          'Produit vectoriel : u⃗∧v⃗ ⊥ u⃗ et v⃗, |u⃗∧v⃗| = |u⃗||v⃗|sinθ',
          'Produit mixte : [u⃗,v⃗,w⃗] = u⃗·(v⃗∧w⃗) = det(u⃗,v⃗,w⃗)',
          'Conique (foyer F, directrice d) : MF/d(M,d) = e (excentricité)',
          'Ellipse : e<1  ;  Parabole : e=1  ;  Hyperbole : e>1',
        ],
        course_content: `# Géométrie plane et dans l'espace

## 1. Barycentres
Le barycentre $G$ des points pondérés $(A_i, a_i)$ vérifie :
$$\\left(\\sum a_i\\right)\\cdot\\overrightarrow{OG} = \\sum a_i\\cdot\\overrightarrow{OA_i}$$

## 2. Applications affines et similitudes directes planes
Une **application affine** conserve le parallélisme et les rapports de division.
Une **similitude directe** conserve les angles orientés et les rapports de distances.

## 3. Produit vectoriel dans l'espace
Si $\\vec{u}=(u_1,u_2,u_3)$ et $\\vec{v}=(v_1,v_2,v_3)$ :
$$\\vec{u}\\wedge\\vec{v} = (u_2v_3-u_3v_2,\\; u_3v_1-u_1v_3,\\; u_1v_2-u_2v_1)$$
**Propriétés** : $\\vec{u}\\wedge\\vec{v}\\perp\\vec{u}$ et $\\vec{u}\\wedge\\vec{v}\\perp\\vec{v}$, $|\\vec{u}\\wedge\\vec{v}|=|\\vec{u}||\\vec{v}|\\sin\\theta$

## 4. Coniques (définition foyer-directrice)
Une conique est le lieu des points $M$ tels que $\\frac{MF}{d(M,\\Delta)}=e$.
- **Ellipse** ($e<1$) : $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$, $b^2=a^2(1-e^2)$
- **Parabole** ($e=1$) : $y^2=4px$
- **Hyperbole** ($e>1$) : $\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$

## 5. Courbes paramétrées
$\\begin{cases}x=f(t)\\\\y=g(t)\\end{cases}$ : tangente en $t_0$ dirigée par $(f'(t_0), g'(t_0))$.`,
        exercises: [
          ex('Produit vectoriel',
            'Si $\\vec{u}=(1,0,0)$ et $\\vec{v}=(0,1,0)$, alors $\\vec{u}\\wedge\\vec{v}$ vaut :',
            opt('$(0,0,1)$', '$(1,1,0)$', '$(0,0,-1)$', '$(1,0,1)$'),
            'A', "$(u_2v_3-u_3v_2, u_3v_1-u_1v_3, u_1v_2-u_2v_1) = (0-0, 0-0, 1-0) = (0,0,1)$.", 2),
          ex('Nature d\'une conique',
            'Une conique d\'excentricité $e=0{,}6$ est :',
            opt('Une parabole', 'Une hyperbole', 'Un cercle', 'Une ellipse'),
            'D', "Ellipse si $e<1$, parabole si $e=1$, hyperbole si $e>1$. Ici $e=0{,}6<1$ : c'est une ellipse.", 1),
          ex('Barycentre',
            'Le barycentre de $(A, 2)$ et $(B, 3)$ divise $[AB]$ dans le rapport :',
            opt('$2/3$ à partir de $A$', '$3/5$ à partir de $A$', '$2/5$ à partir de $A$', '$1/2$'),
            'B', "$G$ divise $AB$ tel que $\\overrightarrow{AG} = \\frac{3}{5}\\overrightarrow{AB}$. En effet, $2\\overrightarrow{GA}+3\\overrightarrow{GB}=0$ donne $\\overrightarrow{AG}/\\overrightarrow{GB}=3/2$, donc $AG = 3/5 \\cdot AB$.", 3),
          ex('Parabole – équation',
            'La parabole de foyer $F(0,1)$ et directrice $y=-1$ a pour équation :',
            opt('$y=x^2$', '$x^2=4y$', '$y^2=4x$', '$x=y^2$'),
            'B', "La parabole $y^2=4px$ a foyer $(p,0)$. Ici, foyer $(0,1)$ avec axe vertical : $x^2=4py$ avec $p=1$, soit $x^2=4y$.", 3),
          ex('Produit mixte et coplanarité',
            'Trois vecteurs $\\vec{u}$, $\\vec{v}$, $\\vec{w}$ sont coplanaires si et seulement si leur produit mixte est :',
            opt('Égal à $1$', 'Nul', 'Maximum', 'Positif'),
            'B', "Le produit mixte $[\\vec{u},\\vec{v},\\vec{w}]=\\vec{u}\\cdot(\\vec{v}\\wedge\\vec{w})$ représente le volume du parallélépipède. S'il est nul, les trois vecteurs sont coplanaires (volume = 0).", 3),
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES S2/S4  (Programme LS – Terminale S2/S4)
  // ══════════════════════════════════════════════════════════════════════════
  [SID.S2_MATHS]: {
    chapters: [
      {
        title: 'Fonctions numériques et usuelles',
        order_index: 1,
        summary: 'Rappels continuité, TVI, dérivées et primitives, fonctions du type f^α, dérivée de la réciproque, fonctions polynômes, rationnelles, trigonométriques, ln, exp, puissances.',
        key_formulas: [
          '(f^α)\' = α·f\'·f^(α-1)',
          '(ln f)\' = f\'/f  ;  (e^f)\' = f\'·e^f',
          'TVI : f continue, f(a)·f(b)<0 ⟹ ∃c : f(c)=0',
          'si f bijective et dérivable, (f⁻¹)\'(y) = 1/f\'(f⁻¹(y))',
        ],
        course_content: `# Fonctions numériques et usuelles (S2/S4)

## 1. Objectifs du chapitre
Dans ce chapitre, l'élève de Terminale S2 doit savoir :

- déterminer le domaine de définition d'une fonction
- calculer des limites et reconnaître une forme indéterminée
- étudier la continuité d'une fonction
- utiliser le théorème des valeurs intermédiaires
- dériver une fonction composée, quotient, produit ou réciproque
- dresser un tableau de variations complet
- interpréter graphiquement les résultats

## 2. Domaine de définition
Le **domaine de définition** d'une fonction est l'ensemble des réels pour lesquels son écriture a un sens.

### Cas classiques
- Pour une fraction : le dénominateur doit être non nul.
- Pour un logarithme : l'expression à l'intérieur doit être strictement positive.
- Pour une racine carrée : l'expression sous le radical doit être positive ou nulle.

### Exemples
- $f(x)=\\frac{2x+1}{x-3}$ est définie sur $\\mathbb{R}\\setminus\\{3\\}$
- $g(x)=\\ln(x+2)$ est définie sur $]-2;+\\infty[$
- $h(x)=\\sqrt{5-x}$ est définie sur $]-\\infty;5]$

## 3. Continuité et théorème des valeurs intermédiaires
Une fonction $f$ est **continue en $a$** si :
$$\\lim_{x\\to a}f(x)=f(a)$$

Les polynômes, fonctions rationnelles sur leur domaine, fonctions exponentielle, logarithme et trigonométriques usuelles sont continues sur leurs domaines de définition.

### Théorème des valeurs intermédiaires (TVI)
Si $f$ est continue sur $[a;b]$ et si $f(a)$ et $f(b)$ sont de signes contraires, alors il existe au moins un réel $c\\in]a;b[$ tel que $f(c)=0$.

### Utilité au BAC
Le TVI sert surtout à :

- montrer qu'une équation admet une solution
- localiser une racine dans un intervalle
- justifier numériquement une existence avant approximation

## 4. Limites et asymptotes
L'étude des limites permet de comprendre le comportement d'une courbe aux bornes du domaine.

### Asymptote horizontale
Si $\\lim_{x\\to \\pm\\infty} f(x)=\\ell$, alors la droite $y=\\ell$ est une asymptote horizontale.

### Asymptote verticale
Si $\\lim_{x\\to a} f(x)=\\pm\\infty$, alors la droite $x=a$ est une asymptote verticale.

### Asymptote oblique
Si $\\lim_{x\\to \\pm\\infty}[f(x)-(ax+b)]=0$, alors la droite $y=ax+b$ est une asymptote oblique.

### Méthodes usuelles
- factoriser par le terme de plus haut degré
- utiliser les limites de référence
- reconnaître les formes $\\frac{\\infty}{\\infty}$, $\\infty-\\infty$, $0\\times\\infty$

## 5. Dérivation
La dérivée mesure la variation instantanée de la fonction.

### Formules à maîtriser
- $(u+v)' = u'+v'$
- $(uv)' = u'v+uv'$
- $\\left(\\frac{u}{v}\\right)' = \\frac{u'v-uv'}{v^2}$
- $(e^u)' = u'e^u$
- $(\\ln u)' = \\frac{u'}{u}$
- $(u^\\alpha)' = \\alpha u' u^{\\alpha-1}$

### Fonctions usuelles
- $(x^n)' = nx^{n-1}$
- $(\\sin x)' = \\cos x$
- $(\\cos x)' = -\\sin x$
- $(\\tan x)' = 1+\\tan^2 x$ sur son domaine
- $(e^x)' = e^x$
- $(\\ln x)' = \\frac{1}{x}$ sur $]0;+\\infty[$

## 6. Fonction réciproque
Si une fonction est continue, strictement monotone et bijective sur un intervalle, alors elle admet une fonction réciproque.

Si en plus $f$ est dérivable et $f'(x)\\neq 0$, alors :
$$\\left(f^{-1}\\right)'(y)=\\frac{1}{f'(f^{-1}(y))}$$

Cette formule est importante pour les fonctions logarithmes, exponentielles et certaines fonctions trigonométriques restreintes.

## 7. Étude complète d'une fonction
Une étude de fonction au BAC suit en général cet ordre :

1. déterminer le domaine
2. calculer les limites utiles
3. étudier la continuité éventuelle
4. calculer la dérivée
5. étudier le signe de la dérivée
6. dresser le tableau de variations
7. repérer les asymptotes et points remarquables
8. tracer ou interpréter l'allure de la courbe

## 8. Fonctions trigonométriques, logarithme et exponentielle
### Fonctions trigonométriques
- $\\sin$ et $\\cos$ sont définies sur $\\mathbb{R}$ et périodiques de période $2\\pi$
- $\\tan$ est définie sur $\\mathbb{R}\\setminus\\left\\{\\frac{\\pi}{2}+k\\pi\\right\\}$

### Logarithme népérien
- domaine : $]0;+\\infty[$
- croissance : la fonction $\\ln$ est strictement croissante
- propriétés :
  - $\\ln(ab)=\\ln a + \\ln b$
  - $\\ln\\left(\\frac{a}{b}\\right)=\\ln a - \\ln b$
  - $\\ln(a^n)=n\\ln a$

### Exponentielle
- définie sur $\\mathbb{R}$
- toujours strictement positive
- strictement croissante
- propriétés :
  - $e^{a+b}=e^ae^b$
  - $e^{-a}=\\frac{1}{e^a}$
  - $\\ln(e^x)=x$ et $e^{\\ln x}=x$ pour $x>0$

## 9. Conseils méthode
- ne jamais dériver avant d'avoir trouvé le domaine
- dans un TVI, toujours vérifier la continuité puis le changement de signe
- pour une limite à l'infini d'une fraction rationnelle, diviser par la plus grande puissance de $x$
- dans un tableau de variations, séparer clairement les zéros de la dérivée et les valeurs interdites

## 10. À retenir
- la continuité permet de justifier l'existence d'une racine
- la dérivée donne le sens de variation
- les limites déterminent les asymptotes
- l'étude de fonction est une synthèse de plusieurs outils du programme`,
        exercises: [
          ex('Dérivée – règle de chaîne',
            'La dérivée de $f(x) = e^{x^2-1}$ est :',
            opt('$e^{x^2-1}$', '$2xe^{x^2-1}$', '$(x^2-1)e^{x^2-2}$', '$2e^{x^2-1}$'),
            'B', "$(e^u)'=u'e^u$ avec $u=x^2-1$, $u'=2x$. Résultat : $2xe^{x^2-1}$.", 2),
          ex('Limite – asymptote horizontale',
            '$\\lim_{x\\to+\\infty}\\frac{3x^2+1}{x^2-5}$ =',
            opt('$0$', '$3$', '$+\\infty$', '$-\\frac{1}{5}$'),
            'B', "On divise numérateur et dénominateur par $x^2$ : $\\frac{3+1/x^2}{1-5/x^2}\\to\\frac{3}{1}=3$.", 2),
          ex('Signe de la dérivée',
            "Si $f'(x) < 0$ sur $]a;b[$, la fonction $f$ est :",
            opt('Croissante', 'Constante', 'Décroissante', 'Nulle'),
            'C', "Un signe négatif de $f'$ traduit une diminution de $f$ : la fonction est strictement décroissante sur l'intervalle.", 1),
          ex('Dérivée de e^f',
            'La dérivée de $h(x) = e^{\\sin x}$ est :',
            opt('$e^{\\sin x}$', '$\\cos x \\cdot e^{\\sin x}$', '$\\sin x \\cdot e^{\\cos x}$', '$e^{\\cos x}$'),
            'B', "$(e^u)' = u' e^u$ avec $u = \\sin x$ et $u' = \\cos x$. Résultat : $\\cos x \\cdot e^{\\sin x}$.", 2),
          ex('TVI – application',
            'On cherche une racine de $f(x)=\\ln x - x + 2$. On a $f(1)=1>0$ et $f(4)\\approx-0{,}61<0$. Le TVI assure :',
            opt('$f(2)=0$ exactement', 'Une racine dans $]1;4[$', 'Deux racines dans $[1;4]$', '$f$ est injective'),
            'B', "$f$ est continue (ln et x le sont), $f(1)>0$ et $f(4)<0$ : le TVI garantit une racine dans $]1;4[$. Il n'en précise ni l'unicité ni la valeur exacte.", 2),
        ],
      },
      {
        title: 'Suites numériques',
        order_index: 2,
        summary: 'Compléments sur la convergence, suites monotones bornées, limite d\'une suite U_{n+1}=f(U_n).',
        key_formulas: [
          'Toute suite croissante majorée converge',
          'Si U_{n+1}=f(U_n) et U_n→l, alors f(l)=l',
          'Suites adjacentes : convergence commune',
        ],
        course_content: `# Suites numériques (S2/S4)

## 1. Notion de suite
Une suite numérique est une fonction définie sur $\\mathbb{N}$.
On note ses termes $u_0, u_1, u_2, \\dots, u_n$.

On rencontre principalement :

- les suites définies **explicitement** : $u_n=f(n)$
- les suites définies **par récurrence** : $u_{n+1}=f(u_n)$

## 2. Suites arithmétiques et géométriques
### Suite arithmétique
Une suite est arithmétique si :
$$u_{n+1}=u_n+r$$
où $r$ est la raison.

Formule explicite :
$$u_n=u_0+nr$$

### Suite géométrique
Une suite est géométrique si :
$$u_{n+1}=qu_n$$
où $q$ est la raison.

Formule explicite :
$$u_n=u_0q^n$$

### Interprétation rapide
- si $r>0$, une suite arithmétique est croissante
- si $q>1$ et $u_0>0$, une suite géométrique est croissante
- si $0<q<1$, une suite géométrique positive décroît vers $0$

## 3. Monotonie d'une suite
Pour étudier la monotonie, on compare :

- soit $u_{n+1}-u_n$
- soit, si les termes sont positifs, $\\frac{u_{n+1}}{u_n}$

### Règles
- si $u_{n+1}-u_n \\ge 0$, la suite est croissante
- si $u_{n+1}-u_n \\le 0$, la suite est décroissante

## 4. Suites bornées
Une suite est :

- **majorée** si $u_n \\le M$ pour tout $n$
- **minorée** si $u_n \\ge m$ pour tout $n$
- **bornée** si elle est à la fois majorée et minorée

L'encadrement est une étape clé avant toute preuve de convergence.

## 5. Théorèmes de convergence
### Théorème fondamental
- toute suite croissante et majorée converge
- toute suite décroissante et minorée converge

Ce résultat est central en Terminale S2.

### Théorème des gendarmes
Si $u_n \\le v_n \\le w_n$ et si $u_n\\to l$ et $w_n\\to l$, alors $v_n\\to l$.

## 6. Suites adjacentes
Deux suites $(u_n)$ et $(v_n)$ sont adjacentes si :

- l'une est croissante
- l'autre est décroissante
- $v_n-u_n\\to 0$

Alors elles convergent vers la même limite.

## 7. Suites définies par récurrence : méthode complète
Pour une suite définie par :
$$u_{n+1}=f(u_n)$$

on suit en général cette méthode :

### Étape 1 : trouver un intervalle stable
On cherche un intervalle $I$ tel que si $u_n\\in I$, alors $u_{n+1}=f(u_n)\\in I$.

### Étape 2 : montrer que la suite est monotone
On étudie le signe de $u_{n+1}-u_n$ ou on utilise le sens de variation de $f$.

### Étape 3 : montrer qu'elle est bornée
On prouve que tous les termes restent dans l'intervalle stable.

### Étape 4 : conclure à la convergence
La suite étant monotone et bornée, elle converge.

### Étape 5 : calculer la limite
Si $u_n\\to l$ et si $f$ est continue, alors :
$$l=f(l)$$
On résout cette équation, puis on choisit la solution compatible avec les bornes de la suite.

## 8. Limites usuelles
À connaître :

- si $|q|<1$, alors $q^n\\to 0$
- si $q>1$, alors $q^n\\to +\\infty$
- si $q<-1$, alors la suite $q^n$ diverge par oscillation d'amplitude croissante
- $\\frac{1}{n}\\to 0$
- $\\frac{n+1}{2n+3}\\to \\frac{1}{2}$

## 9. Raisonnement par récurrence
La récurrence permet de démontrer une propriété vraie pour tout entier naturel.

Elle comporte deux étapes :

1. **initialisation** : vérifier la propriété au premier rang
2. **hérédité** : supposer la propriété vraie au rang $n$ et la montrer au rang $n+1$

Cette méthode est souvent utilisée pour prouver qu'une suite est bornée.

## 10. Erreurs fréquentes
- résoudre $l=f(l)$ sans avoir prouvé que la suite converge
- oublier de montrer que la suite reste dans un intervalle stable
- confondre suite bornée et suite convergente
- conclure à la monotonie sans signe explicite de $u_{n+1}-u_n$

## 11. À retenir
- monotone + bornée = convergente
- pour une suite récurrente, la limite est un point fixe
- l'encadrement et la récurrence sont des outils essentiels du chapitre`,
        exercises: [
          ex('Suite récurrente – point fixe',
            "La suite définie par $u_0=0$ et $u_{n+1}=\\frac{1}{2}u_n+1$ converge vers :",
            opt('$0$', '$1$', '$2$', '$\\frac{1}{2}$'),
            'C', "$l=\\frac{l}{2}+1 \\Rightarrow l-l/2=1 \\Rightarrow l/2=1 \\Rightarrow l=2$.", 3),
          ex('Convergence',
            "La suite $u_n = \\frac{n+1}{2n+3}$ converge vers :",
            opt('$1$', '$0$', '$\\frac{1}{2}$', '$+\\infty$'),
            'C', "$\\frac{n+1}{2n+3} = \\frac{1+1/n}{2+3/n}\\to\\frac{1}{2}$.", 2),
          ex('Suite bornée et monotone',
            "La suite définie par $u_0 = 0$ et $u_{n+1} = \\sqrt{u_n + 2}$ est croissante et majorée par $2$. Sa limite est :",
            opt('$0$', '$1$', '$2$', '$\\sqrt{2}$'),
            'C', "En cherchant le point fixe : $l = \\sqrt{l+2}$, soit $l^2 = l+2$, $l^2 - l - 2 = 0$, $(l-2)(l+1)=0$. Comme $l \\geq 0$, on obtient $l = 2$.", 3),
          ex('Suite géométrique de raison > 1',
            "La suite $u_n = 3 \\times 2^n$ est :",
            opt('Arithmétique de raison $2$', 'Géométrique de raison $2$ tendant vers $+\\infty$', 'Convergente vers $3$', 'Bornée'),
            'B', "$u_{n+1}/u_n = 3 \\times 2^{n+1} / (3 \\times 2^n) = 2$. C'est une suite géométrique de raison $q = 2 > 1$, donc $u_n \\to +\\infty$.", 2),
          ex('Raisonnement par récurrence',
            "On veut montrer par récurrence que $u_n \\leq 2$ pour tout $n$. Après avoir vérifié $u_0 \\leq 2$, on suppose $u_k \\leq 2$ et on montre $u_{k+1} \\leq 2$. Cette étape s'appelle :",
            opt("L'initialisation", "L'hérédité", "La conclusion", "Le cas de base uniquement"),
            'B', "Le raisonnement par récurrence comprend deux étapes : l'initialisation (vérifier au rang 0 ou 1) et l'hérédité (supposer vrai au rang $k$, montrer vrai au rang $k+1$). L'étape décrite est l'hérédité.", 2),
        ],
      },
      {
        title: 'Calcul intégral et équations différentielles',
        order_index: 3,
        summary: 'Intégrale de Riemann, propriétés (Chasles, inégalités), intégration par parties, aires, volumes. Équations différentielles d\'ordre 1 et 2.',
        key_formulas: [
          '∫_a^b f = F(b)-F(a)',
          'IPP : ∫_a^b u·v\' = [uv] - ∫_a^b u\'·v',
          'V = π∫_a^b [f(x)]² dx',
          "y' + ay = 0 ⟹ y = Ce^(-ax)",
          'Éq. caract. r²+pr+q=0 selon Δ',
        ],
        course_content: `# Calcul intégral et équations différentielles (S2/S4)

## 1. Primitives et intégrales
Une primitive de $f$ sur un intervalle $I$ est une fonction $F$ telle que :
$$F'(x)=f(x)$$

Si $F$ est une primitive de $f$ sur $[a;b]$, alors :
$$\\int_a^b f(x)\\,dx = F(b)-F(a)$$

Cette formule est la base du calcul intégral au BAC.

## 2. Propriétés de l'intégrale
### Linéarité
$$\\int_a^b (\\alpha f + \\beta g)=\\alpha\\int_a^b f + \\beta\\int_a^b g$$

### Relation de Chasles
$$\\int_a^b f = \\int_a^c f + \\int_c^b f$$

### Positivité
Si $f(x)\\ge 0$ sur $[a;b]$, alors :
$$\\int_a^b f(x)\\,dx \\ge 0$$

## 3. Primitives usuelles à maîtriser
- $\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C$ pour $n\\neq -1$
- $\\int \\frac{1}{x}\\,dx = \\ln|x| + C$
- $\\int e^x\\,dx = e^x + C$
- $\\int \\sin x\\,dx = -\\cos x + C$
- $\\int \\cos x\\,dx = \\sin x + C$

## 4. Intégration par parties
Pour deux fonctions dérivables $u$ et $v$ :
$$\\int_a^b u(x)v'(x)\\,dx = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x)\\,dx$$

### Quand l'utiliser ?
- lorsqu'un produit apparaît
- quand une primitive directe est difficile
- pour les expressions du type $xe^x$, $x\\sin x$, $x\\ln x$

## 5. Aires
### Aire sous une courbe
Si $f(x)\\ge 0$ sur $[a;b]$, alors l'aire entre la courbe de $f$ et l'axe des abscisses est :
$$\\mathcal{A}=\\int_a^b f(x)\\,dx$$

### Aire entre deux courbes
Si $f(x)\\ge g(x)$ sur $[a;b]$, alors :
$$\\mathcal{A}=\\int_a^b [f(x)-g(x)]\\,dx$$

Si on ne connaît pas l'ordre des courbes, on écrit :
$$\\mathcal{A}=\\int_a^b |f(x)-g(x)|\\,dx$$

## 6. Volumes de révolution
Le volume du solide obtenu en faisant tourner la courbe $y=f(x)$ autour de l'axe des abscisses sur $[a;b]$ est :
$$V=\\pi\\int_a^b [f(x)]^2\\,dx$$

Cette formule est très classique en Terminale S2.

## 7. Équations différentielles du premier ordre
### Forme homogène
On considère :
$$y'+ay=0$$

La solution générale est :
$$y=Ce^{-ax}$$

où $C$ est une constante réelle.

### Avec condition initiale
Si on connaît une valeur comme $y(0)=k$, on remplace dans la solution générale pour trouver $C$.

## 8. Équations différentielles du second ordre
On considère une équation de la forme :
$$y''+py'+qy=0$$

On lui associe l'équation caractéristique :
$$r^2+pr+q=0$$

### Cas 1 : discriminant positif
Si $\\Delta>0$, les racines sont $r_1$ et $r_2$, alors :
$$y=C_1e^{r_1x}+C_2e^{r_2x}$$

### Cas 2 : discriminant nul
Si $\\Delta=0$, la racine double est $r$, alors :
$$y=(C_1+C_2x)e^{rx}$$

### Cas 3 : discriminant négatif
Si $\\Delta<0$, les racines sont complexes $\\alpha\\pm i\\beta$, alors :
$$y=e^{\\alpha x}(C_1\\cos \\beta x + C_2\\sin \\beta x)$$

## 9. Méthode de résolution
### Pour une intégrale
1. identifier la primitive directe si possible
2. sinon penser à l'intégration par parties
3. vérifier les bornes
4. calculer proprement la valeur numérique

### Pour une équation différentielle
1. reconnaître le type d'équation
2. écrire la solution générale
3. utiliser la condition initiale pour trouver les constantes

## 10. Erreurs fréquentes
- oublier la constante dans une primitive
- confondre aire et intégrale algébrique
- oublier le carré dans la formule du volume de révolution
- résoudre l'équation caractéristique sans distinguer les trois cas du discriminant

## 11. À retenir
- l'intégrale calcule une accumulation
- l'aire entre deux courbes utilise une différence
- les équations différentielles décrivent une évolution
- en S2, ce chapitre relie analyse, géométrie et modélisation`,
        exercises: [
          ex("Calcul d'intégrale",
            "$\\int_1^e \\frac{1}{x}\\,dx$ vaut :",
            opt('$0$', '$1$', '$e$', '$e-1$'),
            'B', "$[\\ln x]_1^e = \\ln e - \\ln 1 = 1-0=1$.", 1),
          ex("Équation différentielle 1er ordre",
            "La solution de $y'+2y=0$ avec $y(0)=3$ est :",
            opt('$y=3e^{2x}$', '$y=3e^{-2x}$', '$y=e^{-2x}+2$', '$y=3-2x$'),
            'B', "$y=Ce^{-2x}$ et $y(0)=C=3$, donc $y=3e^{-2x}$.", 2),
          ex("Intégration par parties",
            "Pour calculer $\\int_0^{\\pi} x\\sin x\\,dx$, on pose $u=x$ et $v'=\\sin x$. Le résultat est :",
            opt('$\\pi$', '$0$', '$2$', '$-\\pi$'),
            'A', "IPP : $[x(-\\cos x)]_0^\\pi - \\int_0^\\pi (-\\cos x)dx = \\pi + [\\sin x]_0^\\pi = \\pi + 0 = \\pi$.", 4),
          ex("Calcul d'aire",
            "L'aire entre la courbe $f(x) = x^2$ et l'axe des $x$ sur $[0;3]$ est :",
            opt('$3$', '$9$', '$27$', '$\\frac{27}{3}=9$'),
            'B', "$\\int_0^3 x^2\\,dx = [x^3/3]_0^3 = 27/3 - 0 = 9$.", 2),
          ex("Volume de révolution",
            "Le volume engendré par la rotation de $f(x) = x$ autour de l'axe des $x$ sur $[0;2]$ est :",
            opt('$\\frac{4\\pi}{3}$', '$\\frac{8\\pi}{3}$', '$4\\pi$', '$8\\pi$'),
            'B', "$V = \\pi\\int_0^2 x^2\\,dx = \\pi[x^3/3]_0^2 = \\pi \\times \\frac{8}{3} = \\frac{8\\pi}{3}$.", 3),
        ],
      },
      {
        title: 'Organisation de données – Statistiques et probabilités',
        order_index: 4,
        summary: 'Séries à deux variables, nuage de points, droite des moindres carrés, coefficient de corrélation. Probabilités : variables aléatoires, loi binomiale.',
        key_formulas: [
          'cov(X,Y) = x̄ȳ̄ - x̄·ȳ',
          'Droite de régression y/x : y = ax+b, a=cov(X,Y)/V(X), b=ȳ-ax̄',
          'r = cov(X,Y)/(σX·σY)',
          'X~B(n,p) : E(X)=np, V(X)=np(1-p)',
          'P(X=k) = C(n,k)·pᵏ·(1-p)^(n-k)',
        ],
        course_content: `# Organisation de données : statistiques et probabilités (S2/S4)

## 1. Statistiques à deux variables
Quand on observe simultanément deux caractères quantitatifs, on obtient une série statistique à deux variables.

Chaque observation est représentée par un point :
$$M_i(x_i,y_i)$$

L'ensemble de ces points forme le **nuage de points**.

## 2. Point moyen et lecture du nuage
On calcule les moyennes :
$$\\bar{x}=\\frac{1}{n}\\sum x_i, \\qquad \\bar{y}=\\frac{1}{n}\\sum y_i$$

Le point moyen est :
$$G(\\bar{x},\\bar{y})$$

Ce point joue un rôle important car la droite de régression passe par lui.

## 3. Covariance
La covariance mesure le sens de variation commune de deux variables :
$$\\mathrm{cov}(X,Y)=\\overline{xy}-\\bar{x}\\bar{y}$$

### Interprétation
- covariance positive : quand $X$ augmente, $Y$ a tendance à augmenter
- covariance négative : quand $X$ augmente, $Y$ a tendance à diminuer
- covariance proche de 0 : liaison linéaire faible ou inexistante

## 4. Droite de régression linéaire
On cherche une droite d'ajustement :
$$y=ax+b$$

Elle est obtenue par la méthode des moindres carrés.

### Formules
$$a=\\frac{\\mathrm{cov}(X,Y)}{V(X)}$$
$$b=\\bar{y}-a\\bar{x}$$

### Rôle
La droite de régression permet :

- d'ajuster le nuage de points
- d'estimer une valeur de $Y$ à partir de $X$
- de modéliser une tendance

## 5. Coefficient de corrélation linéaire
Il est défini par :
$$r=\\frac{\\mathrm{cov}(X,Y)}{\\sigma_X\\sigma_Y}$$

où $\\sigma_X$ et $\\sigma_Y$ sont les écarts-types.

### Interprétation
- $r=1$ : corrélation linéaire positive parfaite
- $r=-1$ : corrélation linéaire négative parfaite
- $r$ proche de 0 : absence de corrélation linéaire significative

Plus $|r|$ est proche de 1, plus la liaison linéaire est forte.

## 6. Variables aléatoires discrètes
Une variable aléatoire discrète prend un nombre fini ou dénombrable de valeurs.

### Espérance
L'espérance est la moyenne théorique :
$$E(X)=\\sum x_ip_i$$

### Variance
La variance mesure la dispersion :
$$V(X)=E(X^2)-[E(X)]^2$$

### Écart-type
$$\\sigma(X)=\\sqrt{V(X)}$$

## 7. Loi de Bernoulli et loi binomiale
### Loi de Bernoulli
Une épreuve de Bernoulli admet deux issues :

- succès avec probabilité $p$
- échec avec probabilité $1-p$

### Loi binomiale
Si l'on répète $n$ fois de manière indépendante une épreuve de Bernoulli de probabilité $p$, alors le nombre de succès $X$ suit une loi binomiale :
$$X\\sim B(n,p)$$

### Formule de probabilité
$$P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}$$

### Paramètres
$$E(X)=np, \\qquad V(X)=np(1-p)$$

## 8. Méthode pratique en probabilité
Pour résoudre un exercice :

1. identifier l'expérience aléatoire
2. préciser les événements ou la variable aléatoire
3. vérifier si les épreuves sont indépendantes
4. reconnaître une loi binomiale si besoin
5. utiliser la bonne formule sans oublier les conditions

## 9. Erreurs fréquentes
- confondre covariance et coefficient de corrélation
- oublier que la droite de régression passe par le point moyen
- utiliser une loi binomiale alors que les répétitions ne sont pas indépendantes
- oublier le coefficient binomial $\\binom{n}{k}$

## 10. À retenir
- les statistiques à deux variables servent à analyser une tendance
- la corrélation mesure l'intensité d'une liaison linéaire
- la loi binomiale modélise un nombre de succès sur $n$ essais indépendants`,
        exercises: [
          ex('Covariance',
            'Si $\\overline{xy}=15$, $\\bar{x}=3$, $\\bar{y}=4$, alors $\\text{cov}(X,Y)$ =',
            opt('$3$', '$12$', '$15$', '$60$'),
            'A', "$\\text{cov}(X,Y) = \\overline{xy}-\\bar{x}\\bar{y} = 15-3\\times4=15-12=3$.", 2),
          ex('Loi binomiale – variance',
            "Si $X\\sim B(10; 0{,}5)$, alors $V(X)$ =",
            opt('$5$', '$2{,}5$', '$10$', '$0{,}5$'),
            'B', "$V(X)=np(1-p)=10\\times0{,}5\\times0{,}5=2{,}5$.", 2),
          ex('Interprétation de r',
            "Un coefficient $r=0{,}02$ entre deux variables indique :",
            opt('Une forte corrélation positive', 'Une forte corrélation négative', 'Quasiment aucune corrélation linéaire', 'Une parfaite corrélation'),
            'C', "$r$ proche de $0$ indique l'absence de liaison linéaire entre les deux variables.", 1),
          ex('Pente de la droite de régression',
            "Si $V(X)=4$ et $\\text{cov}(X,Y)=6$, la pente $a$ de la droite de régression de $Y$ en $X$ vaut :",
            opt('$\\frac{2}{3}$', '$\\frac{3}{2}$', '$24$', '$\\frac{1}{4}$'),
            'B', "$a = \\frac{\\text{cov}(X,Y)}{V(X)} = \\frac{6}{4} = \\frac{3}{2}$. La pente positive indique une liaison positive entre $X$ et $Y$.", 2),
          ex('Probabilité et espérance',
            "Une urne contient 3 boules rouges et 7 boules bleues. On tire 1 boule. Soit $X=1$ si rouge, $X=0$ si bleue. $E(X)$ =",
            opt('$0{,}3$', '$0{,}7$', '$0{,}5$', '$3$'),
            'A', "$E(X) = 1 \\times P(\\text{rouge}) + 0 \\times P(\\text{bleue}) = 0{,}3$. L'espérance d'une variable de Bernoulli $X\\sim B(1,p)$ est $p$.", 1),
        ],
      },
      {
        title: 'Nombres complexes',
        order_index: 5,
        summary: 'Forme algébrique et trigonométrique, opérations, module, argument, formule de Moivre, racines nièmes, applications aux similitudes planes et à la trigonométrie.',
        key_formulas: [
          'z = a+ib = r·e^(iθ)  ;  |z|=r, arg(z)=θ',
          'z^n = r^n·e^(inθ)',
          'Racines nièmes : z_k = r₀^(1/n)·e^(i(θ₀+2kπ)/n)',
          'cos nθ et sin nθ via (cosθ+i sinθ)^n',
          'Similitude directe : z\' = az+b, a∈ℂ*',
        ],
        course_content: `# Nombres complexes (S2/S4)

## 1. Forme algébrique
Un nombre complexe s'écrit :
$$z=a+ib$$
avec $a,b\\in\\mathbb{R}$ et $i^2=-1$.

### Parties réelle et imaginaire
- partie réelle : $\\Re(z)=a$
- partie imaginaire : $\\Im(z)=b$

Deux nombres complexes sont égaux si et seulement si leurs parties réelles et imaginaires sont égales.

## 2. Opérations
### Addition
$$(a+ib)+(c+id)=(a+c)+i(b+d)$$

### Multiplication
$$(a+ib)(c+id)=(ac-bd)+i(ad+bc)$$

### Conjugué
Le conjugué de $z=a+ib$ est :
$$\\overline{z}=a-ib$$

### Module
$$|z|=\\sqrt{a^2+b^2}$$

Propriétés :
- $z\\overline{z}=|z|^2$
- $|z_1z_2|=|z_1||z_2|$

## 3. Forme trigonométrique et exponentielle
Si $z\\neq 0$, on peut écrire :
$$z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}$$

où :
- $r=|z|>0$
- $\\theta$ est un argument de $z$

Cette écriture est très utile pour les puissances, les racines et la géométrie.

## 4. Argument
L'argument d'un complexe non nul est l'angle orienté entre l'axe réel positif et le vecteur image de $z$.

On note :
$$\\arg(z)=\\theta \\pmod{2\\pi}$$

### Propriétés
- $\\arg(z_1z_2)=\\arg(z_1)+\\arg(z_2)$
- $\\arg\\left(\\frac{z_1}{z_2}\\right)=\\arg(z_1)-\\arg(z_2)$

## 5. Formule de Moivre
Si :
$$z=r(\\cos\\theta+i\\sin\\theta)$$
alors :
$$z^n=r^n(\\cos n\\theta+i\\sin n\\theta)$$

ou encore :
$$\\left(e^{i\\theta}\\right)^n=e^{in\\theta}$$

Cette formule sert à :

- calculer rapidement des puissances
- obtenir des formules trigonométriques
- linéariser certaines expressions

## 6. Racines nièmes
Pour résoudre l'équation :
$$z^n=z_0$$
où $z_0=r_0e^{i\\theta_0}$, les solutions sont :
$$z_k=r_0^{1/n}e^{i(\\theta_0+2k\\pi)/n}$$
pour $k=0,1,\\dots,n-1$.

Les racines sont régulièrement réparties sur un cercle de centre O.

## 7. Lien avec la trigonométrie
Les complexes donnent des outils puissants pour :

- calculer $\\cos n\\theta$ et $\\sin n\\theta$
- établir des formules d'addition
- linéariser $\\cos^2\\theta$, $\\sin^2\\theta$, etc.

### Exemple classique
À partir de :
$$e^{i\\theta}=\\cos\\theta+i\\sin\\theta$$
on obtient :
$$\\cos\\theta=\\frac{e^{i\\theta}+e^{-i\\theta}}{2}$$
$$\\sin\\theta=\\frac{e^{i\\theta}-e^{-i\\theta}}{2i}$$

## 8. Applications géométriques
Dans le plan complexe :

- un point $M$ d'affixe $z$ est représenté par le vecteur $\\overrightarrow{OM}$
- une translation, rotation ou similitude peut s'écrire par une relation complexe

### Similitude directe
Une transformation de la forme :
$$z'=az+b$$
avec $a\\in\\mathbb{C}^*$, est une similitude directe.

Elle combine :
- une rotation
- une homothétie
- éventuellement une translation

## 9. Méthode pratique
### Pour passer en forme trigonométrique
1. calculer le module
2. déterminer le quadrant
3. trouver un argument adapté

### Pour calculer une puissance
1. écrire le complexe sous forme trigonométrique
2. appliquer la formule de Moivre
3. revenir si besoin à la forme algébrique

### Pour calculer des racines
1. écrire le complexe sous forme exponentielle
2. diviser l'argument par $n$
3. ne pas oublier les $n$ valeurs de $k$

## 10. Erreurs fréquentes
- oublier que l'argument est défini modulo $2\\pi$
- se tromper de quadrant
- oublier une racine dans les équations du type $z^n=z_0$
- confondre module et partie réelle

## 11. À retenir
- la forme algébrique sert aux calculs simples
- la forme trigonométrique simplifie puissances et racines
- les complexes sont un outil d'algèbre, de trigonométrie et de géométrie à la fois`,
        exercises: [
          ex("Forme trigonométrique",
            "Le nombre $z=1+i\\sqrt{3}$ a pour module et argument :",
            opt("$r=2$, $\\theta=\\pi/3$", "$r=\\sqrt{2}$, $\\theta=\\pi/4$", "$r=2$, $\\theta=2\\pi/3$", "$r=4$, $\\theta=\\pi/6$"),
            'A', "$|z|=\\sqrt{1+3}=2$. $\\tan\\theta=\\sqrt{3}/1=\\sqrt{3}$, $z$ est dans le 1er quadrant donc $\\theta=\\pi/3$.", 2),
          ex("Linéarisation",
            "$\\cos^2\\theta$ s'exprime grâce aux complexes comme :",
            opt("$\\frac{1+\\cos 2\\theta}{2}$", "$\\frac{1-\\cos 2\\theta}{2}$", "$\\cos^2\\theta$", "$2\\cos\\theta-1$"),
            'A', "Via $\\cos\\theta=\\frac{e^{i\\theta}+e^{-i\\theta}}{2}$, on trouve $\\cos^2\\theta=\\frac{1+\\cos2\\theta}{2}$.", 2),
          ex("Produit de complexes",
            "$(1+i)(1-i)$ est égal à :",
            opt('$2i$', '$0$', '$2$', '$1$'),
            'C', "$(1+i)(1-i) = 1^2 - i^2 = 1 - (-1) = 2$. On utilise la formule $(a+b)(a-b) = a^2 - b^2$ avec $b = i$.", 1),
          ex("Argument d'un produit",
            "Si $\\arg(z_1) = \\pi/4$ et $\\arg(z_2) = \\pi/4$, alors $\\arg(z_1 z_2) \\equiv$",
            opt("$\\pi/4$", "$\\pi/2$", "$\\pi$", "$0$"),
            'B', "$\\arg(z_1 z_2) = \\arg(z_1) + \\arg(z_2) = \\pi/4 + \\pi/4 = \\pi/2 \\pmod{2\\pi}$.", 2),
          ex("Racines carrées de $-4$",
            "Les racines carrées de $-4$ dans $\\mathbb{C}$ sont :",
            opt('$\\pm 2$', '$\\pm 2i$', '$\\pm 4i$', '$2$ et $-2i$'),
            'B', "$z^2 = -4 = 4e^{i\\pi}$. Les racines carrées sont $z = 2e^{i\\pi/2} = 2i$ et $z = 2e^{i3\\pi/2} = -2i$.", 2),
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MATHÉMATIQUES L1 et L2  (Programme allégé – séries littéraires)
  // ══════════════════════════════════════════════════════════════════════════
  [SID.L1_MATHS]: {
    chapters: [
      {
        title: 'Fonctions numériques – Rappels et approfondissements',
        order_index: 1,
        summary: 'Domaine, limites, continuité, dérivée, tableau de variations, représentation graphique.',
        key_formulas: ["f'(x) = lim[f(x+h)-f(x)]/h", "(uv)' = u'v+uv'", "(u/v)' = (u'v-uv')/v²", 'Si f\'(x)>0 sur I, f croissante sur I'],
        course_content: `# Fonctions numériques (Séries L)

## 1. Rappels essentiels
**Domaine de définition** : ensemble des $x$ où $f(x)$ existe.
**Continuité** : $f$ est continue en $a$ si $\\lim_{x\\to a}f(x)=f(a)$.

## 2. Dérivée et variations
$$f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$$
- $f'>0$ ⟹ $f$ croissante ; $f'<0$ ⟹ $f$ décroissante
- $f'(a)=0$ ⟹ extremum possible en $a$

## 3. Tableau de variations et lecture graphique
Méthode : calculer $f'$, étudier son signe, dresser le tableau.`,
        exercises: [
          ex("Dérivée d'un polynôme",
            "La dérivée de $f(x)=x^3-3x+2$ s'annule en :",
            opt("$x=0$", "$x=1$ et $x=-1$", "$x=2$", "$x=3$"),
            'B', "$f'(x)=3x^2-3=3(x^2-1)=3(x-1)(x+1)$. $f'=0$ pour $x=1$ et $x=-1$.", 2),
          ex("Sens de variation",
            "Si $f'(x)=2x-4$, la fonction $f$ est décroissante sur :",
            opt("$]2;+\\infty[$", "$]-\\infty;2[$", "$]-\\infty;+\\infty[$", "$[0;4]$"),
            'B', "$f'(x)<0 \\Leftrightarrow 2x-4<0 \\Leftrightarrow x<2$. $f$ est décroissante sur $]-\\infty;2[$.", 1),
          ex("Tangente à une courbe",
            "La tangente à $f(x) = x^2 + 1$ en $x_0 = 2$ a pour équation :",
            opt("$y = 4x - 3$", "$y = 4x + 1$", "$y = 2x + 1$", "$y = 4x - 5$"),
            'A', "$f(2) = 5$, $f'(x) = 2x$ donc $f'(2) = 4$. Équation de la tangente : $y = f'(2)(x - 2) + f(2) = 4(x-2)+5 = 4x - 3$.", 2),
          ex("Limite et asymptote",
            "$\\lim_{x \\to +\\infty} \\frac{2x+3}{x-1}$ est égale à :",
            opt("$3$", "$2$", "$+\\infty$", "$0$"),
            'B', "En divisant numérateur et dénominateur par $x$ : $\\frac{2+3/x}{1-1/x} \\to \\frac{2}{1} = 2$. La droite $y = 2$ est asymptote horizontale.", 2),
          ex("Maximum d'une fonction",
            "La valeur maximale de $f(x) = -x^2 + 4x - 3$ est :",
            opt("$1$", "$3$", "$-3$", "$4$"),
            'A', "$f'(x) = -2x + 4 = 0$ pour $x = 2$. $f(2) = -4 + 8 - 3 = 1$. Comme la parabole est tournée vers le bas ($-x^2$), c'est un maximum.", 2),
        ],
      },
      {
        title: 'Suites numériques',
        order_index: 2,
        summary: 'Suites arithmétiques et géométriques, convergence des suites monotones bornées, limite d\'une suite récurrente U_{n+1}=f(U_n).',
        key_formulas: ['u_n = u_0 + nr (arithmétique)', 'u_n = u_0·qⁿ (géométrique)', 'S_n géom. = u_0(1-qⁿ)/(1-q)', 'Si U_{n+1}=f(U_n) → l=f(l)'],
        course_content: `# Suites numériques (Séries L)

## 1. Suites arithmétiques
$u_n = u_0 + nr$, raison $r$.
Somme des $n+1$ premiers termes : $S = \\frac{(n+1)(u_0+u_n)}{2}$

## 2. Suites géométriques
$u_n = u_0 q^n$, raison $q$.
Somme : $S = u_0\\frac{1-q^{n+1}}{1-q}$ (si $q\\neq 1$)

## 3. Convergence
- Suite croissante et majorée ⟹ convergente
- Suite récurrente $u_{n+1}=f(u_n)$ : si convergente vers $l$, alors $l=f(l)$`,
        exercises: [
          ex("Suite arithmétique",
            "La somme des 10 premiers termes d'une suite arithmétique de premier terme $u_0=2$ et de raison $r=3$ est :",
            opt("$29$", "$155$", "$148$", "$200$"),
            'B', "$u_9=2+9\\times3=29$. $S=10\\times\\frac{u_0+u_9}{2}=10\\times\\frac{2+29}{2}=10\\times15{,}5=155$.", 2),
          ex("Limite de suite géométrique",
            "Si $|q|<1$, la suite géométrique de raison $q$ converge vers :",
            opt("$1$", "$q$", "$0$", "$+\\infty$"),
            'C', "$u_n=u_0 q^n\\to 0$ car $q^n\\to 0$ quand $|q|<1$.", 1),
          ex("Somme d'une suite arithmétique",
            "La somme des entiers de $1$ à $100$ (c'est-à-dire $1+2+\\cdots+100$) vaut :",
            opt("$100$", "$5050$", "$5100$", "$10000$"),
            'B', "C'est une suite arithmétique : $S = \\frac{n(n+1)}{2} = \\frac{100 \\times 101}{2} = 5050$. Formule générale : $S = \\frac{\\text{nombre de termes} \\times (\\text{premier} + \\text{dernier})}{2}$.", 2),
          ex("Terme général d'une suite géométrique",
            "Une suite géométrique vérifie $u_0 = 5$ et de raison $q = 2$. Alors $u_4$ vaut :",
            opt("$40$", "$80$", "$20$", "$160$"),
            'B', "$u_n = u_0 \\cdot q^n$. Donc $u_4 = 5 \\times 2^4 = 5 \\times 16 = 80$.", 2),
          ex("Nature d'une suite",
            "La suite définie par $u_n = 3n + 7$ est :",
            opt("Géométrique de raison $3$", "Arithmétique de raison $3$", "Ni arithmétique ni géométrique", "Constante"),
            'B', "$u_{n+1} - u_n = 3(n+1)+7 - (3n+7) = 3$. La différence est constante et égale à $3$, donc la suite est arithmétique de raison $r = 3$.", 1),
        ],
      },
      {
        title: 'Calcul intégral',
        order_index: 3,
        summary: 'Primitives, intégrale de Riemann, propriétés, calcul d\'aires.',
        key_formulas: ['∫_a^b f = F(b)-F(a)', '∫xⁿ = xⁿ⁺¹/(n+1)+C', '∫eˣ = eˣ+C', '∫1/x = ln|x|+C', 'Aire = ∫_a^b |f(x)| dx'],
        course_content: `# Calcul intégral (Séries L)

## 1. Primitives usuelles
| $f(x)$ | $F(x)$ |
|--------|--------|
| $x^n$ ($n\\neq-1$) | $\\frac{x^{n+1}}{n+1}$ |
| $e^x$ | $e^x$ |
| $\\frac{1}{x}$ | $\\ln|x|$ |
| $\\cos x$ | $\\sin x$ |
| $\\sin x$ | $-\\cos x$ |

## 2. Intégrale définie
$$\\int_a^b f(x)\\,dx = F(b)-F(a)$$

## 3. Calcul d'aires
Aire de la surface entre $\\mathcal{C}_f$ et l'axe des $x$ sur $[a;b]$ :
$$\\mathcal{A} = \\int_a^b |f(x)|\\,dx$$`,
        exercises: [
          ex("Calcul d'intégrale",
            "$\\int_0^2 (x+1)\\,dx$ =",
            opt("$2$", "$4$", "$3$", "$6$"),
            'B', "$\\left[\\frac{x^2}{2}+x\\right]_0^2 = (2+2)-0=4$.", 1),
          ex("Primitive de e^x",
            "Une primitive de $f(x)=3e^x$ est :",
            opt("$3xe^x$", "$3e^x$", "$e^{3x}$", "$\\frac{e^x}{3}$"),
            'B', "$\\int 3e^x\\,dx = 3e^x+C$. La dérivée de $3e^x$ est bien $3e^x$.", 1),
          ex("Signe et intégrale",
            "Si $f(x) \\geq 0$ sur $[a;b]$, alors $\\int_a^b f(x)\\,dx$ est :",
            opt("Toujours négatif", "Toujours positif ou nul", "Toujours nul", "Peut être positif ou négatif"),
            'B', "Par la propriété de positivité de l'intégrale : si $f \\geq 0$ sur $[a;b]$ et $a < b$, alors $\\int_a^b f(x)\\,dx \\geq 0$.", 1),
          ex("Calcul d'aire sous courbe",
            "L'aire de la surface entre la courbe $f(x) = x^2$ et l'axe des $x$ sur $[0;2]$ est :",
            opt("$2$", "$\\frac{4}{3}$", "$\\frac{8}{3}$", "$4$"),
            'C', "$\\int_0^2 x^2\\,dx = \\left[\\frac{x^3}{3}\\right]_0^2 = \\frac{8}{3} - 0 = \\frac{8}{3}$.", 2),
          ex("Primitive de $\\cos x$",
            "Une primitive de $f(x) = \\cos x$ est :",
            opt("$-\\sin x$", "$\\sin x$", "$\\cos x$", "$-\\cos x$"),
            'B', "$\\int \\cos x\\,dx = \\sin x + C$. En effet $(\\sin x)' = \\cos x$. Ne pas confondre avec $(\\cos x)' = -\\sin x$.", 1),
        ],
      },
      {
        title: 'Probabilités et statistiques',
        order_index: 4,
        summary: 'Événements, probabilité conditionnelle, variables aléatoires discrètes, espérance, variance, loi binomiale.',
        key_formulas: ['P(A∩B) = P(A)·P(B|A)', 'P(A|B) = P(A∩B)/P(B)', 'E(X) = Σxᵢpᵢ', 'V(X) = E(X²)-[E(X)]²', 'X~B(n,p): E(X)=np'],
        course_content: `# Probabilités et statistiques (Séries L)

## 1. Probabilité conditionnelle
$$P(A|B) = \\frac{P(A\\cap B)}{P(B)}$$
**Formule des probabilités composées** : $P(A\\cap B) = P(B)\\cdot P(A|B)$

## 2. Indépendance
$A$ et $B$ indépendants $\\Leftrightarrow P(A\\cap B)=P(A)\\cdot P(B)$

## 3. Variables aléatoires discrètes
- **Espérance** : $E(X) = \\sum x_ip_i$ (valeur moyenne théorique)
- **Variance** : $V(X) = E(X^2)-[E(X)]^2$ (mesure de dispersion)

## 4. Loi binomiale $B(n,p)$
$n$ épreuves indépendantes de Bernoulli, proba succès $p$ :
$P(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}$, $E(X)=np$`,
        exercises: [
          ex("Probabilité conditionnelle",
            "P(A)=0,4, P(B)=0,5, P(A∩B)=0,2. Alors P(A|B) =",
            opt("$0{,}4$", "$0{,}2$", "$0{,}8$", "$0{,}5$"),
            'A', "$P(A|B)=P(A\\cap B)/P(B)=0{,}2/0{,}5=0{,}4$.", 2),
          ex("Espérance",
            "X prend les valeurs 1, 2, 3 avec probabilités 0,3 ; 0,5 ; 0,2. E(X) =",
            opt("$2$", "$1{,}9$", "$2{,}1$", "$3$"),
            'B', "$E(X)=1\\times0{,}3+2\\times0{,}5+3\\times0{,}2=0{,}3+1+0{,}6=1{,}9$.", 2),
          ex("Indépendance de deux événements",
            "Deux événements $A$ et $B$ sont indépendants si et seulement si :",
            opt("$P(A \\cup B) = P(A) + P(B)$", "$P(A \\cap B) = P(A) \\times P(B)$", "$P(A|B) = P(B)$", "$P(A) = P(B)$"),
            'B', "La définition de l'indépendance est : $P(A \\cap B) = P(A) \\times P(B)$. Cela équivaut aussi à $P(A|B) = P(A)$ : la réalisation de $B$ ne modifie pas la probabilité de $A$.", 2),
          ex("Variance d'une variable aléatoire",
            "Si $E(X) = 3$ et $E(X^2) = 13$, alors $V(X)$ vaut :",
            opt("$4$", "$10$", "$13$", "$9$"),
            'A', "$V(X) = E(X^2) - [E(X)]^2 = 13 - 3^2 = 13 - 9 = 4$. L'écart-type est $\\sigma = \\sqrt{4} = 2$.", 2),
          ex("Loi binomiale – calcul de probabilité",
            "Un QCM a 6 questions à 4 choix chacune. En répondant au hasard, la probabilité d'avoir exactement 0 bonne réponse est :",
            opt("$(0{,}25)^6$", "$(0{,}75)^6$", "$6 \\times 0{,}25 \\times 0{,}75^5$", "$1$"),
            'B', "Chaque réponse est juste avec probabilité $p = 1/4 = 0{,}25$. $P(X=0) = C_6^0 \\times (0{,}25)^0 \\times (0{,}75)^6 = (0{,}75)^6 \\approx 0{,}178$.", 3),
        ],
      },
    ],
  },

  // L2 Maths = même programme allégé que L1 Maths
  [SID.L2_MATHS]: {
    chapters: [
      { title: 'Fonctions numériques', order_index: 1, summary: 'Domaine, continuité, dérivée, variations.', key_formulas: ["(uv)'=u'v+uv'","(u/v)'=(u'v-uv')/v²","f'>0 ⟹ f croissante"], course_content: '# Fonctions numériques (L2)\n\nVoir programme L1 Mathématiques – contenu identique.\n\nLes séries L1 et L2 suivent le même programme allégé de mathématiques pour le BAC Sénégal.', exercises: [
        ex("Sens de variation","$f(x)=x^2-4x+3$ est croissante sur :",opt("$]-\\infty;2[$","$[2;+\\infty[$","$[0;4]$","$]-\\infty;+\\infty[$"),'B',"$f'(x)=2x-4>0$ pour $x>2$. $f$ est donc croissante sur $[2;+\\infty[$.",1),
        ex("Extremum","La valeur minimale de $f(x)=x^2-6x+5$ est :",opt("$5$","$-4$","$0$","$-6$"),'B',"$f'(x)=2x-6=0$ pour $x=3$. $f(3)=9-18+5=-4$. C'est un minimum (parabole ouverte vers le haut).",2),
        ex("Dérivée d'un produit","La dérivée de $h(x)=(x+1)(x^2-2)$ est :",opt("$(x^2-2)+(x+1)\\cdot 2x$","$2x(x+1)$","$x^2-1$","$(x+1)^2$"),'A',"On applique $(uv)'=u'v+uv'$ avec $u=x+1$, $u'=1$, $v=x^2-2$, $v'=2x$. Résultat : $(x^2-2)+2x(x+1)$.",2),
        ex("Domaine de définition","Le domaine de définition de $f(x)=\\ln(x-2)$ est :",opt("$\\mathbb{R}$","$]2;+\\infty[$","$[2;+\\infty[$","$]-\\infty;2[$"),'B',"$\\ln$ est défini pour les réels strictement positifs. Donc $x-2>0$, soit $x>2$. Le domaine est $]2;+\\infty[$.",1),
        ex("Continuité et limite","$\\lim_{x\\to 0} \\frac{\\sin x}{x}$ vaut :",opt("$0$","$1$","$+\\infty$","$\\pi$"),'B',"La limite de $\\frac{\\sin x}{x}$ quand $x \\to 0$ est $1$ : c'est une limite fondamentale. Elle sert notamment à prouver que $\\sin'(x)=\\cos x$.",2),
      ]},
      { title: 'Suites numériques', order_index: 2, summary: 'Suites arithmétiques, géométriques, convergence.', key_formulas: ['u_n=u_0+nr','u_n=u_0·qⁿ','S_arith=(n+1)(u_0+u_n)/2'], course_content: '# Suites numériques (L2)\n\nVoir programme L1 Mathématiques – contenu identique.', exercises: [
        ex("Raison","Une suite géométrique vérifie $u_0=2$ et $u_3=54$. Sa raison est :",opt("$3$","$\\sqrt{27}$","$27$","$6$"),'A',"$u_3=2q^3=54 \\Rightarrow q^3=27 \\Rightarrow q=3$.",2),
        ex("Terme général arithmétique","Une suite arithmétique a $u_1=5$ et de raison $r=4$. Son terme général $u_n$ (pour $n \\geq 1$) est :",opt("$4n+5$","$4n+1$","$5n+4$","$4(n-1)+5$"),'D',"$u_n = u_1 + (n-1) \\times r = 5 + (n-1) \\times 4 = 4n+1$. Mais en notation $u_n = u_1 + (n-1)r$, on a $4(n-1)+5$, ce qui donne bien $4n+1$.",2),
        ex("Somme d'une suite géométrique","La somme $S = 1 + 2 + 4 + 8 + 16$ (5 termes, $u_0=1$, $q=2$) vaut :",opt("$30$","$31$","$32$","$16$"),'B',"$S = u_0 \\cdot \\frac{1-q^5}{1-q} = 1 \\cdot \\frac{1-32}{1-2} = \\frac{-31}{-1} = 31$.",2),
        ex("Convergence d'une suite","La suite $u_n = \\frac{3n-1}{n+2}$ converge vers :",opt("$1$","$3$","$0$","$-\\frac{1}{2}$"),'B',"En divisant par $n$ : $\\frac{3-1/n}{1+2/n} \\to \\frac{3}{1} = 3$.",1),
        ex("Suite croissante ou décroissante","La suite $u_n = \\frac{1}{n+1}$ est :",opt("Croissante","Constante","Décroissante et minorée par $0$","Non bornée"),'C',"$u_{n+1} - u_n = \\frac{1}{n+2} - \\frac{1}{n+1} = \\frac{-1}{(n+1)(n+2)} < 0$. La suite est décroissante et minorée par $0$ (tous les termes sont positifs).",2),
      ]},
      { title: 'Probabilités et statistiques', order_index: 3, summary: 'Probabilité conditionnelle, variables aléatoires, espérance, loi binomiale.', key_formulas: ['P(A|B)=P(A∩B)/P(B)','E(X)=Σxᵢpᵢ','B(n,p): E(X)=np'], course_content: '# Probabilités et statistiques (L2)\n\nVoir programme L1 Mathématiques – contenu identique.', exercises: [
        ex("Loi binomiale","$X\\sim B(4;0{,}5)$. $P(X=2)$ =",opt("$0{,}5$","$0{,}375$","$0{,}25$","$0{,}125$"),'B',"$\\binom{4}{2}(0{,}5)^2(0{,}5)^2=6\\times0{,}25\\times0{,}25=0{,}375$.",2),
        ex("Probabilité de l'union","$P(A)=0{,}5$, $P(B)=0{,}3$, $P(A\\cap B)=0{,}1$. $P(A\\cup B)$ =",opt("$0{,}8$","$0{,}7$","$0{,}9$","$0{,}15$"),'B',"$P(A\\cup B) = P(A)+P(B)-P(A\\cap B) = 0{,}5+0{,}3-0{,}1=0{,}7$.",1),
        ex("Espérance loi binomiale","$X\\sim B(15;0{,}4)$. $E(X)$ =",opt("$6$","$4$","$9$","$0{,}4$"),'A',"$E(X)=np=15\\times0{,}4=6$.",1),
        ex("Probabilité conditionnelle","Dans une classe, 60 % des élèves sont des filles. 50 % des filles et 40 % des garçons aiment les maths. La probabilité qu'un élève choisi au hasard soit une fille qui aime les maths est :",opt("$0{,}5$","$0{,}3$","$0{,}24$","$0{,}6$"),'B',"$P(\\text{fille} \\cap \\text{maths}) = P(\\text{fille}) \\times P(\\text{maths}|\\text{fille}) = 0{,}6 \\times 0{,}5 = 0{,}3$.",2),
        ex("Variance","$X\\sim B(10;0{,}2)$. $V(X)$ =",opt("$2$","$1{,}6$","$0{,}2$","$4$"),'B',"$V(X)=np(1-p)=10\\times0{,}2\\times0{,}8=1{,}6$.",2),
      ]},
    ],
  },
};

// ─── PARTIE 2 (SVT, Philosophie, HistGeo, Français, Anglais) ─────────────────
// Chargée depuis seed-official-programs-part2.js via import

import { PROGRAMS_PART2 } from './seed-official-programs-part2.js';

// ─── RUNNER PRINCIPAL ─────────────────────────────────────────────────────────
async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const allPrograms = { ...PROGRAMS, ...PROGRAMS_PART2 };
    const subjectIds = Object.keys(allPrograms);

    // 1. Supprimer les anciennes données pour les matières ciblées
    console.log('🗑️  Suppression des anciens chapitres et exercices...');

    for (const sid of subjectIds) {
      const chapRes = await client.query('SELECT id FROM chapters WHERE subject_id=$1', [sid]);

      for (const ch of chapRes.rows) {
        await client.query('DELETE FROM daily_tasks WHERE chapter_id=$1', [ch.id]);
        await client.query('DELETE FROM chapter_progress WHERE chapter_id=$1', [ch.id]);
        await client.query('DELETE FROM ai_sessions WHERE chapter_id=$1', [ch.id]);
        await client.query('DELETE FROM student_performances WHERE chapter_id=$1', [ch.id]);
        await client.query('DELETE FROM exercises WHERE chapter_id=$1', [ch.id]);
      }

      await client.query('DELETE FROM chapters WHERE subject_id=$1', [sid]);
    }

    // 2. Insérer les nouveaux chapitres et exercices
    console.log('📚 Insertion des programmes officiels...');
    let totalChapters = 0;
    let totalExercises = 0;

    for (const [subjectId, program] of Object.entries(allPrograms)) {
      for (const ch of program.chapters) {
        const chapterId = randomUUID();
        await client.query(
          `INSERT INTO chapters (id, subject_id, title, order_index, summary, course_content, key_formulas, is_published)
           VALUES ($1,$2,$3,$4,$5,$6,$7,true)`,
          [
            chapterId,
            subjectId,
            ch.title,
            ch.order_index,
            ch.summary ?? null,
            ch.course_content ?? null,
            ch.key_formulas ? JSON.stringify(ch.key_formulas) : null,
          ]
        );
        totalChapters++;

        for (const ex of (ch.exercises ?? [])) {
          await client.query(
            `INSERT INTO exercises (id, chapter_id, subject_id, type, difficulty, title, question_text, options, correct_answer, explanation, is_published)
             VALUES ($1,$2,$3,'qcm',$4,$5,$6,$7,$8,$9,true)`,
            [
              randomUUID(),
              chapterId,
              subjectId,
              ex.difficulty ?? 3,
              ex.title,
              ex.question_text,
              JSON.stringify(ex.options),
              ex.correct_answer,
              ex.explanation,
            ]
          );
          totalExercises++;
        }
      }

      console.log(`  ✓ ${program.chapters.length} chapitres insérés pour ${subjectId.slice(0,8)}...`);
    }

    await client.query('COMMIT');
    console.log(`\n✅ Seed terminé : ${totalChapters} chapitres, ${totalExercises} exercices.`);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Erreur seed :', err.message);

    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(process.exit);
