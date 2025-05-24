import React, { useEffect, useState } from 'react';
import ClientsList from '../components/clients/ClientsList';
import ClientCreateModal from '../components/Clients/ClientCreateModal';
import ClientEditModal from '../components/Clients/ClientEditModal';
import { fetchClientsApi, deleteClientApi } from '../api';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        const data = await fetchClientsApi();
        setClients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getClients();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
      await deleteClientApi(id);
      setLoading(true);
      fetchClientsApi().then(setClients).finally(() => setLoading(false));
    }
  };

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-8">
      <ClientCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onClientAdded={() => {
          setLoading(true);
          fetchClientsApi().then(setClients).finally(() => setLoading(false));
        }}
      />
      <ClientEditModal
        open={!!editClient}
        client={editClient}
        onClose={() => setEditClient(null)}
        onClientUpdated={() => {
          setLoading(true);
          fetchClientsApi().then(setClients).finally(() => setLoading(false));
        }}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Nuevo Cliente
        </button>
      </div>
      <ClientsList clients={clients} onEdit={setEditClient} onDelete={handleDelete} />
    </div>
  );
};

export default ClientsPage;