import axios from 'axios';

// const API_URL = 'http://localhost:8000/api'; // Adjust the URL as needed
const API_URL = 'http://lb-hotelreservas-89009523.us-east-1.elb.amazonaws.com/api'; // Adjust the URL as needed

// Clients
export const fetchClientsApi = async () => {
  const response = await axios.get(`${API_URL}/clientes/clientes/`);
  return response.data;
};

export const createClientApi = async (data) => {
  const response = await axios.post(`${API_URL}/clientes/clientes/`, data);
  return response.data;
};

export const updateClientApi = async (id, data) => {
  const response = await axios.put(`${API_URL}/clientes/clientes/${id}/`, data);
  return response.data;
};

export const deleteClientApi = async (id) => {
  const response = await axios.delete(`${API_URL}/clientes/clientes/${id}/`);
  return response.data;
};

// Hotels
export const fetchHotelsApi = async () => {
  const response = await axios.get(`${API_URL}/hoteles/hoteles/`);
  return response.data;
};

export const updateHotelApi = async (id, data) => {
  const response = await axios.put(`${API_URL}/hoteles/hoteles/${id}/`, data);
  return response.data;
};

export const deleteHotelApi = async (id) => {
  const response = await axios.delete(`${API_URL}/hoteles/hoteles/${id}/`);
  return response.data;
};

// Rooms
export const fetchRoomsApi = async () => {
  const response = await axios.get(`${API_URL}/habitaciones/habitaciones/`);
  return response.data;
};

export const createRoomApi = async (roomData) => {
  console.log(roomData);
  const response = await axios.post(`${API_URL}/habitaciones/CrearHabitaciones/`, roomData);
  return response.data;
};

export const fetchRoomsTypeApi = async () => {
  const response = await axios.get(`${API_URL}/habitaciones/tiposHabitacion/`);
  return response.data;
};

export const createRoomTypeApi = async (data) => {
  const response = await axios.post(`${API_URL}/habitaciones/tiposHabitacion/`, data);
  return response.data;
};

export const updateRoomApi = async (id, data) => {
  const response = await axios.put(`${API_URL}/habitaciones/habitaciones/${id}/`, data);
  return response.data;
};

export const deleteRoomApi = async (id) => {
  const response = await axios.delete(`${API_URL}/habitaciones/habitaciones/${id}/`);
  return response.data;
};

// Reservations
export const fetchReservations = async () => {
  const response = await axios.get(`${API_URL}/reservas/reservas/`);
  return response.data;
};

export const createReservationApi = async (data) => {
  const response = await axios.post(`${API_URL}/reservas/reservas/`, data);
  return response.data;
};

export const validateRoomAvailabilityApi = async (data) => {
  const response = await axios.post(`${API_URL}/habitaciones/validar_disponibilidad/`, data);
  return response.data;
};

export const fetchPromotionByCodeApi = async (codigo) => {
  const response = await axios.get(`${API_URL}/promociones/by_code/${codigo}/`);
  return response.data;
};

// Employees
export const fetchEmployeesApi = async () => {
  const response = await axios.get(`${API_URL}/empleados/empleados/`);
  return response.data;
};

export const createEmployeeApi = async (employeeData) => {
  console.log(employeeData);
  const response = await axios.post(`${API_URL}/empleados/empleados/`, employeeData);
  return response.data;
};

export const updateEmployeeApi = async (id, data) => {
  const response = await axios.put(`${API_URL}/empleados/empleados/${id}/`, data);
  return response.data;
};

export const deleteEmployeeApi = async (id) => {
  const response = await axios.delete(`${API_URL}/empleados/empleados/${id}/`);
  return response.data;
};

export const deactivateEmployeeApi = async (id) => {
  // Suponiendo que tienes un endpoint específico para desactivar
  const response = await axios.post(`${API_URL}/empleados/empleados/${id}/desactivar/`);
  return response.data;
};

export const fetchRolesApi = async () => {
  const response = await axios.get(`${API_URL}/empleados/roles/`);
  return response.data;
}

// Promotions
export const fetchPromotionsApi = async () => {
  const response = await axios.get(`${API_URL}/promociones/promociones/`);
  return response.data;
};

export const createPromotionApi = async (promotionData) => {
  console.log(promotionData);
  const response = await axios.post(`${API_URL}/promociones/promociones/`, promotionData);
  return response.data;
};

// Billing
export const fetchBilling = async () => {
  const response = await axios.get(`${API_URL}/billing/`);
  return response.data;
};

// Services
export const fetchServicesApi = async () => {
  const response = await axios.get(`${API_URL}/servicios/servicios/`);
  return response.data;
};

export const createServiceApi = async (data) => {
  console.log(data);
  const response = await axios.post(`${API_URL}/servicios/servicios/`, data);
  return response.data;
};

export const assignServiceToHotelApi = async (data) => {
  console.log(data);
  const response = await axios.post(`${API_URL}/servicios/servicios/`, data);
  return response.data;
};


// Reviews
export const fetchReviewsApi = async () => {
  const response = await axios.get(`${API_URL}/resenas/resenas/`);
  return response.data;
};

export const createReviewApi = async (data) => {
  const response = await axios.post(`${API_URL}/resenas/resenas/`, data);
  return response.data;
};

// consulta 

export const fetchAvailableRoomsApi = async ({ hotel, fecha_checkin, fecha_checkout, capacidad_minima }) => {
  const params = new URLSearchParams({
    hotel,
    fecha_checkin,
    fecha_checkout,
    capacidad_minima,
  });
  const response = await axios.get(`${API_URL}/habitaciones/disponibles/?${params.toString()}`);
  return response.data;
};

export const fetchRoomAvailabilityAndCostApi = async (data) => {
  const response = await axios.post(`${API_URL}/habitaciones/validar-disponibilidad-costo/`, data);
  console.log('response.data:', response.data);
  return response.data;
};

// CONSULTAS
//Buscar habitaciones disponibles en un hotel específico, para un rango de fechas, con capacidad mínima y que tengan WiFi Gratis

export const fetchAvailableRoomsWifiApi = async ({ hotel, fecha_checkin, fecha_checkout, capacidad_minima }) => {
  const params = new URLSearchParams({
    hotel,
    fecha_checkin,
    fecha_checkout,
    capacidad_minima,
  });
  const response = await axios.get(`${API_URL}/reservas/disponibles-wifi/?${params.toString()}`);
  return response.data;
};

// Calcular la puntuación media de las reseñas por cada hotel.
export const fetchHotelsAverageScoreApi = async () => {
  const response = await axios.get(`${API_URL}/reservas/puntuacion-media/`);
  return response.data;
};

// Listar todas las habitaciones que nunca han sido reservadas.
export const fetchNeverReservedRoomsApi = async () => {
  const response = await axios.get(`${API_URL}/reservas/nunca-reservadas/`);
  return response.data;
};

// Calcular el ingreso total facturado y pagado por hotel en el último mes.
export const fetchHotelsIncomeLastMonthApi = async () => {
  const response = await axios.get(`${API_URL}/reservas/ingresos-ultimo-mes/`);
  return response.data;
};

//Listar todas las promociones activas y cuántas veces se ha usado cada una (mostrar 0 si no se ha usado). 
export const fetchActivePromotionsWithUsageApi = async () => {
  const response = await axios.get(`${API_URL}/reservas/activas-con-uso/`);
  return response.data;
};

//Procedimiento para crear una reserva, validar disponibilidad, aplicar un código promocional (si se proporciona y es válido), calcular costo y crear la factura inicial.
export const createReservationWithInvoiceApi = async (data) => {
  const response = await axios.post(`${API_URL}/reservas/reservar-con-factura/`, data);
  return response.data;
};

//Vista que muestra la ocupación actual por hotel
export const fetchCurrentRoomStatusApi = async () => {
  const response = await axios.get(`${API_URL}/reservas/estado-actual-habitaciones/`);
  console.log('Estado actual de habitaciones:', response.data);
  return response.data;
};