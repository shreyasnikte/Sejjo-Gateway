import DashboardIcon from '@mui/icons-material/Dashboard'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SettingsIcon from '@mui/icons-material/Settings'
import ListAltIcon from '@mui/icons-material/ListAlt'
import FolderIcon from '@mui/icons-material/Folder'
import DescriptionIcon from '@mui/icons-material/Description'
import ComputerIcon from '@mui/icons-material/Computer'
import BuildIcon from '@mui/icons-material/Build'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PersonIcon from '@mui/icons-material/Person'
import TuneIcon from '@mui/icons-material/Tune'
import SecurityIcon from '@mui/icons-material/Security'
import HistoryIcon from '@mui/icons-material/History'
import { NavItem, NavItems } from '../types/navigation'

export const primaryNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
  { id: 'status', label: 'Status', icon: <AssessmentIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> }
]

export const secondaryNavItems: NavItems = {
  overview: [
    { id: 'dashboard', label: 'Dashboard', icon: <ListAltIcon /> },
    { id: 'projects', label: 'Projects', icon: <FolderIcon /> },
    { id: 'reports', label: 'Reports', icon: <DescriptionIcon /> }
  ],
  status: [
    { id: 'system', label: 'System Status', icon: <ComputerIcon /> },
    { id: 'services', label: 'Services', icon: <BuildIcon /> },
    { id: 'alarms', label: 'Alarms', icon: <NotificationsIcon /> },
    { id: 'audit', label: 'Audit Trail', icon: <HistoryIcon /> }
  ],
  settings: [
    { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'preferences', label: 'Preferences', icon: <TuneIcon /> },
    { id: 'security', label: 'Security', icon: <SecurityIcon /> }
  ]
} 