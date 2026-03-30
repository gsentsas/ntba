import { useQuery } from '@tanstack/react-query';
import {
    Activity,
    BookOpenCheck,
    Bot,
    ClipboardList,
    Download,
    FileEdit,
    FlaskConical,
    MessageSquare,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import SubjectCard from '@/components/SubjectCard';
import TaskItem from '@/components/TaskItem';
import { loadAgentMemory } from '@/lib/agentMemory';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { usePlanning } from '@/hooks/usePlanning';
import { useProgress } from '@/hooks/useProgress';
import { adminApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { AgentPdf } from '@/types';

function downloadPdf(pdf: AgentPdf) {
    const byteCharacters = atob(pdf.base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([new Uint8Array(byteNumbers)], {
        type: pdf.mime_type,
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pdf.file_name;
    link.click();
    window.URL.revokeObjectURL(url);
}

function buildInternalAgentLink({
    subjectId,
    chapterId,
    exerciseId,
    answerDraft,
}: {
    subjectId?: string;
    chapterId?: string;
    exerciseId?: string;
    answerDraft?: string;
}) {
    const params = new URLSearchParams();

    if (subjectId) {
        params.set('subject', subjectId);
    }

    if (chapterId) {
        params.set('chapter', chapterId);
    }

    if (exerciseId) {
        params.set('exercise', exerciseId);
    }

    if (answerDraft) {
        params.set('answer', answerDraft);
    }

    const query = params.toString();

    return query ? `/internal-agent?${query}` : '/internal-agent';
}

export default function Dashboard() {
    const user = useAppStore((state) => state.user);
    const setPage = useAppStore((state) => state.setPage);
    const isAdmin = user?.role === 'admin';
    const { globalProgress, subjectsProgress } = useProgress({
        enabled: !isAdmin,
    });
    const { todayTasks, todayStats, generatePlan, completeTask, isLoading } =
        usePlanning({ enabled: !isAdmin });
    const { data: adminStats } = useQuery({
        queryKey: ['admin-stats-home'],
        queryFn: adminApi.stats,
        enabled: isAdmin,
        refetchInterval: 60_000,
    });

    useEffect(() => {
        setPage('dashboard');
    }, [setPage]);

    const weakestHighCoeff = [...subjectsProgress].sort((a, b) => {
        const scoreA = a.subject.coefficient * 10 - a.simulated_grade;
        const scoreB = b.subject.coefficient * 10 - b.simulated_grade;

        return scoreB - scoreA;
    })[0];

    const prioritizedSubjects = [...subjectsProgress]
        .sort((a, b) => {
            const scoreA = a.subject.coefficient * 10 - a.simulated_grade;
            const scoreB = b.subject.coefficient * 10 - b.simulated_grade;

            return scoreB - scoreA;
        })
        .slice(0, 4);
    const agentMemory = !isAdmin ? loadAgentMemory() : null;
    const lastSessionForSerie =
        agentMemory?.lastSession &&
        (!agentMemory.lastSession.serieCode ||
            agentMemory.lastSession.serieCode === user?.serie_code)
            ? agentMemory.lastSession
            : null;
    const recentAgentItems = (agentMemory?.recentItems ?? [])
        .filter((item) => !item.serieCode || item.serieCode === user?.serie_code)
        .slice(0, 3);

    if (isAdmin) {
        return (
            <Layout>
                <section className="space-y-6">
                    <Card className="overflow-hidden border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_100%)] text-white shadow-xl shadow-slate-900/10">
                        <CardContent className="grid gap-6 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
                            <div>
                                <p className="text-sm tracking-[0.18em] uppercase text-green-light">
                                    Administration
                                </p>
                                <h1 className="mt-3 text-4xl font-semibold">
                                    Bonjour {user?.prenom ?? 'admin'} !
                                </h1>
                                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
                                    Pilotage global de la plateforme, des
                                    séries et des contenus. Utilise ce tableau
                                    de bord pour suivre l’activité et accéder
                                    rapidement aux outils d’administration.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link to="/admin">
                                        <Button className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100">
                                            Ouvrir le panneau admin
                                        </Button>
                                    </Link>
                                    <Badge className="rounded-full bg-white/10 px-4 py-2 text-white">
                                        Rôle administrateur
                                    </Badge>
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] bg-white/10 p-5 backdrop-blur">
                                <p className="text-sm text-white/75">
                                    Utilisateurs actifs aujourd&apos;hui
                                </p>
                                <div className="mt-4 text-5xl font-semibold">
                                    {adminStats?.active_today ?? 0}
                                </div>
                                <div className="mt-5 grid gap-2 text-sm text-white/75">
                                    <p>
                                        {adminStats?.total_users ?? 0}{' '}
                                        utilisateurs au total
                                    </p>
                                    <p>
                                        {adminStats?.premium_users ?? 0}{' '}
                                        comptes premium
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            {
                                label: 'Utilisateurs',
                                value: String(adminStats?.total_users ?? 0),
                                icon: Users,
                            },
                            {
                                label: 'Actifs aujourd’hui',
                                value: String(adminStats?.active_today ?? 0),
                                icon: Activity,
                            },
                            {
                                label: 'Exercices',
                                value: String(adminStats?.total_exercises ?? 0),
                                icon: ClipboardList,
                            },
                            {
                                label: 'Nouveaux cette semaine',
                                value: String(adminStats?.new_users_week ?? 0),
                                icon: ShieldCheck,
                            },
                        ].map((item) => (
                            <Card
                                key={item.label}
                                className="border-white/70 bg-white/90"
                            >
                                <CardContent className="flex items-start justify-between px-5 py-5">
                                    <div>
                                        <p className="text-sm text-slate-500">
                                            {item.label}
                                        </p>
                                        <p className="mt-3 text-3xl font-semibold text-slate-950">
                                            {item.value}
                                        </p>
                                    </div>
                                    <item.icon className="size-5 text-slate-500" />
                                </CardContent>
                            </Card>
                        ))}
                    </section>

                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            {
                                title: 'Panneau admin',
                                description:
                                    'Vue complète des indicateurs et séries.',
                                to: '/admin',
                                icon: ShieldCheck,
                            },
                            {
                                title: 'Utilisateurs',
                                description:
                                    'Gérer les comptes, rôles et séries.',
                                to: '/admin/users',
                                icon: Users,
                            },
                            {
                                title: 'Contenu',
                                description:
                                    'Éditer cours, chapitres et publications.',
                                to: '/admin/content',
                                icon: FileEdit,
                            },
                            {
                                title: 'Forum',
                                description:
                                    'Modérer les discussions par série.',
                                to: '/admin/forum',
                                icon: MessageSquare,
                            },
                        ].map((item) => (
                            <Card
                                key={item.title}
                                className="border-white/70 bg-white/90"
                            >
                                <CardContent className="space-y-4 px-5 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                            <item.icon className="size-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-950">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Link to={item.to}>
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-2xl"
                                        >
                                            Ouvrir
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                        <Card className="border-white/70 bg-white/90">
                            <CardHeader>
                                <CardTitle className="text-2xl text-slate-950">
                                    Séries les plus actives
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(adminStats?.series_distribution ?? []).map(
                                    (serie) => (
                                        <div
                                            key={serie.code}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="w-10 rounded bg-slate-900 px-2 py-0.5 text-center text-xs font-bold text-white">
                                                {serie.code}
                                            </span>
                                            <div className="h-2 flex-1 rounded-full bg-slate-100">
                                                <div
                                                    className="h-2 rounded-full bg-green"
                                                    style={{
                                                        width: `${serie.pct}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="w-24 text-right text-xs text-slate-500">
                                                {serie.count} ({serie.pct}%)
                                            </span>
                                        </div>
                                    ),
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-white/70 bg-white/90">
                            <CardHeader>
                                <CardTitle className="text-2xl text-slate-950">
                                    Chapitres difficiles
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(adminStats?.hardest_chapters ?? [])
                                    .slice(0, 6)
                                    .map((chapter) => (
                                        <div
                                            key={`${chapter.subject}-${chapter.title}`}
                                            className="flex items-start justify-between gap-3"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-slate-900">
                                                    {chapter.title}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {chapter.subject}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-coral">
                                                    {chapter.error_rate}%
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {chapter.attempts}{' '}
                                                    tentatives
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </CardContent>
                        </Card>
                    </section>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="space-y-6">
                <Card className="overflow-hidden border-green-light bg-[linear-gradient(135deg,#1d9e75_0%,#0f6e56_100%)] text-white shadow-xl shadow-green/20">
                    <CardContent className="grid gap-6 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="text-sm tracking-[0.18em] text-green-light uppercase">
                                Tableau de bord
                            </p>
                            <h1 className="mt-3 text-4xl font-semibold">
                                Bonjour {user?.prenom ?? 'élève'} !
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80">
                                Il reste {globalProgress?.days_until_bac ?? 0}{' '}
                                jours avant le Bac. Ton rythme actuel te place à{' '}
                                {globalProgress?.simulated_average?.toFixed(
                                    1,
                                ) ?? '0.0'}
                                /20.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link to="/planning">
                                    <Button className="rounded-2xl bg-white text-green-dark hover:bg-green-light">
                                        Voir mon planning
                                    </Button>
                                </Link>
                                <Badge className="rounded-full bg-white/10 px-4 py-2 text-white">
                                    Streak{' '}
                                    {globalProgress?.streak_days ??
                                        user?.streak_days ??
                                        0}{' '}
                                    jours
                                </Badge>
                            </div>
                        </div>

                        <div className="rounded-[1.75rem] bg-white/10 p-5 backdrop-blur">
                            <p className="text-sm text-white/75">
                                Progression globale
                            </p>
                            <div className="mt-4 text-5xl font-semibold">
                                {globalProgress?.overall_pct ?? 0}%
                            </div>
                            <div className="mt-5">
                                <ProgressBar
                                    value={globalProgress?.overall_pct ?? 0}
                                    className="[&_*]:text-white"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {weakestHighCoeff ? (
                    <Card className="border-purple-light bg-[linear-gradient(135deg,#eeedfe_0%,#ffffff_100%)]">
                        <CardContent className="px-6 py-5">
                            <p className="text-sm font-semibold text-purple">
                                ✦ Suggestion IA
                            </p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">
                                Concentre-toi d’abord sur{' '}
                                <strong>{weakestHighCoeff.subject.name}</strong>{' '}
                                : coefficient{' '}
                                {weakestHighCoeff.subject.coefficient} et
                                moyenne simulée à{' '}
                                {weakestHighCoeff.simulated_grade.toFixed(1)}
                                /20.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Link
                                    to={`/quiz?subject=${weakestHighCoeff.subject.id}`}
                                >
                                    <Button className="rounded-2xl bg-purple text-white hover:bg-purple/90">
                                        Quiz recommandé
                                    </Button>
                                </Link>
                                <Link
                                    to={`/chapters/${weakestHighCoeff.subject.id}`}
                                >
                                    <Button
                                        variant="outline"
                                        className="rounded-2xl border-purple/30 text-purple hover:bg-purple-light"
                                    >
                                        Revoir le cours
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        {
                            label: 'Progression globale',
                            value: `${globalProgress?.overall_pct ?? 0}%`,
                        },
                        {
                            label: 'Exercices faits',
                            value: String(
                                globalProgress?.total_exercises_done ?? 0,
                            ),
                        },
                        {
                            label: 'Moyenne simulée',
                            value: `${globalProgress?.simulated_average?.toFixed(1) ?? '0.0'}/20`,
                        },
                        {
                            label: 'Streak actuel',
                            value: `${globalProgress?.streak_days ?? 0} jours`,
                        },
                    ].map((item) => (
                        <Card
                            key={item.label}
                            className="border-white/70 bg-white/90"
                        >
                            <CardContent className="px-5 py-5">
                                <p className="text-sm text-slate-500">
                                    {item.label}
                                </p>
                                <p className="mt-3 text-3xl font-semibold text-slate-950">
                                    {item.value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-950">
                                Réviser ma série
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Accès rapide aux révisions classées pour la
                                série {user?.serie_code ?? 'de l’élève'}
                            </p>
                        </div>
                        <Badge className="border-0 bg-slate-900 text-white">
                            Série {user?.serie_code ?? 'N/A'}
                        </Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="border-white/70 bg-white/90">
                            <CardContent className="space-y-4 px-5 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-2xl bg-green-xlight text-green-dark">
                                        <ClipboardList className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-950">
                                            Quiz de ma série
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Exercices filtrés pour{' '}
                                            {user?.serie_code ?? 'ta série'}
                                        </p>
                                    </div>
                                </div>
                                <Link to="/quiz">
                                    <Button className="w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                        Ouvrir les quiz
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-white/70 bg-white/90">
                            <CardContent className="space-y-4 px-5 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-light text-amber-700">
                                        <BookOpenCheck className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-950">
                                            Annales de ma série
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Sujets officiels classés pour{' '}
                                            {user?.serie_code ?? 'ta série'}
                                        </p>
                                    </div>
                                </div>
                                <Link to="/annales">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl border-amber/40 text-amber-700 hover:bg-amber-light"
                                    >
                                        Voir les annales
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-white/70 bg-white/90">
                            <CardContent className="space-y-4 px-5 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                                        <FlaskConical className="size-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-950">
                                            Simulation BAC
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Entraînement adapté à{' '}
                                            {user?.serie_code ?? 'ta série'}
                                        </p>
                                    </div>
                                </div>
                                <Link to="/simulation">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl"
                                    >
                                        Lancer une simulation
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-slate-950">
                                Matières prioritaires
                            </h2>
                            <Link
                                to="/subjects"
                                className="text-sm font-semibold text-green-dark"
                            >
                                Voir toutes les matières
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {prioritizedSubjects.map((item) => (
                                <SubjectCard
                                    key={item.subject.id}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Card className="border-white/70 bg-white/90">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-2xl text-slate-950">
                                        <Bot className="size-5 text-green-dark" />
                                        Reprendre ma session agent
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Retrouve ton dernier brouillon, ta matière
                                        et ton exercice en cours.
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {lastSessionForSerie &&
                                (lastSessionForSerie.subjectId ||
                                    lastSessionForSerie.chapterId ||
                                    lastSessionForSerie.exerciseId ||
                                    lastSessionForSerie.answerDraft) ? (
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="space-y-2 text-sm text-slate-600">
                                            <p>
                                                Dernière mise à jour:{' '}
                                                <span className="font-medium text-slate-900">
                                                    {new Date(
                                                        lastSessionForSerie.updatedAt,
                                                    ).toLocaleString('fr-SN')}
                                                </span>
                                            </p>
                                            <p>
                                                Contexte mémorisé:{' '}
                                                <span className="font-medium text-slate-900">
                                                    {lastSessionForSerie.exerciseId
                                                        ? 'exercice + brouillon'
                                                        : lastSessionForSerie.chapterId
                                                          ? 'chapitre ciblé'
                                                          : lastSessionForSerie.subjectId
                                                            ? 'matière ciblée'
                                                            : 'brouillon de réponse'}
                                                </span>
                                            </p>
                                            {lastSessionForSerie.answerDraft ? (
                                                <p className="line-clamp-3 rounded-xl bg-white px-3 py-2 text-xs leading-6 text-slate-500">
                                                    {lastSessionForSerie.answerDraft}
                                                </p>
                                            ) : null}
                                        </div>
                                        <Link
                                            to={buildInternalAgentLink({
                                                subjectId:
                                                    lastSessionForSerie.subjectId,
                                                chapterId:
                                                    lastSessionForSerie.chapterId,
                                                exerciseId:
                                                    lastSessionForSerie.exerciseId,
                                                answerDraft:
                                                    lastSessionForSerie.answerDraft,
                                            })}
                                        >
                                            <Button className="mt-4 w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                                Reprendre dans l’agent
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-green-light bg-green-xlight px-5 py-6 text-center">
                                        <p className="text-sm leading-7 text-slate-600">
                                            Aucune session agent à reprendre pour le
                                            moment.
                                        </p>
                                        <Link to="/internal-agent">
                                            <Button className="mt-4 rounded-2xl bg-green text-white hover:bg-green-dark">
                                                Démarrer avec l’agent
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-white/70 bg-white/90">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2 text-2xl text-slate-950">
                                        <Bot className="size-5 text-green-dark" />
                                        Mes derniers documents
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-slate-600">
                                        Fiches et corrections récentes générées par
                                        l’agent sur cet appareil.
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentAgentItems.length > 0 ? (
                                    recentAgentItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-slate-900">
                                                        {item.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {item.subtitle}
                                                    </p>
                                                    <p className="mt-1 text-[11px] text-slate-400">
                                                        {new Date(item.createdAt).toLocaleString(
                                                            'fr-SN',
                                                        )}
                                                    </p>
                                                </div>
                                                {item.pdf ? (
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        onClick={() => downloadPdf(item.pdf!)}
                                                        className="shrink-0 bg-green text-white hover:bg-green-dark"
                                                    >
                                                        <Download className="mr-1.5 size-3.5" />
                                                        PDF
                                                    </Button>
                                                ) : null}
                                            </div>
                                            <Link
                                                to={buildInternalAgentLink({
                                                    subjectId: item.subjectId,
                                                    chapterId: item.chapterId,
                                                    exerciseId: item.exerciseId,
                                                })}
                                                className="mt-3 inline-flex text-xs font-semibold text-green-dark"
                                            >
                                                Ouvrir dans l’agent
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-green-light bg-green-xlight px-5 py-6 text-center">
                                        <p className="text-sm leading-7 text-slate-600">
                                            Aucune fiche ni correction récente pour le
                                            moment.
                                        </p>
                                        <Link to="/internal-agent">
                                            <Button className="mt-4 rounded-2xl bg-green text-white hover:bg-green-dark">
                                                Ouvrir l’agent interne
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="border-white/70 bg-white/90">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl text-slate-950">
                                        Tâches du jour
                                    </CardTitle>
                                    <p className="mt-2 text-sm text-slate-600">
                                        {todayStats
                                            ? `${todayStats.completed_ratio} complétées · ${todayStats.minutes_remaining} min restantes`
                                            : 'Aucune donnée pour le moment'}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {todayTasks.length > 0 ? (
                                    todayTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onToggle={completeTask}
                                            disabled={isLoading}
                                        />
                                    ))
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-green-light bg-green-xlight px-5 py-6 text-center">
                                        <p className="text-sm leading-7 text-slate-600">
                                            Aucun planning actif pour le moment.
                                        </p>
                                        <Button
                                            className="mt-4 rounded-2xl bg-green text-white hover:bg-green-dark"
                                            onClick={() => generatePlan()}
                                            disabled={isLoading}
                                        >
                                            Générer mon planning IA
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
