#!/usr/bin/env bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "[INFO] Iniciando QR Studio Definitivo Modular..."
cd "$PROJECT_DIR"

if [ -f "$HOME/.nvm/nvm.sh" ]; then
    echo "[INFO] Carregando nvm..."
    export NVM_DIR="$HOME/.nvm"
    # shellcheck disable=SC1090
    source "$NVM_DIR/nvm.sh"

    if ! nvm ls 20 >/dev/null 2>&1; then
        echo "[INFO] Instalando Node 20..."
        nvm install 20
    fi

    echo "[INFO] Usando Node 20..."
    nvm use 20
else
    echo "[WARN] nvm não encontrado. Usando Node do sistema."
    node -v || true
fi

if [ ! -d "node_modules" ]; then
    echo "[INFO] Instalando dependências..."
    npm install
else
    echo "[INFO] Dependências já instaladas."
fi

echo "[INFO] Subindo servidor de desenvolvimento..."
npm run dev
