import {
  useMemo,
  useState,
} from "react";

import {
  CheckCircle,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import partnerApi from "../api/partnerApi";

import dbsLogo from "../../../assets/logo/dbs-logo1.png";

const passwordRules = [
  {
    label: "Au moins 8 caractères",
    validate: (password) =>
      password.length >= 8,
  },
  {
    label: "Une lettre majuscule",
    validate: (password) =>
      /[A-Z]/.test(password),
  },
  {
    label: "Une lettre minuscule",
    validate: (password) =>
      /[a-z]/.test(password),
  },
  {
    label: "Un chiffre",
    validate: (password) =>
      /\d/.test(password),
  },
];

export default function PartnerActivate() {
  const [searchParams] =
    useSearchParams();

  const token =
    searchParams.get("token") || "";

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(null);

  const rulesValidation = useMemo(
    () =>
      passwordRules.map((rule) => ({
        ...rule,
        valid: rule.validate(
          form.password
        ),
      })),
    [form.password]
  );

  const passwordIsStrong =
    rulesValidation.every(
      (rule) => rule.valid
    );

  const passwordsMatch =
    form.password &&
    form.password ===
      form.password_confirmation;

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

    if (!token) {
      setError(
        "Le lien d’activation ne contient aucun jeton."
      );

      return;
    }

    if (!passwordIsStrong) {
      setError(
        "Le mot de passe ne respecte pas les critères de sécurité."
      );

      return;
    }

    if (!passwordsMatch) {
      setError(
        "Les deux mots de passe ne correspondent pas."
      );

      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await partnerApi.post(
        "/partners/auth/activate",
        {
          token,
          password: form.password,
          password_confirmation:
            form.password_confirmation,
        }
      );

      setSuccess({
        message:
          response.data.message,
        partner:
          response.data.data,
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Impossible d’activer le compte partenaire."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-10">
        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle size={42} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Compte activé
          </h1>

          <p className="mt-4 text-slate-600">
            {success.message}
          </p>

          {success.partner && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">
              <p className="text-sm text-slate-500">
                Partenaire
              </p>

              <p className="font-semibold text-slate-900">
                {success.partner.full_name}
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Code partenaire
              </p>

              <p className="font-semibold text-slate-900">
                {success.partner.partner_code}
              </p>
            </div>
          )}

          <Link
            to="/partner/login"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-10">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl">
        <header className="bg-[#031b2b] px-7 py-8 text-white sm:px-10">
          <img
            src={dbsLogo}
            alt="DBS Africa"
            className="h-16 w-auto object-contain object-left"
          />

          <div className="mt-7 flex items-center gap-3">
            <KeyRound
              size={30}
              className="text-orange-400"
            />

            <h1 className="text-2xl font-bold">
              Activer mon compte
            </h1>
          </div>

          <p className="mt-3 text-slate-300">
            Définissez le mot de passe de votre
            espace partenaire DBS Africa.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-7 sm:p-10"
        >
          {!token && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
              Le lien d’activation est incomplet.
              Demandez un nouveau lien à DBS Africa.
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Nouveau mot de passe
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
                autoComplete="new-password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
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

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {rulesValidation.map(
                (rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-2 text-sm ${
                      rule.valid
                        ? "text-emerald-600"
                        : "text-slate-500"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        rule.valid
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    />

                    {rule.label}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password_confirmation"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Confirmer le mot de passe
            </label>

            <input
              id="password_confirmation"
              name="password_confirmation"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={
                form.password_confirmation
              }
              onChange={handleChange}
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            {form.password_confirmation && (
              <p
                className={`mt-2 text-sm ${
                  passwordsMatch
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {passwordsMatch
                  ? "Les mots de passe correspondent."
                  : "Les mots de passe ne correspondent pas."}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              loading ||
              !token ||
              !passwordIsStrong ||
              !passwordsMatch
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && (
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
            )}

            {loading
              ? "Activation..."
              : "Activer mon compte"}
          </button>

          <div className="text-center">
            <Link
              to="/partner/login"
              className="text-sm font-semibold text-slate-500 hover:text-orange-600"
            >
              Retour à la connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}