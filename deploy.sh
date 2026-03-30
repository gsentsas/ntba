#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# deploy.sh — Script de déploiement BAC Sénégal IA
# VPS Plesk · nana-therese-ba.com
#
# Usage (première fois) : bash deploy.sh --fresh
# Usage (mise à jour)   : bash deploy.sh
# ─────────────────────────────────────────────────────────────
set -euo pipefail

# Charger node/npm — supporte nvm, n, apt, brew, Plesk NodeJS
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh" 2>/dev/null || true
for _d in \
    "$HOME/.nvm/versions/node/"*/bin \
    /usr/local/bin \
    /usr/bin \
    /opt/plesk/node/*/bin \
    /opt/nvm/versions/node/*/bin \
    /usr/local/nodejs/bin; do
    [[ -d "$_d" ]] && export PATH="$_d:$PATH"
done

FRESH=${1:-""}
APP_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "📦 BAC Sénégal IA — Déploiement"
echo "   Répertoire : $APP_DIR"
echo "───────────────────────────────────────────────────────"

cd "$APP_DIR"

# ── 0. Pull Git ─────────────────────────────────────────────
echo "🔄 Mise à jour du code…"
git pull origin main

# ── 1. Pré-contrôle prod (après pull pour avoir la version à jour) ──
echo "🔎 Vérification pré-déploiement…"
bash "$APP_DIR/scripts/preflight_prod.sh"

# ── 2. PHP / Laravel ────────────────────────────────────────
echo "🐘 Dépendances PHP…"
composer install --no-dev --optimize-autoloader --no-interaction

echo "⚙️  Configuration Laravel…"
php artisan config:cache
php artisan route:cache
php artisan view:cache

if [[ "$FRESH" == "--fresh" ]]; then
    echo "🗄️  Migrations Laravel…"
    php artisan migrate --force
fi

# ── 3. Frontend Node.js / Vite ───────────────────────────────
# Diagnostic si npm toujours absent
if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm introuvable. Chemins testés : $PATH"
    echo "   Cherche npm sur le système…"
    find /opt /usr/local /usr/bin /root /home -name "npm" -type f 2>/dev/null | head -5
    exit 1
fi
echo "   node : $(node -v)  npm : $(npm -v)"

echo "📦 Dépendances npm (frontend — avec devDeps pour le build)…"
npm ci 2>/dev/null || npm install

echo "🔨 Build Vite…"
npm run build

# ── 4. Backend Node.js ───────────────────────────────────────
echo "📦 Dépendances npm (backend)…"
cd "$APP_DIR/backend"
npm ci --omit=dev 2>/dev/null || npm install --omit=dev

if [[ "$FRESH" == "--fresh" ]]; then
    echo "🗄️  Migration base PostgreSQL…"
    npm run migrate

    echo "🌱 Seed base de données…"
    npm run seed
    npm run seed:official
    npm run seed:annales
fi

cd "$APP_DIR"

# ── 5. PM2 ──────────────────────────────────────────────────
echo "🚀 Redémarrage du backend (PM2)…"
if pm2 list | grep -q "bac-api"; then
    pm2 reload bac-api
else
    pm2 start ecosystem.config.cjs
    pm2 save
fi

echo ""
echo "✅ Déploiement terminé !"
echo "   Frontend : https://nana-therese-ba.com"
echo "   API      : https://nana-therese-ba.com/api"
echo "───────────────────────────────────────────────────────"
