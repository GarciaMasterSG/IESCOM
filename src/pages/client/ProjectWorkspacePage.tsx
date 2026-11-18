import { type FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useClient } from '../../context/ClientContext'
import { StatusBadge } from '../../components/StatusBadge'

export function ProjectWorkspacePage() {
  const { projectId } = useParams()
  const { projects, updateProject, addDocument, addMessage } = useClient()
  const project = projects.find((item) => item.id === projectId)
  const [tab, setTab] = useState('Overview')
  const [message, setMessage] = useState('')

  if (!project) return <div className="empty-state">Project not found. <Link className="text-button" to="/client/projects">Back to projects</Link></div>

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) return
    addMessage(project.id, { id: crypto.randomUUID(), sender: 'Client', text: message.trim(), time: 'Just now' })
    setMessage('')
  }

  const uploadDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const input = form.elements.namedItem('document') as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return
    const type = file.name.split('.').pop()?.toUpperCase() || 'FILE'
    addDocument(project.id, {
      id: crypto.randomUUID(), name: file.name, type,
      uploadedAt: new Date().toISOString().slice(0, 10),
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
    })
    form.reset()
  }

  const approve = () => {
    updateProject(project.id, { status: 'Completed', updatedAt: new Date().toISOString().slice(0, 10) })
  }
  const dispute = () => {
    updateProject(project.id, { status: 'In Dispute', updatedAt: new Date().toISOString().slice(0, 10) })
  }

  const tabs = ['Overview', 'Engineer', 'Documents', 'Conversation', 'Activity', 'Approval']

  return (
    <>
      <div className="workspace-header">
        <div><Link className="text-button" to="/client/projects">← Back to projects</Link><h1>{project.name}</h1><p>{project.id}</p></div>
        <StatusBadge status={project.status} />
      </div>
      <nav className="workspace-tabs" aria-label="Project workspace sections">
        {tabs.map((item) => <button type="button" className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)} key={item}>{item}</button>)}
      </nav>

      {tab === 'Overview' && (
        <div className="workspace-grid">
          <section className="form-panel workspace-panel"><h2>Project overview</h2><p className="workspace-description">{project.description}</p>
            <dl className="detail-grid">
              <div><dt>Project type</dt><dd>{project.type}</dd></div><div><dt>Priority</dt><dd className={`priority priority--${project.priority.toLowerCase()}`}>{project.priority}</dd></div>
              <div><dt>Location</dt><dd>{project.location}</dd></div><div><dt>Deadline</dt><dd>{project.deadline}</dd></div>
              <div><dt>Created</dt><dd>{project.createdAt}</dd></div><div><dt>Assigned engineer</dt><dd>{project.engineer?.name || 'Not assigned yet'}</dd></div>
              <div className="detail-grid--wide"><dt>Technical requirements</dt><dd>{project.technicalRequirements}</dd></div>
              <div className="detail-grid--wide"><dt>Additional information</dt><dd>{project.additionalInformation || 'None provided'}</dd></div>
            </dl>
          </section>
        </div>
      )}

      {tab === 'Engineer' && (
        <section className="form-panel workspace-panel">{project.engineer ? (
          <div className="engineer-card"><div className="engineer-avatar">{project.engineer.name.split(' ').map((p) => p[0]).join('')}</div><div><p className="eyebrow">Assigned engineer</p><h2>{project.engineer.name}</h2><strong>{project.engineer.specialization}</strong><p>{project.engineer.experience} professional experience</p><p>{project.engineer.bio}</p></div></div>
        ) : <div className="empty-state"><h2>No engineer assigned</h2><p>IESCOM is currently reviewing the project and will assign an engineer soon.</p></div>}</section>
      )}

      {tab === 'Documents' && (
        <section className="form-panel workspace-panel"><div className="panel-heading"><div><h2>Project documents</h2><p>Upload and download project files</p></div></div>
          <form className="document-upload" onSubmit={uploadDocument}><input name="document" type="file" /><button className="primary-button" type="submit">Upload document</button></form>
          <div className="document-list">{project.documents.map((document) => (
            <article className="document-row" key={document.id}><div className="document-icon">{document.type.slice(0, 3)}</div><div><strong>{document.name}</strong><p>{document.type} · {document.size} · {document.uploadedAt}</p></div><button type="button" className="text-button" onClick={() => window.alert(`Downloading ${document.name}`)}>Download</button></article>
          ))}{project.documents.length === 0 && <div className="empty-state">No documents uploaded yet.</div>}</div>
        </section>
      )}

      {tab === 'Conversation' && (
        <section className="form-panel workspace-panel chat-panel"><div className="chat-messages">{project.messages.map((item) => (
          <div className={`chat-message chat-message--${item.sender.toLowerCase()}`} key={item.id}><strong>{item.sender}</strong><p>{item.text}</p><time>{item.time}</time></div>
        ))}</div><form className="chat-form" onSubmit={submitMessage}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={project.engineer ? 'Message IESCOM or the assigned engineer' : 'Message IESCOM'} /><button className="primary-button" type="submit">Send</button></form></section>
      )}

      {tab === 'Activity' && (
        <section className="form-panel workspace-panel"><h2>Project activity</h2><div className="timeline">{project.activity.map((item) => (
          <article className="timeline-item" key={item.id}><span /><div><strong>{item.title}</strong><p>{item.detail}</p><time>{item.date}</time></div></article>
        ))}</div></section>
      )}

      {tab === 'Approval' && (
        <section className="form-panel workspace-panel"><h2>Project approval</h2>{project.status === 'Awaiting Approval' ? (
          <div className="approval-card"><p>The engineer has marked this project as completed. Review the work and documents before responding.</p><div className="form-actions"><button className="danger-button" type="button" onClick={dispute}>Report a problem</button><button className="primary-button" type="button" onClick={approve}>Approve completed work</button></div></div>
        ) : <div className="empty-state"><strong>Current status: {project.status}</strong><p>Completion approval becomes available after the engineer requests it.</p></div>}</section>
      )}
    </>
  )
}
