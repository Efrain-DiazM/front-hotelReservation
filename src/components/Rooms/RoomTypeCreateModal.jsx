import React, { useState } from "react";
import { createRoomTypeApi } from "../../api";

const RoomTypeCreateModal = ({ open, onClose, onRoomTypeCreated }) => {
  const [form, setForm] = useState({
    nombre_tipo: "",
    descripcion: "",
    capacidad_max: "",
    precio_base: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createRoomTypeApi({
        ...form,
        capacidad_max: Number(form.capacidad_max),
        precio_base: Number(form.precio_base),
      });
      setForm({
        nombre_tipo: "",
        descripcion: "",
        capacidad_max: "",
        precio_base: "",
      });
      onRoomTypeCreated && onRoomTypeCreated();
      onClose();
    } catch (err) {
      setError("Error al crear tipo de habitación");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Nuevo Tipo de Habitación</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nombre del Tipo</label>
            <input
              name="nombre_tipo"
              value={form.nombre_tipo}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Capacidad Máxima</label>
            <input
              name="capacidad_max"
              type="number"
              min="1"
              value={form.capacidad_max}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Precio Base</label>
            <input
              name="precio_base"
              type="number"
              min="0"
              value={form.precio_base}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
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

export default RoomTypeCreateModal;