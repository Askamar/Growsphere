import { useMemo, useState } from 'react'
import Modal from '../shared/Modal'

const lessons = [
  {
    id: 'compounding',
    title: 'Compounding: small steps, big outcomes',
    content:
      'By investing a little regularly, your returns earn returns. Time is the most powerful factor.',
    quiz: {
      q: 'Which factor matters most for compounding?',
      options: ['High returns', 'Time invested', 'Picking winners'],
      answer: 1,
      explain: 'Time allows compounding to work; chasing high returns increases risk.',
    },
  },
  {
    id: 'diversification',
    title: 'Diversification reduces risk',
    content:
      'Spreading investments across assets reduces the impact of any single underperformer.',
    quiz: {
      q: 'Diversification helps by:',
      options: [
        'Guaranteeing profits',
        'Reducing impact of a single asset',
        'Increasing short-term gains',
      ],
      answer: 1,
      explain: 'It manages risk; nothing can guarantee profits.',
    },
  },
]

export default function Learn() {
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [resultOpen, setResultOpen] = useState(false)
  const [resultText, setResultText] = useState('')
  const [explainOpen, setExplainOpen] = useState(false)
  const [inQuiz, setInQuiz] = useState(false)
  const quizBank = useMemo(
    () => [
      { q: 'What factor powers compounding most?', options: ['High returns', 'Time', 'Picking winners'], answer: 1 },
      { q: 'Diversification helps by:', options: ['Guaranteeing profits', 'Reducing single-asset impact', 'Increasing short-term gains'], answer: 1 },
      { q: 'What does SIP stand for?', options: ['Single Investment Plan', 'Systematic Investment Plan', 'Secure Income Program'], answer: 1 },
      { q: 'A lower expense ratio generally means:', options: ['Higher fees', 'Lower ongoing cost', 'Guaranteed better returns'], answer: 1 },
      { q: 'Gold in a portfolio is mainly for:', options: ['Short-term trading', 'Diversification', 'Maximizing growth'], answer: 1 },
      { q: 'Debt funds typically have:', options: ['Lower volatility than equities', 'No risk', 'Guaranteed returns'], answer: 0 },
      { q: 'Index funds aim to:', options: ['Beat the market', 'Match an index', 'Avoid diversification'], answer: 1 },
      { q: 'Trying to time the market usually:', options: ['Improves outcomes reliably', 'Increases risk of missing growth', 'Eliminates risk'], answer: 1 },
      { q: 'A long time horizon generally allows:', options: ['More equity exposure', 'Less SIP discipline', 'No need to diversify'], answer: 0 },
      { q: 'Skipping SIPs frequently tends to:', options: ['Help cost-averaging', 'Hurt consistency', 'Have no effect'], answer: 1 },
    ],
    []
  )
  const [quizIdx, setQuizIdx] = useState(0)
  const [quizSelected, setQuizSelected] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Array<number | null>>(
    () => Array(quizBank.length).fill(null)
  )
  const [quizDone, setQuizDone] = useState(false)
  const marksPerQuestion = 2
  const totalMarks = quizBank.length * marksPerQuestion
  const quizStats = useMemo(() => {
    const correct = quizAnswers.reduce<number>(
      (acc, a, i) => acc + (a === quizBank[i].answer ? 1 : 0),
      0
    )
    const skipped = quizAnswers.filter(a => a == null).length
    const solved = quizAnswers.length - skipped
    const wrong = solved - correct
    const score = correct * marksPerQuestion
    return { correct, wrong, skipped, solved, score }
  }, [quizAnswers, quizBank, marksPerQuestion])
  const l = lessons[idx]

  const submit = () => {
    if (selected == null) return
    const text = selected === l.quiz.answer ? 'Correct! 🎉' : 'Not quite. Keep learning! 💡'
    setResultText(text)
    setResultOpen(true)
  }

  return (
    <div className="stack" style={{ gap: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--text), var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Learning Hub
        </h2>
      </div>

      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {!inQuiz && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '40px 32px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(0,0,0,0))', borderBottom: '1px solid var(--glass-border)' }}>
              <div className="tag" style={{ marginBottom: '16px', background: 'var(--accent)', color: '#050b14', fontWeight: 'bold', border: 'none' }}>
                Lesson {idx + 1} of {lessons.length}
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', lineHeight: 1.2 }}>{l.title}</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.6 }}>{l.content}</p>
            </div>
            
            <div style={{ padding: '32px' }}>
              <div className="stack" style={{ gap: '24px' }}>
                <div>
                  <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>🧠</span> Test your knowledge: <br/>{l.quiz.q}
                  </strong>
                  <div className="grid cols-3" style={{ gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
                    {l.quiz.options.map((o, i) => (
                      <label
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px 20px',
                          background: selected === i ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${selected === i ? 'var(--accent)' : 'var(--glass-border)'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          gap: '12px',
                          boxShadow: selected === i ? '0 4px 12px rgba(16, 185, 129, 0.1)' : 'none'
                        }}
                      >
                        <input
                          type="radio"
                          name="quiz"
                          checked={selected === i}
                          onChange={() => setSelected(i)}
                          style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }}
                        />
                        <span style={{ fontSize: '1.05rem', fontWeight: selected === i ? 600 : 400 }}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="row" style={{ marginTop: '16px', flexWrap: 'wrap' }}>
                  <button className="btn" onClick={submit} style={{ padding: '12px 24px', fontSize: '1.05rem' }}>Submit Answer</button>
                  <button className="btn secondary" onClick={() => setExplainOpen(true)} style={{ padding: '12px 24px', fontSize: '1.05rem' }}>Explain</button>
                  
                  <button
                    className="btn secondary"
                    style={{ marginLeft: 'auto', background: 'rgba(59, 130, 246, 0.15)', borderColor: 'rgba(59, 130, 246, 0.3)', padding: '12px 24px' }}
                    onClick={() => {
                      setInQuiz(true)
                      setQuizIdx(0)
                      setQuizSelected(null)
                      setQuizAnswers(Array(quizBank.length).fill(null))
                      setQuizDone(false)
                    }}
                  >
                    🚀 Start 20-mark Quiz
                  </button>
                </div>
              </div>
            </div>

            <div className="row" style={{ padding: '24px 32px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--glass-border)' }}>
              <button className="btn secondary" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setSelected(null); }}>
                &larr; Previous Lesson
              </button>
              <button
                className="btn"
                disabled={idx === lessons.length - 1}
                onClick={() => { setIdx(idx + 1); setSelected(null); }}
                style={{ marginLeft: 'auto' }}
              >
                Next Lesson &rarr;
              </button>
            </div>
          </div>
        )}

        {inQuiz && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '32px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0,0,0,0))', borderBottom: '1px solid var(--glass-border)' }}>
              <h2 style={{ fontSize: '2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}><span>📝</span> Practice Quiz</h2>
              <small className="muted" style={{ display: 'block', marginTop: '8px', fontSize: '1rem' }}>Total marks: {totalMarks} (2 marks per question). Results shown at the end.</small>
            </div>
            
            <div className="stack" style={{ padding: '32px', gap: '24px' }}>
              <div className="row" style={{ marginBottom: '8px' }}>
                <div className="tag" style={{ background: 'var(--accent2)', color: '#050b14', border: 'none' }}>Question {quizIdx + 1} of {quizBank.length}</div>
                <div className="tag">Solved: {quizAnswers.filter(a => a != null).length}</div>
              </div>
              <strong style={{ fontSize: '1.4rem', lineHeight: 1.4 }}>{quizBank[quizIdx].q}</strong>
              <div className="stack" style={{ gap: '12px', marginTop: '16px' }}>
                {quizBank[quizIdx].options.map((o, i) => (
                  <label
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 20px',
                      background: quizSelected === i ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${quizSelected === i ? 'var(--accent2)' : 'var(--glass-border)'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      gap: '12px',
                    }}
                  >
                    <input
                      type="radio"
                      name={`quizq-${quizIdx}`}
                      checked={quizSelected === i}
                      onChange={() => setQuizSelected(i)}
                      style={{ accentColor: 'var(--accent2)', transform: 'scale(1.2)' }}
                    />
                    <span style={{ fontSize: '1.1rem', fontWeight: quizSelected === i ? 600 : 400 }}>{o}</span>
                  </label>
                ))}
              </div>
              <div className="row" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)', flexWrap: 'wrap' }}>
                <button
                  className="btn secondary"
                  onClick={() => {
                    const next = Math.min(quizIdx + 1, quizBank.length - 1)
                    setQuizAnswers(a => {
                      const copy = a.slice()
                      copy[quizIdx] = null
                      return copy
                    })
                    if (quizIdx === quizBank.length - 1) {
                      setQuizDone(true)
                    } else {
                      setQuizIdx(next)
                      setQuizSelected(null)
                    }
                  }}
                >
                  Skip
                </button>
                <div style={{ marginLeft: 'auto' }} />
                {quizIdx > 0 && (
                  <button
                    className="btn secondary"
                    onClick={() => {
                      setQuizIdx(quizIdx - 1)
                      setQuizSelected(quizAnswers[quizIdx - 1])
                    }}
                  >
                    &larr; Previous
                  </button>
                )}
                {quizIdx < quizBank.length - 1 && (
                  <button
                    className="btn"
                    disabled={quizSelected == null}
                    onClick={() => {
                      setQuizAnswers(a => {
                        const copy = a.slice()
                        copy[quizIdx] = quizSelected
                        return copy
                      })
                      setQuizIdx(quizIdx + 1)
                      setQuizSelected(quizAnswers[quizIdx + 1] ?? null)
                    }}
                  >
                    Next &rarr;
                  </button>
                )}
                {quizIdx === quizBank.length - 1 && (
                  <button
                    className="btn"
                    style={{ background: 'var(--accent2)' }}
                    disabled={quizSelected == null && quizAnswers[quizIdx] == null}
                    onClick={() => {
                      setQuizAnswers(a => {
                        const copy = a.slice()
                        copy[quizIdx] = quizSelected ?? copy[quizIdx]
                        return copy
                      })
                      setQuizDone(true)
                    }}
                  >
                    Finish Quiz 🎯
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal open={resultOpen} title="Lesson Result" onClose={() => setResultOpen(false)}>
        <div style={{ padding: '16px 0' }}>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', margin: 0 }}>{resultText}</p>
        </div>
      </Modal>

      <Modal open={explainOpen} title="Explanation" onClose={() => setExplainOpen(false)}>
        <div style={{ padding: '16px 0', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', paddingLeft: '24px', borderLeft: '4px solid var(--accent2)' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6 }}>{l.quiz.explain}</p>
        </div>
      </Modal>

      <Modal
        open={quizDone}
        title="Quiz Results"
        onClose={() => {
          setInQuiz(false)
          setQuizDone(false)
        }}
      >
        <div className="stack" style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{quizStats.score > totalMarks / 2 ? '🏆' : '📚'}</div>
          <strong style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>Score: <span style={{ color: 'var(--accent)' }}>{quizStats.score}</span> / {totalMarks}</strong>
          <p className="muted" style={{ marginBottom: '24px' }}>Keep practicing, micro-learning compounds over time!</p>
          <div className="row" style={{ justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div className="tag" style={{ border: '1px solid var(--success)', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>Correct: {quizStats.correct}</div>
            <div className="tag" style={{ border: '1px solid var(--danger)', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>Wrong: {quizStats.wrong}</div>
            <div className="tag">Solved: {quizStats.solved}</div>
            <div className="tag">Skipped: {quizStats.skipped}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
