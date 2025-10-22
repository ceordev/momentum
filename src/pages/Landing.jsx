import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Zap, CheckCircle, Clock, Users, BarChart3, Sparkles, Github, MessageSquare } from 'lucide-react'

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles size={20} className="text-yellow-300" />
              <span className="text-sm font-medium">Potenciado por IA</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Gestión de Proyectos
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                En Piloto Automático
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Momentum AI analiza tus reuniones, extrae tareas automáticamente y crea tickets en Jira. 
              Sin esfuerzo manual. Sin olvidos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/dashboard" 
                className="group bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Comenzar Ahora</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <a 
                href="#como-funciona" 
                className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Ver Cómo Funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">90%</div>
              <div className="text-gray-600">Menos tiempo en gestión</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600">Tareas capturadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-600">Tickets olvidados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Automatización Inteligente
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deja que la IA se encargue del trabajo pesado mientras tú te enfocas en lo importante
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bot Automático</h3>
              <p className="text-gray-600">
                Envía el asistente a cualquier reunión de Google Meet, Zoom o Teams con un solo clic
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transcripción IA</h3>
              <p className="text-gray-600">
                Procesamiento inteligente en múltiples idiomas con comprensión contextual avanzada
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tickets Automáticos</h3>
              <p className="text-gray-600">
                Genera tickets en Jira con títulos, descripciones y tipos detectados automáticamente
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ahorra Tiempo</h3>
              <p className="text-gray-600">
                Elimina horas de trabajo manual creando documentación y tickets post-reunión
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border border-pink-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Para Equipos</h3>
              <p className="text-gray-600">
                Sugiere asignaciones automáticas y mantiene a todo el equipo sincronizado
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl border border-indigo-200 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sin Pérdidas</h3>
              <p className="text-gray-600">
                Captura el 100% de las tareas mencionadas, sin importar cuán rápida sea la conversación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600">
              3 pasos simples para automatizar tu gestión de proyectos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary-200">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Inicia el Bot</h3>
                <p className="text-gray-600 mb-4">
                  Pega la URL de tu reunión, selecciona el idioma y haz clic en "Iniciar Asistente"
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <code className="text-sm text-blue-800">meet.google.com/xxx-xxxx-xxx</code>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="text-primary-300" size={32} />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary-200">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">IA Analiza</h3>
                <p className="text-gray-600 mb-4">
                  El bot se une a la reunión, transcribe y extrae tareas automáticamente
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Procesando...</span>
                </div>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="text-primary-300" size={32} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary-200">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Revisa y Aprueba</h3>
              <p className="text-gray-600 mb-4">
                Edita si es necesario, aprueba los tickets y se crearán automáticamente en Jira
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-600 font-medium">
                <CheckCircle size={20} />
                <span>Listo para usar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Integraciones Potentes
            </h2>
            <p className="text-xl text-gray-600">
              Funciona con las herramientas que ya usas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="text-4xl mb-2">📹</div>
              <span className="font-semibold text-gray-700">Google Meet</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="text-4xl mb-2">🎥</div>
              <span className="font-semibold text-gray-700">Zoom</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mb-2">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="font-semibold text-gray-700">Jira</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <Github className="mb-2" size={40} />
              <span className="font-semibold text-gray-700">GitHub</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center mb-2">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-semibold text-gray-700">Slack</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <MessageSquare className="text-red-600 mb-2" size={40} />
              <span className="font-semibold text-gray-700">Google Chat</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="text-4xl mb-2">👥</div>
              <span className="font-semibold text-gray-700">Teams</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center mb-2">
                <span className="text-white font-bold">n8n</span>
              </div>
              <span className="font-semibold text-gray-700">n8n</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para Trabajar Más Inteligente?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a los equipos que están automatizando su gestión de proyectos
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
          >
            <span>Empezar Gratis</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing
