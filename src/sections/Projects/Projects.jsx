function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Proyectos</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Proyecto A</h3>
            <p className="text-gray-600">Descripción breve del proyecto A.</p>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Ver más</a>
          </article>

          <article className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Proyecto B</h3>
            <p className="text-gray-600">Descripción breve del proyecto B.</p>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Ver más</a>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Projects