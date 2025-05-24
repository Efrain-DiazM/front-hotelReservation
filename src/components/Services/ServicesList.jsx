import React from "react";

const ServicesList = ({ services }) => (
  <div className="bg-white rounded shadow mt-6">
    <div className="border-b px-6 py-4">
      <h2 className="text-lg font-semibold">Listado de Servicios</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map(service => (
              <tr key={service.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{service.nombre_servicio}</td>
                <td className="px-4 py-2">{service.descripcion_servicio}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="px-4 py-8 text-center text-gray-400">
                No hay servicios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ServicesList;