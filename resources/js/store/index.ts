import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { BacUser, DailyTask, GlobalProgress } from '@/types';

type AppState = {
    token: string | null;
    user: BacUser | null;
    selectedSerie: string;
    currentPage: string;
    activeChatSubjectId: string | null;
    currentSessionId: string | null;
    todayTasks: DailyTask[];
    globalProgress: GlobalProgress | null;
    sidebarOpen: boolean;
    setUser: (user: BacUser | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    setPage: (page: string) => void;
    setSelectedSerie: (serie: string) => void;
    setActiveChatSubject: (id: string | null) => void;
    setCurrentSessionId: (id: string | null) => void;
    clearChatSession: () => void;
    setTodayTasks: (tasks: DailyTask[]) => void;
    setGlobalProgress: (progress: GlobalProgress | null) => void;
    toggleSidebar: () => void;
};

type PersistedState = Pick<AppState, 'token' | 'user' | 'selectedSerie'>;

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            selectedSerie: 'S2',
            currentPage: 'dashboard',
            activeChatSubjectId: null,
            currentSessionId: null,
            todayTasks: [],
            globalProgress: null,
            sidebarOpen: false,
            setUser: (user) =>
                set((state) => ({
                    user,
                    selectedSerie:
                        user && user.role !== 'admin'
                            ? user.serie_code
                            : state.selectedSerie,
                })),
            setToken: (token) => {
                if (typeof window !== 'undefined') {
                    if (token) {
                        window.localStorage.setItem('token', token);
                    } else {
                        window.localStorage.removeItem('token');
                    }
                }

                set({ token });
            },
            logout: () => {
                if (typeof window !== 'undefined') {
                    window.localStorage.removeItem('token');
                }

                set({
                    token: null,
                    user: null,
                    selectedSerie: 'S2',
                    activeChatSubjectId: null,
                    currentSessionId: null,
                    todayTasks: [],
                    globalProgress: null,
                });
            },
            setPage: (currentPage) => set({ currentPage }),
            setSelectedSerie: (selectedSerie) =>
                set((state) => ({
                    selectedSerie:
                        state.user && state.user.role !== 'admin'
                            ? state.user.serie_code
                            : selectedSerie,
                })),
            setActiveChatSubject: (activeChatSubjectId) =>
                set({
                    activeChatSubjectId,
                    currentSessionId: null,
                }),
            setCurrentSessionId: (currentSessionId) =>
                set({ currentSessionId }),
            clearChatSession: () => set({ currentSessionId: null }),
            setTodayTasks: (todayTasks) => set({ todayTasks }),
            setGlobalProgress: (globalProgress) => set({ globalProgress }),
            toggleSidebar: () =>
                set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        }),
        {
            name: 'bac-senegal-store',
            partialize: (state): PersistedState => ({
                token: state.token,
                user: state.user,
                selectedSerie: state.selectedSerie,
            }),
        },
    ),
);
