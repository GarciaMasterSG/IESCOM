import { useEffect, useState } from 'react'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { PasswordResetPage } from './pages/PasswordResetPage'
import { SignUpPage } from './pages/SignUpPage'
import IESCOMLogo from './assets/IESCOM-logo.png'
import { navigateTo } from './utils/navigation'

const verificationList = [
  'signup',
  'reset',
  'login'
]

const pageFromPath = (): string => {
  const path = window.location.pathname
  if (path.endsWith('verification/signup')) return 'signup'
  if (path.endsWith('verification/reset')) return 'reset'
  if (path.endsWith('verification/login') || path.endsWith('/')) return 'login'
  return 'error'
}

function App() {
  const [page, setPage] = useState<string>(pageFromPath())

  useEffect(() => {
    const handlePopState = () => setPage(pageFromPath())
    console.log('Current page:', window.location.pathname)
    if (pageFromPath() === 'error') {
      navigateTo('login')
      setPage('login')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <>
      { verificationList.includes(page) && 
        <main className="auth-shell">
          <section className="auth-card" aria-labelledby="page-title">
            <div className="logo-placeholder" role="img" aria-label="Company logo placeholder">
              <img src={IESCOMLogo} alt="IESCOM" className="logo-mark"/>
            </div>
            {page === 'login' && <LoginPage />}
            {page === 'signup' && <SignUpPage />}
            {page === 'reset' && <PasswordResetPage />}
          </section>
        </main>
      }
    </>
  )
}

export default App
