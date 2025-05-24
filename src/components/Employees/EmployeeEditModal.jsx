import React, { useState, useEffect } from "react";
import { fetchHotelsApi, fetchRolesApi, updateEmployeeApi } from "../../api";

const EmployeeEditModal = ({ open, employee, onClose, onEmployeeUpdated }) => {
  const [hotels, setHotels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    hotel: "",
    rol: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha_contratacion: "",
    salario: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchHotelsApi().then(setHotels);
      fetchRolesApi().then(setRoles);
      if (employee) {
        setForm({
          hotel: employee.hotel?.id || employee.hotel || "",
          rol: employee.rol?.id || employee.rol || "",
          nombre: employee.nombre || "",
          apellido: employee.apellido || "",
          email: employee.email || "",
          telefono: employee.telefono || "",
          fecha_contratacion: employee.fecha_contratacion || "",
          salario: employee.salario || "",
        });
      }
      setError("");
    }
  }, [open, employee]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await updateEmployeeApi(employee.id, {
        ...form,
        hotel: Number(form.hotel),
        rol: Number(form.rol),
        salario: Number(form.salario),
      });
      onEmployeeUpdated && onEmployeeUpdated();
      onClose();
    } catch (err) {
      setError("Error al actualizar empleado");
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
        <h2 className="text-xl font-semibold mb-4">Editar Empleado</h2>
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
            <label className="block text-sm font-medium">Rol</label>
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona un rol</option>
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.nombre_rol}</option>
              ))}
            </select>
          </div>
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
            <label className="block text-sm font-medium">Apellido</label>
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
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
            <label className="block text-sm font-medium">Fecha de Contratación</label>
            <input
              name="fecha_contratacion"
              type="date"
              value={form.fecha_contratacion}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Salario</label>
            <input
              name="salario"
              type="number"
              value={form.salario}
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

export default EmployeeEditModal;