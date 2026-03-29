import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';

import AdminContent from '@/pages/admin/AdminContent';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminExercises from '@/pages/admin/AdminExercises';
import AdminForum from '@/pages/admin/AdminForum';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminUsers from '@/pages/admin/AdminUsers';
import AIChat from '@/pages/AIChat';
import Annales from '@/pages/Annales';
import ChapterDetail from '@/pages/ChapterDetail';
import Community from '@/pages/Community';
import Dashboard from '@/pages/dashboard';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Subjects from '@/pages/Subjects';
import Quiz from '@/pages/Quiz';
import Planning from '@/pages/Planning';
import Stats from '@/pages/Stats';
import Simulation from '@/pages/Simulation';
import Premium from '@/pages/Premium';
import { useAppStore } from '@/store';

function PrivateRoute() {
    const token = useAppStore((state) => state.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default function App() {
    const queryClient = useMemo(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: { retry: 1, staleTime: 30_000 },
                },
            }),
        [],
    );

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/bac">
                <Routes>
                    {/* Page d'accueil */}
                    <Route path="/" element={<Landing />} />

                    {/* Pages publiques */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Pages privées élève */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/subjects" element={<Subjects />} />
                        <Route
                            path="/chapters/:id"
                            element={<ChapterDetail />}
                        />
                        <Route path="/ai-chat" element={<AIChat />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/planning" element={<Planning />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/annales" element={<Annales />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/premium" element={<Premium />} />
                    </Route>

                    {/* Pages admin (layout séparé) */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="exercises" element={<AdminExercises />} />
                        <Route path="content" element={<AdminContent />} />
                        <Route path="forum" element={<AdminForum />} />
                    </Route>

                    {/* Redirection par défaut */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>

            <Toaster
                position="top-right"
                toastOptions={{
                    style: { borderRadius: 12, fontSize: 14 },
                    success: {
                        iconTheme: { primary: '#1D9E75', secondary: '#fff' },
                    },
                }}
            />
        </QueryClientProvider>
    );
}
