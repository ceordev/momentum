// Configuración de webhooks de n8n
// IMPORTANTE: Actualiza estas URLs con tus webhooks reales de n8n

export const config = {
  // Webhook para iniciar el bot en una reunión
  INIT_BOT_WEBHOOK: 'https://carlosolivares.app.n8n.cloud/webhook/start-recall-bot',
  
  // Webhook para crear tickets aprobados en Jira
  CREATE_TICKETS_WEBHOOK: 'https://carlosolivares.app.n8n.cloud/webhook/approved-tickets',
  
  // Webhook para obtener sugerencias de tickets (WF5)
  GET_SUGGESTIONS_WEBHOOK: 'https://carlosolivares.app.n8n.cloud/webhook/get-suggestions',
  
  // Configuración de polling
  POLLING_INTERVAL: 8000, // 8 segundos entre cada consulta
  MAX_POLLING_ATTEMPTS: 60, // Máximo 60 intentos (8 minutos total)
  
  // Idiomas disponibles para la transcripción
  LANGUAGES: [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' },
  ],
  
  // Canales de notificación disponibles
  NOTIFICATION_CHANNELS: ['Slack', 'Google Chat'],
}
