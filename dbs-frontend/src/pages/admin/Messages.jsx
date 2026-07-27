import { useCallback, useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  X,
  Loader2,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  MapPin,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const STATUS_LABELS = {
  new: "Nouveau",
  unread: "Non lu",
  read: "Lu",
  archived: "Archivé",
};

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const token = localStorage.getItem(
    "dbs_admin_token"
  );

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        `${API_URL}/admin/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de charger les messages."
        );
      }

      setMessages(data.data || []);
    } catch (error) {
      console.error(
        "Erreur chargement des messages :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors du chargement."
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const updateStatus = async (id, status) => {
    try {
      setActionLoading(`status-${id}`);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/admin/messages/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de modifier le statut."
        );
      }

      setSuccessMessage(
        data.message ||
          "Statut mis à jour avec succès."
      );

      await loadMessages();

      if (selectedMessage?.id === id) {
        setSelectedMessage((previousMessage) => ({
          ...previousMessage,
          status,
        }));
      }
    } catch (error) {
      console.error(
        "Erreur mise à jour du statut :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Supprimer définitivement ce message ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(`delete-${id}`);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await fetch(
        `${API_URL}/admin/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Impossible de supprimer le message."
        );
      }

      setSuccessMessage(
        data.message ||
          "Message supprimé avec succès."
      );

      setSelectedMessage(null);

      await loadMessages();
    } catch (error) {
      console.error(
        "Erreur suppression du message :",
        error
      );

      setErrorMessage(
        error.message ||
          "Une erreur est survenue lors de la suppression."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  const openMessageDetails = async (message) => {
    setSelectedMessage(message);

    if (
      message.status === "new" ||
      message.status === "unread"
    ) {
      await updateStatus(message.id, "read");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Messages
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Consultez et gérez les messages reçus
            depuis le formulaire de contact.
          </p>
        </div>

        <button
          type="button"
          onClick={loadMessages}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />
          Actualiser
        </button>
      </div>

      {errorMessage && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-[1300px] w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Nom</th>
                <th className="p-4">Organisation</th>
                <th className="p-4">Email</th>
                <th className="p-4">Téléphone</th>
                <th className="p-4">Pays</th>
                <th className="p-4">Sujet</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td
                    colSpan="9"
                    className="p-10 text-center text-gray-500"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                      Chargement des messages...
                    </div>
                  </td>
                </tr>
              )}

              {!loading &&
                messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-t align-top transition hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold text-gray-900">
                      {msg.full_name || "-"}
                    </td>

                    <td className="p-4">
                      {msg.organization || "-"}
                    </td>

                    <td className="p-4">
                      {msg.email ? (
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {msg.email}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-4">
                      {msg.phone ? (
                        <a
                          href={`tel:${msg.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {msg.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-4">
                      {msg.country || "-"}
                    </td>

                    <td className="max-w-[240px] p-4">
                      <span className="line-clamp-2">
                        {msg.subject || "-"}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        value={msg.status || "new"}
                        onChange={(event) =>
                          updateStatus(
                            msg.id,
                            event.target.value
                          )
                        }
                        disabled={
                          actionLoading ===
                          `status-${msg.id}`
                        }
                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold outline-none focus:border-blue-500"
                      >
                        <option value="new">
                          Nouveau
                        </option>
                        <option value="unread">
                          Non lu
                        </option>
                        <option value="read">
                          Lu
                        </option>
                        <option value="archived">
                          Archivé
                        </option>
                      </select>
                    </td>

                    <td className="whitespace-nowrap p-4 text-gray-500">
                      {formatDate(msg.created_at)}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openMessageDetails(msg)
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                        >
                          <Eye size={15} />
                          Détails
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteMessage(msg.id)
                          }
                          disabled={
                            actionLoading ===
                            `delete-${msg.id}`
                          }
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {actionLoading ===
                          `delete-${msg.id}` ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2 size={15} />
                          )}
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && messages.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="p-10 text-center text-gray-500"
                  >
                    Aucun message trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMessage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Détails du message
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Message n° {selectedMessage.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage(null)
                }
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <DetailItem
                icon={<Mail size={17} />}
                label="Nom complet"
                value={selectedMessage.full_name}
              />

              <DetailItem
                icon={<Building2 size={17} />}
                label="Organisation"
                value={selectedMessage.organization}
              />

              <DetailItem
                icon={<Mail size={17} />}
                label="Email"
                value={selectedMessage.email}
              />

              <DetailItem
                icon={<Phone size={17} />}
                label="Téléphone"
                value={selectedMessage.phone}
              />

              <DetailItem
                icon={<MapPin size={17} />}
                label="Pays"
                value={selectedMessage.country}
              />

              <DetailItem
                label="Code pays"
                value={selectedMessage.country_code}
              />

              <DetailItem
                label="Sujet"
                value={selectedMessage.subject}
              />

              <DetailItem
                label="Statut"
                value={
                  STATUS_LABELS[
                    selectedMessage.status
                  ] ||
                  selectedMessage.status ||
                  "Nouveau"
                }
              />

              <DetailItem
                label="Date de réception"
                value={formatDate(
                  selectedMessage.created_at
                )}
              />

              <div className="md:col-span-2">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Message
                </p>

                <div className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm leading-7 text-gray-700">
                  {selectedMessage.message || "-"}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 px-6 py-5">
              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedMessage.id,
                    "read"
                  )
                }
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Marquer comme lu
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(
                    selectedMessage.id,
                    "archived"
                  )
                }
                className="rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Archiver
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteMessage(selectedMessage.id)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
        {icon}
        {label}
      </p>

      <div className="min-h-[48px] rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}