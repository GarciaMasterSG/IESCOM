import type { ProjectStatus } from '../data/mockData'

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const tone =
    status === 'In Conversation' ? 'conversation'
    : status === 'Awaiting Approval' ? 'approval'
    : status === 'In Progress' ? 'progress'
    : status === 'In Dispute' ? 'dispute'
    : status === 'Completed' ? 'completed'
    : 'unknown'

  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  )
}
