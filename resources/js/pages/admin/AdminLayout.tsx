import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { BookOpen, FileEdit, LayoutDashboard, MessageSquare, Users } from 'lucide-react';

import { useAppStore } from '@/store';

const NAV_ITEMS = [
    { to: '/admin', icon: LayoutDashboard, label: 'Tableau de bord', end: true },
    { to: '/admin/users', icon: Users, label: 'Utilisateurs' },
    { to: '/admin/exercises', icon: BookOpen, label: 'Exercices' },
    { to: '/admin/content', icon: FileEdit, label: 'Contenu' },
    { to: '/admin/forum', icon: MessageSquare, label: 'Forum' },
];

export default function AdminLayout() {
    const user = useAppStore((state) => state.user);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex min-h-screen bg-slate-900">
            {/* Sidebar admin */}
            <aside className="w-64 shrink-0 border-r border-slate-800 bg-slate-950 px-4 py-6">
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Back-office</p>
                    <img src="/logo.png" alt="Je Réussis Mon BAC" className="mt-3 w-36 h-auto brightness-0 invert" />
                </div>

                <nav className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-green text-white'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto pt-8">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300"
                    >
                        ← Retour à l'app
                    </NavLink>
                </div>
            </aside>

            {/* Contenu */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
