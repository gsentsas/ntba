import type { AxiosError } from 'axios';
import axios from 'axios';
import toast from 'react-hot-toast';

import type {
    AdminStats,
    AuthPayload,
    Chapter,
    DailyTask,
    Exercise,
    ForumPost,
    ForumReply,
    GlobalProgress,
    MePayload,
    PlanningSummary,
    Subject,
    SubjectProgress,
    WeeklyActivity,
} from '@/types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? '/api',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status;

        if (status === 401) {
            window.localStorage.removeItem('token');

            if (!window.location.pathname.endsWith('/login')) {
                window.location.assign('/bac/login');
            }
        } else if (status === 403) {
            toast.error('Accès non autorisé');
        } else if (status && status >= 500) {
            toast.error('Erreur serveur, réessaie');
        }

        return Promise.reject(error);
    },
);

type ChatOptions = {
    session_id?: string | null;
    subject_id?: string | null;
    chapter_id?: string | null;
};

async function streamAiChat(
    message: string,
    options: ChatOptions = {},
    onChunk?: (text: string) => void,
): Promise<string | null> {
    const token = window.localStorage.getItem('token');
    const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? '/api'}/ai/chat`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ message, ...options }),
            credentials: 'include',
        },
    );

    if (!response.ok || !response.body) {
        throw new Error(`Erreur chat IA (${response.status})`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let sessionId: string | null = options.session_id ?? null;

    while (true) {
        const { value, done } = await reader.read();

        if (done) {
            break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
            if (!line.startsWith('data: ')) {
                continue;
            }

            const payload = JSON.parse(line.slice(6)) as {
                text?: string;
                done?: boolean;
                session_id?: string;
            };

            if (payload.text) {
                onChunk?.(payload.text);
            }

            if (payload.done) {
                sessionId = payload.session_id ?? sessionId;
            }
        }
    }

    return sessionId;
}

export const authApi = {
    register: async (payload: {
        email: string;
        password: string;
        prenom: string;
        nom: string;
        serie_code: string;
    }) => (await api.post<AuthPayload>('/auth/register', payload)).data,
    login: async (payload: { email: string; password: string }) =>
        (await api.post<AuthPayload>('/auth/login', payload)).data,
    refresh: async (refreshToken: string) =>
        (await api.post<{ token: string }>('/auth/refresh', { refreshToken }))
            .data,
    me: async () => (await api.get<MePayload>('/auth/me')).data,
    updateProfile: async (payload: Record<string, unknown>) =>
        (await api.patch<{ user: MePayload['user'] }>('/auth/profile', payload))
            .data,
    subscribePush: async (push_subscription: unknown) =>
        (
            await api.post<{ success: boolean }>('/auth/push-subscribe', {
                push_subscription,
            })
        ).data,
};

export const subjectsApi = {
    list: async (serie?: string) =>
        (
            await api.get<Subject[]>('/subjects', {
                params: { serie_code: serie },
            })
        ).data,
    series: async () => (await api.get<string[]>('/subjects/series')).data,
    get: async (id: string) => (await api.get<Subject>(`/subjects/${id}`)).data,
    chapters: async (id: string) =>
        (await api.get<Chapter[]>(`/subjects/${id}/chapters`)).data,
    chapter: async (id: string) =>
        (await api.get<Chapter>(`/chapters/${id}`)).data,
};

export const exercisesApi = {
    list: async (params: Record<string, unknown>) =>
        (await api.get<Exercise[]>('/exercises', { params })).data,
    annales: async (params: Record<string, unknown>) =>
        (
            await api.get<
                Array<{ year: number; subject: Subject; exercises: Exercise[] }>
            >('/exercises/annales', { params })
        ).data,
    get: async (id: string) =>
        (await api.get<Exercise>(`/exercises/${id}`)).data,
    submit: async (
        id: string,
        data: {
            answer: string;
            time_spent_seconds: number;
            hints_used: number;
        },
    ) =>
        (
            await api.post<{
                is_correct: boolean;
                points_earned: number;
                correct_answer: string;
                explanation: string;
            }>(`/exercises/${id}/submit`, data)
        ).data,
    hint: async (id: string, hintsUsed = 0) =>
        (
            await api.get<{ hint: string | null; remaining: number }>(
                `/exercises/${id}/hint`,
                { params: { hints_used: hintsUsed } },
            )
        ).data,
};

export const aiApi = {
    chat: streamAiChat,
    generateExercise: async (payload: {
        subject_id: string;
        chapter_id: string;
        difficulty: number;
        type: string;
    }) => (await api.post<Exercise>('/ai/generate-exercise', payload)).data,
    summary: async (chapterId: string) =>
        (
            await api.post<{ summary: string }>('/ai/summary', {
                chapter_id: chapterId,
            })
        ).data,
    correctPhoto: async (payload: {
        image_base64: string;
        media_type: string;
        subject_id?: string | null;
    }) =>
        (
            await api.post<{
                correction: string;
                note_estimee: number;
                points_a_retravailler: string[];
            }>('/ai/correct-photo', payload)
        ).data,
    simulate: async (subjectId: string) =>
        (
            await api.post<{
                subject_text: string;
                correction_key: string;
                duration_minutes: number;
            }>('/ai/simulate', { subject_id: subjectId })
        ).data,
};

export const planningApi = {
    today: async () =>
        (
            await api.get<{
                tasks: DailyTask[];
                stats: {
                    completed_ratio: string;
                    minutes_remaining: number;
                    total: number;
                    completed: number;
                };
            }>('/planning/today')
        ).data,
    week: async (startDate?: string) =>
        (
            await api.get<Record<string, DailyTask[]>>('/planning/week', {
                params: { start_date: startDate },
            })
        ).data,
    generate: async () =>
        (await api.post<PlanningSummary>('/planning/generate')).data,
    completeTask: async (id: string) =>
        (
            await api.patch<{
                success: boolean;
                points_earned: number;
                all_done_today: boolean;
            }>(`/planning/tasks/${id}/complete`, {})
        ).data,
    deleteTask: async (id: string) =>
        (await api.delete<{ success: boolean }>(`/planning/tasks/${id}`)).data,
};

export const progressApi = {
    global: async () =>
        (await api.get<GlobalProgress>('/progress/global')).data,
    subjects: async () =>
        (await api.get<SubjectProgress[]>('/progress/subjects')).data,
    weeklyActivity: async () =>
        (await api.get<WeeklyActivity[]>('/progress/weekly-activity')).data,
    achievements: async () =>
        (await api.get<string[]>('/progress/achievements')).data,
};

export const communityApi = {
    posts: async (params: Record<string, unknown>) =>
        (await api.get<ForumPost[]>('/community/posts', { params })).data,
    post: async (id: string) =>
        (
            await api.get<{ post: ForumPost; replies: ForumReply[] }>(
                `/community/posts/${id}`,
            )
        ).data,
    createPost: async (data: Record<string, unknown>) =>
        (await api.post<ForumPost>('/community/posts', data)).data,
    reply: async (postId: string, content: string) =>
        (
            await api.post<ForumReply>(`/community/posts/${postId}/replies`, {
                content,
            })
        ).data,
    like: async (postId: string) =>
        (
            await api.post<{ liked: boolean; likes_count: number }>(
                `/community/posts/${postId}/like`,
            )
        ).data,
    resolve: async (postId: string) =>
        (
            await api.patch<{ id: string; is_resolved: boolean }>(
                `/community/posts/${postId}/resolve`,
            )
        ).data,
};

export const paymentsApi = {
    initiate: async (data: {
        plan: string;
        provider: string;
        phone?: string;
    }) => (await api.post('/payments/initiate', data)).data,
    status: async (id: string) =>
        (await api.get(`/payments/status/${id}`)).data,
    history: async () => (await api.get('/payments/history')).data,
    confirm: async (id: string) =>
        (await api.post(`/payments/confirm/${id}`)).data,
};

export const adminApi = {
    stats: async () => (await api.get<AdminStats>('/admin/stats')).data,
    users: async (params: Record<string, unknown>) =>
        (
            await api.get<{
                page: number;
                limit: number;
                data: MePayload['user'][];
            }>('/admin/users', { params })
        ).data,
    updateUser: async (id: string, data: Record<string, unknown>) =>
        (await api.patch(`/admin/users/${id}`, data)).data,
    exercises: async (params: Record<string, unknown>) =>
        (
            await api.get<{ page: number; limit: number; data: Exercise[] }>(
                '/admin/exercises',
                { params },
            )
        ).data,
    createExercise: async (data: Record<string, unknown>) =>
        (await api.post<Exercise>('/admin/exercises', data)).data,
    updateExercise: async (id: string, data: Record<string, unknown>) =>
        (await api.patch<Exercise>(`/admin/exercises/${id}`, data)).data,
    deleteExercise: async (id: string) =>
        (
            await api.delete<{ id: string; is_published: boolean }>(
                `/admin/exercises/${id}`,
            )
        ).data,
    importAnnale: async (data: Record<string, unknown>) =>
        (await api.post('/admin/import-annale', data)).data,
    forumPosts: async (params: Record<string, unknown>) =>
        (await api.get<ForumPost[]>('/admin/forum', { params })).data,
    moderatePost: async (id: string, data: Record<string, unknown>) =>
        (await api.patch(`/admin/forum/posts/${id}`, data)).data,
};

export { api };
