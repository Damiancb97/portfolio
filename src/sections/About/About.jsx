export default function About() {
  return (
    <section className="bg-card p-8 rounded-2xl shadow-soft mb-6">
      <h1 className="text-3xl font-bold mb-4 text-accent">About Me</h1>
      <p className="text-gray-300 leading-relaxed">
        A passionate Flutter developer with strong expertise in cross-platform apps, REST APIs,
        UI/UX, widgets, and state management solutions...
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
