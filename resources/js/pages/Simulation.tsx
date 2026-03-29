import { useQuery } from '@tanstack/react-query';
import {
    AlertCircle,
    AlertTriangle,
    CheckCircle2,
    Clock,
    FileText,
    Lock,
    RefreshCw,
    Sparkles,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { aiApi, subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';

type SimulationResult = {
    subject_text: string;
    correction_key: string;
    duration_minutes: number;
};

const GENERATION_STEPS = [
    'Analyse du programme officiel DGEX…',
    'Construction du plan du sujet…',
    'Rédaction des exercices…',
    'Vérification de la cohérence…',
    'Finalisation du corrigé…',
];

export default function Simulation() {
    const { user, setPage } = useAppStore();
    useEffect(() => {
        setPage('simulation');
    }, [setPage]);

    const [selectedSubjectId, setSelectedSubjectId] = useState('');
    const [simulation, setSimulation] = useState<SimulationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [apiError, setApiError] = useState<string | null>(null);
    const [showCorrection, setShowCorrection] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    const { data: subjects = [] } = useQuery({
        queryKey: ['subjects', user?.serie_code],
        queryFn: () => subjectsApi.list(user?.serie_code),
        enabled: !!user?.serie_code,
    });

    // Countdown timer
    useEffect(() => {
        if (!timerActive || timeLeft <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    setTimerActive(false);

                    return 0;
                }

                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    // Animate loading steps while waiting for Claude
    useEffect(() => {
        if (!loading) {
            setLoadingStep(0);

            return;
        }

        const interval = setInterval(() => {
            setLoadingStep((s) => (s + 1) % GENERATION_STEPS.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [loading]);

    async function handleGenerate() {
        if (!selectedSubjectId) {
            toast.error('Choisis une matière');

            return;
        }

        if (!user?.is_premium) {
            toast.error('Simulation réservée aux élèves Premium');

            return;
        }

        setLoading(true);
        setSimulation(null);
        setApiError(null);
        setShowCorrection(false);

        try {
            const result = await aiApi.simulate(selectedSubjectId);
            setSimulation(result);
            setTimeLeft(result.duration_minutes * 60);
            setTimerActive(true);
            toast.success('Sujet généré — bonne chance !');
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { message?: string } } })
                    ?.response?.data?.message ??
                'Erreur lors de la génération — réessaie dans un moment';
            setApiError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    const formatTime = (s: number) =>
        `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

    const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

    return (
        <Layout>
            <div className="mx-auto max-w-3xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Simulation BAC
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Génère un sujet complet style BAC Sénégal et
                        entraîne-toi dans les conditions réelles
                    </p>
                </div>

                {/* Premium guard */}
                {!user?.is_premium && (
                    <Card className="border-amber/30 bg-amber-light">
                        <CardContent className="flex items-center gap-3 py-4">
                            <Lock className="h-5 w-5 shrink-0 text-amber" />
                            <div>
                                <p className="font-medium text-amber">
                                    Fonctionnalité Premium
                                </p>
                                <p className="text-sm text-amber/80">
                                    Les simulations complètes sont réservées aux
                                    élèves Premium. Passe au Premium pour
                                    déverrouiller.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Sélection matière */}
                <Card>
                    <CardHeader>
                        <CardTitle>Choisir une matière</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {subjects.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setSelectedSubjectId(s.id)}
                                    className={`rounded-xl border-2 px-4 py-3 text-left transition-all ${
                                        selectedSubjectId === s.id
                                            ? 'border-green bg-green-light'
                                            : 'border-slate-200 hover:border-green/40 hover:bg-green-xlight'
                                    }`}
                                >
                                    <span className="text-xl">{s.icon}</span>
                                    <p className="mt-1 text-sm font-medium text-slate-700">
                                        {s.name}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        coeff {s.coefficient}
                                    </p>
                                </button>
                            ))}
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={
                                !selectedSubjectId ||
                                loading ||
                                !user?.is_premium
                            }
                            className="w-full bg-green text-white hover:bg-green-dark"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="h-4 w-4" /> Génération
                                    en cours…
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" /> Générer le
                                    sujet
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Loading state avec étapes animées */}
                {loading && (
                    <Card className="border-green/20 bg-green-xlight">
                        <CardContent className="py-8">
                            <div className="flex flex-col items-center gap-4 text-center">
                                <div className="relative">
                                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-green/20 border-t-green" />
                                    <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-green" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800">
                                        {selectedSubject
                                            ? `Sujet de ${selectedSubject.name} en cours de génération`
                                            : 'Génération en cours'}
                                    </p>
                                    <p className="mt-1 text-sm text-green-dark transition-all duration-500">
                                        {GENERATION_STEPS[loadingStep]}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs text-slate-500">
                                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber" />
                                    La génération peut prendre jusqu'à 30
                                    secondes
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Erreur API */}
                {apiError && !loading && (
                    <Card className="border-red-200 bg-red-50">
                        <CardContent className="flex items-start gap-3 py-4">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                            <div>
                                <p className="font-medium text-red-700">
                                    Génération impossible
                                </p>
                                <p className="mt-0.5 text-sm text-red-600">
                                    {apiError}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Sujet généré */}
                {simulation && !loading && (
                    <>
                        {/* Confirmation */}
                        <div className="flex items-center gap-2 rounded-xl bg-green-light px-4 py-3 text-sm font-medium text-green-dark">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            Sujet généré par IA — conditions BAC Sénégal{' '}
                            {new Date().getFullYear()}
                        </div>

                        {/* Timer */}
                        <Card
                            className={
                                timeLeft === 0
                                    ? 'border-red-300 bg-red-50'
                                    : 'border-green/30 bg-green-xlight'
                            }
                        >
                            <CardContent className="flex items-center justify-between py-4">
                                <div className="flex items-center gap-2">
                                    <Clock
                                        className={`h-5 w-5 ${timeLeft === 0 ? 'text-red-500' : 'text-green'}`}
                                    />
                                    <span className="font-medium text-slate-700">
                                        {timeLeft === 0
                                            ? 'Temps écoulé !'
                                            : 'Temps restant'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`font-mono text-2xl font-bold ${timeLeft === 0 ? 'text-red-600' : 'text-green'}`}
                                    >
                                        {formatTime(timeLeft)}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setTimeLeft(
                                                simulation.duration_minutes *
                                                    60,
                                            );
                                            setTimerActive(true);
                                        }}
                                        className="rounded-lg p-1.5 text-green hover:bg-green/20"
                                        title="Réinitialiser"
                                    >
                                        <RefreshCw className="h-4 w-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sujet */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-green" />
                                        Sujet
                                    </CardTitle>
                                    <Badge className="border-0 bg-amber-light text-amber">
                                        Durée : {simulation.duration_minutes}{' '}
                                        min
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm prose-headings:font-semibold prose-strong:text-slate-900 max-w-none text-slate-800">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {simulation.subject_text}
                                    </ReactMarkdown>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Corrigé (masqué par défaut) */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Corrigé indicatif</CardTitle>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            setShowCorrection(!showCorrection)
                                        }
                                        className="border-green/30 text-green"
                                    >
                                        {showCorrection
                                            ? 'Masquer'
                                            : 'Afficher le corrigé'}
                                    </Button>
                                </div>
                            </CardHeader>
                            {showCorrection && (
                                <CardContent>
                                    <div className="prose prose-sm max-w-none text-slate-700">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {simulation.correction_key}
                                        </ReactMarkdown>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </>
                )}
            </div>
        </Layout>
    );
}
