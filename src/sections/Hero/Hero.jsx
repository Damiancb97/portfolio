import { Link } from 'react-router-dom'

function ChatPreview() {
  return (
    <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white/70 backdrop-blur p-4 shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
          <span className="text-sm font-medium text-gray-700">AI personal</span>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-600">Próximamente</span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex gap-2">
          <div className="shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">Tú</div>
          <div className="rounded-2xl rounded-tl-none bg-gray-100 px-3 py-2 text-sm text-gray-700 max-w-[75%]">
            ¿Quién eres y en qué estás trabajando?
          </div>
        </div>

        <div className="flex gap-2 justify-start">
          <div className="shrink-0 h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">IA</div>
          <div className="rounded-2xl rounded-tl-none bg-white border border-gray-200 px-3 py-2 text-sm text-gray-700 max-w-[85%]">
            Soy Damián, desarrollador full‑stack. Ahora mismo estoy diseñando la nueva Home
            para integrar un chat con IA que responda preguntas sobre mi experiencia, proyectos y stack.
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
          <span className="h-2 w-2 rounded-full bg-gray-300 animate-pulse" aria-hidden />
          El chat estará disponible en la próxima versión.
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5 pointer-events-none" />
    </div>
  )
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-white" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

      {/* Content */}
      <div className="px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 mb-4">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" aria-hidden />
          En desarrollo: integrando IA en la Home
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white-900">
          ¡Hola! 👋 Soy <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Damián</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          Desarrollador full‑stack apasionado por crear aplicaciones eficientes y visualmente atractivas.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Ver proyectos
          </Link>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
            title="Disponible próximamente"
          >
            Probar chat IA
            <span className="ml-2 text-[10px] font-normal text-gray-500">(próximamente)</span>
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <ChatPreview />
        </div>
      </div>
    </section>
  )
}

export default Hero