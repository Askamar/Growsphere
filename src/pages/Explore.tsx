import { useState } from 'react'

const mostBought = [
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: 2954.20, change: 12.50, pChange: 0.42, logo: '🏢' },
  { symbol: 'TCS', name: 'Tata Consultancy', price: 3890.15, change: 45.30, pChange: 1.18, logo: '💻' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1450.90, change: -15.20, pChange: -1.04, logo: '🏦' },
  { symbol: 'INFY', name: 'Infosys Ltd.', price: 1420.55, change: 25.40, pChange: 1.82, logo: '🌐' },
]

const topGainers = [
  { symbol: 'TVSMOTOR', price: 2145.60, change: 120.40, pChange: 5.95 },
  { symbol: 'ZOMATO', price: 195.40, change: 10.20, pChange: 5.51 },
  { symbol: 'IRFC', price: 145.80, change: 7.10, pChange: 5.12 },
  { symbol: 'SUZLON', price: 42.15, change: 1.95, pChange: 4.85 },
]

const topLosers = [
  { symbol: 'PAYTM', price: 410.20, change: -22.10, pChange: -5.11 },
  { symbol: 'WIPRO', price: 480.90, change: -15.40, pChange: -3.10 },
  { symbol: 'ITC', price: 425.50, change: -8.20, pChange: -1.89 },
  { symbol: 'HINDUNILVR', price: 2240.10, change: -35.60, pChange: -1.56 },
]

export default function Explore() {
  const [moverTab, setMoverTab] = useState<'gainers' | 'losers'>('gainers')

  const activeMovers = moverTab === 'gainers' ? topGainers : topLosers

  return (
    <div className="stack" style={{ gap: '48px' }}>
      
      {/* 1. Most Bought Section */}
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Most bought on GrowSphere</h2>
        <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {mostBought.map(stock => (
            <div key={stock.symbol} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--glass-border)' }}>
                {stock.logo}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{stock.name}</h3>
                <span className="muted" style={{ fontSize: '0.9rem' }}>{stock.symbol}</span>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>₹{stock.price.toFixed(2)}</div>
                <div style={{ color: stock.change >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 500, fontSize: '0.95rem' }}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.pChange >= 0 ? '+' : ''}{stock.pChange.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Top Movers Today */}
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Top movers today</h2>
        
        <div className="row" style={{ marginBottom: '24px', gap: '12px' }}>
          <button 
            onClick={() => setMoverTab('gainers')}
            style={{ 
              padding: '8px 24px', 
              borderRadius: '24px', 
              border: moverTab === 'gainers' ? '1px solid var(--success)' : '1px solid var(--glass-border)',
              background: moverTab === 'gainers' ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
              color: moverTab === 'gainers' ? 'var(--success)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            Gainers
          </button>
          <button 
            onClick={() => setMoverTab('losers')}
            style={{ 
              padding: '8px 24px', 
              borderRadius: '24px', 
              border: moverTab === 'losers' ? '1px solid var(--danger)' : '1px solid var(--glass-border)',
              background: moverTab === 'losers' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              color: moverTab === 'losers' ? 'var(--danger)' : 'var(--text-muted)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s'
            }}
          >
            Losers
          </button>
        </div>

        <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          {activeMovers.map(stock => (
            <div key={stock.symbol} className="card" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem' }}>{stock.symbol}</h3>
              <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>₹{stock.price.toFixed(2)}</div>
              <div style={{ color: stock.change >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 500, fontSize: '0.95rem' }}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.pChange >= 0 ? '+' : ''}{stock.pChange.toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Products & Tools Mock (To match Groww's layout) */}
      <section>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Products & Tools</h2>
        <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div className="card row" style={{ padding: '24px', cursor: 'pointer' }}>
            <span style={{ fontSize: '2rem' }}>🚀</span>
            <div>
              <h3 style={{ margin: 0 }}>IPO</h3>
              <span className="muted" style={{ fontSize: '0.9rem' }}>3 open</span>
            </div>
          </div>
          <div className="card row" style={{ padding: '24px', cursor: 'pointer' }}>
            <span style={{ fontSize: '2rem' }}>📈</span>
            <div>
              <h3 style={{ margin: 0 }}>F&O</h3>
              <span className="muted" style={{ fontSize: '0.9rem' }}>Derivatives</span>
            </div>
          </div>
          <div className="card row" style={{ padding: '24px', cursor: 'pointer' }}>
            <span style={{ fontSize: '2rem' }}>💰</span>
            <div>
              <h3 style={{ margin: 0 }}>SGB</h3>
              <span className="muted" style={{ fontSize: '0.9rem' }}>Gold Bonds</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
