const { z } = require("zod");

const contactSchema = z.object({
  full_name: z
    .string({ error: "Le nom complet est obligatoire." })
    .trim()
    .min(2, "Le nom complet est trop court.")
    .max(150, "Le nom complet est trop long."),
  organization: z.string().trim().max(150).optional().nullable(),
  email: z
    .string({ error: "L'email est obligatoire." })
    .trim()
    .email("Adresse email invalide.")
    .max(150),
  country: z.string().trim().max(150).optional().nullable(),
  country_code: z.string().trim().max(10).optional().nullable(),
  phone: z.string().trim().max(50).optional().nullable(),
  subject: z.string().trim().max(255).optional().nullable(),
  message: z
    .string({ error: "Le message est obligatoire." })
    .trim()
    .min(5, "Le message est trop court.")
    .max(5000, "Le message est trop long."),
});

const quoteSchema = z
  .object({
    client_type: z.enum(["individual", "organization"], {
      error: "Le type de client est obligatoire.",
    }),
    company_name: z.string().trim().max(255).optional().nullable(),
    contact_name: z.string().trim().max(255).optional().nullable(),
    email: z
      .string({ error: "L'email est obligatoire." })
      .trim()
      .email("Adresse email invalide.")
      .max(255),
    country: z.string().trim().max(150).optional().nullable(),
    phone: z.string().trim().max(50).optional().nullable(),
    sector: z.string().trim().max(150).optional().nullable(),
    services: z
      .union([z.array(z.string().max(150)), z.string().max(500)])
      .optional()
      .nullable(),
    currency: z.enum(["FCFA", "EUR", "USD"]).optional().nullable(),
    budget: z.string().trim().max(100).optional().nullable(),
    timeline: z.string().trim().max(100).optional().nullable(),
    description: z
      .string({ error: "La description est obligatoire." })
      .trim()
      .min(5, "La description est trop courte.")
      .max(5000, "La description est trop longue."),
  })
  .refine((data) => data.client_type !== "individual" || !!data.contact_name, {
    message: "Le nom complet est obligatoire pour un particulier.",
    path: ["contact_name"],
  })
  .refine(
    (data) => data.client_type !== "organization" || !!data.company_name,
    {
      message: "Le nom de l'organisation est obligatoire.",
      path: ["company_name"],
    }
  );

const adminLoginSchema = z.object({
  email: z
    .string({ error: "L'email est obligatoire." })
    .trim()
    .email("Adresse email invalide.")
    .max(150),
  password: z
    .string({ error: "Le mot de passe est obligatoire." })
    .min(1, "Le mot de passe est obligatoire.")
    .max(200),
});

const partnerLoginSchema = z.object({
  identifier: z
    .string({ error: "L'identifiant est obligatoire." })
    .trim()
    .min(1, "L'identifiant est obligatoire.")
    .max(255),
  password: z
    .string({ error: "Le mot de passe est obligatoire." })
    .min(1, "Le mot de passe est obligatoire.")
    .max(200),
});

module.exports = {
  contactSchema,
  quoteSchema,
  adminLoginSchema,
  partnerLoginSchema,
};
