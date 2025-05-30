import React, { useEffect, useState } from "react";
import {
  fetchHotelsApi,
  fetchAvailableRoomsWifiApi,
  fetchHotelsAverageScoreApi,
  fetchNeverReservedRoomsApi,
  fetchHotelsIncomeLastMonthApi,
  fetchActivePromotionsWithUsageApi,
  fetchCurrentRoomStatusApi
} from "../api";
import { Calendar } from "lucide-react";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelsScore, setHotelsScore] = useState([]);
  const [neverReservedRooms, setNeverReservedRooms] = useState([]);
  const [hotelsIncome, setHotelsIncome] = useState([]);
  const [activePromotions, setActivePromotions] = useState([]);
  const [currentRoomStatus, setCurrentRoomStatus] = useState([]);
  const [form, setForm] = useState({
    hotel: "",
    fecha_checkin: "",
    fecha_checkout: "",
    capacidad_minima: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHotelsApi().then(setHotels);
    fetchHotelsAverageScoreApi().then(setHotelsScore);
    fetchNeverReservedRoomsApi().then(setNeverReservedRooms);
    fetchHotelsIncomeLastMonthApi().then(setHotelsIncome);
    fetchActivePromotionsWithUsageApi().then(setActivePromotions);
    fetchCurrentRoomStatusApi().then(setCurrentRoomStatus);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAvailableRooms([]);
    try {
      const data = await fetchAvailableRoomsWifiApi({
        hotel: form.hotel,
        fecha_checkin: form.fecha_checkin,
        fecha_checkout: form.fecha_checkout,
        capacidad_minima: form.capacidad_minima,
      });
      console.log('data consulta', data);
      setAvailableRooms(data);
    } catch (err) {
      setError("Error al consultar disponibilidad");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6 p-8">
      {/* --- */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Puntuación media por hotel</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Hotel</th>
              <th className="px-4 py-2 text-left">Puntuación media</th>
            </tr>
          </thead>
          <tbody>
            {hotelsScore.length > 0 ? (
              hotelsScore.map((h) => (
                <tr key={h.hotel_id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{h.NombreHotel}</td>
                  <td className="px-4 py-2">{h.PuntuacionMedia ? Number(h.PuntuacionMedia).toFixed(2) : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-8 text-center text-gray-400">
                  No hay datos de puntuación.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ----- */}
      <div className="bg-white rounded shadow mt-6">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Habitaciones Nunca Reservadas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Número habitación</th>
                <th className="px-4 py-2 text-left">Hotel</th>
                <th className="px-4 py-2 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {neverReservedRooms.length > 0 ? (
                neverReservedRooms.map((room) => (
                  <tr key={room.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2">{room.numero_habitacion}</td>
                    <td className="px-4 py-2">{room.nombre_hotel || "-"}</td>
                    <td className="px-4 py-2">$ {room.precio_por_noche}/noche</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                    No hay habitaciones nunca reservadas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ----- */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Ingresos por hotel (último mes)</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Hotel</th>
              <th className="px-4 py-2 text-left">Total Facturado</th>
              <th className="px-4 py-2 text-left">Total Pagado</th>
            </tr>
          </thead>
          <tbody>
            {hotelsIncome.length > 0 ? (
              hotelsIncome.map((h) => (
                <tr key={h.hotel_id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{h.NombreHotel}</td>
                  <td className="px-4 py-2">$ {h.total_facturado?.toLocaleString() || "0"}</td>
                  <td className="px-4 py-2">$ {h.total_pagado?.toLocaleString() || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                  No hay datos de ingresos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ----- */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Promociones Activas y Veces Usadas</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Promoción</th>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Descuento (%)</th>
              <th className="px-4 py-2 text-left">Veces Usada</th>
            </tr>
          </thead>
          <tbody>
            {activePromotions.length > 0 ? (
              activePromotions.map((promo) => (
                <tr key={promo.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{promo.descripcion || "-"}</td>
                  <td className="px-4 py-2">{promo.codigo_promo || "-"}</td>
                  <td className="px-4 py-2">{promo.descuento_porcentaje || "0"}</td>
                  <td className="px-4 py-2">{promo.veces_usada || "0"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                  No hay promociones activas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ----- */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Ocupación Actual por Hotel</h2>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Hotel</th>
              <th className="px-4 py-2 text-left">Habitaciones Totales</th>
              <th className="px-4 py-2 text-left">Habitaciones Ocupadas</th>
              <th className="px-4 py-2 text-left">Habitaciones Disponibles</th>
              <th className="px-4 py-2 text-left">% Ocupación</th>
            </tr>
          </thead>
          <tbody>
            {currentRoomStatus.length > 0 ? (
              currentRoomStatus.map((h) => (
                <tr key={h.hotel_id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{h.Hotel}</td>
                  <td className="px-4 py-2">{h.HabitacionesTotales}</td>
                  <td className="px-4 py-2">{h.HabitacionesOcupadas}</td>
                  <td className="px-4 py-2">{h.HabitacionesDisponibles}</td>
                  <td className="px-4 py-2">
                    {h.PorcentajeOcupacion ? `${Number(h.PorcentajeOcupacion).toFixed(2)}%` : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No hay datos de ocupación.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* ------ */}
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">Consulta de Disponibilidad con WIFI</h1>
      </div>
      <form className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={handleSearch}>
        <div className="flex-1">
          <label className="block text-sm font-medium">Hotel</label>
          <select
            name="hotel"
            value={form.hotel}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un hotel</option>
            {hotels.map((h) => (
              <option key={h.id} value={h.id}>{h.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha Check-in</label>
          <input
            type="date"
            name="fecha_checkin"
            value={form.fecha_checkin}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fecha Check-out</label>
          <input
            type="date"
            name="fecha_checkout"
            value={form.fecha_checkout}
            onChange={handleChange}
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Capacidad mínima</label>
          <input
            type="number"
            name="capacidad_minima"
            value={form.capacidad_minima}
            onChange={handleChange}
            min={1}
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {error && <div className="text-red-500">{error}</div>}
      <div className="bg-white rounded shadow mt-6">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Habitaciones Disponibles</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Número</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Capacidad</th>
                <th className="px-4 py-2 text-left">Precio</th>
              </tr>
            </thead>
            <tbody>
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <tr key={room.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2">{room.numero_habitacion}</td>
                    <td className="px-4 py-2">{room.tipo_habitacion || "-"}</td>
                    <td className="px-4 py-2">{room.capacidad_max || "-"} personas</td>
                    <td className="px-4 py-2">$ {room.precio_por_noche}/noche</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    {loading ? "Buscando..." : "No hay habitaciones disponibles para ese rango."}
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

export default HomePage;