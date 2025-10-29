// App.jsx
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero/Hero';
import About from './sections/About/About';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Contact from './sections/Contact/Contact';

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal / Body */}
      <main className="flex-1 p-6 md:ml-6">
        {/* Contenedor marcado */}
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-screen flex flex-col">
          
          {/* Menú de navegación arriba a la derecha */}
          <div className="flex justify-end gap-4 mb-6">
            <a href="#about" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              About
            </a>
            <a href="#projects" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              Projects
            </a>
            <a href="#skills" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              Skills
            </a>
            <a href="#contact" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
              Contact
            </a>
          </div>

          {/* Contenido de las secciones */}
          <section id="hero" className="mb-12">
            <Hero />
          </section>

          <section id="about" className="mb-12">
            <About />
          </section>

          <section id="projects" className="mb-12">
            <Projects />
          </section>

          <section id="skills" className="mb-12">
            <Skills />
          </section>

          <section id="contact" className="scroll-smooth">
            <Contact />
          </section>
        </div>
      </main>
    </div>
  );
}
