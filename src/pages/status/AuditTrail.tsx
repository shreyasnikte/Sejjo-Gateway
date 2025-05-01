import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import SecurityIcon from '@mui/icons-material/Security'
import BuildIcon from '@mui/icons-material/Build'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

type AuditCategory = 'workflow' | 'security' | 'system' | 'user'

type AuditLog = {
  id: string
  timestamp: string
  category: AuditCategory
  action: string
  user: string
  details: string
  ipAddress: string
}

export function AuditTrail() {
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 'AUD001',
      timestamp: '2024-03-10 14:30:15',
      category: 'workflow',
      action: 'Workflow Created',
      user: 'john.doe@example.com',
      details: 'Created new workflow "Customer Data Sync"',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'AUD002',
      timestamp: '2024-03-10 14:25:45',
      category: 'security',
      action: 'Login Attempt',
      user: 'admin@example.com',
      details: 'Failed login attempt - Invalid password',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'AUD003',
      timestamp: '2024-03-10 14:20:30',
      category: 'system',
      action: 'Service Update',
      user: 'system',
      details: 'Task Scheduler service restarted',
      ipAddress: 'localhost'
    },
    {
      id: 'AUD004',
      timestamp: '2024-03-10 14:15:10',
      category: 'user',
      action: 'User Updated',
      user: 'admin@example.com',
      details: 'Modified user permissions for jane.smith',
      ipAddress: '192.168.1.100'
    }
  ])

  const getCategoryIcon = (category: AuditCategory) => {
    switch (category) {
      case 'workflow':
        return <PlayArrowIcon className="category-icon workflow" />
      case 'security':
        return <SecurityIcon className="category-icon security" />
      case 'system':
        return <BuildIcon className="category-icon system" />
      case 'user':
        return <PersonIcon className="category-icon user" />
    }
  }

  return (
    <div className="audit-trail-page">
      <div className="status-header">
        <h1>Audit Trail</h1>
        <p className="status-subtitle">System-wide activity logs and changes</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Action</th>
              <th>User</th>
              <th>Details</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map(log => (
              <tr key={log.id} className={`audit-row category-${log.category}`}>
                <td className="category-cell">
                  {getCategoryIcon(log.category)}
                  <span className="category-label">{log.category}</span>
                </td>
                <td>{log.id}</td>
                <td>{log.timestamp}</td>
                <td>{log.action}</td>
                <td>{log.user}</td>
                <td>{log.details}</td>
                <td>{log.ipAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 