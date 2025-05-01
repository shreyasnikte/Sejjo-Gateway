import { NavItem } from '../../types/navigation'

type SecondaryNavProps = {
  items: NavItem[]
  title: string
  width: number
  onResize: (e: React.MouseEvent) => void
  activeItem?: string
  onItemClick?: (id: string) => void
}

export function SecondaryNav({ 
  items, 
  title, 
  width, 
  onResize,
  activeItem,
  onItemClick 
}: SecondaryNavProps) {
  return (
    <div 
      className="secondary-nav"
      style={{ width }}
    >
      <div className="secondary-nav-header">
        {title}
      </div>
      <ul className="secondary-nav-items">
        {items.map(item => (
          <li
            key={item.id}
            className={`secondary-nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick?.(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div 
        className="resize-handle"
        onMouseDown={onResize}
      />
    </div>
  )
} 