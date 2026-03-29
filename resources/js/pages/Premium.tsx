import { CheckCircle, Crown, Loader2, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';
import { useAppStore } from '@/store';

const FEATURES_FREE = [
    'Accès aux cours et chapitres',
    '10 questions IA par minute',
    'Quiz illimités',
    'Annales disponibles',
    'Forum communauté',
    'Planning de base',
];

const FEATURES_PREMIUM = [
    'Tout le plan gratuit +',
    '30 questions IA par minute',
    'Simulations BAC complètes',
    'Correction photo (travaux corrigés)',
    'Planning adaptatif avancé',
    'Fiches de révision IA instantanées',
    'Notifications push personnalisées',
    'Support prioritaire',
];

const PRICING = [
    {
        id: '1month',
        label: 'Mensuel',
        price: '1 500',
        period: 'par mois',
        badge: null,
        recommended: false,
    },
    {
        id: '3months',
        label: 'Trimestriel',
        price: '3 500',
        period: 'pour 3 mois',
        badge: 'Économise 22%',
        recommended: true,
    },
    {
        id: '1year',
        label: "Jusqu'au BAC",
        price: '5 000',
        period: "jusqu'en juillet",
        badge: 'Meilleur choix',
        recommended: false,
    },
];

type PaymentModal = {
    payment_id: string;
    provider: string;
    wave_launch_url?: string;
    ussd_code?: string;
    instructions?: string[];
    amount: number;
    plan: string;
    demo_mode?: boolean;
} | null;

export default function Premium() {
    const { user, setPage } = useAppStore();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [paymentModal, setPaymentModal] = useState<PaymentModal>(null);

    useEffect(() => {
        setPage('premium');
    }, [setPage]);

    // Retour depuis Wave après paiement
    useEffect(() => {
        const status = searchParams.get('status');
        const paymentId = searchParams.get('payment_id');

        if (status === 'success' && paymentId) {
            toast.success('Paiement reçu ! Activation en cours...');
        } else if (status === 'error') {
            toast.error('Paiement annulé ou échoué.');
        }
    }, [searchParams]);

    async function handlePay(
        planId: string,
        provider: 'wave' | 'orange_money',
        phone?: string,
    ) {
        setLoadingPlan(`${planId}-${provider}`);

        try {
            const res = await api.post('/payments/initiate', {
                plan: planId,
                provider,
                phone,
            });
            const data = res.data as PaymentModal;

            if (
                provider === 'wave' &&
                data?.wave_launch_url &&
                !data.demo_mode
            ) {
                window.location.href = data.wave_launch_url;
            } else {
                setPaymentModal(data);
            }
        } catch {
            toast.error("Erreur lors de l'initiation du paiement");
        } finally {
            setLoadingPlan(null);
        }
    }

    if (user?.is_premium) {
        return (
            <Layout>
                <div className="mx-auto max-w-lg space-y-6">
                    <Card className="border-green/30 bg-green-xlight text-center">
                        <CardContent className="space-y-4 py-10">
                            <div className="flex justify-center">
                                <Crown className="h-16 w-16 text-amber" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Tu es déjà Premium !
                            </h2>
                            <p className="text-slate-600">
                                Ton accès Premium est actif
                                {user.premium_expires_at &&
                                    ` jusqu'au ${new Date(user.premium_expires_at).toLocaleDateString('fr-SN')}`}
                                .
                            </p>
                            <p className="text-sm text-slate-500">
                                Profite de toutes les fonctionnalités pour
                                préparer ton BAC au maximum.
                            </p>
                            <Button
                                onClick={() => navigate('/ai-chat')}
                                className="bg-green text-white hover:bg-green-dark"
                            >
                                <Sparkles className="h-4 w-4" />
                                Aller vers le Tuteur IA
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="mx-auto max-w-4xl space-y-8">
                {/* Hero */}
                <div className="rounded-2xl bg-[linear-gradient(135deg,#1D9E75_0%,#0F6E56_100%)] px-8 py-10 text-center text-white">
                    <Crown className="mx-auto mb-4 h-12 w-12 text-amber" />
                    <h1 className="text-3xl font-bold">Passe au Premium</h1>
                    <p className="mt-3 text-green-light">
                        Débloque toutes les fonctionnalités pour maximiser tes
                        chances au BAC Sénégal
                    </p>
                </div>

                {/* Comparatif */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-600">
                                Gratuit
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {FEATURES_FREE.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm text-slate-600"
                                >
                                    <CheckCircle className="h-4 w-4 shrink-0 text-green" />
                                    {f}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-amber/40 shadow-lg shadow-amber/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Crown className="h-5 w-5 text-amber" />
                                <span className="text-amber">Premium</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {FEATURES_PREMIUM.map((f, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-700"
                                >
                                    <Sparkles
                                        className={`h-4 w-4 shrink-0 ${i === 0 ? 'text-slate-400' : 'text-amber'}`}
                                    />
                                    {f}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Tarifs */}
                <div>
                    <h2 className="mb-4 text-center text-xl font-bold text-slate-800">
                        Choisir un abonnement
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-3">
                        {PRICING.map((plan) => (
                            <Card
                                key={plan.id}
                                className={
                                    plan.recommended
                                        ? 'border-green shadow-md shadow-green/10'
                                        : ''
                                }
                            >
                                <CardContent className="space-y-4 py-6 text-center">
                                    {plan.badge && (
                                        <Badge
                                            className={`border-0 ${plan.recommended ? 'bg-green text-white' : 'bg-amber-light text-amber'}`}
                                        >
                                            {plan.badge}
                                        </Badge>
                                    )}
                                    <h3 className="font-semibold text-slate-700">
                                        {plan.label}
                                    </h3>
                                    <div>
                                        <span className="text-3xl font-bold text-green">
                                            {plan.price}
                                        </span>
                                        <span className="ml-1 text-sm text-slate-500">
                                            XOF
                                        </span>
                                        <p className="text-xs text-slate-400">
                                            {plan.period}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Button
                                            className="w-full bg-green text-white hover:bg-green-dark"
                                            disabled={!!loadingPlan}
                                            onClick={() =>
                                                handlePay(plan.id, 'wave')
                                            }
                                        >
                                            {loadingPlan ===
                                            `${plan.id}-wave` ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : null}
                                            Payer avec Wave
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full border-orange-400 text-orange-600 hover:bg-orange-50"
                                            disabled={!!loadingPlan}
                                            onClick={() => {
                                                const phone = prompt(
                                                    'Entrez votre numéro Orange Money (ex: 77 123 45 67)',
                                                );

                                                if (phone) {
                                                    handlePay(
                                                        plan.id,
                                                        'orange_money',
                                                        phone,
                                                    );
                                                }
                                            }}
                                        >
                                            {loadingPlan ===
                                            `${plan.id}-orange_money` ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : null}
                                            Orange Money
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Garantie */}
                <Card className="bg-slate-50">
                    <CardContent className="flex items-center gap-4 py-5">
                        <Zap className="h-8 w-8 shrink-0 text-green" />
                        <div>
                            <p className="font-medium text-slate-800">
                                Accès immédiat après paiement
                            </p>
                            <p className="text-sm text-slate-500">
                                Ton compte est mis à jour instantanément. En cas
                                de problème, contacte-nous à{' '}
                                <span className="text-green">
                                    support@bac-senegal.sn
                                </span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal instructions paiement */}
            {paymentModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setPaymentModal(null)}
                >
                    <Card
                        className="w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {paymentModal.provider === 'wave'
                                    ? '💙 Payer avec Wave'
                                    : '🟠 Orange Money'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-xl bg-green-xlight p-4 text-center">
                                <p className="text-sm text-slate-500">
                                    Montant
                                </p>
                                <p className="text-2xl font-bold text-green">
                                    {paymentModal.amount.toLocaleString(
                                        'fr-SN',
                                    )}{' '}
                                    XOF
                                </p>
                                <p className="text-xs text-slate-400">
                                    {paymentModal.plan}
                                </p>
                            </div>

                            {paymentModal.demo_mode && (
                                <div className="rounded-xl bg-amber-light px-3 py-2 text-xs text-amber">
                                    Mode démo — configurez les clés API en
                                    production
                                </div>
                            )}

                            {paymentModal.wave_launch_url && (
                                <div className="space-y-2">
                                    <p className="text-sm text-slate-600">
                                        Lien de paiement Wave :
                                    </p>
                                    <code className="block rounded-lg bg-slate-100 p-3 text-xs break-all">
                                        {paymentModal.wave_launch_url}
                                    </code>
                                    <Button
                                        className="w-full bg-blue-500 text-white hover:bg-blue-600"
                                        onClick={() =>
                                            window.open(
                                                paymentModal.wave_launch_url,
                                                '_blank',
                                            )
                                        }
                                    >
                                        Ouvrir Wave
                                    </Button>
                                </div>
                            )}

                            {paymentModal.ussd_code && (
                                <div className="space-y-3">
                                    <div className="rounded-xl bg-orange-50 p-3 text-center">
                                        <p className="text-xs text-slate-500">
                                            Code USSD à composer
                                        </p>
                                        <p className="mt-1 text-xl font-bold tracking-wider text-orange-600">
                                            {paymentModal.ussd_code}
                                        </p>
                                    </div>
                                    {paymentModal.instructions && (
                                        <ol className="space-y-2">
                                            {paymentModal.instructions.map(
                                                (step, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2 text-sm text-slate-600"
                                                    >
                                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600">
                                                            {i + 1}
                                                        </span>
                                                        {step}
                                                    </li>
                                                ),
                                            )}
                                        </ol>
                                    )}
                                    <p className="text-xs text-slate-400">
                                        Référence :{' '}
                                        {paymentModal.payment_id?.slice(0, 8)}
                                    </p>
                                </div>
                            )}

                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => setPaymentModal(null)}
                            >
                                Fermer
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Layout>
    );
}
