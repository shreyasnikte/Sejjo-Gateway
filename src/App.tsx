import { useState } from 'react'
import { MainLayout } from './layouts/MainLayout'
import { PrimaryNav } from './components/navigation/PrimaryNav'
import { SecondaryNav } from './components/navigation/SecondaryNav'
import { Dashboard } from './pages/overview/Dashboard'
import { Projects } from './pages/overview/Projects'
import { Reports } from './pages/overview/Reports'
import { SystemStatus } from './pages/status/SystemStatus'
import { Services } from './pages/status/Services'
import { Alarms } from './pages/status/Alarms'
import { AuditTrail } from './pages/status/AuditTrail'
import { primaryNavItems, secondaryNavItems } from './config/navigation'
import { useResizable } from './hooks/useResizable'
import { ActiveNavigation } from './types/navigation'

function App() {
  const [activeNav, setActiveNav] = useState<ActiveNavigation>({
    primary: 'overview',
    secondary: 'dashboard'
  })

  const { width: leftPanelWidth, handleMouseDown } = useResizable({
    initialWidth: 250,
    minWidth: 200,
    maxWidth: 300
  })

  const handlePrimaryNavClick = (id: string) => {
    setActiveNav({
      primary: id,
      secondary: secondaryNavItems[id][0].id
    })
  }

  const handleSecondaryNavClick = (id: string) => {
    setActiveNav(prev => ({
      ...prev,
      secondary: id
    }))
  }

  const renderContent = () => {
    const { primary, secondary } = activeNav

    if (primary === 'overview') {
      switch (secondary) {
        case 'dashboard':
          return <Dashboard />
        case 'projects':
          return <Projects />
        case 'reports':
          return <Reports />
        default:
          return <Dashboard />
      }
    }

    if (primary === 'status') {
      switch (secondary) {
        case 'system':
          return <SystemStatus />
        case 'services':
          return <Services />
        case 'alarms':
          return <Alarms />
        case 'audit':
          return <AuditTrail />
        default:
          return <SystemStatus />
      }
    }

    // Placeholder for other primary sections
    return (
      <div>
        <h2>{primary} - {secondary}</h2>
        <p>Content for this section will be implemented soon</p>
      </div>
    )
  }

  const navigation = (
    <>
      <PrimaryNav
        items={primaryNavItems}
        activeItem={activeNav.primary}
        onItemClick={handlePrimaryNavClick}
      />
      <SecondaryNav
        items={secondaryNavItems[activeNav.primary]}
        title={primaryNavItems.find(item => item.id === activeNav.primary)?.label || ''}
        width={leftPanelWidth}
        onResize={handleMouseDown}
        activeItem={activeNav.secondary}
        onItemClick={handleSecondaryNavClick}
      />
    </>
  )

  return (
    <MainLayout
      header={<h1>Sejjo Gateway</h1>}
      navigation={navigation}
      footer="Status: Ready"
    >
      {renderContent()}
    </MainLayout>
  )
}

export default App
