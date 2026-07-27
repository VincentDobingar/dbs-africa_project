#!/usr/bin/env bash

set -euo pipefail

OUTPUT_FILE="contexte-module-partenaires.txt"

FILES=(
  "dbs-backend/package.json"
  "dbs-backend/Script_db.sql"
  "dbs-backend/src/config/db.js"
  "dbs-backend/src/server.js"
  "dbs-backend/src/middlewares/authMiddleware.js"
  "dbs-backend/src/controllers/adminController.js"
  "dbs-backend/src/controllers/authController.js"
  "dbs-backend/src/controllers/contactController.js"
  "dbs-backend/src/controllers/quoteController.js"
  "dbs-backend/src/routes/adminRoutes.js"
  "dbs-backend/src/routes/authRoutes.js"
  "dbs-backend/src/routes/contactRoutes.js"
  "dbs-backend/src/routes/quoteRoutes.js"
  "dbs-frontend/package.json"
  "dbs-frontend/src/App.jsx"
  "dbs-frontend/src/api/axios.js"
  "dbs-frontend/src/i18n/index.js"
  "dbs-frontend/src/components/layout/Navbar.jsx"
  "dbs-frontend/src/pages/admin/AdminLayout.jsx"
  "dbs-frontend/src/pages/admin/Dashboard.jsx"
  "dbs-frontend/src/pages/admin/ProtectedRoute.jsx"
  "dbs-frontend/src/pages/public/QuoteRequest.jsx"
)

: > "$OUTPUT_FILE"

{
  echo "============================================================"
  echo "CONTEXTE TECHNIQUE — MODULE PARTENAIRES DBS AFRICA"
  echo "============================================================"
  echo "Généré le : $(date '+%Y-%m-%d %H:%M:%S')"
  echo

  for file in "${FILES[@]}"; do
    echo
    echo "============================================================"
    echo "FICHIER : $file"
    echo "============================================================"

    if [[ -f "$file" ]]; then
      sed \
        -e 's/\(password[[:space:]]*[:=][[:space:]]*\).*/\1[MASQUÉ]/Ig' \
        -e 's/\(secret[[:space:]]*[:=][[:space:]]*\).*/\1[MASQUÉ]/Ig' \
        -e 's/\(token[[:space:]]*[:=][[:space:]]*\).*/\1[MASQUÉ]/Ig' \
        -e 's/\(api[_-]*key[[:space:]]*[:=][[:space:]]*\).*/\1[MASQUÉ]/Ig' \
        "$file"
    else
      echo "[FICHIER INTROUVABLE]"
    fi
  done

} >> "$OUTPUT_FILE"

echo
echo "Contexte généré avec succès :"
echo "$(pwd)/$OUTPUT_FILE"
echo
echo "Vérifiez rapidement le fichier avant de le partager."