import React, { useEffect, useState } from 'react';
import { Plus, User, Briefcase } from "lucide-react";
import { fetchEmployeesApi, deleteEmployeeApi } from '../api/index';
import EmployeeCreateModal from '../components/Employees/EmployeeCreateModal';
import EmployeeEditModal from '../components/Employees/EmployeeEditModal';
import { Link } from "react-router-dom";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este empleado?")) {
      await deleteEmployeeApi(id);
      fetchEmployees();
    }
  };

  // const handleDeactivate = async (id) => {
  //   if (window.confirm("¿Seguro que deseas desactivar este empleado?")) {
  //     await deactivateEmployeeApi(id);
  //     fetchEmployees();
  //   }
  // };

  const fetchEmployees = async () => {
    try {
      const data = await fetchEmployeesApi();
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-8">
      <EmployeeCreateModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onEmployeeAdded={fetchEmployees}
      />
      <EmployeeEditModal
        open={!!editEmployee}
        employee={editEmployee}
        onClose={() => setEditEmployee(null)}
        onEmployeeUpdated={fetchEmployees}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Empleados</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          <Plus className="h-4 w-4" />
          Nuevo Empleado
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Empleados</span>
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">{employees.length}</div>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Roles Distintos</span>
            <Briefcase className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">
            {Array.from(new Set(employees.map(e => e.rol?.nombre_rol))).length}
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Listado de Empleados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Apellido</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Hotel</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Fecha Contratación</th>
                <th className="px-4 py-2 text-left">Salario</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{emp.nombre}</td>
                  <td className="px-4 py-2">{emp.apellido}</td>
                  <td className="px-4 py-2">{emp.email}</td>
                  <td className="px-4 py-2">{emp.telefono}</td>
                  <td className="px-4 py-2">{emp.hotel?.nombre || emp.hotel}</td>
                  <td className="px-4 py-2">{emp.rol?.nombre_rol || emp.rol}</td>
                  <td className="px-4 py-2">{emp.fecha_contratacion}</td>
                  <td className="px-4 py-2">${emp.salario}</td>
                  <td className="px-4 py-2 text-right">
                    <Link to={`/empleados/${emp.id}`}>
                      <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs">
                        Ver
                      </button>
                    </Link>
                    <button
                      className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs"
                      onClick={() => setEditEmployee(emp)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-xs"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Eliminar
                    </button>
                    {/* <button
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
                      onClick={() => handleDeactivate(emp.id)}
                    >
                      Desactivar
                    </button> */}
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                    No hay empleados registrados.
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

export default EmployeesPage;