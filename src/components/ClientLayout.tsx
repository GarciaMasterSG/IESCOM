import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useClient } from '../context/ClientContext'

const navItems = [
  { to: '/client/dashboard', label: 'Dashboard', icon: '⌂' },
  { to: '/client/projects', label: 'My projects', icon: '▦' },
  { to: '/client/inbox', label: 'Inbox', icon: '✉' },
  { to: '/client/profile', label: 'Profile', icon: '◯' },
]

export function ClientLayout() {
  const location = useLocation()
  const { profile, notifications } = useClient()
  const unread = notifications.filter((item) => !item.read).length
  const section = location.pathname.split('/').filter(Boolean).slice(1).join(' / ') || 'dashboard'
  const initials = profile.fullName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="portal-brand"><span className="portal-brand__mark">I</span> IESCOM</div>
        <div className="portal-user">
          <span className="portal-avatar">{initials}</span>
          <div><strong>{profile.fullName}</strong><span>Client account</span></div>
        </div>
        <nav className="portal-nav" aria-label="Client navigation">
          <span className="portal-nav__label">Client portal</span>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `portal-nav__item${isActive ? ' is-active' : ''}`}>
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="portal-signout"><span aria-hidden="true">↪</span>Sign out</NavLink>
      </aside>
      <main className="portal-main">
        <header className="portal-topbar">
          <div className="portal-breadcrumb">Client portal <span>/</span> {section}</div>
          <div className="portal-topbar__actions">
            <NavLink to="/client/inbox" className="icon-button" aria-label={`${unread} unread notifications`}>
              ♢{unread > 0 && <span className="notification-dot" />}
            </NavLink>
            <NavLink to="/client/profile" className="topbar-profile">
              <span className="portal-avatar portal-avatar--small">{initials}</span>
              <span>{profile.fullName}</span>
            </NavLink>
          </div>
        </header>
        <div className="portal-content"><Outlet /></div>
      </main>
    </div>
  )
}
