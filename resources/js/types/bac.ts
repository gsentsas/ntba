export type BacRole = 'eleve' | 'professeur' | 'admin';
export type ExerciseType =
    | 'qcm'
    | 'calcul'
    | 'dissertation'
    | 'vrai_faux'
    | 'oral';
export type PlanningTaskType =
    | 'cours'
    | 'exercices'
    | 'revision'
    | 'simulation'
    | 'annale';

export type BacUser = {
    id: string;
    email: string;
    prenom: string;
    nom: string;
    serie_code: string;
    etablissement?: string | null;
    ville?: string | null;
    region?: string | null;
    role: BacRole;
    avatar_url?: string | null;
    streak_days: number;
    longest_streak: number;
    last_activity_date?: string | null;
    total_points: number;
    is_premium: boolean;
    premium_expires_at?: string | null;
    push_subscription?: string | null;
    created_at: string;
    updated_at: string;
};

export type Subject = {
    id: string;
    serie_code: string;
    name: string;
    slug: string;
    coefficient: number;
    icon: string;
    color: string;
    description?: string | null;
    order_index: number;
    chapters_count?: number;
};

export type Chapter = {
    id: string;
    subject_id: string;
    title: string;
    slug: string;
    order_index: number;
    course_content?: string | null;
    summary?: string | null;
    key_formulas: string[];
    mnemonics: string[];
    is_published: boolean;
    created_at: string;
    subject_name?: string;
    serie_code?: string;
    coefficient?: number;
};

export type ExerciseOption = {
    label: 'A' | 'B' | 'C' | 'D';
    text: string;
};

export type Exercise = {
    id: string;
    chapter_id: string;
    subject_id: string;
    type: ExerciseType;
    difficulty: number;
    title: string;
    question_text: string;
    options: ExerciseOption[];
    correct_answer?: string | null;
    explanation: string;
    hints: string[];
    is_annale: boolean;
    annale_year?: number | null;
    annale_session?: string | null;
    estimated_time_minutes: number;
    points: number;
    ai_generated?: boolean;
    created_by?: string | null;
    is_published?: boolean;
    created_at?: string;
    subject_name?: string;
    subject_icon?: string;
    serie_code?: string;
    chapter_title?: string;
    pdf_url?: string | null;
    corrige_url?: string | null;
};

export type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export type DailyTask = {
    id: string;
    user_id: string;
    plan_id: string;
    subject_id?: string | null;
    chapter_id?: string | null;
    task_type: PlanningTaskType;
    title: string;
    description?: string | null;
    estimated_minutes: number;
    scheduled_date: string;
    is_completed: boolean;
    completed_at?: string | null;
    created_at: string;
    subject_name?: string | null;
    chapter_title?: string | null;
};

export type GlobalProgress = {
    overall_pct: number;
    simulated_average: number;
    total_exercises_done: number;
    total_correct: number;
    accuracy_rate: number;
    streak_days: number;
    total_points: number;
    days_until_bac: number;
};

export type SubjectProgress = {
    subject: Subject;
    completion_pct: number;
    simulated_grade: number;
    exercises_done: number;
    exercises_correct: number;
    chapters_done: number;
    chapters_total: number;
    weak_chapters: Array<{
        chapter_title: string;
        error_rate: number;
    }>;
};

export type WeeklyActivity = {
    date: string;
    exercises_done: number;
    minutes_studied: number;
    points_earned: number;
};

export type AuthPayload = {
    token: string;
    refreshToken: string;
    user: BacUser;
};

export type MePayload = {
    user: BacUser;
    stats: {
        total_exercises_done: number;
        global_completion_pct: number;
        simulated_average: number;
        days_until_bac: number;
        today_tasks_count: number;
        today_tasks_done: number;
    };
};

export type PlanningSummary = {
    plan_id: string;
    days_left: number;
    tasks_created: number;
    schedule_overview: Array<{
        subject_id: string;
        subject_name: string;
        coefficient: number;
        average: number;
        level: number;
        priority: number;
        minimum_hours: number;
        allocated_minutes: number;
    }>;
};

export type ForumPost = {
    id: string;
    user_id: string;
    subject_id?: string | null;
    serie_code: string;
    title: string;
    content: string;
    likes_count: number;
    views_count: number;
    replies_count: number;
    is_pinned: boolean;
    is_resolved: boolean;
    is_published: boolean;
    created_at: string;
    subject_name?: string | null;
    liked_by_user?: boolean;
    author_name?: string | null;
};

export type ForumReply = {
    id: string;
    post_id: string;
    user_id?: string | null;
    content: string;
    likes_count: number;
    is_best_answer: boolean;
    created_at: string;
    author_name?: string | null;
};

export type AdminStats = {
    total_users: number;
    new_users_today: number;
    new_users_week: number;
    total_exercises: number;
    total_ai_sessions: number;
    total_ai_tokens: number;
    premium_users: number;
    premium_revenue_xof: number;
    active_today: number;
    series_distribution: Array<{ code: string; count: number; pct: number }>;
    hardest_chapters: Array<{
        title: string;
        subject: string;
        error_rate: number;
        attempts: number;
    }>;
    daily_active_users: Array<{ date: string; count: number }>;
};
