Documento de Requerimientos del Frontend (Versión Simplificada): Momentum AI
Proyecto: Momentum AI - Asistente de Gestión de Proyectos Fecha: 21 de Octubre, 2025 Para: Agente de Desarrollo Frontend De: [Tu Nombre/Nombre del Proyecto]

1. Visión General del Producto 🎯
Momentum AI es una aplicación de escritorio que actúa como un "centro de mando" para Project Managers. El objetivo del frontend es proporcionar una interfaz limpia e intuitiva para iniciar el análisis de reuniones y supervisar las automatizaciones. Todas las credenciales y claves de API se gestionan de forma centralizada y segura en el backend (n8n), por lo que el frontend no manejará ninguna autenticación de usuario final.

2. Arquitectura y Stack Tecnológico Sugerido
Framework de Aplicación: Tauri (preferido) o Electron.

Framework de UI: React o Vue.

Estilo: Tailwind CSS.

Comunicación con el Backend: La UI se comunicará exclusivamente con los webhooks de n8n. Ninguna llamada a APIs externas (Jira, GitHub, Recall.ai) se hará directamente desde el frontend.

3. Vistas y Requerimientos Funcionales
La aplicación se simplifica a dos vistas principales para el MVP.

Vista 1: Dashboard Principal (/)
Esta es la pantalla de inicio y el centro de operaciones. Su objetivo es permitir al usuario iniciar el análisis de una reunión de forma rápida y sencilla.

RF-01: Campo de URL de Reunión: Un campo de texto prominente donde el usuario pueda pegar la URL de la reunión a la que desea que el bot se una.

RF-02: Selección de Idioma: Un menú desplegable junto al campo de la URL para seleccionar el idioma de la transcripción (ej. en, es, pt).

RF-03: Botón de Inicio: Un botón claro y grande que diga "▶️ Iniciar Asistente en Reunión".

Acción: Al hacer clic, el frontend debe construir un objeto JSON { "meeting_url": "...", "language": "..." } y enviarlo vía POST al webhook "Iniciar Bot" de n8n.

RF-04: Indicador de Estado del Bot: La interfaz debe mostrar un feedback visual después de hacer clic en el botón, como "Enviando bot a la reunión..." y luego "Bot en espera" o un mensaje de error si la llamada a n8n falla.

RF-05 (Opcional): Un pequeño enlace o ícono de engranaje que lleve a la Vista de Configuración.

Vista 2: Configuración (/settings)
Esta vista ya no maneja autenticación. Su propósito es permitir al usuario establecer preferencias y verificar el estado del sistema.

RF-06: Indicadores de Estado del Sistema: La interfaz debe mostrar una lista de los servicios principales (Jira, GitHub, Slack/Google Chat) y un indicador visual de su estado de conexión en el backend (ej. un punto verde y "Operacional"). Nota: Esto se puede implementar más adelante; para el MVP, se puede omitir.

RF-07: Selección de Preferencias: Un menú desplegable para que el usuario seleccione su canal de notificaciones por defecto (Slack o Google Chat). Esta preferencia se puede guardar localmente en la aplicación.

(Nota: La vista de "Revisión de Tareas" se considera una mejora futura. Para el MVP, los tickets se crearán directamente en Jira como se define en el backend).

4. Requerimientos No Funcionales
RNF-01: Seguridad: La regla de oro es: el frontend no debe manejar, almacenar ni enviar ninguna clave de API o token secreto. Toda la lógica que requiere autenticación debe ser delegada al backend de n8n.

RNF-02: Rendimiento: La aplicación debe ser ligera y rápida. Todas las llamadas al backend deben ser asíncronas, mostrando estados de carga para informar al usuario y no bloquear la interfaz.

RNF-03: Experiencia de Usuario (UX): El diseño debe ser minimalista, limpio y enfocado en la tarea principal: iniciar el análisis de una reunión con el menor número de clics posible.

Vista 3: Revisión de Tareas (/review)
Objetivo: Mostrar al usuario los tickets que la IA ha generado a partir de una transcripción, permitiéndole aprobar, editar o descartar cada uno antes de su creación final en Jira.

RF-10: Carga de Tareas Sugeridas:

Después de que el backend procese una reunión, la UI debería recibir una notificación (posiblemente vía un segundo webhook o una consulta periódica) indicando que hay un "borrador de reunión" listo para revisar. El dashboard principal podría mostrar un enlace a esta vista de revisión.

RF-11: Visualización en Tarjetas:

Cada ticket sugerido por la IA se mostrará como una tarjeta individual en una lista.

Cada tarjeta debe mostrar claramente el título, la descripción y el tipo de ticket (Feature, Bug, Task) propuesto por la IA.

RF-12: Acciones por Ticket:

Cada tarjeta debe tener tres botones de acción claros:

Aprobar (Checkbox/Botón): Marca el ticket como listo para ser creado.

Editar (Ícono de Lápiz): Abre una pequeña ventana modal que permite al usuario modificar el título y la descripción del ticket.

Descartar (Ícono de Papelera): Elimina el ticket sugerido de la lista.

RF-13: Creación Final en Jira:

En la parte superior o inferior de la página, debe haber un botón principal: "Crear Tickets Aprobados en Jira".

Acción: Al hacer clic, el frontend recopilará todos los tickets marcados como "aprobados" (y sus posibles ediciones) y enviará este array JSON final a un tercer webhook de n8n, cuya única función es crear los tickets en Jira.