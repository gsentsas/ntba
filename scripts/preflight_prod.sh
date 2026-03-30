#!/usr/bin/env bash

set -euo pipefail

# Charger node/npm — supporte nvm, n, apt, brew, Plesk NodeJS
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
[[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh" 2>/dev/null || true
# Ajouter tous les chemins node courants
for _d in \
    "$HOME/.nvm/versions/node/"*/bin \
    /usr/local/bin \
    /usr/bin \
    /opt/plesk/node/*/bin \
    /opt/nvm/versions/node/*/bin \
    /usr/local/nodejs/bin; do
    [[ -d "$_d" ]] && export PATH="$_d:$PATH"
done

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Pré-contrôle production"
echo "Projet : $ROOT_DIR"

require_command() {
    local name="$1"

    if ! command -v "$name" >/dev/null 2>&1; then
        echo "ERREUR: commande manquante: $name" >&2
        exit 1
    fi
}

require_file() {
    local path="$1"

    if [[ ! -f "$path" ]]; then
        echo "ERREUR: fichier manquant: $path" >&2
        exit 1
    fi
}

require_non_empty_var() {
    local file="$1"
    local key="$2"

    if ! grep -Eq "^${key}=.+" "$file"; then
        echo "ERREUR: variable manquante ou vide dans $file: $key" >&2
        exit 1
    fi
}

require_command git
require_command composer
require_command php
# npm/node : chemin variable selon Plesk — vérifié dans deploy.sh
if ! command -v npm >/dev/null 2>&1; then
    echo "AVERTISSEMENT: npm introuvable dans PATH=$PATH — deploy.sh tentera de le localiser"
fi

require_file "$ROOT_DIR/.env"
require_file "$ROOT_DIR/backend/.env"
require_file "$ROOT_DIR/ecosystem.config.cjs"

require_non_empty_var "$ROOT_DIR/.env" "APP_KEY"
require_non_empty_var "$ROOT_DIR/backend/.env" "JWT_SECRET"
require_non_empty_var "$ROOT_DIR/backend/.env" "DATABASE_URL"
require_non_empty_var "$ROOT_DIR/backend/.env" "FRONTEND_URL"

echo "OK: prérequis système et variables critiques présents"
