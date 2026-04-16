import { Link } from 'react-router-dom'
import AchievementCard from '../shared/AchievementCard'
import StreakTracker from '../shared/StreakTracker'
import RiskMeter from '../shared/RiskMeter'
import { demoAchievements, demoPortfolio } from '../shared/mock'
import MarketTicker from '../shared/MarketTicker'

export default function Home() {
  return (
    <div className="stack" style={{ gap: '48px' }}>
      <MarketTicker />
      <section className="hero-section" style={{
        position: 'relative',
        padding: '64px 32px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))',
        borderRadius: '24px',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.2 }}>
            Micro-Investing, made approachable
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px', color: 'var(--text-muted)' }}>
            Start with as little as ₹100. Learn as you go with transparent, educational nudges—not hype. Earn milestones for good habits, not risky bets.
          </p>
          <div className="row" style={{ justifyItems: 'center', justifyContent: 'center', gap: '24px' }}>
            <Link to="/onboarding" className="btn" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '12px' }}>Get Started Now</Link>
            <Link to="/learn" className="btn secondary" style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '12px' }}>Explore the Basics</Link>
          </div>
        </div>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px',
          background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', zIndex: 1
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px',
          background: 'var(--accent2)', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', zIndex: 1
        }} />
      </section>

      <section>
        <h2 style={{ marginBottom: '24px', fontSize: '1.8rem', paddingLeft: '8px' }}>Your Financial Journey</h2>
        <div className="grid cols-3">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="row" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '1.5rem', display: 'block' }}>📊</span>
              </div>
              <h3 style={{ margin: 0 }}>Risk Meter</h3>
            </div>
            <p className="warn" style={{ marginBottom: 'auto' }}>Explained clearly—no jargon.</p>
            <div style={{ marginTop: '24px' }}>
              <RiskMeter score={demoPortfolio.riskScore} />
              <p className="tag">Diversification · Time-in-market</p>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="row" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '1.5rem', display: 'block' }}>🏆</span>
              </div>
              <h3 style={{ margin: 0 }}>Latest Achievement</h3>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <AchievementCard achievement={demoAchievements[0]} />
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="row" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px' }}>
                <span style={{ fontSize: '1.5rem', display: 'block' }}>🔥</span>
              </div>
              <h3 style={{ margin: 0 }}>Learning Streak</h3>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <StreakTracker current={4} best={12} />
              <p className="muted" style={{ marginTop: '16px', fontSize: '0.9rem' }}>Daily 2-minute learning keeps compounding.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '24px', fontSize: '1.8rem', paddingLeft: '8px' }}>Take Action</h2>
        <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '32px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="row" style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '2.5rem' }}>🎯</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Set Goals</h3>
              </div>
              <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '24px', maxWidth: '80%' }}>
                Keep investing purposeful. Track progress and add small amounts towards your dreams.
              </p>
              <Link to="/goals" className="btn">Open Goals</Link>
            </div>
             <div style={{ position: 'absolute', bottom: -40, right: -40, fontSize: '12rem', opacity: 0.03, zIndex: 1, pointerEvents: 'none' }}>🎯</div>
          </div>
          
          <div className="card" style={{ position: 'relative', overflow: 'hidden', padding: '32px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="row" style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '2.5rem' }}>📅</span>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>SIP Planner</h3>
              </div>
              <p className="muted" style={{ fontSize: '1.1rem', marginBottom: '24px', maxWidth: '80%' }}>
                Plan weekly automated investments and visualize your compounding projection safely.
              </p>
              <Link to="/sip" className="btn">Open Planner</Link>
            </div>
            <div style={{ position: 'absolute', bottom: -40, right: -40, fontSize: '12rem', opacity: 0.03, zIndex: 1, pointerEvents: 'none' }}>📅</div>
          </div>
        </div>
      </section>
    </div>
  )
}
