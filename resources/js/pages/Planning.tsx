import { useEffect, useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarDays, ChevronLeft, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Layout } from '@/components/Layout/Layout';
import TaskItem from '@/components/TaskItem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { planningApi } from '@/services/api';
import { useAppStore } from '@/store';

export default function Planning() {
    const { setPage } = useAppStore();
    const queryClient = useQueryClient();
    const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));

    useEffect(() => { setPage('planning'); }, [setPage]);

    const { data: today, isLoading: loadingToday } = useQuery({
        queryKey: ['planning-today'],
        queryFn: planningApi.today,
    });

    const { data: week, isLoading: loadingWeek } = useQuery({
        queryKey: ['planning-week', weekStart.toISOString()],
        queryFn: () => planningApi.week(format(weekStart, 'yyyy-MM-dd')),
    });

    const generateMutation = useMutation({
        mutationFn: planningApi.generate,
        onSuccess: (data) => {
            toast.success(`Planning généré ! ${data.tasks_created} tâches créées, ${data.days_left} jours jusqu'au BAC.`);
            queryClient.invalidateQueries({ queryKey: ['planning-today'] });
            queryClient.invalidateQueries({ queryKey: ['planning-week'] });
        },
        onError: () => toast.error('Erreur lors de la génération du planning'),
    });

    const completeMutation = useMutation({
        mutationFn: planningApi.completeTask,
        onSuccess: (data) => {
            if (data.all_done_today) toast.success('🎉 Toutes les tâches du jour terminées ! +20 pts bonus');
            else toast.success(`+${data.points_earned} points !`);
            queryClient.invalidateQueries({ queryKey: ['planning-today'] });
            queryClient.invalidateQueries({ queryKey: ['planning-week'] });
        },
    });

    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-slate-800">Mon Planning</h1>
                    <Button
                        onClick={() => generateMutation.mutate()}
                        disabled={generateMutation.isPending}
                        className="bg-green text-white hover:bg-green-dark"
                    >
                        {generateMutation.isPending ? <Spinner className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                        {generateMutation.isPending ? 'Génération…' : 'Régénérer le planning IA'}
                    </Button>
                </div>

                {/* Tâches du jour */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Aujourd'hui</span>
                            {today?.stats && (
                                <Badge className="bg-green-light text-green-dark border-0">
                                    {today.stats.completed}/{today.stats.total} tâches
                                </Badge>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loadingToday ? (
                            <div className="flex justify-center py-8"><Spinner className="h-6 w-6 text-green" /></div>
                        ) : today?.tasks?.length ? (
                            <div className="space-y-2">
                                {today.tasks.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onToggle={() => completeMutation.mutate(task.id)}
                                    />
                                ))}
                                {today.stats && (
                                    <p className="pt-2 text-xs text-slate-400 text-right">
                                        ~{today.stats.minutes_remaining} min restantes
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="py-8 text-center">
                                <CalendarDays className="mx-auto mb-3 h-10 w-10 text-slate-200" />
                                <p className="text-slate-500">Aucune tâche aujourd'hui.</p>
                                <Button
                                    variant="outline"
                                    className="mt-4 border-green/30 text-green"
                                    onClick={() => generateMutation.mutate()}
                                    disabled={generateMutation.isPending}
                                >
                                    Générer mon planning IA
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Vue semaine */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Semaine</CardTitle>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setWeekStart((d) => addDays(d, -7))}
                                    className="rounded-lg p-1.5 hover:bg-slate-100"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <span className="text-sm font-medium text-slate-600">
                                    {format(weekStart, "d MMM", { locale: fr })} – {format(addDays(weekStart, 6), "d MMM yyyy", { locale: fr })}
                                </span>
                                <button
                                    onClick={() => setWeekStart((d) => addDays(d, 7))}
                                    className="rounded-lg p-1.5 hover:bg-slate-100"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loadingWeek ? (
                            <div className="flex justify-center py-8"><Spinner className="h-6 w-6 text-green" /></div>
                        ) : (
                            <div className="grid gap-3 sm:grid-cols-7">
                                {weekDays.map((day) => {
                                    const key = format(day, 'yyyy-MM-dd');
                                    const tasks = week?.[key] ?? [];
                                    const isToday = key === format(new Date(), 'yyyy-MM-dd');
                                    return (
                                        <div
                                            key={key}
                                            className={`rounded-xl border p-3 ${isToday ? 'border-green bg-green-xlight' : 'border-slate-100 bg-white'}`}
                                        >
                                            <p className={`mb-2 text-xs font-semibold uppercase ${isToday ? 'text-green' : 'text-slate-400'}`}>
                                                {format(day, 'EEE d', { locale: fr })}
                                            </p>
                                            {tasks.length === 0 ? (
                                                <p className="text-[11px] text-slate-300">Libre</p>
                                            ) : (
                                                <div className="space-y-1">
                                                    {tasks.slice(0, 3).map((t) => (
                                                        <div key={t.id} className={`rounded px-1.5 py-1 text-[10px] font-medium ${t.is_completed ? 'line-through text-slate-300' : 'text-slate-600'}`}>
                                                            {t.title}
                                                        </div>
                                                    ))}
                                                    {tasks.length > 3 && (
                                                        <p className="text-[10px] text-slate-400">+{tasks.length - 3} autres</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
