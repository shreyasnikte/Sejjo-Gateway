import { ReactNode } from 'react'

export type NavItem = {
  id: string
  label: string
  icon: ReactNode
}

export type NavItems = {
  [key: string]: NavItem[]
}

export type ActiveNavigation = {
  primary: string
  secondary?: string
} 