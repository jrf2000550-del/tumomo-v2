import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageCircle, Send, Sparkles, Check, BarChart3, TrendingUp, Calendar as CalIcon,
  FileCode2, Wand2, Plus, Eye, Megaphone, Target, ArrowRight, Copy,
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'
import { AIPanel, Btn, Badge, EstadoTag, NotaDemo, Reveal, SectionHead } from '../../components/ui'
import { useStore } from '../../lib/store'
import {
  CAMPANAS, CAMPANA_SERIE, PROPIEDADES, REQUERIMIENTOS, getAgente, fmtUSD,
} from '../../data/demo'

// ---------------------------------------------------------------------------
// WHATSAPP
// ---------------------------------------------------------------------------

export function WhatsApp() {
  const { leads } = useStore()
  const conversables = leads.slice(0, 8)
  const [sel, setSel] = useState(conversables[0]?.id)
  const lead = conversables.find((l) => l.id === sel)
  const [enviados, setEnviados] = useState([])
  const [draft, setDraft] = useState('')

  const hilo = lead ? [
    { de: 'lead', txt: `Hola, vi la publicación en TuMomo. ¿Sigue disponible?`, hora: '09:12' },
    { de: 'agente', txt: `¡Hola ${lead.nombre.split(' ')[0]}! Sí, sigue disponible. ¿Buscás para vivir o para invertir?`, hora: '09:14' },
    { de: 'lead', txt: lead.operacion === 'Inversión' ? 'Para invertir, me interesa la rentabilidad.' : 'Para vivir, con mi familia.', hora: '09:20' },
    ...enviados.filter((e) => e.leadId === lead.id).map((e) => ({ de: 'agente', txt: e.txt, hora: 'ahora' })),
  ] : []

  const enviar = () => {
    if (!draft.trim()) return
    setEnviados((p) => [...p, { leadId: lead.id, txt: draft }])
    setDraft('')
  }

  const generar = () => {
    setDraft(
      `Te preparé una selección según lo que buscás en ${lead.zona} ` +
      `dentro de ${fmtUSD(lead.presupuesto)}. ¿Te viene bien que coordinemos una visita esta semana?`
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black tracking-tight">WhatsApp</h1>
          <EstadoTag tipo="simulado" />
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          WhatsApp ↔ TuMomo CRM ↔ TuMomo AI. Cada conversación queda registrada en el lead.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Lista de conversaciones */}
        <div className="rounded-2xl bg-white ring-1 ring-momo-line">
          <p className="border-b border-momo-line px-4 py-3 text-xs font-bold uppercase tracking-wider text-momo-muted">
            Conversaciones
          </p>
          <div className="max-h-[520px] overflow-y-auto">
            {conversables.map((l) => (
              <button
                key={l.id}
                onClick={() => setSel(l.id)}
                className={`flex w-full items-center gap-3 border-b border-neutral-100 p-3 text-left transition-colors ${
                  sel === l.id ? 'bg-momo-blue-soft' : 'hover:bg-neutral-50'
                }`}
              >
                <img src={l.avatar} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{l.nombre}</p>
                  <p className="truncate text-xs text-momo-muted">{l.zona} · {fmtUSD(l.presupuesto)}</p>
                </div>
                {l.temperatura === 'Caliente' && <span className="h-2 w-2 shrink-0 rounded-full bg-momo-blue" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        {lead && (
          <div className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
            <div className="flex items-center gap-3 border-b border-momo-line px-4 py-3">
              <img src={lead.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{lead.nombre}</p>
                <p className="text-xs text-momo-muted">{lead.telefono}</p>
              </div>
              <Link to={`/pro/leads/${lead.id}`} className="text-xs font-bold text-momo-black hover:underline">
                Ver lead →
              </Link>
            </div>

            <div className="flex-1 space-y-3 bg-[#efe7dd] p-4" style={{ minHeight: 340 }}>
              {hilo.map((m, i) => (
                <div key={i} className={`flex ${m.de === 'agente' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[78%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                    m.de === 'agente' ? 'bg-[#d9fdd3]' : 'bg-white'
                  }`}>
                    {m.txt}
                    <span className="mt-1 block text-right text-[10px] text-momo-muted">{m.hora}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-momo-line p-3">
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && enviar()}
                  placeholder="Escribí un mensaje…"
                  className="flex-1 rounded-full border border-momo-line px-4 py-2.5 text-sm outline-none focus:border-momo-amber"
                />
                <Btn size="sm" variant="outline" onClick={generar}>
                  <Sparkles className="h-4 w-4" /> <span className="hidden sm:inline">IA</span>
                </Btn>
                <Btn size="sm" onClick={enviar}><Send className="h-4 w-4" /></Btn>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {['Registrar actividad', 'Crear tarea', 'Agendar visita'].map((a) => (
                  <button key={a} className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold hover:bg-neutral-200">
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <NotaDemo>
        Experiencia conceptual. La integración real usa la API oficial de WhatsApp Business.
      </NotaDemo>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MARKETING (Meta Ads)
// ---------------------------------------------------------------------------

export function Marketing() {
  const totales = CAMPANAS.reduce((a, c) => ({
    inversion: a.inversion + c.inversion,
    leads: a.leads + c.leads,
    calificados: a.calificados + c.calificados,
    visitas: a.visitas + c.visitas,
    conversiones: a.conversiones + c.conversiones,
  }), { inversion: 0, leads: 0, calificados: 0, visitas: 0, conversiones: 0 })

  const cplGlobal = (totales.inversion / totales.leads).toFixed(2)

  const embudo = [
    ['Leads', totales.leads],
    ['Calificados', totales.calificados],
    ['Visitas', totales.visitas],
    ['Conversiones', totales.conversiones],
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black tracking-tight">Marketing</h1>
          <EstadoTag tipo="simulado" />
        </div>
        <p className="mt-1 text-sm text-neutral-600">Facebook / Instagram · Publicidad → Lead → CRM → IA → Venta</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {[
          [`$${totales.inversion}`, 'Inversión'],
          [totales.leads, 'Leads'],
          [`$${cplGlobal}`, 'CPL promedio'],
          [totales.calificados, 'Calificados'],
          [totales.conversiones, 'Conversiones'],
        ].map(([v, l], i) => (
          <Reveal key={l} delay={i * 50}>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-momo-line">
              <p className="font-display text-2xl font-black tracking-tight">{v}</p>
              <p className="mt-0.5 text-xs text-momo-muted">{l}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Embudo */}
      <Reveal>
        <div className="rounded-2xl bg-momo-navy p-6 text-white">
          <h2 className="font-display text-lg font-bold">Embudo de conversión</h2>
          <p className="text-xs text-neutral-400">De la campaña al cierre</p>
          <div className="mt-6 flex flex-wrap items-end gap-3">
            {embudo.map(([l, v], i) => {
              const pct = (v / embudo[0][1]) * 100
              return (
                <div key={l} className="flex items-center gap-3">
                  <div className="text-center">
                    <div
                      className="mx-auto w-24 rounded-t-lg bg-momo-amber transition-all duration-1000"
                      style={{ height: Math.max(24, pct * 1.3) }}
                    />
                    <p className="mt-2 font-display text-2xl font-black">{v}</p>
                    <p className="text-[11px] text-neutral-400">{l}</p>
                    <p className="text-[10px] text-momo-muted">{pct.toFixed(0)}%</p>
                  </div>
                  {i < embudo.length - 1 && <ArrowRight className="h-4 w-4 text-neutral-600" />}
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
            <h2 className="font-display text-lg font-bold">Rendimiento semanal</h2>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CAMPANA_SERIE} margin={{ left: -22, right: 6 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                  <XAxis dataKey="dia" tick={{ fontSize: 11 }} stroke="#999" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="leads" fill="#f6c400" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="calificados" fill="#151515" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <AIPanel title="TuMomo AI · Marketing">
            <p className="text-sm leading-relaxed text-neutral-300">
              La campaña <strong className="text-white">"Casas en Urubó"</strong> tiene el CPL más alto ($14,7)
              pero la mejor tasa de conversión a visita (29%).
            </p>
            <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-momo-amber">Recomendación</p>
              <p className="mt-1.5 text-sm text-neutral-300">
                Aumentá el presupuesto de esa campaña un 30% y pausá "Terrenos con crédito directo",
                que lleva 4 días sin generar visitas.
              </p>
            </div>
          </AIPanel>
        </Reveal>
      </div>

      <div>
        <SectionHead title="Campañas" kicker="Meta Ads" />
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-momo-line">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-neutral-50">
              <tr className="text-left text-xs uppercase tracking-wider text-momo-muted">
                {['Campaña', 'Red', 'Estado', 'Inversión', 'Leads', 'CPL', 'Calificados', 'Visitas', 'Conv.'].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAMPANAS.map((c, i) => (
                <tr key={c.id} className={`border-t border-neutral-100 ${i % 2 ? 'bg-neutral-50/40' : ''}`}>
                  <td className="px-4 py-3 font-semibold">{c.nombre}</td>
                  <td className="px-4 py-3 text-neutral-600">{c.red}</td>
                  <td className="px-4 py-3">
                    <Badge tone={c.estado === 'Activa' ? 'green' : 'neutral'}>{c.estado}</Badge>
                  </td>
                  <td className="px-4 py-3">${c.inversion}</td>
                  <td className="px-4 py-3 font-semibold">{c.leads}</td>
                  <td className="px-4 py-3">${c.cpl}</td>
                  <td className="px-4 py-3">{c.calificados}</td>
                  <td className="px-4 py-3">{c.visitas}</td>
                  <td className="px-4 py-3 font-semibold">{c.conversiones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <NotaDemo>Métricas de campañas simuladas. La integración real usa la API de Meta.</NotaDemo>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CALENDARIO
// ---------------------------------------------------------------------------

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const HORAS = ['09:00', '09:30', '10:00', '11:00', '11:30', '14:00', '15:30', '16:00', '17:00']

export function Calendario() {
  const { eventos } = useStore()

  const color = {
    red: 'bg-momo-blue text-white',
    yellow: 'bg-momo-amber text-momo-navy',
    black: 'bg-momo-navy text-white',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-3xl font-black tracking-tight">Calendario</h1>
            <EstadoTag tipo="funcional" />
          </div>
          <p className="mt-1 text-sm text-neutral-600">{eventos.length} eventos esta semana</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {[['Visita', 'bg-momo-blue'], ['Seguimiento / Llamada', 'bg-momo-amber'], ['Reunión', 'bg-momo-navy']].map(([l, c]) => (
            <span key={l} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${c}`} /> {l}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-momo-line">
        <div className="min-w-[820px]">
          <div className="grid grid-cols-[70px_repeat(6,1fr)] border-b border-momo-line bg-neutral-50">
            <div />
            {DIAS.map((d) => (
              <div key={d} className="px-3 py-3 text-center">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-600">{d}</p>
              </div>
            ))}
          </div>

          {HORAS.map((h) => (
            <div key={h} className="grid grid-cols-[70px_repeat(6,1fr)] border-b border-neutral-100 last:border-0">
              <div className="px-2 py-3 text-right text-[11px] text-neutral-400">{h}</div>
              {DIAS.map((_, di) => {
                const evs = eventos.filter((e) => e.dia === di + 1 && e.hora === h)
                return (
                  <div key={di} className="min-h-[52px] border-l border-neutral-100 p-1">
                    {evs.map((e) => (
                      <div
                        key={e.id}
                        className={`mb-1 rounded-lg px-2 py-1.5 text-[11px] leading-tight ${color[e.color]} ${
                          e.nuevo ? 'pulse-ring ring-2 ring-momo-amber' : ''
                        }`}
                      >
                        <p className="font-bold">{e.titulo}</p>
                        <p className="opacity-80">{e.lead}</p>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <NotaDemo>
        Las visitas agendadas desde una ficha de propiedad o desde un lead aparecen acá resaltadas.
      </NotaDemo>
    </div>
  )
}

// ---------------------------------------------------------------------------
// LANDING PAGES
// ---------------------------------------------------------------------------

const TIPOS_LANDING = [
  { id: 'propiedad', t: 'Propiedad', d: 'Una página dedicada a un inmueble específico' },
  { id: 'proyecto', t: 'Proyecto', d: 'Para un desarrollo completo con unidades' },
  { id: 'agente', t: 'Agente', d: 'Tu perfil profesional con tu portafolio' },
  { id: 'campana', t: 'Campaña', d: 'Optimizada para tráfico pago de Meta Ads' },
  { id: 'captacion', t: 'Captación', d: 'Para conseguir propiedades de propietarios' },
]

export function Landings() {
  const [tipo, setTipo] = useState('propiedad')
  const [generando, setGenerando] = useState(false)
  const [resultado, setResultado] = useState(null)
  const prop = PROPIEDADES[0]

  const generar = () => {
    setGenerando(true)
    setResultado(null)
    setTimeout(() => {
      setGenerando(false)
      setResultado({
        headline: tipo === 'captacion'
          ? '¿Querés vender tu propiedad en Equipetrol?'
          : tipo === 'agente'
          ? 'Carlos Mendoza · Especialista en Equipetrol'
          : `${prop.nombre} — ${prop.zona}`,
        sub: tipo === 'captacion'
          ? 'Tasación sin costo y publicación en TuMomo con difusión pagada.'
          : `${prop.dorm} dormitorios · ${prop.superficie} m² · desde ${fmtUSD(prop.precio)}`,
        bullets: tipo === 'captacion'
          ? ['Tasación profesional sin costo', 'Fotos y video incluidos', 'Difusión en Meta Ads', 'Filtro previo de interesados']
          : ['Entrega inmediata', 'Financiamiento bancario y directo', 'Amenities completos', 'Zona de alta plusvalía'],
        cta: tipo === 'captacion' ? 'Quiero mi tasación gratis' : 'Quiero más información',
        campos: ['Nombre', 'WhatsApp', 'Forma de compra'],
      })
    }, 1400)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black tracking-tight">Landing Pages</h1>
          <EstadoTag tipo="simulado" />
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Generá páginas de captación conectadas a tu CRM y a WhatsApp.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {TIPOS_LANDING.map((t, i) => (
          <Reveal key={t.id} delay={i * 50}>
            <button
              onClick={() => { setTipo(t.id); setResultado(null) }}
              className={`h-full w-full rounded-2xl p-5 text-left ring-1 transition-all hover:-translate-y-1 ${
                tipo === t.id
                  ? 'bg-momo-navy text-white ring-momo-navy'
                  : 'bg-white ring-momo-line hover:shadow-card'
              }`}
            >
              <FileCode2 className={`h-5 w-5 ${tipo === t.id ? 'text-momo-amber' : ''}`} />
              <p className="mt-3 font-display font-bold">{t.t}</p>
              <p className={`mt-1 text-xs ${tipo === t.id ? 'text-neutral-400' : 'text-momo-muted'}`}>{t.d}</p>
            </button>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
          <h2 className="font-display text-lg font-bold">Generar con IA</h2>
          <p className="mt-1 text-sm text-neutral-600">
            TuMomo arma el copy, el formulario y la conexión a WhatsApp.
          </p>
          <Btn onClick={generar} disabled={generando} className="mt-5 w-full">
            {generando ? <>Generando…</> : <><Wand2 className="h-4 w-4" /> Crear con IA</>}
          </Btn>

          {generando && (
            <div className="mt-5 space-y-2">
              {['Analizando la propiedad…', 'Redactando el headline…', 'Armando el formulario…'].map((s, i) => (
                <p key={s} className="flex items-center gap-2 text-sm text-momo-muted" style={{ animationDelay: `${i * 300}ms` }}>
                  <Sparkles className="h-3.5 w-3.5 animate-pulse text-momo-amber" /> {s}
                </p>
              ))}
            </div>
          )}

          <NotaDemo>Generación simulada. En producción la redacta un modelo de IA.</NotaDemo>
        </div>

        {/* Preview */}
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
          <div className="flex items-center gap-2 border-b border-momo-line bg-neutral-50 px-4 py-2.5">
            <span className="flex gap-1.5">
              {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
              ))}
            </span>
            <p className="ml-2 text-xs text-momo-muted">tumomo.com/lp/{tipo}</p>
            <Eye className="ml-auto h-3.5 w-3.5 text-neutral-400" />
          </div>

          {resultado ? (
            <Reveal>
              <div className="p-6">
                <div className="momo-stripes -m-6 mb-6 p-6">
                  <h3 className="font-display text-2xl font-black leading-tight tracking-tight">
                    {resultado.headline}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-700">{resultado.sub}</p>
                </div>

                <ul className="mt-6 space-y-2">
                  {resultado.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-momo-muted">Formulario</p>
                  <div className="mt-3 space-y-2">
                    {resultado.campos.map((c) => (
                      <div key={c} className="rounded-lg bg-white px-3 py-2.5 text-sm text-neutral-400 ring-1 ring-momo-line">
                        {c}
                      </div>
                    ))}
                  </div>
                  <button className="mt-3 w-full rounded-full bg-momo-blue py-2.5 text-sm font-semibold text-white">
                    {resultado.cta}
                  </button>
                  <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-momo-muted">
                    <MessageCircle className="h-3 w-3" /> Los envíos llegan a tu CRM y te avisan por WhatsApp
                  </p>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="grid min-h-[340px] place-items-center p-8 text-center">
              <div>
                <FileCode2 className="mx-auto h-8 w-8 text-neutral-300" />
                <p className="mt-3 text-sm text-momo-muted">
                  Elegí un tipo y generá la landing para ver la vista previa.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// TUMOMO AI (panel dedicado)
// ---------------------------------------------------------------------------

export function IA() {
  const { leads } = useStore()
  const calientes = leads.filter((l) => l.temperatura === 'Caliente')
  const nuevos = leads.filter((l) => l.etapa === 'Nuevo')
  const sinMover = leads.filter((l) => ['Contactado', 'Propiedades enviadas'].includes(l.etapa))

  const recomendaciones = [
    {
      titulo: 'Respondé los leads nuevos en menos de 2 horas',
      detalle: `Tenés ${nuevos.length} leads sin contactar. La probabilidad de conversión cae fuerte después de las primeras horas.`,
      accion: 'Ver leads nuevos',
      to: '/pro/leads',
      prioridad: 'Alta',
    },
    {
      titulo: `${calientes.length} oportunidades calientes necesitan avanzar`,
      detalle: 'Estos leads mostraron intención clara. Enviá propiedades concretas y ofrecé calcular financiamiento.',
      accion: 'Abrir CRM',
      to: '/pro/crm',
      prioridad: 'Alta',
    },
    {
      titulo: `${sinMover.length} leads estancados en el pipeline`,
      detalle: 'Llevan varios días en la misma etapa. Un mensaje de seguimiento puede reactivarlos.',
      accion: 'Generar seguimientos',
      to: '/pro/crm',
      prioridad: 'Media',
    },
    {
      titulo: 'Hay demanda publicada que coincide con tu cartera',
      detalle: `${REQUERIMIENTOS.length} compradores publicaron lo que buscan. Algunos coinciden con tus propiedades.`,
      accion: 'Ver requerimientos',
      to: '/pro/requerimientos',
      prioridad: 'Media',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black tracking-tight">TuMomo AI</h1>
          <EstadoTag tipo="simulado" />
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Tu copiloto comercial: qué hacer ahora y por qué.
        </p>
      </div>

      <Reveal>
        <AIPanel title="Resumen del día">
          <p className="text-sm leading-relaxed text-neutral-300">
            Tenés <strong className="text-white">{leads.length} leads</strong> en cartera:{' '}
            {calientes.length} calientes, {nuevos.length} sin contactar y {sinMover.length} estancados.
            El foco de hoy debería estar en los leads nuevos y en mover las oportunidades calientes hacia visita.
          </p>
        </AIPanel>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-2">
        {recomendaciones.map((r, i) => (
          <Reveal key={r.titulo} delay={i * 60}>
            <div className="flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-momo-line">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-momo-blue-soft">
                  <Target className="h-5 w-5" />
                </span>
                <Badge tone={r.prioridad === 'Alta' ? 'red' : 'yellow'}>{r.prioridad}</Badge>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold leading-tight">{r.titulo}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{r.detalle}</p>
              <Btn as={Link} to={r.to} size="sm" variant="outline" className="mt-4 self-start">
                {r.accion} <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Reveal>
        ))}
      </div>

      <NotaDemo>
        Recomendaciones calculadas con reglas sobre el estado del pipeline. En producción, un modelo de IA
        analiza el comportamiento real del lead, sus conversaciones y el histórico de operaciones.
      </NotaDemo>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PROPIEDADES DEL AGENTE
// ---------------------------------------------------------------------------

export function PropiedadesPro() {
  const agente = getAgente('ag-1')
  const props = PROPIEDADES.filter((p) => p.agente === 'ag-1')
  const todas = PROPIEDADES.slice(0, 12)
  const [ver, setVer] = useState('mias')
  const lista = ver === 'mias' ? props : todas

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Propiedades</h1>
          <p className="mt-1 text-sm text-neutral-600">{lista.length} publicaciones</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full bg-neutral-100 p-1">
            {[['mias', 'Mis propiedades'], ['todas', 'Toda la cartera']].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setVer(k)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                  ver === k ? 'bg-white shadow-sm' : 'text-neutral-600'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <Btn size="sm"><Plus className="h-4 w-4" /> Publicar</Btn>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-momo-line">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left text-xs uppercase tracking-wider text-momo-muted">
              {['Propiedad', 'Tipo', 'Zona', 'Precio', '$/m²', 'Estado', 'Formas de compra', ''].map((h) => (
                <th key={h} className="px-4 py-3 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr key={p.id} className={`border-t border-neutral-100 transition-colors hover:bg-neutral-50 ${i % 2 ? 'bg-neutral-50/40' : ''}`}>
                <td className="px-4 py-3">
                  <Link to={`/propiedad/${p.id}`} className="flex items-center gap-2.5 font-semibold hover:text-momo-blue">
                    <img src={p.fotos[0]} alt="" className="h-10 w-14 rounded object-cover" />
                    <span className="line-clamp-1">{p.nombre}</span>
                  </Link>
                </td>
                <td className="px-4 py-3">{p.tipo}</td>
                <td className="px-4 py-3">{p.zona}</td>
                <td className="px-4 py-3 font-semibold">{fmtUSD(p.precio)}</td>
                <td className="px-4 py-3">{fmtUSD(p.precioM2)}</td>
                <td className="px-4 py-3"><Badge tone="outline">{p.estado}</Badge></td>
                <td className="px-4 py-3 text-xs text-neutral-600">{p.formas.join(', ')}</td>
                <td className="px-4 py-3">
                  <Link to={`/propiedad/${p.id}`} className="text-xs font-bold text-momo-black hover:underline">Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// REQUERIMIENTOS (lado profesional)
// ---------------------------------------------------------------------------

export function RequerimientosPro() {
  const [respondido, setRespondido] = useState([])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-3xl font-black tracking-tight">Requerimientos</h1>
          <EstadoTag tipo="funcional" />
        </div>
        <p className="mt-1 text-sm text-neutral-600">
          Demanda publicada por compradores. Respondé si tenés algo compatible.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {REQUERIMIENTOS.map((r, i) => {
          const compatibles = PROPIEDADES.filter(
            (p) => p.zona === r.zona && p.tipo === r.tipo && p.precio <= r.presupuesto * 1.1
          ).slice(0, 2)
          const yaRespondido = respondido.includes(r.id)

          return (
            <Reveal key={r.id} delay={Math.min(i, 6) * 50}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-momo-line">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display font-bold">{r.autor}</p>
                    <p className="text-xs text-momo-muted">{r.publicado}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-extrabold leading-none text-momo-blue">{r.match}%</p>
                    <p className="text-[10px] uppercase tracking-wider text-momo-muted">coincidencia</p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge tone="black">{r.tipo}</Badge>
                  <Badge tone="outline">{r.zona}</Badge>
                  <Badge tone="outline">{fmtUSD(r.presupuesto)}</Badge>
                  {r.dorm > 0 && <Badge tone="outline">{r.dorm} dorm</Badge>}
                  <Badge tone="yellow">{r.forma}</Badge>
                </div>

                {r.comentarios && (
                  <p className="mt-3 text-sm italic text-neutral-600">"{r.comentarios}"</p>
                )}

                {compatibles.length > 0 && (
                  <div className="mt-4 rounded-xl bg-momo-blue-soft p-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                      Tenés {compatibles.length} {compatibles.length === 1 ? 'propiedad compatible' : 'propiedades compatibles'}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {compatibles.map((p) => (
                        <Link key={p.id} to={`/propiedad/${p.id}`} className="flex items-center gap-2 text-xs hover:text-momo-blue">
                          <img src={p.fotos[0]} alt="" className="h-8 w-10 rounded object-cover" />
                          <span className="line-clamp-1 flex-1 font-semibold">{p.nombre}</span>
                          <span className="shrink-0 font-bold">{fmtUSD(p.precio)}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-4">
                  {yaRespondido ? (
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                      <Check className="h-4 w-4" /> Propuesta enviada
                    </p>
                  ) : (
                    <Btn
                      size="sm"
                      className="w-full"
                      onClick={() => setRespondido((p) => [...p, r.id])}
                      disabled={compatibles.length === 0}
                    >
                      <Send className="h-4 w-4" />
                      {compatibles.length ? 'Enviar propuesta' : 'Sin propiedades compatibles'}
                    </Btn>
                  )}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
