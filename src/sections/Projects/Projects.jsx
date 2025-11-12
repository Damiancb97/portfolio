function Projects() {
  return (
    <section id="projects" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Proyectos</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(30%,1fr))]">
          {/* ...existing code... */}
          <article className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-black">Proyecto A</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates at nihil corporis voluptate, vero quam sint porro voluptatum incidunt molestias illum rerum optio. Quas, consequatur natus amet possimus numquam ducimus?</p>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Ver más</a>
          </article>

          <article className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-black">Proyecto B</h3>
            <p className="text-gray-600">Descripción breve del proyecto B.</p>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Ver más</a>
          </article>

          <article className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-black">Proyecto B</h3>
            <p className="text-gray-600">Descripción breve del proyecto B.</p>
            <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Ver más</a>
          </article>
          {/* ...existing code... */}
        </div>
      </div>
    </section>
  )
}

export default Projects