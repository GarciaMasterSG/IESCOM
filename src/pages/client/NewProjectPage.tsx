import { type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClient } from '../../context/ClientContext'
import type { Project } from '../../data/mockData'

export function NewProjectPage() {
  const { addProject } = useClient()
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '').trim()
    const description = String(form.get('description') || '').trim()
    if (!name || !description) {
      setError('Project name and description are required.')
      return
    }
    const now = new Date().toISOString().slice(0, 10)
    const sequence = String(Math.floor(100 + Math.random() * 900))
    const project: Project = {
      id: `IES-2026-${sequence}`,
      name,
      description,
      type: String(form.get('type') || 'Other'),
      location: String(form.get('location') || 'Not specified'),
      priority: String(form.get('priority') || 'Medium') as Project['priority'],
      additionalInformation: String(form.get('additional') || ''),
      technicalRequirements: 'Technical requirements will be defined during the conversation.',
      status: 'In Conversation',
      createdAt: now,
      updatedAt: now,
      deadline: 'To be agreed',
      documents: [],
      messages: [{ id: crypto.randomUUID(), sender: 'IESCOM', text: 'Thank you for submitting the project. We will review the brief and contact you soon.', time: 'Just now' }],
      activity: [{ id: crypto.randomUUID(), title: 'Project created', detail: 'The project was submitted with its initial information.', date: `${now}  Just now` }],
    }
    addProject(project)
    setError('')
    setSuccess('Project submitted successfully.')
    window.setTimeout(() => navigate(`/client/projects/${project.id}`), 500)
  }

  return (
    <>
      <div className="dashboard-heading"><div><p className="eyebrow">Project submission</p><h1>Create a new project</h1><p>Submit the essentials. IESCOM will guide you through the remaining technical details.</p></div></div>
      <form className="project-form" onSubmit={submit}>
        <section className="form-panel"><h2>Project information</h2>
          <div className="form-grid">
            <label className="form-field form-field--wide"><span>Project name *</span><input name="name" placeholder="e.g. Office electrical upgrade" /></label>
            <label className="form-field form-field--wide"><span>Project description *</span><textarea name="description" rows={4} placeholder="Describe the work, objective and scope" /></label>
            <label className="form-field"><span>Project type</span><select name="type" defaultValue="Power systems"><option>Power systems</option><option>Renewable energy</option><option>Lighting</option><option>Emergency power</option><option>Industrial automation</option><option>Other</option></select></label>
            <label className="form-field"><span>Location</span><input name="location" placeholder="City, address or region" /></label>
            <label className="form-field"><span>Priority</span><select name="priority" defaultValue="Medium"><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label className="form-field form-field--wide"><span>Additional information</span><textarea name="additional" rows={3} placeholder="Constraints, deadlines or useful context" /></label>
            <label className="form-field form-field--wide"><span>File attachments</span><input name="files" type="file" multiple /></label>
          </div>
        </section>
        {error && <p className="form-error">{error}</p>} {success && <p className="form-success">{success}</p>}
        <div className="form-actions"><button type="button" className="secondary-button" onClick={() => navigate('/client/projects')}>Cancel</button><button className="primary-button" type="submit">Submit project</button></div>
      </form>
    </>
)
}
