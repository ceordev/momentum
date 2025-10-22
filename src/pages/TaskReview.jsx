import { useState, useEffect } from 'react'
import { Check, Edit2, Trash2, Send, AlertCircle, Loader2, FileText, Bug, Sparkles, GitBranch, User } from 'lucide-react'
import { config } from '../config'

// Mock data removido para testing con backend real

function TaskCard({ task, onApprove, onEdit, onDiscard }) {
  const typeConfig = {
    Feature: { icon: Sparkles, color: 'blue', label: 'Feature' },
    Bug: { icon: Bug, color: 'red', label: 'Bug' },
    Task: { icon: FileText, color: 'green', label: 'Task' },
  }

  const { icon: TypeIcon, color, label } = typeConfig[task.ticket_type] || typeConfig.Task

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-300',
    red: 'bg-red-100 text-red-700 border-red-300',
    green: 'bg-green-100 text-green-700 border-green-300',
  }

  return (
    <div className={`card ${task.approved ? 'ring-2 ring-green-500' : ''} transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${colorClasses[color]}`}>
            <TypeIcon size={20} />
          </div>
          <span className={`status-indicator ${colorClasses[color]}`}>
            {label}
          </span>
        </div>
        {task.approved && (
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <Check size={16} />
            <span className="text-sm font-medium">Aprobado</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-gray-600 mb-4">{task.description}</p>

      {/* Información adicional */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <GitBranch size={16} />
          <span className="font-medium">Nombre de rama:</span>
          <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{task.branch_slug}</code>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <User size={16} />
          <span className="font-medium">Asignado sugerido:</span>
          <span className="text-gray-700">{task.suggested_assignee || 'Sin sugerencias'}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onApprove(task.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            task.approved
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Check size={18} />
          <span>{task.approved ? 'Aprobado' : 'Aprobar'}</span>
        </button>
        
        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          title="Editar"
        >
          <Edit2 size={18} />
        </button>
        
        <button
          onClick={() => onDiscard(task.id)}
          className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          title="Descartar"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

function EditModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [ticketType, setTicketType] = useState(task.ticket_type)
  const [suggestedAssignee, setSuggestedAssignee] = useState(task.suggested_assignee || '')

  const handleSave = () => {
    onSave(task.id, { 
      title, 
      description, 
      ticket_type: ticketType,
      suggested_assignee: suggestedAssignee 
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Editar Ticket</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="input-field resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Ticket
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="input-field"
              >
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Asignado Sugerido
              </label>
              <input
                type="text"
                value={suggestedAssignee}
                onChange={(e) => setSuggestedAssignee(e.target.value)}
                placeholder="Sin sugerencias"
                className="input-field"
              />
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            Guardar Cambios
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function TaskReview() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [pollingStatus, setPollingStatus] = useState('checking') // checking, processing, ready, error
  const [pollingAttempts, setPollingAttempts] = useState(0)
  const [editingTask, setEditingTask] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    let pollingInterval = null
    let attemptCount = 0

    // Función para consultar sugerencias
    const fetchSuggestions = async () => {
      try {
        attemptCount++
        setPollingAttempts(attemptCount)
        
        // GET simple al webhook sin parámetros
        const response = await fetch(config.GET_SUGGESTIONS_WEBHOOK, {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          
          // Si hay tickets, detener polling y mostrarlos
          if (data.tickets && data.tickets.length > 0) {
            setTasks(data.tickets.map((ticket, index) => ({
              ...ticket,
              id: ticket.id || `ticket-${index}`,
              approved: false,
            })))
            setPollingStatus('ready')
            setLoading(false)
            if (pollingInterval) clearInterval(pollingInterval)
            return
          }
          
          // Si no hay tickets, seguir esperando
          setPollingStatus('processing')
        } else {
          console.warn('Error en la respuesta:', response.status)
        }

        // Si se alcanzó el máximo de intentos
        if (attemptCount >= config.MAX_POLLING_ATTEMPTS) {
          setPollingStatus('error')
          setLoading(false)
          if (pollingInterval) clearInterval(pollingInterval)
        }
      } catch (error) {
        console.error('Error consultando sugerencias:', error)
        
        // Si es el primer intento y falla, mostrar error
        if (attemptCount === 1) {
          setPollingStatus('error')
          setLoading(false)
          if (pollingInterval) clearInterval(pollingInterval)
        }
      }
    }

    // Primera consulta inmediata
    fetchSuggestions()
    setLoading(false)

    // Configurar polling cada X segundos
    pollingInterval = setInterval(fetchSuggestions, config.POLLING_INTERVAL)

    // Cleanup
    return () => {
      if (pollingInterval) clearInterval(pollingInterval)
    }
  }, [])

  const handleApprove = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, approved: !task.approved } : task
    ))
  }

  const handleEdit = (task) => {
    setEditingTask(task)
  }

  const handleSaveEdit = (taskId, updates) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ))
  }

  const handleDiscard = (taskId) => {
    if (confirm('¿Estás seguro de descartar este ticket?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const handleCreateTickets = async () => {
    const approvedTasks = tasks.filter(task => task.approved)
    
    if (approvedTasks.length === 0) {
      alert('Por favor, aprueba al menos un ticket antes de crear en Jira')
      return
    }

    setSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(config.CREATE_TICKETS_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tickets: approvedTasks.map(task => ({
            title: task.title,
            description: `${task.description}\n\nNombre de rama: ${task.branch_slug}`,
            ticket_type: task.ticket_type,
            suggested_assignee: task.suggested_assignee || '',
            branch_slug: task.branch_slug,
          })),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Limpiar tareas aprobadas después de 2 segundos
        setTimeout(() => {
          setTasks(tasks.filter(task => !task.approved))
          setSubmitStatus(null)
        }, 2000)
      } else {
        throw new Error('Error al crear tickets')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const approvedCount = tasks.filter(task => task.approved).length

  // Estado: Analizando transcripción (polling activo)
  if (pollingStatus === 'checking' || pollingStatus === 'processing') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <Loader2 className="animate-spin mx-auto mb-4 text-primary-600" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analizando transcripción...
          </h2>
          <p className="text-gray-600 mb-2">
            El backend está procesando la reunión y generando tickets sugeridos
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p>Intento {pollingAttempts} de {config.MAX_POLLING_ATTEMPTS}</p>
            <p className="mt-1">Consultando cada {config.POLLING_INTERVAL / 1000} segundos...</p>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    )
  }

  // Estado: Error o timeout
  if (pollingStatus === 'error' && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error al obtener sugerencias
          </h2>
          <p className="text-gray-600 mb-4">
            No se pudieron cargar las tareas sugeridas. Verifica que el webhook esté configurado correctamente o que la reunión haya sido procesada.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Revisión de Tareas
        </h1>
        <p className="text-lg text-gray-600">
          Revisa, edita y aprueba los tickets generados por IA antes de crearlos en Jira
        </p>
      </div>

      {/* Action Bar */}
      <div className="card mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            {approvedCount} de {tasks.length} tickets aprobados
          </p>
          <div className="mt-2 bg-gray-200 rounded-full h-2 w-64">
            <div
              className="bg-green-600 h-2 rounded-full transition-all"
              style={{ width: `${(approvedCount / tasks.length) * 100}%` }}
            />
          </div>
        </div>
        
        <button
          onClick={handleCreateTickets}
          disabled={approvedCount === 0 || submitting}
          className="btn-primary flex items-center space-x-2"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Creando...</span>
            </>
          ) : submitStatus === 'success' ? (
            <>
              <Check size={20} />
              <span>¡Tickets Creados!</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Crear Tickets Aprobados en Jira</span>
            </>
          )}
        </button>
      </div>

      {/* Status Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3 text-red-700">
          <AlertCircle size={24} />
          <p className="font-medium">Error al crear tickets. Verifica la configuración del webhook.</p>
        </div>
      )}

      {/* Task Cards */}
      <div className="space-y-6">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onApprove={handleApprove}
            onEdit={handleEdit}
            onDiscard={handleDiscard}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editingTask && (
        <EditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}

export default TaskReview
