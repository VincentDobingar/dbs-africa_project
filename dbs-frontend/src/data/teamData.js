import abdoulayePhoto from "../assets/team/abdoulaye-barthelemy.jpg";
import clementPhoto from "../assets/team/webba-clement.jpg";
import amitPhoto from "../assets/team/amit-singh.jpg";
import didierPhoto from "../assets/team/didier-mingue.jpg";
import aminaPhoto from "../assets/team/amina-ngarambe.jpg";
import alainPhoto from "../assets/team/alain-mahamat.jpg";
import nadegePhoto from "../assets/team/nadege-kabore.jpg";
import lemaPhoto from "../assets/team/lema-logamou-seknewna.jpg";

export const teamMembers = [
  {
    id: 1,
    slug: "abdoulaye-barthelemy",
    name: "Abdoulaye Barthelemy",
    roleKey: "about.team.members.abdoulaye.role",
    roleDefault:
      "Consultant – Directeur des Systèmes d'Information (DSI)",
    descriptionKey: "about.team.members.abdoulaye.description",
    descriptionDefault:
      "Professionnel de l'information et de la donnée avec plus de 16 ans d'expérience en contextes humanitaires et développement : gouvernance des données, analyse avancée et conception de solutions digitales au service de la décision et de l'impact terrain.",
    photo: abdoulayePhoto,
    email: null,
    linkedin: "https://www.linkedin.com/in/abdoulaye-barthelemy-ab773855/",
  },
  {
    id: 2,
    slug: "clement-woueba",
    name: "Clément Woueba",
    roleKey: "about.team.members.clement.role",
    roleDefault: "Consultant – Responsable Cybersécurité",
    descriptionKey: "about.team.members.clement.description",
    descriptionDefault:
      "Ingénieur en cybersécurité avec plus de 4 ans d'expérience dans la protection des systèmes d'information : gouvernance de la sécurité, détection et réponse aux incidents, gestion des vulnérabilités, et déploiement de solutions SIEM, EDR, pare-feu nouvelle génération, NAC, PAM et DLP.",
    photo: clementPhoto,
    email: "yanonw@gmail.com",
    linkedin: "https://www.linkedin.com/in/woueba-clement-yonon-",
    resume: {
      experience: [
        {
          period: "Avril 2022 – Présent",
          title: "IT Security Engineer",
          company: "Moov Africa Tchad",
          location: "N'Djamena, Tchad",
          bullets: [
            "Conception, déploiement et pilotage des solutions de sécurité d'entreprise (protection des postes, sécurité réseau, contrôle d'accès) pour une infrastructure télécom critique",
            "Supervision des événements de sécurité et pilotage de la réponse aux incidents",
            "Administration de Trellix ePolicy Orchestrator (ePO) pour la gestion centralisée des postes",
            "Conduite des évaluations de vulnérabilités et des plans de remédiation",
            "Coordination de la réponse aux incidents avec les partenaires SOC externes (Casanet / Thales Group)",
            "Animation de sessions de sensibilisation et de formation à la cybersécurité",
          ],
        },
        {
          period: "Mai 2026 – Présent",
          title: "Mentor – Incident Response Track, Her CyberTracks (ITU/GIZ)",
          company: "Remote",
          bullets: [
            "Mentorat de professionnels de la cybersécurité sur l'analyse des menaces et la réponse aux incidents",
            "Animation d'ateliers pratiques basés sur des simulations d'incidents réels",
          ],
        },
      ],
      projects: [
        "Redéploiement du pare-feu nouvelle génération Cisco NGFW Firepower",
        "Déploiement de Trellix ePolicy Orchestrator (ePO/EDR On-Premise)",
        "Déploiement de la solution NAC Cisco ISE",
        "Mise en œuvre de Wallix Bastion PAM (On-Premise)",
        "Intégration SOC avec Casanet / Thales Group",
        "Transformation de l'architecture sécurité réseau (Palo Alto, FortiGate, Arbor Anti-DDoS)",
      ],
      skills: [
        {
          category: "Supervision & gestion des incidents",
          items: ["IBM QRadar", "Microsoft Sentinel", "Splunk", "MITRE ATT&CK", "MISP", "VirusTotal", "IBM X-Force"],
        },
        {
          category: "Technologies de sécurité",
          items: [
            "Trellix EDR",
            "Microsoft Defender for Endpoint",
            "CrowdStrike",
            "Cisco Firepower",
            "FortiGate",
            "Palo Alto Networks",
            "Cisco ISE",
            "Wallix Bastion",
          ],
        },
        {
          category: "Référentiels & gouvernance",
          items: ["ISO 27001", "ISO 27005", "NIST CSF/RMF", "OWASP Top 10", "GDPR", "ITIL"],
        },
      ],
      certifications: [
        { name: "NIST Risk Management Framework", year: "2026" },
        { name: "Fortinet NSE 4 – Security Operations", year: "2025" },
        { name: "Cisco CyberOps Associate", year: "2024" },
        { name: "ISC2 Certified in Cybersecurity (CC)", year: "2024" },
        { name: "CompTIA Security+ (SY0-601)", year: "2023" },
        { name: "PECB ISO/IEC 27032 Lead Cybersecurity Manager", year: "2023" },
        { name: "SCRUMstudy Scrum Fundamentals Certified", year: "2023" },
        { name: "Huawei Cloud Computing", year: "2022" },
      ],
      education: [
        {
          degree: "Master II – Réseaux & Télécommunications",
          school: "ENSET Douala, Cameroun",
          period: "2021",
        },
        {
          degree: "Licence – Administration & Sécurité des Réseaux",
          school: "IUC Douala, Cameroun",
          period: "2019",
        },
      ],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "Courant" },
      ],
    },
  },
  {
    id: 3,
    slug: "amit-singh",
    name: "Amit Singh",
    roleKey: "about.team.members.amit.role",
    roleDefault:
      "Consultant Senior – Revenue Assurance & Fraud Management (RAFM)",
    descriptionKey: "about.team.members.amit.description",
    descriptionDefault:
      "Leader stratégique fort de plus de 17 ans d'expérience internationale en Afrique, au Moyen-Orient, en Asie du Sud et en Asie du Sud-Est dans les domaines de l'Assurance Revenus, la Gestion de la Fraude, le Risque Mobile Money et la Conformité Réglementaire, au service d'opérateurs télécoms, de régulateurs et d'institutions fintech de premier plan. Expertise reconnue dans la mise en place de cadres RAFM, le renforcement de la gouvernance, l'optimisation des contrôles antifraude, l'appui à la prise de décision des directions générales et la protection de flux de revenus de plusieurs millions de dollars, avec un solide parcours de management d'équipes, d'alignement réglementaire et de déploiement de plateformes RAFM avancées sur les écosystèmes GSM, services numériques et mobile money.",
    photo: amitPhoto,
    email: "amit.singh0203@gmail.com",
    phone: "+91 90999 80442",
    linkedin: "https://www.linkedin.com/in/amit-singh-rafm/",
    portfolioUrl: "https://amitsingh0203.github.io/",
  },
  {
    id: 4,
    slug: "didier-mingueyambaye",
    name: "Didier Mingueyambaye",
    roleKey: "about.team.members.didier.role",
    roleDefault:
      "Consultant Senior – Ingénieur Travaux Réseaux & Systèmes Informatiques",
    descriptionKey: "about.team.members.didier.description",
    descriptionDefault:
      "Expert en déploiement d'infrastructures IT, maîtrisant les réseaux LAN/WAN/SD-WAN, la virtualisation et l'administration Windows/Linux. Certifié CCNA et formé à ITIL 4, il conjugue expertise technique et pilotage de projets pour des infrastructures fiables et performantes.",
    photo: didierPhoto,
    email: "mingue.didier@gmail.com",
    linkedin:
      "https://www.linkedin.com/in/mingueyambaye-didier-it-professional-489a8134a/",
    resume: {
      experience: [
        {
          period: "Juin 2021 – Présent",
          title: "Responsable Service Desk, Division Système d'Information",
          company: "Maroc Télécom",
          bullets: [
            "Point de contact unique (SPOC) pour les utilisateurs des produits et services de la Division SI",
            "Pilotage de l'équipe Helpdesk et intégration des nouveaux utilisateurs",
            "Production et analyse des tableaux de bord journaliers, hebdomadaires et mensuels",
            "Gestion des actifs logiciels et matériels, du service fournisseur et de l'infogérance",
            "Planification et déploiement de projets de migration (matériel, logiciels, systèmes d'exploitation)",
          ],
        },
        {
          period: "Juillet 2019 – Mai 2021",
          title: "Office Infrastructure Support",
          company: "Maroc Télécom",
        },
        {
          period: "Décembre 2015 – Juillet 2019",
          title: "Office Infrastructure Support",
          company: "Tigo N'Djamena / Tchad",
          bullets: [
            "Administration à distance des agences Tigo (N'Djamena, Moundou, Abéché, Mao)",
            "Support informatique aux utilisateurs et maintenance du parc",
          ],
        },
        {
          period: "Octobre 2014 – Décembre 2015",
          title: "Office Infrastructure Support",
          company: "Agence Tigo de Moundou / Tchad",
          bullets: [
            "Administration LAN/WAN de l'agence et maintenance du lien BLR",
            "Support informatique aux utilisateurs finaux",
          ],
        },
        {
          period: "Août 2007 – Avril 2013",
          title: "Technicien Supérieur IT",
          company: "SODITEL",
          bullets: [
            "Maintenance du parc informatique de clients (BSIC, CDE, Ecobank, Tractafric, Celtel)",
            "Installation et configuration d'antennes VSAT (CBT, Cotontchad, World Vision, Amasot)",
          ],
        },
      ],
      skills: [
        {
          category: "Administration système & support",
          items: [
            "Windows Server 2003/2012/2018",
            "Active Directory",
            "Exchange 2012",
            "Sauvegardes systèmes & utilisateurs",
            "Antivirus (Nod32, Kaspersky, McAfee)",
            "Windows 7 à 11",
          ],
        },
        {
          category: "Réseaux",
          items: [
            "LAN / WAN / SD-WAN",
            "TCP/IP",
            "Routage statique & dynamique",
            "VLAN (IEEE 802.1Q, ISL)",
            "Antennes radio Radwin, Alvarion",
          ],
        },
      ],
      certifications: [
        { name: "CCNA Routing & Switching 200-301", year: "2020" },
        { name: "ITIL 4 Foundation", year: "2019" },
      ],
      education: [
        {
          degree: "Ingénieur des travaux informatiques – Réseaux et Systèmes Informatiques",
          school: "École Supérieure d'Informatique et d'Électronique (EIE), N'Djamena, Tchad",
          period: "2010 – 2011",
        },
        {
          degree: "BTS Informatique industrielle et maintenance",
          school: "EIE, N'Djamena, Tchad",
          period: "2002 – 2004",
        },
      ],
      languages: [
        { name: "Français", level: "Courant" },
        { name: "Arabe", level: "Courant" },
        { name: "Anglais", level: "Niveau scolaire" },
      ],
    },
  },
  {
    id: 5,
    slug: "amina-ngarambe",
    name: "Amina Ngarambe",
    roleKey: "about.team.members.amina.role",
    roleDefault: "Responsable Data Analytics & Business Intelligence",
    descriptionKey: "about.team.members.amina.description",
    descriptionDefault:
      "Spécialiste en analyse de données, conception de tableaux de bord, automatisation du reporting et accompagnement à la prise de décision.",
    photo: aminaPhoto,
    email: null,
    linkedin: null,
  },
  {
    id: 6,
    slug: "alain-mahamat",
    name: "Alain Mahamat",
    roleKey: "about.team.members.alain.role",
    roleDefault: "Lead Développement Web & Applications",
    descriptionKey: "about.team.members.alain.description",
    descriptionDefault:
      "Développeur full-stack spécialisé dans la conception de plateformes web, d’applications métiers, d’API sécurisées et de solutions digitales évolutives.",
    photo: alainPhoto,
    email: null,
    linkedin: null,
  },
  {
    id: 7,
    slug: "nadege-kabore",
    name: "Nadège Kaboré",
    roleKey: "about.team.members.nadege.role",
    roleDefault: "Responsable Marketing Digital & Partenariats",
    descriptionKey: "about.team.members.nadege.description",
    descriptionDefault:
      "Professionnelle du marketing digital, de la prospection commerciale, de l’acquisition client et du développement de partenariats stratégiques.",
    photo: nadegePhoto,
    email: null,
    linkedin: null,
  },
  {
    id: 8,
    slug: "lema-logamou-seknewna",
    name: "Dr. Lema Logamou Seknewna",
    roleKey: "about.team.members.lema.role",
    roleDefault:
      "Responsable Recherche, Formation et Développement Technologique",
    descriptionKey: "about.team.members.lema.description",
    descriptionDefault:
      "Docteur en Mathématiques (option Statistique), data scientist, chercheur et enseignant avec plus de 10 ans d'expérience en machine learning, économétrie, analyse spatiale et analytique de l'enseignement supérieur au sein d'institutions académiques et publiques de premier plan (AIMS, National Institute of Statistics of Rwanda, Higher Education Council du Rwanda, Ministère des Finances du Tchad). Expertise reconnue dans la conception de modèles data-driven, le développement d'applications d'intelligence artificielle et l'encadrement pédagogique, au service de la recherche, de la formation et de l'innovation technologique.",
    photo: lemaPhoto,
    email: "seknewna@gmail.com",
    phone: "+250 798 697 010",
    linkedin: "https://www.linkedin.com/in/dr-lema-logamou-seknewna-367b07152/",
    resume: {
      experience: [
        {
          period: "Septembre 2025 – Présent",
          title: "Data Scientist Expert",
          company: "Higher Education Council (HEC), Rwanda",
          bullets: [
            "Gouvernance des données et renforcement des capacités",
            "Conception de tableaux de bord et production de rapports",
          ],
        },
        {
          period: "Juillet 2024 – Présent",
          title: "Senior Data Scientist",
          company: "AIMS – NISR (National Institute of Statistics of Rwanda)",
          bullets: [
            "Chercheur sur le projet ONS (UK)–AIMS sur la pollution de l'air et les maladies respiratoires au Rwanda : nettoyage/fusion de données, modèles de Machine Learning pour données de comptage, reporting",
            "Renforcement des capacités au Département Data Revolution & Big Data (DR&BD) du NISR",
            "Développement web de l'indice des prix à la consommation (NISR) et d'autres applications",
            "Enseignant dans les centres AIMS : Introduction aux langages informatiques (AIMS Rwanda), Machine Learning avec Python (AIMS Ghana)",
          ],
        },
        {
          period: "Septembre 2023 – Juin 2024",
          title: "Assistant d'enseignement",
          company: "AIMS Rwanda",
          bullets: [
            "Accompagnement des étudiants sur les théories mathématiques et l'intégration de la programmation dans le curriculum",
            "Évaluation des étudiants et développement de supports pédagogiques innovants",
          ],
        },
        {
          period: "Septembre 2022 – Août 2023",
          title: "Chercheur postdoctoral",
          company: "Université de Mayotte",
          bullets: [
            "Projet sur la gestion des risques spatio-temporels à partir des données de comptage de moustiques",
            "Découverte des facteurs de prolifération des moustiques à Mayotte et estimation de matrices de contacts sociaux",
            "Enseignement de l'algèbre numérique (Python) aux étudiants de licence",
          ],
        },
        {
          period: "Novembre 2020 – Juillet 2022",
          title: "Assistant d'enseignement",
          company: "AIMS Sénégal",
          bullets: [
            "Sessions de TD/TP en programmation (R, Python, SageMath, Octave) pour étudiants de master, avec GitHub et Linux",
            "Cours de Statistiques, LaTeX, R et Python ; coordination des séminaires et conférences",
          ],
        },
        {
          period: "Mars 2020 – Novembre 2020",
          title: "Consultant Statisticien/Économiste",
          company: "Ministère des Finances et du Budget, Tchad",
          bullets: [
            "Analyse des données d'aide internationale, Projet Annuel de Performance (PAP) et Cadre des Dépenses à Moyen Terme (CDMT)",
          ],
        },
        {
          period: "Février 2019 – Mars 2020",
          title: "Consultant, Département de la Statistique Économique",
          company: "INSEED, Tchad",
          bullets: [
            "Collecte et traitement des données pour le calcul de l'indice du coût de la construction au Tchad",
            "Tableau de bord Shiny pour la saisie et la visualisation des données",
          ],
        },
        {
          period: "Janvier 2020 – Novembre 2020",
          title: "Enseignant vacataire en Mathématiques",
          company: "ENASTIC, Tchad",
        },
        {
          period: "Septembre 2018 – Décembre 2018",
          title: "Enseignant vacataire",
          company: "JKUAT Karen Campus, Kenya",
        },
        {
          period: "Novembre 2017 – Novembre 2020",
          title: "Data Scientist Freelance / Consultant",
          bullets: [
            "Data analysis, Machine Learning, NLP, séries temporelles, big data, data engineering et développement d'applications sur mesure",
          ],
        },
        {
          period: "Février 2017 – Juin 2017",
          title: "Consultant Data Analytics",
          company: "Data-Fintech, Kenya",
          bullets: [
            "Analyse de données client d'un opérateur télécom pour l'aide à la décision et production de rapports",
          ],
        },
        {
          period: "Octobre 2013 – Février 2015",
          title: "Enseignant",
          company: "Université Polytechnique de Mongo (UPM), Tchad",
          bullets: [
            "Chef de département intérimaire, Génie Industriel et Maintenance ; encadrement de mémoires de licence",
          ],
        },
      ],
      skills: [
        {
          category: "Langages de programmation",
          items: ["Python (Pandas, NumPy, Scikit-learn, TensorFlow)", "R (ggplot2, Shiny, tidyverse)", "SQL", "Bash / Shell"],
        },
        {
          category: "Machine Learning & IA",
          items: ["Modèles supervisés & non supervisés", "NLP", "Deep Learning", "Optimisation de modèles (Grid Search, Cross Validation)"],
        },
        {
          category: "Data Management & Big Data",
          items: ["MySQL", "PostgreSQL", "MongoDB", "Hadoop", "Spark / PySpark"],
        },
        {
          category: "Cloud & DevOps",
          items: ["AWS", "Azure", "Google Cloud Platform", "MLOps", "CI/CD", "Docker", "GitHub"],
        },
      ],
      certifications: [
        { name: "DASCA Certification – Principal Data Scientist", year: "2024 (en cours)" },
        { name: "Data Scientist Associate Certificate", year: "2023" },
        { name: "Microsoft Certified – Power BI Data Analyst Associate", year: "2022 (en cours)" },
        { name: "Basic Statistics – University of Amsterdam (Coursera)", year: "2018" },
        { name: "The Data Scientist's Toolbox – Johns Hopkins University (Coursera)", year: "2016" },
      ],
      education: [
        {
          degree: "Ph.D. en Mathématiques – option Statistique",
          school: "Pan African University Institute (PAUISTI) & JKUAT, Nairobi, Kenya",
          period: "2015 – 2019",
        },
        {
          degree: "MSc. en Statistique",
          school: "École Nationale Supérieure Polytechnique – Université de Yaoundé 1, Cameroun",
          period: "2010 – 2012",
        },
        {
          degree: "BSc. Mathématiques",
          school: "Université des Sciences, des Techniques et des Technologies de Bamako, Mali",
          period: "2005 – 2009",
        },
      ],
      languages: [
        { name: "Français", level: "Courant" },
        { name: "Anglais", level: "Courant" },
      ],
    },
  },
];

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
};
