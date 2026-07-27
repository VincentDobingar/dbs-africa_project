# DBS Africa — dbs-africa.org

Site web de **DBS Africa**, cabinet panafricain de conseil en transformation digitale, data, intelligence artificielle, cybersécurité, cloud et ingénierie logicielle.

Monorepo à deux applications indépendantes :

```
dbs-africa.com/
├── dbs-frontend/   Site public + espace Admin + espace Partenaires (Vite + React + Tailwind)
└── dbs-backend/    API REST (Express + MySQL)
```

## Stack technique

**Frontend** (`dbs-frontend/`)
- Vite + React (JSX)
- Tailwind CSS (dark mode via classe `dark`)
- React Router (site public, `/admin`, `/partner`)
- i18next / react-i18next (FR/EN)
- Framer Motion (animations, transitions de page)

**Backend** (`dbs-backend/`)
- Node.js + Express
- MySQL (`mysql2`)
- Auth JWT (admin + partenaires), bcrypt
- Helmet, CORS, Morgan, Multer (uploads)

## Démarrage

### 1. Base de données

```bash
mysql -u root -p < dbs-backend/Script_db.sql
```

> Le script crée l'utilisateur `dbs_user` avec un mot de passe placeholder (`CHANGE_ME`) — le remplacer avant exécution, puis reporter la même valeur dans `dbs-backend/.env`.

### 2. Backend

```bash
cd dbs-backend
cp .env.example .env   # renseigner les variables (voir ci-dessous)
npm install
npm run seed:admin     # crée le premier compte admin (nécessite ADMIN_SEED_* dans .env)
npm run dev             # http://localhost:5000
```

Variables d'environnement principales (`dbs-backend/.env`, jamais commité) :

| Variable | Rôle |
|---|---|
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` | Connexion MySQL |
| `JWT_SECRET`, `PARTNER_JWT_SECRET` | Signature des tokens admin / partenaires |
| `FRONTEND_URL` | Origine autorisée en CORS |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_TO` | Envoi d'emails (notifications) |
| `ADMIN_SEED_NAME`, `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD` | Compte admin créé par `npm run seed:admin` |

### 3. Frontend

```bash
cd dbs-frontend
npm install
npm run dev              # http://localhost:5173 (ou port suivant si occupé)
```

`VITE_API_URL` (optionnelle, `.env` du frontend) pointe vers l'API backend — par défaut `http://localhost:5000/api`. **À définir explicitement en production**, sans quoi les appels API tentent de joindre localhost.

## Structure du frontend

- `src/pages/public/` — les 11 pages publiques (Home, About, Expertise, Industries, Solutions, Technologies, Portfolio, Certifications, Insights/Blog, Careers, Contact) + Pricing/Quote
- `src/pages/admin/` — back-office (messages, devis, portfolio, actualités, utilisateurs, partenaires)
- `src/modules/partners/` — espace partenaires (inscription, activation, connexion, dashboard)
- `src/components/home/` — sections de la page d'accueil
- `src/data/` — contenus structurés (expertise, industries, technologies, certifications)
- `src/i18n/index.js` — toutes les traductions FR/EN
- `src/context/ThemeContext.jsx` — dark/light mode
- `src/pricing/` — module de tarification (devises, comparatif)

## État du projet

Refonte réalisée en plusieurs phases : structure des 11 pages, cohérence visuelle, dark mode / SEO structuré / accessibilité / animations, catégorisation du portfolio (Web / Data / Humanitaire). Voir l'historique Git pour le détail des changements.

### Points de vigilance connus

- `react` / `react-dom` ne sont pas déclarés dans `dbs-frontend/package.json` (dépendance transitive installée) — à corriger.
- Pas de tests automatisés ni de linting configuré.
- Images non optimisées dans `dbs-frontend/src/assets/` (plusieurs Mo chacune) — à compresser/convertir en WebP.
- Pas de rate-limiting sur les routes publiques du backend (`/api/contact`, `/api/quotes`, `/api/auth/login`).
