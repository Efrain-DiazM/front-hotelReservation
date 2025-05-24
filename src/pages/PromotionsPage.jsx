import React, { useEffect, useState } from 'react';
import { Plus, Percent, CalendarCheck } from "lucide-react";
import PromotionCreateModal from '../components/Promotions/PromotionCreateModal';
import { fetchPromotionsApi } from '../api/index';
import { Link } from "react-router-dom";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchPromotions = async () => {
    try {
      const data = await fetchPromotionsApi();
      setPromotions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  const totalActivas = promotions.filter(p => p.activa).length;

  return (
    <div className="space-y-6 p-8">
      <PromotionCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPromotionAdded={fetchPromotions}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Promociones</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Nueva Promoción
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Promociones</span>
            <Percent className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{promotions.length}</div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Promociones Activas</span>
            <CalendarCheck className="h-5 w-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold">{totalActivas}</div>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Listado de Promociones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Código</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-left">% Descuento</th>
                <th className="px-4 py-2 text-left">Descuento Fijo</th>
                <th className="px-4 py-2 text-left">Inicio</th>
                <th className="px-4 py-2 text-left">Fin</th>
                <th className="px-4 py-2 text-left">Activa</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promo) => (
                <tr key={promo.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2 font-medium">{promo.codigo_promo}</td>
                  <td className="px-4 py-2">{promo.descripcion}</td>
                  <td className="px-4 py-2">{promo.descuento_porcentaje}%</td>
                  <td className="px-4 py-2">${promo.descuento_fijo}</td>
                  <td className="px-4 py-2">{promo.fecha_inicio}</td>
                  <td className="px-4 py-2">{promo.fecha_fin}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${promo.activa ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                      {promo.activa ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <Link to={`/promociones/${promo.id}`}>
                      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs">
                        Ver
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {promotions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No hay promociones registradas.
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

export default PromotionsPage;