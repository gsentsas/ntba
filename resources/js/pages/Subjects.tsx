import { useQuery } from '@tanstack/react-query';
import {
    BookOpenCheck,
    Bot,
    ChevronRight,
    ClipboardList,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { subjectsApi } from '@/services/api';
import { useAppStore } from '@/store';

export default function Subjects() {
    const { selectedSerie, setSelectedSerie, setPage, user } = useAppStore();
    const isAdmin = user?.role === 'admin';
    const effectiveSerie = isAdmin
        ? selectedSerie
        : user?.serie_code || selectedSerie;
    const selectedSerieValue = selectedSerie || '__all__';

    useEffect(() => {
        setPage('subjects');
    }, [setPage]);

    const { data: series = [] } = useQuery({
        queryKey: ['series'],
        queryFn: subjectsApi.series,
    });

    const subjectsQuery = useQuery({
        queryKey: ['subjects', effectiveSerie],
        queryFn: () => subjectsApi.list(effectiveSerie),
    });

    return (
        <Layout>
            <section className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold tracking-[0.16em] text-green-dark uppercase">
                            Matières
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold text-slate-950">
                            {effectiveSerie
                                ? `Programme de la série ${effectiveSerie}`
                                : 'Programme de toutes les séries'}
                        </h1>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            <Badge className="border-0 bg-slate-900 text-white">
                                {effectiveSerie
                                    ? `Série active ${effectiveSerie}`
                                    : 'Toutes les séries'}
                            </Badge>
                            {user?.serie_code ? (
                                <Badge className="border-0 bg-green-light text-green-dark">
                                    Série élève {user.serie_code}
                                </Badge>
                            ) : null}
                        </div>
                    </div>

                    {isAdmin ? (
                        <div className="w-full md:w-56">
                            <Select
                                value={selectedSerieValue}
                                onValueChange={(value) =>
                                    setSelectedSerie(
                                        value === '__all__' ? '' : value,
                                    )
                                }
                            >
                                <SelectTrigger className="h-12 w-full rounded-2xl bg-white">
                                    <SelectValue placeholder="Choisir une série" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="__all__">
                                        Toutes les séries
                                    </SelectItem>
                                    {series.map((serie) => (
                                        <SelectItem key={serie} value={serie}>
                                            {serie}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-white/70 bg-white/90">
                        <CardContent className="flex items-center justify-between gap-4 px-5 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-green-xlight text-green-dark">
                                    <ClipboardList className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-950">
                                        {effectiveSerie
                                            ? `Quiz de la série ${effectiveSerie}`
                                            : 'Quiz de toutes les séries'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Commencer les quiz filtrés par matière
                                        et par série
                                    </p>
                                </div>
                            </div>
                            <Link to="/quiz">
                                <Button className="rounded-2xl bg-green text-white hover:bg-green-dark">
                                    Quiz
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-white/70 bg-white/90">
                        <CardContent className="flex items-center justify-between gap-4 px-5 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-light text-amber-700">
                                    <BookOpenCheck className="size-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-950">
                                        {effectiveSerie
                                            ? `Annales de la série ${effectiveSerie}`
                                            : 'Annales de toutes les séries'}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        Retrouver les sujets officiels de cette
                                        sélection
                                    </p>
                                </div>
                            </div>
                            <Link to="/annales">
                                <Button
                                    variant="outline"
                                    className="rounded-2xl"
                                >
                                    Annales
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-green/20 bg-[linear-gradient(135deg,#eef8f4_0%,#ffffff_100%)]">
                    <CardContent className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-2xl bg-green text-white">
                                <Bot className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-950">
                                    Agent interne de révision
                                </p>
                                <p className="text-xs text-slate-500">
                                    Prépare une fiche PDF, un exercice ciblé ou
                                    une correction à partir de ta série.
                                </p>
                            </div>
                        </div>
                        <Link to="/internal-agent?action=study-pack">
                            <Button className="rounded-2xl bg-green text-white hover:bg-green-dark">
                                Ouvrir l’agent
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {subjectsQuery.data?.map((subject) => (
                        <Card
                            key={subject.id}
                            className="h-full border-white/70 bg-white/90 transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <CardContent className="flex h-full flex-col px-5 py-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div
                                            className="inline-flex size-12 items-center justify-center rounded-2xl text-2xl"
                                            style={{
                                                backgroundColor: `${subject.color}22`,
                                            }}
                                        >
                                            {subject.icon}
                                        </div>
                                        <h2 className="mt-4 text-xl font-semibold text-slate-950">
                                            {subject.name}
                                        </h2>
                                    </div>
                                    <ChevronRight className="mt-1 size-4 text-slate-400" />
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {subject.description}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                                        {subject.serie_code}
                                    </span>
                                    <span>·</span>
                                    <span>Coeff {subject.coefficient}</span>
                                    <span>·</span>
                                    <span>
                                        {subject.chapters_count ?? 0} chapitres
                                    </span>
                                </div>

                                <div className="mt-5 grid gap-2 md:grid-cols-2">
                                    <Link to={`/chapters/${subject.id}`}>
                                        <Button className="w-full rounded-2xl bg-green text-white hover:bg-green-dark">
                                            Ouvrir le cours
                                        </Button>
                                    </Link>
                                    <Link
                                        to={`/internal-agent?subject=${subject.id}&action=study-pack`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full rounded-2xl"
                                        >
                                            Agent de la matière
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
