import { useState } from 'react'
import AchievementCard from '../shared/AchievementCard'
import { demoAchievements } from '../shared/mock'

export default function Profile() {
  const [level] = useState(12)
  const [exp] = useState(450)
  const maxExp = 1000

  const leaders = [
    { rank: 1, name: 'SIPSensei', level: 42, title: 'Grandmaster' },
    { rank: 2, name: 'DiamondHands', level: 38, title: 'Veteran' },
    { rank: 3, name: 'MarketMaker22', level: 35, title: 'Veteran' },
    { rank: 124, name: 'You', level: 12, title: 'Apprentice' },
    { rank: 125, name: 'NewbieNed', level: 3, title: 'Novice' },
  ]

  return (
    <div className="stack" style={{ gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Player Dashboard
        </h2>
      </div>

      {/* Level & Identity Widget */}
      <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -20, fontSize: '10rem', opacity: 0.1, zIndex: 0, pointerEvents: 'none' }}>
          🛡️
        </div>
        <div className="row" style={{ position: 'relative', zIndex: 1, gap: '24px' }}>
          {/* Avatar Area */}
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            border: '4px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
          }}>
            👤
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '2rem', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
              Investor_One <span className="tag" style={{ border: 'none', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent)', fontSize: '0.9rem' }}>Apprentice</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem' }}>Joined 3 months ago</p>
            
            {/* EXP Bar */}
            <div style={{ marginTop: '24px' }}>
              <div className="row" style={{ justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text)' }}>LVL {level}</span>
                <span style={{ color: 'var(--text-muted)' }}>{exp} / {maxExp} EXP to Next Level</span>
              </div>
              <div style={{
                height: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)'
              }}>
                <div style={{
                  width: `${(exp / maxExp) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent2), var(--accent))',
                  boxShadow: '0 0 10px var(--accent)',
                  transition: 'width 1s ease-in-out'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid cols-3" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        
        {/* Achievements Column */}
        <div className="card stack">
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏆</span> Badges Earned
          </h3>
          <p className="muted" style={{ margin: 0 }}>Unlock badges by maintaining SIPs and passing Learn stages.</p>
          <div className="stack" style={{ gap: '16px', marginTop: '16px' }}>
            {demoAchievements.map(ach => (
              <AchievementCard key={ach.id} achievement={ach} />
            ))}
          </div>
        </div>

        {/* Quest Log / Stats */}
        <div className="card stack">
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📜</span> Quest Log
          </h3>
          <p className="muted" style={{ margin: 0 }}>Your lifetime statistics.</p>
          
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Learning Stages Cleared</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text)' }}>6 <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 6</span></div>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Current SIP Streak</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>🔥 12 <span style={{ fontSize: '1.2rem' }}>Months</span></div>
            </div>
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="card stack" style={{ gridColumn: 'span 1' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🌐</span> Global Leaderboard
          </h3>
          <p className="muted" style={{ margin: 0 }}>Ranked by total Knowledge EXP.</p>
          
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaders.map((l, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                background: l.name === 'You' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.03)',
                border: l.name === 'You' ? '1px solid var(--accent)' : '1px solid var(--glass-border)',
                borderRadius: '12px',
                gap: '16px'
              }}>
                <span style={{ 
                  fontWeight: 800, 
                  color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#b45309' : 'var(--text-muted)',
                  width: '30px',
                  textAlign: 'center'
                }}>
                  #{l.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: l.name === 'You' ? 800 : 500, color: 'var(--text)' }}>{l.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.title}</div>
                </div>
                <div className="tag" style={{ margin: 0, border: 'none', background: 'rgba(255,255,255,0.1)' }}>
                  LVL {l.level}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
