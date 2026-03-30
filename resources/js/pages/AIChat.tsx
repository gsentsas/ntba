import { useQuery } from '@tanstack/react-query';
import {
    Bot,
    CheckCircle2,
    BookOpenText,
    Camera,
    Download,
    FileText,
    GraduationCap,
    RotateCcw,
    Send,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { ChatMessage } from '@/components/ChatMessage';
import { Layout } from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useAIChat } from '@/hooks/useAIChat';
import {
    loadAgentMemory,
    rememberAgentHistoryItem,
    rememberAgentSession,
} from '@/lib/agentMemory';
import { exercisesApi, internalAgentApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { AgentPdf } from '@/types';

const QUICK_ACTIONS = [
    {
        label: 'Explique ce chapitre',
        value: 'Explique-moi les notions essentielles de ce chapitre de façon claire.',
    },
    { label: 'Génère un exercice', value: 'exercise' as const },
    { label: 'Fiche de révision', value: 'summary' as const },
    {
        label: 'Erreurs classiques',
        value: 'Quelles sont les erreurs classiques des élèves au BAC sur ce chapitre ?',
    },
    { label: 'Interrogation orale', value: 'oral' as const },
];

type AgentDocument = {
    title: string;
    description: string;
    provider: 'anthropic' | 'fallback' | null;
    pdf: AgentPdf;
};

const GENERAL_STARTERS = [
    {
        title: 'Révision ciblée',
        description:
            'Demande une explication simple, une méthode ou un point difficile du programme.',
        prompt: 'Aide-moi à revoir le point le plus important de ma matière.',
        icon: GraduationCap,
    },
    {
        title: 'Méthode BAC',
        description:
            'Travaille la démarche attendue et les erreurs classiques dans une copie.',
        prompt: 'Montre-moi la bonne méthode BAC sur un exercice classique.',
        icon: BookOpenText,
    },
];

function getSubjectStarters(subjectName?: string | null) {
    const label = subjectName ?? 'ta matière';

    return [
        `Explique-moi le point le plus difficile de ${label} avec un exemple simple.`,
        `Prépare-moi 3 questions type BAC sur ${label} avec les réponses attendues.`,
        `Donne-moi une mini méthode pour éviter les erreurs classiques en ${label}.`,
    ];
}

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
    subjectId?: string | null;
    chapterId?: string | null;
    exerciseId?: string | null;
    answerDraft?: string | null;
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

export default function AIChat() {
    const {
        user,
        setActiveChatSubject,
        activeChatSubjectId,
        setPage,
        selectedSerie,
        setSelectedSerie,
    } = useAppStore();
    const isAdmin = user?.role === 'admin';
    const activeSerie = isAdmin ? selectedSerie : user?.serie_code ?? '';
    const {
        messages,
        isLoading,
        provider,
        sendMessage,
        sendQuickQuestion,
        pushAssistantMessage,
        clearChat,
        generateAndAsk,
    } = useAIChat();

    const [input, setInput] = useState('');
    const [photoLoading, setPhotoLoading] = useState(false);
    const [packLoading, setPackLoading] = useState(false);
    const [answerCorrectionLoading, setAnswerCorrectionLoading] =
        useState(false);
    const [selectedChapterId, setSelectedChapterId] = useState('');
    const [selectedExerciseId, setSelectedExerciseId] = useState('');
    const [answerDraft, setAnswerDraft] = useState('');
    const [agentDocument, setAgentDocument] = useState<AgentDocument | null>(
        null,
    );
    const fileRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { data: series = [] } = useQuery({
        queryKey: ['subject-series'],
        queryFn: subjectsApi.series,
    });

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', activeSerie],
        queryFn: () => subjectsApi.list(activeSerie || undefined),
        enabled: !!user,
    });
    const activeSubject =
        subjects.find((subject) => subject.id === activeChatSubjectId) ?? null;
    const { data: chapters = [] } = useQuery({
        queryKey: ['subject-chapters', activeChatSubjectId],
        queryFn: () => subjectsApi.chapters(activeChatSubjectId!),
        enabled: !!activeChatSubjectId,
    });
    const activeChapter =
        chapters.find((chapter) => chapter.id === selectedChapterId) ?? null;
    const { data: exercises = [] } = useQuery({
        queryKey: [
            'ai-chat-exercises',
            activeSerie,
            activeChatSubjectId,
            selectedChapterId,
        ],
        queryFn: () =>
            exercisesApi.list({
                serie_code: activeSerie || undefined,
                subject_id: activeChatSubjectId || undefined,
                chapter_id: selectedChapterId || undefined,
                limit: 20,
                shuffle: false,
            }),
        enabled: !!activeChatSubjectId,
    });
    const selectedExercise =
        exercises.find((exercise) => exercise.id === selectedExerciseId) ?? null;
    const agentMemory = loadAgentMemory();
    const lastSessionForSerie =
        agentMemory.lastSession &&
        (!agentMemory.lastSession.serieCode ||
            agentMemory.lastSession.serieCode === activeSerie)
            ? agentMemory.lastSession
            : null;
    const recentAgentItems = agentMemory.recentItems
        .filter((item) => !item.serieCode || item.serieCode === activeSerie)
        .slice(0, 2);

    useEffect(() => {
        setPage('ai-chat');
    }, [setPage]);

    useEffect(() => {
        if (
            activeChatSubjectId &&
            !subjects.some((subject) => subject.id === activeChatSubjectId)
        ) {
            setActiveChatSubject(null);
        }
    }, [activeChatSubjectId, setActiveChatSubject, subjects]);

    useEffect(() => {
        setSelectedChapterId('');
        setSelectedExerciseId('');
        setAnswerDraft('');
        setAgentDocument(null);
    }, [activeChatSubjectId]);

    useEffect(() => {
        if (
            selectedChapterId &&
            !chapters.some((chapter) => chapter.id === selectedChapterId)
        ) {
            setSelectedChapterId('');
        }
    }, [chapters, selectedChapterId]);

    useEffect(() => {
        setSelectedExerciseId('');
        setAnswerDraft('');
    }, [selectedChapterId]);

    useEffect(() => {
        if (
            !activeChatSubjectId &&
            !selectedChapterId &&
            !selectedExerciseId &&
            !answerDraft.trim()
        ) {
            return;
        }

        rememberAgentSession({
            serieCode: activeSerie,
            subjectId: activeChatSubjectId ?? '',
            chapterId: selectedChapterId,
            exerciseId: selectedExerciseId,
            answerDraft,
        });
    }, [
        activeChatSubjectId,
        activeSerie,
        answerDraft,
        selectedChapterId,
        selectedExerciseId,
    ]);

    // Auto-scroll vers le bas à chaque nouveau message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function handleSend() {
        if (!input.trim() || isLoading) {
            return;
        }

        const text = input.trim();
        setInput('');
        sendMessage(text, selectedChapterId || undefined);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    function handleQuickAction(
        value: string | 'exercise' | 'summary' | 'oral',
    ) {
        if (value === 'exercise' || value === 'summary' || value === 'oral') {
            generateAndAsk(value, {
                subjectId: activeSubject?.id ?? null,
                subjectName: activeSubject?.name ?? null,
                chapterId: activeChapter?.id ?? null,
                chapterTitle: activeChapter?.title ?? null,
            });
        } else {
            const contextualPrompt = activeSubject
                ? `${value}\n\nContexte: matière ${activeSubject.name}.${activeChapter ? ` Chapitre ${activeChapter.title}.` : ''}`
                : value;
            sendQuickQuestion(contextualPrompt);
        }
    }

    async function handleStudyPack() {
        if (!activeSubject?.id) {
            toast.error("Choisis d'abord une matière pour créer un pack PDF");

            return;
        }

        setPackLoading(true);

        try {
            const result = await internalAgentApi.studyPack({
                subject_id: activeSubject.id,
                chapter_id: activeChapter?.id ?? undefined,
                serie_code: activeSerie,
                include_pdf: true,
            });

            pushAssistantMessage(
                `**Pack de révision prêt**${activeChapter ? ` — ${activeChapter.title}` : ` — ${activeSubject.name}`}\n\n${result.summary}\n\n**Exercice conseillé :** ${result.exercise.title}\n\nLe PDF est disponible juste au-dessus de la conversation.`,
                result.summary_provider ?? null,
            );
            rememberAgentHistoryItem({
                type: 'study-pack',
                title: result.target.chapter.title,
                subtitle: `Fiche + exercice pour ${result.target.subject.name}`,
                provider: result.summary_provider ?? null,
                serieCode: activeSerie,
                subjectId: result.target.subject.id,
                chapterId: result.target.chapter.id,
                pdf: result.pdf ?? undefined,
            });

            if (result.pdf) {
                setAgentDocument({
                    title: `Pack PDF${activeChapter ? ` · ${activeChapter.title}` : ` · ${activeSubject.name}`}`,
                    description:
                        'Fiche, exercice conseillé et synthèse téléchargeables depuis le tuteur.',
                    provider: result.summary_provider ?? null,
                    pdf: result.pdf,
                });
            }

            toast.success('Pack PDF généré');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Impossible de générer le pack PDF',
            );
        } finally {
            setPackLoading(false);
        }
    }

    async function handleAnswerCorrection() {
        if (!selectedExerciseId || !answerDraft.trim()) {
            toast.error("Choisis un exercice et saisis d'abord ta réponse");

            return;
        }

        setAnswerCorrectionLoading(true);

        try {
            const result = await internalAgentApi.correctAnswer({
                exercise_id: selectedExerciseId,
                answer: answerDraft,
                serie_code: activeSerie,
                include_pdf: true,
            });

            pushAssistantMessage(
                `**Correction de réponse**${selectedExercise ? ` — ${selectedExercise.title}` : ''}\n\n**Verdict :** ${result.verdict}\n\n${result.feedback}\n\n**Étapes suivantes :**\n${result.next_steps.map((step) => `- ${step}`).join('\n')}`,
                null,
            );
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
            });

            if (result.pdf) {
                setAgentDocument({
                    title: `Correction PDF${selectedExercise ? ` · ${selectedExercise.title}` : ''}`,
                    description:
                        'Rapport de correction texte généré par l’agent interne depuis le tuteur.',
                    provider: null,
                    pdf: result.pdf,
                });
            }

            toast.success('Correction de réponse générée');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Impossible de corriger cette réponse',
            );
        } finally {
            setAnswerCorrectionLoading(false);
        }
    }

    async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image trop grande (max 5 Mo)');

            return;
        }

        if (!user?.is_premium) {
            toast.error('Correction photo réservée aux élèves Premium');

            return;
        }

        setPhotoLoading(true);

        try {
            const base64 = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (ev) => {
                    const result = ev.target?.result as string | undefined;

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

            const result = await internalAgentApi.correctPhotoReport({
                image_base64: base64,
                media_type: file.type,
                subject_id: activeChatSubjectId ?? undefined,
                serie_code: activeSerie,
                include_pdf: true,
            });

            pushAssistantMessage(
                `**Correction photo**\n\n${result.correction}\n\n**Note estimee :** ${result.note_estimee}/20\n\n**Points a retravailler :** ${result.points_a_retravailler.join(', ')}`,
                result.provider ?? null,
            );
            rememberAgentHistoryItem({
                type: 'photo-correction',
                title: activeSubject?.name ?? 'Correction photo',
                subtitle: `Note estimée ${result.note_estimee}/20`,
                provider: result.provider ?? null,
                serieCode: activeSerie,
                subjectId: activeSubject?.id,
                chapterId: activeChapter?.id,
                pdf: result.pdf ?? undefined,
            });

            if (result.pdf) {
                setAgentDocument({
                    title: 'Correction photo PDF',
                    description:
                        'Rapport de correction généré par l’agent interne depuis le tuteur.',
                    provider: result.provider ?? null,
                    pdf: result.pdf,
                });
            }
            toast.success('Correction photo générée');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Erreur lors de la correction de la photo',
            );
        } finally {
            setPhotoLoading(false);

            if (fileRef.current) {
                fileRef.current.value = '';
            }
        }
    }

    // Dernier message assistant pour afficher les quick actions
    const showQuickActions = messages.length <= 2 && !isLoading;
    const quickActionLabel = activeSubject
        ? activeChapter
            ? `Actions rapides pour ${activeChapter.title}`
            : `Actions rapides pour ${activeSubject.name}`
        : 'Actions rapides pour démarrer';
    const subjectStarters = getSubjectStarters(
        activeChapter?.title ?? activeSubject?.name,
    );

    return (
        <Layout>
            <div className="flex h-[calc(100vh-8rem)] flex-col gap-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* ── Sélecteur de matière ── */}
                <div className="space-y-3 border-b border-slate-100 px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                            {activeSerie
                                ? `Série ${activeSerie}`
                                : 'Toutes les séries'}
                        </div>
                        {user?.serie_code ? (
                            <div className="rounded-full bg-green-light px-3 py-1 text-xs font-semibold text-green-dark">
                                Série élève {user.serie_code}
                            </div>
                        ) : null}
                        {provider ? (
                            <div
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    provider === 'anthropic'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-amber-100 text-amber-700'
                                }`}
                            >
                                {provider === 'anthropic'
                                    ? 'Mode IA avancé'
                                    : 'Mode secours'}
                            </div>
                        ) : null}
                        {isAdmin ? (
                            <select
                                value={activeSerie}
                                onChange={(event) =>
                                    setSelectedSerie(event.target.value)
                                }
                                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-green focus:outline-none"
                            >
                                <option value="">Toutes les séries</option>
                                {series.map((serie) => (
                                    <option key={serie} value={serie}>
                                        {serie}
                                    </option>
                                ))}
                            </select>
                        ) : null}
                    </div>

                    <div className="scrollbar-none flex items-center gap-2 overflow-x-auto">
                        <button
                            onClick={() => setActiveChatSubject(null)}
                            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                                !activeChatSubjectId
                                    ? 'bg-green text-white shadow'
                                    : 'bg-slate-100 text-slate-600 hover:bg-green-light hover:text-green-dark'
                            }`}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            Général
                        </button>

                        {subjects.map((subject) => (
                            <button
                                key={subject.id}
                                onClick={() => setActiveChatSubject(subject.id)}
                                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                                    activeChatSubjectId === subject.id
                                        ? 'bg-green text-white shadow'
                                        : 'bg-slate-100 text-slate-600 hover:bg-green-light hover:text-green-dark'
                                }`}
                            >
                                <span>{subject.icon}</span>
                                {subject.name}
                                {isAdmin ? (
                                    <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold">
                                        {subject.serie_code}
                                    </span>
                                ) : null}
                            </button>
                        ))}
                    </div>

                    {activeSubject ? (
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                                {chapters.length > 0
                                    ? 'Chapitre ciblé'
                                    : 'Aucun chapitre publié pour cette matière'}
                            </div>
                            {chapters.length > 0 ? (
                                <select
                                    value={selectedChapterId}
                                    onChange={(event) =>
                                        setSelectedChapterId(
                                            event.target.value,
                                        )
                                    }
                                    className="min-w-[240px] rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-green focus:outline-none"
                                >
                                    <option value="">
                                        Tous les chapitres de {activeSubject.name}
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
                            ) : null}
                            {activeChapter ? (
                                <div className="rounded-full bg-green-xlight px-3 py-1 text-xs font-semibold text-green-dark">
                                    {activeChapter.title}
                                </div>
                            ) : null}
                            <button
                                type="button"
                                onClick={handleStudyPack}
                                disabled={packLoading || isLoading}
                                className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
                            >
                                {packLoading ? 'Génération PDF…' : 'Pack PDF'}
                            </button>
                        </div>
                    ) : null}

                    {activeSubject ? (
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex size-8 items-center justify-center rounded-xl bg-green-xlight text-green-dark">
                                        <CheckCircle2 className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            Corriger ma réponse avec l’agent
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Sélectionne un exercice puis colle ta
                                            réponse pour obtenir un retour et un PDF.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr_auto]">
                                    <select
                                        value={selectedExerciseId}
                                        onChange={(event) =>
                                            setSelectedExerciseId(
                                                event.target.value,
                                            )
                                        }
                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-green focus:outline-none"
                                    >
                                        <option value="">
                                            Choisir un exercice de {activeSubject.name}
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

                                    <textarea
                                        value={answerDraft}
                                        onChange={(event) =>
                                            setAnswerDraft(event.target.value)
                                        }
                                        rows={2}
                                        placeholder={
                                            selectedExercise
                                                ? `Rédige ta réponse pour "${selectedExercise.title}"…`
                                                : 'Saisis ici ta réponse à corriger…'
                                        }
                                        className="min-h-[72px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-green focus:outline-none"
                                    />

                                    <Button
                                        type="button"
                                        onClick={handleAnswerCorrection}
                                        disabled={
                                            answerCorrectionLoading ||
                                            !selectedExerciseId ||
                                            !answerDraft.trim()
                                        }
                                        className="rounded-xl bg-green text-white hover:bg-green-dark"
                                    >
                                        {answerCorrectionLoading ? (
                                            <Spinner className="h-4 w-4" />
                                        ) : (
                                            <>
                                                <Bot className="h-4 w-4" />
                                                Corriger
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* ── Zone de messages ── */}
                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                    {agentDocument ? (
                        <div className="pl-11">
                            <div className="rounded-2xl border border-green/20 bg-[linear-gradient(135deg,#eef8f4_0%,#ffffff_100%)] p-4">
                                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-start gap-3">
                                        <div className="flex size-10 items-center justify-center rounded-2xl bg-green text-white">
                                            <FileText className="size-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {agentDocument.title}
                                            </p>
                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                {agentDocument.description}
                                            </p>
                                            {agentDocument.provider ? (
                                                <span
                                                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                                        agentDocument.provider ===
                                                        'anthropic'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}
                                                >
                                                    {agentDocument.provider ===
                                                    'anthropic'
                                                        ? 'Mode IA avancé'
                                                        : 'Mode secours'}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            downloadPdf(agentDocument.pdf)
                                        }
                                        className="rounded-2xl bg-green text-white hover:bg-green-dark"
                                    >
                                        <Download className="h-4 w-4" />
                                        Télécharger le PDF
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {lastSessionForSerie || recentAgentItems.length > 0 ? (
                        <div className="pl-11">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-3">
                                        {lastSessionForSerie ? (
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Reprendre ma dernière session agent
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    Dernière mise à jour le{' '}
                                                    {new Date(
                                                        lastSessionForSerie.updatedAt,
                                                    ).toLocaleString('fr-SN')}
                                                </p>
                                                {lastSessionForSerie.answerDraft ? (
                                                    <p className="mt-2 line-clamp-2 rounded-xl bg-white px-3 py-2 text-xs leading-6 text-slate-500">
                                                        {
                                                            lastSessionForSerie.answerDraft
                                                        }
                                                    </p>
                                                ) : null}
                                            </div>
                                        ) : null}

                                        {recentAgentItems.length > 0 ? (
                                            <div>
                                                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">
                                                    Derniers documents
                                                </p>
                                                <div className="mt-2 flex flex-wrap gap-2">
                                                    {recentAgentItems.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                                                        >
                                                            {item.title}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col gap-2 md:min-w-[230px]">
                                        {lastSessionForSerie ? (
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
                                                <Button className="w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                                    Reprendre dans l’agent
                                                </Button>
                                            </Link>
                                        ) : null}
                                        {recentAgentItems[0]?.pdf ? (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    downloadPdf(recentAgentItems[0].pdf!)
                                                }
                                                className="w-full rounded-2xl"
                                            >
                                                <Download className="h-4 w-4" />
                                                Télécharger le dernier PDF
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {messages.length === 1 ? (
                        <div className="space-y-3 pl-11">
                            <div className="grid gap-3 md:grid-cols-2">
                                {GENERAL_STARTERS.map((starter) => (
                                    <button
                                        key={starter.title}
                                        type="button"
                                        onClick={() =>
                                            sendQuickQuestion(
                                                activeSubject
                                                    ? `${starter.prompt} Matière: ${activeSubject.name}.${activeChapter ? ` Chapitre: ${activeChapter.title}.` : ''}`
                                                    : starter.prompt,
                                            )
                                        }
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-green/40 hover:bg-white"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-2xl bg-green-xlight text-green-dark">
                                                <starter.icon className="size-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {starter.title}
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    {starter.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="rounded-2xl border border-dashed border-green/30 bg-green-xlight/60 p-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-green-dark">
                                        {activeSubject
                                            ? activeChapter
                                                ? `Prompts utiles pour ${activeChapter.title}`
                                                : `Prompts utiles pour ${activeSubject.name}`
                                            : 'Prompts utiles pour commencer'}
                                    </p>
                                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500">
                                        Le tuteur bascule automatiquement entre IA avancée et mode secours
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {subjectStarters.map((prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={() =>
                                                sendQuickQuestion(prompt)
                                            }
                                            className="rounded-full border border-green/20 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-green/40 hover:text-green-dark"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                    {activeSubject ? (
                                        <button
                                            type="button"
                                            onClick={handleStudyPack}
                                            className="rounded-full border border-slate-900/10 bg-slate-900 px-3 py-2 text-left text-xs font-medium text-white transition hover:bg-slate-800"
                                        >
                                            Pack PDF de révision
                                        </button>
                                    ) : null}
                                    <Link to="/internal-agent">
                                        <button
                                            type="button"
                                            className="rounded-full border border-green/20 bg-white px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:border-green/40 hover:text-green-dark"
                                        >
                                            Agent interne complet
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {messages.map((msg, i) => (
                        <ChatMessage
                            key={i}
                            message={msg}
                            isStreaming={
                                isLoading &&
                                i === messages.length - 1 &&
                                msg.role === 'assistant'
                            }
                        />
                    ))}

                    {/* Quick actions après le 1er message */}
                    {showQuickActions && (
                        <div className="space-y-2 pl-11">
                            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">
                                {quickActionLabel}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {QUICK_ACTIONS.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() =>
                                            handleQuickAction(action.value)
                                        }
                                        className="rounded-full border border-green/30 bg-green-xlight px-3 py-1.5 text-xs font-medium text-green-dark transition-colors hover:bg-green-light"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                                {activeSubject ? (
                                    <button
                                        type="button"
                                        onClick={handleStudyPack}
                                        className="rounded-full border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
                                    >
                                        Pack PDF
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* ── Barre de saisie ── */}
                <div className="border-t border-slate-100 px-4 py-3">
                    <div className="flex items-end gap-2">
                        {/* Bouton photo */}
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            disabled={photoLoading || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-colors hover:bg-green-light hover:text-green disabled:opacity-40"
                            title={
                                user?.is_premium
                                    ? 'Corriger une photo'
                                    : 'Premium requis'
                            }
                        >
                            {photoLoading ? (
                                <Spinner className="h-4 w-4" />
                            ) : (
                                <Camera className="h-5 w-5" />
                            )}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={handlePhotoUpload}
                        />

                        {/* Input texte */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                activeChatSubjectId
                                    ? activeChapter
                                        ? `Pose ta question sur ${activeChapter.title}…`
                                        : `Pose ta question sur ${activeSubject?.name ?? 'cette matière'}…`
                                    : 'Pose ta question sur le BAC Sénégal…'
                            }
                            rows={1}
                            className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green focus:bg-white focus:ring-2 focus:ring-green/20 focus:outline-none"
                            style={{ maxHeight: 120, overflowY: 'auto' }}
                        />

                        {/* Bouton effacer */}
                        {messages.length > 1 && (
                            <button
                                type="button"
                                onClick={clearChat}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                title="Nouvelle conversation"
                            >
                                <RotateCcw className="h-4 w-4" />
                            </button>
                        )}

                        {/* Bouton envoyer */}
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green text-white shadow transition-colors hover:bg-green-dark disabled:opacity-40"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Indicateur premium pour correction photo */}
                    <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span>
                            {activeSubject
                                ? activeChapter
                                    ? `Conversation en cours sur ${activeChapter.title}`
                                    : `Conversation en cours sur ${activeSubject.name}`
                                : 'Conversation générale sur le BAC Sénégal'}
                        </span>
                        <span>Entrée pour envoyer, Maj + Entrée pour aller à la ligne</span>
                    </div>

                    {!user?.is_premium && (
                        <p className="mt-1 text-center text-[11px] text-slate-400">
                            ✨ La correction de photo est réservée aux élèves{' '}
                            <span className="font-medium text-amber">
                                Premium
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
}
