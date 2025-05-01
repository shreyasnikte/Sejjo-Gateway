import { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import ErrorIcon from '@mui/icons-material/Error'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance'

type Service = {
  id: string
  name: string
  status: ServiceStatus
  uptime: string
  lastIncident?: string
  metrics?: {
    label: string
    value: string
  }[]
}

export function Services() {
  const [services] = useState<Service[]>([
    {
      id: 'workflow-engine',
      name: 'Workflow Engine',
      status: 'operational',
      uptime: '99.99%',
      metrics: [
        { label: 'Active Workers', value: '8' },
        { label: 'Queue Size', value: '12' }
      ]
    },
    {
      id: 'scheduler',
      name: 'Task Scheduler',
      status: 'operational',
      uptime: '99.95%',
      metrics: [
        { label: 'Scheduled Tasks', value: '156' },
        { label: 'Next Run', value: '2m' }
      ]
    },
    {
      id: 'data-storage',
      name: 'Data Storage',
      status: 'degraded',
      uptime: '99.82%',
      lastIncident: 'High latency detected 15m ago',
      metrics: [
        { label: 'Read Latency', value: '120ms' },
        { label: 'Write Latency', value: '180ms' }
      ]
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'maintenance',
      uptime: '98.45%',
      lastIncident: 'Scheduled maintenance in progress',
      metrics: [
        { label: 'Request Rate', value: '850/min' },
        { label: 'Error Rate', value: '0.1%' }
      ]
    }
  ])

  const getStatusIcon = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon className="status-icon operational" />
      case 'degraded':
        return <WarningIcon className="status-icon degraded" />
      case 'outage':
        return <ErrorIcon className="status-icon outage" />
      case 'maintenance':
        return <AccessTimeIcon className="status-icon maintenance" />
    }
  }

  return (
    <div className="services-page">
      <div className="status-header">
        <h1>Service Status</h1>
        <p className="status-subtitle">Current status of workflow execution services</p>
      </div>

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className={`service-card status-${service.status}`}>
            <div className="service-header">
              <div className="service-title">
                {getStatusIcon(service.status)}
                <h3>{service.name}</h3>
              </div>
              <div className="service-uptime">
                Uptime: {service.uptime}
              </div>
            </div>

            {service.lastIncident && (
              <div className="service-incident">
                {service.lastIncident}
              </div>
            )}

            {service.metrics && (
              <div className="service-metrics">
                {service.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <span className="metric-label">{metric.label}:</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 