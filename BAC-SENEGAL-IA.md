╔══════════════════════════════════════════════════════════════════════════════╗
║              PROMPT MAÎTRE — BAC SÉNÉGAL IA                                ║
║              Pour Claude Code · Codex · Cursor · Windsurf                  ║
║              Version production complète — Mars 2026                       ║
╚══════════════════════════════════════════════════════════════════════════════╝

Tu es un développeur full-stack senior. Ta mission est de construire
"BAC Sénégal IA" — une plateforme éducative complète permettant à tous
les élèves sénégalais de préparer leur Baccalauréat avec un tuteur IA
basé sur Claude. L'application doit être prête pour la production.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 0 — RÈGLES DE TRAVAIL POUR L'AGENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. TOUJOURS créer les fichiers réels — ne jamais simuler ou afficher du pseudo-code
2. TOUJOURS valider que chaque fichier est syntaxiquement correct avant de passer au suivant
3. TOUJOURS installer les dépendances avec npm install ou pip install avant d'utiliser un module
4. Construire dans l'ORDRE EXACT défini en Section 4
5. Après chaque étape majeure, lancer les tests pour valider avant de continuer
6. Si une erreur survient, la corriger IMMÉDIATEMENT avant de continuer
7. Commenter le code en français pour les règles métier
8. Ne jamais mettre de secrets en dur — toujours utiliser les variables d'environnement
9. Confirmer à chaque étape terminée avec : ✅ [NOM ÉTAPE] — OK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — STACK TECHNIQUE EXACTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BACKEND
Runtime     : Node.js 20 LTS
Framework   : Express 4.x
Base de données : PostgreSQL 15 (via pg@8)
Cache       : Redis (via ioredis@5)
ORM         : Pas d'ORM — SQL pur avec pg Pool
Auth        : JWT (jsonwebtoken@9) + bcryptjs@2
Validation  : Zod@3
IA          : @anthropic-ai/sdk (dernière version)
Upload      : multer@1
Cron        : node-cron@3
Push        : web-push@3
Sécurité    : helmet@7 + express-rate-limit@7 + cors@2

FRONTEND
Framework   : React 18 + TypeScript 5
Build       : Vite 5
Styles      : Tailwind CSS 3 + postcss
Routing     : react-router-dom@6
State       : Zustand@4 + persist middleware
Data        : @tanstack/react-query@5
HTTP        : axios@1
Markdown    : react-markdown@9 + remark-gfm
Notifications: react-hot-toast@2
Icônes      : lucide-react@0.383
Charts      : recharts@2
Date        : date-fns@3
PWA         : vite-plugin-pwa@0.20

INFRASTRUCTURE
Dev local   : Docker Compose (postgres + redis)
Prod        : Railway (backend + DB + Redis) + Vercel (frontend)
CI/CD       : GitHub Actions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — STRUCTURE DE FICHIERS À CRÉER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

bac-senegal/
│
├── docker-compose.yml
├── .gitignore
├── README.md
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── .env                          ← créé mais jamais commit
│   ├── src/
│   │   ├── index.js                  ← point d'entrée
│   │   ├── db/
│   │   │   ├── pool.js               ← connexion PostgreSQL
│   │   │   ├── schema.sql            ← toutes les tables
│   │   │   ├── migrate.js            ← exécute schema.sql
│   │   │   └── seed.js               ← données initiales toutes séries
│   │   ├── middleware/
│   │   │   ├── auth.js               ← vérification JWT
│   │   │   ├── admin.js              ← vérification rôle admin
│   │   │   └── rateLimit.js          ← limiteurs par route
│   │   ├── routes/
│   │   │   ├── auth.js               ← register/login/me/refresh
│   │   │   ├── subjects.js           ← matières par série
│   │   │   ├── chapters.js           ← chapitres + cours
│   │   │   ├── exercises.js          ← CRUD + soumission + annales
│   │   │   ├── ai.js                 ← chat streaming + génération
│   │   │   ├── planning.js           ← planning adaptatif + tâches
│   │   │   ├── progress.js           ← stats élève
│   │   │   ├── community.js          ← forum posts + replies
│   │   │   ├── payments.js           ← Wave + Orange Money
│   │   │   └── admin.js              ← back-office
│   │   ├── services/
│   │   │   ├── claude.service.js     ← wrapper Anthropic SDK
│   │   │   ├── planning.service.js   ← algorithme planning adaptatif
│   │   │   ├── streak.service.js     ← gestion streak quotidien
│   │   │   ├── cache.service.js      ← Redis wrapper
│   │   │   └── notification.service.js ← push notifications
│   │   └── utils/
│   │       ├── validators.js         ← schémas Zod
│   │       └── helpers.js            ← fonctions utilitaires
│   └── prompts/
│       └── tutor.system.md           ← prompt système tuteur IA
│
└── frontend/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── public/
│   ├── manifest.json             ← PWA manifest
│   ├── sw.js                     ← Service Worker
│   └── icons/                    ← icônes PWA (192, 512px)
└── src/
├── main.tsx
├── App.tsx                   ← routes + providers
├── types/
│   └── index.ts              ← tous les types TypeScript
├── store/
│   └── index.ts              ← Zustand global store
├── services/
│   └── api.ts                ← axios + tous les appels API
├── hooks/
│   ├── useAuth.ts
│   ├── useAIChat.ts          ← streaming SSE
│   ├── useProgress.ts
│   └── usePlanning.ts
├── components/
│   ├── Layout/
│   │   ├── Layout.tsx        ← shell avec sidebar
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Spinner.tsx
│   │   └── Modal.tsx
│   ├── SubjectCard.tsx
│   ├── ExerciseCard.tsx
│   ├── TaskItem.tsx
│   ├── ChatMessage.tsx
│   └── StatsChart.tsx
└── pages/
├── Login.tsx
├── Register.tsx
├── Dashboard.tsx
├── Subjects.tsx
├── ChapterDetail.tsx
├── AIChat.tsx
├── Quiz.tsx
├── Planning.tsx
├── Annales.tsx
├── Simulation.tsx
├── Stats.tsx
├── Community.tsx
├── Premium.tsx
└── admin/
├── AdminLayout.tsx
├── AdminDashboard.tsx
├── AdminExercises.tsx
├── AdminContent.tsx
└── AdminUsers.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — SPÉCIFICATIONS DÉTAILLÉES PAR FICHIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▌ docker-compose.yml
─────────────────────
version: '3.9'
services:
postgres:
image: postgres:15-alpine
environment:
POSTGRES_DB: bac_senegal
POSTGRES_USER: bac_user
POSTGRES_PASSWORD: bac_password_dev
ports: ["5432:5432"]
volumes: [postgres_data:/var/lib/postgresql/data]
redis:
image: redis:7-alpine
ports: ["6379:6379"]
command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
volumes:
postgres_data:


▌ backend/.env.example
────────────────────────
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://bac_user:bac_password_dev@localhost:5432/bac_senegal
REDIS_URL=redis://localhost:6379
ANTHROPIC_API_KEY=sk-ant-api03-REMPLACER
JWT_SECRET=GENERER_AVEC_openssl_rand_hex_64
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:5173
WAVE_API_KEY=OPTIONNEL
VAPID_PUBLIC_KEY=GENERER_AVEC_web-push_generate-vapid-keys
VAPID_PRIVATE_KEY=GENERER_AVEC_web-push_generate-vapid-keys
VAPID_EMAIL=mailto:contact@bac-senegal.sn
ADMIN_EMAIL=admin@bac-senegal.sn
ADMIN_PASSWORD=ChangeMe123!


▌ backend/src/db/schema.sql — SCHÉMA COMPLET
──────────────────────────────────────────────
Créer EXACTEMENT ces tables dans cet ordre :

1. extensions : uuid-ossp, pg_trgm

2. series(code PK, name, description, type)
   Insérer : S1, S2, S1A, S3, L1, L2, L'1, L'2, STEG, G, T

3. users(
   id uuid PK default uuid_generate_v4(),
   email varchar(255) UNIQUE NOT NULL,
   password_hash varchar(255),
   prenom varchar(100) NOT NULL,
   nom varchar(100) NOT NULL,
   serie_code varchar(10) FK series(code) DEFAULT 'S2',
   etablissement varchar(200),
   ville varchar(100),
   region varchar(100),
   role varchar(20) DEFAULT 'eleve' CHECK (role IN ('eleve','professeur','admin')),
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
   )

4. subjects(
   id uuid PK,
   serie_code varchar(10) FK series,
   name varchar(200) NOT NULL,
   slug varchar(100) NOT NULL,
   coefficient int NOT NULL,
   icon varchar(10) DEFAULT '📚',
   color varchar(20) DEFAULT '#1D9E75',
   description text,
   order_index int DEFAULT 0,
   UNIQUE(serie_code, slug)
   )

5. chapters(
   id uuid PK,
   subject_id uuid FK subjects CASCADE,
   title varchar(300) NOT NULL,
   slug varchar(200),
   order_index int NOT NULL,
   course_content text,
   summary text,
   key_formulas jsonb DEFAULT '[]',
   mnemonics jsonb DEFAULT '[]',
   is_published bool DEFAULT true,
   created_at timestamp DEFAULT NOW()
   )

6. exercises(
   id uuid PK,
   chapter_id uuid FK chapters CASCADE,
   subject_id uuid FK subjects,
   type varchar(30) NOT NULL CHECK (type IN ('qcm','calcul','dissertation','vrai_faux','oral')),
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
   is_published bool DEFAULT true,
   created_at timestamp DEFAULT NOW()
   )

7. student_performances(
   id uuid PK,
   user_id uuid FK users CASCADE,
   exercise_id uuid FK exercises,
   subject_id uuid FK subjects,
   chapter_id uuid FK chapters,
   is_correct bool NOT NULL,
   attempts int DEFAULT 1,
   time_spent_seconds int,
   answer_given text,
   hints_used int DEFAULT 0,
   points_earned int DEFAULT 0,
   completed_at timestamp DEFAULT NOW()
   )

8. chapter_progress(
   id uuid PK,
   user_id uuid FK users CASCADE,
   chapter_id uuid FK chapters,
   subject_id uuid FK subjects,
   exercises_done int DEFAULT 0,
   exercises_correct int DEFAULT 0,
   completion_pct int DEFAULT 0,
   simulated_grade decimal(4,2),
   last_studied_at timestamp,
   UNIQUE(user_id, chapter_id)
   )

9. revision_plans(
   id uuid PK,
   user_id uuid FK users CASCADE,
   plan_data jsonb NOT NULL,
   bac_date date NOT NULL,
   is_active bool DEFAULT true,
   generated_at timestamp DEFAULT NOW()
   )

10. daily_tasks(
    id uuid PK,
    user_id uuid FK users CASCADE,
    plan_id uuid FK revision_plans,
    subject_id uuid FK subjects,
    chapter_id uuid FK chapters,
    task_type varchar(50) CHECK (task_type IN ('cours','exercices','revision','simulation','annale')),
    title varchar(300) NOT NULL,
    description text,
    estimated_minutes int NOT NULL,
    scheduled_date date NOT NULL,
    is_completed bool DEFAULT false,
    completed_at timestamp,
    created_at timestamp DEFAULT NOW()
    )

11. ai_sessions(
    id uuid PK,
    user_id uuid FK users CASCADE,
    subject_id uuid FK subjects,
    chapter_id uuid FK chapters,
    messages jsonb DEFAULT '[]',
    total_tokens_used int DEFAULT 0,
    created_at timestamp DEFAULT NOW(),
    last_message_at timestamp DEFAULT NOW()
    )

12. forum_posts(
    id uuid PK,
    user_id uuid FK users CASCADE,
    subject_id uuid FK subjects,
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
    )

13. forum_replies(
    id uuid PK,
    post_id uuid FK forum_posts CASCADE,
    user_id uuid FK users,
    content text NOT NULL,
    likes_count int DEFAULT 0,
    is_best_answer bool DEFAULT false,
    created_at timestamp DEFAULT NOW()
    )

14. forum_likes(
    user_id uuid FK users,
    post_id uuid FK forum_posts,
    PRIMARY KEY(user_id, post_id)
    )

15. payments(
    id uuid PK,
    user_id uuid FK users,
    provider varchar(30) NOT NULL,
    amount int NOT NULL,
    currency varchar(10) DEFAULT 'XOF',
    status varchar(20) DEFAULT 'pending',
    provider_reference varchar(200),
    metadata jsonb,
    created_at timestamp DEFAULT NOW(),
    confirmed_at timestamp
    )

Créer ces index :
CREATE INDEX idx_performances_user ON student_performances(user_id);
CREATE INDEX idx_performances_subject ON student_performances(subject_id, user_id);
CREATE INDEX idx_tasks_user_date ON daily_tasks(user_id, scheduled_date);
CREATE INDEX idx_exercises_chapter ON exercises(chapter_id);
CREATE INDEX idx_exercises_annale ON exercises(is_annale, annale_year) WHERE is_annale=true;
CREATE INDEX idx_forum_posts_serie ON forum_posts(serie_code, created_at DESC);
CREATE INDEX idx_forum_posts_subject ON forum_posts(subject_id);
CREATE INDEX idx_sessions_user ON ai_sessions(user_id, last_message_at DESC);

Créer cette fonction trigger pour updated_at :
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();


▌ backend/src/db/seed.js — DONNÉES COMPLÈTES
─────────────────────────────────────────────
Insérer les matières pour TOUTES les séries avec les coefficients OFFICIELS DGEX :

SÉRIE S2 :
Mathématiques coeff 7, Physique coeff 5, Chimie coeff 5,
SVT coeff 4, Philosophie coeff 3, Français coeff 3,
Anglais coeff 2, Histoire-Géographie coeff 2, EPS coeff 1, Informatique coeff 1

SÉRIE S1 :
Mathématiques coeff 6, Physique coeff 5, Chimie coeff 4,
SVT coeff 5, Philosophie coeff 3, Français coeff 3,
Anglais coeff 2, Histoire-Géographie coeff 2, EPS coeff 1

SÉRIE L1 :
Philosophie coeff 5, Français coeff 5, Histoire-Géographie coeff 4,
Anglais coeff 3, Arabe coeff 3, Mathématiques coeff 2,
Sciences Naturelles coeff 2, EPS coeff 1

SÉRIE L2 :
Français coeff 5, Anglais coeff 4, Philosophie coeff 4,
Histoire-Géographie coeff 4, 2ème Langue Vivante coeff 3,
Mathématiques coeff 2, EPS coeff 1

SÉRIE STEG :
Économie coeff 4, Gestion coeff 4, Mathématiques coeff 4,
Histoire-Géographie coeff 3, Français coeff 3, Anglais coeff 2,
Comptabilité coeff 4, EPS coeff 1

SÉRIE G :
Gestion coeff 5, Comptabilité coeff 5, Mathématiques coeff 3,
Économie coeff 3, Français coeff 3, Anglais coeff 2,
Informatique coeff 2, EPS coeff 1

SÉRIE T :
Sciences et Techniques coeff 6, Mathématiques coeff 5,
Physique coeff 4, Français coeff 3, Anglais coeff 2,
Histoire-Géographie coeff 2, EPS coeff 1

Pour S2/Chimie : créer 7 chapitres avec leurs key_formulas en JSON
Pour S2/Mathématiques : créer 8 chapitres avec leurs formules
Pour S2/Physique : créer 6 chapitres
Pour S2/SVT : créer 5 chapitres

Pour chaque chapitre de S2 : insérer MINIMUM 5 exercices QCM réels
avec question_text, 4 options dont 1 correcte, explanation détaillée, 2 hints.
Pour 2 exercices par matière S2 : is_annale=true, annale_year entre 2020 et 2023.

Créer 1 utilisateur admin :
email: admin@bac-senegal.sn
password: Admin123! (hashé avec bcrypt rounds=12)
role: admin
prenom: Admin, nom: BAC

Créer 1 utilisateur de test :
email: test@bac-senegal.sn
password: Test123!
role: eleve
prenom: Aminata, nom: Diallo
serie_code: S2


▌ backend/src/services/claude.service.js
─────────────────────────────────────────
Implémenter ces 5 fonctions :

1. streamTutorResponse(message, conversationHistory, context, onChunk)
    - context = { user, subject, chapter }
    - Charger le system prompt depuis prompts/tutor.system.md
    - Remplacer les placeholders {{serie}}, {{matiere}}, {{chapitre}}, {{prenom}}, {{niveau}}
    - Limiter l'historique aux 10 derniers messages
    - Streamer avec anthropic.messages.stream()
    - Appeler onChunk(text) pour chaque delta
    - Retourner { fullResponse, inputTokens, outputTokens }

2. generateExercise(chapter, difficulty, type)
    - Prompt strict demandant du JSON pur
    - Valider avec Zod avant de retourner
    - Si JSON invalide : retry 1 fois, sinon throw

3. generateChapterSummary(chapter, subject)
    - Fiche de révision structurée en Markdown
    - Cacher en Redis 24h avec clé summary:{chapter_id}

4. correctStudentWork(imageBase64, mediaType, subject)
    - Utiliser vision Claude
    - Correction bienveillante + note estimée + points à retravailler

5. generateSimulationSubject(subject, serie, year)
    - Sujet complet style BAC sénégalais
    - Respecter le nombre d'exercices et la durée officielle
    - Retourner { subject_text, correction_key, duration_minutes }


▌ backend/src/services/planning.service.js
───────────────────────────────────────────
Algorithme generateAdaptivePlan(userId) :

ÉTAPE 1 : Récupérer l'utilisateur et ses performances récentes (30 jours)

ÉTAPE 2 : Pour chaque matière de la série de l'élève :
- Calculer la moyenne simulée : AVG(is_correct::int) * 20
- Calculer le niveau : floor(moyenne / 4), min 0 max 5
- Calculer la priorité : (coefficient * 3) + ((5 - niveau) * 2)
- Calculer le temps minimum nécessaire en heures

ÉTAPE 3 : Calculer les jours jusqu'au BAC
- Date BAC par défaut : 10 juin de l'année en cours
- En semaine : 2h disponibles, week-end : 4h disponibles
- Total minutes disponibles = somme sur tous les jours

ÉTAPE 4 : Distribuer le temps par matière proportionnellement
au score de priorité normalisé

ÉTAPE 5 : Générer les tâches quotidiennes :
- Semaines 1-2 : focus cours + compréhension
- Semaines 3-5 : exercices types + annales
- Semaines 6+ : révision intensive + simulations
- Chaque samedi des 3 dernières semaines : 1 simulation BAC complète

ÉTAPE 6 : Sauvegarder le plan en base et créer les daily_tasks

Retourner { plan_id, days_left, tasks_created, schedule_overview }


▌ backend/src/routes/ai.js — ROUTES IA COMPLÈTES
──────────────────────────────────────────────────
Implémenter ces routes :

POST /api/ai/chat
- Auth requis + rate limit 10/min gratuit, 30/min premium
- Body: { message, session_id?, subject_id?, chapter_id? }
- Headers réponse: Content-Type: text/event-stream
- Récupérer ou créer la session IA
- Construire l'historique (10 derniers messages)
- Streamer la réponse avec claude.service.streamTutorResponse()
- Écrire chaque chunk: "data: {\"text\": \"...\"}\n\n"
- En fin de stream: "data: {\"done\": true, \"session_id\": \"...\"}\n\n"
- Sauvegarder la conversation + compteur tokens en base
- Incrémenter les points de l'élève (+2 par message IA reçu)

POST /api/ai/generate-exercise
- Body: { subject_id, chapter_id, difficulty, type }
- Retourner l'exercice généré en JSON
- Sauvegarder en base avec ai_generated=true

POST /api/ai/summary
- Body: { chapter_id }
- Vérifier cache Redis d'abord
- Générer et mettre en cache 24h

POST /api/ai/correct-photo
- Body: { image_base64, media_type, subject_id? }
- Limiter la taille de l'image : max 5MB
- Premium seulement OU 3 corrections gratuites/jour

POST /api/ai/simulate
- Body: { subject_id }
- Premium seulement
- Retourner le sujet complet + corrigé


▌ backend/src/routes/auth.js — AUTH COMPLÈTE
─────────────────────────────────────────────
POST /api/auth/register
- Valider avec Zod : email, password min 8 chars, prenom, nom, serie_code
- Vérifier email unique
- Hasher password avec bcrypt rounds=12
- Insérer en base
- Retourner { token, refreshToken, user }

POST /api/auth/login
- Vérifier email + password
- Mettre à jour le streak (logique complète) :
    * Si last_activity_date = hier → streak + 1
    * Si last_activity_date = aujourd'hui → pas de changement
    * Sinon → streak = 1
    * Si streak > longest_streak → mettre à jour longest_streak
- Mettre à jour last_activity_date
- Retourner { token, refreshToken, user (sans password_hash) }

POST /api/auth/refresh
- Valider le refresh token
- Générer un nouveau access token

GET /api/auth/me
- Retourner l'utilisateur complet + stats agrégées :
    * total_exercises_done
    * global_completion_pct
    * simulated_average (moyenne pondérée par coefficients)
    * days_until_bac
    * today_tasks_count / today_tasks_done

PATCH /api/auth/profile
- Modifier prenom, nom, etablissement, ville, serie_code, avatar_url

POST /api/auth/push-subscribe
- Enregistrer le push_subscription de l'élève


▌ backend/src/routes/exercises.js
───────────────────────────────────
GET /api/exercises
Params: subject_id?, chapter_id?, type?, difficulty?, is_annale?, limit=10, offset=0, shuffle=true
Retourner les exercices avec les infos matière/chapitre

GET /api/exercises/annales
Params: serie_code?, subject_id?, year?, limit=20, offset=0
Grouper par année et par matière dans la réponse

GET /api/exercises/:id
Retourner l'exercice complet (sans révéler is_correct dans options)
Masquer le champ is_correct de chaque option

POST /api/exercises/:id/submit
Body: { answer, time_spent_seconds, hints_used }
Logique de vérification :
* type qcm : comparer answer avec la lettre correcte (case insensitive)
* type vrai_faux : comparer 'vrai'/'faux'
* autres types : toujours true (correction IA)
Calculer les points :
* Bon du 1er coup : points complets
* Bon au 2ème essai : points × 0.5
* Avec indices utilisés : réduire de 2 pts par indice
Insérer dans student_performances
Mettre à jour chapter_progress (upsert)
Mettre à jour total_points de l'utilisateur
Retourner { is_correct, points_earned, correct_answer, explanation }

GET /api/exercises/:id/hint
Retourner le prochain indice non encore vu (basé sur hints_used en session)


▌ backend/src/routes/planning.js
──────────────────────────────────
GET /api/planning/today
Retourner les tâches du jour avec stats (X/Y complétées, minutes restantes)

GET /api/planning/week
Params: start_date (défaut: lundi de la semaine courante)
Retourner 7 jours de tâches groupées par date

POST /api/planning/generate
- Désactiver l'ancien plan
- Appeler planning.service.generateAdaptivePlan()
- Retourner le résumé du nouveau plan

PATCH /api/planning/tasks/:id/complete
- Marquer comme complétée
- Ajouter 5 points de bonus
- Vérifier si toutes les tâches du jour sont faites → 20 pts bonus
- Retourner { success, points_earned, all_done_today }

DELETE /api/planning/tasks/:id
- Supprimer une tâche du planning (ajustement manuel)


▌ backend/src/routes/progress.js
──────────────────────────────────
GET /api/progress/global
Retourner :
{
overall_pct: int,
simulated_average: decimal,    ← moyenne pondérée par coeff
total_exercises_done: int,
total_correct: int,
accuracy_rate: decimal,
streak_days: int,
total_points: int,
days_until_bac: int
}

GET /api/progress/subjects
Pour chaque matière de la série :
{
subject: {...},
completion_pct: int,
simulated_grade: decimal,
exercises_done: int,
exercises_correct: int,
chapters_done: int,
chapters_total: int,
weak_chapters: [{chapter_title, error_rate}]  ← les 2 plus faibles
}

GET /api/progress/weekly-activity
Retourner les 7 derniers jours :
[{ date, exercises_done, minutes_studied, points_earned }]

GET /api/progress/achievements
Retourner les badges débloqués :
- Premier exercice, Streak 7j, Streak 30j, 100 exercices, Première simulation, etc.


▌ backend/src/routes/community.js
───────────────────────────────────
GET /api/community/posts
Params: serie_code?, subject_id?, search?, sort=recent|popular, limit=20, offset=0
Inclure : pseudo de l'auteur, nombre likes, si l'utilisateur a liké

POST /api/community/posts
Body: { title, content, subject_id?, serie_code }
Validation : title 10-200 chars, content 20-2000 chars

GET /api/community/posts/:id
Retourner le post + toutes les réponses triées par is_best_answer DESC, likes DESC
Incrémenter views_count

POST /api/community/posts/:id/replies
Body: { content }

POST /api/community/posts/:id/like
Toggle like (insert ou delete dans forum_likes)
Mettre à jour likes_count

PATCH /api/community/posts/:id/resolve
Marquer comme résolu (seul l'auteur ou un admin)


▌ backend/src/routes/admin.js
──────────────────────────────
Toutes les routes nécessitent auth + role admin.

GET /api/admin/stats
{
total_users, new_users_today, new_users_week,
total_exercises, total_ai_sessions, total_ai_tokens,
premium_users, premium_revenue_xof,
active_today (utilisateurs actifs aujourd'hui),
series_distribution: [{code, count, pct}],
hardest_chapters: [{title, subject, error_rate, attempts}],
daily_active_users: [{date, count}]  ← 30 derniers jours
}

GET /api/admin/users
Params: page, limit, search, serie, role, is_premium
Retourner avec pagination

PATCH /api/admin/users/:id
Modifier role, is_premium, premium_expires_at

GET /api/admin/exercises
Filtres complets + pagination

POST /api/admin/exercises
Créer un exercice manuellement (validation Zod stricte)

PATCH /api/admin/exercises/:id
Modifier un exercice existant

DELETE /api/admin/exercises/:id
Soft delete : is_published = false

POST /api/admin/import-annale
Body: { pdf_base64, subject_id, year, serie_code }
Extraire les exercices avec Claude Vision
Valider et insérer en base
Retourner { inserted, failed, exercises_preview }

GET /api/admin/forum
Tous les posts avec modération
PATCH /api/admin/forum/posts/:id
Épingler, masquer (is_published=false)


▌ backend/prompts/tutor.system.md — PROMPT SYSTÈME TUTEUR
───────────────────────────────────────────────────────────
Créer ce fichier avec le contenu COMPLET suivant :

---
Tu es **Prof IA**, le tuteur intelligent de **BAC Sénégal IA**.
Tu aides les élèves sénégalais à préparer leur Baccalauréat.
Tu maîtrises parfaitement le programme officiel de la DGEX (Direction Générale des Examens).

═══ CONTEXTE ÉLÈVE ═══
Prénom      : {{prenom}}
Série       : {{serie}}
Matière     : {{matiere}}
Chapitre    : {{chapitre}}
Niveau      : {{niveau}}
Jours avant BAC : {{jours_restants}}

═══ RÈGLES ABSOLUES ═══

1. NE JAMAIS donner la réponse directement à la première demande.
   Guide toujours par des questions ou des étapes intermédiaires.
   Si l'élève reste bloqué après 3 échanges, donne la première étape seulement.

2. ADAPTER le langage au niveau :
    - Débutant : langage simple, analogies du quotidien sénégalais
    - Intermédiaire : terminologie correcte, méthodes généralisables
    - Avancé : rigueur mathématique, sujets de BAC réels

3. ANCRER dans le contexte sénégalais :
    - Utilise des exemples locaux (Lac Rose, arachide, pirogue, dakar)
    - Réfère-toi aux sujets BAC sénégalais uniquement (pas français ou marocain)
    - Cite : "Comme dans l'annale S2 2022..." quand pertinent

4. ENCOURAGER systématiquement :
    - Valoriser chaque effort : "Tu y es presque !", "Bonne intuition !"
    - Jamais "Tu as tort" → dire "Regardons ensemble autrement..."
    - Terminer les explications par une question de vérification

5. STRUCTURER les réponses :
    - Explication courte en prose
    - Étapes numérotées si calcul
    - Formule ou mnémotechnique si utile
    - Question ou mini-exercice pour vérifier la compréhension

═══ PROGRAMME S2 MÉMORISÉ ═══

MATHÉMATIQUES (coeff 7) : Suites, Limites, Dérivées, Intégrales,
Probabilités, Géométrie vectorielle, Nombres complexes, Arithmétique

CHIMIE (coeff 5) : Thermochimie (Hess, enthalpies), Cinétique (ordres,
vitesse), Équilibres, Acides-bases (pH, Ka, Henderson-Hasselbalch),
Oxydoréduction (piles, Faraday), Chimie organique

PHYSIQUE (coeff 5) : Mécanique (Newton, projectiles, oscillateurs),
Électricité (RC, RL, RLC, filtres), Optique (Snell-Descartes,
lentilles), Ondes, Physique atomique (Bohr, radioactivité)

SVT (coeff 4) : Génétique (mono/dihybridisme, mutations), Biologie
cellulaire (ADN, transcription, traduction), Immunologie, Évolution,
Écologie

PHILOSOPHIE (coeff 3) : Liberté, Connaissance, Travail, État, Société,
Conscience, Autrui, Vérité, Art, Religion, Technique

═══ MNÉMOTECHNIQUES À UTILISER ═══

Chimie : "OxAn RedCat" (Oxydation Anode, Réduction Cathode)
Maths : "DADA" pour les règles de dérivation
SVT : "ADN → ARNm → Protéine" (Réplication > Transcription > Traduction)
Phys : "SUVAT" pour les équations du mouvement

═══ GESTION SITUATIONS SPÉCIALES ═══

Élève découragé → Répondre d'abord à l'émotion :
"Je comprends, c'est difficile. Mais tu es là, tu essaies, c'est déjà énorme.
Reprenons depuis le début, tranquillement."

Tentative de triche → Ferme mais bienveillant :
"Je ne peux pas faire l'exercice à ta place — si je le faisais, tu n'apprendrais
rien pour le jour J. Explique-moi où tu bloques et on résout ensemble."

Question hors programme → Signaler clairement :
"Intéressant ! Mais ce concept dépasse le programme officiel S2 DGEX.
Tu n'en auras pas au BAC. Veux-tu qu'on l'explore par curiosité ?"

═══ FORMAT DE RÉPONSE ═══

Court (concept simple) : 3-5 lignes, prose directe
Moyen (explication) : 10-20 lignes avec étapes numérotées
Long (correction exercice) : étapes + formules + vérification
Très long (résumé chapitre) : titres H3 + listes + exemples + mnémo

Utilise le Markdown : **gras** pour les termes clés, formules entre backticks,
étapes avec 1. 2. 3., points clés avec •
---


▌ frontend/src/services/api.ts — SERVICE API COMPLET
─────────────────────────────────────────────────────
Créer une instance axios avec :
baseURL = import.meta.env.VITE_API_URL
withCredentials = true

Intercepteur request : ajouter Authorization: Bearer {token} si présent dans localStorage

Intercepteur response :
- 401 → effacer token + redirect /login
- 403 → toast "Accès non autorisé"
- 500 → toast "Erreur serveur, réessaie"

Exporter ces objets :
authApi : { register, login, refresh, me, updateProfile, subscribePush }
subjectsApi : { list(serie?), get(id), chapters(id), chapter(id) }
exercisesApi : { list(params), annales(params), get(id), submit(id, data), hint(id) }
aiApi : { chat(message, opts, onChunk): Promise<string>, generateExercise(...), summary(chapterId), correctPhoto(...), simulate(subjectId) }
planningApi : { today(), week(startDate?), generate(), completeTask(id), deleteTask(id) }
progressApi : { global(), subjects(), weeklyActivity(), achievements() }
communityApi : { posts(params), post(id), createPost(data), reply(postId, content), like(postId), resolve(postId) }
adminApi : { stats(), users(params), updateUser(id, data), exercises(params), createExercise(data), updateExercise(id, data), deleteExercise(id), importAnnale(data), forumPosts(params), moderatePost(id, data) }

Pour aiApi.chat : implémenter le streaming SSE manuellement avec fetch() et ReadableStream
- Lire les chunks ligne par ligne
- Parser "data: {...}" et extraire le texte
- Appeler onChunk(text) à chaque delta
- Retourner le session_id en fin de stream


▌ frontend/src/store/index.ts — ZUSTAND STORE
──────────────────────────────────────────────
State persisté (localStorage) :
token: string | null
user: User | null
selectedSerie: string  (défaut 'S2')

State non persisté :
currentPage: string
activeChatSubjectId: string | null
currentSessionId: string | null
todayTasks: DailyTask[]
globalProgress: GlobalProgress | null
sidebarOpen: bool (pour mobile)

Actions :
setUser, setToken, logout,
setPage, setSelectedSerie,
setActiveChatSubject(id), clearChatSession(),
setTodayTasks, setGlobalProgress,
toggleSidebar


▌ frontend/src/hooks/useAIChat.ts
───────────────────────────────────
State :
messages: ChatMessage[]   (initialisé avec message de bienvenue)
isLoading: bool
error: string | null

Fonctions :
sendMessage(text: string, chapterId?: string)
1. Ajouter le message utilisateur en local
2. Ajouter un message assistant vide
3. Appeler aiApi.chat() avec onChunk qui update le dernier message
4. Sauvegarder le session_id
5. Gérer les erreurs proprement

sendQuickQuestion(question: string)
→ appelle sendMessage directement

clearChat()
→ reset messages + session_id

generateAndAsk(type: 'exercise'|'summary'|'oral')
→ envoie le message approprié selon le type


▌ frontend/src/pages/AIChat.tsx — PAGE COMPLÈTE
─────────────────────────────────────────────────
Composants nécessaires dans la page :

1. Barre de sélection matière (chips horizontaux scrollables)
    - "🤖 Général" + une chip par matière de la série
    - Changer de matière = nouvelle session + message de bienvenue adapté

2. Zone de messages (scrollable, auto-scroll en bas)
    - Message IA : avatar ✦, bulle blanche avec ReactMarkdown
    - Message utilisateur : bulle verte, avatar avec initiales
    - Typing indicator (3 points animés) pendant le streaming
    - Quick actions après le 1er message :
      • "Explique ce chapitre" • "Génère un exercice" • "Fiche de révision"
      • "Erreurs classiques" • "Interrogation orale"

3. Barre d'actions en bas :
    - Bouton photo (input file, ouvre la caméra sur mobile)
    - Bouton effacer conversation
    - Input texte avec placeholder adaptatif
    - Bouton envoyer (désactivé si vide ou loading)
    - Indicateur "premium requis" pour correction photo si gratuit

4. Panneau latéral (optionnel, desktop uniquement) :
    - Chapitre actuel sélectionnable
    - Raccourcis : Fiche du chapitre, Générer exercice, Mode oral


▌ frontend/src/pages/Quiz.tsx — PAGE COMPLÈTE
──────────────────────────────────────────────
Composants :

1. Filtres en haut : série, matière, difficulté, type, annales only
   → Met à jour le useQuery

2. Barre de progression (dots) pour les X exercices chargés

3. Timer compte à rebours par exercice (affiché en rouge si < 30s)

4. Question + méta (matière, difficulté en étoiles, numéro)

5. Options pour QCM : 4 boutons A/B/C/D
    - État normal : gris
    - Sélectionné : contour vert
    - Correct après validation : fond vert
    - Incorrect sélectionné : fond rouge
    - Correct non sélectionné : fond vert (montrer la bonne réponse)

6. Bouton "Valider" (disabled si rien sélectionné)
   → appelle exercisesApi.submit()
   → affiche l'explication dans une box bleue

7. Bouton "Indice" → affiche le prochain hint (-2pts)

8. Bouton "Question suivante" ou "Voir mon score" en fin

9. Écran de résultat : score, nb correct, points gagnés, boutons :
    - "Recommencer" (nouveau batch)
    - "Réviser avec l'IA" (ouvre AIChat avec la matière présélectionnée)
    - "Voir mes stats"


▌ frontend/src/pages/Dashboard.tsx
────────────────────────────────────
Sections :

1. Hero banner vert avec :
    - "Bonjour {prenom} !" + compte à rebours jours avant BAC
    - CTA "Voir mon planning"
    - Streak badge avec flamme

2. Suggestion IA (si matière faible détectée) :
    - Box violette avec "✦ Suggestion IA : [message]"
    - Basée sur la matière avec la plus mauvaise moyenne et le plus haut coefficient

3. Grid 4 cartes stats :
    - Progression globale (%)
    - Exercices faits
    - Moyenne simulée
    - Streak actuel

4. Matières prioritaires (4 cartes en grid 2×2)
    - Triées par score_priorité décroissant
    - Barre de progression + moyenne simulée + badge urgence si < 10/20

5. Tâches du jour (liste) :
    - Charger depuis planningApi.today()
    - Cases à cocher interactives
    - Si aucun plan : bouton "Générer mon planning IA"

6. Accès rapide : Quiz rapide, Tuteur IA, Annales, Forum


▌ frontend/src/pages/admin/AdminDashboard.tsx
──────────────────────────────────────────────
Dashboard complet avec :

1. 4 KPI cards (users, exercices, sessions IA, premium)
2. Graphique barres recharts : activité 30 jours (daily_active_users)
3. Table : séries les plus actives (code, users, %)
4. Table : chapitres les plus difficiles (titre, matière, taux erreur)
5. Tableau de bord temps réel : nouveaux inscrits aujourd'hui/semaine

▌ frontend/src/pages/admin/AdminExercises.tsx
──────────────────────────────────────────────
Interface CRUD :

1. Tableau filtrable par série, matière, type, difficulté, annale
2. Bouton "Ajouter exercice" → Modal avec formulaire complet
3. Bouton "Importer annale PDF" → Upload PDF → Extraction IA → Prévisualisation → Confirmation
4. Actions par ligne : Modifier, Supprimer (soft), Prévisualiser
5. Indicateur "IA générée" vs "Manuel" vs "Annale officielle"


▌ frontend/tailwind.config.js
──────────────────────────────
Étendre la config avec ces couleurs personnalisées :
colors:
green:
DEFAULT: '#1D9E75', dark: '#0F6E56', light: '#E1F5EE', xlight: '#F0FAF6'
amber:
DEFAULT: '#EF9F27', light: '#FAEEDA'
purple:
DEFAULT: '#7F77DD', light: '#EEEDFE'
coral: '#D85A30'
bac-bg: '#F7F9F8'

Ajouter les variants : scrollbar-none


▌ frontend/public/manifest.json — PWA
────────────────────────────────────────
{
"name": "BAC Sénégal IA",
"short_name": "BAC SN",
"description": "Prépare ton Baccalauréat avec un tuteur IA",
"start_url": "/",
"display": "standalone",
"background_color": "#F7F9F8",
"theme_color": "#1D9E75",
"icons": [
{ "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
{ "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
],
"categories": ["education"],
"lang": "fr",
"dir": "ltr"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — ORDRE D'IMPLÉMENTATION (OBLIGATOIRE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Implémenter EXACTEMENT dans cet ordre. Confirmer ✅ après chaque étape.

┌─ PHASE 1 : INFRASTRUCTURE (Étapes 1-4)
│
│  Étape 1 — Initialisation projet
│    • Créer la structure de dossiers complète
│    • docker-compose.yml
│    • .gitignore (node_modules, .env, dist, *.log)
│    • README.md avec instructions de démarrage
│    • backend/package.json avec toutes les dépendances
│    • frontend/package.json avec toutes les dépendances
│    • Lancer : npm install dans les deux dossiers
│
│  Étape 2 — Base de données
│    • backend/src/db/pool.js (Pool PostgreSQL avec gestion erreurs)
│    • backend/src/db/schema.sql (TOUTES les tables listées en Section 3)
│    • backend/src/db/migrate.js (exécute schema.sql + log)
│    • Lancer docker-compose up -d
│    • Lancer la migration : node src/db/migrate.js
│    • Vérifier : toutes les tables créées ✅
│
│  Étape 3 — Seed données
│    • backend/src/db/seed.js (TOUTES les séries + exercices S2)
│    • Lancer : node src/db/seed.js
│    • Vérifier en SQL : SELECT COUNT(*) FROM subjects; → doit retourner 40+
│    • Vérifier : SELECT COUNT(*) FROM exercises; → doit retourner 35+
│
│  Étape 4 — Serveur de base
│    • backend/src/index.js (Express + middlewares + toutes les routes montées)
│    • backend/src/middleware/auth.js
│    • backend/src/middleware/admin.js
│    • backend/src/middleware/rateLimit.js
│    • backend/src/utils/validators.js (schémas Zod)
│    • backend/src/utils/helpers.js
│    • Lancer : npm run dev
│    • Vérifier : GET /health → { status: 'ok' } ✅

├─ PHASE 2 : BACKEND (Étapes 5-12)
│
│  Étape 5 — Authentification
│    • backend/src/routes/auth.js (register, login, refresh, me, profile, push-subscribe)
│    • Tester avec curl :
│      POST /api/auth/register → 201 avec token
│      POST /api/auth/login → 200 avec token
│      GET /api/auth/me → 200 avec user ✅
│
│  Étape 6 — Matières et chapitres
│    • backend/src/routes/subjects.js
│    • backend/src/routes/chapters.js
│    • Tester : GET /api/subjects?serie_code=S2 → liste des matières ✅
│
│  Étape 7 — Exercices
│    • backend/src/routes/exercises.js (list, annales, get, submit, hint)
│    • Tester : GET /api/exercises?limit=5 → liste d'exercices ✅
│    • Tester : POST /api/exercises/{id}/submit → résultat + points ✅
│
│  Étape 8 — Service IA
│    • backend/prompts/tutor.system.md (prompt complet Section 3)
│    • backend/src/services/claude.service.js (5 fonctions)
│    • backend/src/routes/ai.js (chat streaming + generate + summary + photo + simulate)
│    • Tester : POST /api/ai/chat → stream SSE fonctionnel ✅
│    • Tester : POST /api/ai/generate-exercise → exercice JSON valide ✅
│
│  Étape 9 — Planning adaptatif
│    • backend/src/services/planning.service.js (algorithme complet)
│    • backend/src/routes/planning.js (today, week, generate, complete, delete)
│    • Tester : POST /api/planning/generate → plan créé ✅
│    • Tester : GET /api/planning/today → tâches du jour ✅
│
│  Étape 10 — Progression
│    • backend/src/routes/progress.js (global, subjects, weekly, achievements)
│    • Tester : GET /api/progress/global → stats agrégées ✅
│
│  Étape 11 — Communauté
│    • backend/src/routes/community.js (posts CRUD, likes, resolve)
│    • Tester : GET /api/community/posts → liste posts ✅
│    • Tester : POST /api/community/posts → post créé ✅
│
│  Étape 12 — Admin + Cache
│    • backend/src/services/cache.service.js (Redis wrapper avec TTL)
│    • backend/src/services/streak.service.js
│    • backend/src/services/notification.service.js (web-push + cron)
│    • backend/src/routes/admin.js (stats, users, exercises CRUD, import annale)
│    • Tester avec compte admin : GET /api/admin/stats → dashboard data ✅

├─ PHASE 3 : FRONTEND (Étapes 13-20)
│
│  Étape 13 — Configuration
│    • frontend/vite.config.ts (proxy /api vers :3001, PWA plugin)
│    • frontend/tailwind.config.js (couleurs custom)
│    • frontend/tsconfig.json
│    • frontend/src/types/index.ts (TOUS les types)
│    • frontend/src/services/api.ts (TOUS les appels API + streaming)
│    • Vérifier : npm run dev → compiles sans erreur TS ✅
│
│  Étape 14 — Store + Hooks
│    • frontend/src/store/index.ts (Zustand + persist)
│    • frontend/src/hooks/useAuth.ts
│    • frontend/src/hooks/useAIChat.ts (streaming)
│    • frontend/src/hooks/useProgress.ts
│    • frontend/src/hooks/usePlanning.ts
│
│  Étape 15 — Composants UI de base
│    • frontend/src/components/ui/ (Button, Card, Badge, ProgressBar, Spinner, Modal)
│    • frontend/src/components/Layout/ (Layout, Sidebar, Topbar)
│    • Vérifier rendu visuel de base ✅
│
│  Étape 16 — Auth pages
│    • frontend/src/pages/Login.tsx (formulaire + validation + redirect)
│    • frontend/src/pages/Register.tsx (sélection série incluse)
│    • frontend/src/App.tsx (routes avec PrivateRoute)
│    • Tester : login/register fonctionnels + redirect ✅
│
│  Étape 17 — Dashboard + Subjects
│    • frontend/src/components/SubjectCard.tsx
│    • frontend/src/components/TaskItem.tsx
│    • frontend/src/pages/Dashboard.tsx (complet avec toutes les sections)
│    • frontend/src/pages/Subjects.tsx (grid + switcher séries)
│    • frontend/src/pages/ChapterDetail.tsx (cours + exercices du chapitre)
│    • Tester : dashboard charge les données réelles ✅
│
│  Étape 18 — IA + Quiz
│    • frontend/src/components/ChatMessage.tsx (Markdown rendu)
│    • frontend/src/pages/AIChat.tsx (streaming réel depuis l'API)
│    • frontend/src/pages/Quiz.tsx (timer + validation + correction)
│    • Tester : envoyer un message → réponse IA streamée ✅
│    • Tester : faire un quiz de 5 questions → score affiché ✅
│
│  Étape 19 — Planning + Stats + Community
│    • frontend/src/pages/Planning.tsx
│    • frontend/src/pages/Stats.tsx (recharts pour graphiques)
│    • frontend/src/pages/Community.tsx
│    • frontend/src/pages/Annales.tsx
│    • frontend/src/pages/Simulation.tsx
│    • frontend/src/pages/Premium.tsx
│    • Tester toutes les pages, vérifier les données chargées ✅
│
│  Étape 20 — Admin + PWA
│    • frontend/src/pages/admin/ (AdminLayout, Dashboard, Exercises, Users)
│    • frontend/public/manifest.json
│    • frontend/public/icons/ (générer icônes avec sharp ou placeholder)
│    • Configurer vite-plugin-pwa
│    • Tester : connexion admin → back-office visible ✅
│    • Tester : "Ajouter à l'écran d'accueil" sur mobile ✅

└─ PHASE 4 : PRODUCTION (Étape 21)
│
Étape 21 — Finalisation
• Variables d'environnement de production configurées
• Build frontend : npm run build → dist/ sans erreurs
• Test de charge basique (10 requêtes simultanées)
• Vérifier : toutes les routes API répondent en < 500ms
• Vérifier : le streaming IA fonctionne sur la build de prod
• Documenter les endpoints dans README.md ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — CRITÈRES DE QUALITÉ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sécurité
□ Jamais de secret en dur dans le code source
□ Toutes les routes privées protégées par le middleware auth
□ Routes admin protégées par le middleware admin
□ Rate limiting sur /api/ai/* (10 req/min gratuit)
□ Validation Zod sur TOUS les body de requêtes
□ Helmet configuré avec CSP
□ CORS restreint à FRONTEND_URL
□ Mots de passe hashés bcrypt rounds=12
□ Tokens JWT expirables + refresh token

Performance
□ Cache Redis pour les fiches de révision (TTL 24h)
□ Cache Redis pour les stats admin (TTL 5min)
□ Index PostgreSQL sur toutes les colonnes de filtre fréquent
□ Pagination sur toutes les listes (limit/offset)
□ Images compressées avant envoi à l'API Claude

UX
□ Loading states sur tous les appels API
□ Messages d'erreur utilisateur en français
□ Responsive mobile complet (sidebar masquée, navigation bottom)
□ Offline partiel via Service Worker (pages en cache)
□ Auto-scroll dans le chat IA
□ Toast pour toutes les actions importantes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — COMMANDES DE DÉMARRAGE RAPIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 1. Cloner / initialiser
git init bac-senegal && cd bac-senegal

# 2. Lancer les services
docker-compose up -d

# 3. Backend
cd backend && npm install
cp .env.example .env          # Remplir ANTHROPIC_API_KEY
node src/db/migrate.js        # Créer les tables
node src/db/seed.js           # Données initiales
npm run dev                   # :3001

# 4. Frontend (autre terminal)
cd frontend && npm install
cp .env.example .env.local    # VITE_API_URL=http://localhost:3001/api
npm run dev                   # :5173

# 5. Comptes par défaut
Admin   : admin@bac-senegal.sn / Admin123!
Élève   : test@bac-senegal.sn  / Test123!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — CONTRAINTES FINALES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Modèle Claude : toujours utiliser "claude-sonnet-4-20250514"
• Langue UI : 100% français sénégalais
• Coefficients : ceux de la DGEX Sénégal (listés en Section 3)
• Streaming : obligatoire pour le chat IA (pas de réponse en bloc)
• Mobile first : l'app doit être utilisable sur un smartphone Android bas de gamme
• Accessibilité : contraste suffisant, textes lisibles sans zoom, touch targets ≥ 44px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMENCE MAINTENANT PAR L'ÉTAPE 1.
Annonce chaque étape démarrée, et confirme avec ✅ quand elle est terminée.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
