type OverviewCard = {
  id: string
  title: string
  description: string
  buttonText: string
  link: string
}

const overviewCards: OverviewCard[] = [
  {
    id: 'sketchbook',
    title: 'Open the Sketchbook',
    description: 'Create and edit your flow diagrams in our intuitive sketchbook interface. Design, modify, and collaborate on your diagrams with ease.',
    buttonText: 'Launch Sketchbook',
    link: '#'
  },
  {
    id: 'documentation',
    title: 'Read Documentation',
    description: 'Explore our comprehensive documentation to learn about features, best practices, and advanced usage of Sejjo Gateway.',
    buttonText: 'View Docs',
    link: '#'
  },
  {
    id: 'model-store',
    title: 'Open Model Store',
    description: 'Browse and download pre-built models and templates from our extensive model store. Find the perfect starting point for your project.',
    buttonText: 'Visit Store',
    link: '#'
  }
]

export function Dashboard() {
  return (
    <div className="overview-grid">
      {overviewCards.map(card => (
        <div key={card.id} className="overview-card">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
          <a href={card.link} className="card-button">
            {card.buttonText}
          </a>
        </div>
      ))}
    </div>
  )
} 