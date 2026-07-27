import { useEffect, useState } from "react";
import { Plus, Trash2, Shield, KeyRound, UserPlus } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function UsersManager() {
  const token = localStorage.getItem("dbs_admin_token");

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur de chargement");
      }

      setUsers(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur lors de la création");
      }

      setSuccess("Utilisateur créé avec succès.");
      setForm({
        full_name: "",
        email: "",
        password: "",
        role: "admin",
      });

      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateRole = async (id, role) => {
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur de mise à jour");
      }

      setSuccess("Rôle mis à jour.");
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetPassword = async (id) => {
    const password = prompt("Nouveau mot de passe :");

    if (!password) return;

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/admin/users/${id}/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur mot de passe");
      }

      setSuccess("Mot de passe mis à jour.");
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Voulez-vous supprimer cet utilisateur ?")) return;

    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Erreur suppression utilisateur");
      }

      setSuccess("Utilisateur supprimé.");
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="mt-1 text-gray-500">
            Gérez les administrateurs de la plateforme DBS Africa.
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-600">
          {success}
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <form
          onSubmit={createUser}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-dbsOrange text-white">
              <UserPlus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Nouvel utilisateur
              </h2>
              <p className="text-sm text-gray-500">
                Ajouter un administrateur
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Nom complet"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
              required
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
              required
            />

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
              <Plus size={20} />
              Créer utilisateur
            </button>
          </div>
        </form>

        <div className="xl:col-span-2 overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-b p-5">
            <h2 className="text-xl font-bold text-gray-900">
              Liste des utilisateurs
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4">Nom</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Rôle</th>
                  <th className="p-4">Créé le</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-4 font-semibold text-gray-900">
                      {user.full_name}
                    </td>

                    <td className="p-4 text-gray-600">{user.email}</td>

                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        className="rounded-lg border px-3 py-2 text-sm outline-none"
                      >
                        <option value="admin">Admin</option>
                        <option value="superadmin">Superadmin</option>
                      </select>
                    </td>

                    <td className="p-4 text-gray-600">
                      {new Date(user.created_at).toLocaleDateString("fr-FR")}
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => resetPassword(user.id)}
                          className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
                        >
                          <KeyRound size={15} />
                          MDP
                        </button>

                        <button
                          onClick={() => updateRole(user.id, "superadmin")}
                          className="flex items-center gap-1 rounded-lg bg-gray-700 px-3 py-2 text-xs font-semibold text-white"
                        >
                          <Shield size={15} />
                          Super
                        </button>

                        <button
                            onClick={() => deleteUser(user.id)}
                            disabled={
                                Number(user.id) ===
                                Number(
                                JSON.parse(localStorage.getItem("dbs_admin_user"))?.id
                                )
                            }
                            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            <Trash2 size={15} />
                            Suppr.
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}