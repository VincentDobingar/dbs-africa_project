import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import dbsLogo from "../../assets/logo/dbs-logo.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Erreur de connexion");
      }

      localStorage.setItem("dbs_admin_token", data.token);
      localStorage.setItem("dbs_admin_user", JSON.stringify(data.user));

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dbsDark px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >

        <div className="mb-8 flex flex-col items-center">
        <img
            src={dbsLogo}
            alt="DBS Africa"
            className="mb-5 h-24 w-auto object-contain"
        />

            <h1 className="text-center text-3xl font-bold tracking-tight text-dbsDark">
            DBS Admin
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
            Digital Business Services Africa
            </p>

            <p className="mt-1 text-center text-gray-500">
            Connectez-vous à votre espace administrateur
            </p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-dbsOrange"
            required
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-700">
            Mot de passe
          </label>
            <div className="relative mt-2">
            <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-lg border px-4 py-3 pr-12 outline-none focus:border-dbsOrange"
                required
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dbsOrange"
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
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-dbsOrange px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}