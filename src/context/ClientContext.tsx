import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  initialNotifications,
  initialProjects,
  type ClientProfile,
  type NotificationItem,
  type Project,
  type ProjectDocument,
  type ProjectMessage,
} from '../data/mockData'

type ClientContextValue = {
  projects: Project[]
  notifications: NotificationItem[]
  profile: ClientProfile
  addProject: (project: Project) => void
  updateProject: (projectId: string, patch: Partial<Project>) => void
  addDocument: (projectId: string, document: ProjectDocument) => void
  addMessage: (projectId: string, message: ProjectMessage) => void
  markNotificationRead: (notificationId: string) => void
  markAllNotificationsRead: () => void
  updateProfile: (profile: ClientProfile) => void
}

const ClientContext = createContext<ClientContextValue | null>(null)

export function ClientProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState(initialProjects)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [profile, setProfile] = useState<ClientProfile>({
    fullName: 'Fontys Garcia',
    email: 'fontys.garcia@example.com',
    company: 'Garcia Engineering BV',
    phone: '+31 6 1234 5678',
    role: 'Client',
  })

  const addProject = (project: Project) => setProjects((current) => [project, ...current])
  const updateProject = (projectId: string, patch: Partial<Project>) =>
    setProjects((current) => current.map((project) => project.id === projectId ? { ...project, ...patch } : project))
  const addDocument = (projectId: string, document: ProjectDocument) =>
    setProjects((current) => current.map((project) => project.id === projectId
      ? { ...project, updatedAt: new Date().toISOString().slice(0, 10), documents: [document, ...project.documents] }
      : project))
  const addMessage = (projectId: string, message: ProjectMessage) =>
    setProjects((current) => current.map((project) => project.id === projectId
      ? { ...project, updatedAt: new Date().toISOString().slice(0, 10), messages: [...project.messages, message] }
      : project))
  const markNotificationRead = (notificationId: string) =>
    setNotifications((current) => current.map((item) => item.id === notificationId ? { ...item, read: true } : item))
  const markAllNotificationsRead = () =>
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))

  return (
    <ClientContext.Provider value={{
      projects, notifications, profile, addProject, updateProject, addDocument, addMessage,
      markNotificationRead, markAllNotificationsRead, updateProfile: setProfile,
    }}>
      {children}
    </ClientContext.Provider>
  )
}

export function useClient() {
  const context = useContext(ClientContext)
  if (!context) throw new Error('useClient must be used within ClientProvider')
  return context
}
