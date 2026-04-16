import { useMemo, useState } from 'react'
import Modal from '../shared/Modal'

const lessons = [
  {
    id: 'intro-investing',
    title: 'Saving vs. Investing',
    content:
      'Saving is putting money aside for emergencies. It sits in a bank account and barely grows. Investing is putting your money to work by buying assets (like stocks or mutual funds) that generate more money over time. To beat inflation, you must invest.',
    quiz: {
      q: 'Why is saving alone not enough?',
      options: ['It is too risky', 'Inflation reduces its purchasing power', 'Banks charge too many fees'],
      answer: 1,
      explain: 'Inflation makes things more expensive over time. If your money does not grow faster than inflation, you are effectively losing wealth.',
    },
  },
  {
    id: 'asset-classes',
    title: 'Understanding Asset Classes',
    content:
      'An asset class is a group of similar investments. The main three are: Equities (Stocks - high risk, high reward), Debt (Bonds - lower risk, steady income), and Commodities (Gold - safe haven). A good investor mixes these to balance risk.',
    quiz: {
      q: 'Which asset class generally offers the highest potential reward but carries the highest risk?',
      options: ['Debt (Bonds)', 'Commodities (Gold)', 'Equities (Stocks)'],
      answer: 2,
      explain: 'Equities represent ownership in companies. As companies grow, so does stock value, but they are subject to market volatility.',
    },
  },
  {
    id: 'diversification',
    title: 'Diversification reduces risk',
    content:
      'Never put all your eggs in one basket. Spreading investments across different assets (like a mix of Equity and Debt) reduces the impact of any single underperforming asset on your overall portfolio.',
    quiz: {
      q: 'Diversification helps by:',
      options: [
        'Guaranteeing profits',
        'Reducing impact of a single asset crash',
        'Increasing short-term gains',
      ],
      answer: 1,
      explain: 'Diversification manages risk. It limits your losses if one sector or asset type suddenly crashes.',
    },
  },
  {
    id: 'start-sip',
    title: 'The Magic of SIP',
    content:
      'SIP stands for Systematic Investment Plan. Instead of trying to guess the right time to enter the market, you invest a fixed small amount every single month. When markets are down, you buy more units. When they are up, you buy fewer. This averages down your cost automatically!',
    quiz: {
      q: 'What is the main benefit of an SIP?',
      options: ['It times the market for you', 'It guarantees 15% returns', 'It enforces automated discipline and averages out costs'],
      answer: 2,
      explain: 'SIP removes emotion and forces you to invest consistently regardless of market conditions, averaging out the cost per unit over time.',
    },
  },
  {
    id: 'compounding',
    title: 'Compounding: small steps, big outcomes',
    content:
      'Compounding is the 8th wonder of the world. It means you earn interest on your original investment, AND on the interest you already earned. The earlier you start and the longer you leave the money, the more exponential the growth becomes.',
    quiz: {
      q: 'Which factor matters most for compounding?',
      options: ['High returns', 'Time invested in the market', 'Picking individual winning stocks'],
      answer: 1,
      explain: 'Time is the biggest multiplier in compounding. Even a small return gets massive if left untouched for decades.',
    },
  },
  {
    id: 'emotions',
    title: 'Mastering Market Emotions',
    content:
      'The stock market goes up and down every day. When it drops 10%, beginners panic sell. Successful investors understand that market crashes are normal and often present the best buying opportunities. Keep calm and stick to the plan.',
    quiz: {
      q: 'What should you do during a sudden market crash if your goals are long-term?',
      options: ['Sell everything immediately to prevent more losses', 'Stop your SIPs until it recovers', 'Stay calm and continue (or increase) your investments'],
      answer: 2,
      explain: 'Selling locks in your losses. History proves that markets eventually recover. Buying during a crash means getting assets at a discount.',
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
            <div style={{ padding: '40px 32px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))', borderBottom: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -50, right: -50, fontSize: '12rem', opacity: 0.1, transform: 'rotate(15deg)', pointerEvents: 'none' }}>
                🎮
              </div>
              <div className="row" style={{ marginBottom: '24px', gap: '12px' }}>
                <span style={{ 
                  background: 'linear-gradient(90deg, #f59e0b, #ef4444)', 
                  color: 'white', 
                  padding: '6px 16px', 
                  borderRadius: '8px', 
                  fontWeight: 900, 
                  letterSpacing: '2px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  textTransform: 'uppercase',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  STAGE {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="tag" style={{ border: 'none', background: 'rgba(255,255,255,0.1)', color: 'var(--text)' }}>
                  Level {idx + 1} / {lessons.length}
                </span>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                  {lessons.map((_, i) => (
                    <div key={i} style={{ 
                      width: '40px', 
                      height: '6px', 
                      background: i <= idx ? 'var(--accent)' : 'rgba(255,255,255,0.1)', 
                      borderRadius: '4px',
                      boxShadow: i <= idx ? '0 0 10px var(--accent)' : 'none',
                      transition: 'all 0.3s ease'
                    }} />
                  ))}
                </div>
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: 1.2, textShadow: '0 2px 10px rgba(0,0,0,0.5)', fontWeight: 800 }}>
                {l.title}
              </h2>
              <div style={{
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '24px',
                borderRadius: '16px',
                borderLeft: '4px solid var(--accent)',
                backdropFilter: 'blur(10px)',
                maxWidth: '900px'
              }}>
                <p style={{ fontSize: '1.2rem', color: '#e2e8f0', margin: 0, lineHeight: 1.6 }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>📜 Objective Lore</span>
                  {l.content}
                </p>
              </div>
            </div>
            
            <div style={{ padding: '32px' }}>
              <div className="stack" style={{ gap: '24px' }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '24px' }}>
                    <div style={{ color: 'var(--warn)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, fontSize: '1rem', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>⚔️</span> Mini-Boss: Knowledge Check
                    </div>
                    <span style={{ fontSize: '1.3rem', color: 'var(--text)' }}>{l.quiz.q}</span>
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

            <div className="row" style={{ padding: '24px 32px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--glass-border)' }}>
              <button className="btn secondary" disabled={idx === 0} onClick={() => { setIdx(idx - 1); setSelected(null); }}>
                &larr; PREV STAGE
              </button>
              <button
                className="btn"
                disabled={idx === lessons.length - 1}
                onClick={() => { setIdx(idx + 1); setSelected(null); }}
                style={{ marginLeft: 'auto', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', color: 'white' }}
              >
                NEXT STAGE &rarr;
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
