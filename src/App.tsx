import { useEffect, useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Portfolio from './pages/Portfolio'
import Learn from './pages/Learn'
import Goals from './pages/Goals'
import SIPPlanner from './pages/SIPPlanner'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import { getJSON, setJSON } from './shared/storage'
import AIChatbot from './shared/AIChatbot'

export default function App() {
  const [theme, setTheme] = useState<string>(() => getJSON<string>('growsphere.theme', 'dark'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    setJSON('growsphere.theme', theme)
  }, [theme])

  return (
    <div className="app">
      <header className="header">
        <div className="brand">GrowSphere</div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/onboarding">Onboarding</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/goals">Goals</NavLink>
          <NavLink to="/sip">SIP Planner</NavLink>
          <button
            className="btn secondary"
            style={{ marginLeft: 12 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'Light' : 'Dark'} Theme
          </button>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/sip" element={<SIPPlanner />} />
        </Routes>
      </main>
      <footer className="footer">
        <small>Investments are subject to market risk. Learn before you invest.</small>
      </footer>
      <AIChatbot />
    </div>
  )
}
