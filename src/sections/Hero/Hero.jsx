function Hero() {
  return (
    <section
      id="hero"
      className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">¡Hola! 👋 Soy Damián</h1>
      <p className="text-lg text-gray-600 max-w-lg text-center">
        Desarrollador full-stack apasionado por crear aplicaciones eficientes y visualmente atractivas.
      </p>
      <a
        href="#projects"
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
      >
        Ver mis proyectos
      </a>
    </section>
  )
}

export default Hero
