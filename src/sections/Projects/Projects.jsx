import { useLang } from '../../context/LangContext';
import { t } from '../../translations';

// Portfolio — código / corchetes
function IconPortfolio() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

// Algodom con Amor — corazón
function IconHeart() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

// Timed — espada (WoW)
function IconSword() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
      <line x1="13" y1="19" x2="19" y2="13" />
      <line x1="16" y1="16" x2="20" y2="20" />
      <line x1="19" y1="21" x2="21" y2="19" />
    </svg>
  )
}

// Walkly — persona caminando
function IconWalk() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9.9 8.4l-2.4 9 1.9.5 1.5-5.5 1.9 2V20h2v-6.5l-2-2.5.6-3A6.3 6.3 0 0 0 18 11V9a4.3 4.3 0 0 1-3.6-1.9l-1-1.6A2 2 0 0 0 11.7 5c-.4 0-.7.1-1 .3L7 7.3V11h2V8.7l.9-.3z" />
    </svg>
  )
}

const projectsMeta = [
  {
    icon: <IconPortfolio />,
    iconColor: 'text-indigo-500',
    techs: ["React 19", "Vite 7", "Tailwind CSS 4", "Node.js", "Express 5", "Docker", "Nginx"],
    live: "https://damiancb.com",
    github: "https://github.com/damiancb97/portfolio",
  },
  {
    icon: <IconHeart />,
    iconColor: 'text-pink-500',
    techs: ["Next.js 16", "Turbopack", "Sanity Studio", "React", "Tailwind CSS", "Docker", "Nginx"],
    live: "https://algodonconamor.es",
    github: "https://github.com/damiancb97/algodomconamor",
  },
  {
    icon: <IconSword />,
    iconColor: 'text-yellow-500',
    techs: ["Django 6.0", "Python", "GraphQL", "OAuth2", "PostgreSQL", "Docker", "Nginx", "Cloudflare Tunnel"],
    live: "https://timedgg.com",
    github: "https://github.com/damiancb97/timed_django",
  },
  {
    icon: <IconWalk />,
    iconColor: 'text-green-500',
    techs: ["Expo", "React Native", "TypeScript", "Firebase", "Firestore"],
    github: "https://github.com/damiancb97/walkly",
    download: "https://expo.dev/accounts/damiancb97/projects/walkly/builds/7efe2a96-6669-49e9-b1be-bdf8f3d60fcd",
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
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
                <span className={project.iconColor}>{project.icon}</span>
                {project.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span key={tech} className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-1">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                    {tr.live}
                  </a>
                )}
                {project.download && (
                  <a href={project.download} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:underline text-sm">
                    {tr.download}
                  </a>
                )}
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
