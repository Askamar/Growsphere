import { useState } from 'react';

const mockData = [
  { symbol: 'NIFTY 50', val: '22,400.50', up: true },
  { symbol: 'SENSEX', val: '73,900.20', up: true },
  { symbol: 'NASDAQ', val: '16,200.00', up: false },
  { symbol: 'GOLD', val: '₹62,500/10g', up: true },
  { symbol: 'BTC', val: '$68,400', up: true },
  { symbol: 'ETH', val: '$3,800', up: false },
  { symbol: 'NIFTY BANK', val: '47,200.80', up: true },
];

export default function MarketTicker() {
  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.03)',
      borderBottom: '1px solid var(--glass-border)',
      padding: '8px 0',
      display: 'flex',
      whiteSpace: 'nowrap',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      zIndex: 50
    }}>
      <style>
        {`
          @keyframes scrollTicker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-track {
            display: inline-flex;
            animation: scrollTicker 20s linear infinite;
          }
          .ticker-track:hover {
            animation-play-state: paused;
          }
          .ticker-item {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 0 24px;
            font-size: 0.9rem;
            font-weight: 500;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }
        `}
      </style>
      <div className="ticker-track">
        {[...mockData, ...mockData].map((item, i) => (
          <div key={i} className="ticker-item">
            <span style={{ color: 'var(--text)' }}>{item.symbol}</span>
            <span style={{ color: item.up ? '#10b981' : '#ef4444' }}>
              {item.val} {item.up ? '▲' : '▼'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
