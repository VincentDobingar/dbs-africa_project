import {
  useEffect,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LoaderCircle,
  LogIn,
} from "lucide-react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import partnerApi from "../api/partnerApi";

import dbsLogo from "../../../assets/logo/dbs-logo1.png";

export default function PartnerLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const token = localStorage.getItem(
      "dbs_partner_token"
    );

    if (token) {
      navigate(
        "/partner/dashboard",
        { replace: true }
      );
    }
  }, [navigate]);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.identifier.trim() ||
      !form.password
    ) {
      setError(
        "L’identifiant et le mot de passe sont obligatoires."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await partnerApi.post(
        "/partners/auth/login",
        {
          identifier:
            form.identifier.trim(),
          password: form.password,
        }
      );

      const {
        token,
        partner,
      } = response.data;

      localStorage.setItem(
        "dbs_partner_token",
        token
      );

      localStorage.setItem(
        "dbs_partner_user",
        JSON.stringify(partner)
      );

      const destination =
        location.state?.from ||
        "/partner/dashboard";

      navigate(destination, {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Connexion impossible. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-10">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">
        <section className="hidden bg-[#031b2b] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <img
            src={dbsLogo}
            alt="DBS Africa"
            className="h-20 w-auto object-contain object-left"
          />

          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
              Programme partenaires
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Développons ensemble les entreprises africaines.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
              Gérez vos prospects, suivez leur conversion
              et consultez vos commissions depuis un espace
              commercial sécurisé.
            </p>
          </div>

          <p className="text-sm text-slate-400">
            Digital Business Services Africa
          </p>
        </section>

        <section className="flex items-center p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <img
                src={dbsLogo}
                alt="DBS Africa"
                className="h-16 w-auto"
              />
            </div>

            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Espace partenaire
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Connexion
            </h2>

            <p className="mt-3 text-slate-500">
              Utilisez votre e-mail ou votre code partenaire.
            </p>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  E-mail ou code partenaire
                </label>

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={form.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                  placeholder="DBS-PAR-2026-XXXXXXXX"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mot de passe
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Votre mot de passe"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    aria-label={
                      showPassword
                        ? "Masquer le mot de passe"
                        : "Afficher le mot de passe"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3.5 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  <LogIn size={20} />
                )}

                {loading
                  ? "Connexion..."
                  : "Se connecter"}
              </button>
            </form>

            <div className="mt-8 border-t pt-6 text-center text-sm text-slate-500">
              Pas encore partenaire ?{" "}
              <Link
                to="/partner/register"
                className="font-semibold text-orange-600 hover:text-orange-700"
              >
                Déposer une demande
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-sm text-slate-500 hover:text-slate-800"
              >
                Retour au site DBS Africa
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}