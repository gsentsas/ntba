import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Activity, Bot, Trophy, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { adminApi } from '@/services/api';
import { Spinner } from '@/components/ui/spinner';

export default function AdminDashboard() {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: adminApi.stats,
        refetchInterval: 60_000, // rafraîchir chaque minute
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Spinner className="h-8 w-8 text-green" />
            </div>
        );
    }

    const kpis = [
        { label: 'Utilisateurs totaux', value: stats?.total_users ?? 0, sub: `+${stats?.new_users_today ?? 0} aujourd'hui`, icon: Users, color: 'text-green' },
        { label: 'Sessions IA', value: stats?.total_ai_sessions ?? 0, sub: `${((stats?.total_ai_tokens ?? 0) / 1000).toFixed(0)}k tokens`, icon: Bot, color: 'text-purple' },
        { label: 'Exercices', value: stats?.total_exercises ?? 0, sub: 'dans la base', icon: Trophy, color: 'text-amber' },
        { label: 'Actifs aujourd\'hui', value: stats?.active_today ?? 0, sub: `${stats?.premium_users ?? 0} premium`, icon: Activity, color: 'text-coral' },
    ];

    const chartData = (stats?.daily_active_users ?? []).slice(-14).map((d) => ({
        ...d,
        date: format(new Date(d.date), 'dd/MM', { locale: fr }),
    }));

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
                <p className="text-sm text-slate-400">Données en temps réel</p>
            </div>

            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi, i) => (
                    <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-slate-400">{kpi.label}</p>
                                <p className={`mt-1 text-3xl font-bold ${kpi.color}`}>{kpi.value.toLocaleString()}</p>
                                <p className="mt-0.5 text-xs text-slate-500">{kpi.sub}</p>
                            </div>
                            <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Graphique activité */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 font-semibold text-white">Utilisateurs actifs (14 derniers jours)</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                        <Tooltip
                            contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10 }}
                            labelStyle={{ color: '#94a3b8' }}
                            itemStyle={{ color: '#1D9E75' }}
                        />
                        <Bar dataKey="count" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Distribution séries */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <h2 className="mb-4 font-semibold text-white">Séries les plus actives</h2>
                    <div className="space-y-3">
                        {(stats?.series_distribution ?? []).map((s) => (
                            <div key={s.code} className="flex items-center gap-3">
                                <span className="w-10 rounded bg-slate-800 px-2 py-0.5 text-center text-xs font-bold text-white">
                                    {s.code}
                                </span>
                                <div className="flex-1">
                                    <div className="h-2 rounded-full bg-slate-800">
                                        <div
                                            className="h-2 rounded-full bg-green"
                                            style={{ width: `${s.pct}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="w-20 text-right text-xs text-slate-400">
                                    {s.count} ({s.pct}%)
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chapitres difficiles */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <h2 className="mb-4 font-semibold text-white">Chapitres les plus difficiles</h2>
                    <div className="space-y-3">
                        {(stats?.hardest_chapters ?? []).slice(0, 6).map((c, i) => (
                            <div key={i} className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-white">{c.title}</p>
                                    <p className="text-xs text-slate-500">{c.subject}</p>
                                </div>
                                <div className="shrink-0 text-right">
                                    <p className="text-sm font-semibold text-coral">{c.error_rate}%</p>
                                    <p className="text-xs text-slate-500">{c.attempts} tentatives</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats rapides */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { label: 'Nouveaux cette semaine', value: stats?.new_users_week ?? 0 },
                    { label: 'Revenus Premium (XOF)', value: (stats?.premium_revenue_xof ?? 0).toLocaleString() },
                    { label: 'Tokens IA totaux', value: ((stats?.total_ai_tokens ?? 0) / 1000).toFixed(1) + 'k' },
                ].map((s, i) => (
                    <div key={i} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
                        <p className="text-2xl font-bold text-white">{s.value}</p>
                        <p className="text-xs text-slate-400">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
