const db = require("./config/db");

/**
 * Inspecte les tables et les vues relatives :
 * - aux commissions ;
 * - aux performances des partenaires.
 */
const inspectPartnerSchema = async () => {
  try {
    console.log(
      "Inspection du schéma partenaires..."
    );

    const [databaseRows] = await db.query(`
      SELECT DATABASE() AS database_name
    `);

    const databaseName =
      databaseRows[0]?.database_name;

    console.log(
      `Base de données : ${databaseName}`
    );

    const [objects] = await db.query(`
      SELECT
        TABLE_NAME,
        TABLE_TYPE
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = DATABASE()
        AND (
          TABLE_NAME LIKE '%commission%'
          OR TABLE_NAME LIKE '%performance%'
        )
      ORDER BY
        TABLE_TYPE,
        TABLE_NAME
    `);

    console.log(
      `Objets trouvés : ${objects.length}`
    );

    if (objects.length === 0) {
      console.log(
        "Aucune table ou vue de commission/performance trouvée."
      );

      return;
    }

    console.table(objects);

    for (const object of objects) {
      const tableName =
        object.TABLE_NAME;

      const tableType =
        object.TABLE_TYPE;

      console.log("");
      console.log(
        `========================================`
      );

      console.log(
        `${tableType} : ${tableName}`
      );

      console.log(
        `========================================`
      );

      const [columns] = await db.query(
        `
          SELECT
            ORDINAL_POSITION,
            COLUMN_NAME,
            COLUMN_TYPE,
            IS_NULLABLE,
            COLUMN_DEFAULT,
            COLUMN_KEY,
            EXTRA
          FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = ?
          ORDER BY ORDINAL_POSITION
        `,
        [tableName]
      );

      console.log(
        `Colonnes de ${tableName} :`
      );

      console.table(columns);

      const [indexes] = await db.query(
        `
          SELECT
            INDEX_NAME,
            NON_UNIQUE,
            SEQ_IN_INDEX,
            COLUMN_NAME
          FROM information_schema.STATISTICS
          WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = ?
          ORDER BY
            INDEX_NAME,
            SEQ_IN_INDEX
        `,
        [tableName]
      );

      if (indexes.length > 0) {
        console.log(
          `Index de ${tableName} :`
        );

        console.table(indexes);
      } else {
        console.log(
          `Aucun index trouvé pour ${tableName}.`
        );
      }

      if (tableType === "VIEW") {
        const [viewRows] = await db.query(
          `
            SELECT
              VIEW_DEFINITION
            FROM information_schema.VIEWS
            WHERE TABLE_SCHEMA = DATABASE()
              AND TABLE_NAME = ?
            LIMIT 1
          `,
          [tableName]
        );

        console.log(
          `Définition de la vue ${tableName} :`
        );

        console.log(
          viewRows[0]?.VIEW_DEFINITION ||
            "Définition indisponible."
        );
      }
    }

    console.log("");
    console.log(
      "Inspection terminée avec succès."
    );
  } catch (error) {
    console.error(
      "Erreur pendant l'inspection du schéma :",
      error
    );

    process.exitCode = 1;
  } finally {
    try {
      await db.end();
    } catch (closeError) {
      console.error(
        "Erreur pendant la fermeture du pool MySQL :",
        closeError.message
      );
    }
  }
};

inspectPartnerSchema();