type PageHeaderProps = {
  title?: string
}

export function PageHeader({title}: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1 id="page-title">{title}</h1>
    </header>
  )
}
