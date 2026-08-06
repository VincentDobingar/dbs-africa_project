import { useTranslation } from "react-i18next";
import {
  Building2,
  UserCircle,
  Server,
  Copyright,
  ShieldCheck,
  Cookie,
  AlertTriangle,
  Scale,
} from "lucide-react";

import LegalPageLayout from "../../shared/components/LegalPageLayout";
import servicesBg from "../../assets/images/services-bg.jpg";

const sectionsFr = [
  {
    id: "editeur",
    icon: Building2,
    title: "1. Éditeur du site",
    body: (
      <p>
        Le présent site est édité par <strong>DBS Africa</strong>, société à
        responsabilité limitée (SARL), immatriculée au Registre du Commerce
        et du Crédit Mobilier sous le numéro RCCM TC-MOU-2020/B/0313 (NIF
        9024935W), dont le siège social est situé au quartier Chagoua FDAR,
        N'Djaména, Tchad.
        <br />
        Représentant légal : Dobingar Guiryambaye Vincent.
        <br />
        Contact : contact@dbs-africa.org — +257 62 500 305.
      </p>
    ),
  },
  {
    id: "directeur-publication",
    icon: UserCircle,
    title: "2. Directeur de la publication",
    body: <p>Dobingar Guiryambaye Vincent, responsable du site.</p>,
  },
  {
    id: "hebergement",
    icon: Server,
    title: "3. Hébergement",
    body: (
      <p>
        Le site est hébergé par <strong>o2switch</strong> (SAS au capital de
        100 000 €), SIRET 510 909 807 00032, RCS Clermont-Ferrand, dont le
        siège social est situé Chemin des Pardiaux, 63000 Clermont-Ferrand,
        France.
      </p>
    ),
  },
  {
    id: "propriete-intellectuelle",
    icon: Copyright,
    title: "4. Propriété intellectuelle",
    body: (
      <p>
        L'ensemble des contenus présents sur ce site (textes, images, logos,
        chartes graphiques, code source) est la propriété exclusive de DBS
        Africa ou de ses partenaires, sauf mention contraire. Toute
        reproduction, représentation, modification ou diffusion, totale ou
        partielle, sans autorisation écrite préalable, est interdite.
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    icon: ShieldCheck,
    title: "5. Données personnelles",
    body: (
      <p>
        Les informations collectées via les formulaires du site (contact,
        demande de devis, inscription partenaire) sont destinées à DBS Africa
        et utilisées uniquement dans le cadre du traitement de votre demande.
        Conformément à la réglementation applicable, vous disposez d'un droit
        d'accès, de rectification et de suppression de vos données, exerçable
        en écrivant à contact@dbs-africa.org.
      </p>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "6. Cookies",
    body: (
      <p>
        Le site peut utiliser des cookies techniques nécessaires à son bon
        fonctionnement. Aucun cookie de suivi publicitaire tiers n'est déposé
        sans consentement préalable.
      </p>
    ),
  },
  {
    id: "responsabilite",
    icon: AlertTriangle,
    title: "7. Limitation de responsabilité",
    body: (
      <p>
        DBS Africa s'efforce d'assurer l'exactitude et la mise à jour des
        informations diffusées sur ce site, sans garantir l'exhaustivité ou
        l'absence d'erreurs. DBS Africa ne saurait être tenue responsable des
        dommages directs ou indirects résultant de l'accès ou de
        l'utilisation du site.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    icon: Scale,
    title: "8. Droit applicable",
    body: (
      <p>
        Les présentes mentions légales sont soumises au droit tchadien. Tout
        litige relatif à leur interprétation ou leur exécution relève de la
        compétence des juridictions de N'Djaména, Tchad.
      </p>
    ),
  },
];

const sectionsEn = [
  {
    id: "editeur",
    icon: Building2,
    title: "1. Site publisher",
    body: (
      <p>
        This site is published by <strong>DBS Africa</strong>, a limited
        liability company (SARL), registered with the Trade and Personal
        Property Credit Register under number RCCM TC-MOU-2020/B/0313 (NIF
        9024935W), with registered office in the Chagoua FDAR district,
        N'Djamena, Chad.
        <br />
        Legal representative: Dobingar Guiryambaye Vincent.
        <br />
        Contact: contact@dbs-africa.org — +257 62 500 305.
      </p>
    ),
  },
  {
    id: "directeur-publication",
    icon: UserCircle,
    title: "2. Publication director",
    body: <p>Dobingar Guiryambaye Vincent, site manager.</p>,
  },
  {
    id: "hebergement",
    icon: Server,
    title: "3. Hosting",
    body: (
      <p>
        This site is hosted by <strong>o2switch</strong> (SAS with capital of
        €100,000), SIRET 510 909 807 00032, RCS Clermont-Ferrand, whose
        registered office is located at Chemin des Pardiaux, 63000
        Clermont-Ferrand, France.
      </p>
    ),
  },
  {
    id: "propriete-intellectuelle",
    icon: Copyright,
    title: "4. Intellectual property",
    body: (
      <p>
        All content on this site (text, images, logos, visual identity,
        source code) is the exclusive property of DBS Africa or its
        partners, unless stated otherwise. Any reproduction, representation,
        modification or distribution, in whole or in part, without prior
        written authorization, is prohibited.
      </p>
    ),
  },
  {
    id: "donnees-personnelles",
    icon: ShieldCheck,
    title: "5. Personal data",
    body: (
      <p>
        Information collected through the site's forms (contact, quote
        request, partner registration) is intended for DBS Africa and used
        solely to process your request. In accordance with applicable
        regulations, you have the right to access, correct and delete your
        data by writing to contact@dbs-africa.org.
      </p>
    ),
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "6. Cookies",
    body: (
      <p>
        The site may use technical cookies necessary for its proper
        operation. No third-party advertising tracking cookie is set without
        prior consent.
      </p>
    ),
  },
  {
    id: "responsabilite",
    icon: AlertTriangle,
    title: "7. Limitation of liability",
    body: (
      <p>
        DBS Africa strives to ensure the accuracy and timeliness of the
        information published on this site, without guaranteeing
        completeness or the absence of errors. DBS Africa cannot be held
        liable for direct or indirect damages resulting from access to or use
        of the site.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    icon: Scale,
    title: "8. Governing law",
    body: (
      <p>
        This legal notice is governed by Chadian law. Any dispute relating
        to its interpretation or execution falls under the jurisdiction of
        the courts of N'Djamena, Chad.
      </p>
    ),
  },
];

export default function LegalNotice() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";
  const sections = lang === "fr" ? sectionsFr : sectionsEn;

  return (
    <LegalPageLayout
      seoTitle={lang === "fr" ? "Mentions légales" : "Legal Notice"}
      seoDescription={
        lang === "fr"
          ? "Mentions légales du site DBS Africa."
          : "Legal notice for the DBS Africa website."
      }
      badge={lang === "fr" ? "Informations légales" : "Legal information"}
      title={lang === "fr" ? "Mentions légales" : "Legal Notice"}
      description={
        lang === "fr"
          ? "Informations relatives à l'éditeur, l'hébergement et l'utilisation du site DBS Africa."
          : "Information about the publisher, hosting and use of the DBS Africa website."
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
