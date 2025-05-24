import React, { useState } from "react";
import { createPromotionApi } from "../../api";

export default function PromotionCreateModal({ open, onClose, onPromotionAdded }) {
  const [form, setForm] = useState({
    codigo_promo: "",
    descripcion: "",
    descuento_porcentaje: "",
    descuento_fijo: "",
    fecha_inicio: "",
    fecha_fin: "",
    activa: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Convierte los descuentos a número
      const payload = {
        ...form,
        descuento_porcentaje: Number(form.descuento_porcentaje),
        descuento_fijo: Number(form.descuento_fijo),
      };
      await createPromotionApi(payload);
      setForm({
        codigo_promo: "",
        descripcion: "",
        descuento_porcentaje: "",
        descuento_fijo: "",
        fecha_inicio: "",
        fecha_fin: "",
        activa: true,
      });
      onPromotionAdded && onPromotionAdded();
      onClose();
    } catch (err) {
      setError("Error al crear promoción");
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
        <h2 className="text-xl font-semibold mb-4">Nueva Promoción</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Código</label>
            <input
              name="codigo_promo"
              value={form.codigo_promo}
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
            <label className="block text-sm font-medium">% Descuento</label>
            <input
              name="descuento_porcentaje"
              type="number"
              value={form.descuento_porcentaje}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descuento Fijo</label>
            <input
              name="descuento_fijo"
              type="number"
              value={form.descuento_fijo}
              onChange={handleChange}
              min="0"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Inicio</label>
              <input
                name="fecha_inicio"
                type="date"
                value={form.fecha_inicio}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Fin</label>
              <input
                name="fecha_fin"
                type="date"
                value={form.fecha_fin}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activa"
              checked={form.activa}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm font-medium">Activa</label>
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
}