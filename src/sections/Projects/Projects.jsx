import { useLang } from '../../context/LangContext';
import { t } from '../../translations';

const projectsMeta = [
  {
    techs: ["React 19", "Vite 7", "Tailwind CSS 4", "Node.js", "Express 5", "Docker", "Nginx"],
    live: "https://damiancb.com",
    github: "https://github.com/damiancb97/portfolio",
  },
  {
    techs: ["Next.js 16", "Turbopack", "Sanity Studio", "React", "Tailwind CSS", "Docker", "Nginx"],
    live: "https://algodomconamor.damiancb.com",
    github: "https://github.com/damiancb97/algodomconamor",
  },
]

function Projects() {
  const { lang } = useLang()
  const tr = t[lang].projects

  const projects = tr.items.map((item, i) => ({ ...item, ...projectsMeta[i] }))

  return (
    <section id="projects" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">{tr.title}</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {projects.map((project) => (
            <article key={project.name} className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-1">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {tr.live}
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  {tr.github}
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
