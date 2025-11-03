export default function About() {
  return (
    <section className="bg-card p-8 rounded-2xl shadow-soft mb-6">
      <h1 className="text-3xl font-bold mb-4 text-accent">About Me</h1>
      <p className="text-gray-300 leading-relaxed">
Soy un desarrollador Full Stack con especial interés en el backend, actualmente enfocado en Java Spring Boot. Me apasiona crear aplicaciones web que combinen buen rendimiento, arquitectura limpia y una experiencia de usuario fluida.

Comencé en el desarrollo web trabajando tanto en el frontend (HTML, CSS, JavaScript, React, Vue.js) como en el backend, lo que me ha dado una visión completa del ciclo de vida de una aplicación. Actualmente disfruto profundizando en la lógica de negocio, las APIs y la integración con bases de datos, buscando siempre escribir código claro, escalable y mantenible.

Soy una persona entusiasta, curiosa y con muchas ganas de aprender. Me motiva enfrentar nuevos retos y seguir creciendo profesionalmente, tanto en el ámbito técnico como en el trabajo en equipo.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">What I'm Doing</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-dark p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
          <p className="text-gray-400">
            Professional development of applications for Android and iOS.
          </p>
        </div>
        <div className="bg-dark p-6 rounded-xl shadow-soft">
          <h3 className="text-xl font-semibold mb-2">Web Development</h3>
          <p className="text-gray-400">
            High-quality development of sites at the professional level.
          </p>
        </div>
      </div>
    </section>
  );
}
