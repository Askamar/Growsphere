import type { Achievement } from './AchievementCard'

export const demoAchievements: Achievement[] = [
  {
    id: 'first-sip',
    title: 'First SIP set',
    description: 'You set up a small, regular investment. Time in market > timing the market.',
    points: 50,
  },
  {
    id: 'diversified',
    title: 'Diversified start',
    description: 'You spread investments across at least 3 assets.',
    points: 30,
  },
]

export const demoPortfolio = {
  invested: 1200,
  sip: 100,
  xirr: 0.042,
  riskScore: 45,
  holdings: [
    { symbol: 'NIFTY50', name: 'Index Fund', qty: 2, avgPrice: 200, pnl: 25.4 },
    { symbol: 'GOLD', name: 'Gold ETF', qty: 1, avgPrice: 600, pnl: -5.2 },
    { symbol: 'DEBT', name: 'Debt Fund', qty: 3, avgPrice: 133, pnl: 4.1 },
  ],
}

export const demoFunds = [
  {
    id: 'nifty50-index',
    name: 'NIFTY 50 Index Fund',
    category: 'index' as const,
    summary: 'Broad Indian market exposure via the NIFTY 50 constituents. Low-cost and diversified.',
    expenseRatio: 0.0035,
    risk: 55,
    min: 100,
    tracks: 'NIFTY 50',
  },
  {
    id: 'sensex-index',
    name: 'SENSEX Index Fund',
    category: 'index' as const,
    summary: 'Tracks 30 large companies. Simple, diversified equity exposure for long-term goals.',
    expenseRatio: 0.004,
    risk: 58,
    min: 100,
    tracks: 'SENSEX',
  },
  {
    id: 'gold-etf',
    name: 'Gold ETF',
    category: 'gold' as const,
    summary: 'Gold-price exposure through the stock market. Useful diversifier; short-term swings possible.',
    expenseRatio: 0.006,
    risk: 40,
    min: 100,
    tracks: 'Domestic Gold Price',
  },
  {
    id: 'short-term-debt',
    name: 'Short-Term Debt Fund',
    category: 'debt' as const,
    summary: 'Invests in short-duration bonds for stability. Suitable for near-term goals.',
    expenseRatio: 0.002,
    risk: 20,
    min: 100,
    tracks: 'Bond Basket',
  },
]
