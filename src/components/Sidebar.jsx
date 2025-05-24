import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Building2,
  CalendarRange,
  Home,
  Hotel,
  LayoutDashboard,
  MessageSquare,
  Percent,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react';

const routes = [
  { href: '/', icon: LayoutDashboard, title: 'Dashboard' },
  { href: '/clients', icon: Users, title: 'Clientes' },
  { href: '/hotels', icon: Building2, title: 'Hoteles' },
  { href: '/rooms', icon: Hotel, title: 'Habitaciones' },
  { href: '/services', icon: ShoppingBag, title: 'Servicios' },
  { href: '/promotions', icon: Percent, title: 'Promociones' },
  { href: '/reservations', icon: CalendarRange, title: 'Reservas' },
  { href: '/reviews', icon: MessageSquare, title: 'Reseñas' },
  { href: '/employees', icon: Users, title: 'Empleados' },
  { href: '/settings', icon: Settings, title: 'Configuración' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Home className="h-6 w-6" />
          <span>HotelSystem</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {routes.map((route) => (
          <Link key={route.href} to={route.href}>
            <button
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-normal transition-colors ${
                location.pathname === route.href
                  ? 'bg-gray-100 text-blue-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <route.icon className="h-5 w-5" />
              {route.title}
            </button>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-gray-400">admin@hotelsystem.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}