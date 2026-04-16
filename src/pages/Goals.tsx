import { useEffect, useState } from 'react'
import { getJSON, setJSON } from '../shared/storage'

type Goal = {
  id: string
  name: string
  target: number
  saved: number
}

const KEY = 'growsphere.goals'

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(() =>
    getJSON<Goal[]>(KEY, [
      { id: 'starter', name: 'Emergency cushion', target: 5000, saved: 300 },
    ])
  )
  const [name, setName] = useState('')
  const [target, setTarget] = useState<number>(1000)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editTarget, setEditTarget] = useState<number>(0)

  const startEdit = (g: Goal) => {
    setEditingId(g.id)
    setEditName(g.name)
    setEditTarget(g.target)
  }

  const saveEdit = (id: string) => {
    if (!editName.trim() || editTarget <= 0) return
    setGoals((g) =>
      g.map((goal) => (goal.id === id ? { ...goal, name: editName.trim(), target: editTarget } : goal))
    )
    setEditingId(null)
  }

  useEffect(() => {
    setJSON(KEY, goals)
  }, [goals])

  const addGoal = () => {
    if (!name.trim() || target <= 0) return
    setGoals((g) => [
      ...g,
      { id: crypto.randomUUID(), name: name.trim(), target, saved: 0 },
    ])
    setName('')
    setTarget(1000)
  }

  const addSavings = (id: string, amt: number) => {
    setGoals((g) =>
      g.map((goal) =>
        goal.id === id ? { ...goal, saved: Math.min(goal.target, goal.saved + amt) } : goal
      )
    )
  }

  const progressPct = (g: Goal) => Math.round((g.saved / Math.max(1, g.target)) * 100)

  return (
    <div className="stack" style={{ gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Your Financial Goals
        </h2>
      </div>
      
      <p className="muted" style={{ fontSize: '1.2rem', marginTop: '-16px', maxWidth: '800px' }}>
        Goals help keep investing purposeful. Add small amounts regularly; avoid chasing quick wins. 
        Focus on compounding step by step.
      </p>

      <div className="grid cols-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {goals.map((g) => {
          const isComplete = g.saved >= g.target;
          const isEditing = editingId === g.id;
          return (
            <div key={g.id} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {isComplete && !isEditing && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--success)' }} />}
              
              {isEditing ? (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Goal Name</label>
                  <input value={editName} onChange={e => setEditName(e.target.value)} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)', marginBottom: '16px' }} />
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem' }}>Target Amount (₹)</label>
                  <input type="number" value={editTarget} onChange={e => setEditTarget(Number(e.target.value))} style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)' }} />
                  <div className="row" style={{ marginTop: '20px', gap: '12px' }}>
                    <button className="btn" onClick={() => saveEdit(g.id)} style={{ flex: 1 }}>Save</button>
                    <button className="btn secondary" onClick={() => setEditingId(null)} style={{ flex: 1 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '24px' }}>
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <strong style={{ fontSize: '1.4rem', display: 'block', marginBottom: '8px' }}>{g.name}</strong>
                      <button className="btn secondary" onClick={() => startEdit(g)} style={{ padding: '6px 12px', fontSize: '0.85rem', borderRadius: '6px' }}>Edit</button>
                    </div>
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                      <span className="muted">Saved: <span style={{ color: 'var(--text)', fontWeight: 'bold' }}>₹{g.saved}</span></span>
                      <span className="muted">Target: ₹{g.target}</span>
                    </div>
                  </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: isComplete ? 'var(--success)' : 'var(--accent)' }}>{progressPct(g)}%</span>
                </div>
                <div className="meter" style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '999px' }}>
                  <span style={{ width: `${progressPct(g)}%`, background: isComplete ? 'var(--success)' : 'linear-gradient(90deg, var(--accent), #34d399)' }} />
                </div>
              </div>

              <div className="row" style={{ marginTop: 'auto', gap: '12px' }}>
                <button 
                  className="btn secondary" 
                  style={{ flex: 1, padding: '12px' }} 
                  onClick={() => addSavings(g.id, 100)}
                  disabled={isComplete}
                >
                  +₹100
                </button>
                <button 
                  className="btn" 
                  style={{ flex: 1, padding: '12px' }} 
                  onClick={() => addSavings(g.id, 500)}
                  disabled={isComplete}
                >
                  +₹500
                </button>
              </div>

              {isComplete && !isEditing && <div style={{ position: 'absolute', bottom: -30, right: -20, fontSize: '8rem', opacity: 0.1, pointerEvents: 'none' }}>🎉</div>}
                </>
              )}
            </div>
          );
        })}
      </div>

      <section className="card" style={{ padding: '40px 32px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(0,0,0,0.2))', border: '1px dashed var(--glass-border)' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Create New Goal</h3>
        <p className="muted" style={{ marginBottom: '24px' }}>Keep targets realistic. Build an emergency cushion before aiming for riskier assets.</p>
        
        <div className="row" style={{ gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Goal Name</label>
            <input
              placeholder="e.g. New Car, Vacation..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px',
                border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)',
                color: 'var(--text)', fontSize: '1.1rem', transition: 'border 0.2s ease'
              }}
            />
          </div>
          <div style={{ flex: '0 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Target Amount (₹)</label>
            <input
              type="number"
              placeholder="Target ₹"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px',
                border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)',
                color: 'var(--text)', fontSize: '1.1rem', transition: 'border 0.2s ease'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button className="btn" onClick={addGoal} style={{ padding: '16px 32px', fontSize: '1.1rem', border: 'none' }}>
              Add Goal 🎯
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
