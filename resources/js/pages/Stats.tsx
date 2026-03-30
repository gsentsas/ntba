import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
    Award,
    BarChart2,
    BookOpen,
    Flame,
    Target,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { useEffect } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    RadialBar,
    RadialBarChart,
    Legend,
} from 'recharts';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Spinner } from '@/components/ui/spinner';
import { adminApi, progressApi } from '@/services/api';
import { useAppStore } from '@/store';

const ACHIEVEMENTS_META: Record<string, { icon: string; label: string }> = {
    premier_exercice: { icon: '🎯', label: 'Premier exercice' },
    streak_7: { icon: '🔥', label: 'Streak 7 jours' },
    streak_30: { icon: '⚡', label: 'Streak 30 jours' },
    cent_exercices: { icon: '💯', label: '100 exercices' },
    premiere_simulation: { icon: '🏆', label: 'Première simulation' },
    moyenne_15: { icon: '⭐', label: 'Moyenne 15/20' },
    planning_complet: { icon: '📅', label: 'Planning complété' },
};

export default function Stats() {
    const { user, setPage } = useAppStore();
    const isAdmin = user?.role === 'admin';
    useEffect(() => {
        setPage('stats');
    }, [setPage]);

    const { data: global, isLoading: loadingGlobal } = useQuery({
        queryKey: ['progress-global'],
        queryFn: progressApi.global,
        enabled: !isAdmin,
    });

    const { data: subjects = [], isLoading: loadingSubjects } = useQuery({
        queryKey: ['progress-subjects'],
        queryFn: progressApi.subjects,
        enabled: !isAdmin,
    });

    const { data: weekly = [], isLoading: loadingWeekly } = useQuery({
        queryKey: ['progress-weekly'],
        queryFn: progressApi.weeklyActivity,
        enabled: !isAdmin,
    });

    const { data: achievements = [] } = useQuery({
        queryKey: ['achievements'],
        queryFn: progressApi.achievements,
        enabled: !isAdmin,
    });

    const { data: adminStats, isLoading: loadingAdmin } = useQuery({
        queryKey: ['admin-stats-stats-page'],
        queryFn: adminApi.stats,
        enabled: isAdmin,
    });

    const isLoading = isAdmin
        ? loadingAdmin
        : loadingGlobal || loadingSubjects || loadingWeekly;

    if (isLoading) {
        return (
            <Layout>
                <div className="flex justify-center py-20">
                    <Spinner className="h-8 w-8 text-green" />
                </div>
            </Layout>
        );
    }

    if (isAdmin) {
        return (
            <Layout>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Statistiques plateforme
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Vue admin consolidée sur toutes les séries
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: <Target className="h-5 w-5" />,
                                label: 'Utilisateurs',
                                value: adminStats?.total_users ?? 0,
                                color: 'text-green',
                            },
                            {
                                icon: <TrendingUp className="h-5 w-5" />,
                                label: 'Actifs aujourd’hui',
                                value: adminStats?.active_today ?? 0,
                                color: 'text-purple',
                            },
                            {
                                icon: <BookOpen className="h-5 w-5" />,
                                label: 'Exercices',
                                value: adminStats?.total_exercises ?? 0,
                                color: 'text-amber',
                            },
                            {
                                icon: <Zap className="h-5 w-5" />,
                                label: 'Sessions IA',
                                value: adminStats?.total_ai_sessions ?? 0,
                                color: 'text-coral',
                            },
                        ].map((kpi, i) => (
                            <Card key={i}>
                                <CardContent className="flex items-center gap-4 py-4">
                                    <div
                                        className={`${kpi.color} rounded-xl bg-slate-50 p-2.5`}
                                    >
                                        {kpi.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500">
                                            {kpi.label}
                                        </p>
                                        <p
                                            className={`text-2xl font-bold ${kpi.color}`}
                                        >
                                            {String(kpi.value)}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Séries les plus actives</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {(adminStats?.series_distribution ?? []).map(
                                (serie) => (
                                    <div
                                        key={serie.code}
                                        className="flex items-center gap-3"
                                    >
                                        <Badge className="border-0 bg-slate-900 text-white">
                                            {serie.code}
                                        </Badge>
                                        <div className="h-2 flex-1 rounded-full bg-slate-100">
                                            <div
                                                className="h-2 rounded-full bg-green"
                                                style={{
                                                    width: `${serie.pct}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-500">
                                            {serie.count} ({serie.pct}%)
                                        </span>
                                    </div>
                                ),
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Chapitres les plus difficiles</CardTitle>
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
                                            <p className="truncate text-sm font-medium text-slate-800">
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
                                                {chapter.attempts} tentatives
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">
                    Mes Statistiques
                </h1>

                {/* KPIs globaux */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: <Target className="h-5 w-5" />,
                            label: 'Progression globale',
                            value: `${global?.overall_pct ?? 0}%`,
                            color: 'text-green',
                        },
                        {
                            icon: <BarChart2 className="h-5 w-5" />,
                            label: 'Moyenne simulée',
                            value: `${(global?.simulated_average ?? 0).toFixed(1)}/20`,
                            color: 'text-purple',
                        },
                        {
                            icon: <BookOpen className="h-5 w-5" />,
                            label: 'Exercices faits',
                            value: global?.total_exercises_done ?? 0,
                            color: 'text-amber',
                        },
                        {
                            icon: <Flame className="h-5 w-5" />,
                            label: 'Streak actuel',
                            value: `${user?.streak_days ?? 0}j`,
                            color: 'text-coral',
                        },
                    ].map((kpi, i) => (
                        <Card key={i}>
                            <CardContent className="flex items-center gap-4 py-4">
                                <div
                                    className={`${kpi.color} rounded-xl bg-slate-50 p-2.5`}
                                >
                                    {kpi.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">
                                        {kpi.label}
                                    </p>
                                    <p
                                        className={`text-2xl font-bold ${kpi.color}`}
                                    >
                                        {kpi.value}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Graphique activité 7 jours */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activité des 7 derniers jours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart
                                data={weekly.map((d) => ({
                                    ...d,
                                    date: format(new Date(d.date), 'EEE', {
                                        locale: fr,
                                    }),
                                }))}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 12,
                                        border: 'none',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    }}
                                    formatter={(value, name) => [
                                        value,
                                        name === 'exercises_done'
                                            ? 'Exercices'
                                            : name === 'points_earned'
                                              ? 'Points'
                                              : 'Minutes',
                                    ]}
                                />
                                <Bar
                                    dataKey="exercises_done"
                                    fill="#1D9E75"
                                    radius={[4, 4, 0, 0]}
                                    name="exercises_done"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Progression par matière */}
                <Card>
                    <CardHeader>
                        <CardTitle>Progression par matière</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {subjects.map((sp) => (
                            <div key={sp.subject.id} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span>{sp.subject.icon}</span>
                                        <span className="text-sm font-medium text-slate-700">
                                            {sp.subject.name}
                                        </span>
                                        <Badge className="border-0 bg-slate-100 text-xs text-slate-500">
                                            coeff {sp.subject.coefficient}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-sm font-semibold ${sp.simulated_grade >= 10 ? 'text-green' : 'text-coral'}`}
                                        >
                                            {sp.simulated_grade.toFixed(1)}/20
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {sp.completion_pct}%
                                        </span>
                                    </div>
                                </div>
                                <ProgressBar
                                    value={sp.completion_pct}
                                    className="h-2"
                                />
                                {sp.weak_chapters?.length > 0 && (
                                    <p className="text-[11px] text-slate-400">
                                        À retravailler :{' '}
                                        {sp.weak_chapters
                                            .map((c) => c.chapter_title)
                                            .join(', ')}
                                    </p>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Badges */}
                {achievements.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Mes badges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                {achievements.map((key) => {
                                    const meta = ACHIEVEMENTS_META[key] ?? {
                                        icon: '🏅',
                                        label: key,
                                    };

                                    return (
                                        <div
                                            key={key}
                                            className="flex flex-col items-center gap-1 rounded-xl bg-green-xlight px-4 py-3"
                                        >
                                            <span className="text-2xl">
                                                {meta.icon}
                                            </span>
                                            <span className="text-xs font-medium text-green-dark">
                                                {meta.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Stats détaillées */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="py-4 text-center">
                            <p className="text-3xl font-bold text-green">
                                {global?.accuracy_rate ?? 0}%
                            </p>
                            <p className="text-sm text-slate-500">
                                Taux de réussite
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4 text-center">
                            <p className="text-3xl font-bold text-purple">
                                {user?.total_points ?? 0}
                            </p>
                            <p className="text-sm text-slate-500">
                                Points totaux
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4 text-center">
                            <p className="text-3xl font-bold text-amber">
                                {global?.days_until_bac ?? '—'}
                            </p>
                            <p className="text-sm text-slate-500">
                                Jours avant le BAC
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
