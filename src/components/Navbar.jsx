function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MiPortafolio</h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li><a href="#about" className="hover:text-blue-600">Sobre mí</a></li>
          <li><a href="#skills" className="hover:text-blue-600">Habilidades</a></li>
          <li><a href="#projects" className="hover:text-blue-600">Proyectos</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contacto</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
