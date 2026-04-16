export default function StreakTracker({ current, best }: { current: number; best: number }) {
  const pct = Math.min(100, (current / Math.max(1, best)) * 100)
  return (
    <div className="stack">
      <div className="row">
        <strong>Current: {current} days</strong>
        <small className="muted">Best: {best} days</small>
      </div>
      <div className="meter">
        <span style={{ width: `${pct}%` }} />
      </div>
      <small className="muted">
        Earn points for consistent learning/investing, not for risky trades.
      </small>
    </div>
  )
}
