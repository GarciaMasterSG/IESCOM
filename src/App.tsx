import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { PasswordResetPage } from './pages/PasswordResetPage'
import { SignUpPage } from './pages/SignUpPage'
import IESCOMLogo from './assets/IESCOM-logo.png'
import { ClientProvider } from './context/ClientContext'
import { ClientLayout } from './components/ClientLayout'
import { DashboardPage } from './pages/client/DashboardPage'
import { ProjectsPage } from './pages/client/ProjectsPage'
import { NewProjectPage } from './pages/client/NewProjectPage'
import { ProjectWorkspacePage } from './pages/client/ProjectWorkspacePage'
import { InboxPage } from './pages/client/InboxPage'
import { ProfilePage } from './pages/client/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <main className="auth-shell">
          <section className="auth-card" aria-labelledby="page-title">
            <div className="logo-placeholder"><img src={IESCOMLogo} alt="IESCOM" className="logo-mark" /></div>
            <LoginPage />
          </section>
        </main>
      } />
      <Route path="/verification/login" element={
        <main className="auth-shell"><section className="auth-card"><div className="logo-placeholder"><img src={IESCOMLogo} alt="IESCOM" className="logo-mark" /></div><LoginPage /></section></main>
      } />
      <Route path="/verification/signup" element={
        <main className="auth-shell"><section className="auth-card"><div className="logo-placeholder"><img src={IESCOMLogo} alt="IESCOM" className="logo-mark" /></div><SignUpPage /></section></main>
      } />
      <Route path="/verification/reset" element={
        <main className="auth-shell"><section className="auth-card"><div className="logo-placeholder"><img src={IESCOMLogo} alt="IESCOM" className="logo-mark" /></div><PasswordResetPage /></section></main>
      } />

      <Route path="/client" element={<ClientProvider><ClientLayout /></ClientProvider>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/new" element={<NewProjectPage />} />
        <Route path="projects/:projectId" element={<ProjectWorkspacePage />} />
        <Route path="inbox" element={<InboxPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
