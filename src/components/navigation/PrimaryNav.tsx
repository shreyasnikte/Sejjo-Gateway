import { NavItem } from '../../types/navigation'

type PrimaryNavProps = {
  items: NavItem[]
  activeItem: string
  onItemClick: (id: string) => void
}

export function PrimaryNav({ items, activeItem, onItemClick }: PrimaryNavProps) {
  return (
    <nav className="primary-nav">
      <ul className="nav-items">
        {items.map(item => (
          <li
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
} 