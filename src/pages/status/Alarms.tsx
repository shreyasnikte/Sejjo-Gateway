import { useState } from 'react'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type AlarmSeverity = 'critical' | 'warning' | 'info' | 'resolved'

type Alarm = {
  id: string
  timestamp: string
  severity: AlarmSeverity
  source: string
  message: string
  status: 'active' | 'acknowledged' | 'resolved'
  acknowledgedBy?: string
  resolvedAt?: string
}

export function Alarms() {
  const [alarms] = useState<Alarm[]>([
    {
      id: 'ALM001',
      timestamp: '2024-03-10 14:23:45',
      severity: 'critical',
      source: 'Workflow Engine',
      message: 'Worker node disconnected unexpectedly',
      status: 'active'
    },
    {
      id: 'ALM002',
      timestamp: '2024-03-10 14:15:30',
      severity: 'warning',
      source: 'Data Storage',
      message: 'High latency detected in write operations',
      status: 'acknowledged',
      acknowledgedBy: 'John Doe'
    },
    {
      id: 'ALM003',
      timestamp: '2024-03-10 13:45:12',
      severity: 'info',
      source: 'Task Scheduler',
      message: 'Task queue size exceeds 100',
      status: 'active'
    },
    {
      id: 'ALM004',
      timestamp: '2024-03-10 12:30:00',
      severity: 'critical',
      source: 'API Gateway',
      message: 'Rate limit exceeded for client API-KEY-123',
      status: 'resolved',
      resolvedAt: '2024-03-10 13:15:22'
    }
  ])

  const getSeverityIcon = (severity: AlarmSeverity) => {
    switch (severity) {
      case 'critical':
        return <ErrorIcon className="severity-icon critical" />
      case 'warning':
        return <WarningIcon className="severity-icon warning" />
      case 'info':
        return <InfoIcon className="severity-icon info" />
      case 'resolved':
        return <CheckCircleIcon className="severity-icon resolved" />
    }
  }

  const getStatusBadge = (status: string) => {
    return <span className={`status-badge ${status}`}>{status}</span>
  }

  return (
    <div className="alarms-page">
      <div className="status-header">
        <h1>Alarms</h1>
        <p className="status-subtitle">Active and recent alarms in the system</p>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Severity</th>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Source</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map(alarm => (
              <tr key={alarm.id} className={`alarm-row severity-${alarm.severity}`}>
                <td className="severity-cell">
                  {getSeverityIcon(alarm.severity)}
                </td>
                <td>{alarm.id}</td>
                <td>{alarm.timestamp}</td>
                <td>{alarm.source}</td>
                <td>{alarm.message}</td>
                <td>{getStatusBadge(alarm.status)}</td>
                <td className="actions-cell">
                  {alarm.status === 'active' && (
                    <button className="action-button acknowledge">
                      Acknowledge
                    </button>
                  )}
                  {alarm.status === 'acknowledged' && (
                    <button className="action-button resolve">
                      Resolve
                    </button>
                  )}
                  <button className="action-button details">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 