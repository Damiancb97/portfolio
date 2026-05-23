/* eslint-disable react-refresh/only-export-components */
/* Structured project data — used by the Projects list and the ProjectDetail page.
 * Each entry follows the schema produced by the Claude Design handoff.
 * Real screenshots (captured from the live sites) live in /public/projects/ and
 * are wrapped with ImgMock so they slot into the gallery's asymmetric grid.
 * Walkly has no public web build, so it still uses inline SVG placeholders.
 */

const ImgMock = ({ src, alt }) => (
  <img src={src} alt={alt || ''} loading="lazy" decoding="async" />
)

const WalklyMock1 = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="walkly-bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dcfce7" />
        <stop offset="100%" stopColor="#bbf7d0" />
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#walkly-bg)" />
    <rect x="290" y="20" width="220" height="460" rx="32" fill="#fff" stroke="#86efac" strokeWidth="2" />
    <text x="400" y="68" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" fill="#64748b">Today, May 22</text>
    <circle cx="400" cy="190" r="92" fill="none" stroke="#dcfce7" strokeWidth="16" />
    <circle cx="400" cy="190" r="92" fill="none" stroke="#10b981" strokeWidth="16" strokeLinecap="round" strokeDasharray="430 580" transform="rotate(-90 400 190)" />
    <text x="400" y="190" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="32" fontWeight="900" fill="#065f46">8,243</text>
    <text x="400" y="212" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#64748b">/ 10,000 steps</text>
    <rect x="310" y="310" width="84" height="62" rx="10" fill="#f0fdf4" />
    <text x="352" y="328" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#64748b" letterSpacing="1">KCAL</text>
    <text x="352" y="352" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="#065f46">412</text>
    <rect x="406" y="310" width="84" height="62" rx="10" fill="#f0fdf4" />
    <text x="448" y="328" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" fill="#64748b" letterSpacing="1">KM</text>
    <text x="448" y="352" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800" fill="#065f46">5.8</text>
    <rect x="310" y="390" width="180" height="58" rx="10" fill="#10b981" />
    <text x="400" y="416" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#dcfce7" fontWeight="600">🔥 12-day streak</text>
    <text x="400" y="436" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill="#dcfce7">Keep it up!</text>
  </svg>
)

const WalklyMock2 = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="#f0fdf4" />
    <rect x="290" y="20" width="220" height="460" rx="32" fill="#fff" stroke="#86efac" strokeWidth="2" />
    <text x="316" y="68" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" fill="#065f46">This week</text>
    <text x="316" y="86" fontFamily="Inter, sans-serif" fontSize="11" fill="#64748b">52,164 steps total</text>
    {[0.4, 0.85, 0.6, 1.0, 0.75, 0.55, 0.45].map((h, i) => (
      <g key={i}>
        <rect x={316 + i * 24} y={300 - h * 180} width={16} height={h * 180} rx={4} fill={i === 3 ? '#10b981' : '#86efac'} />
        <text x={324 + i * 24} y={318} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" fill="#64748b">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</text>
      </g>
    ))}
    <rect x="316" y="340" width="168" height="120" rx="10" fill="#f0fdf4" />
    <text x="332" y="364" fontFamily="Inter, sans-serif" fontSize="10" fontWeight="700" fill="#64748b" letterSpacing="1">BEST DAY</text>
    <text x="332" y="392" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="800" fill="#065f46">Thursday</text>
    <text x="332" y="412" fontFamily="Inter, sans-serif" fontSize="12" fill="#065f46">12,481 steps · 8.2 km</text>
    <text x="332" y="438" fontFamily="Inter, sans-serif" fontSize="10" fill="#94a3b8">623 kcal burned</text>
  </svg>
)

const WalklyMock3 = () => (
  <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <rect width="800" height="500" fill="#10b981" />
    <text x="400" y="120" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="46" fontWeight="900" fill="#fff" letterSpacing="-0.02em">Walkly</text>
    <text x="400" y="150" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#dcfce7">Every step counts.</text>
    <circle cx="400" cy="260" r="60" fill="rgba(255,255,255,0.2)" />
    <text x="400" y="285" textAnchor="middle" fontSize="64">🚶</text>
    <rect x="240" y="370" width="320" height="48" rx="24" fill="#fff" />
    <text x="400" y="400" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="700" fill="#065f46">Get started</text>
    <text x="400" y="448" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#dcfce7">Already have an account? Sign in</text>
  </svg>
)

export const PROJECTS = [
  {
    id: 'personal-portfolio',
    slug: 'portfolio',
    emoji: '◇',
    accent: 'purple',
    year: '2025',
    status: 'active',
    role: { en: 'Solo developer', es: 'Desarrollador único' },
    type: { en: 'Personal site', es: 'Sitio personal' },
    title: 'Personal Portfolio',
    tagline: {
      en: 'Personal portfolio website with an integrated AI assistant that answers questions about my experience.',
      es: 'Sitio de portfolio personal con un asistente IA integrado que responde preguntas sobre mi experiencia.',
    },
    overview: {
      en: [
        'A modern single-page portfolio built with React 19 and Vite 7, designed as a living showcase of my work as a backend developer. The whole site is statically built, fully responsive, and ships with light/dark themes plus ES/EN i18n.',
        "The standout piece is an **AI chat assistant** trained on a structured profile document. It runs against a local language model served through LM Studio, so visitors can ask things like \"what did you work on at company X?\" or \"how would you design a REST API?\" and get grounded, conversational answers without me being there.",
        'Everything is containerized with Docker and served behind Nginx as a reverse proxy. Deployment is a single `docker-compose up`.',
      ],
      es: [
        'Un portfolio SPA moderno hecho con React 19 y Vite 7, diseñado como vitrina viva de mi trabajo como backend developer. Todo el sitio se compila estáticamente, es completamente responsive e incluye temas claro/oscuro e i18n ES/EN.',
        'La pieza destacada es un **asistente IA por chat** entrenado con un documento estructurado de perfil. Corre contra un modelo de lenguaje local servido a través de LM Studio, así los visitantes pueden preguntar cosas como «¿en qué trabajaste en la empresa X?» o «¿cómo diseñarías una API REST?» y obtener respuestas conversacionales y fundamentadas sin que yo esté presente.',
        'Todo está contenedorizado con Docker y servido tras Nginx como reverse proxy. El deployment es un único `docker-compose up`.',
      ],
    },
    features: [
      { icon: '✶', en: { title: 'AI chat assistant', text: 'Conversational interface backed by a local LLM through LM Studio.' }, es: { title: 'Asistente IA por chat', text: 'Interfaz conversacional respaldada por un LLM local mediante LM Studio.' } },
      { icon: '◐', en: { title: 'Light / dark theme', text: 'Persistent theme stored in localStorage with smooth transitions.' }, es: { title: 'Tema claro / oscuro', text: 'Tema persistente guardado en localStorage con transiciones suaves.' } },
      { icon: '⌘', en: { title: 'i18n ES / EN', text: 'Full bilingual content with a single click language toggle.' }, es: { title: 'i18n ES / EN', text: 'Contenido bilingüe con un toggle de idioma de un solo clic.' } },
      { icon: '❤', en: { title: 'Dockerized stack', text: 'Frontend, chat backend and reverse proxy orchestrated with Compose.' }, es: { title: 'Stack en Docker', text: 'Frontend, backend del chat y reverse proxy orquestados con Compose.' } },
    ],
    arch: ['Browser', 'Nginx', 'Vite SPA', 'Chat API (Node.js)', 'LM Studio'],
    stack: {
      frontend: ['React 19', 'Vite 7', 'Tailwind CSS 4'],
      backend: ['Node.js', 'Express 5'],
      devops: ['Docker', 'Nginx'],
    },
    challenges: [
      { en: { title: 'Prompt grounding', text: 'Iterated on a profile document + system prompt until answers felt authentically mine.' }, es: { title: 'Grounding del prompt', text: 'Iteré sobre un documento de perfil + prompt de sistema hasta que las respuestas sonaran auténticamente mías.' } },
      { en: { title: 'Local-first inference', text: 'Pointing the API at LM Studio means zero per-token cost and full data ownership.' }, es: { title: 'Inferencia local primero', text: 'Apuntando la API a LM Studio el coste por token es cero y los datos no salen de mi máquina.' } },
    ],
    links: { live: 'https://damiancb.com', github: 'https://github.com/damiancb97/portfolio', download: null },
    gallery: [
      { caption: { en: 'Home with AI assistant chat', es: 'Inicio con el chat del asistente IA' }, render: () => <ImgMock src="/projects/portfolio-1.jpg" alt="Portfolio home" /> },
      { caption: { en: 'About page — bio and what I do', es: 'Sobre mí — bio y lo que hago' }, render: () => <ImgMock src="/projects/portfolio-2.jpg" alt="Portfolio about" /> },
      { caption: { en: 'Responsive mobile view', es: 'Vista responsive en móvil' }, render: () => <ImgMock src="/projects/portfolio-3.jpg" alt="Portfolio mobile" /> },
    ],
  },
  {
    id: 'algodon-con-amor',
    slug: 'algodon-con-amor',
    emoji: '✿',
    accent: 'pink',
    year: '2024',
    status: 'active',
    role: { en: 'Frontend & integration', es: 'Frontend e integración' },
    type: { en: 'E-commerce site', es: 'E-commerce' },
    title: 'Algodón con Amor',
    tagline: {
      en: 'Handmade baby clothing storefront with a fully managed catalog and WhatsApp-first checkout.',
      es: 'Tienda de ropa tejida a mano para bebés, con un catálogo gestionable y checkout vía WhatsApp.',
    },
    overview: {
      en: [
        'A boutique storefront built so the brand owner can update products, sizes, categories and images **without touching code**. The frontend is a Next.js storefront with Tailwind, fetching content from Sanity Studio over its image and content APIs.',
        'Every product carries faceted attributes — **gender** (girl / boy / unisex), **category** (jersey, chaqueta, pelele, gorro, patucos, manta, conjunto…) and **age range** (0–1m through 2–3 years) — so the catalog page can filter the inventory live as the brand grows.',
        "Checkout is intentionally simple: each piece is unique, so there's no cart. Every product opens a pre-filled **WhatsApp** conversation with the maker, and a secondary CTA links to the Instagram post for context.",
        'The infrastructure runs in Docker behind Nginx, with the Sanity studio and the storefront deployed as separate services.',
      ],
      es: [
        'Un storefront boutique pensado para que la dueña de la marca pueda actualizar productos, tallas, categorías e imágenes **sin tocar código**. El frontend es Next.js con Tailwind, consumiendo contenido de Sanity Studio a través de sus APIs de imagen y contenido.',
        'Cada producto lleva atributos para filtrar — **género** (niña / niño / unisex), **categoría** (jersey, chaqueta, pelele, gorro, patucos, manta, conjunto…) y **rango de edad** (0–1m hasta 2–3 años) — para que la página de catálogo filtre en vivo el inventario según crece la marca.',
        'El checkout es deliberadamente simple: cada pieza es única, así que no hay carrito. Cada producto abre una conversación **WhatsApp** pre-rellenada con la artesana, y un CTA secundario enlaza al post de Instagram para contexto.',
        'La infraestructura corre en Docker tras Nginx, con el studio de Sanity y el storefront desplegados como servicios separados.',
      ],
    },
    features: [
      { icon: '◫', en: { title: 'Sanity-powered CMS', text: 'Non-technical content editing of the whole catalog — products, variants, gallery, banners.' }, es: { title: 'CMS con Sanity', text: 'Edición no técnica de todo el catálogo — productos, variantes, galería, banners.' } },
      { icon: '☰', en: { title: 'Faceted catalog filters', text: 'Gender, category and age range chips filter the grid client-side without a reload.' }, es: { title: 'Filtros del catálogo', text: 'Chips de género, categoría y edad filtran la grid client-side sin recarga.' } },
      { icon: '✆', en: { title: 'WhatsApp checkout', text: 'Each product opens a pre-filled WhatsApp chat — zero-friction for one-of-a-kind pieces.' }, es: { title: 'Checkout vía WhatsApp', text: 'Cada producto abre un chat de WhatsApp pre-rellenado — cero fricción para piezas únicas.' } },
      { icon: '✰', en: { title: 'Image pipeline', text: "Sanity's transform CDN crops and formats every image; lazy-loaded for fast mobile load." }, es: { title: 'Pipeline de imagen', text: 'El CDN de Sanity recorta y formatea cada imagen; lazy-loaded para carga rápida en móvil.' } },
    ],
    arch: ['Sanity Studio', 'Sanity Content API', 'Next.js storefront', 'Nginx', 'WhatsApp / Instagram'],
    stack: {
      frontend: ['Next.js 16', 'Turbopack', 'React', 'Tailwind CSS 4'],
      backend: ['Sanity Studio v5', 'Node.js'],
      devops: ['Docker', 'Nginx'],
    },
    challenges: [
      { en: { title: 'Modeling unique pieces', text: 'Designed Sanity schemas where each product can carry its own size, gender, age range and availability without copy-pasting.' }, es: { title: 'Modelar piezas únicas', text: 'Diseñé esquemas en Sanity donde cada producto lleva su talla, género, edad y disponibilidad sin duplicar.' } },
      { en: { title: 'Editor-first content', text: 'Tuned the studio so a non-technical author can publish a new product in under a minute, with image crops handled automatically.' }, es: { title: 'Contenido para editor primero', text: 'Afiné el studio para que una autora no técnica pueda publicar un producto en menos de un minuto, con crops gestionados automáticamente.' } },
    ],
    links: { live: 'https://algodonconamor.es', github: 'https://github.com/damiancb97/algodomconamor', download: null },
    gallery: [
      { caption: { en: 'Landing — hero + featured products', es: 'Inicio — hero y últimas creaciones' }, render: () => <ImgMock src="/projects/algodon-1.jpg" alt="Algodón landing" /> },
      { caption: { en: 'Catalog page', es: 'Catálogo de productos' }, render: () => <ImgMock src="/projects/algodon-2.jpg" alt="Algodón catalog" /> },
      { caption: { en: 'Product detail on mobile', es: 'Detalle de producto en móvil' }, render: () => <ImgMock src="/projects/algodon-3.jpg" alt="Algodón product detail" /> },
    ],
  },
  {
    id: 'timed',
    slug: 'timed',
    emoji: '⚔',
    accent: 'orange',
    year: '2024–26',
    status: 'active',
    role: { en: 'Full-stack developer', es: 'Desarrollador full-stack' },
    type: { en: 'Web app', es: 'Aplicación web' },
    title: 'Timed',
    tagline: {
      en: 'World of Warcraft guild platform — raid progression, kill stats, M+ leaderboard and Battle.net-authenticated recruitment.',
      es: 'Plataforma para hermandades de World of Warcraft — progreso de raids, stats de kills, leaderboard de M+ y reclutamiento con Battle.net.',
    },
    overview: {
      en: [
        "Timed is the website I built for my own raiding guild on Dun'Modr (EU). It's part recruitment portal, part performance dashboard. The whole content stack is driven by **Warcraft Logs** (GraphQL + OAuth2) for combat data and **Raider.io** (REST) for character profiles and Mythic+ progression, normalized into a single domain model.",
        'The backend is **Django 6.0** on PostgreSQL with scheduled tasks that re-sync data nightly. The site surfaces multiple tiers in parallel — each with normal / heroic / mythic progress bars — plus per-encounter detail pages with kill date, pull count, duration, a **pull-progression chart** and a player performance table.',
        'Members sign in with **Battle.net OAuth**; permissions map to in-game guild ranks. Officers can publish raid schedule changes, open/close recruitment slots and review applications.',
        'Deployed in Docker behind Nginx, exposed externally through a **Cloudflare Tunnel** — no public IP needed.',
      ],
      es: [
        "Timed es la web que construí para mi propia hermandad de raids en Dun'Modr (EU). Es parte portal de reclutamiento, parte dashboard de rendimiento. Todo el contenido lo alimentan **Warcraft Logs** (GraphQL + OAuth2) para datos de combate y **Raider.io** (REST) para perfiles de personaje y progresión de Mítica+, normalizados en un único modelo de dominio.",
        'El backend es **Django 6.0** sobre PostgreSQL con tareas programadas que resincronizan datos cada noche. La web muestra varios tiers en paralelo — cada uno con barras de progreso normal / hero / mítico — más páginas de detalle por encuentro con fecha del kill, intentos, duración, **gráfica de pull progression** y tabla de performance por jugador.',
        'Los miembros entran con **Battle.net OAuth**; los permisos se mapean a los rangos de la hermandad in-game. Los oficiales pueden publicar cambios de horario, abrir/cerrar slots de reclutamiento y revisar aplicaciones.',
        'Desplegado en Docker tras Nginx, expuesto externamente mediante **Cloudflare Tunnel** — sin IP pública.',
      ],
    },
    features: [
      { icon: '⚔', en: { title: 'Per-tier progression', text: 'Boss-by-boss kill history with date, attempts, difficulty and a pull-progress chart.' }, es: { title: 'Progresión por tier', text: 'Historial kill-a-kill con fecha, intentos, dificultad y gráfica de pull progression.' } },
      { icon: '♛', en: { title: 'Player performance', text: 'Per-encounter damage, healing, parse percentile and deaths sourced from Warcraft Logs.' }, es: { title: 'Performance por jugador', text: 'Daño, sanación, percentil de parse y muertes por encuentro extraídos de Warcraft Logs.' } },
      { icon: '♺', en: { title: 'Nightly sync', text: 'Background jobs pull fresh logs, gear and Raider.io profiles every night.' }, es: { title: 'Sync nocturno', text: 'Tareas en background traen logs, gear y perfiles de Raider.io cada noche.' } },
      { icon: '⌘', en: { title: 'Battle.net OAuth', text: 'Members sign in with Blizzard; in-game rank decides what they can edit.' }, es: { title: 'OAuth con Battle.net', text: 'Los miembros entran con Blizzard; el rango in-game decide qué pueden editar.' } },
      { icon: '⛭', en: { title: 'Recruitment portal', text: 'Officers manage Tank / Healer / DPS slots; applicants submit a profile in two clicks.' }, es: { title: 'Portal de reclutamiento', text: 'Los oficiales gestionan slots de Tank / Healer / DPS; los aspirantes mandan perfil en dos clics.' } },
      { icon: '✦', en: { title: 'M+ leaderboard', text: "Mythic+ best keys per dungeon, ranked across the guild's roster." }, es: { title: 'Leaderboard M+', text: 'Mejores keys de Mítica+ por mazmorra, rankeadas dentro del roster.' } },
    ],
    arch: ['Battle.net OAuth', 'Django API', 'PostgreSQL', 'Warcraft Logs GraphQL', 'Raider.io REST', 'Cloudflare Tunnel'],
    stack: {
      frontend: ['Django Templates', 'JavaScript'],
      backend: ['Django 6.0', 'Python', 'GraphQL', 'OAuth2', 'Gunicorn'],
      database: ['PostgreSQL', 'SQLite (dev)'],
      devops: ['Docker', 'Nginx', 'Cloudflare Tunnel'],
    },
    challenges: [
      { en: { title: 'Two APIs, one model', text: 'Warcraft Logs and Raider.io disagree on character identity — built a reconciliation layer with fuzzy matching on realm + name.' }, es: { title: 'Dos APIs, un modelo', text: 'Warcraft Logs y Raider.io no coinciden en identidad de personaje — construí una capa de reconciliación con matching difuso por realm + nombre.' } },
      { en: { title: 'Rate limits', text: "Implemented a job queue with exponential backoff so heavy syncs don't trip Warcraft Logs' rate limiter." }, es: { title: 'Rate limits', text: 'Implementé una cola de jobs con backoff exponencial para que los syncs pesados no tropiecen con el rate limiter de Warcraft Logs.' } },
      { en: { title: 'No public IP', text: 'Cloudflare Tunnel keeps the home server reachable without exposing ports — zero-trust deployment from a residential line.' }, es: { title: 'Sin IP pública', text: 'Cloudflare Tunnel mantiene el servidor casero accesible sin abrir puertos — deployment zero-trust desde una línea residencial.' } },
    ],
    links: { live: 'https://timedgg.com', github: 'https://github.com/damiancb97/timed_django', download: null },
    gallery: [
      { caption: { en: 'Guild home with raid progress', es: 'Inicio con progreso de raid' }, render: () => <ImgMock src="/projects/timed-1.jpg" alt="Timed guild home" /> },
      { caption: { en: 'Per-raid progression view', es: 'Vista de progresión por raid' }, render: () => <ImgMock src="/projects/timed-2.jpg" alt="Timed progress" /> },
      { caption: { en: 'M+ leaderboard', es: 'Leaderboard de Mítica+' }, render: () => <ImgMock src="/projects/timed-3.jpg" alt="Timed leaderboard" /> },
      { caption: { en: 'Roster on mobile', es: 'Roster en móvil' }, render: () => <ImgMock src="/projects/timed-4.jpg" alt="Timed roster mobile" /> },
    ],
  },
  {
    id: 'walkly',
    slug: 'walkly',
    emoji: '🚶',
    accent: 'green',
    year: '2023',
    status: 'active',
    role: { en: 'Mobile developer', es: 'Desarrollador móvil' },
    type: { en: 'Cross-platform app', es: 'App multiplataforma' },
    title: 'Walkly',
    tagline: {
      en: 'Cross-platform fitness tracking app that turns daily steps into calories burned and distance walked — in real time.',
      es: 'App de fitness multiplataforma que convierte los pasos diarios en calorías quemadas y distancia recorrida — en tiempo real.',
    },
    overview: {
      en: [
        "Walkly is a step-tracking app built with Expo and React Native, targeting both iOS and Android from the same codebase. It taps into the device's motion sensors to count steps as they happen, then derives calories burned and distance walked from a tiny profile (weight, stride length).",
        'All data syncs in real time to **Firebase Firestore** so users can pick up where they left off across devices. The app keeps a 7-day rolling history and a streak counter to nudge daily activity.',
        'Auth, persistence and offline sync are handled by Firebase, so the entire backend is serverless — no infrastructure to babysit.',
      ],
      es: [
        'Walkly es una app de seguimiento de pasos construida con Expo y React Native, dirigida tanto a iOS como Android desde el mismo código. Se conecta a los sensores de movimiento del dispositivo para contar pasos en tiempo real, y a partir de un perfil mínimo (peso, longitud de zancada) deriva calorías quemadas y distancia recorrida.',
        'Todos los datos sincronizan en tiempo real con **Firebase Firestore**, así los usuarios pueden seguir donde lo dejaron entre dispositivos. La app mantiene un historial rolling de 7 días y un contador de racha para incentivar actividad diaria.',
        'Auth, persistencia y sync offline los gestiona Firebase, así que todo el backend es serverless — sin infraestructura que mantener.',
      ],
    },
    features: [
      { icon: '⌖', en: { title: 'Real-time step count', text: 'Pedometer events streamed straight from device motion sensors.' }, es: { title: 'Pasos en tiempo real', text: 'Eventos del podómetro directos desde los sensores de movimiento.' } },
      { icon: '♨', en: { title: 'Calorie estimation', text: 'Per-user weight + stride feeds a simple metabolic equivalent model.' }, es: { title: 'Estimación de calorías', text: 'Peso y zancada del usuario alimentan un modelo MET sencillo.' } },
      { icon: '☁', en: { title: 'Cross-device sync', text: 'Firestore keeps history identical on every signed-in device.' }, es: { title: 'Sync entre dispositivos', text: 'Firestore mantiene el historial idéntico en cada dispositivo logueado.' } },
      { icon: '✶', en: { title: 'Streak counter', text: 'Daily goals with a streak that resets only when you actually miss a day.' }, es: { title: 'Contador de racha', text: 'Metas diarias con una racha que solo se rompe si fallas un día de verdad.' } },
    ],
    arch: ['Device sensors', 'React Native + Expo', 'Firebase Auth', 'Firestore'],
    stack: {
      mobile: ['Expo', 'React Native', 'TypeScript'],
      backend: ['Firebase Auth', 'Firestore'],
    },
    challenges: [
      { en: { title: 'Battery vs. precision', text: 'Tuned sensor sampling rate to count accurately without draining the battery on long walks.' }, es: { title: 'Batería vs. precisión', text: 'Ajusté la tasa de muestreo del sensor para contar con precisión sin agotar la batería en caminatas largas.' } },
      { en: { title: 'Offline-first', text: 'Wrote a sync layer that queues writes locally and reconciles when connectivity returns.' }, es: { title: 'Offline-first', text: 'Escribí una capa de sync que encola escrituras localmente y las reconcilia al volver la conexión.' } },
    ],
    links: {
      live: null,
      github: 'https://github.com/damiancb97/walkly',
      download: 'https://expo.dev/accounts/damiancb97/projects/walkly/builds/7efe2a96-6669-49e9-b1be-bdf8f3d60fcd',
    },
    gallery: [
      { caption: { en: 'Daily step counter', es: 'Contador diario de pasos' }, render: WalklyMock1 },
      { caption: { en: 'Weekly history', es: 'Historial semanal' }, render: WalklyMock2 },
      { caption: { en: 'Onboarding splash', es: 'Pantalla de bienvenida' }, render: WalklyMock3 },
    ],
  },
]

export const getProjectBySlug = (slug) => PROJECTS.find(p => p.slug === slug)
