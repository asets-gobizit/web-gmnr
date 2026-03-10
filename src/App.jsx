import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Pain from './components/Pain'
import Solution from './components/Solution'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Blog from './components/Blog'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import BlogPost from './pages/BlogPost'
import CarbonEts from './pages/CarbonEts'

function HomePage() {
  return (
    <>
      <Hero />
      <Pain />
      <Solution />
      <Process />
      <Testimonials />
      <About />
      <Blog />
      <FinalCTA />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white text-navy-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects/carbon-ets" element={<CarbonEts />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
