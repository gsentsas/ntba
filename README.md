# BAC Sénégal IA

Base de travail du projet **BAC Sénégal IA** adaptée au repo Laravel + React existant.

## Stack actuelle

- Backend: Laravel 13
- Frontend: React + TypeScript + Vite
- Infra locale: PostgreSQL 15 + Redis 7 via Docker Compose

## Démarrage local

1. Installer les dépendances PHP et Node:
   - `composer install`
   - `npm install`
2. Préparer l'environnement:
   - `cp .env.example .env`
   - configurer les variables de base de données, Redis et les clés applicatives sans secret en dur
3. Lancer les services locaux:
   - `docker compose up -d`
4. Démarrer l'application:
   - `composer run dev`

## Objectif de cette étape

Cette étape initialise l'infrastructure du projet existant pour accueillir les prochaines phases de BAC Sénégal IA sans recréer un second projet parallèle.

## Préparation production

Avant un déploiement de production, vérifier au minimum :

- configuration Laravel dans `.env`
- possibilité de partir de `.env.production.example` pour le serveur Laravel
- configuration backend Node dans `backend/.env`
- présence des secrets obligatoires : `JWT_SECRET`, `DATABASE_URL`, `FRONTEND_URL`
- disponibilité des services externes : PostgreSQL, Redis, Anthropic, Wave/Orange Money si activés

Exemple backend :

- copier `backend/.env.example` vers `backend/.env`
- adapter les valeurs au serveur cible
- lancer `bash scripts/preflight_prod.sh` avant un déploiement manuel

Attention :

- si `ANTHROPIC_API_KEY` est absente ou invalide, l'IA bascule en mode dégradé
- si les clés de paiement sont absentes, certaines réponses restent en `demo_mode`
