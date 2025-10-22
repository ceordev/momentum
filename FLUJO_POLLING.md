# 📋 Flujo de Polling - Momentum AI

## ✅ Implementación Completada

### **Cambios Realizados**

#### **1. Configuración (`src/config.js`)**
```javascript
GET_SUGGESTIONS_WEBHOOK: 'https://carlosolivares.app.n8n.cloud/webhook-test/get-suggestions'
POLLING_INTERVAL: 8000  // 8 segundos entre consultas
MAX_POLLING_ATTEMPTS: 60  // Máximo 8 minutos de espera
```

#### **2. Dashboard (`src/pages/Dashboard.jsx`)**
- ✅ Muestra enlace directo a `/review` después de enviar el bot exitosamente
- ✅ Feedback visual de éxito/error

#### **3. Vista de Revisión (`src/pages/TaskReview.jsx`)**
- ✅ Hace GET simple al webhook (sin parámetros)
- ✅ Implementa polling automático cada 8 segundos
- ✅ Muestra estados diferentes:
  - 🟡 **Analizando**: Polling activo esperando resultados
  - 🟢 **Listo**: Tickets recibidos y mostrados
  - 🔴 **Error**: Timeout o fallo de conexión

---

## 🔄 Flujo Completo

### **Paso 1: Usuario inicia el bot**
```
POST https://carlosolivares.app.n8n.cloud/webhook-test/start-recall-bot
Body: {
  "meeting_url": "https://meet.google.com/xxx-xxxx-xxx",
  "language": "es"
}
```

### **Paso 2: Usuario navega a /review**
Frontend automáticamente inicia polling inmediato

### **Paso 3: Polling activo**
```
GET https://carlosolivares.app.n8n.cloud/webhook-test/get-suggestions
```
⚠️ **Sin parámetros** - El backend identifica la reunión internamente

**Respuestas esperadas del backend:**

**A) Procesando (vacío):**
```json
{
  "tickets": []
}
```
→ Frontend sigue haciendo polling cada 8 segundos

**B) Listo (con datos):**
```json
{
  "tickets": [
    {
      "row_number": 2,
      "title": "Corregir problemas de diseño responsivo",
      "description": "Como usuario, quiero que la aplicación se visualice correctamente...",
      "ticket_type": "Bug",
      "suggested_assignee": "",
      "branch_slug": "bug/1-corregir-diseno-responsivo"
    }
  ]
}
```
→ Frontend detiene polling y muestra tarjetas

### **Paso 4: Usuario aprueba tickets**
```
POST https://carlosolivares.app.n8n.cloud/webhook-test/approved-tickets
Body: {
  "tickets": [
    {
      "title": "Corregir problemas de diseño responsivo",
      "description": "Como usuario, quiero que la aplicación se visualice correctamente...\n\nNombre de rama: bug/1-corregir-diseno-responsivo",
      "ticket_type": "Bug",
      "suggested_assignee": "Juan Pérez",
      "branch_slug": "bug/1-corregir-diseno-responsivo"
    }
  ]
}
```
⚠️ **Notas importantes**:
- Los tickets incluyen todas las modificaciones hechas por el usuario en el modal de edición
- El `branch_slug` se agrega automáticamente al final de la `description`

---

## 🎨 Estados de UI

### **Estado 1: Procesando (Polling Activo)**
```
🔄 Analizando transcripción...
El backend está procesando...
Intento 5 de 60
Consultando cada 8 segundos...
● ● ● (animación)
```

### **Estado 2: Listo**
```
📋 Revisión de Tareas
[Tarjetas de tickets]
[Botón: Crear Tickets Aprobados]
```

### **Estado 3: Error/Timeout**
```
⚠️ Error al obtener sugerencias
No se pudieron cargar las tareas...
[Reintentar]
```

---

## 🔧 Requisitos del Backend (n8n)

### **Webhook WF5: Get Suggestions**
- **URL**: `webhook-test/get-suggestions`
- **Método**: GET
- **Sin parámetros**: El backend identifica la reunión internamente (por sesión, última reunión, etc.)

**Lógica sugerida:**
1. Identificar la última reunión procesada (o por otro mecanismo de identificación)
2. Buscar en BD si hay tickets generados
3. Si **NO** hay tickets → retornar `{"tickets": []}`
4. Si **SÍ** hay tickets → retornar el array completo

**Formato de respuesta:**
```json
{
  "tickets": [
    {
      "row_number": "number (opcional)",
      "title": "string (requerido)",
      "description": "string (requerido)",
      "ticket_type": "Feature|Bug|Task (requerido)",
      "suggested_assignee": "string (opcional, puede ser vacío)",
      "branch_slug": "string (requerido)"
    }
  ]
}
```

**Campos:**
- `row_number`: Número de fila (opcional)
- `title`: Título del ticket
- `description`: Descripción completa
- `ticket_type`: Tipo de ticket (Feature, Bug o Task)
- `suggested_assignee`: Asignado sugerido (vacío = "Sin sugerencias")
- `branch_slug`: Nombre de la rama para Git

---

## 🧪 Testing

### **Escenario 1: Flujo completo**
1. Dashboard: Pegar URL de reunión → Clic "Iniciar"
2. Esperar mensaje de éxito
3. Clic en "Ir a Revisión de Tareas"
4. Ver estado "Analizando transcripción..."
5. Esperar a que aparezcan tickets
6. Aprobar tickets
7. Clic "Crear Tickets Aprobados en Jira"

### **Escenario 2: Timeout**
1. Iniciar bot pero backend no retorna datos
2. Después de 60 intentos (8 minutos) ver error
3. Clic "Reintentar" para reset

---

## 📝 Notas Importantes

1. **Simplicidad**: El webhook GET no requiere parámetros - el backend identifica la reunión internamente
2. **Cleanup**: El polling se limpia automáticamente cuando:
   - Se reciben tickets
   - Se alcanza el máximo de intentos
   - El usuario sale de la página
3. **Performance**: Solo hace 1 consulta cada 8 segundos, no sobrecarga el backend
4. **UX**: Muestra contador de intentos para transparencia

---

## 🚀 Listo para Testing

El frontend está **100% funcional** y listo para conectar con el backend WF5.
