type Props = { score: number } // 0 to 100

export default function RiskMeter({ score }: Props) {
  const color =
    score < 33 ? '#4ade80' : score < 66 ? '#fbbf24' : '#f87171'
  const label =
    score < 33 ? 'Conservative' : score < 66 ? 'Balanced' : 'Aggressive'
  return (
    <div className="stack">
      <div className="meter">
        <span style={{ width: `${score}%`, background: color }} />
      </div>
      <div className="row">
        <small className="muted">Risk Level:</small>
        <strong style={{ color }}>{label}</strong>
      </div>
      <small className="muted">
        Risk measures short-term ups/downs. Long-term discipline matters more.
      </small>
    </div>
  )
}
