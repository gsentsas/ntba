import {
    Activity,
    BookOpen,
    BookOpenCheck,
    Bot,
    CalendarDays,
    ChartColumn,
    ClipboardList,
    Crown,
    FilePen,
    FlaskConical,
    LayoutDashboard,
    LogOut,
    MessageSquareText,
    Sparkles,
    Users,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

type SidebarItem = {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
};

const items: SidebarItem[] = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/subjects', label: 'Matières', icon: BookOpen },
    { to: '/ai-chat', label: 'Tuteur IA', icon: Sparkles },
    { to: '/internal-agent', label: 'Agent Interne', icon: Bot },
    { to: '/quiz', label: 'Quiz', icon: ClipboardList },
    { to: '/planning', label: 'Planning', icon: CalendarDays },
    { to: '/annales', label: 'Annales', icon: BookOpenCheck },
    { to: '/simulation', label: 'Simulation BAC', icon: FlaskConical },
    { to: '/stats', label: 'Statistiques', icon: ChartColumn },
    { to: '/community', label: 'Communauté', icon: MessageSquareText },
    { to: '/premium', label: 'Premium', icon: Crown },
];

const adminItems: SidebarItem[] = [
    { to: '/dashboard', label: 'Vue d’ensemble', icon: LayoutDashboard },
    { to: '/subjects', label: 'Matières', icon: BookOpen },
    { to: '/internal-agent', label: 'Agent Interne', icon: Bot },
    { to: '/quiz', label: 'Quiz', icon: ClipboardList },
    { to: '/annales', label: 'Annales', icon: BookOpenCheck },
    { to: '/community', label: 'Communauté', icon: MessageSquareText },
    { to: '/ai-chat', label: 'Tuteur IA', icon: Sparkles },
    { to: '/simulation', label: 'Simulation BAC', icon: FlaskConical },
    { to: '/admin', label: 'Panneau admin', icon: Activity },
    { to: '/admin/users', label: 'Utilisateurs', icon: Users },
    { to: '/admin/exercises', label: 'Exercices', icon: ClipboardList },
    { to: '/admin/content', label: 'Contenu', icon: FilePen },
    { to: '/admin/forum', label: 'Forum admin', icon: MessageSquareText },
];

export function Sidebar() {
    const { sidebarOpen, toggleSidebar, user, logout } = useAppStore();
    const navigate = useNavigate();
    const isAdmin = user?.role === 'admin';
    const navItems = isAdmin ? adminItems : items;

    function handleLogout() {
        logout();
        navigate('/login', { replace: true });
    }

    return (
        <aside
            className={cn(
                'fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/60 bg-[radial-gradient(circle_at_top,_rgba(29,158,117,0.16),_transparent_35%),linear-gradient(180deg,#f7f9f8_0%,#eef8f4_100%)] px-5 py-6 shadow-xl transition-transform duration-300 lg:translate-x-0',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            )}
        >
            <div className="mb-8">
                <img
                    src="/logo.png"
                    alt="Je Réussis Mon BAC"
                    className="h-auto w-44"
                />
            </div>

            <nav className="space-y-1 pb-24">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => {
                                if (sidebarOpen) {
                                    toggleSidebar();
                                }
                            }}
                            className={({ isActive }) =>
                                cn(
                                    'flex min-h-11 w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-sm font-medium transition',
                                    isActive
                                        ? 'bg-slate-950 text-white shadow-lg shadow-green/20'
                                        : 'text-slate-700 hover:bg-white hover:text-slate-950',
                                )
                            }
                        >
                            <Icon className="size-4" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="absolute right-5 bottom-6 left-5">
                <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green text-sm font-semibold text-white">
                        {user?.prenom?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                            {user?.prenom} {user?.nom}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                            {isAdmin ? 'Administrateur' : user?.serie_code}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Se déconnecter"
                    >
                        <LogOut className="size-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
