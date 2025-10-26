import Navbar from './components/Navbar'
import { Hero, About, Projects } from './sections'

function App() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <Hero />
      <About />
      <Projects />
    </div>
  )
}

export default App
