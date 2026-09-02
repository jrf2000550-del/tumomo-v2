import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, KanbanSquare, Users, Building2, Megaphone, Sparkles,
  MessageCircle, BarChart3, Calendar, FileCode2, ArrowLeft, Menu, X, Bell, RotateCcw,
} from 'lucide-react'
import { EstadoTag, Isotipo } from './ui'
import { useStore } from '../lib/store'
import { AGENTES } from '../data/demo'

const NAV = [
  { to: '/pro', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pro/crm', label: 'CRM', icon: KanbanSquare },
  { to: '/pro/leads', label: 'Leads', icon: Users },
  { to: '/pro/propiedades', label: 'Propiedades', icon: Building2 },
  { to: '/pro/requerimientos', label: 'Requerimientos', icon: Megaphone },
  { to: '/pro/ia', label: 'TuMomo AI', icon: Sparkles },
  { to: '/pro/whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { to: '/pro/marketing', label: 'Marketing', icon: BarChart3 },
  { to: '/pro/calendario', label: 'Calendario', icon: Calendar },
  { to: '/pro/landings', label: 'Landing Pages', icon: FileCode2 },
]

export default function ProLayout() {
  const [open, setOpen] = useState(false)
  const { leadsExtra, reiniciarDemo } = useStore()
  const agente = AGENTES[0]

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto bg-momo-navy text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <Isotipo size={28} className="text-white" />
          <p className="font-display text-[21px] font-extrabold tracking-[-0.03em] leading-none">tumomo</p>
          <span className="rounded-md bg-momo-blue px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Pro
          </span>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-0.5 p-3">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-momo-blue text-white' : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <n.icon className="h-4 w-4 shrink-0" />
              {n.label}
              {n.label === 'Leads' && leadsExtra.length > 0 && (
                <span className="ml-auto rounded-full bg-momo-blue px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {leadsExtra.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3 p-4">
          {leadsExtra.length > 0 && (
            <button
              onClick={reiniciarDemo}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white/5 px-3 py-2 text-xs text-neutral-400 ring-1 ring-white/10 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reiniciar demo
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-neutral-400 hover:bg-white/5 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Volver al sitio público
          </Link>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Contenido */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-momo-line bg-white/90 px-5 py-3 backdrop-blur-md md:px-8">
          <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-lg ring-1 ring-neutral-300 lg:hidden">
            <Menu className="h-4.5 w-4.5" />
          </button>

          <div className="min-w-0">
            <p className="truncate font-display text-sm font-bold">Panel del profesional</p>
            <p className="text-[11px] text-momo-muted">Vista de demostración</p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <EstadoTag tipo="simulado" />
            <button className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-neutral-100">
              <Bell className="h-4.5 w-4.5" />
              {leadsExtra.length > 0 && (
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-momo-blue" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <img src={agente.foto} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="hidden sm:block">
                <p className="text-xs font-bold leading-none">{agente.nombre}</p>
                <p className="mt-0.5 text-[11px] text-momo-muted">Agente</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-8"><Outlet /></main>
      </div>
    </div>
  )
}
