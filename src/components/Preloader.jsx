import { useEffect, useState } from 'react'
import { Rocket } from './Icons'
import './Preloader.css'

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      const step = Math.random() * 8 + 3
      current = Math.min(current + step, 100)
      setProgress(Math.floor(current))
      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => setExiting(true), 400)
      }
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`preloader ${exiting ? 'preloader--exit' : ''}`}>
      <div className="preloader__curtain preloader__curtain--1" />
      <div className="preloader__content">
        <div className="preloader__logo">
          <span className="preloader__logo-mark" aria-hidden="true">
            <Rocket size={22} />
          </span>
          <span className="preloader__logo-text">MyProject</span>
        </div>
        <div className="preloader__bar">
          <div className="preloader__bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader__info">
          <span className="preloader__label">Menyiapkan pengalaman...</span>
          <span className="preloader__percent">{progress}%</span>
        </div>
      </div>
      <div className="preloader__curtain preloader__curtain--2" />
    </div>
  )
}

export default Preloader
