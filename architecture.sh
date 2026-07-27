#!/usr/bin/env bash

set -euo pipefail

OUTPUT_FILE="architecture-dbs-africa.txt"
MAX_DEPTH="${1:-6}"

EXCLUDED_DIRS=(
  ".git"
  ".idea"
  ".vscode"
  "node_modules"
  "dist"
  "build"
  "coverage"
  ".next"
  ".cache"
  "uploads"
  "logs"
  "tmp"
  "temp"
)

EXCLUDED_FILES=(
  ".env"
  ".env.local"
  ".env.development"
  ".env.production"
  "*.log"
  "package-lock.json"
  "yarn.lock"
  "pnpm-lock.yaml"
)

PROJECT_ROOT="$(pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"

{
  echo "============================================================"
  echo "ARCHITECTURE DU PROJET DBS AFRICA"
  echo "============================================================"
  echo "Projet       : $PROJECT_NAME"
  echo "Répertoire   : $PROJECT_ROOT"
  echo "Profondeur   : $MAX_DEPTH"
  echo "Généré le    : $(date '+%Y-%m-%d %H:%M:%S')"
  echo "============================================================"
  echo

  if command -v tree >/dev/null 2>&1; then
    IGNORE_PATTERN="$(
      IFS='|'
      echo "${EXCLUDED_DIRS[*]}|${EXCLUDED_FILES[*]}"
    )"

    tree \
      -a \
      -L "$MAX_DEPTH" \
      -I "$IGNORE_PATTERN" \
      --dirsfirst
  else
    echo "La commande 'tree' n'est pas installée."
    echo "Architecture générée avec 'find'."
    echo

    FIND_EXCLUSIONS=()

    for directory in "${EXCLUDED_DIRS[@]}"; do
      FIND_EXCLUSIONS+=(
        -not -path "*/${directory}"
        -not -path "*/${directory}/*"
      )
    done

    for filename in "${EXCLUDED_FILES[@]}"; do
      FIND_EXCLUSIONS+=(
        -not -name "$filename"
      )
    done

    find . \
      -mindepth 1 \
      -maxdepth "$MAX_DEPTH" \
      "${FIND_EXCLUSIONS[@]}" \
      -print |
      sort
  fi

  echo
  echo "============================================================"
  echo "FICHIERS PACKAGE.JSON"
  echo "============================================================"

  find . \
    -name "package.json" \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -print |
    sort

  echo
  echo "============================================================"
  echo "FICHIERS DE CONFIGURATION PRINCIPAUX"
  echo "============================================================"

  find . \
    -maxdepth "$MAX_DEPTH" \
    \( \
      -name "vite.config.*" \
      -o -name "server.js" \
      -o -name "app.js" \
      -o -name "index.js" \
      -o -name "routes.js" \
      -o -name "schema.sql" \
      -o -name "prisma.schema" \
      -o -name "schema.prisma" \
    \) \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -print |
    sort

} > "$OUTPUT_FILE"

echo
echo "Architecture générée avec succès :"
echo "$PROJECT_ROOT/$OUTPUT_FILE"
echo
echo "Vous pouvez maintenant ouvrir ce fichier et copier son contenu."