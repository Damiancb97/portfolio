import { NavLink } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import { t } from '../translations';

const base = 'py-2 px-4 rounded-md transition bg-indigo-500 text-white hover:bg-indigo-600';
const active = 'py-2 px-4 bg-indigo-600 text-yellow-300 rounded-md';

export default function NavLinks() {
  const { lang } = useLang()
  const tr = t[lang].nav

  return (
    <nav className="flex gap-4 flex-wrap">
      <NavLink to="/" end className={({ isActive }) => (isActive ? active : base)}>{tr.home}</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? active : base)}>{tr.about}</NavLink>
      <NavLink to="/projects" className={({ isActive }) => (isActive ? active : base)}>{tr.projects}</NavLink>
      <NavLink to="/skills" className={({ isActive }) => (isActive ? active : base)}>{tr.skills}</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? active : base)}>{tr.contact}</NavLink>
    </nav>
  );
}
