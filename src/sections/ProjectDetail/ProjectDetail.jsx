import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { PROJECTS, getProjectBySlug } from '../../data/projects'
import './ProjectDetail.css'

const LABELS = {
  en: {
    backToProjects: 'Back to projects',
    overview: 'Overview',
    techStack: 'Tech stack',
    features: 'Key features',
    architecture: 'Architecture',
    challenges: 'Challenges & learnings',
    gallery: 'Gallery',
    nextProject: 'Next project',
    prevProject: 'Previous',
    role: 'Role',
    year: 'Year',
    type: 'Type',
    status: 'Status',
    statusActive: 'Active',
    statusArchived: 'Archived',
    statusWip: 'In progress',
    onThisPage: 'On this page',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Database',
    devops: 'DevOps',
    mobile: 'Mobile',
    cta: { live: 'View live', github: 'View code', download: 'Download' },
    notFoundTitle: 'Project not found',
    notFoundBody: 'The project you were looking for does not exist.',
  },
  es: {
    backToProjects: 'Volver a proyectos',
    overview: 'Resumen',
    techStack: 'Stack técnico',
    features: 'Características',
    architecture: 'Arquitectura',
    challenges: 'Retos y aprendizajes',
    gallery: 'Galería',
    nextProject: 'Siguiente proyecto',
    prevProject: 'Anterior',
    role: 'Rol',
    year: 'Año',
    type: 'Tipo',
    status: 'Estado',
    statusActive: 'Activo',
    statusArchived: 'Archivado',
    statusWip: 'En desarrollo',
    onThisPage: 'En esta página',
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Base de datos',
    devops: 'DevOps',
    mobile: 'Móvil',
    cta: { live: 'Ver en vivo', github: 'Ver código', download: 'Descargar' },
    notFoundTitle: 'Proyecto no encontrado',
    notFoundBody: 'El proyecto que buscas no existe.',
  },
}

const CHIP_CATEGORY = {
  frontend: 'blue',
  mobile: 'purple',
  backend: 'blue',
  database: 'green',
  devops: 'orange',
}

function renderInline(text) {
  // Convert **bold** and `code` from the source content to HTML nodes.
  const parts = []
  let remaining = text
  let key = 0
  while (remaining.length > 0) {
    const bold = remaining.match(/\*\*(.+?)\*\*/)
    const code = remaining.match(/`(.+?)`/)
    let next = null
    if (bold && (!code || bold.index <= code.index)) next = { type: 'b', m: bold }
    else if (code) next = { type: 'c', m: code }
    if (!next) {
      parts.push(remaining)
      break
    }
    const idx = next.m.index
    if (idx > 0) parts.push(remaining.slice(0, idx))
    if (next.type === 'b') parts.push(<strong key={key++}>{next.m[1]}</strong>)
    else parts.push(<code key={key++}>{next.m[1]}</code>)
    remaining = remaining.slice(idx + next.m[0].length)
  }
  return parts
}

function StackBlock({ stack, labels }) {
  const labelMap = {
    frontend: labels.frontend,
    backend: labels.backend,
    database: labels.database,
    devops: labels.devops,
    mobile: labels.mobile,
  }
  return (
    <div className="pd-stack-groups">
      {Object.entries(stack).map(([key, items]) => (
        <div className="pd-stack-group" key={key}>
          <h3>{labelMap[key] || key}</h3>
          <div className="pd-chip-row">
            {items.map(i => (
              <span className={`pd-chip ${CHIP_CATEGORY[key] || 'blue'}`} key={i}>
                <span className="pd-chip-dot" />
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ArchFlow({ nodes }) {
  return (
    <div className="pd-arch-flow">
      {nodes.map((n, i) => (
        <span key={`node-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span className="pd-arch-node">{n}</span>
          {i < nodes.length - 1 && <span className="pd-arch-arrow">→</span>}
        </span>
      ))}
    </div>
  )
}

function Lightbox({ gallery, index, onClose, onPrev, onNext, lang }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])
  const m = gallery[index]
  if (!m) return null
  const Render = m.render
  return (
    <div className="pd-lightbox" onClick={onClose}>
      <button className="pd-lb-close" onClick={onClose} aria-label="Close">×</button>
      <div className="pd-lb-frame" onClick={(e) => e.stopPropagation()}>
        <div className="pd-lb-img"><Render /></div>
        <div className="pd-lb-cap">
          <span>{m.caption ? m.caption[lang] : `Screen ${index + 1}`} — {index + 1} / {gallery.length}</span>
          <span style={{ display: 'flex', gap: '8px' }}>
            <button className="pd-btn-ghost" onClick={onPrev} style={{ padding: '4px 12px', fontSize: '12px' }}>← Prev</button>
            <button className="pd-btn-ghost" onClick={onNext} style={{ padding: '4px 12px', fontSize: '12px' }}>Next →</button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { lang } = useLang()
  const navigate = useNavigate()
  const labels = LABELS[lang]
  const project = getProjectBySlug(slug)
  const currentIdx = PROJECTS.findIndex(p => p.slug === slug)

  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const sectionRefs = useRef({})

  const sections = useMemo(() => {
    if (!project) return []
    const items = [
      { id: 'overview', label: labels.overview },
      { id: 'features', label: labels.features },
      { id: 'stack', label: labels.techStack },
      { id: 'architecture', label: labels.architecture },
    ]
    if (project.gallery && project.gallery.length > 0) items.push({ id: 'gallery', label: labels.gallery })
    items.push({ id: 'challenges', label: labels.challenges })
    return items
  }, [project, labels])

  useEffect(() => {
    if (!project) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -55% 0px' }
    )
    sections.forEach(s => {
      const el = sectionRefs.current[s.id]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [project, sections])

  useEffect(() => {
    setActiveSection('overview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!project) {
    return (
      <section className="project-detail">
        <h1 style={{ color: 'var(--pd-text-1)' }}>{labels.notFoundTitle}</h1>
        <p style={{ color: 'var(--pd-text-3)' }}>{labels.notFoundBody}</p>
        <Link to="/projects" className="pd-btn-primary" style={{ marginTop: '16px' }}>← {labels.backToProjects}</Link>
      </section>
    )
  }

  const jumpTo = (id) => {
    const el = sectionRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const prevP = PROJECTS[(currentIdx - 1 + PROJECTS.length) % PROJECTS.length]
  const nextP = PROJECTS[(currentIdx + 1) % PROJECTS.length]

  const statusText = { active: labels.statusActive, archived: labels.statusArchived, wip: labels.statusWip }[project.status]
  const HeroMock = project.gallery?.[0]?.render

  return (
    <section className="project-detail">
      <button className="pd-back-link" onClick={() => navigate('/projects')}>
        ← {labels.backToProjects}
      </button>

      <div className="pd-hero">
        <div className="pd-hero-text">
          <span className="pd-hero-emoji">{project.emoji}</span>
          <h1>{project.title}</h1>
          <p className="pd-tagline">{project.tagline[lang]}</p>
          <div className="pd-meta-row">
            <div>
              <div className="pd-meta-label">{labels.year}</div>
              <div className="pd-meta-value">{project.year}</div>
            </div>
            <div>
              <div className="pd-meta-label">{labels.status}</div>
              <div className="pd-meta-value">
                <span className={`pd-status-dot ${project.status}`} />
                {statusText}
              </div>
            </div>
            <div>
              <div className="pd-meta-label">{labels.role}</div>
              <div className="pd-meta-value">{project.role[lang]}</div>
            </div>
            <div>
              <div className="pd-meta-label">{labels.type}</div>
              <div className="pd-meta-value">{project.type[lang]}</div>
            </div>
          </div>
          <div className="pd-hero-cta">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="pd-btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
                {labels.cta.live}
              </a>
            )}
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="pd-btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.4.8-1.7-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                </svg>
                {labels.cta.github}
              </a>
            )}
            {project.links.download && (
              <a href={project.links.download} target="_blank" rel="noopener noreferrer" className="pd-btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                {labels.cta.download}
              </a>
            )}
          </div>
        </div>
        {HeroMock && (
          <div className="pd-hero-preview">
            <HeroMock />
          </div>
        )}
      </div>

      <div className="pd-layout-with-toc">
        <div>
          <section className="pd-section" id="overview" ref={(el) => { sectionRefs.current.overview = el }}>
            <div className="pd-section-title">01 · {labels.overview}</div>
            <div className="pd-prose">
              {project.overview[lang].map((para, i) => (
                <p key={i}>{renderInline(para)}</p>
              ))}
            </div>
          </section>

          <section className="pd-section" id="features" ref={(el) => { sectionRefs.current.features = el }}>
            <div className="pd-section-title">02 · {labels.features}</div>
            <div className="pd-features">
              {project.features.map((f, i) => (
                <div className="pd-feature" key={i}>
                  <span className="pd-icon">{f.icon}</span>
                  <h4>{f[lang].title}</h4>
                  <p>{f[lang].text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="pd-section" id="stack" ref={(el) => { sectionRefs.current.stack = el }}>
            <div className="pd-section-title">03 · {labels.techStack}</div>
            <StackBlock stack={project.stack} labels={labels} />
          </section>

          <section className="pd-section" id="architecture" ref={(el) => { sectionRefs.current.architecture = el }}>
            <div className="pd-section-title">04 · {labels.architecture}</div>
            <ArchFlow nodes={project.arch} />
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section className="pd-section" id="gallery" ref={(el) => { sectionRefs.current.gallery = el }}>
              <div className="pd-section-title">05 · {labels.gallery}</div>
              <div className="pd-gallery">
                {project.gallery.map((m, i) => {
                  const R = m.render
                  return (
                    <div className="pd-gimg" key={i} onClick={() => setLightboxIdx(i)}>
                      <R />
                      <span className="pd-caption">{m.caption ? m.caption[lang] : `Screen ${i + 1}`}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          <section className="pd-section" id="challenges" ref={(el) => { sectionRefs.current.challenges = el }}>
            <div className="pd-section-title">{project.gallery?.length ? '06' : '05'} · {labels.challenges}</div>
            <div className="pd-challenges">
              {project.challenges.map((c, i) => (
                <div className="pd-challenge" key={i}>
                  <div className="pd-ctitle">{c[lang].title}</div>
                  <p className="pd-ctext">{c[lang].text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="pd-pn-nav">
            <Link to={`/projects/${prevP.slug}`} className="pd-pn-card prev">
              <div className="pd-pn-dir">← {labels.prevProject}</div>
              <div className="pd-pn-title">{prevP.emoji} {prevP.title}</div>
            </Link>
            <Link to={`/projects/${nextP.slug}`} className="pd-pn-card next">
              <div className="pd-pn-dir">{labels.nextProject} →</div>
              <div className="pd-pn-title">{nextP.emoji} {nextP.title}</div>
            </Link>
          </div>
        </div>

        <aside className="pd-toc">
          <div className="pd-toc-title">{labels.onThisPage}</div>
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              className={`pd-toc-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => jumpTo(s.id)}
            >
              {s.label}
            </button>
          ))}
        </aside>
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          gallery={project.gallery}
          index={lightboxIdx}
          lang={lang}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx((lightboxIdx - 1 + project.gallery.length) % project.gallery.length)}
          onNext={() => setLightboxIdx((lightboxIdx + 1) % project.gallery.length)}
        />
      )}
    </section>
  )
}
