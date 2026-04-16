import { ReactNode } from 'react'

type Props = {
  open: boolean
  title?: string
  onClose: () => void
  children: ReactNode
  actions?: ReactNode
}

export default function Modal({ open, title, onClose, children, actions }: Props) {
  if (!open) return null
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-inner">
        {title ? <h3 style={{ marginTop: 0 }}>{title}</h3> : null}
        <div>{children}</div>
        <div className="row" style={{ marginTop: 12 }}>
          {actions}
          <button className="btn secondary" onClick={onClose} style={{ marginLeft: 'auto' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
