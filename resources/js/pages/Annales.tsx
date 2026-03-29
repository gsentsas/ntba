import { useQuery } from '@tanstack/react-query';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    Download,
    FileText,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { exercisesApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { Exercise } from '@/types';

export default function Annales() {
    const { user, setPage } = useAppStore();
    useEffect(() => {
        setPage('annales');
    }, [setPage]);

    const [filterYear, setFilterYear] = useState<number | ''>('');
    const [filterSubject, setFilterSubject] = useState('');
    const [expanded, setExpanded] = useState<string | null>(null);

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', user?.serie_code],
        queryFn: () => subjectsApi.list(user?.serie_code),
        enabled: !!user?.serie_code,
    });

    const { data: annales = [], isLoading } = useQuery({
        queryKey: ['annales', filterYear, filterSubject, user?.serie_code],
        queryFn: () =>
            exercisesApi.annales({
                serie_code: user?.serie_code,
                year: filterYear || undefined,
                subject_id: filterSubject || undefined,
            }),
    });

    const availableYears = [...new Set(annales.map((a) => a.year))].sort(
        (a, b) => b - a,
    );

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Annales du BAC
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Sujets officiels avec corrigés — Session 2024
                    </p>
                </div>

                {/* Filtres */}
                <div className="flex flex-wrap gap-3">
                    <select
                        value={filterYear}
                        onChange={(e) =>
                            setFilterYear(
                                e.target.value ? Number(e.target.value) : '',
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-green focus:outline-none"
                    >
                        <option value="">Toutes les années</option>
                        {availableYears.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:border-green focus:outline-none"
                    >
                        <option value="">Toutes les matières</option>
                        {subjects.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.icon} {s.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Résultats */}
                {isLoading ? (
                    <div className="flex justify-center py-16">
                        <Spinner className="h-8 w-8 text-green" />
                    </div>
                ) : annales.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                            <BookOpen className="h-12 w-12 text-slate-200" />
                            <p className="text-slate-500">
                                Aucune annale trouvée avec ces filtres.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {annales.map(({ year, subject, exercises }) => {
                            const key = `${year}-${subject.id}`;
                            const isOpen = expanded === key;

                            return (
                                <Card key={key}>
                                    <button
                                        className="w-full text-left"
                                        onClick={() =>
                                            setExpanded(isOpen ? null : key)
                                        }
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-2xl">
                                                        {subject.icon}
                                                    </span>
                                                    <div>
                                                        <CardTitle className="text-base">
                                                            {subject.name}
                                                        </CardTitle>
                                                        <p className="text-sm text-slate-500">
                                                            Session {year}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Badge className="border-0 bg-amber-light text-amber-700">
                                                        {exercises.length} sujet
                                                        {exercises.length > 1
                                                            ? 's'
                                                            : ''}
                                                    </Badge>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-4 w-4 text-slate-400" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </button>

                                    {isOpen && (
                                        <CardContent className="space-y-3 pt-0">
                                            {exercises.map((ex: Exercise) => (
                                                <div
                                                    key={ex.id}
                                                    className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-slate-800">
                                                                {ex.annale_session ??
                                                                    'Session'}
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-slate-500">
                                                                {ex.estimated_time_minutes
                                                                    ? `Durée : ${ex.estimated_time_minutes >= 60 ? `${Math.floor(ex.estimated_time_minutes / 60)}h${ex.estimated_time_minutes % 60 > 0 ? (ex.estimated_time_minutes % 60) + 'min' : ''}` : `${ex.estimated_time_minutes}min`}`
                                                                    : ''}
                                                            </p>
                                                        </div>

                                                        <div className="flex shrink-0 gap-2">
                                                            {ex.pdf_url && (
                                                                <a
                                                                    href={
                                                                        ex.pdf_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1.5 rounded-lg bg-green px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-dark"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                >
                                                                    <FileText className="h-3.5 w-3.5" />
                                                                    Sujet
                                                                </a>
                                                            )}
                                                            {ex.corrige_url && (
                                                                <a
                                                                    href={
                                                                        ex.corrige_url
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1.5 rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-slate-900 hover:bg-amber/90"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                >
                                                                    <Download className="h-3.5 w-3.5" />
                                                                    Corrigé
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </Layout>
    );
}
