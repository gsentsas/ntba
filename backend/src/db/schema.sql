-- uuid-ossp not required: gen_random_uuid() is native PostgreSQL 13+
-- pg_trgm requires superuser; trigram search not used in current queries

CREATE TABLE IF NOT EXISTS series (
    code varchar(10) PRIMARY KEY,
    name varchar(100) NOT NULL,
    description text,
    type varchar(50) NOT NULL
);

INSERT INTO series (code, name, description, type)
VALUES
    ('S1', 'Série S1', 'Série scientifique dominante sciences expérimentales', 'scientifique'),
    ('S2', 'Série S2', 'Série scientifique dominante mathématiques et physique', 'scientifique'),
    ('S1A', 'Série S1A', 'Série scientifique adaptée', 'scientifique'),
    ('S3', 'Série S3', 'Série scientifique technique', 'scientifique'),
    ('L1', 'Série L1', 'Série littéraire avec langue renforcée', 'litteraire'),
    ('L2', 'Série L2', 'Série littéraire moderne', 'litteraire'),
    ('L''1', 'Série L''1', 'Série littéraire arabe renforcée', 'litteraire'),
    ('L''2', 'Série L''2', 'Série littéraire arabe moderne', 'litteraire'),
    ('STEG', 'Série STEG', 'Sciences et techniques économiques et de gestion', 'technique'),
    ('G', 'Série G', 'Gestion', 'technique'),
    ('T', 'Série T', 'Technique', 'technique')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(255) UNIQUE NOT NULL,
    password_hash varchar(255),
    prenom varchar(100) NOT NULL,
    nom varchar(100) NOT NULL,
    serie_code varchar(10) REFERENCES series(code) DEFAULT 'S2',
    etablissement varchar(200),
    ville varchar(100),
    region varchar(100),
    role varchar(20) DEFAULT 'eleve' CHECK (role IN ('eleve', 'professeur', 'admin')),
    avatar_url varchar(500),
    streak_days int DEFAULT 0,
    longest_streak int DEFAULT 0,
    last_activity_date date,
    total_points int DEFAULT 0,
    is_premium bool DEFAULT false,
    premium_expires_at timestamp,
    push_subscription text,
    refresh_token_hash varchar(255),
    created_at timestamp DEFAULT NOW(),
    updated_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
    id uuid PRIMARY KEY,
    serie_code varchar(10) REFERENCES series(code),
    name varchar(200) NOT NULL,
    slug varchar(100) NOT NULL,
    coefficient int NOT NULL,
    icon varchar(10) DEFAULT '📚',
    color varchar(20) DEFAULT '#1D9E75',
    description text,
    order_index int DEFAULT 0,
    UNIQUE (serie_code, slug)
);

CREATE TABLE IF NOT EXISTS chapters (
    id uuid PRIMARY KEY,
    subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
    title varchar(300) NOT NULL,
    slug varchar(200),
    order_index int NOT NULL,
    course_content text,
    summary text,
    key_formulas jsonb DEFAULT '[]',
    mnemonics jsonb DEFAULT '[]',
    is_published bool DEFAULT true,
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS exercises (
    id uuid PRIMARY KEY,
    chapter_id uuid REFERENCES chapters(id) ON DELETE CASCADE,
    subject_id uuid REFERENCES subjects(id),
    type varchar(30) NOT NULL CHECK (type IN ('qcm', 'calcul', 'dissertation', 'vrai_faux', 'oral')),
    difficulty int CHECK (difficulty BETWEEN 1 AND 5),
    title varchar(300),
    question_text text NOT NULL,
    options jsonb,
    correct_answer text,
    explanation text NOT NULL,
    hints jsonb DEFAULT '[]',
    is_annale bool DEFAULT false,
    annale_year int,
    annale_session varchar(50),
    estimated_time_minutes int DEFAULT 5,
    points int DEFAULT 10,
    ai_generated bool DEFAULT false,
    created_by uuid,
    pdf_url varchar(500),
    corrige_url varchar(500),
    is_published bool DEFAULT true,
    created_at timestamp DEFAULT NOW()
);

-- Add pdf/corrigé URL columns to existing databases
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS pdf_url varchar(500);
ALTER TABLE exercises ADD COLUMN IF NOT EXISTS corrige_url varchar(500);

CREATE TABLE IF NOT EXISTS student_performances (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    exercise_id uuid REFERENCES exercises(id),
    subject_id uuid REFERENCES subjects(id),
    chapter_id uuid REFERENCES chapters(id),
    is_correct bool NOT NULL,
    attempts int DEFAULT 1,
    time_spent_seconds int,
    answer_given text,
    hints_used int DEFAULT 0,
    points_earned int DEFAULT 0,
    completed_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chapter_progress (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    chapter_id uuid REFERENCES chapters(id),
    subject_id uuid REFERENCES subjects(id),
    exercises_done int DEFAULT 0,
    exercises_correct int DEFAULT 0,
    completion_pct int DEFAULT 0,
    simulated_grade decimal(4, 2),
    last_studied_at timestamp,
    UNIQUE (user_id, chapter_id)
);

CREATE TABLE IF NOT EXISTS revision_plans (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    plan_data jsonb NOT NULL,
    bac_date date NOT NULL,
    is_active bool DEFAULT true,
    generated_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_tasks (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    plan_id uuid REFERENCES revision_plans(id),
    subject_id uuid REFERENCES subjects(id),
    chapter_id uuid REFERENCES chapters(id),
    task_type varchar(50) CHECK (task_type IN ('cours', 'exercices', 'revision', 'simulation', 'annale')),
    title varchar(300) NOT NULL,
    description text,
    estimated_minutes int NOT NULL,
    scheduled_date date NOT NULL,
    is_completed bool DEFAULT false,
    completed_at timestamp,
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_sessions (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    subject_id uuid REFERENCES subjects(id),
    chapter_id uuid REFERENCES chapters(id),
    messages jsonb DEFAULT '[]',
    total_tokens_used int DEFAULT 0,
    created_at timestamp DEFAULT NOW(),
    last_message_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_posts (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    subject_id uuid REFERENCES subjects(id),
    serie_code varchar(10),
    title varchar(500) NOT NULL,
    content text NOT NULL,
    likes_count int DEFAULT 0,
    views_count int DEFAULT 0,
    replies_count int DEFAULT 0,
    is_pinned bool DEFAULT false,
    is_resolved bool DEFAULT false,
    is_published bool DEFAULT true,
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
    id uuid PRIMARY KEY,
    post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES users(id),
    content text NOT NULL,
    likes_count int DEFAULT 0,
    is_best_answer bool DEFAULT false,
    created_at timestamp DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_likes (
    user_id uuid REFERENCES users(id),
    post_id uuid REFERENCES forum_posts(id),
    PRIMARY KEY (user_id, post_id)
);

CREATE TABLE IF NOT EXISTS payments (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    provider varchar(30) NOT NULL,
    amount int NOT NULL,
    currency varchar(10) DEFAULT 'XOF',
    status varchar(20) DEFAULT 'pending',
    provider_reference varchar(200),
    metadata jsonb,
    created_at timestamp DEFAULT NOW(),
    confirmed_at timestamp
);

CREATE INDEX IF NOT EXISTS idx_performances_user ON student_performances(user_id);
CREATE INDEX IF NOT EXISTS idx_performances_subject ON student_performances(subject_id, user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_date ON daily_tasks(user_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_exercises_chapter ON exercises(chapter_id);
CREATE INDEX IF NOT EXISTS idx_exercises_annale ON exercises(is_annale, annale_year) WHERE is_annale = true;
CREATE INDEX IF NOT EXISTS idx_forum_posts_serie ON forum_posts(serie_code, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_posts_subject ON forum_posts(subject_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON ai_sessions(user_id, last_message_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON users;
CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
