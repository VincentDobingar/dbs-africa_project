import {
  BarChart3,
  Code2,
  Database,
  Rocket,
  CheckCircle,
  BriefcaseBusiness,
  Boxes,
  Globe,
  Target,
  Lightbulb,
  BadgeCheck,
  Briefcase,
  Layers,
  Handshake,
} from "lucide-react";

import snrcLogo from "../assets/clients/snrc-logo.png";
import harvestLogo from "../assets/clients/harvest-logo.png";
import ndofLogo from "../assets/clients/ndof-logo.png";
import edenLogo from "../assets/clients/eden-logo.png";
import maniLogo from "../assets/clients/mani-logo.png";
import cdoLogo from "../assets/clients/cdo-logo.png";

export const stats = [
  {
    id: 1,
    value: 10,
    labelKey: "stats.experience",
    subKey: "stats.experienceSub",
    icon: "badge",
  },
  {
    id: 2,
    value: 50,
    labelKey: "stats.projects",
    subKey: "stats.projectsSub",
    icon: "briefcase",
  },
  {
    id: 3,
    value: 10,
    labelKey: "stats.technologies",
    subKey: "stats.technologiesSub",
    icon: "layers",
  },
  {
    id: 4,
    value: 5,
    labelKey: "stats.partners",
    subKey: "stats.partnersSub",
    icon: "handshake",
  },
];

export const services = [
  {
    icon: Rocket,
    titleKey: "services.transformation",
    textKey: "services.transformationText",
  },
  {
    icon: BarChart3,
    titleKey: "services.data",
    textKey: "services.dataText",
  },
  {
    icon: Database,
    titleKey: "services.bi",
    textKey: "services.biText",
  },
  {
    icon: Code2,
    titleKey: "services.web",
    textKey: "services.webText",
  },
];

export const whyItems = [
  {
    icon: Target,
    titleKey: "why.businessTitle",
    textKey: "why.businessText",
  },
  {
    icon: Lightbulb,
    titleKey: "why.innovationTitle",
    textKey: "why.innovationText",
  },
  {
    icon: Handshake,
    titleKey: "why.supportTitle",
    textKey: "why.supportText",
  },
];

export const technologies = [
  "React",
  "Node.js",
  "Express",
  "JavaScript",
  "WordPress",
  "Tailwind CSS",
  "REST API",
  "SQL",
  "Sqlsever",
  "MySQL",
  "PostgreSQL",
  "Oracle",
  "Power BI",
  "SSRS",
  "Tableau",
  "Git & GitHub",
  "Python", 
  "R", 
  "SPSS",
];

export const projects = [
  "Harvest Center",
  "SNRC",
  "NDOF Consulting",
  "Eden Business Center",
  "MANI Financial Group",
  "CDO Tchad",
];

export const portfolioProjects = [
  {
    title: "SNRC",
    category: "Site institutionnel",
    description: "Plateforme web moderne pour une institution publique.",
    image: snrcLogo,
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Harvest Center",
    category: "Plateforme éducative",
    description: "Site bilingue avec gestion des formations et inscriptions.",
    image: harvestLogo,
    tech: ["React", "Express", "MySQL"],
  },
  {
    title: "NDOF Consulting",
    category: "Site corporate",
    description: "Site professionnel pour présenter services, actualités et devis.",
    image: ndofLogo,
    tech: ["React", "Node.js", "MySQL"],
  },
  {
    title: "Eden Business Center",
    category: "Entreprise textile",
    description: "Vitrine digitale avec galerie, produits et espace admin.",
    image: edenLogo,
    tech: ["React", "Node.js", "MySQL"],
  },
  {
    title: "MANI Financial Group",
    category: "Microfinance",
    description: "Plateforme digitale pour services financiers innovants.",
    image: maniLogo,
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "CDO Tchad",
    category: "Portail recrutement",
    description: "Plateforme de publication d’offres et gestion des candidatures.",
    image: cdoLogo,
    tech: ["React", "Express", "PostgreSQL"],
  },
];