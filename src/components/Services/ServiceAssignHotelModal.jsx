import React, { useState, useEffect } from "react";
import { fetchHotelsApi, fetchServicesApi, assignServiceToHotelApi } from "../../api";

export default function ServiceAssignHotelModal({ open, onClose }) {
  const [hotels, setHotels] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    hotel: "",
    servicio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (open) {
      fetchHotelsApi().then(setHotels);
      fetchServicesApi().then(setServices);
      setForm({ hotel: "", servicio: "" });
      setError("");
      setSuccess("");
    }
  }, [open]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await assignServiceToHotelApi({
        hotel: Number(form.hotel),
        servicio: Number(form.servicio),
      });
      setSuccess("Servicio asociado correctamente.");
      setForm({ hotel: "", servicio: "" });
    } catch (err) {
      setError("Error al asociar servicio");
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
        <h2 className="text-xl font-semibold mb-4">Asociar Servicio a Hotel</h2>
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
            <label className="block text-sm font-medium">Servicio</label>
            <select
              name="servicio"
              value={form.servicio}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona un servicio</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.nombre_servicio}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
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
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Asociando..." : "Asociar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}