import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Layout() {
  const { isDark, toggle } = useTheme()
  const { lang, changeLang } = useLang()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 md:grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6 items-start">
      <Sidebar />
      <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-colors duration-200">
        <div className="flex justify-between items-center gap-4 mb-6">
          <NavLinks />
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={lang}
              onChange={(e) => changeLang(e.target.value)}
              aria-label="Seleccionar idioma"
              className="text-sm rounded-full px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-none outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 appearance-none"
            >
              <option value="es">🇪🇸 ES</option>
              <option value="en">🇬🇧 EN</option>
            </select>
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
