import { isAxiosError } from 'axios';
import { ArrowRight, Building2, Mail, MapPin, School, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';

export default function Register() {
    const navigate = useNavigate();
    const { register, isLoading, token } = useAuth();
    const { setSelectedSerie, setPage } = useAppStore();
    const { data: series = [] } = useQuery({ queryKey: ['series'], queryFn: subjectsApi.series });
    const [serie, setSerie] = useState('');
    const [form, setForm] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        etablissement: '',
        ville: '',
    });

    useEffect(() => {
        setPage('register');
    }, [setPage]);

    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate, token]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!serie) {
            toast.error('Choisis ta série du BAC');
            return;
        }

        try {
            await register({
                prenom: form.prenom,
                nom: form.nom,
                email: form.email,
                password: form.password,
                serie_code: serie,
            });
            setSelectedSerie(serie);
            toast.success('Compte créé avec succès !');
            navigate('/dashboard', { replace: true });
        } catch (error) {
            toast.error(
                isAxiosError(error)
                    ? error.response?.data?.message ?? 'Inscription impossible'
                    : 'Inscription impossible',
            );
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(127,119,221,0.12),_transparent_28%),radial-gradient(circle_at_top_left,_rgba(29,158,117,0.18),_transparent_34%),linear-gradient(180deg,#f7f9f8_0%,#eef8f4_100%)] px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <Card className="border-white/70 bg-white/92 shadow-2xl shadow-slate-900/5">
                        <CardHeader className="space-y-3">
                            <CardTitle className="text-3xl text-slate-950">Créer mon compte</CardTitle>
                            <CardDescription className="text-base leading-6 text-slate-600">
                                Configure ton profil de révision pour recevoir un parcours adapté à ta série.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block space-y-2">
                                        <span className="text-sm font-medium text-slate-800">Prénom *</span>
                                        <div className="relative">
                                            <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                value={form.prenom}
                                                onChange={(e) => setForm((p) => ({ ...p, prenom: e.target.value }))}
                                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                                placeholder="Aminata"
                                                required
                                            />
                                        </div>
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-sm font-medium text-slate-800">Nom *</span>
                                        <Input
                                            value={form.nom}
                                            onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
                                            className="h-12 rounded-2xl border-slate-200 bg-slate-50"
                                            placeholder="Diallo"
                                            required
                                        />
                                    </label>
                                </div>

                                <label className="block space-y-2">
                                    <span className="text-sm font-medium text-slate-800">Email *</span>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                            placeholder="eleve@exemple.sn"
                                            required
                                        />
                                    </div>
                                </label>

                                <label className="block space-y-2">
                                    <span className="text-sm font-medium text-slate-800">Mot de passe *</span>
                                    <Input
                                        type="password"
                                        value={form.password}
                                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                                        className="h-12 rounded-2xl border-slate-200 bg-slate-50"
                                        placeholder="Au moins 8 caractères"
                                        required
                                        minLength={8}
                                    />
                                </label>

                                <label className="block space-y-2">
                                    <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                                        <School className="size-4 text-green-dark" />
                                        Série du BAC *
                                    </span>
                                    <Select value={serie} onValueChange={setSerie}>
                                        <SelectTrigger className={`h-12 w-full rounded-2xl border-slate-200 bg-slate-50 ${!serie ? 'text-slate-400' : ''}`}>
                                            <SelectValue placeholder="Choisir une série" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {series.map((serie) => (
                                                <SelectItem key={serie} value={serie}>{serie}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </label>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block space-y-2">
                                        <span className="text-sm font-medium text-slate-800">
                                            Lycée / Établissement
                                        </span>
                                        <div className="relative">
                                            <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                value={form.etablissement}
                                                onChange={(e) => setForm((p) => ({ ...p, etablissement: e.target.value }))}
                                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                                placeholder="Lycée Lamine Guèye"
                                            />
                                        </div>
                                    </label>

                                    <label className="block space-y-2">
                                        <span className="text-sm font-medium text-slate-800">Ville</span>
                                        <div className="relative">
                                            <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                value={form.ville}
                                                onChange={(e) => setForm((p) => ({ ...p, ville: e.target.value }))}
                                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                                placeholder="Dakar"
                                            />
                                        </div>
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-2xl bg-green text-white hover:bg-green-dark"
                                    disabled={isLoading}
                                >
                                    <span>Créer mon compte</span>
                                    <ArrowRight className="size-4" />
                                </Button>
                            </form>

                            <p className="mt-6 text-sm text-slate-600">
                                Déjà inscrit ?{' '}
                                <Link className="font-semibold text-green-dark hover:underline" to="/login">
                                    Me connecter
                                </Link>
                            </p>
                        </CardContent>
                    </Card>

                    <div className="hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur lg:block">
                        <div className="inline-flex rounded-full bg-purple-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-purple">
                            Onboarding rapide
                        </div>
                        <h2 className="mt-6 text-4xl font-semibold leading-tight text-slate-950">
                            Ton espace se configure en moins d'une minute.
                        </h2>
                        <div className="mt-8 space-y-4">
                            {[
                                "Choisis ta série pour adapter les matières et coefficients.",
                                "Récupère un planning IA construit jusqu'au 10 juin.",
                                "Commence avec des quiz, annales et un suivi de progression réel.",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-2xl border border-white bg-white/80 px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
