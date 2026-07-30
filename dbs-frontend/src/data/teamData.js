import abdoulayePhoto from "../assets/team/abdoulaye-barthelemy.jpg";
import clementPhoto from "../assets/team/webba-clement.jpg";
import amitPhoto from "../assets/team/amit-singh.jpg";
import didierPhoto from "../assets/team/didier-mingue.jpg";
import aminaPhoto from "../assets/team/amina-ngarambe.jpg";
import alainPhoto from "../assets/team/alain-mahamat.jpg";
import nadegePhoto from "../assets/team/nadege-kabore.jpg";

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
    linkedin: null,
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
    email: null,
    linkedin: null,
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
    email: null,
    linkedin: null,
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
    email: null,
    linkedin: null,
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
