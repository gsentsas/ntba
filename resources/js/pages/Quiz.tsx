import { useQuery } from '@tanstack/react-query';
import {
    AlertCircle,
    BookOpenCheck,
    Bot,
    Calculator,
    ChevronRight,
    Clock,
    Lightbulb,
    RotateCcw,
    Star,
    Trophy,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useProgress } from '@/hooks/useProgress';
import { exercisesApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';
import type { Exercise, ExerciseOption } from '@/types';

const BATCH_SIZE = 10;

type SubmitResult = {
    is_correct: boolean;
    points_earned: number;
    correct_answer: string;
    explanation: string;
};

export default function Quiz() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, setPage, selectedSerie, setSelectedSerie } = useAppStore();
    const isAdmin = user?.role === 'admin';
    const activeSerie = isAdmin ? selectedSerie : user?.serie_code ?? '';

    // ── Filtres ──
    const [filterSubjectId, setFilterSubjectId] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterType, setFilterType] = useState('qcm');
    const [annaleOnly, setAnnaleOnly] = useState(false);

    // ── État quiz ──
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [result, setResult] = useState<SubmitResult | null>(null);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [currentHint, setCurrentHint] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0, points: 0 });
    const [done, setDone] = useState(false);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { subjectsProgress } = useProgress();
    const { data: series = [] } = useQuery({
        queryKey: ['subject-series'],
        queryFn: subjectsApi.series,
    });

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', activeSerie],
        queryFn: () => subjectsApi.list(activeSerie || undefined),
        enabled: !!user,
    });

    const {
        data: rawExercises,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            'quiz-exercises',
            activeSerie,
            filterSubjectId,
            filterDifficulty,
            filterType,
            annaleOnly,
        ],
        queryFn: () =>
            exercisesApi.list({
                serie_code: activeSerie || undefined,
                subject_id: filterSubjectId || undefined,
                difficulty: filterDifficulty || undefined,
                type: filterType || undefined,
                is_annale: annaleOnly || undefined,
                limit: BATCH_SIZE,
                shuffle: true,
            }),
        staleTime: 0,
        enabled: !!user,
    });

    useEffect(() => {
        setPage('quiz');
    }, [setPage]);

    useEffect(() => {
        const subjectFromQuery = searchParams.get('subject') ?? '';
        if (subjectFromQuery) {
            setFilterSubjectId(subjectFromQuery);
        }
    }, [searchParams]);

    const activeSubject = subjects.find((subject) => subject.id === filterSubjectId);
    const activeSubjectName = activeSubject?.name ?? null;
    const recommendedSubject = [...subjectsProgress]
        .sort((a, b) => {
            const scoreA = a.subject.coefficient * 10 - a.simulated_grade;
            const scoreB = b.subject.coefficient * 10 - b.simulated_grade;

            return scoreB - scoreA;
        })[0];
    const recommendedDifficulty =
        recommendedSubject && recommendedSubject.simulated_grade < 10
            ? '2'
            : recommendedSubject && recommendedSubject.simulated_grade < 13
              ? '3'
              : '4';

    const applyPreset = useCallback(
        ({
            subjectId,
            difficulty,
            type,
            annale,
        }: {
            subjectId?: string;
            difficulty?: string;
            type?: string;
            annale?: boolean;
        }) => {
            setFilterSubjectId(subjectId ?? '');
            setFilterDifficulty(difficulty ?? '');
            setFilterType(type ?? '');
            setAnnaleOnly(annale ?? false);
        },
        [],
    );

    useEffect(() => {
        if (rawExercises) {
            setExercises(rawExercises);
            setCurrentIndex(0);
            resetQuestion(rawExercises[0]);
            setScore({ correct: 0, total: 0, points: 0 });
            setDone(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawExercises]);

    function resetQuestion(ex?: Exercise) {
        setSelected(null);
        setResult(null);
        setHintsUsed(0);
        setCurrentHint(null);
        const mins = ex?.estimated_time_minutes ?? 5;
        startTimer(mins * 60);
    }

    function startTimer(seconds: number) {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        setTimeLeft(seconds);
        timerRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(timerRef.current!);

                    return 0;
                }

                return t - 1;
            });
        }, 1000);
    }

    useEffect(
        () => () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        },
        [],
    );

    const currentEx = exercises[currentIndex];

    async function handleSubmit() {
        if (!selected || !currentEx || submitting) {
            return;
        }

        setSubmitting(true);

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        try {
            const res = await exercisesApi.submit(currentEx.id, {
                answer: selected,
                time_spent_seconds:
                    currentEx.estimated_time_minutes * 60 - timeLeft,
                hints_used: hintsUsed,
            });
            setResult(res);
            setScore((s) => ({
                correct: s.correct + (res.is_correct ? 1 : 0),
                total: s.total + 1,
                points: s.points + res.points_earned,
            }));
        } catch {
            toast.error('Erreur lors de la soumission');
        } finally {
            setSubmitting(false);
        }
    }

    async function handleHint() {
        if (!currentEx) {
            return;
        }

        try {
            const { hint } = await exercisesApi.hint(currentEx.id, hintsUsed);

            if (hint) {
                setCurrentHint(hint);
                setHintsUsed((h) => h + 1);
            } else {
                toast("Plus d'indice disponible");
            }
        } catch {
            toast.error("Impossible de charger l'indice");
        }
    }

    function handleNext() {
        if (currentIndex + 1 >= exercises.length) {
            setDone(true);
        } else {
            const nextEx = exercises[currentIndex + 1];
            setCurrentIndex((i) => i + 1);
            resetQuestion(nextEx);
        }
    }

    function handleRestart() {
        refetch();
    }

    const formatTime = (secs: number) =>
        `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
    const timerRed = timeLeft > 0 && timeLeft < 30;

    // ── Écran résultat ──
    if (done) {
        const pct = Math.round((score.correct / score.total) * 100);

        return (
            <Layout>
                <div className="mx-auto max-w-lg">
                    <Card className="text-center">
                        <CardContent className="space-y-6 py-10">
                            <div className="flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-light text-4xl">
                                    <Trophy className="h-10 w-10 text-amber" />
                                </div>
                            </div>

                            <div>
                                <p className="text-lg text-slate-500">
                                    Résultat
                                </p>
                                <p className="text-5xl font-bold text-green">
                                    {pct}%
                                </p>
                                <p className="mt-1 text-slate-600">
                                    {score.correct} bonne
                                    {score.correct > 1 ? 's' : ''} réponse
                                    {score.correct > 1 ? 's' : ''} sur{' '}
                                    {score.total}
                                </p>
                            </div>

                            <div className="rounded-xl bg-green-xlight px-6 py-3">
                                <p className="text-sm text-green-dark">
                                    +{score.points} points gagnés
                                </p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    onClick={handleRestart}
                                    className="w-full bg-green text-white hover:bg-green-dark"
                                >
                                    Recommencer
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        navigate(
                                            recommendedSubject
                                                ? `/internal-agent?subject=${recommendedSubject.subject.id}&action=study-pack`
                                                : '/internal-agent',
                                        )
                                    }
                                    className="w-full border-green/30 text-green"
                                >
                                    Réviser avec l’agent
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate('/stats')}
                                    className="w-full text-slate-500"
                                >
                                    Voir mes stats
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mx-auto max-w-3xl space-y-4">
                {recommendedSubject ? (
                    <Card className="border-purple-light bg-[linear-gradient(135deg,#f5f3ff_0%,#ffffff_100%)]">
                        <CardContent className="space-y-4 py-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm font-semibold text-purple">
                                        Recommandé pour toi
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-slate-700">
                                        Commence par{' '}
                                        <span className="font-semibold">
                                            {recommendedSubject.subject.name}
                                        </span>{' '}
                                        {activeSerie
                                            ? `en série ${activeSerie}.`
                                            : ' dans les séries actuellement visibles.'}{' '}
                                        C’est la matière où le gain semble le
                                        plus utile pour remonter ta moyenne.
                                    </p>
                                </div>
                                <Badge className="border-0 bg-white text-purple">
                                    {recommendedSubject.simulated_grade.toFixed(1)}
                                    /20
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="button"
                                    onClick={() =>
                                        applyPreset({
                                            subjectId:
                                                recommendedSubject.subject.id,
                                            difficulty:
                                                recommendedDifficulty,
                                            type: '',
                                            annale: false,
                                        })
                                    }
                                    className="rounded-2xl bg-purple text-white hover:bg-purple/90"
                                >
                                    Quiz conseillé
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        applyPreset({
                                            subjectId:
                                                recommendedSubject.subject.id,
                                            difficulty: '',
                                            type: 'vrai_faux',
                                            annale: false,
                                        })
                                    }
                                    className="rounded-2xl border-purple/30 text-purple hover:bg-purple-light"
                                >
                                    Révision rapide
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardContent className="space-y-4 py-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Parcours rapides
                                </p>
                                <p className="text-sm text-slate-500">
                                    Lance un quiz déjà classé pour la série{' '}
                                    <span className="font-medium text-slate-700">
                                        {activeSerie ||
                                            (isAdmin
                                                ? 'choisie par l’admin'
                                                : 'de l’élève')}
                                    </span>
                                    {activeSubjectName
                                        ? ` et la matière ${activeSubjectName}`
                                        : ''}
                                    .
                                </p>
                            </div>
                            {isAdmin ? (
                                <select
                                    value={activeSerie}
                                    onChange={(event) =>
                                        setSelectedSerie(event.target.value)
                                    }
                                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 focus:border-green focus:outline-none"
                                >
                                    <option value="">
                                        Toutes les séries
                                    </option>
                                    {series.map((serie) => (
                                        <option key={serie} value={serie}>
                                            {serie}
                                        </option>
                                    ))}
                                </select>
                            ) : null}
                            {(filterSubjectId ||
                                filterDifficulty ||
                                filterType ||
                                annaleOnly) && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        applyPreset({
                                            subjectId: '',
                                            difficulty: '',
                                            type: '',
                                            annale: false,
                                        })
                                    }
                                    className="rounded-2xl"
                                >
                                    <RotateCcw className="h-4 w-4" />
                                    Réinitialiser
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: '',
                                        difficulty: '',
                                        type: '',
                                        annale: false,
                                    })
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight"
                            >
                                <p className="text-sm font-semibold text-slate-900">
                                    Quiz de ma série
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Tous les exercices de {activeSerie || 'la série'}
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: filterSubjectId,
                                        difficulty: '',
                                        type: '',
                                        annale: false,
                                    })
                                }
                                disabled={!filterSubjectId}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <p className="text-sm font-semibold text-slate-900">
                                    Quiz de ma matière
                                </p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {activeSubjectName
                                        ? activeSubjectName
                                        : "Choisis d'abord une matière"}
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: filterSubjectId,
                                        difficulty: '',
                                        type: 'calcul',
                                        annale: false,
                                    })
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight"
                            >
                                <div className="flex items-center gap-2">
                                    <Calculator className="h-4 w-4 text-green-dark" />
                                    <p className="text-sm font-semibold text-slate-900">
                                        Calcul
                                    </p>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Exercices numériques et applications
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: filterSubjectId,
                                        difficulty: '',
                                        type: '',
                                        annale: true,
                                    })
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight"
                            >
                                <div className="flex items-center gap-2">
                                    <BookOpenCheck className="h-4 w-4 text-amber" />
                                    <p className="text-sm font-semibold text-slate-900">
                                        Annales
                                    </p>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Mode entraînement sur sujets officiels
                                </p>
                            </button>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: filterSubjectId,
                                        difficulty: '',
                                        type: 'vrai_faux',
                                        annale: false,
                                    })
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight"
                            >
                                <div className="flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-amber" />
                                    <p className="text-sm font-semibold text-slate-900">
                                        Vrai / Faux
                                    </p>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Révisions rapides pour vérifier les bases
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    applyPreset({
                                        subjectId: filterSubjectId,
                                        difficulty: '3',
                                        type: '',
                                        annale: false,
                                    })
                                }
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left transition hover:border-green hover:bg-green-xlight"
                            >
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-amber" />
                                    <p className="text-sm font-semibold text-slate-900">
                                        Niveau moyen
                                    </p>
                                </div>
                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    Pour avancer sans partir trop facile ou trop dur
                                </p>
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Filtres ── */}
                <Card>
                    <CardContent className="space-y-3 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="border-0 bg-slate-900 text-white">
                                    Serie {activeSerie || 'non definie'}
                                </Badge>
                                <span className="text-sm text-slate-500">
                                    Quiz classes pour les eleves de cette serie
                                </span>
                            </div>
                            <span className="text-sm text-slate-500">
                                {subjects.length} matiere
                                {subjects.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={filterSubjectId}
                            onChange={(e) => setFilterSubjectId(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-green focus:outline-none"
                        >
                            <option value="">Toutes les matières</option>
                            {subjects.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.icon} {s.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filterDifficulty}
                            onChange={(e) =>
                                setFilterDifficulty(e.target.value)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-green focus:outline-none"
                        >
                            <option value="">Toute difficulté</option>
                            {[1, 2, 3, 4, 5].map((d) => (
                                <option key={d} value={d}>
                                    {'★'.repeat(d)} ({d}/5)
                                </option>
                            ))}
                        </select>

                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-green focus:outline-none"
                        >
                            <option value="">Tous les types</option>
                            <option value="qcm">QCM</option>
                            <option value="vrai_faux">Vrai / Faux</option>
                            <option value="calcul">Calcul</option>
                        </select>

                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input
                                type="checkbox"
                                checked={annaleOnly}
                                onChange={(e) =>
                                    setAnnaleOnly(e.target.checked)
                                }
                                className="h-4 w-4 rounded accent-green"
                            />
                            Annales uniquement
                        </label>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Chargement ── */}
                {isLoading && (
                    <div className="flex justify-center py-16">
                        <Spinner className="h-8 w-8 text-green" />
                    </div>
                )}

                {/* ── Exercice courant ── */}
                {!isLoading && currentEx && (
                    <>
                        {/* Progression dots */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-1.5">
                                {exercises.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 w-2 rounded-full transition-colors ${
                                            i < currentIndex
                                                ? 'bg-green'
                                                : i === currentIndex
                                                  ? 'scale-125 bg-green'
                                                  : 'bg-slate-200'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-slate-500">
                                {currentIndex + 1} / {exercises.length}
                            </span>
                        </div>

                        <Card>
                            <CardHeader className="pb-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {currentEx.subject_name && (
                                            <Badge className="border-0 bg-green-light text-green-dark">
                                                {currentEx.subject_name}
                                            </Badge>
                                        )}
                                        {currentEx.serie_code && (
                                            <Badge className="border-0 bg-slate-100 text-slate-700">
                                                {currentEx.serie_code}
                                            </Badge>
                                        )}
                                        {currentEx.is_annale && (
                                            <Badge className="border-0 bg-amber-light text-amber">
                                                Annale {currentEx.annale_year}
                                            </Badge>
                                        )}
                                        <span className="text-sm text-amber">
                                            {'★'.repeat(currentEx.difficulty)}
                                            {'☆'.repeat(
                                                5 - currentEx.difficulty,
                                            )}
                                        </span>
                                    </div>

                                    {/* Timer */}
                                    <div
                                        className={`flex items-center gap-1 rounded-full px-3 py-1 font-mono text-sm font-semibold ${
                                            timerRed
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}
                                    >
                                        <Clock className="h-3.5 w-3.5" />
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-4">
                                {/* Question */}
                                <p className="text-base font-medium text-slate-800">
                                    {currentEx.question_text}
                                </p>

                                {/* Options QCM */}
                                {currentEx.type === 'qcm' &&
                                    currentEx.options?.map(
                                        (opt: ExerciseOption) => {
                                            let cls =
                                                'border-slate-200 bg-white hover:border-green hover:bg-green-xlight';

                                            if (result) {
                                                if (
                                                    opt.label ===
                                                    result.correct_answer
                                                ) {
                                                    cls =
                                                        'border-green bg-green-light';
                                                } else if (
                                                    opt.label === selected
                                                ) {
                                                    cls =
                                                        'border-red-400 bg-red-50';
                                                } else {
                                                    cls =
                                                        'border-slate-200 bg-white opacity-60';
                                                }
                                            } else if (selected === opt.label) {
                                                cls =
                                                    'border-green bg-green-light';
                                            }

                                            return (
                                                <button
                                                    key={opt.label}
                                                    disabled={!!result}
                                                    onClick={() =>
                                                        setSelected(opt.label)
                                                    }
                                                    className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${cls}`}
                                                >
                                                    <span className="mr-2 font-bold text-slate-500">
                                                        {opt.label}.
                                                    </span>
                                                    {opt.text}
                                                </button>
                                            );
                                        },
                                    )}

                                {/* Vrai / Faux */}
                                {currentEx.type === 'vrai_faux' && (
                                    <div className="flex gap-3">
                                        {['vrai', 'faux'].map((val) => {
                                            let cls =
                                                'border-slate-200 bg-white hover:border-green';

                                            if (result) {
                                                if (
                                                    val ===
                                                    result.correct_answer
                                                ) {
                                                    cls =
                                                        'border-green bg-green-light';
                                                } else if (val === selected) {
                                                    cls =
                                                        'border-red-400 bg-red-50';
                                                }
                                            } else if (selected === val) {
                                                cls =
                                                    'border-green bg-green-light';
                                            }

                                            return (
                                                <button
                                                    key={val}
                                                    disabled={!!result}
                                                    onClick={() =>
                                                        setSelected(val)
                                                    }
                                                    className={`flex-1 rounded-xl border-2 py-3 text-sm font-semibold capitalize transition-all ${cls}`}
                                                >
                                                    {val}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Indice */}
                                {currentHint && (
                                    <div className="flex items-start gap-2 rounded-xl bg-amber-light px-4 py-3 text-sm text-amber">
                                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                                        {currentHint}
                                    </div>
                                )}

                                {/* Explication après soumission */}
                                {result && (
                                    <div
                                        className={`rounded-xl px-4 py-3 text-sm ${result.is_correct ? 'bg-green-light text-green-dark' : 'bg-red-50 text-red-700'}`}
                                    >
                                        <p className="mb-1 font-semibold">
                                            {result.is_correct
                                                ? '✓ Bonne réponse !'
                                                : `✗ Réponse correcte : ${result.correct_answer}`}
                                        </p>
                                        <p>{currentEx.explanation}</p>
                                        {result.points_earned > 0 && (
                                            <p className="mt-1 font-medium text-green">
                                                +{result.points_earned} points
                                            </p>
                                        )}
                                        <div className="mt-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(
                                                        `/internal-agent?subject=${currentEx.subject_id}&chapter=${currentEx.chapter_id}&exercise=${currentEx.id}&answer=${encodeURIComponent(selected ?? '')}&action=correct-answer`,
                                                    )
                                                }
                                                className="border-white/60 bg-white/80 text-slate-700 hover:bg-white"
                                            >
                                                <Bot className="h-4 w-4" />
                                                Revoir cette réponse avec l’agent
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between gap-3 pt-1">
                                    {!result ? (
                                        <>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleHint}
                                                disabled={!!result || isLoading}
                                                className="text-amber hover:bg-amber-light"
                                            >
                                                <Lightbulb className="h-4 w-4" />
                                                Indice (-2 pts)
                                            </Button>
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={
                                                    !selected || submitting
                                                }
                                                className="bg-green text-white hover:bg-green-dark"
                                            >
                                                {submitting ? (
                                                    <Spinner className="h-4 w-4" />
                                                ) : (
                                                    'Valider'
                                                )}
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="ml-auto flex flex-wrap gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    navigate(
                                                        `/internal-agent?subject=${currentEx.subject_id}&chapter=${currentEx.chapter_id}&exercise=${currentEx.id}&answer=${encodeURIComponent(selected ?? '')}&action=correct-answer`,
                                                    )
                                                }
                                            >
                                                <Bot className="h-4 w-4" />
                                                Agent interne
                                            </Button>
                                            <Button
                                                onClick={handleNext}
                                                className="bg-green text-white hover:bg-green-dark"
                                            >
                                                {currentIndex + 1 <
                                                exercises.length ? (
                                                    <>
                                                        Question suivante{' '}
                                                        <ChevronRight className="h-4 w-4" />
                                                    </>
                                                ) : (
                                                    <>
                                                        Voir mon score{' '}
                                                        <Trophy className="h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}

                {/* ── Aucun exercice ── */}
                {!isLoading && exercises.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                            <AlertCircle className="h-10 w-10 text-slate-300" />
                            <p className="text-slate-500">
                                Aucun exercice trouve pour la serie{' '}
                                <span className="font-medium text-slate-700">
                                    {activeSerie || 'selectionnee'}
                                </span>{' '}
                                avec ces filtres.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setFilterSubjectId('');
                                    setFilterDifficulty('');
                                    setFilterType('');
                                    setAnnaleOnly(false);
                                }}
                            >
                                Réinitialiser les filtres
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
}
