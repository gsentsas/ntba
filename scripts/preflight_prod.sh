#!/usr/bin/env bash

set -euo pipefail

# Charger nvm en session non-interactive
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
[[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
export PATH="$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -1)/bin:/usr/local/bin:/usr/bin:$PATH"

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
require_command npm

require_file "$ROOT_DIR/.env"
require_file "$ROOT_DIR/backend/.env"
require_file "$ROOT_DIR/ecosystem.config.cjs"

require_non_empty_var "$ROOT_DIR/.env" "APP_KEY"
require_non_empty_var "$ROOT_DIR/backend/.env" "JWT_SECRET"
require_non_empty_var "$ROOT_DIR/backend/.env" "DATABASE_URL"
require_non_empty_var "$ROOT_DIR/backend/.env" "FRONTEND_URL"

echo "OK: prérequis système et variables critiques présents"
