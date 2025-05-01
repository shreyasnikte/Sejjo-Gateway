import { ReactNode } from 'react'

type MainLayoutProps = {
  header: ReactNode
  navigation: ReactNode
  children: ReactNode
  footer: ReactNode
}

export function MainLayout({ header, navigation, children, footer }: MainLayoutProps) {
  return (
    <div className="app-container">
      <header className="top-bar">
        {header}
      </header>
      
      <main className="main-content">
        {navigation}
        <div className="content-area">
          {children}
        </div>
      </main>

      <footer className="footer">
        {footer}
      </footer>
    </div>
  )
} 