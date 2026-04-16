import { useMemo, useState } from 'react'
import GlossaryTip from '../shared/GlossaryTip'
import { demoFunds } from '../shared/mock'

type Filter = {
  category: 'all' | 'index' | 'gold' | 'debt'
  maxRisk: number
}

export default function Explore() {
  const [filter, setFilter] = useState<Filter>({ category: 'all', maxRisk: 100 })

  const funds = useMemo(() => {
    return demoFunds.filter((f) => {
      const catOk = filter.category === 'all' ? true : f.category === filter.category
      const riskOk = f.risk <= filter.maxRisk
      return catOk && riskOk
    })
  }, [filter])

  return (
    <div className="stack">
      <section className="card">
        <h2>Explore</h2>
        <p className="muted">
          Browse beginner-friendly options. Focus on diversified, low-cost funds first.
        </p>
        <div className="row">
          <label>
            <strong>Category</strong>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value as Filter['category'] })}
              style={{ marginLeft: 8, padding: 8, borderRadius: 8, border: '1px solid #1f2937', background: '#0b1220', color: 'var(--text)' }}
            >
              <option value="all">All</option>
              <option value="index">Index Funds</option>
              <option value="gold">Gold ETFs</option>
              <option value="debt">Debt Funds</option>
            </select>
          </label>
          <label>
            <strong>Max risk</strong>
            <input
              type="range"
              min={0}
              max={100}
              value={filter.maxRisk}
              onChange={(e) => setFilter({ ...filter, maxRisk: Number(e.target.value) })}
              style={{ marginLeft: 8, width: 160 }}
            />
            <span className="tag" style={{ marginLeft: 8 }}>{filter.maxRisk}</span>
          </label>
        </div>
      </section>
      <section className="grid cols-3">
        {funds.map((f) => (
          <div key={f.id} className="card">
            <div className="row">
              <strong>{f.name}</strong>
              <span className="tag">{labelForCategory(f.category)}</span>
            </div>
            <p className="muted">{f.summary}</p>
            <div className="row">
              <div>
                <div className="tag">Expense Ratio (<GlossaryTip term="Expense Ratio">The annual fee as a percentage of your investment that the fund charges to operate. Lower is generally better for long-term returns.</GlossaryTip>)</div>
                <strong>{(f.expenseRatio * 100).toFixed(2)}%</strong>
              </div>
              <div>
                <div className="tag">Risk</div>
                <strong className={riskClass(f.risk)}>{riskLabel(f.risk)} ({f.risk})</strong>
              </div>
            </div>
            <div className="row" style={{ marginTop: 8 }}>
              <small className="muted">Min investment: ₹{f.min}</small>
              <small className="muted">Tracks: {f.tracks}</small>
            </div>
          </div>
        ))}
      </section>
      <section className="card">
        <div>
          <GlossaryTip term="Index Fund">
            A basket of stocks designed to match a market index (like NIFTY 50). It offers broad diversification and usually low fees. Suitable for long-term investing.
          </GlossaryTip>
          {' · '}
          <GlossaryTip term="Debt Fund">
            Invests mainly in bonds and money market instruments. Lower volatility than equities but returns may be modest. Useful for stability and short-term goals.
          </GlossaryTip>
          {' · '}
          <GlossaryTip term="Gold ETF">
            Allows investing in gold price movements via the stock market. Useful as a diversifier; prices can swing in the short term.
          </GlossaryTip>
        </div>
      </section>
    </div>
  )
}

function labelForCategory(cat: 'index' | 'gold' | 'debt') {
  if (cat === 'index') return 'Index'
  if (cat === 'gold') return 'Gold'
  return 'Debt'
}

function riskLabel(risk: number) {
  if (risk < 33) return 'Low'
  if (risk < 66) return 'Medium'
  return 'High'
}

function riskClass(risk: number) {
  if (risk < 33) return ''
  if (risk < 66) return ''
  return 'danger'
}
