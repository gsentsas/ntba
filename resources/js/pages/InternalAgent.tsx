import { useMutation, useQuery } from '@tanstack/react-query';
import {
    BadgeCheck,
    Bot,
    Camera,
    Download,
    FileText,
    GraduationCap,
    Sparkles,
    Target,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import {
    loadAgentMemory,
    rememberAgentHistoryItem,
    rememberAgentSession,
    type AgentMemoryAction,
    type AgentHistoryItem,
} from '@/lib/agentMemory';
import {
    exercisesApi,
    internalAgentApi,
    subjectsApi,
} from '@/services/api';
import { useAppStore } from '@/store';
import type {
    AgentAnswerCorrection,
    AgentPdf,
    AgentPhotoCorrection,
    AgentStudyPack,
} from '@/types';
import { useSearchParams } from 'react-router-dom';

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

function formatAgentProvider(
    provider?: 'anthropic' | 'fallback' | 'internal' | null,
) {
    if (provider === 'anthropic') {
        return 'IA avancée';
    }

    if (provider === 'fallback') {
        return 'Mode secours';
    }

    if (provider === 'internal') {
        return 'Agent interne';
    }

    return null;
}

function formatMemoryType(type: AgentMemoryAction | 'all') {
    if (type === 'study-pack') {
        return 'Fiches';
    }

    if (type === 'answer-correction') {
        return 'Corrections texte';
    }

    if (type === 'photo-correction') {
        return 'Corrections photo';
    }

    return 'Tout';
}

export default function InternalAgent() {
    const { user, setPage, selectedSerie, setSelectedSerie } = useAppStore();
    const [searchParams] = useSearchParams();
    const isAdmin = user?.role === 'admin';
    const activeSerie = isAdmin
        ? selectedSerie || user?.serie_code || 'S2'
        : user?.serie_code || 'S2';

    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
    const [selectedChapterId, setSelectedChapterId] = useState<string>('');
    const [selectedExerciseId, setSelectedExerciseId] = useState<string>('');
    const [answer, setAnswer] = useState('');
    const [studyPack, setStudyPack] = useState<AgentStudyPack | null>(null);
    const [answerCorrection, setAnswerCorrection] =
        useState<AgentAnswerCorrection | null>(null);
    const [photoCorrection, setPhotoCorrection] =
        useState<AgentPhotoCorrection | null>(null);
    const [agentMemory, setAgentMemory] = useState(() => loadAgentMemory());
    const [historyFilter, setHistoryFilter] = useState<
        'all' | AgentMemoryAction
    >('all');
    const fileRef = useRef<HTMLInputElement>(null);
    const autoActionRef = useRef<string | null>(null);
    const restoredSessionRef = useRef(false);
    const skipSubjectResetRef = useRef(false);
    const skipChapterResetRef = useRef(false);
    const actionFromQuery = searchParams.get('action');
    const subjectFromQuery = searchParams.get('subject') ?? '';
    const chapterFromQuery = searchParams.get('chapter') ?? '';
    const exerciseFromQuery = searchParams.get('exercise') ?? '';
    const answerFromQuery = searchParams.get('answer') ?? '';
    const lastSessionForSerie =
        agentMemory.lastSession &&
        (!agentMemory.lastSession.serieCode ||
            agentMemory.lastSession.serieCode === activeSerie)
            ? agentMemory.lastSession
            : null;
    const recentItemsForSerie = agentMemory.recentItems.filter(
        (item) => !item.serieCode || item.serieCode === activeSerie,
    );
    const visibleRecentItems =
        historyFilter === 'all'
            ? recentItemsForSerie
            : recentItemsForSerie.filter((item) => item.type === historyFilter);

    useEffect(() => {
        setPage('internal-agent');
    }, [setPage]);

    useEffect(() => {
        if (subjectFromQuery) {
            setSelectedSubjectId(subjectFromQuery);
        }

        if (answerFromQuery) {
            setAnswer(answerFromQuery);
        }
    }, [answerFromQuery, subjectFromQuery]);

    useEffect(() => {
        if (restoredSessionRef.current) {
            return;
        }

        const hasQueryContext =
            !!subjectFromQuery ||
            !!chapterFromQuery ||
            !!exerciseFromQuery ||
            !!answerFromQuery;

        if (!hasQueryContext && lastSessionForSerie) {
            skipSubjectResetRef.current = true;
            skipChapterResetRef.current = true;
            setSelectedSubjectId(lastSessionForSerie.subjectId);
            setSelectedChapterId(lastSessionForSerie.chapterId);
            setSelectedExerciseId(lastSessionForSerie.exerciseId);
            setAnswer(lastSessionForSerie.answerDraft);
        }

        restoredSessionRef.current = true;
    }, [
        answerFromQuery,
        chapterFromQuery,
        exerciseFromQuery,
        lastSessionForSerie,
        subjectFromQuery,
    ]);

    const { data: series = [] } = useQuery({
        queryKey: ['subject-series'],
        queryFn: subjectsApi.series,
    });

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', activeSerie, 'internal-agent'],
        queryFn: () => subjectsApi.list(activeSerie || undefined),
        enabled: !!user,
    });

    const { data: chapters = [] } = useQuery({
        queryKey: ['internal-agent-chapters', selectedSubjectId],
        queryFn: () => subjectsApi.chapters(selectedSubjectId),
        enabled: !!selectedSubjectId,
    });

    const { data: exercises = [] } = useQuery({
        queryKey: [
            'internal-agent-exercises',
            activeSerie,
            selectedSubjectId,
            selectedChapterId,
        ],
        queryFn: () =>
            exercisesApi.list({
                limit: 20,
                shuffle: false,
                serie_code: activeSerie,
                subject_id: selectedSubjectId || undefined,
                chapter_id: selectedChapterId || undefined,
                is_annale: false,
            }),
        enabled: !!selectedSubjectId,
    });

    const { data: context, isLoading: loadingContext } = useQuery({
        queryKey: [
            'internal-agent-context',
            activeSerie,
            selectedSubjectId,
            selectedChapterId,
        ],
        queryFn: () =>
            internalAgentApi.context({
                serie_code: activeSerie,
                subject_id: selectedSubjectId || undefined,
                chapter_id: selectedChapterId || undefined,
            }),
        enabled: !!user,
    });

    useEffect(() => {
        if (skipSubjectResetRef.current) {
            skipSubjectResetRef.current = false;
            return;
        }

        setSelectedChapterId('');
        setSelectedExerciseId('');
        setStudyPack(null);
        setAnswerCorrection(null);
        setPhotoCorrection(null);
    }, [selectedSubjectId]);

    useEffect(() => {
        if (skipChapterResetRef.current) {
            skipChapterResetRef.current = false;
            return;
        }

        setSelectedExerciseId('');
        setStudyPack(null);
        setAnswerCorrection(null);
    }, [selectedChapterId]);

    useEffect(() => {
        if (!restoredSessionRef.current) {
            return;
        }

        const nextState = rememberAgentSession({
            serieCode: activeSerie,
            subjectId: selectedSubjectId,
            chapterId: selectedChapterId,
            exerciseId: selectedExerciseId,
            answerDraft: answer,
        });
        setAgentMemory(nextState);
    }, [activeSerie, answer, selectedChapterId, selectedExerciseId, selectedSubjectId]);

    useEffect(() => {
        if (
            chapterFromQuery &&
            chapters.some((chapter) => chapter.id === chapterFromQuery)
        ) {
            setSelectedChapterId(chapterFromQuery);
        }
    }, [chapterFromQuery, chapters]);

    useEffect(() => {
        if (
            exerciseFromQuery &&
            exercises.some((exercise) => exercise.id === exerciseFromQuery)
        ) {
            setSelectedExerciseId(exerciseFromQuery);
        }
    }, [exerciseFromQuery, exercises]);

    const packMutation = useMutation({
        mutationFn: () =>
            internalAgentApi.studyPack({
                serie_code: activeSerie,
                subject_id: selectedSubjectId || undefined,
                chapter_id: selectedChapterId || undefined,
                include_pdf: true,
            }),
        onSuccess: (result) => {
            setStudyPack(result);
            setAgentMemory(
                rememberAgentHistoryItem({
                    type: 'study-pack',
                    title: result.target.chapter.title,
                    subtitle: `Fiche + exercice pour ${result.target.subject.name}`,
                    provider: result.summary_provider,
                    serieCode: activeSerie,
                    subjectId: result.target.subject.id,
                    chapterId: result.target.chapter.id,
                    pdf: result.pdf ?? undefined,
                }),
            );
            toast.success('Pack de révision généré');
        },
        onError: (error: Error) => toast.error(error.message),
    });

    const correctionMutation = useMutation({
        mutationFn: () =>
            internalAgentApi.correctAnswer({
                exercise_id: selectedExerciseId,
                answer,
                serie_code: activeSerie,
                include_pdf: true,
            }),
        onSuccess: (result) => {
            setAnswerCorrection(result);
            setAgentMemory(
                rememberAgentHistoryItem({
                    type: 'answer-correction',
                    title: result.exercise.title,
                    subtitle: result.verdict,
                    provider: 'internal',
                    serieCode: activeSerie,
                    subjectId: result.exercise.subject_id,
                    chapterId: result.exercise.chapter_id,
                    exerciseId: result.exercise.id,
                    pdf: result.pdf ?? undefined,
                }),
            );
            toast.success('Correction générée');
        },
        onError: (error: Error) => toast.error(error.message),
    });

    const photoMutation = useMutation({
        mutationFn: async (file: File) => {
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (event) => {
                    const result = event.target?.result as string | undefined;

                    if (!result?.includes(',')) {
                        reject(new Error("Impossible de lire l'image"));
                        return;
                    }

                    resolve(result.split(',')[1]);
                };

                reader.onerror = () =>
                    reject(
                        new Error(
                            "Erreur lors de la lecture de l'image",
                        ),
                    );

                reader.readAsDataURL(file);
            });

            return internalAgentApi.correctPhotoReport({
                image_base64: base64,
                media_type: file.type,
                subject_id: selectedSubjectId || undefined,
                serie_code: activeSerie,
                include_pdf: true,
            });
        },
        onSuccess: (result) => {
            setPhotoCorrection(result);
            setAgentMemory(
                rememberAgentHistoryItem({
                    type: 'photo-correction',
                    title: result.subject?.name ?? 'Correction photo',
                    subtitle: `Note estimée ${result.note_estimee}/20`,
                    provider: result.provider,
                    serieCode: activeSerie,
                    subjectId: result.subject?.id,
                    pdf: result.pdf ?? undefined,
                }),
            );
            toast.success('Correction photo générée');
        },
        onError: (error: Error) => toast.error(error.message),
    });

    function handlePhotoSelection(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        photoMutation.mutate(file);

        if (fileRef.current) {
            fileRef.current.value = '';
        }
    }

    const selectedExercise =
        exercises.find((exercise) => exercise.id === selectedExerciseId) ?? null;

    useEffect(() => {
        const autoKey = [
            actionFromQuery,
            activeSerie,
            selectedSubjectId,
            selectedChapterId,
            selectedExerciseId,
            answer,
        ].join(':');

        if (autoActionRef.current === autoKey) {
            return;
        }

        if (
            actionFromQuery === 'study-pack' &&
            !packMutation.isPending &&
            (selectedSubjectId || context?.target.subject?.id)
        ) {
            autoActionRef.current = autoKey;
            packMutation.mutate();
            return;
        }

        if (
            actionFromQuery === 'correct-answer' &&
            selectedExerciseId &&
            answer.trim() &&
            !correctionMutation.isPending
        ) {
            autoActionRef.current = autoKey;
            correctionMutation.mutate();
        }
    }, [
        actionFromQuery,
        activeSerie,
        answer,
        context?.target.subject?.id,
        correctionMutation,
        packMutation,
        selectedChapterId,
        selectedExerciseId,
        selectedSubjectId,
    ]);

    function restoreHistoryItem(item: AgentHistoryItem) {
        skipSubjectResetRef.current = true;
        skipChapterResetRef.current = true;
        setSelectedSubjectId(item.subjectId ?? '');
        setSelectedChapterId(item.chapterId ?? '');
        setSelectedExerciseId(item.exerciseId ?? '');
        setStudyPack(null);
        setAnswerCorrection(null);
        setPhotoCorrection(null);
        toast.success('Contexte de l’agent rechargé');
    }

    const hasSessionToResume =
        !!lastSessionForSerie &&
        Boolean(
            lastSessionForSerie.subjectId ||
                lastSessionForSerie.chapterId ||
                lastSessionForSerie.exerciseId ||
                lastSessionForSerie.answerDraft,
        );

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
                            <span className="flex size-11 items-center justify-center rounded-2xl bg-green text-white shadow-sm">
                                <Bot className="size-5" />
                            </span>
                            Agent Interne
                        </h1>
                        <p className="mt-2 max-w-3xl text-sm text-slate-500">
                            Un assistant pédagogique du site pour lire ton
                            contexte, préparer un pack de révision, corriger une
                            réponse et générer des PDF utiles pour le BAC.
                        </p>
                        {actionFromQuery ? (
                            <p className="mt-2 text-xs font-medium text-green-dark">
                                Contexte importé automatiquement depuis ton
                                parcours de révision.
                            </p>
                        ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="border-0 bg-slate-900 text-white">
                            Série {activeSerie}
                        </Badge>
                        {!isAdmin && user?.serie_code ? (
                            <Badge className="border-0 bg-green-light text-green-dark">
                                Série élève {user.serie_code}
                            </Badge>
                        ) : null}
                        {isAdmin ? (
                            <select
                                value={activeSerie}
                                onChange={(event) =>
                                    setSelectedSerie(event.target.value)
                                }
                                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-green focus:outline-none"
                            >
                                {series.map((serie) => (
                                    <option key={serie} value={serie}>
                                        {serie}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Préparer la session</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Matière
                                    </label>
                                    <select
                                        value={selectedSubjectId}
                                        onChange={(event) =>
                                            setSelectedSubjectId(
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-green focus:outline-none"
                                    >
                                        <option value="">
                                            Priorité automatique
                                        </option>
                                        {subjects.map((subject) => (
                                            <option
                                                key={subject.id}
                                                value={subject.id}
                                            >
                                                {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Chapitre
                                    </label>
                                    <select
                                        value={selectedChapterId}
                                        onChange={(event) =>
                                            setSelectedChapterId(
                                                event.target.value,
                                            )
                                        }
                                        disabled={!selectedSubjectId}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-green focus:outline-none disabled:bg-slate-50"
                                    >
                                        <option value="">
                                            Choix automatique
                                        </option>
                                        {chapters.map((chapter) => (
                                            <option
                                                key={chapter.id}
                                                value={chapter.id}
                                            >
                                                {chapter.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Exercice à corriger
                                    </label>
                                    <select
                                        value={selectedExerciseId}
                                        onChange={(event) =>
                                            setSelectedExerciseId(
                                                event.target.value,
                                            )
                                        }
                                        disabled={!selectedSubjectId}
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-green focus:outline-none disabled:bg-slate-50"
                                    >
                                        <option value="">
                                            Choisir un exercice
                                        </option>
                                        {exercises.map((exercise) => (
                                            <option
                                                key={exercise.id}
                                                value={exercise.id}
                                            >
                                                {exercise.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="size-5 text-green" />
                                    Contexte de révision
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {loadingContext ? (
                                    <div className="flex justify-center py-10">
                                        <Spinner className="h-6 w-6 text-green" />
                                    </div>
                                ) : context ? (
                                    <div className="space-y-5">
                                        <div className="rounded-2xl border border-green/20 bg-green-xlight p-4">
                                            <p className="text-sm font-semibold text-green-dark">
                                                Recommandation prioritaire
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-700">
                                                {context.recommendation}
                                            </p>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">
                                                    Matière cible
                                                </p>
                                                <p className="mt-2 text-lg font-semibold text-slate-900">
                                                    {context.target.subject.name}
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Chapitre: {context.target.chapter.title}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">
                                                    Faiblesses suivies
                                                </p>
                                                <div className="mt-2 space-y-2">
                                                    {context.weak_subjects.map(
                                                        (subject) => (
                                                            <div
                                                                key={subject.id}
                                                                className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm"
                                                            >
                                                                <span className="font-medium text-slate-700">
                                                                    {subject.name}
                                                                </span>
                                                                <span className="text-slate-400">
                                                                    {subject.simulated_grade.toFixed(
                                                                        1,
                                                                    )}
                                                                    /20
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                Tâches du jour
                                            </p>
                                            <div className="mt-2 space-y-2">
                                                {context.today_tasks.length > 0 ? (
                                                    context.today_tasks.map(
                                                        (task) => (
                                                            <div
                                                                key={task.id}
                                                                className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm"
                                                            >
                                                                <div>
                                                                    <p className="font-medium text-slate-700">
                                                                        {task.title}
                                                                    </p>
                                                                    <p className="text-xs text-slate-400">
                                                                        {task.estimated_minutes}{' '}
                                                                        min
                                                                    </p>
                                                                </div>
                                                                {task.is_completed ? (
                                                                    <Badge className="border-0 bg-green-light text-green-dark">
                                                                        Fait
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge className="border-0 bg-slate-100 text-slate-500">
                                                                        À faire
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        ),
                                                    )
                                                ) : (
                                                    <p className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-500">
                                                        Aucune tâche programmée
                                                        aujourd’hui.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Mémoire pratique</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Reprendre ma dernière session
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">
                                        L’agent mémorise la dernière matière, le
                                        dernier chapitre et le dernier brouillon
                                        de réponse sur cet appareil.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={!hasSessionToResume}
                                        onClick={() => {
                                            if (!lastSessionForSerie) {
                                                return;
                                            }

                                            skipSubjectResetRef.current = true;
                                            skipChapterResetRef.current = true;
                                            setSelectedSubjectId(
                                                lastSessionForSerie.subjectId,
                                            );
                                            setSelectedChapterId(
                                                lastSessionForSerie.chapterId,
                                            );
                                            setSelectedExerciseId(
                                                lastSessionForSerie.exerciseId,
                                            );
                                            setAnswer(lastSessionForSerie.answerDraft);
                                            setStudyPack(null);
                                            setAnswerCorrection(null);
                                            setPhotoCorrection(null);
                                            toast.success(
                                                'Dernière session restaurée',
                                            );
                                        }}
                                        className="mt-3 rounded-xl"
                                    >
                                        Reprendre
                                    </Button>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        Dernières fiches et corrections
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {(
                                            [
                                                'all',
                                                'study-pack',
                                                'answer-correction',
                                                'photo-correction',
                                            ] as const
                                        ).map((filter) => (
                                            <button
                                                key={filter}
                                                type="button"
                                                onClick={() =>
                                                    setHistoryFilter(filter)
                                                }
                                                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                                    historyFilter === filter
                                                        ? 'bg-green text-white'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-green-light hover:text-green-dark'
                                                }`}
                                            >
                                                {formatMemoryType(filter)}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="mt-3 space-y-2">
                                        {visibleRecentItems.length > 0 ? (
                                            visibleRecentItems.map(
                                                (item) => (
                                                    <div
                                                        key={item.id}
                                                        className="rounded-2xl border border-slate-200 bg-white p-3"
                                                    >
                                                        <div className="flex items-start justify-between gap-3">
                                                            <div>
                                                                <p className="text-sm font-semibold text-slate-900">
                                                                    {item.title}
                                                                </p>
                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    {
                                                                        item.subtitle
                                                                    }
                                                                </p>
                                                                <p className="mt-1 text-[11px] text-slate-400">
                                                                    {new Date(
                                                                        item.createdAt,
                                                                    ).toLocaleString(
                                                                        'fr-SN',
                                                                    )}
                                                                </p>
                                                                {formatAgentProvider(
                                                                    item.provider,
                                                                ) ? (
                                                                    <p className="mt-1 text-[11px] font-medium text-green-dark">
                                                                        {
                                                                            formatAgentProvider(
                                                                                item.provider,
                                                                            )
                                                                        }
                                                                    </p>
                                                                ) : null}
                                                            </div>
                                                            <div className="flex flex-col gap-2">
                                                                <Button
                                                                    type="button"
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        restoreHistoryItem(
                                                                            item,
                                                                        )
                                                                    }
                                                                >
                                                                    Recharger
                                                                </Button>
                                                                {item.pdf ? (
                                                                    <Button
                                                                        type="button"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            downloadPdf(
                                                                                item.pdf!,
                                                                            )
                                                                        }
                                                                        className="bg-green text-white hover:bg-green-dark"
                                                                    >
                                                                        <Download className="mr-1.5 size-3.5" />
                                                                        Télécharger à nouveau
                                                                    </Button>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )
                                        ) : (
                                            <p className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-sm text-slate-500">
                                                Aucun document mémorisé pour le
                                                filtre {formatMemoryType(historyFilter).toLowerCase()}.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Actions de l’agent</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    onClick={() => packMutation.mutate()}
                                    disabled={packMutation.isPending}
                                    className="w-full bg-green text-white hover:bg-green-dark"
                                >
                                    {packMutation.isPending ? (
                                        <Spinner className="h-4 w-4" />
                                    ) : (
                                        <Sparkles className="h-4 w-4" />
                                    )}
                                    Générer mon pack de révision
                                </Button>

                                <textarea
                                    value={answer}
                                    onChange={(event) =>
                                        setAnswer(event.target.value)
                                    }
                                    rows={5}
                                    placeholder={
                                        selectedExercise
                                            ? `Rédige ta réponse pour "${selectedExercise.title}"…`
                                            : 'Choisis un exercice puis colle la réponse de l’élève…'
                                    }
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-green focus:bg-white focus:outline-none"
                                />

                                <Button
                                    variant="outline"
                                    onClick={() => correctionMutation.mutate()}
                                    disabled={
                                        correctionMutation.isPending ||
                                        !selectedExerciseId ||
                                        !answer.trim()
                                    }
                                    className="w-full border-green/30 text-green hover:bg-green-xlight"
                                >
                                    {correctionMutation.isPending ? (
                                        <Spinner className="h-4 w-4" />
                                    ) : (
                                        <BadgeCheck className="h-4 w-4" />
                                    )}
                                    Corriger cette réponse
                                </Button>

                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoSelection}
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => fileRef.current?.click()}
                                    disabled={photoMutation.isPending}
                                    className="w-full border-slate-200"
                                >
                                    {photoMutation.isPending ? (
                                        <Spinner className="h-4 w-4" />
                                    ) : (
                                        <Camera className="h-4 w-4" />
                                    )}
                                    Corriger une photo et créer le PDF
                                </Button>
                            </CardContent>
                        </Card>

                        {studyPack ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <GraduationCap className="size-5 text-green" />
                                            Pack de révision
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                className={`border-0 ${
                                                    studyPack.summary_provider ===
                                                    'anthropic'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                {studyPack.summary_provider ===
                                                'anthropic'
                                                    ? 'Mode IA avancé'
                                                    : 'Mode secours'}
                                            </Badge>
                                            {studyPack.pdf ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        downloadPdf(
                                                            studyPack.pdf!,
                                                        )
                                                    }
                                                >
                                                    <Download className="h-4 w-4" />
                                                    PDF
                                                </Button>
                                            ) : null}
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-slate-600">
                                        {studyPack.recommendation}
                                    </p>
                                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {studyPack.target.subject.name} ·{' '}
                                            {studyPack.target.chapter.title}
                                        </p>
                                    </div>
                                    <div className="prose prose-sm max-w-none text-slate-700">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {studyPack.summary}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="rounded-2xl border border-green/20 bg-green-xlight p-4">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Exercice conseillé
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-slate-700">
                                            {studyPack.exercise.title}
                                        </p>
                                        <p className="mt-2 text-sm text-slate-600">
                                            {studyPack.exercise.question_text}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        {answerCorrection ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span>Correction de réponse</span>
                                        {answerCorrection.pdf ? (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    downloadPdf(
                                                        answerCorrection.pdf!,
                                                    )
                                                }
                                            >
                                                <Download className="h-4 w-4" />
                                                PDF
                                            </Button>
                                        ) : null}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Badge
                                        className={`border-0 ${
                                            answerCorrection.is_correct
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                        }`}
                                    >
                                        {answerCorrection.verdict}
                                    </Badge>
                                    <p className="text-sm text-slate-700">
                                        {answerCorrection.feedback}
                                    </p>
                                    <div className="space-y-2">
                                        {answerCorrection.next_steps.map(
                                            (step) => (
                                                <div
                                                    key={step}
                                                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                                                >
                                                    {step}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}

                        {photoCorrection ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <FileText className="size-5 text-green" />
                                            Correction photo
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                className={`border-0 ${
                                                    photoCorrection.provider ===
                                                    'anthropic'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}
                                            >
                                                {photoCorrection.provider ===
                                                'anthropic'
                                                    ? 'Mode IA avancé'
                                                    : 'Mode secours'}
                                            </Badge>
                                            {photoCorrection.pdf ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        downloadPdf(
                                                            photoCorrection.pdf!,
                                                        )
                                                    }
                                                >
                                                    <Download className="h-4 w-4" />
                                                    PDF
                                                </Button>
                                            ) : null}
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm font-semibold text-slate-900">
                                        Note estimée:{' '}
                                        {photoCorrection.note_estimee}/20
                                    </p>
                                    <div className="prose prose-sm max-w-none text-slate-700">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {photoCorrection.correction}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="space-y-2">
                                        {photoCorrection.points_a_retravailler.map(
                                            (point) => (
                                                <div
                                                    key={point}
                                                    className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                                                >
                                                    {point}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : null}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
