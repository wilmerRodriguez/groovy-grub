import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signIn, signOut } from '../store/slices/authSlice'
import { pushToast } from '../store/slices/uiSlice'

export default function Account() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [mode, setMode] = useState('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  if (user) {
    return (
      <div className="wrap account">
        <div className="panel">
          <div className="avatar" aria-hidden="true">{user.name[0].toUpperCase()}</div>
          <h1>Hey {user.name} 👋</h1>
          <p>Signed in as <b>{user.email}</b></p>
          <div className="actions">
            <Link to="/" className="btn">Order something</Link>
            <button className="btn btn-ghost" onClick={() => { dispatch(signOut()); dispatch(pushToast('Signed out')) }}>Sign out</button>
          </div>
        </div>
      </div>
    )
  }

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError('') }
  const submit = (e) => {
    e.preventDefault()
    if (mode === 'signup' && form.name.trim().length < 2) return setError('Please enter your name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Please enter a valid email.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    dispatch(signIn({ name: form.name.trim(), email: form.email.trim() }))
    dispatch(pushToast(mode === 'signup' ? 'Welcome to Groovy Grub! 🎉' : 'Welcome back! 👋'))
  }

  return (
    <div className="wrap account">
      <form className="panel" onSubmit={submit} noValidate>
        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'on' : ''} onClick={() => setMode('signin')}>Sign in</button>
          <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'on' : ''} onClick={() => setMode('signup')}>Create account</button>
        </div>
        {mode === 'signup' && (
          <div className="field"><label htmlFor="a-name">Name</label><input id="a-name" value={form.name} onChange={set('name')} autoComplete="name" /></div>
        )}
        <div className="field"><label htmlFor="a-email">Email</label><input id="a-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" /></div>
        <div className="field"><label htmlFor="a-pass">Password</label><input id="a-pass" type="password" value={form.password} onChange={set('password')} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} /></div>
        {error && <p className="err" role="alert">{error}</p>}
        <button className="btn btn-block" type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'}</button>
        <p className="note">Demo only: any email and a 6+ character password will work. Nothing is sent anywhere.</p>
      </form>
    </div>
  )
}
