import React, { useState } from "react";

export default function HotelCreateModal({ open, onClose, onHotelAdded }) {
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
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/hoteles/hoteles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Error al crear hotel");
      setForm({
        nombre: "",
        direccion: "",
        ciudad: "",
        pais: "",
        telefono: "",
        email_contacto: "",
        categoria_estrellas: 1,
        descripcion_general: "",
      });
      onHotelAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Hotel</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input className="w-full border rounded px-3 py-2" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input className="w-full border rounded px-3 py-2" name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
          <input className="w-full border rounded px-3 py-2" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required />
          <input className="w-full border rounded px-3 py-2" name="pais" placeholder="País" value={form.pais} onChange={handleChange} required />
          <input className="w-full border rounded px-3 py-2" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />
          <input className="w-full border rounded px-3 py-2" name="email_contacto" placeholder="Email de contacto" value={form.email_contacto} onChange={handleChange} required type="email" />
          <input className="w-full border rounded px-3 py-2" name="categoria_estrellas" placeholder="Categoría (estrellas)" value={form.categoria_estrellas} onChange={handleChange} required type="number" min={1} max={5} />
          <textarea className="w-full border rounded px-3 py-2" name="descripcion_general" placeholder="Descripción general" value={form.descripcion_general} onChange={handleChange} />
          {error && <div className="text-red-500">{error}</div>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
}