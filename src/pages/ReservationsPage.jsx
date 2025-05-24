import React, { useEffect, useState } from 'react';
import ReservationsList from '../components/Reservations/ReservationsList';
import ReservationCreateModal from '../components/Reservations/ReservationCreateModal';
import { fetchReservations } from '../api';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getReservations = async () => {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-8">
      <ReservationCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onReservationAdded={getReservations}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reservaciones</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Nueva Reserva
        </button>
      </div>
      <ReservationsList reservations={reservations} />
    </div>
  );
};

export default ReservationsPage;