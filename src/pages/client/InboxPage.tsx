import { Link } from 'react-router-dom'
import { useClient } from '../../context/ClientContext'

export function InboxPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useClient()
  const unread = notifications.filter((item) => !item.read).length
  return (
    <>
      <div className="dashboard-heading"><div><p className="eyebrow">Notifications</p><h1>Inbox</h1><p>{unread ? `${unread} unread notification${unread === 1 ? '' : 's'}` : 'You are all caught up'}</p></div><button className="secondary-button" type="button" onClick={markAllNotificationsRead} disabled={unread === 0}>Mark all as read</button></div>
      <section className="inbox-list">
        {notifications.map((item) => (
          <article className={`inbox-item${item.read ? '' : ' is-unread'}`} key={item.id}>
            <button className="inbox-item__marker" type="button" aria-label={item.read ? 'Read notification' : 'Mark as read'} onClick={() => markNotificationRead(item.id)}>{item.read ? '○' : '●'}</button>
            <div><strong>{item.title}</strong><p>{item.detail}</p><time>{item.time}</time></div>
            {item.projectId && <Link className="text-button" to={`/client/projects/${item.projectId}`}>Open project</Link>}
          </article>
        ))}
      </section>
    </>
  )
}
