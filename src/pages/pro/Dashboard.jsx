import { Link } from 'react-router-dom'
import {
  Users, Phone, Calendar, Handshake, Flame, ArrowRight, TrendingUp, Sparkles,
} from 'lucide-react'
import { AIPanel, Btn, Badge, Reveal, Counter, NotaDemo, EstadoTag } from '../../components/ui'
import { useStore } from '../../lib/store'
import { CAMPANA_SERIE, CAMPANAS, ETAPAS, fmtUSD } from '../../data/demo'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

export default function Dashboard() {
  const { leads, eventos } = useStore()

  const nuevos = leads.filter((l) => l.etapa === 'Nuevo')
  const seguimientos = leads.filter((l) => ['Contactado', 'Propiedades enviadas'].includes(l.etapa))
  const visitas = leads.filter((l) => l.etapa === 'Visita')
  const negociaciones = leads.filter((l) => l.etapa === 'Negociación')
  const calientes = leads.filter((l) => l.temperatura === 'Caliente')

  const hoy = [
    { icon: Users, n: leads.length, l: 'Leads totales', to: '/pro/leads', tone: 'bg-momo-blue-soft' },
    { icon: Phone, n: seguimientos.length, l: 'Seguimientos', to: '/pro/crm', tone: 'bg-blue-50' },
    { icon: Calendar, n: eventos.length, l: 'Visitas agendadas', to: '/pro/calendario', tone: 'bg-emerald-50' },
    { icon: Handshake, n: negociaciones.length, l: 'Negociaciones', to: '/pro/crm', tone: 'bg-violet-50' },
    { icon: Flame, n: calientes.length, l: 'Oportunidades calientes', to: '/pro/leads', tone: 'bg-red-50' },
  ]

  const embudo = ETAPAS.map((e) => ({ etapa: e, n: leads.filter((l) => l.etapa === e).length }))
  const maxEmbudo = Math.max(...embudo.map((e) => e.n), 1)

  const prioridad = leads
    .filter((l) => l.temperatura === 'Caliente' && l.etapa !== 'Cierre')
    .slice(0, 4)

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Hoy</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Resumen de tu actividad comercial
          </p>
        </div>
        <Btn as={Link} to="/pro/crm" variant="black" size="sm">
          Abrir CRM <ArrowRight className="h-4 w-4" />
        </Btn>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {hoy.map((k, i) => (
          <Reveal key={k.l} delay={i * 50}>
            <Link to={k.to} className="block rounded-2xl bg-white p-5 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${k.tone}`}>
                <k.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-display text-3xl font-black tracking-tight">
                <Counter to={k.n} />
              </p>
              <p className="mt-0.5 text-xs text-momo-muted">{k.l}</p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Embudo */}
        <Reveal>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold">Pipeline comercial</h2>
              <Link to="/pro/crm" className="text-xs font-semibold text-momo-black hover:underline">Ver CRM →</Link>
            </div>
            <div className="mt-5 space-y-2.5">
              {embudo.map((e) => (
                <div key={e.etapa}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-neutral-600">{e.etapa}</span>
                    <span className="font-display font-bold">{e.n}</span>
                  </div>
                  <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-momo-amber transition-all duration-1000"
                      style={{ width: `${(e.n / maxEmbudo) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* IA */}
        <Reveal delay={80}>
          <AIPanel>
            <p className="text-sm leading-relaxed text-neutral-300">
              Tenés <strong className="text-white">{calientes.length} oportunidades calientes</strong> sin
              actividad reciente y <strong className="text-white">{nuevos.length} leads nuevos</strong> sin
              contactar.
            </p>
            <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-momo-amber">Recomendación</p>
              <p className="mt-1.5 text-sm text-neutral-300">
                Priorizá a {prioridad[0]?.nombre || 'tus leads calientes'}: está en etapa
                "{prioridad[0]?.etapa}" con presupuesto de {fmtUSD(prioridad[0]?.presupuesto || 0)}.
                Enviale opciones antes de que compare con otro agente.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Btn as={Link} to="/pro/ia" variant="yellow" size="sm">
                <Sparkles className="h-4 w-4" /> Abrir TuMomo AI
              </Btn>
              <Btn as={Link} to="/pro/leads" variant="outline" size="sm" className="!bg-transparent !text-white !ring-white/20 hover:!bg-white/10">
                Ver leads
              </Btn>
            </div>
          </AIPanel>
        </Reveal>
      </div>

      {/* Prioridad de hoy */}
      <Reveal>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
          <h2 className="font-display text-lg font-bold">Tu prioridad de hoy</h2>
          <p className="text-sm text-neutral-600">Leads calientes que requieren acción</p>
          <div className="mt-4 space-y-2">
            {prioridad.length === 0 ? (
              <p className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-momo-muted">
                No hay leads calientes pendientes.
              </p>
            ) : prioridad.map((l) => (
              <Link
                key={l.id}
                to={`/pro/leads/${l.id}`}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-momo-line p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <img src={l.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{l.nombre}</p>
                    <Badge tone="red"><Flame className="h-3 w-3" /> Caliente</Badge>
                    {l.nuevo && <Badge tone="yellow">Nuevo</Badge>}
                  </div>
                  <p className="text-xs text-momo-muted">
                    {l.etapa} · {l.zona} · {fmtUSD(l.presupuesto)} · {l.ultimoContacto}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Marketing */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-display text-lg font-bold">Leads de la semana</h2>
                <p className="text-xs text-momo-muted">Ingresos por campaña de Meta Ads</p>
              </div>
              <EstadoTag tipo="simulado" />
            </div>
            <div className="mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CAMPANA_SERIE} margin={{ left: -22, right: 6 }}>
                  <defs>
                    <linearGradient id="gLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f6c400" stopOpacity={0.7} />
                      <stop offset="100%" stopColor="#f6c400" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                  <XAxis dataKey="dia" tick={{ fontSize: 11 }} stroke="#999" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 12 }} />
                  <Area type="monotone" dataKey="leads" stroke="#f6c400" strokeWidth={2.5} fill="url(#gLeads)" />
                  <Area type="monotone" dataKey="calificados" stroke="#d7262e" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold">Campañas activas</h2>
              <Link to="/pro/marketing" className="text-xs font-semibold text-momo-black hover:underline">Ver todas →</Link>
            </div>
            <div className="mt-4 space-y-2.5">
              {CAMPANAS.filter((c) => c.estado === 'Activa').map((c) => (
                <div key={c.id} className="rounded-xl border border-momo-line p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold">{c.nombre}</p>
                    <Badge tone="green">{c.estado}</Badge>
                  </div>
                  <div className="mt-2 flex gap-4 text-xs text-neutral-600">
                    <span><strong className="font-display text-sm">{c.leads}</strong> leads</span>
                    <span><strong className="font-display text-sm">${c.cpl}</strong> CPL</span>
                    <span><strong className="font-display text-sm">{c.calificados}</strong> calif.</span>
                  </div>
                </div>
              ))}
            </div>
            <NotaDemo>Métricas de campañas simuladas.</NotaDemo>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
