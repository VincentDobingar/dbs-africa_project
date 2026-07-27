export default function NewsManager() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Actualités</h1>
          <p className="mt-1 text-gray-500">
            Gérez les articles et publications du site DBS Africa.
          </p>
        </div>

        <button className="rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white">
          Ajouter une actualité
        </button>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-gray-500">
          Le module Actualités sera connecté à l’API blog_posts.
        </p>
      </div>
    </div>
  );
}