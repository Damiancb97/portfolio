import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';

export default function Layout() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6 items-start">
      <Sidebar />
      <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <div className="flex justify-end gap-4 mb-6">
          <NavLinks />
        </div>
        <Outlet />
      </main>
    </div>
  );
}