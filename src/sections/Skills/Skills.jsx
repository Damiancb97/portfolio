function Skills() {
  return (
    <section id="skills" className="">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Habilidades</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <li className="p-4 bg-white rounded-lg shadow-sm text-black">JavaScript</li>
          <li className="p-4 bg-white rounded-lg shadow-sm text-black">React</li>
          <li className="p-4 bg-white rounded-lg shadow-sm text-black">Node.js</li>
          <li className="p-4 bg-white rounded-lg shadow-sm text-black">Tailwind CSS</li>
        </ul>
      </div>
    </section>
  )
}

export default Skills