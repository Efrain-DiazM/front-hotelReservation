import React from 'react';

const ReservationsList = ({ reservations }) => {
  return (
    <div className="bg-white rounded shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Listado de Reservas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Cliente</th>
              <th className="px-4 py-2 text-left">Hotel</th>
              <th className="px-4 py-2 text-left">Habitación</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Adultos</th>
              <th className="px-4 py-2 text-left">Niños</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left">Costo</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((r) => (
                <tr key={r.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{r.cliente?.nombre} {r.cliente?.apellido}</td>
                  <td className="px-4 py-2">{r.habitacion?.hotel?.nombre || r.hotelName}</td>
                  <td className="px-4 py-2">{r.habitacion?.numero_habitacion || r.roomNumber}</td>
                  <td className="px-4 py-2">{r.fecha_checkin}</td>
                  <td className="px-4 py-2">{r.fecha_checkout}</td>
                  <td className="px-4 py-2">{r.numero_adultos}</td>
                  <td className="px-4 py-2">{r.numero_ninos}</td>
                  <td className="px-4 py-2">{r.estado_reserva}</td>
                  <td className="px-4 py-2">${r.costo_total_estimado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-400">
                  No hay reservas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsList;