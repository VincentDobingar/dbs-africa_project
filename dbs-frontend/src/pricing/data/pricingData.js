// src/pricing/data/pricingData.js

export const pricingData = {
  baseCurrency: "FCFA",

  plans: [
    {
      id: "starter",
      tier: "starter",

      name: {
        fr: "Starter",
        en: "Starter",
      },

      description: {
        fr: "Idéal pour les petites structures et projets simples",
        en: "Ideal for small businesses and simple projects",
      },

      price: {
        amount: 500000,
        billing: "project",
      },

      features: [
        {
          fr: "Site vitrine 5 pages",
          en: "5-page website",
        },
        {
          fr: "Design responsive",
          en: "Responsive design",
        },
        {
          fr: "Formulaire de contact",
          en: "Contact form",
        },
        {
          fr: "Hébergement 3 mois",
          en: "3 months hosting",
        },
      ],

      popular: false,
    },

    {
      id: "business",
      tier: "business",

      name: {
        fr: "Business",
        en: "Business",
      },

      description: {
        fr: "Pour PME et entreprises en croissance",
        en: "For growing SMEs and companies",
      },

      price: {
        amount: 1200000,
        billing: "project",
      },

      features: [
        {
          fr: "Site professionnel avancé",
          en: "Advanced business website",
        },
        {
          fr: "Dashboard admin",
          en: "Admin dashboard",
        },
        {
          fr: "Intégration API",
          en: "API integration",
        },
        {
          fr: "SEO optimisé",
          en: "SEO optimized",
        },
        {
          fr: "Support 6 mois",
          en: "6 months support",
        },
      ],

      popular: true,
    },

    {
      id: "enterprise",
      tier: "enterprise",

      name: {
        fr: "Enterprise",
        en: "Enterprise",
      },

      description: {
        fr: "Solution complète pour grandes organisations",
        en: "Full solution for large organizations",
      },

      price: {
        amount: 2500000,
        billing: "project",
      },

      features: [
        {
          fr: "Plateforme sur mesure",
          en: "Custom platform",
        },
        {
          fr: "BI & Data dashboards",
          en: "BI & Data dashboards",
        },
        {
          fr: "Architecture scalable",
          en: "Scalable architecture",
        },
        {
          fr: "Sécurité avancée",
          en: "Advanced security",
        },
        {
          fr: "Support premium 12 mois",
          en: "Premium 12 months support",
        },
      ],

      popular: false,
    },
  ],

  addons: [
    {
      id: "maintenance",
      name: {
        fr: "Maintenance",
        en: "Maintenance",
      },
      price: 150000,
    },

    {
      id: "seo",
      name: {
        fr: "SEO avancé",
        en: "Advanced SEO",
      },
      price: 200000,
    },

    {
      id: "mobile_app",
      name: {
        fr: "Application mobile",
        en: "Mobile app",
      },
      price: 800000,
    },
  ],
};