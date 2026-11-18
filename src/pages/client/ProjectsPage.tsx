import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useClient } from '../../context/ClientContext'
import { StatusBadge } from '../../components/StatusBadge'
import type { ProjectStatus } from '../../data/mockData'

export function ProjectsPage() {
  const { projects } = useClient()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'All' | ProjectStatus>('All')
  const [sort, setSort] = useState('updated')

  const filtered = useMemo(() => {
    const result = projects.filter((project) =>
      (status === 'All' || project.status === status) &&
      (`${project.name} ${project.description} ${project.type}`).toLowerCase().includes(query.toLowerCase()))
    return [...result].sort((a, b) => sort === 'name'
      ? a.name.localeCompare(b.name)
      : sort === 'created'
        ? b.createdAt.localeCompare(a.createdAt)
        : b.updatedAt.localeCompare(a.updatedAt))
  }, [projects, query, status, sort])

  return (
    <>
      <div className="dashboard-heading"><div><p className="eyebrow">Project portfolio</p><h1>My projects</h1><p>Search, filter and open your submitted engineering work.</p></div><Link className="primary-button dashboard-heading__button" to="/client/projects/new"><span>+</span> New project</Link></div>
      <section className="projects-toolbar">
        <label className="search-field"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" /></label>
        <select value={status} onChange={(event) => setStatus(event.target.value as 'All' | ProjectStatus)} aria-label="Filter by status">
          <option>All</option><option>In Conversation</option><option>In Progress</option><option>Awaiting Approval</option><option>Completed</option><option>In Dispute</option>
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort projects">
          <option value="updated">Last updated</option><option value="created">Creation date</option><option value="name">Project name</option>
        </select>
      </section>
      <section className="projects-table" aria-label="Projects">
        <div className="projects-table__head"><span>Project</span><span>Status</span><span>Engineer</span><span>Created</span><span>Updated</span><span /></div>
        {filtered.map((project) => (
          <Link className="projects-table__row" to={`/client/projects/${project.id}`} key={project.id}>
            <div><strong>{project.name}</strong><p>{project.description}</p><small>{project.type}</small></div>
            <StatusBadge status={project.status} />
            <span>{project.engineer?.name || 'Not assigned'}</span><span>{project.createdAt}</span><span>{project.updatedAt}</span><b>→</b>
          </Link>
        ))}
        {filtered.length === 0 && <div className="empty-state">No projects match the current filters.</div>}
      </section>
    </>
  )
}
