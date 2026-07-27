import { useEffect, useState } from "react";
import {
  Mail,
  FileText,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  MessageCircle,
  ClipboardList,
  CircleCheck,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function StatBox({ title, value, icon: Icon, color, bg }) {
  return (
    <div className={`rounded-2xl border bg-white p-6 shadow-sm ${bg}`}>
      <div className="flex items-center gap-5">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full text-white ${color}`}>
          <Icon size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="mt-1 text-3xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600">
        <ArrowUpRight size={18} />
        <span>Activité récente</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [quotes, setQuotes] = useState([]);

  const token = localStorage.getItem("dbs_admin_token");

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    fetch(`${API_URL}/admin/dashboard`, { headers })
      .then((res) => res.json())
      .then((data) => setStats(data.data))
      .catch(console.error);

    fetch(`${API_URL}/admin/messages`, { headers })
      .then((res) => res.json())
      .then((data) => setMessages(data.data?.slice(0, 5) || []))
      .catch(console.error);

    fetch(`${API_URL}/admin/quotes`, { headers })
      .then((res) => res.json())
      .then((data) => setQuotes(data.data?.slice(0, 5) || []))
      .catch(console.error);
  }, []);

  const cards = [
    {
      title: "Messages reçus",
      value: stats?.contacts?.total || 0,
      icon: Mail,
      color: "bg-dbsOrange",
      bg: "border-orange-200",
    },
    {
      title: "Demandes de devis",
      value: stats?.quotes?.total || 0,
      icon: FileText,
      color: "bg-blue-600",
      bg: "border-blue-200",
    },
    {
      title: "Devis traités",
      value: stats?.quotes?.completed_items || 0,
      icon: CheckCircle,
      color: "bg-green-600",
      bg: "border-green-200",
    },
    {
      title: "Activités totales",
      value:
        Number(stats?.contacts?.total || 0) + Number(stats?.quotes?.total || 0),
      icon: TrendingUp,
      color: "bg-purple-600",
      bg: "border-purple-200",
    },
  ];

  const recentActivities = [
    ...messages.slice(0, 2).map((msg) => ({
      icon: MessageCircle,
      color: "bg-orange-100 text-dbsOrange",
      text: `Nouveau message de ${msg.full_name || "un visiteur"}`,
      time: "Récemment",
    })),
    ...quotes.slice(0, 2).map((quote) => ({
      icon: quote.status === "completed" ? CircleCheck : ClipboardList,
      color:
        quote.status === "completed"
          ? "bg-green-100 text-green-600"
          : "bg-blue-100 text-blue-600",
      text: `Demande de devis de ${
        quote.company_name || quote.contact_name || "un client"
      }`,
      time: "Récemment",
    })),
  ];

  const quoteDistribution = [
    { label: "Site Web", value: 42, dot: "bg-dbsOrange" },
    { label: "Application Web", value: 25, dot: "bg-blue-600" },
    { label: "Application Mobile", value: 18, dot: "bg-green-600" },
    { label: "Marketing Digital", value: 10, dot: "bg-purple-600" },
    { label: "Autres", value: 5, dot: "bg-gray-300" },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, Admin DBS 👋
          </h1>
          <p className="mt-1 text-gray-500">
            Voici un aperçu de l'activité de votre plateforme.
          </p>
        </div>

        <select className="rounded-xl border bg-white px-4 py-3 text-sm text-gray-600">
          <option>Période : 7 derniers jours</option>
          <option>Période : 30 derniers jours</option>
          <option>Période : Cette année</option>
        </select>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatBox key={card.title} {...card} />
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="font-bold text-gray-900">Derniers messages</h2>
            <a href="/admin/messages" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
              Voir tous
            </a>
          </div>

          <div className="divide-y">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-center gap-4 p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-700">
                  {msg.full_name?.charAt(0) || "M"}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{msg.full_name}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>

                <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  msg.status === "new"
                    ? "bg-orange-50 text-dbsOrange"
                    : "bg-green-50 text-green-600"
                }`}>
                  {msg.status === "new" ? "Nouveau" : msg.status}
                </span>
              </div>
            ))}

            {messages.length === 0 && (
              <p className="p-6 text-center text-gray-500">Aucun message récent.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="font-bold text-gray-900">Derniers devis</h2>
            <a href="/admin/quotes" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
              Voir tous
            </a>
          </div>

          <div className="divide-y">
            {quotes.map((quote) => (
              <div key={quote.id} className="grid grid-cols-4 gap-4 p-5 text-sm">
                <div className="font-bold text-gray-900">
                  #DEV-{String(quote.id).padStart(4, "0")}
                </div>
                <div className="text-gray-600">{quote.company_name || quote.contact_name}</div>
                <div className="text-gray-600">{quote.service || "-"}</div>
                <span className={`rounded-lg px-3 py-1 text-center text-xs font-semibold ${
                  quote.status === "new"
                    ? "bg-orange-50 text-dbsOrange"
                    : quote.status === "completed"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}>
                  {quote.status}
                </span>
              </div>
            ))}

            {quotes.length === 0 && (
              <p className="p-6 text-center text-gray-500">Aucun devis récent.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-bold text-gray-900">Activité récente</h2>

          <div className="space-y-5">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.color}`}>
                      <Icon size={16} />
                    </div>

                    <p className="flex-1 text-sm text-gray-700">{activity.text}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Aucune activité récente.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 font-bold text-gray-900">
            Répartition des demandes de devis
          </h2>

          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="relative h-44 w-44 rounded-full bg-[conic-gradient(#ff6600_0_42%,#2563eb_42%_67%,#16a34a_67%_85%,#7c3aed_85%_95%,#d1d5db_95%_100%)]">
              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
            </div>

            <div className="flex-1 space-y-4">
              {quoteDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <span className={`h-3 w-3 rounded-sm ${item.dot}`}></span>
                    <span className="text-gray-600">{item.label}</span>
                  </div>

                  <span className="font-bold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}