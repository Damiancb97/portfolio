const projects = [
  {
    name: "Portfolio Personal",
    description:
      "Sitio web de portfolio personal con chat de IA integrado. El asistente responde preguntas sobre mi experiencia y habilidades usando un modelo de lenguaje local a través de LM Studio.",
    techs: ["React 19", "Vite 7", "Tailwind CSS 4", "Node.js", "Express 5", "Docker", "Nginx"],
    live: "https://damiancb.com",
    github: "https://github.com/damiancb97/portfolio",
  },
  {
    name: "Algodom con Amor",
    description:
      "Tienda web para la venta de ropa tejida a mano. Gestión de contenido (productos, categorías e imágenes) desde Sanity Studio, con un frontend en Next.js que consume la API de Sanity.",
    techs: ["Next.js 16", "Turbopack", "Sanity Studio", "React", "Tailwind CSS", "Docker", "Nginx"],
    live: "https://algodomconamor.damiancb.com",
    github: "https://github.com/damiancb97/algodomconamor",
  },
]

function Projects() {
  return (
    <section id="projects" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {projects.map((project) => (
            <article key={project.name} className="p-6 bg-gray-50 rounded-lg shadow-sm flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-black">{project.name}</h3>
              <p className="text-gray-600 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-1">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  Live site ↗
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
