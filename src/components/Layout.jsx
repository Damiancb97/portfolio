import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';
import { t } from '../translations';

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

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const base = 'py-2 px-4 rounded-md transition bg-indigo-500 text-white hover:bg-indigo-600 text-center';
const active = 'py-2 px-4 bg-indigo-600 text-yellow-300 rounded-md text-center';

export default function Layout() {
  const { isDark, toggle } = useTheme()
  const { lang, changeLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const tr = t[lang]

  const controls = (
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
  )

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">

      {/* ── Mobile top bar ── */}
      <header className="md:hidden sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md px-4 py-3 flex items-center justify-between transition-colors duration-200">
        <span className="font-semibold text-gray-900 dark:text-white">Damián CB</span>
        <div className="flex items-center gap-2">
          {controls}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menú"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col gap-3 transition-colors duration-200">
          <nav className="flex flex-col gap-2" onClick={() => setMenuOpen(false)}>
            <NavLink to="/" end className={({ isActive }) => (isActive ? active : base)}>{tr.nav.home}</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? active : base)}>{tr.nav.about}</NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? active : base)}>{tr.nav.projects}</NavLink>
            <NavLink to="/skills" className={({ isActive }) => (isActive ? active : base)}>{tr.nav.skills}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? active : base)}>{tr.nav.contact}</NavLink>
          </nav>
          <div className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
            <p><strong className="text-gray-700 dark:text-gray-300">{tr.sidebar.email}:</strong> damiancb97@gmail.com</p>
            <p><strong className="text-gray-700 dark:text-gray-300">{tr.sidebar.location}:</strong> {tr.sidebar.locationValue}</p>
          </div>
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className="md:grid md:grid-cols-[280px_1fr] gap-6 p-4 md:p-6 items-start">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 transition-colors duration-200">
          <div className="hidden md:flex justify-between items-center gap-4 mb-6">
            <NavLinks />
            {controls}
          </div>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
