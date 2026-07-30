-- ============================================================
-- DBS AFRICA — Script de provisioning de la base de données
-- À exécuter une seule fois sur une base fraîche (ex. cPanel /
-- phpMyAdmin lors du déploiement). Idempotent dans l'ordre où il
-- est écrit : ne pas ré-exécuter sur une base déjà provisionnée.
--
-- Le compte administrateur n'est PAS créé ici : il est semé via
-- `npm run seed:admin` (lit ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD
-- dans .env). Voir README.md pour la procédure complète.
-- ============================================================

CREATE DATABASE dbs_africa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Remplacer CHANGE_ME par un mot de passe fort avant exécution,
-- puis reporter la même valeur dans DB_PASSWORD (fichier .env local, non versionné).
CREATE USER 'dbs_user'@'localhost' IDENTIFIED BY 'CHANGE_ME';

GRANT ALL PRIVILEGES
ON dbs_africa.*
TO 'dbs_user'@'localhost';

FLUSH PRIVILEGES;

USE dbs_africa;

-- ============================================================
-- TABLES DE BASE (sans dépendances)
-- ============================================================

CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','superadmin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('new','read','archived') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quote_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_type ENUM('individual','organization') NOT NULL,
    company_name VARCHAR(255) NULL,
    contact_name VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(150) NULL,
    phone VARCHAR(50) NULL,
    sector VARCHAR(150) NULL,
    service TEXT NULL,
    currency ENUM('FCFA','EUR','USD') NULL,
    budget VARCHAR(100) NULL,
    timeline VARCHAR(100) NULL,
    description TEXT NOT NULL,
    status ENUM('new','contacted','quoted','won','lost') DEFAULT 'new',
    notes TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,
    content LONGTEXT,
    image_url VARCHAR(255),
    status ENUM('draft','published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    client VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    technologies VARCHAR(255),
    image_url VARCHAR(500),
    project_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- MODULE PARTENAIRES
-- Reconstruit à partir du schéma réel de la base de développement
-- (ces tables étaient utilisées par le backend — partnerController,
-- partnerAuthController, partnerLeadController, partnerCommissionController —
-- mais n'avaient jamais été ajoutées à ce script).
-- ============================================================

CREATE TABLE partners (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    partner_code VARCHAR(30) NOT NULL,
    partner_type ENUM('individual','company') NOT NULL DEFAULT 'individual',
    full_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(180) DEFAULT NULL,
    email VARCHAR(180) NOT NULL,
    country_code VARCHAR(10) DEFAULT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    profession VARCHAR(150) DEFAULT NULL,
    experience TEXT,
    preferred_services TEXT,
    coverage_areas TEXT,
    identity_type ENUM('national_id','passport','other') DEFAULT NULL,
    identity_number VARCHAR(100) DEFAULT NULL,
    password_hash VARCHAR(255) DEFAULT NULL,
    activation_token_hash CHAR(64) DEFAULT NULL,
    activation_token_expires_at DATETIME DEFAULT NULL,
    activated_at DATETIME DEFAULT NULL,
    last_login_at DATETIME DEFAULT NULL,
    status ENUM('pending','approved','rejected','suspended') NOT NULL DEFAULT 'pending',
    level ENUM('bronze','silver','gold') NOT NULL DEFAULT 'bronze',
    commission_rate DECIMAL(5,2) NOT NULL DEFAULT 10.00,
    rejection_reason TEXT,
    admin_notes TEXT,
    approved_by INT DEFAULT NULL,
    approved_at DATETIME DEFAULT NULL,
    suspended_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY partner_code (partner_code),
    UNIQUE KEY email (email),
    KEY idx_partners_status (status),
    KEY idx_partners_level (level),
    KEY idx_partners_country (country),
    KEY idx_partners_created_at (created_at),
    KEY idx_partners_activation_token (activation_token_hash),
    CONSTRAINT fk_partners_approved_by FOREIGN KEY (approved_by)
        REFERENCES admin_users (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE partner_leads (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    partner_id INT UNSIGNED NOT NULL,
    lead_code VARCHAR(30) NOT NULL,
    client_type ENUM('individual','organization') NOT NULL DEFAULT 'organization',
    contact_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(180) DEFAULT NULL,
    email VARCHAR(180) DEFAULT NULL,
    country_code VARCHAR(10) DEFAULT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) DEFAULT NULL,
    city VARCHAR(100) DEFAULT NULL,
    sector VARCHAR(150) DEFAULT NULL,
    requested_service VARCHAR(255) NOT NULL,
    estimated_value DECIMAL(15,2) DEFAULT NULL,
    currency ENUM('FCFA','USD','EUR','BIF') NOT NULL DEFAULT 'FCFA',
    status ENUM('new','contacted','qualified','proposal_sent','negotiation','won','lost','cancelled') NOT NULL DEFAULT 'new',
    priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
    description TEXT,
    admin_notes TEXT,
    lost_reason TEXT,
    converted_quote_id INT DEFAULT NULL,
    assigned_to INT DEFAULT NULL,
    won_at DATETIME DEFAULT NULL,
    lost_at DATETIME DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY lead_code (lead_code),
    KEY idx_partner_leads_partner (partner_id),
    KEY idx_partner_leads_status (status),
    KEY idx_partner_leads_service (requested_service),
    KEY idx_partner_leads_created_at (created_at),
    CONSTRAINT fk_partner_leads_assigned_to FOREIGN KEY (assigned_to)
        REFERENCES admin_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_leads_partner FOREIGN KEY (partner_id)
        REFERENCES partners (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_partner_leads_quote FOREIGN KEY (converted_quote_id)
        REFERENCES quote_requests (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE partner_commissions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    partner_id INT UNSIGNED NOT NULL,
    lead_id INT UNSIGNED NOT NULL,
    invoice_reference VARCHAR(100) DEFAULT NULL,
    contract_amount DECIMAL(15,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(15,2) NOT NULL,
    currency ENUM('FCFA','USD','EUR','BIF') NOT NULL DEFAULT 'FCFA',
    status ENUM('pending','approved','paid','cancelled') NOT NULL DEFAULT 'pending',
    approved_by INT DEFAULT NULL,
    approved_at DATETIME DEFAULT NULL,
    paid_by INT DEFAULT NULL,
    paid_at DATETIME DEFAULT NULL,
    payment_method ENUM('bank_transfer','mobile_money','cash','other') DEFAULT NULL,
    payment_reference VARCHAR(150) DEFAULT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_partner_commission_lead (partner_id, lead_id),
    KEY idx_partner_commissions_status (status),
    KEY idx_partner_commissions_created_at (created_at),
    KEY idx_partner_commissions_paid_at (paid_at),
    CONSTRAINT fk_partner_commissions_approved_by FOREIGN KEY (approved_by)
        REFERENCES admin_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_commissions_lead FOREIGN KEY (lead_id)
        REFERENCES partner_leads (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_partner_commissions_paid_by FOREIGN KEY (paid_by)
        REFERENCES admin_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_commissions_partner FOREIGN KEY (partner_id)
        REFERENCES partners (id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE partner_activity_logs (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    partner_id INT UNSIGNED DEFAULT NULL,
    lead_id INT UNSIGNED DEFAULT NULL,
    commission_id INT UNSIGNED DEFAULT NULL,
    admin_user_id INT DEFAULT NULL,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    previous_data JSON DEFAULT NULL,
    new_data JSON DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_partner_logs_partner (partner_id),
    KEY idx_partner_logs_action (action),
    KEY idx_partner_logs_created_at (created_at),
    CONSTRAINT fk_partner_logs_admin FOREIGN KEY (admin_user_id)
        REFERENCES admin_users (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_logs_commission FOREIGN KEY (commission_id)
        REFERENCES partner_commissions (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_logs_lead FOREIGN KEY (lead_id)
        REFERENCES partner_leads (id) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_partner_logs_partner FOREIGN KEY (partner_id)
        REFERENCES partners (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vue agrégée utilisée par le tableau de bord partenaires
-- (statistiques de leads, revenus générés, commissions).
CREATE VIEW partner_performance AS
SELECT
    p.id AS partner_id,
    p.partner_code AS partner_code,
    p.full_name AS full_name,
    p.company_name AS company_name,
    p.country AS country,
    p.status AS status,
    p.level AS level,
    p.commission_rate AS commission_rate,
    COUNT(DISTINCT pl.id) AS total_leads,
    COUNT(DISTINCT (CASE WHEN pl.status = 'new' THEN pl.id END)) AS new_leads,
    COUNT(DISTINCT (CASE WHEN pl.status IN ('contacted','qualified','proposal_sent','negotiation') THEN pl.id END)) AS active_leads,
    COUNT(DISTINCT (CASE WHEN pl.status = 'won' THEN pl.id END)) AS won_leads,
    COUNT(DISTINCT (CASE WHEN pl.status = 'lost' THEN pl.id END)) AS lost_leads,
    COALESCE(SUM((CASE WHEN pl.status = 'won' THEN pl.estimated_value ELSE 0 END)), 0) AS generated_revenue,
    COALESCE(SUM((CASE WHEN pc.status IN ('pending','approved') THEN pc.commission_amount ELSE 0 END)), 0) AS unpaid_commissions,
    COALESCE(SUM((CASE WHEN pc.status = 'paid' THEN pc.commission_amount ELSE 0 END)), 0) AS paid_commissions,
    ROUND((CASE WHEN COUNT(DISTINCT pl.id) = 0 THEN 0
        ELSE (COUNT(DISTINCT (CASE WHEN pl.status = 'won' THEN pl.id END)) / COUNT(DISTINCT pl.id)) * 100
        END), 2) AS conversion_rate
FROM partners p
LEFT JOIN partner_leads pl ON pl.partner_id = p.id
LEFT JOIN partner_commissions pc ON pc.partner_id = p.id AND pc.lead_id = pl.id
GROUP BY p.id, p.partner_code, p.full_name, p.company_name, p.country, p.status, p.level, p.commission_rate;

-- ============================================================
-- DONNÉES INITIALES
-- Les images référencées (/uploads/*.jpg) doivent être déposées
-- manuellement dans dbs-backend/uploads/ sur le serveur (dossier
-- exclu du dépôt Git).
-- ============================================================

INSERT INTO projects
(title, slug, client, category, description, technologies, image_url, project_url, featured)
VALUES
(
    'SNRC - Site Institutionnel',
    'snrc-site-institutionnel',
    'SNRC Tchad',
    'Site Web Institutionnel',
    'Conception et développement du portail officiel de la Société Nationale de Recouvrement des Créances avec espace administration, actualités, publications et gestion de contenu.',
    'React,Node.js,PostgreSQL,Tailwind CSS',
    '/uploads/snrc.jpg',
    'https://snrc.td',
    1
),
(
    'Harvest Center',
    'harvest-center',
    'Harvest Center Tchad',
    'Centre de Formation',
    'Plateforme multilingue de gestion des formations, inscriptions, enseignants et étudiants avec portail administratif complet.',
    'React,Express,MySQL,i18next',
    '/uploads/harvest.jpg',
    'https://harvestcentertd.org',
    1
),
(
    'NDOF Consulting',
    'ndof-consulting',
    'NDOF Consulting',
    'Cabinet Conseil',
    'Développement du site vitrine professionnel avec gestion des réalisations, galerie, actualités, devis et contacts.',
    'React,Node.js,MySQL,REST API',
    '/uploads/ndof.jpg',
    'https://ndof-consulting.com',
    1
),
(
    'Eden Business Center',
    'eden-business-center',
    'Eden Business Center',
    'E-Commerce',
    'Plateforme de présentation et gestion des produits textiles avec galerie dynamique et espace administration.',
    'React,Express,MySQL,Dashboard',
    '/uploads/eden.jpg',
    'https://eden-businesscenter.org',
    0
),
(
    'MANI Financial Group',
    'mani-financial-group',
    'MANI Financial Group',
    'Microfinance',
    'Plateforme multilingue pour institution financière avec gestion des services, simulateurs et espace client.',
    'React,PostgreSQL,Prisma,i18next',
    '/uploads/mani.jpg',
    '',
    1
),
(
    'CDO Tchad',
    'cdo-tchad',
    'CDO Tchad',
    'Recrutement',
    'Portail de recrutement avec gestion des offres, candidatures et administration sécurisée.',
    'React,Node.js,PostgreSQL,Uploads',
    '/uploads/cdo.jpg',
    'https://cdotchad.com',
    1
);

INSERT INTO blog_posts
(title, slug, summary, content, image_url, status)
VALUES
(
    'Pourquoi Power BI est devenu incontournable pour le reporting moderne',
    'power-bi-reporting-moderne',
    'Découvrez comment Power BI aide les organisations à transformer leurs données en tableaux de bord décisionnels.',
    'Power BI est aujourd’hui l’une des plateformes les plus utilisées pour la Business Intelligence. Grâce à ses capacités de visualisation, de modélisation et d’automatisation, il permet aux organisations de prendre des décisions basées sur des données fiables.',
    '/uploads/powerbi.jpg',
    'published'
),
(
    'Les bonnes pratiques pour réussir un projet de transformation digitale',
    'transformation-digitale-reussie',
    'Les facteurs clés de succès pour mener à bien une transformation digitale.',
    'Une transformation digitale réussie repose sur une vision claire, l’implication des parties prenantes, une gouvernance efficace et l’adoption progressive des nouvelles technologies.',
    '/uploads/transformation.jpg',
    'published'
),
(
    'Comment automatiser ses rapports avec SQL et Power BI',
    'automatisation-rapports-sql-powerbi',
    'Réduisez le temps consacré aux rapports grâce à l’automatisation.',
    'L’automatisation des rapports permet de réduire les erreurs manuelles, gagner du temps et fournir des indicateurs actualisés aux décideurs. SQL et Power BI constituent une combinaison particulièrement efficace.',
    '/uploads/sql-powerbi.jpg',
    'published'
),
(
    'React et Node.js : un duo performant pour les applications modernes',
    'react-nodejs-applications-modernes',
    'Pourquoi React et Node.js sont devenus des références du développement web.',
    'React offre une interface utilisateur performante tandis que Node.js permet de construire des APIs rapides et évolutives. Ensemble, ils constituent une stack moderne et efficace.',
    '/uploads/react-node.jpg',
    'published'
),
(
    'Le rôle de la data dans la prise de décision stratégique',
    'data-decision-strategique',
    'Les données comme levier de performance et de croissance.',
    'Les entreprises qui exploitent efficacement leurs données disposent d’un avantage concurrentiel important. Les tableaux de bord et indicateurs facilitent le pilotage des activités.',
    '/uploads/data-strategie.jpg',
    'published'
),
(
    'Télécoms et Mobile Money : enjeux de la transformation numérique en Afrique',
    'telecom-mobile-money-afrique',
    'Analyse des tendances du secteur télécom et Mobile Money.',
    'Le Mobile Money continue de transformer les usages financiers en Afrique grâce à l’inclusion financière, aux paiements digitaux et aux services à valeur ajoutée.',
    '/uploads/mobile-money.jpg',
    'published'
);
