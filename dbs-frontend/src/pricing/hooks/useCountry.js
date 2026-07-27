// src/pricing/hooks/useCountry.js

import { useEffect, useState } from "react";

import {
  detectLocation,
  getCurrencyByCountry,
  getLanguageByCountry,
} from "../services/geo";

const DEFAULT_STATE = {
  loading: true,
  country: "Burundi",
  countryName: "Burundi",
  countryCode: "BI",
  currency: "FCFA",
  language: "fr",
  continent: "Africa",
  callingCode: "+257",
  error: null,
};

export default function useCountry() {
  const [location, setLocation] = useState(DEFAULT_STATE);

  useEffect(() => {
    let mounted = true;

    async function loadLocation() {
      try {
        const data = await detectLocation();

        if (!mounted) {
          return;
        }

        const countryCode =
          data?.countryCode ||
          DEFAULT_STATE.countryCode;

        const countryName =
          data?.country ||
          data?.countryName ||
          DEFAULT_STATE.country;

        setLocation({
          loading: false,

          country: countryName,
          countryName,

          countryCode,

          continent:
            data?.continent ||
            DEFAULT_STATE.continent,

          currency:
            data?.currency ||
            getCurrencyByCountry(countryCode),

          language:
            data?.language ||
            getLanguageByCountry(countryCode),

          callingCode:
            data?.callingCode ||
            DEFAULT_STATE.callingCode,

          error: null,
        });
      } catch (error) {
        console.warn(
          "Location detection failed:",
          error instanceof Error ? error.message : error
        );

        if (!mounted) {
          return;
        }

        setLocation({
          ...DEFAULT_STATE,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Location detection failed",
        });
      }
    }

    loadLocation();

    return () => {
      mounted = false;
    };
  }, []);

  return location;
}