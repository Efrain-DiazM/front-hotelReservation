import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Plus, Star } from "lucide-react";
import { fetchHotelsApi, deleteHotelApi } from '../api/index';
import HotelCreateModal from '../components/Hotels/HotelCreateModal';
import HotelEditModal from '../components/Hotels/HotelEditModal';

const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editHotel, setEditHotel] = useState(null);

  const fetchHotels = async () => {
    try {
      const data = await fetchHotelsApi();
      setHotels(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este hotel?")) {
      await deleteHotelApi(id);
      fetchHotels();
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-8">
      <HotelCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onHotelAdded={fetchHotels}
      />
      <HotelEditModal
        open={!!editHotel}
        hotel={editHotel}
        onClose={() => setEditHotel(null)}
        onHotelUpdated={fetchHotels}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Hoteles</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Nuevo Hotel
        </button>
      </div>

      <div className="bg-white rounded shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Listado de Hoteles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Dirección</th>
                <th className="px-4 py-2 text-left">Ciudad</th>
                <th className="px-4 py-2 text-left">País</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Estrellas</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2 font-medium">{hotel.nombre}</td>
                  <td className="px-4 py-2">{hotel.direccion}</td>
                  <td className="px-4 py-2">{hotel.ciudad}</td>
                  <td className="px-4 py-2">{hotel.pais}</td>
                  <td className="px-4 py-2">{hotel.telefono}</td>
                  <td className="px-4 py-2">{hotel.email_contacto}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      {[...Array(hotel.categoria_estrellas)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2">{hotel.descripcion_general}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <Link to={`/hoteles/${hotel.id}`}>
                      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs">
                        Ver
                      </button>
                    </Link>
                    <button
                      className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs"
                      onClick={() => setEditHotel(hotel)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-xs"
                      onClick={() => handleDelete(hotel.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {hotels.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No hay hoteles registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;