export default function SettingsManager() {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="mt-1 text-gray-500">
          Configurez les informations générales du site.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Informations entreprise
          </h2>

          <div className="mt-5 space-y-4">
            <input
              placeholder="Nom de l’entreprise"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="Email"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="Téléphone"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="Adresse"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />

            <button className="rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white">
              Enregistrer
            </button>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">Réseaux sociaux</h2>

          <div className="mt-5 space-y-4">
            <input
              placeholder="LinkedIn"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="Facebook"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="Instagram"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />
            <input
              placeholder="WhatsApp"
              className="w-full rounded-xl border px-4 py-3 outline-none focus:border-dbsOrange"
            />

            <button className="rounded-xl bg-dbsOrange px-5 py-3 font-semibold text-white">
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}