import React, { useEffect, useState } from "react";
import { fetchHotelsApi, fetchAvailableRoomsApi } from "../api";
import { Calendar } from "lucide-react";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
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
      const data = await fetchAvailableRoomsApi({
        hotel: Number(form.hotel),
        fecha_checkin: form.fecha_checkin,
        fecha_checkout: form.fecha_checkout,
        capacidad_minima: form.capacidad_minima,
      });
      setAvailableRooms(data);
    } catch (err) {
      setError("Error al consultar disponibilidad");
    } finally {
      setLoading(false);
    }
  };

  //   const handleSearch = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);
  //     setError("");
  //     setAvailableRooms([]);
  //     try {
  //       const data = await fetchAvailableRoomsApi({
  //         hotel: Number(form.hotel),
  //         fecha_checkin: form.fecha_checkin,
  //         fecha_checkout: form.fecha_checkout,
  //       });
  //       setAvailableRooms(data);
  //     } catch (err) {
  //       setError("Error al consultar disponibilidad");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold tracking-tight">Consulta de Disponibilidad</h1>
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
                    <td className="px-4 py-2">{room.tipo_habitacion?.nombre_tipo || "-"}</td>
                    <td className="px-4 py-2">{room.tipo_habitacion?.capacidad_max || "-"} personas</td>
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