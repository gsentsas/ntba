import { Sidebar } from '@/components/Layout/Sidebar';
import { Topbar } from '@/components/Layout/Topbar';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

type LayoutProps = {
    children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
    const { sidebarOpen, toggleSidebar } = useAppStore();

    return (
        <div className="min-h-screen bg-bac-bg text-slate-950">
            <Sidebar />

            {sidebarOpen ? (
                <button
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden"
                />
            ) : null}

            <div className={cn('min-h-screen lg:pl-72')}>
                <Topbar />

                <main className="px-4 py-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
