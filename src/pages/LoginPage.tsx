import { type FormEvent, useState } from 'react'
import { AuthField } from '../components/AuthField'
import { PageHeader } from '../components/PageHeader'
import { navigateTo } from '../utils/navigation'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }
    if (!password) {
      setError('Enter your password.')
      return
    }
    setError('')
    navigate('/client/dashboard')
  }

  return (
    <> 
      <PageHeader/>
      <form className="auth-form" onSubmit={submit} noValidate>
        <AuthField id="login-email" label="Correo electrónico" type="email" value={email} onChange={setEmail} autoComplete="email" />
        <AuthField id="login-password" label="Contraseña" type="password" value={password} onChange={setPassword} autoComplete="current-password" />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="primary-button" type="submit">Registrarse</button>
      </form>
      <nav className="auth-links" aria-label="Login options">
        <button type="button" onClick={() => navigateTo('reset')}>Olvidaste tu contraseña?</button>
        <p>No tienes cuenta aun? <button type="button" onClick={() => navigateTo('signup')}>Crea una cuenta</button></p>
      </nav>
    </>
  )
}
