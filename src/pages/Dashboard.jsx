import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Loader2, CheckCircle2, AlertCircle, Link as LinkIcon, Globe, ArrowRight } from 'lucide-react'
import { config } from '../config'

function Dashboard() {
  const [meetingUrl, setMeetingUrl] = useState('')
  const [language, setLanguage] = useState('es')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleStartBot = async () => {
    if (!meetingUrl.trim()) {
      setStatus('error')
      setMessage('Por favor, ingresa una URL de reunión válida')
      return
    }

    setStatus('loading')
    setMessage('Enviando bot a la reunión...')

    try {
      const response = await fetch(config.INIT_BOT_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          meeting_url: meetingUrl,
          language: language,
        }),
      })

      if (response.ok) {
        // Guardar la URL de la reunión para consultar los resultados después
        localStorage.setItem('lastMeetingUrl', meetingUrl)
        localStorage.setItem('lastMeetingTimestamp', Date.now().toString())
        
        setStatus('success')
        setMessage('¡Bot enviado exitosamente! El asistente está en espera.')
        // Reset form after 3 seconds
        setTimeout(() => {
          setMeetingUrl('')
          setStatus('idle')
          setMessage('')
        }, 3000)
      } else {
        throw new Error('Error al enviar el bot')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Error al conectar con el backend. Verifica la configuración de webhooks.')
      console.error('Error:', error)
    }
  }

  const StatusIndicator = () => {
    if (status === 'idle') return null

    const statusConfig = {
      loading: {
        icon: Loader2,
        className: 'text-blue-600 bg-blue-50 border-blue-200',
        iconClassName: 'animate-spin',
      },
      success: {
        icon: CheckCircle2,
        className: 'text-green-600 bg-green-50 border-green-200',
        iconClassName: '',
      },
      error: {
        icon: AlertCircle,
        className: 'text-red-600 bg-red-50 border-red-200',
        iconClassName: '',
      },
    }

    const { icon: Icon, className, iconClassName } = statusConfig[status]

    return (
      <div className={`p-4 rounded-lg border ${className}`}>
        <div className="flex items-center space-x-3 mb-2">
          <Icon className={iconClassName} size={24} />
          <p className="font-medium">{message}</p>
        </div>
        {status === 'success' && (
          <Link 
            to="/review" 
            className="inline-flex items-center space-x-2 text-sm font-medium text-primary-700 hover:text-primary-800 mt-2"
          >
            <span>Ir a Revisión de Tareas</span>
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Centro de Operaciones
        </h1>
        <p className="text-lg text-gray-600">
          Inicia el análisis de reuniones de forma rápida y sencilla
        </p>
      </div>

      {/* Main Card */}
      <div className="card">
        <div className="space-y-6">
          {/* Meeting URL Input */}
          <div>
            <label htmlFor="meeting-url" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <LinkIcon size={18} />
              <span>URL de la Reunión</span>
            </label>
            <input
              id="meeting-url"
              type="url"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="input-field"
              disabled={status === 'loading'}
            />
            <p className="mt-2 text-sm text-gray-500">
              Pega aquí la URL de la reunión de Google Meet, Zoom, Teams, etc.
            </p>
          </div>

          {/* Language Selector */}
          <div>
            <label htmlFor="language" className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
              <Globe size={18} />
              <span>Idioma de Transcripción</span>
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field"
              disabled={status === 'loading'}
            >
              {config.LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Indicator */}
          {status !== 'idle' && <StatusIndicator />}

          {/* Start Button */}
          <button
            onClick={handleStartBot}
            disabled={status === 'loading' || !meetingUrl.trim()}
            className="btn-primary w-full flex items-center justify-center space-x-2 text-lg py-4"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Play size={24} />
                <span>Iniciar Asistente en Reunión</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-bold text-gray-900 mb-1">Bot Inteligente</h3>
          <p className="text-sm text-gray-600">
            El asistente se une automáticamente a tu reunión
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-bold text-gray-900 mb-1">Transcripción IA</h3>
          <p className="text-sm text-gray-600">
            Análisis automático y generación de tareas
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold text-gray-900 mb-1">Tickets en Jira</h3>
          <p className="text-sm text-gray-600">
            Creación directa de tickets después de revisión
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
