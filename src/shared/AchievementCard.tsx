export type Achievement = {
  id: string
  title: string
  description: string
  points: number
}

export default function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="stack">
      <strong>{achievement.title}</strong>
      <p className="muted">{achievement.description}</p>
      <div className="row">
        <div className="tag">+{achievement.points} pts</div>
        <small className="muted">Earned for good investing habits</small>
      </div>
    </div>
  )
}
