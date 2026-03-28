import { cn } from '@/lib/utils';

type ProgressBarProps = {
    value: number;
    max?: number;
    label?: string;
    className?: string;
};

export function ProgressBar({
    value,
    max = 100,
    label,
    className,
}: ProgressBarProps) {
    const safeMax = Math.max(1, max);
    const percentage = Math.max(0, Math.min(100, (value / safeMax) * 100));

    return (
        <div className={cn('space-y-2', className)}>
            {label ? (
                <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{label}</span>
                    <span className="font-semibold text-slate-900">
                        {Math.round(percentage)}%
                    </span>
                </div>
            ) : null}

            <div className="h-3 overflow-hidden rounded-full bg-green-light">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-green-dark via-green to-emerald-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
