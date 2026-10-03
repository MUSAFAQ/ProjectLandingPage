import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [startTypewriter, setStartTypewriter] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setStartTypewriter(true), 300)
      return () => clearTimeout(t)
    }
  }, [loading])

  return (
    <>
      {loading && <Preloader />}
      <div className={`app-container ${loading ? 'app-container--hidden' : ''}`}>
        <Navbar />
        <main>
          <Hero startTypewriter={startTypewriter} />
          <Features />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
