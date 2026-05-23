import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { t } from '../../translations';
import { PROJECTS } from '../../data/projects';
import notFoundIcon from '../../assets/notfound.svg';

// Walkly placeholder — swap to /projects/icons/walkly.png once the file is uploaded
function IconWalk() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 5.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM9.9 8.4l-2.4 9 1.9.5 1.5-5.5 1.9 2V20h2v-6.5l-2-2.5.6-3A6.3 6.3 0 0 0 18 11V9a4.3 4.3 0 0 1-3.6-1.9l-1-1.6A2 2 0 0 0 11.7 5c-.4 0-.7.1-1 .3L7 7.3V11h2V8.7l.9-.3z" />
    </svg>
  )
}

function LogoImg({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-8 h-8 rounded-md object-contain bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-600 p-0.5"
    />
  )
}

const projectsMeta = [
  {
    icon: <LogoImg src={notFoundIcon} alt="Portfolio logo" />,
    iconColor: '',
    techs: ["React 19", "Vite 7", "Tailwind CSS 4", "Node.js", "Express 5", "Docker", "Nginx"],
    live: "https://damiancb.com",
    github: "https://github.com/damiancb97/portfolio",
  },
  {
    icon: <LogoImg src="/projects/icons/algodon.png" alt="Algodón con Amor logo" />,
    iconColor: '',
    techs: ["Next.js 16", "Turbopack", "Sanity Studio", "React", "Tailwind CSS", "Docker", "Nginx"],
    live: "https://algodonconamor.es",
    github: "https://github.com/damiancb97/algodomconamor",
  },
  {
    icon: <LogoImg src="/projects/icons/timed.png" alt="Timed logo" />,
    iconColor: '',
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
  const navigate = useNavigate()
  const tr = t[lang].projects
  const detailsLabel = lang === 'es' ? 'Ver detalles →' : 'View details →'

  const projects = tr.items.map((item, i) => ({
    ...item,
    ...projectsMeta[i],
    slug: PROJECTS[i]?.slug,
  }))

  const handleCardActivate = (slug) => {
    if (slug) navigate(`/projects/${slug}`)
  }

  return (
    <section id="projects" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">{tr.title}</h2>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {projects.map((project) => (
            <article
              key={project.name}
              role="link"
              tabIndex={0}
              onClick={() => handleCardActivate(project.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleCardActivate(project.slug)
                }
              }}
              className="group cursor-pointer p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 hover:ring-2 hover:ring-indigo-400/60 dark:hover:ring-indigo-500/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
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
              <div className="flex flex-wrap gap-4 mt-1 items-center">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    {tr.live}
                  </a>
                )}
                {project.download && (
                  <a
                    href={project.download}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-green-600 dark:text-green-400 hover:underline text-sm"
                  >
                    {tr.download}
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  {tr.github}
                </a>
                <span className="ml-auto text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  {detailsLabel}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
