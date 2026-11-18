import { type FormEvent, useState } from 'react'
import { useClient } from '../../context/ClientContext'

export function ProfilePage() {
  const { profile, updateProfile } = useClient()
  const [saved, setSaved] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    updateProfile({
      fullName: String(form.get('fullName') || ''),
      email: String(form.get('email') || ''),
      company: String(form.get('company') || ''),
      phone: String(form.get('phone') || ''),
      role: 'Client',
    })
    setSaved(true)
  }
  const initials = profile.fullName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return (
    <>
      <div className="dashboard-heading"><div><p className="eyebrow">Account settings</p><h1>Client profile</h1><p>Manage your personal and company information.</p></div></div>
      <section className="profile-layout"><aside className="form-panel profile-summary"><div className="profile-picture">{initials}</div><h2>{profile.fullName}</h2><p>{profile.company || 'Independent client'}</p><span>{profile.role}</span></aside>
        <form className="form-panel profile-form" onSubmit={submit}><h2>Personal information</h2><div className="form-grid">
          <label className="form-field"><span>Full name</span><input name="fullName" defaultValue={profile.fullName} /></label>
          <label className="form-field"><span>Email</span><input name="email" type="email" defaultValue={profile.email} /></label>
          <label className="form-field"><span>Company name</span><input name="company" defaultValue={profile.company} /></label>
          <label className="form-field"><span>Phone number</span><input name="phone" defaultValue={profile.phone} /></label>
        </div>{saved && <p className="form-success">Profile changes saved.</p>}<div className="form-actions"><button className="primary-button" type="submit">Save changes</button></div></form>
      </section>
    </>
  )
}
