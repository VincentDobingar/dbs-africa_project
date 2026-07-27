import {
  ShieldCheck,
  FileCheck2,
  Lock,
  ScanEye,
  Cloud,
} from "lucide-react";

export const standardsFrameworks = [
  {
    id: "iso27001",
    icon: ShieldCheck,
    name: "ISO 27001",
    descKey: "certificationsPage.items.iso27001",
  },
  {
    id: "nist",
    icon: FileCheck2,
    name: "NIST Cybersecurity Framework",
    descKey: "certificationsPage.items.nist",
  },
  {
    id: "cis",
    icon: ScanEye,
    name: "CIS Controls",
    descKey: "certificationsPage.items.cis",
  },
  {
    id: "gdpr",
    icon: Lock,
    name: "GDPR / RGPD",
    descKey: "certificationsPage.items.gdpr",
  },
  {
    id: "zeroTrust",
    icon: ShieldCheck,
    name: "Zero Trust Architecture",
    descKey: "certificationsPage.items.zeroTrust",
  },
];

export const cloudPlatforms = [
  { id: "azure", icon: Cloud, name: "Microsoft Azure" },
  { id: "aws", icon: Cloud, name: "AWS" },
  { id: "gcp", icon: Cloud, name: "Google Cloud" },
];
