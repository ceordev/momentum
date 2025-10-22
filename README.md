# Momentum AI

# Rutas y credenciales de Acceso
Prod: https://momentum-one-chi.vercel.app/

Video Demo: https://1drv.ms/v/c/2773db4810a10988/EbhbJdIli9VMoXaoBDbEUdEBQCP6vkCWQyHbb0ZWCJ0m5Q

Cuenta Outlook:

usuario: pruebaimagine1@outlook.com
contraseña: ImagineApps
JIRA: es necesario iniciar sesión con microsoft

Slack:

usuario: pruebaimagine1@outlook.com Pide poner codigo que se envia al correo


Asistente de Gestión de Proyectos - Frontend

## 🚀 Características

- **Dashboard Principal**: Inicia el análisis de reuniones con un solo clic
- **Revisión de Tareas**: Revisa, edita y aprueba tickets generados por IA
- **Configuración**: Gestiona preferencias y verifica el estado del sistema

## 🛠️ Tecnologías

- React 18
- Vite
- TailwindCSS
- React Router
- Lucide React (iconos)

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 📝 Configuración Backend

Asegúrate de configurar las URLs de los webhooks de n8n en `src/config.js`:

- `INIT_BOT_WEBHOOK`: URL para iniciar el bot en una reunión
- `CREATE_TICKETS_WEBHOOK`: URL para crear tickets aprobados en Jira
- `GET_SUGGESTIONS_WEBHOOK`: URL para obtener sugerencias de tickets (con polling automático)

## 📋 Formato de Datos

### Tickets recibidos del backend:
```json
{
  "tickets": [
    {
      "title": "Título del ticket",
      "description": "Descripción detallada",
      "ticket_type": "Feature|Bug|Task",
      "suggested_assignee": "Nombre o vacío",
      "branch_slug": "feature/nombre-de-rama"
    }
  ]
}
```

### Características de edición:
- ✏️ **Editar título y descripción** de cada ticket
- 🏷️ **Cambiar tipo de ticket** (Feature, Bug, Task)
- 👤 **Modificar asignado sugerido**
- 🌿 **Ver nombre de rama sugerida** para Git
- ✅ **Aprobar/rechazar** tickets individualmente

⚠️ **Nota**: Al enviar tickets aprobados, el nombre de rama se agrega automáticamente al final de la descripción.

## 🔄 Flujo de Polling

La vista de revisión consulta automáticamente al backend cada 8 segundos hasta que:
- Reciba tickets del backend (detiene polling)
- Alcance 60 intentos / 8 minutos (muestra error)

Ver `FLUJO_POLLING.md` para detalles completos.
