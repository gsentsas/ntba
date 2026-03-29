import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import SubjectCard from '@/components/SubjectCard';
import TaskItem from '@/components/TaskItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { usePlanning } from '@/hooks/usePlanning';
import { useProgress } from '@/hooks/useProgress';
import { useAppStore } from '@/store';

export default function Dashboard() {
    const user = useAppStore((state) => state.user);
    const setPage = useAppStore((state) => state.setPage);
    const { globalProgress, subjectsProgress } = useProgress();
    const { todayTasks, todayStats, generatePlan, completeTask, isLoading } =
        usePlanning();

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
                </section>
            </section>
        </Layout>
    );
}
