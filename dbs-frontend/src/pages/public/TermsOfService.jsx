import { useTranslation } from "react-i18next";
import {
  FileText,
  CheckCircle2,
  Layers,
  UserCog,
  Copyright,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Scale,
} from "lucide-react";

import LegalPageLayout from "../../shared/components/LegalPageLayout";
import servicesBg from "../../assets/images/services-bg.jpg";

const sectionsFr = [
  {
    id: "objet",
    icon: FileText,
    title: "1. Objet",
    body: (
      <p>
        Les présentes conditions générales d'utilisation (CGU) régissent
        l'accès et l'utilisation du site DBS Africa, ainsi que des services
        qui y sont proposés : présentation des offres, demande de devis,
        formulaire de contact, espace partenaire et publication
        d'actualités.
      </p>
    ),
  },
  {
    id: "acceptation",
    icon: CheckCircle2,
    title: "2. Acceptation des conditions",
    body: (
      <p>
        L'accès et l'utilisation du site impliquent l'acceptation pleine et
        entière des présentes CGU. Si vous n'acceptez pas ces conditions,
        vous êtes invité à ne pas utiliser le site.
      </p>
    ),
  },
  {
    id: "services",
    icon: Layers,
    title: "3. Description des services",
    body: (
      <p>
        Le site permet notamment de consulter les offres et tarifs de DBS
        Africa, de soumettre une demande de devis ou de contact, de
        s'inscrire à l'espace partenaire, et de consulter les actualités
        publiées par DBS Africa. Certains services peuvent nécessiter la
        création d'un compte (espace partenaire, administration).
      </p>
    ),
  },
  {
    id: "compte-partenaire",
    icon: UserCog,
    title: "4. Compte et espace partenaire",
    body: (
      <p>
        L'inscription à l'espace partenaire donne lieu à la création d'un
        compte protégé par mot de passe. L'utilisateur est responsable de la
        confidentialité de ses identifiants et de toute activité effectuée
        depuis son compte. DBS Africa se réserve le droit de suspendre ou
        supprimer un compte en cas d'usage abusif ou non conforme aux
        présentes CGU.
      </p>
    ),
  },
  {
    id: "propriete-intellectuelle",
    icon: Copyright,
    title: "5. Propriété intellectuelle",
    body: (
      <p>
        Le contenu du site (textes, visuels, logos, code source) est protégé
        par le droit de la propriété intellectuelle. Toute reproduction non
        autorisée est interdite, conformément aux mentions légales du site.
      </p>
    ),
  },
  {
    id: "responsabilites",
    icon: AlertTriangle,
    title: "6. Responsabilités",
    body: (
      <p>
        DBS Africa met tout en œuvre pour assurer la disponibilité et la
        fiabilité du site, sans garantir une disponibilité continue ni
        l'absence d'erreurs techniques. L'utilisateur est seul responsable
        de l'exactitude des informations qu'il transmet via les formulaires
        du site (devis, contact, inscription partenaire).
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    icon: ShieldCheck,
    title: "7. Données personnelles",
    body: (
      <p>
        Le traitement des données personnelles collectées via le site est
        décrit dans les mentions légales. En utilisant les formulaires du
        site, l'utilisateur consent à ce traitement dans le cadre strict du
        suivi de sa demande.
      </p>
    ),
  },
  {
    id: "modification",
    icon: RefreshCw,
    title: "8. Modification des CGU",
    body: (
      <p>
        DBS Africa se réserve le droit de modifier les présentes CGU à tout
        moment, afin de les adapter aux évolutions du site ou de la
        réglementation. La version en vigueur est celle publiée sur cette
        page.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    icon: Scale,
    title: "9. Droit applicable et litiges",
    body: (
      <p>
        Les présentes CGU sont soumises au droit tchadien. À défaut de
        résolution amiable, tout litige relatif à leur interprétation ou
        leur exécution relève de la compétence des juridictions de
        N'Djaména, Tchad.
      </p>
    ),
  },
];

const sectionsEn = [
  {
    id: "objet",
    icon: FileText,
    title: "1. Purpose",
    body: (
      <p>
        These terms of service govern access to and use of the DBS Africa
        website, as well as the services offered on it: presentation of
        offers, quote requests, the contact form, the partner space, and
        news publishing.
      </p>
    ),
  },
  {
    id: "acceptation",
    icon: CheckCircle2,
    title: "2. Acceptance of terms",
    body: (
      <p>
        Accessing and using the site implies full acceptance of these terms
        of service. If you do not accept these terms, please refrain from
        using the site.
      </p>
    ),
  },
  {
    id: "services",
    icon: Layers,
    title: "3. Description of services",
    body: (
      <p>
        The site allows visitors to browse DBS Africa's offers and pricing,
        submit a quote or contact request, register for the partner space,
        and read news published by DBS Africa. Some services may require
        creating an account (partner space, administration).
      </p>
    ),
  },
  {
    id: "compte-partenaire",
    icon: UserCog,
    title: "4. Account and partner space",
    body: (
      <p>
        Registering for the partner space creates a password-protected
        account. The user is responsible for keeping their credentials
        confidential and for any activity carried out from their account.
        DBS Africa reserves the right to suspend or delete an account in
        case of misuse or non-compliance with these terms.
      </p>
    ),
  },
  {
    id: "propriete-intellectuelle",
    icon: Copyright,
    title: "5. Intellectual property",
    body: (
      <p>
        The site's content (text, visuals, logos, source code) is protected
        by intellectual property law. Any unauthorized reproduction is
        prohibited, in accordance with the site's legal notice.
      </p>
    ),
  },
  {
    id: "responsabilites",
    icon: AlertTriangle,
    title: "6. Liability",
    body: (
      <p>
        DBS Africa makes every effort to ensure the availability and
        reliability of the site, without guaranteeing continuous
        availability or the absence of technical errors. The user is solely
        responsible for the accuracy of the information they submit through
        the site's forms (quote, contact, partner registration).
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    icon: ShieldCheck,
    title: "7. Personal data",
    body: (
      <p>
        The processing of personal data collected through the site is
        described in the legal notice. By using the site's forms, the user
        consents to this processing strictly for the purpose of handling
        their request.
      </p>
    ),
  },
  {
    id: "modification",
    icon: RefreshCw,
    title: "8. Changes to these terms",
    body: (
      <p>
        DBS Africa reserves the right to modify these terms of service at
        any time, to reflect changes to the site or applicable regulations.
        The version in effect is the one published on this page.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    icon: Scale,
    title: "9. Governing law and disputes",
    body: (
      <p>
        These terms of service are governed by Chadian law. Failing an
        amicable resolution, any dispute relating to their interpretation or
        execution falls under the jurisdiction of the courts of N'Djamena,
        Chad.
      </p>
    ),
  },
];

export default function TermsOfService() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";
  const sections = lang === "fr" ? sectionsFr : sectionsEn;

  return (
    <LegalPageLayout
      seoTitle={
        lang === "fr"
          ? "Conditions générales d'utilisation"
          : "Terms of Service"
      }
      seoDescription={
        lang === "fr"
          ? "Conditions générales d'utilisation du site et des services DBS Africa."
          : "Terms of service for the DBS Africa website and services."
      }
      badge={lang === "fr" ? "Conditions d'utilisation" : "Terms of use"}
      title={
        lang === "fr"
          ? "Conditions générales d'utilisation"
          : "Terms of Service"
      }
      description={
        lang === "fr"
          ? "Les règles d'utilisation du site et des services proposés par DBS Africa."
          : "The rules governing the use of the DBS Africa website and services."
      }
      image={servicesBg}
      updatedLabel={
        lang === "fr"
          ? "Dernière mise à jour : 4 août 2026"
          : "Last updated: August 4, 2026"
      }
      tocLabel={lang === "fr" ? "Sommaire" : "Contents"}
      sections={sections}
    />
  );
}
