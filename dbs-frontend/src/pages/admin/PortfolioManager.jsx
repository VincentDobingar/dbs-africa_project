import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function PortfolioManager() {
  const token = localStorage.getItem("dbs_admin_token");

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    client: "",
    category: "",
    description: "",
    technologies: "",
    project_url: "",
    featured: false,
    image: null,
  });

  const fetchProjects = async () => {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    setProjects(data.data || []);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      return;
    }

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
      return;
    }

    if (name === "title") {
      setForm({ ...form, title: value, slug: generateSlug(value) });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setEditingProject(null);
    setForm({
      title: "",
      slug: "",
      client: "",
      category: "",
      description: "",
      technologies: "",
      project_url: "",
      featured: false,
      image: null,
    });
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      slug: project.slug || "",
      client: project.client || "",
      category: project.category || "",
      description: project.description || "",
      technologies: project.technologies || "",
      project_url: project.project_url || "",
      featured: Boolean(project.featured),
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    const url = editingProject
      ? `${API_URL}/projects/${editingProject.id}`
      : `${API_URL}/projects`;

    const method = editingProject ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      resetForm();
      fetchProjects();
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce projet ?")) return;

    const res = await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) fetchProjects();
    else alert("Erreur lors de la suppression.");
  };

  const getImage = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${API_URL.replace(/\/api$/, "")}${imageUrl}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Gestion du portfolio
        </h1>
        <p className="text-slate-500">
          Ajouter, modifier et publier les projets réalisés par DBS Africa.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editingProject ? "Modifier le projet" : "Ajouter un projet"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre du projet"
          required
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="w-full border rounded-xl px-4 py-3"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="client"
            value={form.client}
            onChange={handleChange}
            placeholder="Client"
            className="border rounded-xl px-4 py-3"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Catégorie"
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description du projet"
          rows="5"
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="technologies"
          value={form.technologies}
          onChange={handleChange}
          placeholder="Technologies : React, Node.js, MySQL..."
          className="w-full border rounded-xl px-4 py-3"
        />

        <input
          name="project_url"
          value={form.project_url}
          onChange={handleChange}
          placeholder="Lien du projet"
          className="w-full border rounded-xl px-4 py-3"
        />

        <div className="grid md:grid-cols-2 gap-4 items-center">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <label className="flex items-center gap-3 text-slate-700">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-5 h-5"
            />
            Projet vedette
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            {loading
              ? "Enregistrement..."
              : editingProject
              ? "Mettre à jour"
              : "Enregistrer"}
          </button>

          {editingProject && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Projet</th>
              <th className="p-4">Client</th>
              <th className="p-4">Catégorie</th>
              <th className="p-4">Vedette</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t">
                <td className="p-4">
                  {project.image_url ? (
                    <img
                      src={getImage(project.image_url)}
                      alt={project.title}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-slate-400">Aucune image</span>
                  )}
                </td>

                <td className="p-4 font-medium">{project.title}</td>
                <td className="p-4">{project.client}</td>
                <td className="p-4">{project.category}</td>

                <td className="p-4">
                  {project.featured ? (
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      Oui
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-500">
                      Non
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="px-4 py-2 bg-slate-100 rounded-lg"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(project.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-500">
                  Aucun projet enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}