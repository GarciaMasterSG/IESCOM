import { type FormEvent, useState } from 'react'
import { AuthField } from '../components/AuthField'
import { PageHeader } from '../components/PageHeader'
import { navigateTo } from '../utils/navigation'

export function SignUpPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) setError('Enter your full name.')
    else if (!email.includes('@')) setError('Enter a valid email address.')
    else if (password.length < 8) setError('Password must be at least 8 characters.')
    else if (password !== confirmPassword) setError('Passwords do not match.')
    else setError('')
  }

  return (
    <>
      <PageHeader title="Crear cuenta"/>
      <form className="auth-form" onSubmit={submit} noValidate>
        <AuthField id="full-name" label="Nombre completo" value={name} onChange={setName} autoComplete="name" />
        <AuthField id="signup-email" label="Correo electrónico" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <AuthField id="signup-password" label="Contraseña" type="password" value={password} onChange={setPassword} autoComplete="new-password" />
        <AuthField id="confirm-password" label="Confirmar contraseña" type="password" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Crear cuenta</button>
      </form>
      <nav className="auth-links" aria-label="Account options">
        <p>Ya tienes una cuenta? <button type="button" onClick={() => navigateTo('login')}>Iniciar sesión</button></p>
      </nav>
    </>
  )
}
