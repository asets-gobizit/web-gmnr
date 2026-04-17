import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
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
import RenewableEnergy from './pages/RenewableEnergy'

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

function AppLayout() {
  return (
    <LanguageProvider>
      <div className="bg-white text-navy-dark">
        <Navbar />
        <main>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="projects/carbon-ets" element={<CarbonEts />} />
            <Route path="projects/renewable-energy" element={<RenewableEnergy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/es/*" element={<AppLayout />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
