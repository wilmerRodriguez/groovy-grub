import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dismissToast } from '../store/slices/uiSlice'

function Toast({ toast }) {
  const dispatch = useDispatch()
  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 2800)
    return () => clearTimeout(t)
  }, [dispatch, toast.id])
  return (
    <div className={`toast ${toast.tone}`} role="status">
      {toast.message}
      <button onClick={() => dispatch(dismissToast(toast.id))} aria-label="Dismiss">×</button>
    </div>
  )
}

export default function Toasts() {
  const toasts = useSelector((s) => s.ui.toasts)
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => <Toast key={t.id} toast={t} />)}
    </div>
  )
}
