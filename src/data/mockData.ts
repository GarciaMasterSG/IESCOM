export type ProjectStatus = 'In Conversation' | 'Awaiting Approval' | 'In Progress' | 'Completed' | 'In Dispute'

export type ProjectDocument = {
  id: string
  name: string
  type: string
  uploadedAt: string
  size: string
}

export type ProjectMessage = {
  id: string
  sender: 'Client' | 'IESCOM' | 'Engineer'
  text: string
  time: string
}

export type ProjectActivity = {
  id: string
  title: string
  detail: string
  date: string
}

export type Project = {
  id: string
  name: string
  description: string
  type: string
  location: string
  priority: 'High' | 'Medium' | 'Low'
  additionalInformation: string
  technicalRequirements: string
  status: ProjectStatus
  createdAt: string
  updatedAt: string
  deadline: string
  engineer?: {
    name: string
    specialization: string
    experience: string
    bio: string
  }
  documents: ProjectDocument[]
  messages: ProjectMessage[]
  activity: ProjectActivity[]
}

export type NotificationItem = {
  id: string
  title: string
  detail: string
  time: string
  read: boolean
  kind: 'status' | 'message' | 'document' | 'engineer' | 'approval'
  projectId?: string
}

export type ClientProfile = {
  fullName: string
  email: string
  company: string
  phone: string
  role: string
}

export const initialProjects: Project[] = [
  {
    id: 'IES-2026-014',
    name: 'Electrical system upgrade',
    description: 'Upgrade of the main distribution system for a multi-floor office building.',
    type: 'Power systems',
    location: 'Rotterdam, Netherlands',
    priority: 'High',
    additionalInformation: 'Coordinate the work with facility operations.',
    technicalRequirements: 'New 400A distribution panel, load study, surge protection and emergency circuits.',
    status: 'In Progress',
    createdAt: '2026-02-10',
    updatedAt: '2026-02-18',
    deadline: '2026-04-30',
    engineer: {
      name: 'Marina Alvarez',
      specialization: 'Power Systems Engineer',
      experience: '9 years',
      bio: 'Specializes in industrial distribution systems, load analysis and electrical safety compliance.',
    },
    documents: [
      { id: 'd1', name: 'Site survey.pdf', type: 'PDF', uploadedAt: '2026-02-12', size: '2.4 MB' },
      { id: 'd2', name: 'Single-line diagram.dwg', type: 'DWG', uploadedAt: '2026-02-14', size: '8.1 MB' },
    ],
    messages: [
      { id: 'm1', sender: 'IESCOM', text: 'We have reviewed the initial project brief.', time: 'Feb 12, 09:15' },
      { id: 'm2', sender: 'Engineer', text: 'I have assigned the site survey. Please confirm access for Friday.', time: 'Feb 14, 14:20' },
    ],
    activity: [
      { id: 'a1', title: 'Engineer assigned', detail: 'Marina Alvarez was assigned to the project.', date: '2026-02-11 10:30' },
      { id: 'a2', title: 'Document uploaded', detail: 'Site survey.pdf was uploaded.', date: '2026-02-12 11:10' },
      { id: 'a3', title: 'Progress update', detail: 'Technical requirements have been confirmed.', date: '2026-02-18 15:45' },
    ],
  },
  {
    id: 'IES-2026-011',
    name: 'Solar panel installation',
    description: 'Design and implementation of a rooftop photovoltaic system.',
    type: 'Renewable energy',
    location: 'Eindhoven, Netherlands',
    priority: 'Medium',
    additionalInformation: 'Existing roof survey is required.',
    technicalRequirements: '120 kWp PV system with inverter, monitoring and grid interconnection.',
    status: 'Awaiting Approval',
    createdAt: '2026-02-03',
    updatedAt: '2026-02-17',
    deadline: '2026-05-15',
    engineer: {
      name: 'Thomas Klein',
      specialization: 'Renewable Energy Engineer',
      experience: '7 years',
      bio: 'Experienced in solar system design, grid integration and energy yield analysis.',
    },
    documents: [{ id: 'd3', name: 'Roof-layout.pdf', type: 'PDF', uploadedAt: '2026-02-05', size: '1.8 MB' }],
    messages: [{ id: 'm3', sender: 'IESCOM', text: 'The implementation package is ready for final approval.', time: 'Feb 17, 12:00' }],
    activity: [{ id: 'a4', title: 'Completion requested', detail: 'Engineer submitted the project for client approval.', date: '2026-02-17 12:00' }],
  },
  {
    id: 'IES-2026-008',
    name: 'Warehouse lighting renovation',
    description: 'Replace outdated lighting with an efficient LED system.',
    type: 'Lighting',
    location: 'Utrecht, Netherlands',
    priority: 'Low',
    additionalInformation: 'Night work preferred.',
    technicalRequirements: 'LED luminaires, lighting control zones and emergency egress lighting.',
    status: 'Completed',
    createdAt: '2026-01-22',
    updatedAt: '2026-02-08',
    deadline: '2026-03-01',
    engineer: {
      name: 'Sofia Martins',
      specialization: 'Lighting Engineer',
      experience: '6 years',
      bio: 'Provides lighting design, controls integration and energy-efficiency assessments.',
    },
    documents: [{ id: 'd4', name: 'Final-lighting-report.pdf', type: 'PDF', uploadedAt: '2026-02-08', size: '3.2 MB' }],
    messages: [{ id: 'm4', sender: 'Engineer', text: 'The completed work is ready.', time: 'Feb 08, 10:30' }],
    activity: [{ id: 'a5', title: 'Project completed', detail: 'Client approved the completed work.', date: '2026-02-08 16:20' }],
  },
  {
    id: 'IES-2026-003',
    name: 'Factory emergency power',
    description: 'Emergency backup power assessment and generator integration.',
    type: 'Emergency power',
    location: 'Tilburg, Netherlands',
    priority: 'High',
    additionalInformation: 'Operational continuity is essential.',
    technicalRequirements: 'Load analysis, ATS integration and backup power sizing.',
    status: 'In Conversation',
    createdAt: '2026-01-15',
    updatedAt: '2026-01-28',
    deadline: 'To be agreed',
    documents: [],
    messages: [{ id: 'm5', sender: 'IESCOM', text: 'Thank you. Please provide the latest factory load schedule.', time: 'Jan 28, 09:20' }],
    activity: [{ id: 'a6', title: 'Project created', detail: 'The project was submitted to IESCOM.', date: '2026-01-15 13:45' }],
  },
]

export const initialNotifications: NotificationItem[] = [
  { id: 'n1', title: 'Completion request', detail: 'Solar panel installation is ready for your approval.', time: '18 min ago', read: false, kind: 'approval', projectId: 'IES-2026-011' },
  { id: 'n2', title: 'New engineer message', detail: 'Marina Alvarez sent a message.', time: '2 hours ago', read: false, kind: 'message', projectId: 'IES-2026-014' },
  { id: 'n3', title: 'Document uploaded', detail: 'A new project document was added.', time: 'Yesterday', read: true, kind: 'document', projectId: 'IES-2026-014' },
  { id: 'n4', title: 'Status changed', detail: 'Warehouse lighting renovation was completed.', time: 'Feb 8', read: true, kind: 'status', projectId: 'IES-2026-008' },
]
