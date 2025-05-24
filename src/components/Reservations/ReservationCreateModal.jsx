import React, { useState, useEffect } from "react";
import {
  fetchClientsApi,
  fetchRoomsApi,
  fetchEmployeesApi,
  createReservationApi,
  fetchRoomAvailabilityAndCostApi,
  fetchPromotionByCodeApi,
} from "../../api";

export default function ReservationCreateModal({ open, onClose, onReservationAdded }) {
  const [clients, setClients] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    cliente: "",
    habitacion: "",
    empleado_checkin: "",
    empleado_checkout: "",
    fecha_checkin: "",
    fecha_checkout: "",
    numero_adultos: 1,
    numero_ninos: 0,
    promocion: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [costo, setCosto] = useState(null);
  const [promoInfo, setPromoInfo] = useState(null);

  useEffect(() => {
    if (open) {
      fetchClientsApi().then(setClients);
      fetchRoomsApi().then(setRooms);
      fetchEmployeesApi().then(setEmployees);
      setForm({
        cliente: "",
        habitacion: "",
        empleado_checkin: "",
        empleado_checkout: "",
        fecha_checkin: "",
        fecha_checkout: "",
        numero_adultos: 1,
        numero_ninos: 0,
        promocion: "",
      });
      setCosto(null);
      setPromoInfo(null);
      setError("");
    }
  }, [open]);

  // Validar disponibilidad y calcular costo
  const handleCheckAvailabilityAndCost = async () => {
    setError("");
    setCosto(null);
    setPromoInfo(null);
    if (!form.habitacion || !form.fecha_checkin || !form.fecha_checkout) {
      setError("Selecciona habitación y fechas.");
      return;
    }
    try {
      const available = await fetchRoomAvailabilityAndCostApi({
        habitacion: Number(form.habitacion),
        fecha_checkin: form.fecha_checkin,
        fecha_checkout: form.fecha_checkout,
        promocion: form.promocion
      });
      if (!available.disponible) {
        setError("La habitación no está disponible en ese rango de fechas.");
        return;
      }
      // Calcular costo base
      const room = rooms.find(r => r.id === Number(form.habitacion));
      if (!room) {
        setError("Habitación no encontrada.");
        return;
      }
      const nights = (new Date(form.fecha_checkout) - new Date(form.fecha_checkin)) / (1000 * 60 * 60 * 24);
      let costoBase = nights * parseFloat(room.precio_por_noche);
      let descuento = 0;
      let promo = null;
      if (form.promocion) {
        promo = await fetchPromotionByCodeApi(form.promocion);
        if (promo) {
          setPromoInfo(promo);
          if (promo.descuento_porcentaje > 0) {
            descuento = (costoBase * promo.descuento_porcentaje) / 100;
          } else if (promo.descuento_fijo > 0) {
            descuento = promo.descuento_fijo;
          }
        } else {
          setError("Código promocional inválido.");
          return;
        }
      }
      setCosto((costoBase - descuento).toFixed(2));
    } catch (err) {
      setError("Error al validar disponibilidad o calcular costo.");
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Validar disponibilidad y costo antes de crear
      await handleCheckAvailabilityAndCost();
      if (error) return;
      const payload = {
        ...form,
        cliente: Number(form.cliente),
        habitacion: Number(form.habitacion),
        empleado_checkin: form.empleado_checkin ? Number(form.empleado_checkin) : null,
        empleado_checkout: form.empleado_checkout ? Number(form.empleado_checkout) : null,
        numero_adultos: Number(form.numero_adultos),
        numero_ninos: Number(form.numero_ninos),
        costo_total_estimado: costo,
      };
      await createReservationApi(payload);
      onReservationAdded && onReservationAdded();
      onClose();
    } catch (err) {
      setError("Error al crear la reserva.");
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
        <h2 className="text-xl font-semibold mb-4">Nueva Reserva</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <select name="cliente" value={form.cliente} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Selecciona un cliente</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Habitación</label>
            <select name="habitacion" value={form.habitacion} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Selecciona una habitación</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>{r.numero_habitacion} - {r.hotel?.nombre}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Check-in</label>
              <input type="date" name="fecha_checkin" value={form.fecha_checkin} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Fecha Check-out</label>
              <input type="date" name="fecha_checkout" value={form.fecha_checkout} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Adultos</label>
              <input type="number" name="numero_adultos" min="1" value={form.numero_adultos} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Niños</label>
              <input type="number" name="numero_ninos" min="0" value={form.numero_ninos} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Empleado Check-in</label>
            <select name="empleado_checkin" value={form.empleado_checkin} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">(Opcional)</option>
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Empleado Check-out</label>
            <select name="empleado_checkout" value={form.empleado_checkout} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value="">(Opcional)</option>
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.nombre} {e.apellido}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Código Promocional</label>
            <input name="promocion" value={form.promocion} onChange={handleChange} className="w-full border rounded px-3 py-2" />
            {promoInfo && (
              <div className="text-xs text-green-600 mt-1">
                Promo: {promoInfo.descripcion} ({promoInfo.descuento_porcentaje > 0 ? `${promoInfo.descuento_porcentaje}%` : `$${promoInfo.descuento_fijo}`} de descuento)
              </div>
            )}
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={handleCheckAvailabilityAndCost}
            disabled={loading}
          >
            Calcular costo y validar disponibilidad
          </button>
          {costo && (
            <div className="text-blue-700 font-semibold">
              Costo total estimado: ${costo}
            </div>
          )}
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
              disabled={loading || !costo}
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}