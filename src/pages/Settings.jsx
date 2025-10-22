import { useState, useEffect } from 'react'
import { Bell, Save, Check, Settings as SettingsIcon, CheckCircle, XCircle } from 'lucide-react'
import { config } from '../config'

function StatusIndicator({ status }) {
  const statusConfig = {
    operational: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Operacional' },
    degraded: { icon: XCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Degradado' },
    down: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Caído' },
  }
  const { icon: Icon, color, bg, label } = statusConfig[status] || statusConfig.operational

  return (
    <div className={`flex items-center space-x-2 ${color}`}>
      <div className={`p-1 rounded-full ${bg}`}><Icon size={16} /></div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  )
}

function Settings() {
  const [notificationChannel, setNotificationChannel] = useState('Slack')
  const [savedMessage, setSavedMessage] = useState(false)
  const [systemStatus] = useState({ jira: 'operational', github: 'operational', slack: 'operational', googleChat: 'operational', n8n: 'operational' })

  useEffect(() => {
    const saved = localStorage.getItem('notificationChannel')
    if (saved) setNotificationChannel(saved)
  }, [])

  const handleSave = () => {
    localStorage.setItem('notificationChannel', notificationChannel)
    setSavedMessage(true)
    setTimeout(() => setSavedMessage(false), 3000)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-lg text-gray-600">Gestiona tus preferencias y verifica el estado del sistema</p>
      </div>

      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-primary-100 text-primary-700 rounded-lg"><Bell size={24} /></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Preferencias de Notificaciones</h2>
              <p className="text-sm text-gray-600">Selecciona tu canal preferido para recibir notificaciones</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="notification-channel" className="block text-sm font-semibold text-gray-700 mb-2">Canal de Notificaciones</label>
              <select id="notification-channel" value={notificationChannel} onChange={(e) => setNotificationChannel(e.target.value)} className="input-field max-w-md">
                {config.NOTIFICATION_CHANNELS.map((channel) => (<option key={channel} value={channel}>{channel}</option>))}
              </select>
              <p className="mt-2 text-sm text-gray-500">Recibirás notificaciones sobre el progreso de las reuniones</p>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={handleSave} className="btn-primary flex items-center space-x-2">
                <Save size={18} /><span>Guardar Preferencias</span>
              </button>
              {savedMessage && (<div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg"><Check size={18} /><span className="font-medium">Guardado</span></div>)}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><SettingsIcon size={24} /></div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Estado del Sistema</h2>
              <p className="text-sm text-gray-600">Monitoreo de servicios integrados</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Jira', key: 'jira', color: 'blue', letter: 'J' },
              { name: 'GitHub', key: 'github', color: 'gray', letter: 'G' },
              { name: 'Slack', key: 'slack', color: 'purple', letter: 'S' },
              { name: 'Google Chat', key: 'googleChat', color: 'red', letter: 'GC' },
            ].map(service => (
              <div key={service.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${service.color}-600 text-white rounded-lg flex items-center justify-center font-bold`}>{service.letter}</div>
                  <span className="font-semibold text-gray-900">{service.name}</span>
                </div>
                <StatusIndicator status={systemStatus[service.key]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
