import { Link } from 'react-router-dom'
import { useClient } from '../../context/ClientContext'
import { StatusBadge } from '../../components/StatusBadge'

export function DashboardPage() {
  const { projects, notifications, profile } = useClient()
  const metrics = [
    { label: 'Total projects', value: projects.length, note: 'All submissions', tone: 'blue', icon: '▦' },
    { label: 'In progress', value: projects.filter((p) => p.status === 'In Progress').length, note: 'Active work', tone: 'green', icon: '↗' },
    { label: 'Awaiting approval', value: projects.filter((p) => p.status === 'Awaiting Approval').length, note: 'Needs response', tone: 'orange', icon: '✓' },
    { label: 'Completed', value: projects.filter((p) => p.status === 'Completed').length, note: 'Delivered', tone: 'purple', icon: '◎' },
  ]

  return (
    <>
      <div className="dashboard-heading">
        <div><p className="eyebrow">Client overview</p><h1>Welcome back, {profile.fullName.split(' ')[0]}</h1><p>Here is the current status of your engineering projects.</p></div>
        <Link className="primary-button dashboard-heading__button" to="/client/projects/new"><span>+</span> Create new project</Link>
      </div>
      <section className="dashboard-metrics" aria-label="Project metrics">
        {metrics.map((metric) => (
          <article className={`dashboard-card dashboard-card--${metric.tone}`} key={metric.label}>
            <div className="dashboard-card__icon">{metric.icon}</div><p>{metric.label}</p><strong>{metric.value}</strong><span>{metric.note}</span>
          </article>
        ))}
      </section>
      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <div className="panel-heading"><div><h2>Recent projects</h2><p>Latest submitted and active work</p></div><Link className="text-button" to="/client/projects">View all projects</Link></div>
          <div className="project-list">
            {projects.slice(0, 3).map((project) => (
              <Link className="project-card" to={`/client/projects/${project.id}`} key={project.id}>
                <div className="project-card__topline"><span className="project-card__id">{project.id}</span><StatusBadge status={project.status} /></div>
                <h3>{project.name}</h3><p className="project-card__type">{project.type}</p>
                <dl className="project-card__details"><div><dt>Created</dt><dd>{project.createdAt}</dd></div><div><dt>Engineer</dt><dd>{project.engineer?.name || 'Not assigned'}</dd></div></dl>
                <div className="project-card__footer"><span className={`priority priority--${project.priority.toLowerCase()}`}>{project.priority} priority</span><span className="text-button">Open workspace →</span></div>
              </Link>
            ))}
          </div>
        </section>
        <aside className="dashboard-panel">
          <div className="panel-heading"><div><h2>Recent notifications</h2><p>Latest project updates</p></div><Link className="text-button" to="/client/inbox">View inbox</Link></div>
          <div className="activity-list">
            {notifications.slice(0, 4).map((item) => (
              <Link className="activity-item" to={item.projectId ? `/client/projects/${item.projectId}` : '/client/inbox'} key={item.id}>
                <span className="activity-item__marker" /><div><strong>{item.title}</strong><p>{item.detail}</p><time>{item.time}</time></div>
              </Link>
            ))}
          </div>
          <Link className="activity-button" to="/client/inbox">Open notification center</Link>
        </aside>
      </div>
    </>
  )
}
