import React, { useEffect, useState } from 'react';
import ServicesList from '../components/Services/ServicesList';
import ServiceCreateModal from '../components/Services/ServiceCreateModal';
import ServiceAssignHotelModal from '../components/Services/ServiceAssignHotelModal';
import { fetchServicesApi } from '../api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const getServices = async () => {
    try {
      const data = await fetchServicesApi();
      setServices(data);
    } catch (error) {
      // Manejo de error
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="space-y-6 p-8">
      <ServiceCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onServiceAdded={getServices}
      />
      <ServiceAssignHotelModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            Nuevo Servicio
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setShowAssignModal(true)}
          >
            Asociar a Hotel
          </button>
        </div>
      </div>
      <ServicesList services={services} />
    </div>
  );
};

export default ServicesPage;