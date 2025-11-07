import { NavLink } from 'react-router-dom';
// modify name
const base =
  'py-2 px-4 rounded-md transition bg-indigo-500 text-white hover:bg-indigo-600';
const active = 'py-2 px-4 bg-indigo-600 text-yellow-300 rounded-md';

export default function NavLinks() {
  return (
    <nav className="flex gap-4">
      <NavLink to="/" end className={({ isActive }) => (isActive ? active : base)}>Home</NavLink>
      <NavLink to="/about" className={({ isActive }) => (isActive ? active : base)}>About</NavLink>
      <NavLink to="/projects" className={({ isActive }) => (isActive ? active : base)}>Projects</NavLink>
      <NavLink to="/skills" className={({ isActive }) => (isActive ? active : base)}>Skills</NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? active : base)}>Contact</NavLink>
    </nav>
  );
}