import { useState } from 'react'
import { Link } from 'react-router-dom'

type Step = 1 | 2 | 3

export default function Onboarding() {
  const [step, setStep] = useState<Step>(1)
  const [goal, setGoal] = useState<'learn' | 'wealth' | null>(null)
  const [horizon, setHorizon] = useState<'short' | 'medium' | 'long' | null>(null)
  const [comfort, setComfort] = useState<'low' | 'medium' | 'high' | null>(null)
  
  const canNext =
    step === 1 ? goal !== null :
    step === 2 && goal === 'wealth' ? horizon !== null && comfort !== null :
    true

  const next = () => {
    if (!canNext) return
    setStep(s => (s < 3 ? (s + 1) as Step : s))
  }
  
  const back = () => setStep(s => (s > 1 ? (s - 1) as Step : s))

  return (
    <div className="stack" style={{ maxWidth: '800px', margin: '0 auto', gap: '32px' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>
          Getting to know you
        </h2>
        <div className="row" style={{ justifyContent: 'center', gap: '12px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              width: '12px', height: '12px', borderRadius: '50%',
              background: s === step ? 'var(--accent)' : (s < step ? 'var(--accent)' : 'var(--glass-border)'),
              opacity: s === step ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: '40px' }}>
        {step === 1 && (
          <section className="stack" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <p style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '32px' }}>What is your primary goal?</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <div 
                onClick={() => { setGoal('learn'); setStep(2); }}
                style={{
                  padding: '32px', borderRadius: '16px', border: `2px solid ${goal === 'learn' ? 'var(--accent)' : 'var(--glass-border)'}`,
                  background: goal === 'learn' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease',
                  boxShadow: goal === 'learn' ? '0 8px 24px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📚</div>
                <strong style={{ fontSize: '1.2rem', display: 'block' }}>Learn investing</strong>
                <p className="muted" style={{ marginTop: '8px' }}>I want to understand the basics safely.</p>
              </div>

              <div 
                onClick={() => { setGoal('wealth'); setStep(2); }}
                style={{
                  padding: '32px', borderRadius: '16px', border: `2px solid ${goal === 'wealth' ? 'var(--accent2)' : 'var(--glass-border)'}`,
                  background: goal === 'wealth' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s ease',
                  boxShadow: goal === 'wealth' ? '0 8px 24px rgba(59, 130, 246, 0.2)' : 'none'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌱</div>
                <strong style={{ fontSize: '1.2rem', display: 'block' }}>Build long-term wealth</strong>
                <p className="muted" style={{ marginTop: '8px' }}>I am ready to plan my portfolio.</p>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {goal === 'learn' && (
              <section className="stack">
                <p style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '32px' }}>Choose where to start learning.</p>
                <div className="grid cols-3" style={{ gap: '20px' }}>
                  <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                    <strong style={{ display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>Compounding basics</strong>
                    <p className="muted" style={{ marginBottom: '24px' }}>Small, regular steps lead to big outcomes.</p>
                    <Link className="btn secondary" to="/learn" style={{ width: '100%' }}>Open</Link>
                  </div>
                  <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                    <strong style={{ display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>Diversification</strong>
                    <p className="muted" style={{ marginBottom: '24px' }}>Spread risk across assets to reduce surprises.</p>
                    <Link className="btn secondary" to="/learn" style={{ width: '100%' }}>Open</Link>
                  </div>
                  <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
                    <strong style={{ display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>What is SIP?</strong>
                    <p className="muted" style={{ marginBottom: '24px' }}>Invest a fixed amount regularly to average costs.</p>
                    <Link className="btn secondary" to="/learn" style={{ width: '100%' }}>Open</Link>
                  </div>
                </div>
                <small className="muted" style={{ display: 'block', textAlign: 'center', marginTop: '16px' }}>You can always revisit topics in the Learn section.</small>
              </section>
            )}
            
            {goal === 'wealth' && (
              <section className="stack">
                <p style={{ fontSize: '1.3rem', textAlign: 'center', marginBottom: '32px' }}>Help us tailor a simple starting plan.</p>
                <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                  <label className="stack" style={{ gap: '12px' }}>
                    <strong style={{ fontSize: '1.1rem' }}>⏳ Time horizon</strong>
                    <select
                      value={horizon ?? ''}
                      onChange={(e) => setHorizon((e.target.value || null) as any)}
                      style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text)', fontSize: '1.1rem', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select horizon</option>
                      <option value="short">0–2 years</option>
                      <option value="medium">3–5 years</option>
                      <option value="long">5+ years</option>
                    </select>
                  </label>
                  
                  <label className="stack" style={{ gap: '12px' }}>
                    <strong style={{ fontSize: '1.1rem' }}>🎢 Comfort with ups/downs</strong>
                    <select
                      value={comfort ?? ''}
                      onChange={(e) => setComfort((e.target.value || null) as any)}
                      style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text)', fontSize: '1.1rem', cursor: 'pointer' }}
                    >
                      <option value="" disabled>Select comfort level</option>
                      <option value="low">Low (Conservative)</option>
                      <option value="medium">Medium (Moderate)</option>
                      <option value="high">High (Aggressive)</option>
                    </select>
                  </label>
                </div>
                <div style={{ marginTop: '32px', padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent2)' }}>
                  <small className="muted" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    <strong>💡 Note:</strong> Answers guide education and suggested starting points—not guarantees.
                  </small>
                </div>
              </section>
            )}
          </div>
        )}

        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {goal === 'learn' && (
              <section className="stack" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Great. Let’s start with learning.</h3>
                <p className="muted" style={{ fontSize: '1.2rem', marginBottom: '32px' }}>Spend just 2 minutes daily. Consistency compounds.</p>
                <div className="row" style={{ justifyContent: 'center', gap: '24px' }}>
                  <Link className="btn" style={{ padding: '16px 32px', fontSize: '1.1rem' }} to="/learn">Go to Learning Hub</Link>
                  <Link className="btn secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }} to="/portfolio">See Demo Portfolio</Link>
                </div>
              </section>
            )}
            
            {goal === 'wealth' && (
              <section className="stack">
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <div className="tag" style={{ background: 'var(--accent)', color: '#050b14', fontWeight: 'bold' }}>Plan Generated</div>
                  <h3 style={{ fontSize: '1.8rem', marginTop: '16px' }}>Based on your answers, here’s a simple starting point.</h3>
                </div>
                <div className="grid cols-3" style={{ gap: '24px' }}>
                  <div className="card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <div className="tag" style={{ marginBottom: '16px' }}>Recommendation</div>
                    <strong style={{ display: 'block', fontSize: '1.3rem', marginBottom: '12px' }}>
                      {recommendationTitle(horizon, comfort)}
                    </strong>
                    <p className="muted" style={{ lineHeight: 1.6 }}>{recommendationText(horizon, comfort)}</p>
                  </div>
                  <div className="card">
                    <div className="tag" style={{ marginBottom: '16px' }}>Next Steps</div>
                    <p style={{ marginBottom: '24px', lineHeight: 1.6 }}>Set up a small weekly SIP and review basics.</p>
                    <div className="stack" style={{ gap: '12px' }}>
                      <Link className="btn" to="/sip" style={{ width: '100%' }}>Open SIP Planner</Link>
                      <Link className="btn secondary" to="/explore" style={{ width: '100%' }}>Explore</Link>
                    </div>
                  </div>
                  <div className="card">
                    <div className="tag" style={{ marginBottom: '16px' }}>Stay Informed</div>
                    <p style={{ marginBottom: '24px', lineHeight: 1.6 }}>Learn about diversification and managing risk properly.</p>
                    <Link className="btn secondary" to="/learn" style={{ width: '100%' }}>Open Learning Hub</Link>
                  </div>
                </div>
                <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <small className="muted">
                    Educational guidance only. Choose what fits your situation.
                  </small>
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <div className="row" style={{ justifyContent: 'space-between', padding: '0 16px' }}>
        <button 
          className="btn secondary" 
          onClick={back} 
          style={{ opacity: step > 1 ? 1 : 0, pointerEvents: step > 1 ? 'auto' : 'none', padding: '12px 32px' }}
        >
          &larr; Back
        </button>
        <button 
          className="btn" 
          onClick={next} 
          disabled={!canNext} 
          style={{ display: step === 3 ? 'none' : 'block', padding: '12px 32px' }}
        >
          Continue &rarr;
        </button>
      </div>
    </div>
  )
}

function recommendationTitle(
  horizon: 'short' | 'medium' | 'long' | null,
  comfort: 'low' | 'medium' | 'high' | null
) {
  if (!horizon || !comfort) return 'Personalize your plan'
  if (horizon === 'short' || comfort === 'low') return 'Focus on stability'
  if (horizon === 'long' && (comfort === 'medium' || comfort === 'high')) return 'Index fund SIP + diversification'
  return 'Balanced approach'
}

function recommendationText(
  horizon: 'short' | 'medium' | 'long' | null,
  comfort: 'low' | 'medium' | 'high' | null
) {
  if (!horizon || !comfort) return 'Answer a couple of questions to tailor suggestions.'
  if (horizon === 'short' || comfort === 'low')
    return 'Prioritize debt funds and an emergency cushion. Keep equity limited until comfort grows.'
  if (horizon === 'long' && (comfort === 'medium' || comfort === 'high'))
    return 'Consider a low-cost index fund SIP with some gold/debt for balance. Focus on consistency.'
  return 'Start with a small equity SIP alongside a debt fund to smooth volatility.'
}
