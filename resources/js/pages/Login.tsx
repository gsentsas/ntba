import { isAxiosError } from 'axios';
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading, token } = useAuth();
    const setPage = useAppStore((state) => state.setPage);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        setPage('login');
    }, [setPage]);

    useEffect(() => {
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate, token]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            await login(form);
            toast.success('Connexion réussie');
            navigate('/dashboard', { replace: true });
        } catch (error) {
            toast.error(
                isAxiosError(error)
                    ? error.response?.data?.message ?? 'Connexion impossible'
                    : 'Connexion impossible',
            );
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(29,158,117,0.18),_transparent_30%),linear-gradient(180deg,#f7f9f8_0%,#eef8f4_100%)] px-4 py-10">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="hidden rounded-[2rem] bg-slate-950 p-8 text-white lg:block">
                        <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-green-light">
                            BAC Sénégal IA
                        </div>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight">
                            Prépare ton Bac avec un coach IA pensé pour le Sénégal.
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-7 text-white/70">
                            Planning adaptatif, exercices ciblés, suivi de progression et accompagnement intelligent en français.
                        </p>
                    </div>

                    <Card className="border-white/70 bg-white/90 shadow-2xl shadow-green/10">
                        <CardHeader className="space-y-3">
                            <CardTitle className="text-3xl text-slate-950">Connexion</CardTitle>
                            <CardDescription className="text-base leading-6 text-slate-600">
                                Reprends ta révision là où tu t’es arrêté.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <label className="block space-y-2">
                                    <span className="text-sm font-medium text-slate-800">Email</span>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="email"
                                            value={form.email}
                                            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                            placeholder="test@bac-senegal.sn"
                                            required
                                        />
                                    </div>
                                </label>

                                <label className="block space-y-2">
                                    <span className="text-sm font-medium text-slate-800">Mot de passe</span>
                                    <div className="relative">
                                        <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            type="password"
                                            value={form.password}
                                            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </label>

                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-2xl bg-green text-white hover:bg-green-dark"
                                    disabled={isLoading}
                                >
                                    <span>Se connecter</span>
                                    <ArrowRight className="size-4" />
                                </Button>
                            </form>

                            <p className="mt-6 text-sm text-slate-600">
                                Pas encore de compte ?{' '}
                                <Link className="font-semibold text-green-dark hover:underline" to="/register">
                                    Créer un compte
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
