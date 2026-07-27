CREATE DATABASE dbs_africa CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Remplacer CHANGE_ME par un mot de passe fort avant exécution,
-- puis reporter la même valeur dans DB_PASSWORD (fichier .env local, non versionné).
CREATE USER 'dbs_user'@'localhost' IDENTIFIED BY 'CHANGE_ME';

ALTER DATABASE dbs_africa
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES
ON dbs_africa.*
TO 'dbs_user'@'localhost';

FLUSH PRIVILEGES;

use dbs_africa; 

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

    status ENUM(
        'new',
        'contacted',
        'quoted',
        'won',
        'lost'
    ) DEFAULT 'new',

    notes TEXT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','superadmin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','superadmin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE quote_requests
CONVERT TO CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

ALTER TABLE quote_requests
CONVERT TO CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

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

select * from projects;


INSERT INTO projects
(
    title,
    slug,
    client,
    category,
    description,
    technologies,
    image_url,
    project_url,
    featured
)
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
(
    title,
    slug,
    summary,
    content,
    image_url,
    status
)
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


UPDATE projects
SET image_url = '/uploads/cdo.jpg',
    project_url = 'https://cdotchad.com'
WHERE slug = 'cdo-tchad';

ALTER TABLE quote_requests
ADD COLUMN client_type ENUM('individual','organization') NOT NULL AFTER id,

ADD COLUMN country VARCHAR(150) NULL AFTER email,

ADD COLUMN sector VARCHAR(150) NULL AFTER phone,

ADD COLUMN currency ENUM('FCFA','EUR','USD') NULL AFTER service,

ADD COLUMN timeline VARCHAR(100) NULL AFTER budget,

ADD COLUMN notes TEXT NULL AFTER status,

ADD COLUMN updated_at TIMESTAMP NULL
AFTER created_at;

ALTER TABLE quote_requests
MODIFY updated_at TIMESTAMP
DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP;
