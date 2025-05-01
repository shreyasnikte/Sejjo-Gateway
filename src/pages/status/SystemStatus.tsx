import { useState, useEffect } from 'react'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import SpeedIcon from '@mui/icons-material/Speed'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

type MetricCard = {
  id: string
  title: string
  value: string
  status: 'healthy' | 'warning' | 'critical'
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  additionalInfo?: string
}

export function SystemStatus() {
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      id: 'workflow-executions',
      title: 'Active Workflows',
      value: '24',
      status: 'healthy',
      icon: <SpeedIcon />,
      trend: 'up',
      additionalInfo: '1.2k executions today'
    },
    {
      id: 'memory-usage',
      title: 'Memory Usage',
      value: '68%',
      status: 'warning',
      icon: <MemoryIcon />,
      trend: 'up',
      additionalInfo: '6.8 GB / 10 GB'
    },
    {
      id: 'database',
      title: 'Database Status',
      value: 'Connected',
      status: 'healthy',
      icon: <StorageIcon />,
      additionalInfo: 'Latency: 45ms'
    },
    {
      id: 'api-health',
      title: 'API Health',
      value: '99.9%',
      status: 'healthy',
      icon: <CloudQueueIcon />,
      trend: 'stable',
      additionalInfo: '234ms avg. response'
    }
  ])

  return (
    <div className="status-page">
      <div className="status-header">
        <h1>System Status</h1>
        <p className="status-subtitle">Real-time monitoring of workflow execution system</p>
      </div>

      <div className="metrics-grid">
        {metrics.map(metric => (
          <div key={metric.id} className={`metric-card status-${metric.status}`}>
            <div className="metric-header">
              <span className="metric-icon">{metric.icon}</span>
              <h3>{metric.title}</h3>
            </div>
            
            <div className="metric-value">
              <span className="value">{metric.value}</span>
              {metric.trend && (
                <span className={`trend trend-${metric.trend}`}>
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </span>
              )}
            </div>

            {metric.additionalInfo && (
              <div className="metric-info">{metric.additionalInfo}</div>
            )}
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="timestamp">2 min ago</span>
            <span className="activity-text">Workflow "Data Sync" completed successfully</span>
          </div>
          <div className="activity-item warning">
            <span className="timestamp">15 min ago</span>
            <span className="activity-text">High memory usage detected</span>
          </div>
          <div className="activity-item">
            <span className="timestamp">1 hour ago</span>
            <span className="activity-text">New workflow "Customer Import" deployed</span>
          </div>
        </div>
      </div>
    </div>
  )
} 