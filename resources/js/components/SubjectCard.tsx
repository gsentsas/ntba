import { ArrowRight, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progress-bar';
import type { SubjectProgress } from '@/types';

type SubjectCardProps = {
    item: SubjectProgress;
};

export default function SubjectCard({ item }: SubjectCardProps) {
    const urgent = item.simulated_grade > 0 && item.simulated_grade < 10;

    return (
        <article className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-bac-bg px-3 py-1 text-xs font-semibold tracking-[0.16em] text-slate-700 uppercase">
                        <span>{item.subject.icon}</span>
                        <span>{item.subject.name}</span>
                    </div>
                    <div className="mt-3">
                        <Badge className="border-0 bg-slate-100 text-slate-700">
                            {item.subject.serie_code}
                        </Badge>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                        Coefficient {item.subject.coefficient} ·{' '}
                        {item.chapters_done}/{item.chapters_total} chapitres
                        maîtrisés
                    </p>
                </div>

                {urgent ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-light px-3 py-1 text-xs font-semibold text-coral">
                        <TriangleAlert className="size-3.5" />
                        Urgence
                    </div>
                ) : null}
            </div>

            <div className="mt-5 space-y-4">
                <ProgressBar value={item.completion_pct} label="Progression" />

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-bac-bg p-3">
                        <p className="text-slate-500">Moyenne simulée</p>
                        <p className="mt-1 text-lg font-semibold text-slate-950">
                            {item.simulated_grade.toFixed(1)}/20
                        </p>
                    </div>
                    <div className="rounded-2xl bg-bac-bg p-3">
                        <p className="text-slate-500">Exercices</p>
                        <p className="mt-1 text-lg font-semibold text-slate-950">
                            {item.exercises_correct}/{item.exercises_done}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                <Link to={`/chapters/${item.subject.id}`}>
                    <Button className="rounded-2xl bg-green text-white hover:bg-green-dark">
                        Ouvrir le cours
                        <ArrowRight className="size-4" />
                    </Button>
                </Link>
                <Link to={`/quiz?subject=${item.subject.id}`}>
                    <Button
                        variant="outline"
                        className="rounded-2xl border-green/30 text-green-dark hover:bg-green-xlight"
                    >
                        Quiz matière
                    </Button>
                </Link>
                <Link to={`/annales?subject=${item.subject.id}`}>
                    <Button variant="outline" className="rounded-2xl">
                        Annales
                    </Button>
                </Link>
            </div>
        </article>
    );
}
