import i18n from "i18next";
import { initReactI18next } from "react-i18next";


const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À propos",
        services: "Services",
        expertise: "Expertise",
        industries: "Secteurs",
        solutions: "Solutions",
        technologies: "Technologies",
        portfolio: "Réalisations",
        certifications: "Certifications",
        blog: "Blog",
        insights: "Actualités",
        careers: "Carrières",
        pricing: "Tarifs",
        contact: "Contact",
        quote: "Demander un devis",
      },

      brand: {
        name: "DBS Africa",
        tagline: "Transformer les données. Faire progresser l'Afrique.",
        valueProps: {
          data: "Des données aux décisions",
          process: "Des processus à la performance",
          ideas: "Des idées aux solutions digitales",
          innovation: "De l'innovation à l'impact mesurable",
        },
      },

      navMenu: {
        expertise: "Nos 10 domaines d'expertise",
        industries: "Secteurs que nous accompagnons",
        technologies: "Notre stack technologique",
        certifications: "Référentiels & standards",
      },

      a11y: {
        skipToContent: "Aller au contenu",
        switchToLight: "Activer le mode clair",
        switchToDark: "Activer le mode sombre",
      },

      hero: {
        title:
          "Solutions Digitales. Intelligence des Données. Croissance des Entreprises.",
        subtitle: "Des données aux décisions. Des idées à l’impact.",
        description:
          "DBS accompagne les entreprises, institutions et organisations dans leur transformation digitale grâce à des solutions web, data analytics, business intelligence et gestion de projets.",
        ctaServices: "Découvrir nos services",
        ctaQuote: "Demander un devis",
      },

      stats: {
        experience: "Années d'expérience",
        experienceSub: "Expertise et innovation",
        projects: "Projets réalisés",
        projectsSub: "Livrés avec succès",
        technologies: "Technologies maîtrisées",
        technologiesSub: "Outils modernes",
        sectors: "Pays accompagnés",
        sectorsSub: "Présence internationale",
      },

      services: {
        sectionLabel: "Nos expertises",
        title: "Des solutions digitales pour un impact réel",
        subtitle:
          "Nous combinons technologie, données et expertise métier pour créer des solutions qui transforment les idées en résultats mesurables.",
        viewAll: "Découvrir toutes nos solutions",
        web: "Développement Web",
        webText:
          "Sites web, plateformes et applications sur mesure, performantes et sécurisées.",
        data: "Data Analytics",
        dataText:
          "Analyse de données, KPI et insights pour prendre les meilleures décisions.",
        bi: "Business Intelligence",
        biText:
          "Tableaux de bord, reporting et visualisation pour piloter votre performance.",
        transformation: "Transformation Digitale",
        transformationText:
          "Modernisation des processus, automatisation et innovation pour accélérer votre croissance.",
      },

      footer: {
        text:
          "DBS Africa - Solutions digitales, data analytics et transformation digitale.",
        slogan1:
          "Solutions Digitales. Intelligence des Données. Croissance des Entreprises.",
        slogan2: "Des données aux décisions. Des idées à l’impact.",
        navigation: "Navigation",
        rights: "Tous droits réservés.",
        designed:
          "Conçu pour la transformation digitale et la croissance des entreprises.",
      },

      visual: {
        data: "Analyse de données",
        dataText: "KPI, reporting, insights.",
        web: "Solutions Web",
        webText: "Sites, applications, plateformes.",
        strategy: "Stratégie Digitale",
        strategyText: "Audit, processus, automatisation.",
        growth: "Croissance Business",
        growthText: "Des idées à l’impact réel.",
      },

      why: {
        label: "Pourquoi choisir DBS",
        title: "Une approche orientée résultats et impact",
        description:
          "DBS combine expertise digitale, analyse de données, développement web et gestion de projets pour accompagner les organisations dans leur croissance.",

        businessTitle: "Orientation business",
        businessText:
          "Nous concevons des solutions alignées sur vos objectifs stratégiques et opérationnels.",

        innovationTitle: "Innovation utile",
        innovationText:
          "Nous privilégions des technologies simples, efficaces et adaptées à vos besoins réels.",

        supportTitle: "Accompagnement complet",
        supportText:
          "De l’analyse au déploiement, DBS vous accompagne à chaque étape du projet.",
      },

      portfolio: {
        label: "Réalisations",
        title: "Nos projets récents",
        viewAll: "Voir tout le portfolio",
        caseStudy: "Étude de cas",
        description:
          "Plateforme digitale conçue pour renforcer la visibilité, améliorer les processus et créer un impact mesurable.",
        discover: "Découvrir",
      },

      process: {
        label: "Notre méthode",
        title: "De l’idée à l’impact",
        description:
          "Nous transformons vos besoins en solutions digitales concrètes, fiables et évolutives.",

        step1: "Analyse du besoin",
        step2: "Conception de la solution",
        step3: "Développement & intégration",
        step4: "Déploiement & support",

        stepDescription:
          "Une étape structurée pour garantir qualité, performance et résultats.",
      },

      sectors: {
        label: "Secteurs accompagnés",
        title: "Des solutions adaptées à plusieurs domaines",

        telecom: "Télécoms",
        finance: "Finance & Mobile Money",
        ngo: "ONG & Développement",
        public: "Secteur public",
        education: "Éducation",
        microfinance: "Microfinance",
        startup: "PME & Startups",
        consulting: "Conseil",
        viewAll: "Voir tous les secteurs",
      },

      cta: {
        label: "Travaillons ensemble",
        title:
          "Prêt à transformer vos idées en solutions digitales à fort impact ?",
        description:
          "Contactez DBS pour concevoir votre site web, automatiser vos rapports, créer vos dashboards ou digitaliser vos processus métiers.",
        quote: "Demander un devis",
        contact: "Nous contacter",
      },

      about: {
        label: "À propos de DBS",
        title: "Transformer les données en valeur métier",
        subtitle:
          "DBS accompagne les entreprises, institutions et organisations dans leur transformation digitale grâce à la technologie, aux données et à l'innovation.",

        ctaServices: "Découvrir nos services",
        ctaContact: "Nous contacter",
        ctaQuote: "Demander un devis",

        whoLabel: "Qui sommes-nous",
        whoTitle: "À propos de DBS Africa",
        whoText1:
          "DBS Africa est un cabinet panafricain spécialisé dans la transformation digitale, l'analyse de données, la business intelligence, l'intelligence artificielle, la cybersécurité et l'accompagnement stratégique des organisations.",
        whoText2:
          "Nous aidons les entreprises, institutions publiques, ONG, établissements financiers et opérateurs télécoms à exploiter pleinement leurs données et leurs technologies afin d'améliorer leurs performances et accélérer leur croissance.",

        visionTitle: "Notre Vision",
        visionText:
          "Devenir un partenaire de référence en Afrique pour la transformation digitale, la valorisation des données et l'innovation technologique.",

        missionTitle: "Notre Mission",
        missionText:
          "Concevoir et déployer des solutions digitales performantes permettant aux organisations de prendre de meilleures décisions, d'optimiser leurs processus et de créer un impact durable.",

        valuesLabel: "Nos valeurs",
        valuesTitle: "Les principes qui nous guident",

        values: {
          excellence: "Excellence",
          excellenceText:
            "Nous visons la qualité et la performance dans chaque projet.",

          innovation: "Innovation",
          innovationText:
            "Nous développons des solutions modernes adaptées aux défis actuels.",

          integrity: "Intégrité",
          integrityText:
            "Nous travaillons avec transparence, professionnalisme et responsabilité.",

          impact: "Impact",
          impactText:
            "Nous créons des résultats mesurables et durables pour nos clients.",
        },

        expertiseLabel: "Notre expertise",
        expertiseTitle: "Des compétences au service de votre croissance",
        expertiseDescription:
          "Nous combinons expertise métier, technologies modernes et analyse de données pour accompagner les organisations dans leur développement.",

        expertise: {
          bi: "Business Intelligence",
          biText:
            "Power BI, tableaux de bord, reporting et visualisation des données.",

          data: "Data Analytics",
          dataText: "Analyse de données, KPI, SQL et aide à la décision.",

          web: "Développement Web",
          webText:
            "Applications web modernes avec React, Node.js et WordPress.",

          digital: "Transformation Digitale",
          digitalText: "Automatisation, optimisation des processus et innovation.",

          telecom: "Télécom & Mobile Money",
          telecomText:
            "IN, VAS, Mobile Financial Services et reporting télécom.",

          pm: "Gestion de Projet",
          pmText: "PMO, coordination, gouvernance et pilotage de projets.",
        },

        whyLabel: "Pourquoi DBS",
        whyTitle: "Pourquoi travailler avec nous ?",
        whyDescription:
          "Nous apportons une combinaison unique d'expertise technique, métier et stratégique.",

        reasons: {
          experience: "Plus de 10 ans d'expérience",
          multisector: "Expertise multi-sectorielle",
          results: "Approche orientée résultats",
          custom: "Solutions sur mesure",
          support: "Accompagnement de bout en bout",
          tech: "Technologies modernes et évolutives",
        },

        stats: {
          experience: "Années d'expérience",
          projects: "Projets réalisés",
          technologies: "Technologies maîtrisées",
          countries: "Pays accompagnés",
        },

        sectorsLabel: "Secteurs accompagnés",
        sectorsTitle: "Des solutions adaptées à plusieurs secteurs",

        sectors: {
          telecom: "Télécommunications",
          mobileMoney: "Mobile Money",
          finance: "Banque & Finance",
          microfinance: "Microfinance",
          ngo: "ONG & Développement",
          education: "Éducation",
          public: "Secteur Public",
          sme: "PME & Startups",
        },

        finalCtaTitle:
          "Prêt à accélérer votre transformation digitale ?",
        finalCtaText:
          "Construisons ensemble des solutions innovantes et transformons vos données en décisions stratégiques.",
        promoter: {
          label: "Le promoteur",
          socialLabel: "Retrouvez-moi également sur",
          title: "Une expertise au service de la transformation digitale",
          name: "Dobingar Guiryambaye Vincent",
          role:
            "Ingénieur IN, VAS & MFS | Data Analyst | Développeur Web | Project Manager",
          description1:
            "Le promoteur de DBS dispose de plus de 10 ans d'expérience dans les télécommunications, la data analytics, la business intelligence, le reporting automatisé, le développement web et la gestion de projets digitaux.",
          description2:
            "Son parcours combine une forte expertise technique, une compréhension des enjeux métiers et une capacité à concevoir des solutions digitales concrètes pour accompagner les entreprises, institutions et organisations dans leur croissance.",
        },

        teamLabel: "Les talents derrière DBS Africa",
        teamTitle: "Notre équipe",
        teamDescription:
          "Une équipe multidisciplinaire réunissant expertise technologique, connaissance métier et engagement au service de la transformation digitale en Afrique.",

        team: {
          members: {
            amina: {
              role:
                "Responsable Data Analytics & Business Intelligence",
              description:
                "Spécialiste en analyse de données, conception de tableaux de bord, automatisation du reporting et accompagnement à la prise de décision.",
            },
            alain: {
              role:
                "Lead Développement Web & Applications",
              description:
                "Développeur full-stack spécialisé dans la conception de plateformes web, d’applications métiers, d’API sécurisées et de solutions digitales évolutives.",
            },
            nadege: {
              role:
                "Responsable Marketing Digital & Partenariats",
              description:
                "Professionnelle du marketing digital, de la prospection commerciale, de l’acquisition client et du développement de partenariats stratégiques.",
            },
            abdoulaye: {
              role:
                "Consultant – Directeur des Systèmes d'Information (DSI)",
              description:
                "Professionnel de l'information et de la donnée avec plus de 16 ans d'expérience en contextes humanitaires et développement : gouvernance des données, analyse avancée et conception de solutions digitales au service de la décision et de l'impact terrain.",
            },
          },
        },
      },

      servicesPage: {
        label: "Nos services",
        title: "Des solutions digitales adaptées à vos besoins",
        subtitle:
          "DBS accompagne les organisations dans la transformation digitale, l’analyse de données, la business intelligence, le développement web, les télécoms et la gestion de projets.",

        ctaQuote: "Demander un devis",
        ctaContact: "Nous contacter",
        viewPortfolio: "Voir nos réalisations",

        expertiseLabel: "Nos expertises",
        expertiseTitle: "Des services conçus pour créer un impact réel",
        expertiseText:
          "Nous proposons des solutions fiables, modernes et orientées résultats pour aider les entreprises, institutions et organisations à améliorer leur performance.",

        items: {
          digital: {
            title: "Transformation Digitale",
            text:
              "Nous aidons les organisations à moderniser leurs processus et à adopter des solutions digitales performantes.",
            b1: "Audit digital et analyse des processus",
            b2: "Automatisation des tâches et workflows",
            b3: "Optimisation des opérations métiers",
          },

          bi: {
            title: "Business Intelligence",
            text:
              "Nous transformons vos données en tableaux de bord clairs pour faciliter la prise de décision.",
            b1: "Dashboards Power BI",
            b2: "Reporting automatisé",
            b3: "Suivi des KPI et indicateurs clés",
          },

          data: {
            title: "Data Analytics",
            text:
              "Nous analysons vos données pour identifier les tendances, anomalies, risques et opportunités.",
            b1: "Analyse SQL et Excel avancée",
            b2: "Contrôle qualité des données",
            b3: "Visualisation et recommandations",
          },

          web: {
            title: "Développement Web",
            text:
              "Nous développons des sites web, plateformes et applications modernes, sécurisés et adaptés à vos besoins.",
            b1: "Sites vitrines professionnels",
            b2: "Applications React et Node.js",
            b3: "Solutions WordPress et API",
          },

          telecom: {
            title: "Télécom & Mobile Money",
            text:
              "Nous apportons une expertise spécialisée dans les environnements IN, VAS, MFS et Mobile Money.",
            b1: "Reporting télécom et réconciliation",
            b2: "Analyse des services VAS et MFS",
            b3: "Suivi des performances opérationnelles",
          },

          pm: {
            title: "Gestion de Projet",
            text:
              "Nous accompagnons la planification, la coordination, le suivi et la gouvernance des projets digitaux.",
            b1: "PMO et gouvernance projet",
            b2: "Suivi des risques, délais et livrables",
            b3: "Reporting exécutif et coordination",
          },

          marketing: {
            title: "Marketing Digital",
            text:
              "Nous aidons les organisations à développer leur visibilité en ligne, générer des prospects et améliorer leur communication digitale.",
            b1: "Gestion des réseaux sociaux et community management",
            b2: "Campagnes Facebook Ads et Google Ads",
            b3: "SEO, création de contenus et analyse des performances",
          },
        },

        approachLabel: "Notre approche",
        approachTitle: "Une méthode structurée et orientée résultats",
        approachText:
          "Chaque projet DBS suit une démarche claire : comprendre le besoin, concevoir la meilleure solution, développer efficacement et accompagner le client jusqu’à l’impact.",

        process: {
          step1: "Analyse du besoin",
          step2: "Conception de la solution",
          step3: "Développement et intégration",
          step4: "Déploiement et accompagnement",
        },

        highlights: {
          tech: {
            title: "Technologies modernes",
            text:
              "Nous utilisons des outils fiables et évolutifs pour construire des solutions durables.",
          },
          data: {
            title: "Décisions basées sur les données",
            text:
              "Nous aidons les décideurs à comprendre leurs indicateurs et à agir rapidement.",
          },
          business: {
            title: "Impact métier",
            text:
              "Nos solutions sont conçues pour répondre à des besoins opérationnels concrets.",
          },
        },

        techLabel: "Technologies",
        techTitle: "Des outils modernes pour des solutions performantes",
        techText:
          "DBS combine les technologies web, data, BI et reporting pour construire des solutions robustes, utiles et évolutives.",

        finalCtaTitle: "Vous avez un projet digital ou data ?",
        finalCtaText:
          "Parlons de vos besoins et construisons ensemble une solution adaptée à votre organisation.",
      },
    
      portfolioPage: {
        label: "Portfolio",
        title: "Réalisations & projets digitaux",
        subtitle:
          "Découvrez comment DBS accompagne les organisations dans la création de solutions digitales, data et business à fort impact.",

        ctaContact: "Nous contacter",
        ctaQuote: "Demander un devis",

        stats: {
          projects: "Projets réalisés",
          experience: "Années d'expérience",
          countries: "Pays accompagnés",
          technologies: "Technologies maîtrisées",
        },

        projectsLabel: "Nos réalisations",
        projectsTitle: "Des projets concrets pour des résultats mesurables",
        projectsText:
          "Chaque projet DBS est conçu pour répondre à des besoins réels : visibilité, automatisation, gestion, reporting, performance et transformation digitale.",

        resultsLabel: "Résultats",
        discussProject: "Discuter d'un projet similaire",

        projects: {
          snrc: {
            title: "SNRC",
            sector: "Institution publique",
            description:
              "Développement d'une plateforme institutionnelle moderne pour renforcer la visibilité, la communication et la gestion des contenus.",
            r1: "Site institutionnel moderne",
            r2: "Administration sécurisée",
            r3: "Gestion centralisée des contenus",
          },

          harvest: {
            title: "Harvest Center",
            sector: "Éducation & formation",
            description:
              "Plateforme digitale complète pour la gestion des inscriptions, étudiants, enseignants, cours et communications.",
            r1: "Gestion des étudiants",
            r2: "Gestion des enseignants et cours",
            r3: "Interface multilingue",
          },

          ndof: {
            title: "NDOF Consulting",
            sector: "Conseil",
            description:
              "Site corporate professionnel avec gestion des actualités, contacts, demandes de devis et présentation des expertises.",
            r1: "Présence digitale professionnelle",
            r2: "Gestion des demandes de devis",
            r3: "Interface d'administration",
          },

          eden: {
            title: "Eden Business Center",
            sector: "Commerce & textile",
            description:
              "Plateforme vitrine et catalogue produits pour valoriser les activités commerciales et faciliter la gestion des contenus.",
            r1: "Catalogue produits",
            r2: "Galerie multimédia",
            r3: "Dashboard d'administration",
          },

          mani: {
            title: "MANI Financial Group",
            sector: "Microfinance",
            description:
              "Plateforme digitale multilingue pour présenter les services financiers, renforcer la confiance et améliorer l'expérience client.",
            r1: "Plateforme multilingue",
            r2: "Présentation des services financiers",
            r3: "Expérience utilisateur moderne",
          },

          cdo: {
            title: "CDO Tchad",
            sector: "Emploi & recrutement",
            description:
              "Portail de recrutement permettant la publication, la gestion et le suivi des offres d'emploi et candidatures.",
            r1: "Gestion des offres",
            r2: "Administration RH",
            r3: "Plateforme de recrutement",
          },
        },

        caseLabel: "Études de cas",
        caseTitle: "De l'idée à l'impact opérationnel",
        caseText:
          "Nos projets suivent une approche structurée : comprendre le contexte, identifier les défis, concevoir la solution et mesurer les résultats.",

        caseContext: "Contexte",
        caseChallenge: "Défi",
        caseSolution: "Solution",
        caseResult: "Résultat",

        caseStudies: {
          harvest: {
            title: "Harvest Center",
            context: "Un centre de langues et de formation avec des besoins de gestion académique.",
            challenge:
              "Digitaliser les inscriptions, les cours, les utilisateurs et les communications.",
            solution:
              "Développement d'une plateforme web complète avec espace admin, enseignant et étudiant.",
            result:
              "Amélioration de la gestion administrative et pédagogique.",
          },

          snrc: {
            title: "SNRC",
            context: "Une institution publique ayant besoin d'une présence digitale professionnelle.",
            challenge:
              "Structurer l'information institutionnelle et faciliter la gestion des contenus.",
            solution:
              "Création d'un site moderne avec backend, dashboard admin et gestion dynamique.",
            result:
              "Meilleure visibilité institutionnelle et administration simplifiée.",
          },

          eden: {
            title: "Eden Business Center",
            context: "Une entreprise commerciale souhaitant présenter ses produits et son identité.",
            challenge:
              "Créer une vitrine digitale claire, moderne et facile à administrer.",
            solution:
              "Développement d'une plateforme avec catalogue produits, galerie et dashboard.",
            result:
              "Valorisation des produits et amélioration de la présence en ligne.",
          },
        },

        techLabel: "Technologies",
        techTitle: "Des technologies modernes pour des solutions fiables",
        techText:
          "DBS combine les technologies web, data, BI et reporting pour concevoir des plateformes robustes, évolutives et utiles.",

        finalCtaTitle: "Prêt à construire votre prochain projet digital ?",
        finalCtaText:
          "Transformons vos idées en solutions digitales innovantes avec un impact mesurable pour votre organisation.",

        categories: {
          all: "Tous",
          web: "Web",
          data: "Data",
          humanitarian: "Humanitaire",
          other: "Autres",
        },

        projectsGrid: {
          label: "Nos réalisations",
          title: "Des projets organisés par domaine d'expertise",
          subtitle:
            "Filtrez nos réalisations par catégorie : plateformes web, projets data & analytics, solutions humanitaires et autres.",
        },

        dataProjects: {
          label: "Projets Data & Analytics",
          title: "Nos réalisations en analyse de données",
          subtitle:
            "Des projets techniques démontrant notre expertise en SQL, Python et R pour l'analyse et la visualisation de données.",
          viewProject: "Voir le projet",
          dataLendoRh: {
            title: "DataLendo RH",
            description:
              "Projet d'analyse de données RH exploitant le langage SQL pour la modélisation et l'exploitation d'une base de données de gestion des ressources humaines.",
          },
          afriMarket: {
            title: "AfriMarket Projects",
            description:
              "Application Python interactive (Streamlit) d'analyse de données de marché en Afrique.",
          },
          rDashboard: {
            title: "Analyse de Données R",
            description:
              "Tableau de bord d'analyse de données développé en R et publié sur Posit Connect.",
          },
        },

        webProjects: {
          label: "Projets web réalisés",
          title: "Des plateformes modernes, performantes et adaptées aux besoins métiers",
          subtitle:
            "Découvrez quelques projets web conçus et développés pour des entreprises, institutions, organisations et plateformes digitales.",

          visitSite: "Visiter le site",
          online: "En ligne",
          pending: "En attente de mise en ligne",
          pendingMessage: "Site prêt — mise en ligne après validation client",
          missingLink: "Lien à renseigner",

          snrc: {
            category: "Institution publique / Recouvrement",
            description:
              "Plateforme institutionnelle moderne pour la Société Nationale de Recouvrement des Créances, avec actualités, publications, FAQ, contact et administration.",
          },

          harvest: {
            category: "Entreprise / Services",
            description:
              "Site vitrine professionnel présentant les services, les activités et l’identité digitale de Harvest Center avec une interface moderne et responsive.",
          },

          eden: {
            category: "Business Center",
            description:
              "Site professionnel avec présentation des produits, galerie, contact et espace d’administration pour la gestion des contenus.",
          },

          cdo: {
            category: "Recrutement / Emploi",
            description:
              "Portail de recrutement avec publication d’offres, candidatures en ligne, gestion administrative et génération de documents.",
          },

          antidiscrimination: {
            category: "ONG / Droits humains",
            description:
              "Plateforme digitale dédiée à la sensibilisation, à l’information et à la lutte contre les discriminations, avec une interface moderne et accessible.",
          },

          ndof: {
            category: "Cabinet de conseil",
            description:
              "Plateforme corporate complète avec pages de services, réalisations, actualités, galerie, contact, demande de devis et espace d’administration.",
          },

          mani: {
            category: "Microfinance / Finance",
            description:
              "Plateforme digitale pour une institution de microfinance, avec présentation des services, simulation, contact et structure multilingue.",
          },
          ngoSolutions: {
            label: "Solutions ONG & Organisations Internationales",

            title:
              "Transformation Digitale pour les ONG et les Nations Unies",

            subtitle:
              "DBS Africa accompagne les ONG, agences des Nations Unies, institutions publiques et partenaires techniques dans la digitalisation des programmes, la gestion des données, le suivi-évaluation et la production de rapports décisionnels."
          },
          meDashboard: {
            title: "M&E Performance Dashboard",
            category: "ONG / Suivi-Evaluation",
            description:
              "Plateforme de suivi-évaluation permettant de suivre les indicateurs, activités, résultats et impacts des projets financés par les bailleurs."
          },

          beneficiarySystem: {
            title: "Beneficiary Management System",
            category: "ONG / Programmes Humanitaires",
            description:
              "Solution digitale de gestion des bénéficiaires, enregistrement, suivi des ménages, assistance et reporting."
          },

          humanitarianPlatform: {
            title: "Humanitarian Data Platform",
            category: "Analyse de Données",
            description:
              "Centralisation des données terrain, visualisation des indicateurs et génération automatisée des rapports pour les programmes humanitaires."
          },
              concept: "Solution métier / Concept",

              conceptMessage:
                "Solution démonstrative conçue pour répondre aux besoins des ONG et organisations internationales",
        },
},

      contactPage: {
        label: "Contact",
        title: "Discutons de votre prochain projet digital",
        country: "Pays",
        number: "Numéro",
        selectCountryFirst: "Sélectionnez d’abord votre pays.",
        sending: "Envoi en cours...",
        success: "Votre message a été envoyé avec succès.",

        errors: {
          fullName: "Veuillez renseigner votre nom complet.",
          email: "Veuillez renseigner votre adresse e-mail.",
          country: "Veuillez sélectionner votre pays.",
          message: "Veuillez saisir votre message.",
          submit: "Une erreur est survenue lors de l’envoi du message.",
          serverUnavailable:
            "Impossible de joindre le serveur. Vérifiez que le backend est démarré.",
        },
        subtitle:
          "DBS est prêt à vous accompagner dans vos projets de transformation digitale, data analytics, business intelligence, développement web et télécoms.",

        infoLabel: "Nous contacter",
        infoTitle: "Parlons de vos besoins",
        infoText:
          "Vous avez un projet web, data, BI, télécom ou transformation digitale ? Contactez-nous pour échanger sur vos objectifs.",

        emailTitle: "Email",
        phoneTitle: "Téléphone",
        whatsappTitle: "WhatsApp",
        linkedinTitle: "LinkedIn",

        locationTitle: "Localisation",
        locationText: "Burundi | Afrique | Collaboration à distance possible",

        formTitle: "Envoyer un message",
        fullName: "Nom complet",
        organization: "Organisation",
        email: "Adresse email",
        phone: "Téléphone",
        subject: "Sujet",
        message: "Votre message",
        send: "Envoyer le message",

        whyLabel: "Pourquoi nous contacter",
        whyTitle: "Un partenaire fiable pour vos projets digitaux",

        reasons: {
          experience: "Plus de 10 ans d'expérience",
          data: "Expertise Data & BI",
          web: "Développement web moderne",
          telecom: "Télécom & Mobile Money",
          support: "Accompagnement personnalisé",
        },
        contactNow: "Contact Us Now",
      },

      quotePage: {
        label: "Demande de devis",
        title: "Décrivez votre projet et recevons votre besoin",
        number: "Numéro",
        phone: "Numéro de téléphone",
        selectCountryFirst: "Sélectionnez d’abord votre pays.",
        subtitle:
          "Remplissez ce formulaire pour permettre à DBS de mieux comprendre votre projet et vous proposer une solution adaptée.",

        formTitle: "Formulaire de demande de devis",
        fullName: "Nom complet",
        organization: "Organisation",
        email: "Adresse email",
        phone: "Téléphone",
        country: "Pays",
        sector: "Secteur d'activité",

        serviceNeeded: "Service souhaité",
        services: {
          web: "Développement Web",
          data: "Data Analytics",
          bi: "Business Intelligence",
          digital: "Transformation Digitale",
          telecom: "Télécom & Mobile Money",
          pm: "Gestion de Projet",
          marketing: "Marketing Digital",
        },

        budget: "Budget estimatif",
        timeline: "Délai souhaité",
        description: "Décrivez votre projet, vos objectifs et vos besoins",
        send: "Envoyer la demande",

        steps: {
          need: "Comprendre votre besoin",
          needText:
            "Nous analysons votre contexte, vos objectifs et les résultats attendus.",
          budget: "Évaluer le périmètre",
          budgetText:
            "Nous identifions les ressources, délais et technologies nécessaires.",
          timeline: "Proposer une solution",
          timelineText:
            "Nous vous envoyons une proposition claire, adaptée et orientée résultats.",
        },

        responseTitle: "Réponse rapide",
        responseText:
          "DBS vous recontactera pour préciser votre besoin et préparer une proposition adaptée.",
      
      whyTitle: "Pourquoi choisir DBS ?",

      advantages: {
        quality: {
          title: "Qualité professionnelle",
          desc: "Nous concevons des solutions fiables, modernes et évolutives adaptées à vos besoins."
        },

        delivery: {
          title: "Respect des délais",
          desc: "Chaque projet est livré selon un planning clair et maîtrisé."
        },

        support: {
          title: "Accompagnement",
          desc: "Nous restons disponibles avant, pendant et après la livraison."
        }
      },

      faqTitle: "Questions fréquentes",

      faq: {
        q1: {
          question: "Combien de temps dure un projet ?",
          answer: "La durée dépend du projet, mais nous définissons toujours un calendrier précis."
        },

        q2: {
          question: "Comment obtenez-vous un devis ?",
          answer: "Il suffit de remplir le formulaire ou de nous contacter directement."
        },

        q3: {
          question: "Proposez-vous un support après livraison ?",
          answer: "Oui, nous proposons un accompagnement et une maintenance selon le pack choisi."
        },

        q4: {
          question: "Puis-je demander une solution sur mesure ?",
          answer: "Absolument. Toutes nos offres peuvent être adaptées à vos besoins."
        }
      },

      ctaFinalTitle:
        "Parlons de votre projet dès aujourd'hui",

      ctaButton:
        "Demander un devis",
      clientType: "Type de client",
      individual: "Particulier",
      organization: "Organisation / Entreprise",
      organizationName: "Nom de l'organisation",

      currency: "Devise",
      selectCurrencyFirst: "Choisissez d'abord une devise",

      sectors: {
        telecom: "Télécommunications",
        mobileMoney: "Mobile Money",
        banking: "Banque",
        microfinance: "Microfinance",
        ngo: "ONG",
        association: "Association",
        unitedNations: "Nations Unies",
        government: "Administration publique",

        university: "Universités",
        higherInstitute: "Instituts Universitaires",
        publicInstitution: "Établissements Publics",
        privateInstitution: "Établissements Privés",

        health: "Santé",
        trade: "Commerce",
        industry: "Industrie",
        other: "Autre"
      }
   },

      blogPage: {
        label: "Blog & Insights",
        title: "Idées, analyses et conseils digitaux",
        subtitle:
          "Découvrez nos contenus sur la data analytics, la business intelligence, le développement web, la transformation digitale et les télécoms.",

        categories: "Catégories",
        latestLabel: "Articles récents",
        latestTitle: "Contenus pour mieux comprendre le digital et la data",
        readMore: "Lire l'article",

        posts: {
          powerbi: {
            category: "Business Intelligence",
            title: "Comment Power BI aide les décideurs à suivre leurs KPI",
            summary:
              "Un bon dashboard ne se limite pas à afficher des graphiques. Il doit répondre à de vraies questions métier.",
          },
          data: {
            category: "Data Analytics",
            title: "Transformer les données brutes en décisions utiles",
            summary:
              "L'analyse de données permet d'identifier les tendances, anomalies, risques et opportunités cachées.",
          },
          web: {
            category: "Développement Web",
            title: "Pourquoi une entreprise doit investir dans une plateforme moderne",
            summary:
              "Un site web professionnel améliore la crédibilité, la visibilité et la relation client.",
          },
          digital: {
            category: "Transformation Digitale",
            title: "Digitaliser les processus pour gagner en efficacité",
            summary:
              "La transformation digitale permet d'automatiser, de simplifier et d'améliorer les opérations.",
          },
          pm: {
            category: "Gestion de Projet",
            title: "Le rôle du reporting dans la réussite des projets",
            summary:
              "Un reporting clair aide les équipes à suivre les risques, les délais, les livrables et la performance.",
          },
          telecom: {
            category: "Télécom & Mobile Money",
            title: "Pourquoi la réconciliation des données est essentielle",
            summary:
              "Dans les télécoms et le mobile money, la qualité des données est essentielle pour contrôler la performance.",
          },
        },

        ctaTitle: "Besoin d'une expertise digitale ou data ?",
        ctaText:
          "Contactez DBS pour transformer vos idées, vos données et vos processus en solutions concrètes.",
        ctaButton: "Nous contacter",
        ctaContact: "Nous contacter",
        noPosts: "Aucune actualité publiée pour le moment.",
      },

      homePartners: {
        label: "Ils nous font confiance",
        title: "Clients & Partenaires",
        description:
          "Nous sommes fiers d'accompagner des organisations, entreprises et institutions ambitieuses dans leur transformation digitale.",
      },

      testimonials: {
        label: "Témoignages",
        title: "Ce que disent nos clients",
        description:
          "La confiance de nos clients repose sur la qualité des solutions livrées, l’écoute des besoins et l’impact obtenu.",

        harvest: {
          role: "Éducation & Formation",
          text:
            "DBS nous a accompagnés dans la digitalisation complète de notre plateforme de formation avec professionnalisme et efficacité.",
        },

        snrc: {
          role: "Institution publique",
          text:
            "Une excellente expertise en développement web, structuration de contenus et mise en place d’une plateforme institutionnelle moderne.",
        },

        ndof: {
          role: "Conseil & Consulting",
          text:
            "Professionnalisme, réactivité et qualité des livrables. DBS a su comprendre nos besoins et proposer une solution adaptée.",
        },
      },

      technologies: {
        label: "Nos Technologies",
        title: "Des outils modernes pour des solutions performantes",
        description:
          "Nous utilisons des technologies reconnues pour développer des plateformes fiables, évolutives et adaptées aux besoins de nos clients.",
        viewAll: "Voir toutes nos technologies",

        react:
          "Création d’interfaces web modernes, rapides et interactives.",
        node:
          "Développement de backends performants et évolutifs.",
        express:
          "Framework léger pour construire des APIs sécurisées.",
        javascript:
          "Langage principal du développement web moderne.",
        mysql:
          "Base de données relationnelle fiable pour les applications métier.",
        postgres:
          "Base de données robuste pour les plateformes à forte croissance.",
        powerbi:
          "Création de tableaux de bord et indicateurs de performance.",
        sql:
          "Analyse et manipulation avancée des données.",
        wordpress:
          "Développement rapide de sites administrables.",
        tailwind:
          "Framework CSS moderne pour des interfaces responsives.",
        api:
          "Intégration de systèmes et services via API REST.",
        github:
          "Gestion de versions et collaboration sur les projets.",
        python:
          "Développement de solutions d’analyse de données, automatisation, intelligence artificielle et applications métier.",
        r:
          "Analyse statistique avancée, modélisation de données et recherche scientifique.",
        spss:
          "Analyse statistique, études quantitatives, enquêtes et reporting décisionnel.",
        sqlserver:
          "Conception de bases de données, requêtes avancées, optimisation et administration Microsoft SQL Server.",

        oracle:
          "Gestion de bases de données d'entreprise, intégration de données et solutions critiques à grande échelle.",

        tableau:
          "Visualisation de données, tableaux de bord interactifs et aide à la décision.",

        ssrs:
          "Conception de rapports professionnels, automatisation des exports et reporting d'entreprise avec SQL Server Reporting Services.",
        showMore: "Voir toutes les technologies",
        showLess: "Réduire la liste",
      },
      solutionsPage: {
        heroLabel: "Solutions digitales",
        heroTitle: "Des solutions modernes adaptées à chaque secteur",
        heroDescription:
          "DBS Africa conçoit des plateformes web, data, reporting, télécom et humanitaires pour les entreprises, institutions et organisations.",

        label: "Nos solutions digitales",
        title: "Des solutions innovantes pour chaque secteur",
        description:
          "DBS Africa accompagne les entreprises, institutions et organisations dans leur transformation digitale grâce à des solutions performantes, sécurisées et orientées résultats.",

        viewProjects: "Voir nos projets",
        requestSolution: "Demander une solution",
        contactUs: "Nous contacter",

        items: {
          web: {
            title: "Développement Web",
            description:
              "Sites web, plateformes et applications sur mesure, modernes, rapides et adaptés à vos besoins.",
            feature1: "Sites corporate",
            feature2: "Portails web",
            feature3: "Applications métiers",
            feature4: "Solutions SaaS",
          },

          bi: {
            title: "Business Intelligence",
            description:
              "Tableaux de bord dynamiques et reporting décisionnel pour piloter votre performance.",
            feature1: "Power BI",
            feature2: "Tableau",
            feature3: "Reporting SSRS",
            feature4: "KPI et Analytics",
          },

          monitoring: {
            title: "Suivi-Évaluation (M&E)",
            description:
              "Solutions complètes pour le suivi des projets, indicateurs, résultats et impacts des programmes.",
            feature1: "Suivi des indicateurs",
            feature2: "Plans et activités",
            feature3: "Rapports bailleurs",
            feature4: "Dashboards interactifs",
          },

          telecom: {
            title: "Télécoms & Mobile Money",
            description:
              "Solutions analytiques et opérationnelles pour la gestion des données télécoms, KYC, transactions et performance réseau.",
            feature1: "Analyse des abonnés",
            feature2: "Suivi des transactions",
            feature3: "KYC et conformité",
            feature4: "Performance réseau",
          },

          beneficiaries: {
            title: "Gestion des Bénéficiaires",
            description:
              "Enregistrement, suivi et gestion des bénéficiaires de programmes humanitaires et sociaux.",
            feature1: "Enregistrement des ménages",
            feature2: "Suivi des bénéficiaires",
            feature3: "Gestion des aides",
            feature4: "Rapports et analyses",
          },

          recruitment: {
            title: "Recrutement Digital",
            description:
              "Portails de recrutement et gestion des candidatures pour entreprises et organisations.",
            feature1: "Publication d'offres",
            feature2: "Candidatures en ligne",
            feature3: "Suivi des candidats",
            feature4: "Tableau de bord RH",
          },
          marketing: {
            title: "Marketing Digital",
            description:
              "Stratégies digitales pour améliorer votre visibilité, attirer de nouveaux clients et développer votre présence en ligne.",
            feature1: "Gestion des réseaux sociaux",
            feature2: "Campagnes Facebook et Google Ads",
            feature3: "Référencement naturel SEO",
            feature4: "Création de contenus et reporting",
          },
        },

        ctaLabel: "Votre projet",
        ctaTitle:
          "Vous avez besoin d'une plateforme digitale adaptée à votre organisation ?",
        ctaDescription:
          "Présentez-nous vos besoins et construisons ensemble une solution web, data ou métier performante et évolutive.",
      },

      expertisePage: {
        label: "Notre expertise",
        title: "Une expertise complète au service de votre transformation",
        subtitle:
          "DBS Africa réunit dix domaines d'expertise complémentaires pour accompagner la transformation digitale, data, IA et cybersécurité des organisations à travers l'Afrique.",
        ctaQuote: "Demander un devis",
        ctaContact: "Nous contacter",
        stats: {
          domains: "Domaines d'expertise",
        },
        domains: {
          digital: {
            title: "Transformation Digitale",
            description:
              "Nous accompagnons la définition et la mise en œuvre de stratégies digitales, la modernisation des processus métier et la gouvernance du changement.",
          },
          data: {
            title: "Data & Business Intelligence",
            description:
              "Nous transformons vos données en tableaux de bord, KPI et rapports automatisés pour éclairer la prise de décision.",
          },
          ai: {
            title: "Intelligence Artificielle",
            description:
              "Nous concevons des assistants, agents et automatisations intelligentes adaptés aux réalités opérationnelles de nos clients.",
          },
          cybersecurity: {
            title: "Cybersécurité",
            description:
              "Nous évaluons, protégeons et renforçons la posture de sécurité de vos systèmes, de l'audit à la réponse aux incidents.",
          },
          cloud: {
            title: "Cloud Computing",
            description:
              "Nous concevons, migrons et modernisons vos infrastructures sur Azure, AWS et Google Cloud.",
          },
          software: {
            title: "Ingénierie Logicielle",
            description:
              "Nous développons des applications d'entreprise, API et plateformes SaaS robustes et évolutives.",
          },
          telecom: {
            title: "Télécommunications",
            description:
              "Nous apportons une expertise pointue en OSS/BSS, assurance des revenus et analytique télécom.",
          },
          gis: {
            title: "GIS & Intelligence Spatiale",
            description:
              "Nous exploitons la donnée géospatiale pour la cartographie, l'analyse spatiale et la télédétection.",
          },
          meal: {
            title: "Suivi, Évaluation, Redevabilité & Apprentissage (MEAL)",
            description:
              "Nous digitalisons la collecte de données et le suivi d'impact pour les programmes de développement.",
          },
          itStrategy: {
            title: "Stratégie IT & Architecture d'Entreprise",
            description:
              "Nous alignons la stratégie technologique sur les objectifs métier et structurons une architecture d'entreprise durable.",
          },
        },
      },

      industriesPage: {
        label: "Secteurs accompagnés",
        title: "Une expertise sectorielle au service de l'impact",
        subtitle:
          "DBS Africa accompagne un large éventail d'organisations à travers l'Afrique, des institutions publiques aux entreprises privées.",
        introText:
          "Chaque secteur a ses propres enjeux réglementaires, opérationnels et technologiques. DBS Africa adapte ses méthodologies data, digitales et cybersécurité au contexte spécifique de chaque organisation, du secteur public aux entreprises privées.",
        ctaQuote: "Demander un devis",
        ctaContact: "Nous contacter",
      },

      technologiesPage: {
        label: "Notre stack technologique",
        title: "Des technologies modernes pour des solutions durables",
        subtitle:
          "Nous combinons des outils éprouvés en développement, data, IA, cloud et cybersécurité pour construire des solutions fiables et évolutives.",
        highlights: {
          reliable: {
            title: "Technologies éprouvées",
            text: "Nous sélectionnons des outils matures, largement adoptés et activement maintenus par leurs communautés.",
          },
          secure: {
            title: "Sécurité by design",
            text: "Chaque choix technologique intègre les bonnes pratiques de sécurité dès la conception.",
          },
          scalable: {
            title: "Solutions évolutives",
            text: "Nos architectures sont pensées pour accompagner la croissance de votre organisation.",
          },
        },
        categories: {
          programming: "Langages de Programmation",
          frontend: "Frontend",
          backend: "Backend",
          databases: "Bases de Données",
          bi: "Business Intelligence",
          ai: "Intelligence Artificielle",
          dataEngineering: "Data Engineering",
          cloud: "Cloud",
          gis: "GIS",
          cybersecurity: "Cybersécurité",
          devops: "DevOps",
          projectManagement: "Gestion de Projet",
          design: "Design",
        },
      },

      certificationsPage: {
        label: "Référentiels & Standards",
        title: "Une pratique alignée sur les standards internationaux",
        subtitle:
          "En tant que cabinet conseil en cybersécurité et transformation digitale, nous structurons nos méthodologies autour des référentiels et standards reconnus internationalement.",
        introText:
          "La sécurité et la conformité ne sont pas une option : elles font partie intégrante de notre méthodologie de conseil. Voici les référentiels internationaux qui structurent notre approche.",
        standardsLabel: "Cadres de référence",
        cloudLabel: "Plateformes cloud maîtrisées",
        disclaimer:
          "Ces référentiels guident notre méthodologie et nos livrables ; ils ne constituent pas une certification officielle de DBS Africa délivrée par les organismes correspondants.",
        items: {
          iso27001:
            "Préparation et mise en conformité avec la norme ISO/CEI 27001 de management de la sécurité de l'information.",
          nist: "Structuration des programmes de cybersécurité selon le référentiel NIST Cybersecurity Framework.",
          cis: "Mise en œuvre des contrôles prioritaires CIS Controls pour réduire les risques cyber.",
          gdpr: "Accompagnement à la conformité au Règlement Général sur la Protection des Données.",
          zeroTrust:
            "Conception d'architectures de sécurité fondées sur le principe de la confiance zéro.",
        },
        ctaTitle:
          "Besoin d'évaluer la maturité sécurité de votre organisation ?",
        ctaText:
          "Parlons de votre contexte et des référentiels les plus adaptés à vos enjeux.",
      },

      careersPage: {
        label: "Carrières",
        title: "Construisons ensemble l'avenir digital de l'Afrique",
        subtitle:
          "Rejoignez une équipe pluridisciplinaire passionnée par la donnée, la technologie et l'impact durable.",
        ctaContact: "Nous contacter",
        cultureLabel: "Notre culture",
        cultureTitle: "Pourquoi rejoindre DBS Africa",
        benefits: {
          impact: {
            title: "Des projets à impact réel",
            text:
              "Vous travaillez sur des solutions qui transforment concrètement des organisations à travers l'Afrique.",
          },
          growth: {
            title: "Apprentissage continu",
            text:
              "Nous investissons dans la montée en compétences sur les technologies data, cloud, IA et cybersécurité.",
          },
          team: {
            title: "Une équipe pluridisciplinaire",
            text:
              "Vous évoluez aux côtés d'experts en data, développement, sécurité et gestion de projet.",
          },
          flexibility: {
            title: "Flexibilité & confiance",
            text:
              "Nous privilégions le travail orienté résultats et une collaboration flexible.",
          },
        },
        openRolesLabel: "Postes ouverts",
        openRolesTitle: "Aucune offre publiée pour le moment",
        openRolesText:
          "Nous n'avons pas d'offre active actuellement, mais nous sommes toujours ouverts aux candidatures spontanées de profils talentueux.",
        spontaneousCta: "Envoyer une candidature spontanée",
      },
    },
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        expertise: "Expertise",
        industries: "Industries",
        solutions: "Solutions",
        technologies: "Technologies",
        portfolio: "Portfolio",
        certifications: "Certifications",
        blog: "Blog",
        insights: "Insights",
        careers: "Careers",
        pricing: "Pricing",
        contact: "Contact",
        quote: "Request a quote",
      },

      brand: {
        name: "DBS Africa",
        tagline: "Transforming Data. Empowering Africa.",
        valueProps: {
          data: "Data into decisions",
          process: "Processes into performance",
          ideas: "Ideas into digital solutions",
          innovation: "Innovation into measurable impact",
        },
      },

      navMenu: {
        expertise: "Our 10 areas of expertise",
        industries: "Sectors we support",
        technologies: "Our technology stack",
        certifications: "Frameworks & standards",
      },

      a11y: {
        skipToContent: "Skip to content",
        switchToLight: "Switch to light mode",
        switchToDark: "Switch to dark mode",
      },

      hero: {
        title: "Digital Solutions. Data Insights. Business Growth.",
        subtitle: "From Data to Decisions. From Ideas to Impact.",
        description:
          "DBS helps companies, institutions and organizations accelerate their digital transformation through web solutions, data analytics, business intelligence and project management.",
        ctaServices: "Explore our services",
        ctaQuote: "Request a quote",
      },

      stats: {
        experience: "Years of experience",
        experienceSub: "Expertise and innovation",
        projects: "Projects delivered",
        projectsSub: "Successfully completed",
        technologies: "Technologies mastered",
        technologiesSub: "Modern tools",
        sectors: "Countries supported",
        sectorsSub: "International presence",
      },

      services: {
        sectionLabel: "Our expertise",
        title: "Digital solutions for real impact",
        subtitle:
          "We combine technology, data and business expertise to create solutions that turn ideas into measurable results.",
        viewAll: "Explore all our solutions",
        web: "Web Development",
        webText:
          "Custom websites, platforms and applications that are performant and secure.",
        data: "Data Analytics",
        dataText:
          "Data analysis, KPIs and insights to support better decision-making.",
        bi: "Business Intelligence",
        biText:
          "Dashboards, reporting and visualization to monitor business performance.",
        transformation: "Digital Transformation",
        transformationText:
          "Process modernization, automation and innovation to accelerate growth.",
      },

      footer: {
        text:
          "DBS Africa - Digital solutions, data analytics and digital transformation.",
        slogan1: "Digital Solutions. Data Insights. Business Growth.",
        slogan2: "From Data to Decisions. From Ideas to Impact.",
        navigation: "Navigation",
        rights: "All rights reserved.",
        designed: "Designed for digital transformation and business growth.",
      },

      visual: {
        data: "Data Analytics",
        dataText: "KPI, reporting, insights.",
        web: "Web Solutions",
        webText: "Websites, apps, platforms.",
        strategy: "Digital Strategy",
        strategyText: "Audit, processes, automation.",
        growth: "Business Growth",
        growthText: "Ideas to real impact.",
      },

      why: {
        label: "Why Choose DBS",
        title: "A Results-Oriented Approach",
        description:
          "DBS combines digital expertise, data analytics, web development and project management to help organizations grow and innovate.",

        businessTitle: "Business-Oriented",
        businessText:
          "We design solutions aligned with your strategic and operational objectives.",

        innovationTitle: "Practical Innovation",
        innovationText:
          "We prioritize efficient and relevant technologies adapted to your real business needs.",

        supportTitle: "End-to-End Support",
        supportText:
          "From analysis to deployment, DBS supports you at every stage of your project.",
      },

      portfolio: {
        label: "Portfolio",
        title: "Our Recent Projects",
        viewAll: "View Full Portfolio",
        caseStudy: "Case Study",
        description:
          "Digital platforms designed to increase visibility, improve processes and generate measurable impact.",
        discover: "Discover",
      },

      process: {
        label: "Our Methodology",
        title: "From Idea to Impact",
        description:
          "We transform your business needs into reliable, scalable and impactful digital solutions.",

        step1: "Needs Assessment",
        step2: "Solution Design",
        step3: "Development & Integration",
        step4: "Deployment & Support",

        stepDescription:
          "A structured approach to ensure quality, performance and measurable results.",
      },

      sectors: {
        label: "Industries We Serve",
        title: "Solutions Adapted to Multiple Sectors",

        telecom: "Telecommunications",
        finance: "Finance & Mobile Money",
        ngo: "NGOs & Development",
        public: "Public Sector",
        education: "Education",
        microfinance: "Microfinance",
        startup: "SMEs & Startups",
        consulting: "Consulting",
        viewAll: "View all industries",
      },

      cta: {
        label: "Let's Work Together",
        title: "Ready to turn your ideas into high-impact digital solutions?",
        description:
          "Contact DBS to build your website, automate your reporting, create dashboards or digitize your business processes.",
        quote: "Request a Quote",
        contact: "Contact Us",
      },

      about: {
        label: "About DBS",
        title: "Transforming Data Into Business Value",
        subtitle:
          "DBS helps companies, institutions and organizations accelerate their digital transformation through technology, data and innovation.",

        ctaServices: "Explore Our Services",
        ctaContact: "Contact Us",
        ctaQuote: "Request a Quote",

        whoLabel: "Who We Are",
        whoTitle: "About DBS Africa",
        whoText1:
          "DBS Africa is a pan-African consulting firm specialized in digital transformation, data analytics, business intelligence, artificial intelligence, cybersecurity and strategic advisory services.",
        whoText2:
          "We help companies, public institutions, NGOs, financial organizations and telecom operators unlock the full value of their data and technologies to improve performance and accelerate growth.",

        visionTitle: "Our Vision",
        visionText:
          "To become a leading African partner in digital transformation, data intelligence and technological innovation.",

        missionTitle: "Our Mission",
        missionText:
          "To design and deploy high-impact digital solutions that help organizations make better decisions, optimize processes and create sustainable value.",

        valuesLabel: "Our Values",
        valuesTitle: "The Principles That Guide Us",

        values: {
          excellence: "Excellence",
          excellenceText:
            "We strive for quality and performance in every project.",

          innovation: "Innovation",
          innovationText:
            "We develop modern solutions adapted to today's challenges.",

          integrity: "Integrity",
          integrityText:
            "We work with transparency, professionalism and accountability.",

          impact: "Impact",
          impactText:
            "We create measurable and sustainable results for our clients.",
        },

        expertiseLabel: "Our Expertise",
        expertiseTitle: "Skills Driving Your Growth",
        expertiseDescription:
          "We combine business expertise, modern technologies and data intelligence to support organizational growth.",

        expertise: {
          bi: "Business Intelligence",
          biText: "Power BI, dashboards, reporting and data visualization.",

          data: "Data Analytics",
          dataText: "Data analysis, KPIs, SQL and decision support.",

          web: "Web Development",
          webText:
            "Modern web applications built with React, Node.js and WordPress.",

          digital: "Digital Transformation",
          digitalText: "Automation, process optimization and innovation.",

          telecom: "Telecom & Mobile Money",
          telecomText:
            "IN, VAS, Mobile Financial Services and telecom reporting.",

          pm: "Project Management",
          pmText: "PMO, governance, coordination and project delivery.",
        },

        whyLabel: "Why DBS",
        whyTitle: "Why Work With Us?",
        whyDescription:
          "We bring together technical, business and strategic expertise to deliver impactful solutions.",

        reasons: {
          experience: "10+ years of experience",
          multisector: "Multi-sector expertise",
          results: "Results-oriented approach",
          custom: "Tailor-made solutions",
          support: "End-to-end support",
          tech: "Modern and scalable technologies",
        },

        stats: {
          experience: "Years of Experience",
          projects: "Projects Delivered",
          technologies: "Technologies Mastered",
          countries: "Countries Served",
        },

        sectorsLabel: "Industries We Serve",
        sectorsTitle: "Solutions Adapted To Multiple Industries",

        sectors: {
          telecom: "Telecommunications",
          mobileMoney: "Mobile Money",
          banking: "Banking",
          microfinance: "Microfinance",
          ngo: "NGO",
          association: "Association",
          unitedNations: "United Nations",
          government: "Public Administration",

          university: "Universities",
          higherInstitute: "University Institutes",
          publicInstitution: "Public Institutions",
          privateInstitution: "Private Institutions",

          health: "Healthcare",
          trade: "Trade",
          industry: "Industry",
          other: "Other"
        },

        finalCtaTitle:
          "Ready To Accelerate Your Digital Transformation?",
        finalCtaText:
          "Let's build innovative solutions together and turn your data into strategic decisions.",
        promoter: {
          label: "The Founder",
          socialLabel: "You can also find me on",
          title: "Expertise Dedicated to Digital Transformation",
          name: "Dobingar Guiryambaye Vincent",
          role:
            "IN, VAS & MFS Engineer | Data Analyst | Web Developer | Project Manager",
          description1:
            "The founder of DBS has over 10 years of experience in telecommunications, data analytics, business intelligence, automated reporting, web development and digital project management.",
          description2:
            "His background combines strong technical expertise, business understanding and the ability to design practical digital solutions that help companies, institutions and organizations grow.",
        },

        teamLabel: "The talents behind DBS Africa",
        teamTitle: "Our team",
        teamDescription:
          "A multidisciplinary team combining technological expertise, business knowledge and a strong commitment to Africa’s digital transformation.",

        team: {
          members: {
            amina: {
              role:
                "Head of Data Analytics & Business Intelligence",
              description:
                "Specialist in data analysis, dashboard design, reporting automation and decision-making support.",
            },
            alain: {
              role:
                "Lead Web & Application Developer",
              description:
                "Full-stack developer specialising in web platforms, business applications, secure APIs and scalable digital solutions.",
            },
            nadege: {
              role:
                "Head of Digital Marketing & Partnerships",
              description:
                "Digital marketing professional specialising in commercial prospecting, customer acquisition and strategic partnership development.",
            },
            abdoulaye: {
              role:
                "Consultant – Chief Information Officer (CIO)",
              description:
                "Information and data professional with over 16 years of experience in humanitarian and development contexts: data governance, advanced analytics and digital solution design in support of decision-making and field impact.",
            },
          },
        },
      },

      servicesPage: {
        label: "Our Services",
        title: "Digital solutions tailored to your needs",
        subtitle:
          "DBS supports organizations in digital transformation, data analytics, business intelligence, web development, telecom solutions and project management.",

        ctaQuote: "Request a Quote",
        ctaContact: "Contact Us",
        viewPortfolio: "View Our Work",

        expertiseLabel: "Our Expertise",
        expertiseTitle: "Services designed to create real impact",
        expertiseText:
          "We deliver reliable, modern and results-driven solutions to help companies, institutions and organizations improve performance.",

        items: {
          digital: {
            title: "Digital Transformation",
            text:
              "We help organizations modernize their processes and adopt efficient digital solutions.",
            b1: "Digital audit and process analysis",
            b2: "Task and workflow automation",
            b3: "Business operations optimization",
          },

          bi: {
            title: "Business Intelligence",
            text:
              "We transform your data into clear dashboards that support better decision-making.",
            b1: "Power BI dashboards",
            b2: "Automated reporting",
            b3: "KPI and key indicator monitoring",
          },

          data: {
            title: "Data Analytics",
            text:
              "We analyze your data to identify trends, anomalies, risks and opportunities.",
            b1: "Advanced SQL and Excel analysis",
            b2: "Data quality control",
            b3: "Visualization and recommendations",
          },

          web: {
            title: "Web Development",
            text:
              "We develop modern, secure and tailored websites, platforms and applications.",
            b1: "Professional corporate websites",
            b2: "React and Node.js applications",
            b3: "WordPress and API solutions",
          },

          telecom: {
            title: "Telecom & Mobile Money",
            text:
              "We bring specialized expertise in IN, VAS, MFS and Mobile Money environments.",
            b1: "Telecom reporting and reconciliation",
            b2: "VAS and MFS service analysis",
            b3: "Operational performance monitoring",
          },

          pm: {
            title: "Project Management",
            text:
              "We support the planning, coordination, monitoring and governance of digital projects.",
            b1: "PMO and project governance",
            b2: "Risk, timeline and deliverable tracking",
            b3: "Executive reporting and coordination",
          },

          marketing: {
            title: "Digital Marketing",
            text:
              "We help organizations strengthen their online visibility, generate leads and improve digital communication.",
            b1: "Social media management and community engagement",
            b2: "Facebook Ads and Google Ads campaigns",
            b3: "SEO, content creation and performance analytics",
          },
        },

        approachLabel: "Our Approach",
        approachTitle: "A structured and results-oriented method",
        approachText:
          "Each DBS project follows a clear approach: understand the need, design the best solution, develop efficiently and support the client until impact is achieved.",

        process: {
          step1: "Needs assessment",
          step2: "Solution design",
          step3: "Development and integration",
          step4: "Deployment and support",
        },

        highlights: {
          tech: {
            title: "Modern Technologies",
            text:
              "We use reliable and scalable tools to build sustainable solutions.",
          },
          data: {
            title: "Data-Driven Decisions",
            text:
              "We help decision-makers understand their indicators and act quickly.",
          },
          business: {
            title: "Business Impact",
            text:
              "Our solutions are designed to address concrete operational needs.",
          },
        },

        techLabel: "Technologies",
        techTitle: "Modern tools for high-performing solutions",
        techText:
          "DBS combines web, data, BI and reporting technologies to build robust, useful and scalable solutions.",

        finalCtaTitle: "Do you have a digital or data project?",
        finalCtaText:
          "Let’s discuss your needs and build a solution tailored to your organization.",
      },

      portfolioPage: {
        label: "Portfolio",
        title: "Projects & digital success stories",
        subtitle:
          "Discover how DBS helps organizations build high-impact digital, data and business solutions.",

        ctaContact: "Contact Us",
        ctaQuote: "Request a Quote",

        stats: {
          projects: "Projects Delivered",
          experience: "Years of Experience",
          countries: "Countries Served",
          technologies: "Technologies Mastered",
        },

        projectsLabel: "Our Work",
        projectsTitle: "Concrete projects for measurable results",
        projectsText:
          "Each DBS project is designed to address real needs: visibility, automation, management, reporting, performance and digital transformation.",

        resultsLabel: "Results",
        discussProject: "Discuss a similar project",

        projects: {
          snrc: {
            title: "SNRC",
            sector: "Public institution",
            description:
              "Development of a modern institutional platform to strengthen visibility, communication and content management.",
            r1: "Modern institutional website",
            r2: "Secure administration",
            r3: "Centralized content management",
          },

          harvest: {
            title: "Harvest Center",
            sector: "Education & training",
            description:
              "Complete digital platform for managing registrations, students, teachers, courses and communications.",
            r1: "Student management",
            r2: "Teacher and course management",
            r3: "Multilingual interface",
          },

          ndof: {
            title: "NDOF Consulting",
            sector: "Consulting",
            description:
              "Professional corporate website with news, contacts, quote requests and expertise presentation.",
            r1: "Professional digital presence",
            r2: "Quote request management",
            r3: "Admin interface",
          },

          eden: {
            title: "Eden Business Center",
            sector: "Commerce & textile",
            description:
              "Showcase platform and product catalog to promote business activities and simplify content management.",
            r1: "Product catalog",
            r2: "Multimedia gallery",
            r3: "Admin dashboard",
          },

          mani: {
            title: "MANI Financial Group",
            sector: "Microfinance",
            description:
              "Multilingual digital platform to present financial services, build trust and improve customer experience.",
            r1: "Multilingual platform",
            r2: "Financial services presentation",
            r3: "Modern user experience",
          },

          cdo: {
            title: "CDO Tchad",
            sector: "Jobs & recruitment",
            description:
              "Recruitment portal for publishing, managing and tracking job offers and applications.",
            r1: "Job offer management",
            r2: "HR administration",
            r3: "Recruitment platform",
          },
        },

        caseLabel: "Case Studies",
        caseTitle: "From idea to operational impact",
        caseText:
          "Our projects follow a structured approach: understand the context, identify challenges, design the solution and measure results.",

        caseContext: "Context",
        caseChallenge: "Challenge",
        caseSolution: "Solution",
        caseResult: "Result",

        caseStudies: {
          harvest: {
            title: "Harvest Center",
            context: "A language and training center with academic management needs.",
            challenge:
              "Digitize registrations, courses, users and communications.",
            solution:
              "Development of a complete web platform with admin, teacher and student spaces.",
            result:
              "Improved administrative and academic management.",
          },

          snrc: {
            title: "SNRC",
            context: "A public institution needing a professional digital presence.",
            challenge:
              "Structure institutional information and simplify content management.",
            solution:
              "Creation of a modern website with backend, admin dashboard and dynamic management.",
            result:
              "Improved institutional visibility and simplified administration.",
          },

          eden: {
            title: "Eden Business Center",
            context: "A commercial company seeking to present its products and identity.",
            challenge:
              "Create a clear, modern and easy-to-manage digital showcase.",
            solution:
              "Development of a platform with product catalog, gallery and dashboard.",
            result:
              "Better product visibility and improved online presence.",
          },
        },

        techLabel: "Technologies",
        techTitle: "Modern technologies for reliable solutions",
        techText:
          "DBS combines web, data, BI and reporting technologies to design robust, scalable and useful platforms.",

        finalCtaTitle: "Ready to build your next digital project?",
        finalCtaText:
          "Let's transform your ideas into innovative digital solutions with measurable impact for your organization.",
              
        categories: {
          all: "All",
          web: "Web",
          data: "Data",
          humanitarian: "Humanitarian",
          other: "Other",
        },

        projectsGrid: {
          label: "Our Work",
          title: "Projects organized by area of expertise",
          subtitle:
            "Filter our work by category: web platforms, data & analytics projects, humanitarian solutions and other work.",
        },

        dataProjects: {
          label: "Data & Analytics Projects",
          title: "Our data analytics work",
          subtitle:
            "Technical projects showcasing our expertise in SQL, Python and R for data analysis and visualization.",
          viewProject: "View project",
          dataLendoRh: {
            title: "DataLendo RH",
            description:
              "HR data analytics project using SQL to design and query a human resources management database.",
          },
          afriMarket: {
            title: "AfriMarket Projects",
            description:
              "Interactive Python (Streamlit) application for African market data analysis.",
          },
          rDashboard: {
            title: "R Data Dashboard",
            description:
              "Data analysis dashboard built in R and published on Posit Connect.",
          },
        },

        webProjects: {
          label: "Web Projects",
          title: "Modern, high-performing platforms tailored to business needs",
          subtitle:
            "Explore some of the websites and digital platforms we have designed and developed for companies, institutions and organizations.",

          visitSite: "Visit Website",
          online: "Live",
          pending: "Pending Deployment",
          pendingMessage: "Project completed — deployment pending client approval",
          missingLink: "Link to be added",

          snrc: {
            category: "Public Institution / Debt Recovery",
            description:
              "Modern institutional platform for the National Debt Recovery Agency, including news, publications, FAQ, contact forms and administration.",
          },

          harvest: {
            category: "Business / Services",
            description:
              "Professional corporate website presenting Harvest Center services, activities and digital identity with a modern responsive interface.",
          },

          eden: {
            category: "Business Center",
            description:
              "Professional website featuring products, gallery, contact forms and an administration interface for content management.",
          },

          cdo: {
            category: "Recruitment / Employment",
            description:
              "Recruitment portal with job posting, online applications, administration tools and document generation.",
          },

          antidiscrimination: {
            category: "NGO / Human Rights",
            description:
              "Digital platform dedicated to awareness, information and advocacy against discrimination with a modern and accessible interface.",
          },

          ndof: {
            category: "Consulting Firm",
            description:
              "Complete corporate platform including services, portfolio, news, gallery, contact forms, quotation requests and administration modules.",
          },

          mani: {
            category: "Microfinance / Financial Services",
            description:
              "Digital platform for a microfinance institution featuring service presentation, simulations, contact and multilingual structure.",
          },
          ngoSolutions: {
            label: "NGO & International Organizations Solutions",

            title:
              "Digital Transformation for NGOs and United Nations Agencies",

            subtitle:
              "DBS Africa supports NGOs, UN agencies, public institutions and development partners in program digitalization, data management, monitoring & evaluation and decision-support reporting."
          },
          meDashboard: {
            title: "M&E Performance Dashboard",
            category: "NGO / Monitoring & Evaluation",
            description:
              "Monitoring and evaluation platform for tracking indicators, activities, outputs and impacts of donor-funded projects."
          },

          beneficiarySystem: {
            title: "Beneficiary Management System",
            category: "NGO / Humanitarian Programs",
            description:
              "Digital beneficiary management solution for registration, household tracking, assistance management and reporting."
          },

          humanitarianPlatform: {
            title: "Humanitarian Data Platform",
            category: "Data Analytics",
            description:
              "Centralized field data platform with dashboards, indicators visualization and automated humanitarian reporting."
          },
            concept: "Business Solution / Concept",

            conceptMessage:
              "Demonstration solution designed to meet the needs of NGOs and international organizations",
        },
      },

      contactPage: {
        label: "Contact",
        title: "Let’s discuss your next digital project",
        country: "Country",
        number: "Number",
        selectCountryFirst: "Select your country first.",
        sending: "Sending...",
        success: "Your message has been sent successfully.",

        errors: {
          fullName: "Please enter your full name.",
          email: "Please enter your email address.",
          country: "Please select your country.",
          message: "Please enter your message.",
          submit:
            "An error occurred while sending your message.",
          serverUnavailable:
            "Unable to reach the server. Please try again later.",
        },
        subtitle:
          "DBS is ready to support your digital transformation, data analytics, business intelligence, web development and telecom projects.",

        infoLabel: "Get in touch",
        infoTitle: "Let’s talk about your needs",
        infoText:
          "Do you have a web, data, BI, telecom or digital transformation project? Contact us to discuss your objectives.",

        emailTitle: "Email",
        phoneTitle: "Phone",
        whatsappTitle: "WhatsApp",
        linkedinTitle: "LinkedIn",

        locationTitle: "Location",
        locationText: "Burundi | Africa | Remote collaboration available",

        formTitle: "Send a message",
        fullName: "Full name",
        organization: "Organization",
        email: "Email address",
        phone: "Phone",
        subject: "Subject",
        message: "Your message",
        send: "Send message",

        whyLabel: "Why contact us",
        whyTitle: "A reliable partner for your digital projects",

        reasons: {
          experience: "10+ years of experience",
          data: "Data & BI expertise",
          web: "Modern web development",
          telecom: "Telecom & Mobile Money",
          support: "Personalized support",
        },
        contactNow: "Contact Us Now",
      },

      quotePage: {
        label: "Quote Request",
        number: "Number",
        phone: "Phone number",
        selectCountryFirst: "Select your country first.",
        title: "Describe your project and share your needs",
        subtitle:
          "Fill out this form to help DBS better understand your project and propose a tailored solution.",

        formTitle: "Quote request form",
        fullName: "Full name",
        organization: "Organization",
        email: "Email address",
        phone: "Phone",
        country: "Country",
        sector: "Business sector",

        serviceNeeded: "Service needed",
        services: {
          web: "Web Development",
          data: "Data Analytics",
          bi: "Business Intelligence",
          digital: "Digital Transformation",
          telecom: "Telecom & Mobile Money",
          pm: "Project Management",
          marketing: "Digital Marketing",
        },

        budget: "Estimated budget",
        timeline: "Expected timeline",
        description: "Describe your project, objectives and needs",
        send: "Send request",

        steps: {
          need: "Understand your needs",
          needText:
            "We analyze your context, objectives and expected results.",
          budget: "Assess the scope",
          budgetText:
            "We identify the resources, timelines and technologies required.",
          timeline: "Propose a solution",
          timelineText:
            "We send you a clear, tailored and results-oriented proposal.",
        },

        responseTitle: "Quick response",
        responseText:
          "DBS will contact you to clarify your needs and prepare a tailored proposal.",

      whyTitle: "Why choose DBS?",

      advantages: {
        quality: {
          title: "Professional quality",
          desc: "We build reliable, modern and scalable solutions."
        },

        delivery: {
          title: "On-time delivery",
          desc: "Every project follows a clear schedule and delivery plan."
        },

        support: {
          title: "Dedicated support",
          desc: "We remain available before, during and after delivery."
        }
      },

      faqTitle: "Frequently Asked Questions",

      faq: {
        q1: {
          question: "How long does a project take?",
          answer: "The duration depends on the project scope, but we always provide a clear timeline."
        },

        q2: {
          question: "How can I request a quote?",
          answer: "Simply fill in the form or contact us directly."
        },

        q3: {
          question: "Do you provide post-delivery support?",
          answer: "Yes. We offer maintenance and support depending on the selected package."
        },

        q4: {
          question: "Can I request a custom solution?",
          answer: "Absolutely. All our services can be tailored to your needs."
        }
      },

      ctaFinalTitle:
        "Let's discuss your project today",

      ctaButton:
        "Request a quote",
      clientType: "Client Type",
      individual: "Individual",
      organization: "Organization / Company",
      organizationName: "Organization Name",

      currency: "Currency",

      sectors: {
        telecom: "Telecommunications",
        mobileMoney: "Mobile Money",
        banking: "Banking",
        microfinance: "Microfinance",
        ngo: "NGO / Association",
        government: "Government",
        association: "Association",
        unitedNations: "United Nations",
        education: "Education",
        health: "Healthcare",
        trade: "Trade",
        industry: "Industry",
        other: "Other"
      }
      },

      blogPage: {
        label: "Blog & Insights",
        title: "Ideas, analysis and digital advice",
        subtitle:
          "Explore our content on data analytics, business intelligence, web development, digital transformation and telecom.",

        categories: "Categories",
        latestLabel: "Latest articles",
        latestTitle: "Content to better understand digital and data",
        readMore: "Read article",

        posts: {
          powerbi: {
            category: "Business Intelligence",
            title: "How Power BI helps decision-makers monitor KPIs",
            summary:
              "A good dashboard is not just about displaying charts. It must answer real business questions.",
          },
          data: {
            category: "Data Analytics",
            title: "Turning raw data into useful decisions",
            summary:
              "Data analysis helps identify trends, anomalies, risks and hidden opportunities.",
          },
          web: {
            category: "Web Development",
            title: "Why a company should invest in a modern platform",
            summary:
              "A professional website improves credibility, visibility and customer relationships.",
          },
          digital: {
            category: "Digital Transformation",
            title: "Digitizing processes to improve efficiency",
            summary:
              "Digital transformation helps automate, simplify and improve operations.",
          },
          pm: {
            category: "Project Management",
            title: "The role of reporting in project success",
            summary:
              "Clear reporting helps teams track risks, timelines, deliverables and performance.",
          },
          telecom: {
            category: "Telecom & Mobile Money",
            title: "Why data reconciliation is essential",
            summary:
              "In telecom and mobile money, data quality is essential to monitor performance.",
          },
        },

        ctaTitle: "Need digital or data expertise?",
        ctaText:
          "Contact DBS to turn your ideas, data and processes into concrete solutions.",
        ctaButton: "Contact Us",
        ctaContact: "Contact Us",
        noPosts: "No published articles available at the moment.",
        selectCurrencyFirst: "Select a currency first",
      },

      homePartners: {
        label: "Trusted By",
        title: "Clients & Partners",
        description:
          "We are proud to support organizations, companies and institutions in their digital transformation journey.",
      },

      testimonials: {
        label: "Testimonials",
        title: "What Our Clients Say",
        description:
          "Our clients trust us because of the quality of delivered solutions, our understanding of their needs and the impact achieved.",

        harvest: {
          role: "Education & Training",
          text:
            "DBS supported us in the full digitalization of our training platform with professionalism and efficiency.",
        },

        snrc: {
          role: "Public Institution",
          text:
            "Excellent expertise in web development, content structuring and implementation of a modern institutional platform.",
        },

        ndof: {
          role: "Consulting",
          text:
            "Professionalism, responsiveness and quality deliverables. DBS understood our needs and proposed a tailored solution.",
        },
      },

      technologies: {
        label: "Our Technologies",
        title: "Modern tools for high-performance solutions",
        description:
          "We use industry-proven technologies to build reliable, scalable and business-oriented digital solutions.",
      },

      technologies: {
        label: "Our Technologies",

        title: "Modern Technologies Driving Business Growth",

        viewAll: "View all technologies",

        description:
          "We leverage proven technologies and industry best practices to deliver secure, scalable, and innovative digital solutions that create measurable business value.",

        react:
          "Building modern, fast, and interactive web user interfaces.",

        node:
          "Developing high-performance and scalable backend systems.",

        express:
          "Lightweight framework for building secure and efficient APIs.",

        javascript:
          "Core programming language of modern web development.",

        mysql:
          "Reliable relational database for business applications and data management.",

        postgres:
          "Robust database solution for scalable and enterprise-grade platforms.",

        powerbi:
          "Creating dashboards, reports, and performance indicators for data-driven decision making.",

        sql:
          "Advanced data analysis, querying, and database management.",

        wordpress:
          "Rapid development of manageable websites and content platforms.",

        tailwind:
          "Modern CSS framework for responsive and professional user interfaces.",

        api:
          "Integration of systems and services through REST APIs.",

        github:
          "Version control, collaboration, and project lifecycle management.",
        python:
          "Development of data analytics solutions, automation, artificial intelligence and business applications.",
        r:
          "Advanced statistical analysis, data modeling and scientific research.",
        spss:
          "Statistical analysis, quantitative research, surveys and decision-support reporting.",
        sqlserver:
          "Database design, advanced querying, optimization and Microsoft SQL Server administration.",

        oracle:
          "Enterprise database management, data integration and mission-critical large-scale solutions.",

        tableau:
          "Data visualization, interactive dashboards and decision-support analytics.",

        ssrs:
          "Professional report development, automated exports and enterprise reporting using SQL Server Reporting Services.",
        showMore: "View all technologies",
        showLess: "Show less",
      },
      solutionsPage: {
        heroLabel: "Digital Solutions",
        heroTitle: "Modern solutions tailored to every sector",
        heroDescription:
          "DBS Africa designs web, data, reporting, telecom and humanitarian platforms for businesses, institutions and organizations.",

        label: "Our Digital Solutions",
        title: "Innovative solutions for every sector",
        description:
          "DBS Africa supports businesses, institutions and organizations in their digital transformation through secure, high-performing and results-oriented solutions.",

        viewProjects: "View Our Projects",
        requestSolution: "Request a Solution",
        contactUs: "Contact Us",

        items: {
          web: {
            title: "Web Development",
            description:
              "Custom websites, platforms and applications that are modern, fast and tailored to your needs.",
            feature1: "Corporate websites",
            feature2: "Web portals",
            feature3: "Business applications",
            feature4: "SaaS solutions",
          },

          bi: {
            title: "Business Intelligence",
            description:
              "Dynamic dashboards and decision-support reporting to monitor your performance.",
            feature1: "Power BI",
            feature2: "Tableau",
            feature3: "SSRS reporting",
            feature4: "KPIs and analytics",
          },

          monitoring: {
            title: "Monitoring & Evaluation",
            description:
              "Complete solutions for monitoring projects, indicators, results and program impacts.",
            feature1: "Indicator monitoring",
            feature2: "Plans and activities",
            feature3: "Donor reporting",
            feature4: "Interactive dashboards",
          },

          telecom: {
            title: "Telecom & Mobile Money",
            description:
              "Analytical and operational solutions for telecom data, KYC, transactions and network performance.",
            feature1: "Subscriber analytics",
            feature2: "Transaction monitoring",
            feature3: "KYC and compliance",
            feature4: "Network performance",
          },

          beneficiaries: {
            title: "Beneficiary Management",
            description:
              "Registration, monitoring and management of beneficiaries in humanitarian and social programs.",
            feature1: "Household registration",
            feature2: "Beneficiary tracking",
            feature3: "Assistance management",
            feature4: "Reports and analytics",
          },

          recruitment: {
            title: "Digital Recruitment",
            description:
              "Recruitment portals and application management solutions for companies and organizations.",
            feature1: "Job publishing",
            feature2: "Online applications",
            feature3: "Candidate tracking",
            feature4: "HR dashboard",
          },

          marketing: {
            title: "Digital Marketing",
            description:
              "Digital strategies designed to increase visibility, attract new customers and strengthen your online presence.",
            feature1: "Social media management",
            feature2: "Facebook and Google Ads campaigns",
            feature3: "Search engine optimization",
            feature4: "Content creation and reporting",
          },
        },

        ctaLabel: "Your Project",
        ctaTitle:
          "Do you need a digital platform tailored to your organization?",
        ctaDescription:
          "Tell us about your needs and let us build a secure, scalable web, data or business solution together.",
      },

      expertisePage: {
        label: "Our Expertise",
        title: "Complete expertise to power your transformation",
        subtitle:
          "DBS Africa brings together ten complementary areas of expertise to support digital, data, AI and cybersecurity transformation for organizations across Africa.",
        ctaQuote: "Request a quote",
        ctaContact: "Contact Us",
        stats: {
          domains: "Areas of Expertise",
        },
        domains: {
          digital: {
            title: "Digital Transformation",
            description:
              "We support the definition and execution of digital strategies, business process modernization and change governance.",
          },
          data: {
            title: "Data & Business Intelligence",
            description:
              "We turn your data into dashboards, KPIs and automated reports that inform decision-making.",
          },
          ai: {
            title: "Artificial Intelligence",
            description:
              "We design assistants, agents and intelligent automations tailored to our clients' operational realities.",
          },
          cybersecurity: {
            title: "Cybersecurity",
            description:
              "We assess, protect and strengthen the security posture of your systems, from audit to incident response.",
          },
          cloud: {
            title: "Cloud Computing",
            description:
              "We design, migrate and modernize your infrastructure on Azure, AWS and Google Cloud.",
          },
          software: {
            title: "Software Engineering",
            description:
              "We build robust, scalable enterprise applications, APIs and SaaS platforms.",
          },
          telecom: {
            title: "Telecommunications",
            description:
              "We bring deep expertise in OSS/BSS, revenue assurance and telecom analytics.",
          },
          gis: {
            title: "GIS & Spatial Intelligence",
            description:
              "We leverage geospatial data for mapping, spatial analytics and remote sensing.",
          },
          meal: {
            title: "Monitoring, Evaluation, Accountability & Learning (MEAL)",
            description:
              "We digitize data collection and impact monitoring for development programs.",
          },
          itStrategy: {
            title: "IT Strategy & Enterprise Architecture",
            description:
              "We align technology strategy with business goals and structure sustainable enterprise architecture.",
          },
        },
      },

      industriesPage: {
        label: "Industries We Serve",
        title: "Sector expertise built for impact",
        subtitle:
          "DBS Africa supports a wide range of organizations across Africa, from public institutions to private enterprises.",
        introText:
          "Every sector faces its own regulatory, operational and technology challenges. DBS Africa adapts its data, digital and cybersecurity methodologies to each organization's specific context, from the public sector to private enterprises.",
        ctaQuote: "Request a quote",
        ctaContact: "Contact Us",
      },

      technologiesPage: {
        label: "Our Technology Stack",
        title: "Modern technologies for sustainable solutions",
        subtitle:
          "We combine proven tools across development, data, AI, cloud and cybersecurity to build reliable, scalable solutions.",
        highlights: {
          reliable: {
            title: "Proven Technologies",
            text: "We select mature, widely adopted tools that are actively maintained by their communities.",
          },
          secure: {
            title: "Security by Design",
            text: "Every technology choice embeds security best practices from the outset.",
          },
          scalable: {
            title: "Scalable Solutions",
            text: "Our architectures are designed to grow alongside your organization.",
          },
        },
        categories: {
          programming: "Programming Languages",
          frontend: "Frontend",
          backend: "Backend",
          databases: "Databases",
          bi: "Business Intelligence",
          ai: "Artificial Intelligence",
          dataEngineering: "Data Engineering",
          cloud: "Cloud",
          gis: "GIS",
          cybersecurity: "Cybersecurity",
          devops: "DevOps",
          projectManagement: "Project Management",
          design: "Design",
        },
      },

      certificationsPage: {
        label: "Frameworks & Standards",
        title: "A practice aligned with international standards",
        subtitle:
          "As a cybersecurity and digital transformation consulting firm, we structure our methodologies around internationally recognized frameworks and standards.",
        introText:
          "Security and compliance are not optional — they are embedded in our consulting methodology. Here are the international frameworks that structure our approach.",
        standardsLabel: "Frameworks We Align With",
        cloudLabel: "Cloud Platforms We Work With",
        disclaimer:
          "These frameworks guide our methodology and deliverables; they do not constitute an official certification of DBS Africa issued by the corresponding bodies.",
        items: {
          iso27001:
            "Readiness and compliance support for the ISO/IEC 27001 information security management standard.",
          nist: "Structuring cybersecurity programs around the NIST Cybersecurity Framework.",
          cis: "Implementation of priority CIS Controls to reduce cyber risk.",
          gdpr: "Support toward compliance with the General Data Protection Regulation.",
          zeroTrust:
            "Design of security architectures built on the zero trust principle.",
        },
        ctaTitle: "Need to assess your organization's security maturity?",
        ctaText:
          "Let's discuss your context and the frameworks best suited to your challenges.",
      },

      careersPage: {
        label: "Careers",
        title: "Let's build Africa's digital future together",
        subtitle:
          "Join a multidisciplinary team passionate about data, technology and sustainable impact.",
        ctaContact: "Contact Us",
        cultureLabel: "Our Culture",
        cultureTitle: "Why join DBS Africa",
        benefits: {
          impact: {
            title: "Real-impact projects",
            text:
              "You work on solutions that concretely transform organizations across Africa.",
          },
          growth: {
            title: "Continuous learning",
            text:
              "We invest in upskilling on data, cloud, AI and cybersecurity technologies.",
          },
          team: {
            title: "A multidisciplinary team",
            text:
              "You work alongside experts in data, development, security and project management.",
          },
          flexibility: {
            title: "Flexibility & trust",
            text:
              "We favor results-oriented work and flexible collaboration.",
          },
        },
        openRolesLabel: "Open Positions",
        openRolesTitle: "No open positions at the moment",
        openRolesText:
          "We have no active openings right now, but we always welcome spontaneous applications from talented profiles.",
        spontaneousCta: "Send a spontaneous application",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;