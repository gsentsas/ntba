import {
    ArrowRight,
    BookOpen,
    BookOpenCheck,
    CalendarDays,
    ChartColumn,
    Check,
    FlaskConical,
    MessageSquareText,
    Sparkles,
    Star,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
    {
        icon: Sparkles,
        color: 'bg-purple-light text-purple',
        title: 'Tuteur IA personnel',
        desc: "Pose n'importe quelle question à ton coach IA en français. Il t'explique chaque notion, étape par étape, adapté à ton programme.",
    },
    {
        icon: CalendarDays,
        color: 'bg-green-light text-green-dark',
        title: 'Planning adaptatif',
        desc: 'Un calendrier de révision généré automatiquement selon tes matières, coefficients et le nombre de jours restants avant le BAC.',
    },
    {
        icon: BookOpenCheck,
        color: 'bg-amber-light text-amber',
        title: 'Annales officielles',
        desc: "Des centaines d'exercices issus des sujets réels du BAC Sénégal, classés par série, matière et année.",
    },
    {
        icon: FlaskConical,
        color: 'bg-green-light text-green-dark',
        title: "Simulation d'examen",
        desc: 'Passe un examen blanc complet, chronométré, dans les mêmes conditions que le BAC. Reçois ta note estimée instantanément.',
    },
    {
        icon: ChartColumn,
        color: 'bg-purple-light text-purple',
        title: 'Suivi de progression',
        desc: 'Visualise ton évolution semaine après semaine. Identifie tes points faibles et concentre tes efforts là où ça compte.',
    },
    {
        icon: MessageSquareText,
        color: 'bg-amber-light text-amber',
        title: "Communauté d'élèves",
        desc: 'Pose tes questions, partage tes astuces et apprends des autres élèves qui préparent le même BAC que toi.',
    },
];

const SERIES = [
    {
        code: 'S1',
        label: 'Série S1',
        color: 'bg-green text-white',
        subjects: ['Maths', 'Physique', 'SVT', 'Chimie'],
    },
    {
        code: 'S2',
        label: 'Série S2',
        color: 'bg-green text-white',
        subjects: ['Maths', 'Physique', 'SVT', 'Chimie'],
    },
    {
        code: 'L1',
        label: 'Série L1',
        color: 'bg-purple text-white',
        subjects: ['Français', 'Philo', 'Histoire-Géo', 'Arabe'],
    },
    {
        code: 'L2',
        label: 'Série L2',
        color: 'bg-purple text-white',
        subjects: ['Français', 'Anglais', 'Philo', 'Histoire-Géo'],
    },
];

const STATS = [
    { value: '10 000+', label: 'Élèves inscrits', icon: Users },
    { value: '500+', label: 'Exercices BAC', icon: BookOpen },
    { value: '89%', label: 'Taux de réussite', icon: TrendingUp },
    { value: '4.8/5', label: 'Note moyenne', icon: Star },
];

const PLANS = [
    {
        name: 'Gratuit',
        price: '0',
        period: 'pour toujours',
        color: 'border-slate-200',
        cta: 'Commencer gratuitement',
        ctaStyle: 'border border-green text-green hover:bg-green-light',
        features: [
            'Accès aux 3 premiers chapitres par matière',
            '10 exercices par jour',
            'Planning basique',
            'Communauté',
        ],
        disabled: [],
    },
    {
        name: 'Premium',
        price: '2 500',
        period: 'FCFA / mois',
        color: 'border-green ring-2 ring-green/30',
        badge: 'Le plus populaire',
        cta: 'Essayer 7 jours gratuits',
        ctaStyle: 'bg-green text-white hover:bg-green-dark',
        features: [
            'Accès complet à tous les chapitres',
            'Exercices illimités + annales',
            'Tuteur IA sans limite',
            'Planning adaptatif intelligent',
            "Simulations d'examen",
            'Correction photo de copies',
            'Suivi de progression avancé',
        ],
        disabled: [],
    },
    {
        name: 'Annuel',
        price: '20 000',
        period: 'FCFA / an',
        color: 'border-amber',
        badge: '-33%',
        cta: "Choisir l'annuel",
        ctaStyle: 'bg-amber text-slate-900 hover:bg-amber/90',
        features: [
            'Tout Premium inclus',
            'Économisez 10 000 FCFA/an',
            "Accès garanti toute l'année scolaire",
            'Support prioritaire',
        ],
        disabled: [],
    },
];

const TESTIMONIALS = [
    {
        name: 'Fatou Diallo',
        serie: 'Série S2 – Dakar',
        text: "J'ai obtenu mon BAC avec mention grâce aux révisions quotidiennes et au tuteur IA. Il m'expliquait les maths mieux que certains profs !",
        note: 5,
    },
    {
        name: 'Moussa Seck',
        serie: 'Série L1 – Thiès',
        text: "Le planning adaptatif est incroyable. Il sait exactement quelles matières prioriser selon mes lacunes. J'ai gagné un mois de révisions.",
        note: 5,
    },
    {
        name: 'Aminata Ndiaye',
        serie: 'Série S1 – Saint-Louis',
        text: "Les simulations d'examen m'ont beaucoup aidée à gérer le stress. J'arrivais le jour J en connaissant exactement mon niveau réel.",
        note: 5,
    },
];

function NavBar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <img
                    src="/logo.png"
                    alt="Je Réussis Mon BAC"
                    className="h-12 w-auto"
                />

                <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
                    <a
                        href="#features"
                        className="transition-colors hover:text-green"
                    >
                        Fonctionnalités
                    </a>
                    <a
                        href="#series"
                        className="transition-colors hover:text-green"
                    >
                        Séries
                    </a>
                    <a
                        href="#pricing"
                        className="transition-colors hover:text-green"
                    >
                        Tarifs
                    </a>
                    <a
                        href="#testimonials"
                        className="transition-colors hover:text-green"
                    >
                        Témoignages
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/login"
                        className="text-sm font-medium text-slate-700 transition hover:text-green"
                    >
                        Connexion
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-xl bg-green px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-dark"
                    >
                        Commencer
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_rgba(29,158,117,0.15),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(127,119,221,0.12),_transparent_55%)] px-6 py-20 text-center md:py-32">
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-green/8 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 size-[400px] rounded-full bg-purple/8 blur-3xl" />

            <div className="relative mx-auto max-w-4xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green/30 bg-green-light px-4 py-1.5 text-sm font-semibold text-green-dark">
                    <Zap className="size-3.5" />
                    Plateforme officielle BAC Sénégal — Terminale L1, L2, S1, S2
                </div>

                <h1 className="text-5xl leading-tight font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
                    Réussis ton BAC avec
                    <span className="block bg-gradient-to-r from-green to-green-dark bg-clip-text text-transparent">
                        un coach IA personnel
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                    Planning adaptatif, exercices ciblés, tuteur IA en français,
                    annales officielles et simulations d'examen. Tout ce qu'il
                    faut pour décrocher ton BAC — en un seul endroit.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        to="/register"
                        className="flex items-center gap-2 rounded-2xl bg-green px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green/25 transition hover:bg-green-dark hover:shadow-green/40"
                    >
                        Commencer gratuitement
                        <ArrowRight className="size-4" />
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-700 shadow-sm transition hover:border-green hover:text-green"
                    >
                        J'ai déjà un compte
                    </Link>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                    Gratuit pour commencer · Aucune carte bancaire requise
                </p>
            </div>

            {/* App screenshot mockup */}
            <div className="relative mx-auto mt-20 max-w-5xl">
                <div className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl ring-1 shadow-slate-900/15 ring-slate-900/5">
                    <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-3.5">
                        <div className="size-3 rounded-full bg-red-400" />
                        <div className="size-3 rounded-full bg-amber" />
                        <div className="size-3 rounded-full bg-green" />
                        <div className="mx-auto rounded-full bg-white px-24 py-1 text-xs text-slate-400">
                            bac-senegal.sn
                        </div>
                    </div>
                    <div className="grid min-h-64 grid-cols-[220px_1fr] bg-bac-bg md:min-h-80">
                        {/* Sidebar mockup */}
                        <div className="border-r border-slate-100 bg-gradient-to-b from-white to-green-xlight p-4">
                            <div className="mb-3 rounded-xl bg-green px-3 py-1.5 text-center text-xs font-bold text-white">
                                BAC Sénégal IA
                            </div>
                            {[
                                'Dashboard',
                                'Matières',
                                'Tuteur IA',
                                'Planning',
                                'Quiz',
                                'Annales',
                            ].map((item, i) => (
                                <div
                                    key={item}
                                    className={`mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium ${i === 0 ? 'bg-slate-950 text-white' : 'text-slate-600'}`}
                                >
                                    <div
                                        className={`size-2 rounded-full ${i === 0 ? 'bg-green' : 'bg-slate-300'}`}
                                    />
                                    {item}
                                </div>
                            ))}
                        </div>
                        {/* Content mockup */}
                        <div className="p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <div className="h-3 w-24 rounded-full bg-green/20" />
                                    <div className="mt-2 h-5 w-40 rounded-full bg-slate-200" />
                                </div>
                                <div className="h-8 w-28 rounded-xl bg-green/15" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    {
                                        color: 'bg-green-light',
                                        w: 'w-20',
                                        label: 'Progression',
                                    },
                                    {
                                        color: 'bg-amber-light',
                                        w: 'w-16',
                                        label: 'Streak',
                                    },
                                    {
                                        color: 'bg-purple-light',
                                        w: 'w-24',
                                        label: 'Score IA',
                                    },
                                ].map((c) => (
                                    <div
                                        key={c.label}
                                        className={`${c.color} rounded-2xl p-4`}
                                    >
                                        <div className="h-6 w-12 rounded-full bg-white/60" />
                                        <div
                                            className={`mt-2 h-3 ${c.w} rounded-full bg-white/80`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 space-y-2">
                                {[1, 2, 3].map((n) => (
                                    <div
                                        key={n}
                                        className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                                    >
                                        <div className="size-8 rounded-xl bg-green-light" />
                                        <div className="flex-1">
                                            <div className="h-3 w-32 rounded-full bg-slate-200" />
                                            <div className="mt-1.5 h-2 w-20 rounded-full bg-slate-100" />
                                        </div>
                                        <div className="h-6 w-16 rounded-lg bg-green-light" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl md:block">
                    <p className="text-xs font-semibold text-slate-500">
                        Progression cette semaine
                    </p>
                    <p className="text-2xl font-bold text-green">+24 pts</p>
                </div>
                <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl md:block">
                    <p className="text-xs font-semibold text-slate-500">
                        Streak actuel
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="text-2xl">🔥</span>
                        <p className="text-2xl font-bold text-coral">
                            14 jours
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Stats() {
    return (
        <section className="border-y border-slate-100 bg-white py-14">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {STATS.map(({ value, label, icon: Icon }) => (
                        <div key={label} className="text-center">
                            <Icon className="mx-auto mb-2 size-6 text-green" />
                            <p className="text-3xl font-bold text-slate-950">
                                {value}
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section id="features" className="bg-bac-bg px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-light px-4 py-1.5 text-sm font-semibold text-green-dark">
                        <Sparkles className="size-3.5" />
                        Tout ce qu'il te faut pour réussir
                    </div>
                    <h2 className="text-4xl font-bold text-slate-950 md:text-5xl">
                        Une plateforme complète,
                        <br />
                        pensée pour le BAC Sénégal
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
                        Chaque fonctionnalité a été conçue en accord avec les
                        programmes officiels de l'Office du Baccalauréat du
                        Sénégal.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map(({ icon: Icon, color, title, desc }) => (
                        <div
                            key={title}
                            className="group rounded-3xl border border-white bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div
                                className={`inline-flex size-12 items-center justify-center rounded-2xl ${color}`}
                            >
                                <Icon className="size-5" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-slate-950">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Series() {
    return (
        <section id="series" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-950 md:text-5xl">
                        Toutes les séries couvertes
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
                        Programme complet et à jour pour les Terminales L1, L2,
                        S1 et S2. Exercices, cours et annales pour chaque
                        matière.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {SERIES.map(({ code, label, color, subjects }) => (
                        <div
                            key={code}
                            className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
                        >
                            <div className={`${color} px-5 py-4`}>
                                <p className="text-xs font-semibold tracking-wider uppercase opacity-80">
                                    {label}
                                </p>
                                <p className="mt-1 text-3xl font-bold">
                                    {code}
                                </p>
                            </div>
                            <div className="p-5">
                                <ul className="space-y-2">
                                    {subjects.map((s) => (
                                        <li
                                            key={s}
                                            className="flex items-center gap-2 text-sm text-slate-700"
                                        >
                                            <Check className="size-4 shrink-0 text-green" />
                                            {s}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-sm text-slate-400">
                                        <Check className="size-4 shrink-0" />+
                                        toutes matières
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        {
            n: '01',
            title: 'Crée ton compte',
            desc: "Inscris-toi en 30 secondes. Choisis ta série et l'application configure ton environnement.",
        },
        {
            n: '02',
            title: 'Reçois ton planning',
            desc: "L'IA analyse tes matières et génère un calendrier de révisions adapté à tes objectifs et au compte à rebours BAC.",
        },
        {
            n: '03',
            title: 'Révise avec le tuteur IA',
            desc: "Pose des questions, fais des exercices, reçois des explications détaillées. Le coach s'adapte à ton niveau.",
        },
        {
            n: '04',
            title: 'Valide avec les annales',
            desc: "Entraîne-toi sur les vrais sujets du BAC Sénégal. Simule l'examen et mesure ta progression.",
        },
    ];

    return (
        <section className="bg-slate-950 px-6 py-24 text-white">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-green-light">
                        <Zap className="size-3.5" />
                        Simple et efficace
                    </div>
                    <h2 className="text-4xl font-bold md:text-5xl">
                        En route vers le BAC
                        <br />
                        en 4 étapes
                    </h2>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map(({ n, title, desc }) => (
                        <div key={n} className="relative">
                            <div className="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-green text-lg font-bold text-white">
                                {n}
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                                {title}
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-400">
                                {desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Testimonials() {
    return (
        <section id="testimonials" className="bg-bac-bg px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-950 md:text-5xl">
                        Ils ont réussi leur BAC
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Rejoins des milliers d'élèves qui ont fait confiance à
                        BAC Sénégal IA.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {TESTIMONIALS.map(({ name, serie, text, note }) => (
                        <div
                            key={name}
                            className="rounded-3xl border border-white bg-white p-7 shadow-sm"
                        >
                            <div className="flex gap-0.5">
                                {Array.from({ length: note }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-4 fill-amber text-amber"
                                    />
                                ))}
                            </div>
                            <p className="mt-4 text-sm leading-7 text-slate-700">
                                "{text}"
                            </p>
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-full bg-green text-sm font-bold text-white">
                                    {name[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {serie}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Pricing() {
    return (
        <section id="pricing" className="bg-white px-6 py-24">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-slate-950 md:text-5xl">
                        Des tarifs accessibles
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Commence gratuitement. Passe au Premium quand tu es
                        prêt.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {PLANS.map(
                        ({
                            name,
                            price,
                            period,
                            color,
                            badge,
                            cta,
                            ctaStyle,
                            features,
                        }) => (
                            <div
                                key={name}
                                className={`relative rounded-3xl border-2 ${color} bg-white p-8 shadow-sm`}
                            >
                                {badge && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green px-4 py-1 text-xs font-bold text-white shadow">
                                        {badge}
                                    </div>
                                )}
                                <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                                    {name}
                                </p>
                                <div className="mt-3 flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-slate-950">
                                        {price}
                                    </span>
                                    <span className="text-sm text-slate-500">
                                        {period}
                                    </span>
                                </div>

                                <ul className="mt-7 space-y-3">
                                    {features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-2.5 text-sm text-slate-700"
                                        >
                                            <Check className="mt-0.5 size-4 shrink-0 text-green" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/register"
                                    className={`mt-8 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold transition ${ctaStyle}`}
                                >
                                    {cta}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-green-dark p-12 text-center shadow-2xl">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-green">
                    <Brain className="size-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-white md:text-5xl">
                    Prêt à décrocher ton BAC ?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
                    Rejoins dès aujourd'hui les élèves qui révisent
                    intelligemment. Gratuit pour commencer, sans engagement.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        to="/register"
                        className="flex items-center gap-2 rounded-2xl bg-green px-8 py-4 text-base font-semibold text-white shadow-lg shadow-green/30 transition hover:bg-green-dark"
                    >
                        Créer mon compte gratuit
                        <ArrowRight className="size-4" />
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
                    >
                        Se connecter
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="border-t border-slate-100 bg-white px-6 py-12">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-xl bg-green">
                            <Brain className="size-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-950">
                            BAC Sénégal IA
                        </span>
                    </div>

                    <p className="text-sm text-slate-500">
                        Programmes officiels Office du Baccalauréat · L1, L2,
                        S1, S2
                    </p>

                    <div className="flex gap-6 text-sm text-slate-500">
                        <Link
                            to="/login"
                            className="transition-colors hover:text-green"
                        >
                            Connexion
                        </Link>
                        <Link
                            to="/register"
                            className="transition-colors hover:text-green"
                        >
                            S'inscrire
                        </Link>
                    </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-8 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} BAC Sénégal IA · Tous droits
                    réservés
                </div>
            </div>
        </footer>
    );
}

export default function Landing() {
    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <NavBar />
            <Hero />
            <Stats />
            <Features />
            <Series />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
}
