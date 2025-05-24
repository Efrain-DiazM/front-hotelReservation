import React, { useState, useEffect } from "react";
import { fetchReservations, createReviewApi } from "../../api";

export default function ReviewCreateModal({ open, onClose, onReviewAdded }) {
  const [reservations, setReservations] = useState([]);
  const [form, setForm] = useState({
    reserva: "",
    puntuacion: "",
    comentario: "",
    visible: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchReservations().then(setReservations);
      setForm({
        reserva: "",
        puntuacion: "",
        comentario: "",
        visible: true,
      });
      setError("");
    }
  }, [open]);

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
      const payload = {
        ...form,
        reserva: Number(form.reserva),
        puntuacion: Number(form.puntuacion),
      };
      await createReviewApi(payload);
      onReviewAdded && onReviewAdded();
      onClose();
    } catch (err) {
      setError("Error al crear reseña");
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
        <h2 className="text-xl font-semibold mb-4">Nueva Reseña</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Reserva</label>
            <select
              name="reserva"
              value={form.reserva}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona una reserva</option>
              {reservations.map(r => (
                <option key={r.id} value={r.id}>
                  {r.cliente?.nombre} {r.cliente?.apellido} - Hab. {r.habitacion?.numero_habitacion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Puntuación</label>
            <input
              name="puntuacion"
              type="number"
              min="1"
              max="5"
              value={form.puntuacion}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Comentario</label>
            <textarea
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="visible"
              checked={form.visible}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <label className="text-sm font-medium">Visible</label>
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