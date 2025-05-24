import React, { useState, useEffect } from "react";
import { fetchHotelsApi, fetchRoomsTypeApi, updateRoomApi } from "../../api";

const RoomEditModal = ({ open, room, onClose, onRoomUpdated }) => {
  const [hotels, setHotels] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    hotel: "",
    numero_habitacion: "",
    tipo_habitacion: "",
    precio_por_noche: "",
    estado: "disponible",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchHotelsApi().then(setHotels);
      fetchRoomsTypeApi().then(setRoomTypes);
      if (room) {
        setForm({
          hotel: room.hotel?.id || room.hotel || "",
          numero_habitacion: room.numero_habitacion || "",
          tipo_habitacion: room.tipo_habitacion?.id || room.tipo_habitacion || "",
          precio_por_noche: room.precio_por_noche || "",
          estado: room.estado || "disponible",
        });
      }
      setError("");
    }
  }, [open, room]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updateRoomApi(room.id, {
        ...form,
        hotel: Number(form.hotel),
        tipo_habitacion: Number(form.tipo_habitacion),
        precio_por_noche: Number(form.precio_por_noche),
      });
      onRoomUpdated && onRoomUpdated();
      onClose();
    } catch (err) {
      setError("Error al actualizar habitación");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Editar Habitación</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Hotel</label>
            <select
              name="hotel"
              value={form.hotel}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona un hotel</option>
              {hotels.map(h => (
                <option key={h.id} value={h.id}>{h.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Número de Habitación</label>
            <input
              name="numero_habitacion"
              value={form.numero_habitacion}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo de Habitación</label>
            <select
              name="tipo_habitacion"
              value={form.tipo_habitacion}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona un tipo</option>
              {roomTypes.map(rt => (
                <option key={rt.id} value={rt.id}>{rt.nombre_tipo}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Precio por Noche</label>
            <input
              name="precio_por_noche"
              type="number"
              value={form.precio_por_noche}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="disponible">Disponible</option>
              <option value="ocupada">Ocupada</option>
              <option value="mantenimiento">Mantenimiento</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomEditModal;