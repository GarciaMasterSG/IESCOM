import { type FormEvent, useState } from 'react'
import { AuthField } from '../components/AuthField'
import { PageHeader } from '../components/PageHeader'
import { navigateTo } from '../utils/navigation'

export function PasswordResetPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes('@')) {
      setError('Introduce un correo electrónico válido.')
      setMessage('')
      return
    }
    setError('')
    setMessage('If an account exists for this email, a recovery code will be sent shortly.')
  }

  return (
    <>
      <PageHeader title="Cambiar contraseña" />
      <p className="reset-description">Introduce tu correo electronico para que podamos enviarte un código de recuperación.</p>
      <form className="auth-form" onSubmit={submit} noValidate>
        <AuthField id="reset-email" label="Email address" type="email" value={email} onChange={setEmail} autoComplete="email" />
        {error && <p className="form-error" role="alert">{error}</p>}
        {message && <p className="form-success" role="status">{message}</p>}
        <button className="primary-button" type="submit">Enviar codigo</button>
      </form>
      <nav className="auth-links" aria-label="Password reset options">
        <button type="button" onClick={() => navigateTo('login')}>Volver a Iniciar sesión</button>
      </nav>
    </>
  )
}
