import { useQueries, useQuery } from '@tanstack/react-query';
import { ChevronLeft, FileText, ListChecks } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { exercisesApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';

export default function ChapterDetail() {
    const { id } = useParams<{ id: string }>();
    const setPage = useAppStore((state) => state.setPage);

    useEffect(() => {
        setPage('subjects');
    }, [setPage]);

    const subjectQuery = useQuery({
        queryKey: ['subject', id],
        queryFn: () => subjectsApi.get(id ?? ''),
        enabled: Boolean(id),
    });

    const chaptersQuery = useQuery({
        queryKey: ['subject', id, 'chapters'],
        queryFn: () => subjectsApi.chapters(id ?? ''),
        enabled: Boolean(id),
    });

    const exerciseQueries = useQueries({
        queries:
            chaptersQuery.data?.slice(0, 3).map((chapter) => ({
                queryKey: ['exercises', chapter.id],
                queryFn: () => exercisesApi.list({ chapter_id: chapter.id, limit: 3, shuffle: false }),
            })) ?? [],
    });

    return (
        <Layout>
            <section className="space-y-6">
                <Link
                    to="/subjects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-green-dark"
                >
                    <ChevronLeft className="size-4" />
                    Retour aux matières
                </Link>

                <Card className="border-white/70 bg-white/90">
                    <CardContent className="px-6 py-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-dark">
                            Matière
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold text-slate-950">
                            {subjectQuery.data?.name ?? 'Chargement...'}
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                            {subjectQuery.data?.description}
                        </p>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        {(chaptersQuery.data ?? []).map((chapter) => (
                            <Card key={chapter.id} className="border-white/70 bg-white/90">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <FileText className="size-4" />
                                        <span>Chapitre {chapter.order_index}</span>
                                    </div>
                                    <CardTitle className="text-2xl text-slate-950">
                                        {chapter.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm leading-7 text-slate-600">
                                        {chapter.summary ?? chapter.course_content ?? 'Cours à détailler dans les prochaines étapes.'}
                                    </p>

                                    {chapter.key_formulas?.length ? (
                                        <div className="rounded-2xl bg-bac-bg p-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-dark">
                                                Formules clés
                                            </p>
                                            <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                                {chapter.key_formulas.map((formula) => (
                                                    <li key={formula}>{formula}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : null}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="border-white/70 bg-white/90">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <ListChecks className="size-4" />
                                <span>Exercices du chapitre</span>
                            </div>
                            <CardTitle className="text-2xl text-slate-950">
                                Première sélection
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {exerciseQueries.flatMap((query) => query.data ?? []).slice(0, 8).map((exercise) => (
                                <div key={exercise.id} className="rounded-2xl border border-slate-200 p-4">
                                    <p className="text-sm font-semibold text-slate-950">{exercise.title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {exercise.question_text}
                                    </p>
                                </div>
                            ))}

                            <Link to="/dashboard">
                                <Button className="mt-2 w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                    Revenir au dashboard
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
}
