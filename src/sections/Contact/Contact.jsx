function Contact() {
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
      </div>
    </section>
  )
}

export default Contact