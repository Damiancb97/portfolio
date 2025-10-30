export default function Sidebar() {
  return (
    <aside className="md:sticky md:top-6 md:self-start bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center gap-3 md:w-[280px]">
      {/* Avatar */}
      <img
        src="/avatar.png"
        alt="Avatar"
        className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
      />

      {/* Nombre y rol */}
      <h2 className="text-2xl font-semibold">Damián Costa Blanco</h2>
      <p className="text-gray-500">Software Developer</p>

      {/* Información de contacto */}
      <div className="w-full text-left text-sm text-gray-700 border-t border-gray-100 pt-3">
        <p><strong>Email:</strong> damiancb97@gmail.com</p>
        <p><strong>Ubicación:</strong> Ciudad, País</p>
      </div>

      {/* Botones de navegación */}
      <div className="flex flex-col w-full gap-2 mt-2">
        <a
          href="#about"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 text-center"
        >
          About
        </a>
        <a
          href="#projects"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 text-center"
        >
          Projects
        </a>
        <a
          href="#skills"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 text-center"
        >
          Skills
        </a>
        <a
          href="#contact"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 text-center"
        >
          Contact
        </a>
      </div>

      {/* Iconos de redes */}
      <div className="flex gap-4 mt-4 text-gray-700">
        <a href="https://www.linkedin.com/in/damiancb" aria-label="LinkedIn" title="LinkedIn" className="hover:text-indigo-600">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4.96v14H.5V8zM9 8h4.76v2.06h.07C14.7 8.94 16.12 8 18.33 8 22.5 8 23.5 10.77 23.5 14.7V22H18.5v-6.3c0-1.5-.03-3.42-2.08-3.42-2.08 0-2.4 1.63-2.4 3.31V22H9V8z" />
          </svg>
        </a>
        <a href="#" aria-label="GitHub" title="GitHub" className="hover:text-indigo-600">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5z" />
          </svg>
        </a>
        <a href="#" aria-label="Gmail" title="Gmail" className="hover:text-indigo-600">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.2-8 5.3-8-5.3V6l8 5.3L20 6v2.2z" />
          </svg>
        </a>
      </div>
    </aside>
  );
}
