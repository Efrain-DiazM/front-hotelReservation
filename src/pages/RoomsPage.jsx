import React, { useEffect, useState } from "react";
import { Plus, Hotel } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchRoomsApi, deleteRoomApi } from "../api/index";
import RoomCreateModal from "../components/Rooms/RoomCreateModal";
import RoomEditModal from "../components/Rooms/RoomEditModal";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const data = await fetchRoomsApi();
      setRooms(data);
    } catch {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta habitación?")) {
      await deleteRoomApi(id);
      fetchRooms();
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <RoomCreateModal open={showModal} onClose={() => setShowModal(false)} onRoomCreated={fetchRooms} />
      <RoomEditModal open={!!editRoom} room={editRoom} onClose={() => setEditRoom(null)} onRoomUpdated={fetchRooms} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Habitaciones</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Habitación
        </button>
      </div>
      {/* ...estadísticas... */}
      <div className="bg-white rounded shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">Listado de Habitaciones</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Número</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Hotel</th>
                <th className="px-4 py-2 text-left">Capacidad</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    Cargando...
                  </td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                    No hay habitaciones registradas.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium">{room.numero_habitacion}</td>
                    <td className="px-4 py-2">{room.tipo_habitacion?.nombre_tipo || "-"}</td>
                    <td className="px-4 py-2">{room.hotel?.nombre || "-"}</td>
                    <td className="px-4 py-2">{room.tipo_habitacion?.capacidad_max || "-"} personas</td>
                    <td className="px-4 py-2">$ {room.precio_por_noche}/noche</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold
                          ${room.estado === "Disponible"
                            ? "bg-green-100 text-green-700"
                            : room.estado === "Ocupada"
                              ? "bg-yellow-100 text-yellow-700"
                              : room.estado === "Mantenimiento"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {room.estado}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right flex gap-2 justify-end">
                      <Link to={`/rooms/${room.id}`}>
                        <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs">
                          Ver
                        </button>
                      </Link>
                      <button
                        className="px-3 py-1 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs"
                        onClick={() => setEditRoom(room)}
                      >
                        Editar
                      </button>
                      <button
                        className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-700 text-xs"
                        onClick={() => handleDelete(room.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;