import React from "react";

const ClientsList = ({ clients, onEdit, onDelete }) => (
  <div className="bg-white rounded shadow">
    <div className="border-b px-6 py-4">
      <h2 className="text-lg font-semibold">Listado de Clientes</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Dirección</th>
            <th className="px-4 py-2 text-left">Fecha Registro</th>
            <th className="px-4 py-2 text-left">Preferencias</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((c) => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{c.nombre}</td>
                <td className="px-4 py-2">{c.apellido}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.telefono}</td>
                <td className="px-4 py-2">{c.direccion}</td>
                <td className="px-4 py-2">{c.fecha_registro}</td>
                <td className="px-4 py-2">{c.preferencias}</td>
                <td className="px-4 py-2 text-right flex gap-2 justify-end">
                  <button
                    className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs"
                    onClick={() => onEdit(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-xs"
                    onClick={() => onDelete(c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                No hay clientes registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ClientsList;