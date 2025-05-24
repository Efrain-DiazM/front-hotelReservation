import React, { useState, useEffect } from "react";

import { fetchHotelsApi, fetchRoomsTypeApi, createRoomApi } from "../../api";
import RoomTypeCreateModal from "./RoomTypeCreateModal";

export default function RoomCreateModal({ open, onClose, onRoomCreated }) {
    const [hotels, setHotels] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [form, setForm] = useState({
        hotel: "",
        numero_habitacion: "",
        tipo_habitacion: "",
        precio_por_noche: "",
        estado: "disponible",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);

    const handleRoomTypeCreated = async () => {
        setShowRoomTypeModal(false);
        const nuevosTipos = await fetchRoomsTypeApi();
        setTipos(nuevosTipos);
    };

    // Fetch hoteles y tipos de habitación
    useEffect(() => {
        if (open) {
            fetchHotelsApi().then(setHotels);
            fetchRoomsTypeApi().then(setTipos);
        }
    }, [open]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Convierte los IDs a números
            const payload = {
                ...form,
                hotel: Number(form.hotel),
                tipo_habitacion: Number(form.tipo_habitacion),
            };
            await createRoomApi(payload);
            setForm({
                hotel: "",
                numero_habitacion: "",
                tipo_habitacion: "",
                precio_por_noche: "",
                estado: "disponible",
            });
            onRoomCreated && onRoomCreated();
            onClose();
        } catch (err) {
            setError("Error al crear habitación");
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <RoomTypeCreateModal
                open={showRoomTypeModal}
                onClose={() => setShowRoomTypeModal(false)}
                onRoomTypeCreated={handleRoomTypeCreated}
            />
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">Nueva Habitación</h2>
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
                        <label className="block text-sm font-medium">Número de Habitación</label>
                        <input
                            name="numero_habitacion"
                            value={form.numero_habitacion}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Tipo de Habitación</label>
                        <div className="flex gap-2">
                            <select
                                name="tipo_habitacion"
                                value={form.tipo_habitacion}
                                onChange={handleChange}
                                required
                                className="w-full border rounded px-3 py-2"
                            >
                                <option value="">Selecciona un tipo</option>
                                {tipos.map(t => (
                                    <option key={t.id} value={t.id}>{t.nombre_tipo}</option>
                                ))}
                            </select>
                            <button
                                type="button"
                                className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs"
                                onClick={() => setShowRoomTypeModal(true)}
                            >
                                Nuevo Tipo
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Precio por Noche</label>
                        <input
                            name="precio_por_noche"
                            type="number"
                            value={form.precio_por_noche}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Estado</label>
                        <select
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="disponible">Disponible</option>
                            <option value="ocupada">Ocupada</option>
                            <option value="mantenimiento">Mantenimiento</option>
                        </select>
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