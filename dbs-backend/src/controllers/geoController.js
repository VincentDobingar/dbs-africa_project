// controllers/geoController.js

const DEFAULT_GEO_DATA = {
  country: "Burundi",
  countryCode: "BI",
  continent: "Africa",
  callingCode: "+257",
};

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^::1$/i,
  /^::ffff:127\./i,
  /^::ffff:10\./i,
  /^::ffff:192\.168\./i,
  /^f[cd][0-9a-f]{2}:/i,
];

const isPrivateIp = (ip) =>
  !ip ||
  PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(ip));

/**
 * Relais serveur vers ipapi.co : évite d'exposer ce service tiers
 * directement au navigateur de chaque visiteur et centralise le
 * fallback en cas d'indisponibilité ou de quota dépassé.
 */
const getClientLocation = async (req, res) => {
  const clientIp = req.ip;

  if (isPrivateIp(clientIp)) {
    return res.json({
      success: true,
      data: DEFAULT_GEO_DATA,
      fallback: true,
    });
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(
      `https://ipapi.co/${clientIp}/json/`,
      {
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Geo API error: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(
        data.reason || "Réponse géo invalide."
      );
    }

    return res.json({
      success: true,
      data: {
        country:
          data.country_name ||
          DEFAULT_GEO_DATA.country,

        countryCode: (
          data.country_code ||
          DEFAULT_GEO_DATA.countryCode
        ).toUpperCase(),

        continent:
          data.continent_code ||
          DEFAULT_GEO_DATA.continent,

        callingCode:
          data.country_calling_code ||
          DEFAULT_GEO_DATA.callingCode,
      },
    });
  } catch (error) {
    console.warn(
      "Géolocalisation indisponible :",
      error.message
    );

    return res.json({
      success: true,
      data: DEFAULT_GEO_DATA,
      fallback: true,
    });
  } finally {
    clearTimeout(timeoutId);
  }
};

module.exports = { getClientLocation };
