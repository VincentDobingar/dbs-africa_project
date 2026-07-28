/**
 * Middleware générique : valide req.body contre un schéma Zod.
 * En cas d'échec, renvoie 400 avec le détail des champs invalides.
 * En cas de succès, remplace req.body par la version "parsed"
 * (types coercés, champs inconnus retirés).
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      success: false,
      message: "Données invalides.",
      errors,
    });
  }

  req.body = result.data;
  next();
};

module.exports = validate;
