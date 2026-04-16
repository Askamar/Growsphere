import { useEffect, useMemo, useState } from 'react'
import GlossaryTip from '../shared/GlossaryTip'
import { getJSON, setJSON } from '../shared/storage'

const KEY = 'growsphere.sip'

function fvPeriodic(A: number, r: number, n: number, tYears: number) {
  const i = r / n
  return A * ((Math.pow(1 + i, n * tYears) - 1) / i)
}

export default function SIPPlanner() {
  const [weekly, setWeekly] = useState<number>(() => getJSON<number>(KEY, 100))
  const [years, setYears] = useState<number>(5)
  const assumedReturn = 0.08 // 8% conservative nominal average

  useEffect(() => {
    setJSON(KEY, weekly)
  }, [weekly])

  const projection = useMemo(() => {
    const fv = fvPeriodic(weekly, assumedReturn, 52, years)
    const contributed = weekly * 52 * years
    const gains = fv - contributed
    return { fv, contributed, gains }
  }, [weekly, years])

  return (
    <div className="stack" style={{ gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          SIP Projection Planner
        </h2>
      </div>

      <p className="muted" style={{ fontSize: '1.2rem', marginTop: '-16px', maxWidth: '800px' }}>
        See the power of compounding over time safely. Adjust your weekly contributions and time horizon below.
      </p>

      <div className="card" style={{ padding: '40px 32px' }}>
        <div className="row" style={{ gap: '48px', flexWrap: 'wrap' }}>
          <label style={{ flex: 1, minWidth: '250px' }}>
            <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '16px' }}>Weekly Investment Amount (₹)</strong>
            <input
              type="range"
              min={10} max={2000} step={10}
              value={weekly}
              onChange={(e) => setWeekly(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '1.5rem', color: 'var(--accent)', fontWeight: 'bold' }}>
              ₹ {weekly}
            </div>
          </label>

          <label style={{ flex: 1, minWidth: '250px' }}>
            <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '16px' }}>Time Horizon (Years)</strong>
            <input
              type="range"
              min={1} max={40} step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent2)', cursor: 'pointer' }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '1.5rem', color: 'var(--accent2)', fontWeight: 'bold' }}>
              {years} {years === 1 ? 'Year' : 'Years'}
            </div>
          </label>
        </div>
      </div>

      <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div className="tag" style={{ marginBottom: '16px' }}>Total Contributed</div>
          <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text)' }}>
            ₹{projection.contributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontSize: '8rem', opacity: 0.03, pointerEvents: 'none' }}>🏦</div>
        </div>

        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div className="tag" style={{ marginBottom: '16px' }}>Estimated Gains</div>
          <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--success)' }}>
            +₹{projection.gains.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
          <small className="muted" style={{ display: 'block', marginTop: '12px' }}>
            Assumes {Math.round(assumedReturn * 100)}% annual return average
          </small>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontSize: '8rem', opacity: 0.03, pointerEvents: 'none' }}>📈</div>
        </div>

        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(0,0,0,0.2))', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="tag" style={{ marginBottom: '16px', background: 'var(--accent)', color: '#050b14', border: 'none', fontWeight: 'bold' }}>Projected Total</div>
          <h3 style={{ fontSize: '3rem', margin: 0, color: 'var(--accent)' }}>
            ₹{projection.fv.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontSize: '8rem', opacity: 0.05, pointerEvents: 'none' }}>✨</div>
        </div>
      </div>

      <div className="card" style={{ padding: '24px 32px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>💡</span>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              <GlossaryTip term="SIP">
                Systematic Investment Plan: investing a fixed amount at regular intervals. It builds
                discipline and reduces timing risk through cost averaging.
              </GlossaryTip>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              <GlossaryTip term="Assumptions">
                This is an educational projection, not a guarantee. Returns vary; focus on long-term
                consistency and diversification.
              </GlossaryTip>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
