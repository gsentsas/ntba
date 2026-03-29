import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';
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
    const { selectedSerie, setSelectedSerie, setPage } = useAppStore();

    useEffect(() => {
        setPage('subjects');
    }, [setPage]);

    const { data: series = [] } = useQuery({
        queryKey: ['series'],
        queryFn: subjectsApi.series,
    });

    const subjectsQuery = useQuery({
        queryKey: ['subjects', selectedSerie],
        queryFn: () => subjectsApi.list(selectedSerie),
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
                            Programme de la série {selectedSerie}
                        </h1>
                    </div>

                    <div className="w-full md:w-56">
                        <Select
                            value={selectedSerie}
                            onValueChange={setSelectedSerie}
                        >
                            <SelectTrigger className="h-12 w-full rounded-2xl bg-white">
                                <SelectValue placeholder="Choisir une série" />
                            </SelectTrigger>
                            <SelectContent>
                                {series.map((serie) => (
                                    <SelectItem key={serie} value={serie}>
                                        {serie}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {subjectsQuery.data?.map((subject) => (
                        <Link key={subject.id} to={`/chapters/${subject.id}`}>
                            <Card className="h-full border-white/70 bg-white/90 transition hover:-translate-y-0.5 hover:shadow-lg">
                                <CardContent className="px-5 py-5">
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
                                        <span>Coeff {subject.coefficient}</span>
                                        <span>·</span>
                                        <span>
                                            {subject.chapters_count ?? 0}{' '}
                                            chapitres
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </Layout>
    );
}
