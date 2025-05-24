import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import ClientsPage from './pages/ClientsPage.jsx';
import HotelsPage from './pages/HotelsPage.jsx';
import RoomsPage from './pages/RoomsPage.jsx';
import ReservationsPage from './pages/ReservationsPage.jsx';
import EmployeesPage from './pages/EmployeesPage.jsx';
import PromotionsPage from './pages/PromotionsPage.jsx';
import BillingPage from './pages/BillingPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ReviewsPage from './pages/ReviewsPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import HomePage from './pages/HomePage.jsx';
// import HotelCreatePage from './pages/HotelCreatePage.jsx';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* <Route path="/clients" component={ClientsPage} /> */}
            <Route path="/hotels" element={<HotelsPage />} />
            {/* <Route path="/hoteles/nuevo" element={<HotelCreatePage />} /> */}
            <Route path="/rooms" element={<RoomsPage/>} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/employees" element={<EmployeesPage/>} />
            <Route path="/promotions" element={<PromotionsPage/>} />
            <Route path="/billing" element={BillingPage} />
            <Route path="/services" element={<ServicesPage/>} />
            <Route path="/reviews" element={<ReviewsPage/>} />
            <Route path="/clients" element={<ClientsPage/>} />
            <Route path="/" exact element={<HomePage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;