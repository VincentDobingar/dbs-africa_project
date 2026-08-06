import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ActualitesManager() {
  const token = localStorage.getItem("dbs_admin_token");

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    author: "DBS Africa",
    status: "draft",
    image: null,
  });

  const fetchPosts = async () => {
    const res = await fetch(`${API_URL}/blog-posts`);
    const data = await res.json();
    setPosts(data.data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
      return;
    }

    if (name === "title") {
      setForm({
        ...form,
        title: value,
        slug: generateSlug(value),
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setEditingPost(null);
    setForm({
      title: "",
      slug: "",
      summary: "",
      content: "",
      author: "DBS Africa",
      status: "draft",
      image: null,
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || "",
      slug: post.slug || "",
      summary: post.summary || "",
      content: post.content || "",
      author: post.author || "DBS Africa",
      status: post.status || "draft",
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

    const url = editingPost
      ? `${API_URL}/blog-posts/${editingPost.id}`
      : `${API_URL}/blog-posts`;

    const method = editingPost ? "PUT" : "POST";

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
      fetchPosts();
    } else {
      alert("Erreur lors de l'enregistrement.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cette actualité ?")) return;

    const res = await fetch(`${API_URL}/blog-posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) fetchPosts();
    else alert("Erreur lors de la suppression.");
  };

  const getImage = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${API_URL.replace("/api", "")}${imageUrl}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Gestion des actualités
        </h1>
        <p className="text-slate-500">
          Ajouter, modifier et publier les articles du site DBS Africa.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editingPost ? "Modifier l'actualité" : "Ajouter une actualité"}
        </h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre"
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

        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Résumé court"
          className="w-full border rounded-xl px-4 py-3"
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Contenu complet"
          rows="6"
          className="w-full border rounded-xl px-4 py-3"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Auteur"
            className="border rounded-xl px-4 py-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800"
          >
            {loading
              ? "Enregistrement..."
              : editingPost
              ? "Mettre à jour"
              : "Publier"}
          </button>

          {editingPost && (
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
              <th className="p-4">Titre</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Auteur</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="p-4">
                  {post.image_url ? (
                    <img
                      src={getImage(post.image_url)}
                      alt={post.title}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-slate-400">Aucune image</span>
                  )}
                </td>

                <td className="p-4 font-medium">{post.title}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status === "published" ? "Publié" : "Brouillon"}
                  </span>
                </td>

                <td className="p-4">{post.author}</td>

                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-slate-100 rounded-lg"
                  >
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-500">
                  Aucune actualité enregistrée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}