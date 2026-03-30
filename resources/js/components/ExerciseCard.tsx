import { BookOpen, Bot, Clock, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Exercise } from '@/types';

type Props = {
    exercise: Exercise;
    /** Si true, affiche un bouton "Faire l'exercice" qui ouvre le quiz */
    showAction?: boolean;
    /** Appelé quand l'utilisateur clique sur "Faire l'exercice" */
    onStart?: (exercise: Exercise) => void;
    /** Résultat affiché si l'exercice a déjà été fait */
    result?: { is_correct: boolean; points_earned: number } | null;
};

const DIFFICULTY_LABEL: Record<number, string> = {
    1: 'Très facile',
    2: 'Facile',
    3: 'Moyen',
    4: 'Difficile',
    5: 'Expert',
};

const TYPE_LABEL: Record<string, string> = {
    qcm: 'QCM',
    calcul: 'Calcul',
    dissertation: 'Dissertation',
    vrai_faux: 'Vrai / Faux',
    oral: 'Oral',
};

export default function ExerciseCard({
    exercise,
    showAction = true,
    onStart,
    result,
}: Props) {
    const diffLabel =
        DIFFICULTY_LABEL[exercise.difficulty] ??
        `Niveau ${exercise.difficulty}`;
    const typeLabel = TYPE_LABEL[exercise.type] ?? exercise.type;
    const stars =
        '★'.repeat(exercise.difficulty) + '☆'.repeat(5 - exercise.difficulty);

    return (
        <Card
            className={`border-white/70 bg-white/90 transition hover:-translate-y-0.5 hover:shadow-md ${result?.is_correct ? 'border-green/40' : result ? 'border-red-300' : ''}`}
        >
            <CardContent className="space-y-3 px-5 py-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                        {exercise.serie_code && (
                            <Badge className="border-0 bg-slate-100 text-xs text-slate-700">
                                {exercise.serie_code}
                            </Badge>
                        )}
                        <Badge className="border-0 bg-green-light text-xs text-green-dark">
                            {typeLabel}
                        </Badge>
                        {exercise.is_annale && (
                            <Badge className="border-0 bg-amber-light text-xs text-amber">
                                Annale {exercise.annale_year}
                            </Badge>
                        )}
                        {exercise.ai_generated && (
                            <Badge className="border-0 bg-purple-light text-xs text-purple">
                                ✦ IA
                            </Badge>
                        )}
                    </div>

                    {result && (
                        <span
                            className={`text-xs font-semibold ${result.is_correct ? 'text-green' : 'text-red-500'}`}
                        >
                            {result.is_correct
                                ? `+${result.points_earned} pts`
                                : '✗ Incorrect'}
                        </span>
                    )}
                </div>

                {/* Matière / Chapitre */}
                {(exercise.subject_name || exercise.chapter_title) && (
                    <p className="text-xs text-slate-400">
                        {exercise.subject_name}
                        {exercise.chapter_title
                            ? ` · ${exercise.chapter_title}`
                            : ''}
                    </p>
                )}

                {/* Titre */}
                <p className="text-sm leading-snug font-semibold text-slate-900">
                    {exercise.title || exercise.question_text.slice(0, 80)}
                </p>

                {/* Extrait de la question */}
                {exercise.title && (
                    <p className="line-clamp-2 text-xs leading-5 text-slate-500">
                        {exercise.question_text}
                    </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span title={diffLabel} className="text-amber">
                            {stars}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {exercise.estimated_time_minutes ?? 5} min
                        </span>
                        <span className="flex items-center gap-1">
                            <Lightbulb className="h-3 w-3" />
                            {exercise.hints?.length ?? 0} indice
                            {(exercise.hints?.length ?? 0) > 1 ? 's' : ''}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/internal-agent?subject=${exercise.subject_id}&chapter=${exercise.chapter_id}&exercise=${exercise.id}`}
                        >
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-3 py-1 text-xs"
                            >
                                <Bot className="h-3 w-3" />
                                Agent
                            </Button>
                        </Link>

                        {showAction &&
                            (onStart ? (
                                <Button
                                    size="sm"
                                    onClick={() => onStart(exercise)}
                                    className="h-7 bg-green px-3 py-1 text-xs text-white hover:bg-green-dark"
                                >
                                    Faire
                                </Button>
                            ) : (
                                <Link to="/quiz">
                                    <Button
                                        size="sm"
                                        className="h-7 bg-green px-3 py-1 text-xs text-white hover:bg-green-dark"
                                    >
                                        <BookOpen className="h-3 w-3" />
                                        Quiz
                                    </Button>
                                </Link>
                            ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
