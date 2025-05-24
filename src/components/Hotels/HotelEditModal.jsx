import React, { useState, useEffect } from "react";
import { updateHotelApi } from "../../api";

const HotelEditModal = ({ open, hotel, onClose, onHotelUpdated }) => {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    pais: "",
    telefono: "",
    email_contacto: "",
    categoria_estrellas: 1,
    descripcion_general: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && hotel) {
      setForm({
        nombre: hotel.nombre || "",
        direccion: hotel.direccion || "",
        ciudad: hotel.ciudad || "",
        pais: hotel.pais || "",
        telefono: hotel.telefono || "",
        email_contacto: hotel.email_contacto || "",
        categoria_estrellas: hotel.categoria_estrellas || 1,
        descripcion_general: hotel.descripcion_general || "",
      });
      setError("");
    }
  }, [open, hotel]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "categoria_estrellas" ? Number(value) : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updateHotelApi(hotel.id, form);
      onHotelUpdated && onHotelUpdated();
      onClose();
    } catch (err) {
      setError("Error al actualizar hotel");
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
        <h2 className="text-xl font-semibold mb-4">Editar Hotel</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ciudad</label>
            <input
              name="ciudad"
              value={form.ciudad}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">País</label>
            <input
              name="pais"
              value={form.pais}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email de Contacto</label>
            <input
              name="email_contacto"
              type="email"
              value={form.email_contacto}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Estrellas</label>
            <select
              name="categoria_estrellas"
              value={form.categoria_estrellas}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="descripcion_general"
              value={form.descripcion_general}
              onChange={handleChange}
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

export default HotelEditModal;