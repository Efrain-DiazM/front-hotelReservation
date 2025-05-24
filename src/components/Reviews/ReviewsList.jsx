import React from "react";

const ReviewsList = ({ reviews }) => (
  <div className="bg-white rounded shadow mt-6">
    <div className="border-b px-6 py-4">
      <h2 className="text-lg font-semibold">Listado de Reseñas</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Reserva</th>
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Puntuación</th>
            <th className="px-4 py-2 text-left">Comentario</th>
            <th className="px-4 py-2 text-left">Fecha</th>
            <th className="px-4 py-2 text-left">Visible</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map(r => (
              <tr key={r.id} className="border-b last:border-b-0">
                <td className="px-4 py-2">{r.reserva}</td>
                <td className="px-4 py-2">{r.reserva?.cliente?.nombre} {r.reserva?.cliente?.apellido}</td>
                <td className="px-4 py-2">{r.puntuacion}</td>
                <td className="px-4 py-2">{r.comentario}</td>
                <td className="px-4 py-2">{r.fecha_resena}</td>
                <td className="px-4 py-2">{r.visible ? "Sí" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                No hay reseñas registradas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReviewsList;