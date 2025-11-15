// ...existing code...
function Skills() {
  return (
    <section id="skills" className="">
      <div className="w-full max-w-none px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>

        {/* Row: Technical skills */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-black">Technical Skills</h3>
          <ul className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Java</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Spring Boot</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">React</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">JavaScript</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">TypeScript</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Node.js</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Python</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Django</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">SQL</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Git</li>
            <li className="px-4 py-2 bg-gray-50 rounded-full border border-gray-200 text-black">Tailwind CSS</li>
          </ul>op
        </div>

        {/* Row: Soft skills */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-black">Soft Skills</h3>
          <ul className="list-disc pl-6 text-black space-y-2">
            <li>Teamwork and effective collaboration.</li>
            <li>Ability for organization and time management.</li>
            <li>Problem-solver, focused on practical and efficient solutions.</li>
            <li>Adaptable to change and quick to learn new technologies.</li>
            <li>Self-taught, constantly seeking learning and improvement.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
// ...existing code...
export default Skills