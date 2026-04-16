import RiskMeter from '../shared/RiskMeter'
import GlossaryTip from '../shared/GlossaryTip'
import { demoPortfolio } from '../shared/mock'

export default function Portfolio() {
  const p = demoPortfolio
  return (
    <div className="stack" style={{ gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your Micro-Portfolio
        </h2>
      </div>

      <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div className="tag" style={{ marginBottom: '16px' }}>Current Value</div>
          <h3 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--accent)' }}>₹{p.invested.toFixed(2)}</h3>
          <small className="muted" style={{ display: 'block', marginTop: '12px' }}>Weekly SIP: ₹{p.sip}</small>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontSize: '8rem', opacity: 0.05, pointerEvents: 'none' }}>💰</div>
        </div>

        <div className="card" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div className="tag" style={{ marginBottom: '16px' }}>
            Est. Return (<GlossaryTip term="XIRR">Extended Internal Rate of Return: a way to estimate annualized returns considering multiple cash flows at different times. It’s an estimate, not a promise.</GlossaryTip>)
          </div>
          <h3 className={p.xirr >= 0 ? '' : 'danger'} style={{ fontSize: '2.5rem', margin: 0, color: p.xirr >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            {(p.xirr * 100).toFixed(2)}%
          </h3>
          <small className="muted" style={{ display: 'block', marginTop: '12px' }}>Focus on consistency, not short-term swings</small>
          <div style={{ position: 'absolute', right: '-20px', bottom: '-40px', fontSize: '8rem', opacity: 0.05, pointerEvents: 'none' }}>📈</div>
        </div>

        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div className="tag" style={{ marginBottom: '16px', alignSelf: 'flex-start' }}>
            Risk Level <GlossaryTip term="Diversification">Spreading investments across assets reduces the impact of any single underperformer and smooths risk.</GlossaryTip>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <RiskMeter score={p.riskScore} />
            </div>
          </div>
        </div>
      </div>

      <section className="card" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>📦</span> Holdings Details
        </h3>
        
        <div className="stack" style={{ gap: '16px' }}>
          {p.holdings.map(h => (
            <div key={h.symbol} className="row" style={{ 
              padding: '16px 24px', 
              background: 'rgba(255, 255, 255, 0.02)', 
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              transition: 'transform 0.2s ease, background 0.2s ease',
              flexWrap: 'wrap'
             }}
             onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
             onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
            >
              <div style={{ flex: '2', minWidth: '150px' }}>
                <strong style={{ display: 'block', fontSize: '1.1rem' }}>{h.name}</strong> 
                <span className="tag" style={{ marginTop: '6px' }}>{h.symbol}</span>
              </div>
              <div style={{ flex: 1, textAlign: 'center', minWidth: '100px' }}>
                <small className="muted" style={{ display: 'block', marginBottom: '4px' }}>Quantity</small>
                <strong style={{ fontSize: '1.1rem' }}>{h.qty}</strong>
              </div>
              <div style={{ flex: 1, textAlign: 'center', minWidth: '100px' }}>
                <small className="muted" style={{ display: 'block', marginBottom: '4px' }}>Avg. Price</small>
                <strong style={{ fontSize: '1.1rem' }}>₹{h.avgPrice}</strong>
              </div>
              <div style={{ flex: 1, textAlign: 'right', minWidth: '100px' }}>
                <small className="muted" style={{ display: 'block', marginBottom: '4px' }}>P/L</small>
                <strong className={h.pnl >= 0 ? '' : 'danger'} style={{ color: h.pnl >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: '1.1rem' }}>
                  {h.pnl >= 0 ? '+' : ''}₹{h.pnl.toFixed(2)}
                </strong>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '32px', padding: '16px 24px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent2)' }}>
          <small className="muted" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
            <strong>💡 Educational Note:</strong> Each holding here represents a fractional investment. Keeping a diverse portfolio limits downside risks during market volatility.
          </small>
        </div>
      </section>
    </div>
  )
}
