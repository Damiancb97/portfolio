// ...existing code...
function Contact() {
  // Reemplaza estas URLs por las tuyas
  const LINKEDIN_URL = "https://www.linkedin.com/in/tu-usuario";
  const GITHUB_URL = "https://github.com/tu-usuario";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Contacto</h2>
        <p className="text-gray-600 text-center mb-6">¿Tienes un proyecto en mente? Escríbeme.</p>

        <form className="grid gap-4">
          <input type="text" name="name" placeholder="Nombre" className="p-3 border rounded" />
          <input type="email" name="email" placeholder="Correo" className="p-3 border rounded" />
          <textarea name="message" placeholder="Mensaje" className="p-3 border rounded h-32" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Enviar
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">También puedes encontrarme en</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-900 text-white px-5 py-2 rounded hover:bg-black transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
// ...existing code...