import { useQueries, useQuery } from '@tanstack/react-query';
import { Bot, ChevronLeft, FileText, ListChecks } from 'lucide-react';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link, useParams } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
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

    const chapterDetailsQueries = useQueries({
        queries:
            chaptersQuery.data?.map((chapter) => ({
                queryKey: ['chapter', chapter.id],
                queryFn: () => subjectsApi.chapter(chapter.id),
            })) ?? [],
    });

    const exerciseQueries = useQueries({
        queries:
            chaptersQuery.data?.slice(0, 3).map((chapter) => ({
                queryKey: ['exercises', chapter.id],
                queryFn: () =>
                    exercisesApi.list({
                        chapter_id: chapter.id,
                        limit: 3,
                        shuffle: false,
                    }),
            })) ?? [],
    });

    const chapterDetails = chapterDetailsQueries.flatMap((query) =>
        query.data ? [query.data] : [],
    );

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
                        <p className="text-sm font-semibold tracking-[0.16em] text-green-dark uppercase">
                            Matière
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold text-slate-950">
                            {subjectQuery.data?.name ?? 'Chargement...'}
                        </h1>
                        {subjectQuery.data?.serie_code ? (
                            <div className="mt-3">
                                <Badge className="border-0 bg-slate-900 text-white">
                                    Série {subjectQuery.data.serie_code}
                                </Badge>
                            </div>
                        ) : null}
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                            {subjectQuery.data?.description}
                        </p>
                    </CardContent>
                </Card>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4">
                        {chapterDetails.map((chapter) => (
                            <Card
                                key={chapter.id}
                                className="border-white/70 bg-white/90"
                            >
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <FileText className="size-4" />
                                        <span>
                                            Chapitre {chapter.order_index}
                                        </span>
                                    </div>
                                    <CardTitle className="text-2xl text-slate-950">
                                        {chapter.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm leading-7 text-slate-600">
                                        {chapter.summary ??
                                            'Cours complet disponible ci-dessous.'}
                                    </p>

                                    {chapter.key_formulas?.length ? (
                                        <div className="rounded-2xl bg-bac-bg p-4">
                                            <p className="text-xs font-semibold tracking-[0.16em] text-green-dark uppercase">
                                                Formules clés
                                            </p>
                                            <ul className="mt-3 space-y-2 text-sm text-slate-700">
                                                {chapter.key_formulas.map(
                                                    (formula) => (
                                                        <li key={formula}>
                                                            {formula}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    ) : null}

                                    {chapter.course_content ? (
                                        <div className="rounded-3xl border border-slate-200 bg-white p-5">
                                            <div className="bac-course-content text-sm leading-7 text-slate-700">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                >
                                                    {chapter.course_content}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm leading-7 text-slate-500">
                                            Le cours complet de ce chapitre n'a
                                            pas encore été renseigné.
                                        </p>
                                    )}
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
                            {subjectQuery.data?.id ? (
                                <div className="grid gap-3 md:grid-cols-3">
                                    <Link
                                        to={`/quiz?subject=${subjectQuery.data.id}`}
                                    >
                                        <Button className="w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                            Quiz de cette matière
                                        </Button>
                                    </Link>
                                    <Link
                                        to={`/annales?subject=${subjectQuery.data.id}`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-2xl"
                                        >
                                            Annales de cette matière
                                        </Button>
                                    </Link>
                                    <Link
                                        to={`/internal-agent?subject=${subjectQuery.data.id}&action=study-pack`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-2xl"
                                        >
                                            <Bot className="size-4" />
                                            Agent de la matière
                                        </Button>
                                    </Link>
                                </div>
                            ) : null}

                            {exerciseQueries
                                .flatMap((query) => query.data ?? [])
                                .slice(0, 8)
                                .map((exercise) => (
                                    <div
                                        key={exercise.id}
                                        className="rounded-2xl border border-slate-200 p-4"
                                    >
                                        {exercise.serie_code ? (
                                            <div className="mb-2">
                                                <Badge className="border-0 bg-slate-100 text-slate-700">
                                                    {exercise.serie_code}
                                                </Badge>
                                            </div>
                                        ) : null}
                                        <p className="text-sm font-semibold text-slate-950">
                                            {exercise.title}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {exercise.question_text}
                                        </p>
                                        <div className="mt-3">
                                            <Link
                                                to={`/internal-agent?subject=${exercise.subject_id}&chapter=${exercise.chapter_id}&exercise=${exercise.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-xl"
                                                >
                                                    Corriger avec l’agent
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                            {chapterDetails[0] ? (
                                <Link
                                    to={`/internal-agent?subject=${chapterDetails[0].subject_id}&chapter=${chapterDetails[0].id}&action=study-pack`}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-2xl border-green/30 text-green"
                                    >
                                        <Bot className="size-4" />
                                        Créer ma fiche PDF sur ce chapitre
                                    </Button>
                                </Link>
                            ) : null}

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
