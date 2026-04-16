import { useState } from 'react'

export default function GlossaryTip({
  term,
  children,
}: {
  term: string
  children: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <span className="tip">
      <button className="tip-btn" onClick={() => setOpen(true)} aria-label={`Explain ${term}`}>
        {term}
      </button>
      {open && (
        <div className="tip-pop">
          <div className="tip-pop-inner">
            <strong>{term}</strong>
            <p className="muted">{children}</p>
            <div className="row" style={{ marginTop: 8 }}>
              <button className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}
