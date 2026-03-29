import { Clock3, SquareCheckBig } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DailyTask } from '@/types';

type TaskItemProps = {
    task: DailyTask;
    onToggle?: (taskId: string) => Promise<unknown> | void;
    disabled?: boolean;
};

export default function TaskItem({
    task,
    onToggle,
    disabled = false,
}: TaskItemProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-4 rounded-2xl border px-4 py-4 transition',
                task.is_completed
                    ? 'border-green-light bg-green-xlight'
                    : 'border-slate-200 bg-white',
            )}
        >
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                    <span>{task.title}</span>
                    {task.subject_name ? (
                        <span className="rounded-full bg-bac-bg px-2 py-0.5 text-xs text-slate-600">
                            {task.subject_name}
                        </span>
                    ) : null}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                    {task.description ?? 'Révision planifiée'}
                </p>
                <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Clock3 className="size-3.5" />
                    <span>{task.estimated_minutes} min</span>
                    {task.chapter_title ? (
                        <span>· {task.chapter_title}</span>
                    ) : null}
                </div>
            </div>

            <Button
                type="button"
                variant={task.is_completed ? 'secondary' : 'outline'}
                className="shrink-0 rounded-2xl"
                onClick={() => onToggle?.(task.id)}
                disabled={disabled || task.is_completed}
            >
                <SquareCheckBig className="size-4" />
                {task.is_completed ? 'Fait' : 'Valider'}
            </Button>
        </div>
    );
}
