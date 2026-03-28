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
