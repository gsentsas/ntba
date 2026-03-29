import { Bell, Flame, PanelLeftClose, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

export function Topbar() {
    const { user, globalProgress, toggleSidebar } = useAppStore();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-white/60 bg-white/85 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    className="lg:hidden"
                >
                    <PanelLeftClose className="size-4" />
                </Button>

                <div>
                    <p className="text-xs font-semibold tracking-[0.16em] text-green-dark uppercase">
                        Session du jour
                    </p>
                    <h1 className="text-lg font-semibold text-slate-950">
                        Bonjour {user?.prenom ?? 'élève'}
                    </h1>
                </div>
            </div>

            <div className="hidden min-w-[280px] flex-1 items-center justify-center md:flex">
                <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
                    <Search className="size-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                        Rechercher une matière, un chapitre ou une annale
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden rounded-full bg-amber-light px-3 py-2 text-sm font-medium text-slate-900 sm:flex sm:items-center sm:gap-2">
                    <Flame className="size-4 text-coral" />
                    <span>
                        {globalProgress?.streak_days ?? user?.streak_days ?? 0}{' '}
                        jours
                    </span>
                </div>

                <button
                    type="button"
                    className={cn(
                        'relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:text-slate-950',
                    )}
                >
                    <Bell className="size-4" />
                </button>
            </div>
        </header>
    );
}
