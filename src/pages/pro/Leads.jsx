import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, Flame, Phone, MessageCircle, Calendar, Eye, Heart, Copy, Check,
  Sparkles, ClipboardList, Send, ArrowRight, Users,
} from 'lucide-react'
import { AIPanel, Btn, Badge, EstadoTag, NotaDemo, Reveal } from '../../components/ui'
import { useStore } from '../../lib/store'
import { PROPIEDADES, ETAPAS, getPropiedad, getAgente, fmtUSD } from '../../data/demo'
import { filtrar } from '../../lib/nlSearch'

// --- Listado -----------------------------------------------------------------

export function LeadsLista() {
  const { leads } = useStore()
  const [q, setQ] = useState('')

  const filtrados = leads.filter((l) =>
    l.nombre.toLowerCase().includes(q.toLowerCase()) ||
    l.zona.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-neutral-600">{leads.length} contactos en tu cartera</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nombre o zona…"
          className="w-full max-w-xs rounded-full border border-momo-line px-4 py-2.5 text-sm outline-none focus:border-momo-amber"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((l, i) => (
          <Reveal key={l.id} delay={Math.min(i, 9) * 40}>
            <Link
              to={`/pro/leads/${l.id}`}
              className={`flex h-full flex-col rounded-2xl bg-white p-5 ring-1 transition-all hover:-translate-y-1 hover:shadow-card ${
                l.nuevo ? 'ring-2 ring-momo-amber' : 'ring-momo-line'
              }`}
            >
              <div className="flex items-start gap-3">
                <img src={l.avatar} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="font-display font-bold">{l.nombre}</p>
                    {l.nuevo && <Badge tone="yellow">Nuevo</Badge>}
                  </div>
                  <p className="text-xs text-momo-muted">{l.origen} · {l.ultimoContacto}</p>
                </div>
                {l.temperatura === 'Caliente' && <Flame className="h-4 w-4 shrink-0 text-momo-blue" />}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-[11px] text-momo-muted">Presupuesto</p>
                  <p className="font-display font-bold">{fmtUSD(l.presupuesto)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-momo-muted">Zona</p>
                  <p className="font-semibold">{l.zona}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-neutral-100 pt-3">
                <Badge tone="outline">{l.etapa}</Badge>
                <Badge tone="neutral">{l.formaPago}</Badge>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

// --- Ficha de lead -----------------------------------------------------------

export function LeadDetalle() {
  const { id } = useParams()
  const { leads, moverLead, leadsExtra, agendarVisita } = useStore()
  const lead = leads.find((l) => l.id === id)

  const [tab, setTab] = useState('resumen')
  const [mensaje, setMensaje] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const [tarea, setTarea] = useState(null)
  const [visitaOk, setVisitaOk] = useState(false)

  if (!lead) {
    return (
      <div className="py-20 text-center">
        <Users className="mx-auto h-10 w-10 text-neutral-300" />
        <p className="mt-4 font-display text-xl font-bold">Lead no encontrado</p>
        <Btn as={Link} to="/pro/leads" className="mt-5">Volver a leads</Btn>
      </div>
    )
  }

  const agente = getAgente(lead.agente)
  const vistas = (lead.vistas || []).map(getPropiedad).filter(Boolean)
  const favs = (lead.favoritos || []).map(getPropiedad).filter(Boolean)

  // Recomendaciones: propiedades compatibles que el lead todavía no vio
  const recomendadas = filtrar({
    zona: lead.zona,
    presupuesto: lead.presupuesto,
    dorm: lead.dorm || null,
    operacion: lead.operacion === 'Alquiler' ? 'Alquilar' : 'Comprar',
  }).filter((p) => !(lead.vistas || []).includes(p.id)).slice(0, 2)

  const esMovible = leadsExtra.some((l) => l.id === lead.id)
  const etapaIdx = ETAPAS.indexOf(lead.etapa)

  const generarWhatsApp = () => {
    const props = recomendadas.length ? recomendadas : vistas.slice(0, 2)
    const nombre = lead.nombre.split(' ')[0]
    const lista = props.map((p) =>
      `• ${p.nombre} — ${fmtUSD(p.precio)} · ${p.superficie} m² · ${p.dorm} dorm\n  ${p.zona}`
    ).join('\n')

    setMensaje(
      `Hola ${nombre}, ¿cómo estás? Soy ${agente?.nombre || 'tu asesor'} de TuMomo.\n\n` +
      `Vi que estás buscando ${lead.dorm ? `${lead.dorm} dormitorios ` : ''}en ${lead.zona} ` +
      `con un presupuesto de ${fmtUSD(lead.presupuesto)}.\n\n` +
      `Te dejo estas opciones que encajan:\n\n${lista}\n\n` +
      (lead.formaPago !== 'Contado'
        ? `Además puedo calcularte la cuota mensual según tu inicial, así sabés exactamente cuánto pagarías por mes.\n\n`
        : '') +
      `¿Te gustaría coordinar una visita esta semana?`
    )
    setCopiado(false)
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch { /* portapapeles no disponible */ }
  }

  const generarSeguimiento = () => {
    setTarea({
      titulo: `Seguimiento a ${lead.nombre}`,
      cuando: 'En 2 días',
      accion: lead.etapa === 'Nuevo'
        ? 'Primer contacto: presentarse y calificar necesidad real.'
        : lead.etapa === 'Visita'
        ? 'Confirmar asistencia a la visita y preparar comparativa de la zona.'
        : 'Enviar comparativa de precios y consultar objeciones pendientes.',
    })
  }

  const agendar = () => {
    agendarVisita({ dia: 3, hora: '11:00', titulo: `Visita con ${lead.nombre}`, lead: lead.nombre })
    setVisitaOk(true)
  }

  return (
    <div className="space-y-6">
      <Link to="/pro/crm" className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-momo-navy">
        <ArrowLeft className="h-4 w-4" /> Volver al CRM
      </Link>

      {/* Cabecera */}
      <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
        <div className="flex flex-wrap items-start gap-5">
          <img src={lead.avatar} alt="" className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-black tracking-tight">{lead.nombre}</h1>
              {lead.temperatura === 'Caliente' && <Badge tone="red"><Flame className="h-3 w-3" /> Caliente</Badge>}
              {lead.nuevo && <Badge tone="yellow">Nuevo</Badge>}
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              {lead.operacion} · {lead.origen} · Último contacto {lead.ultimoContacto}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn size="sm" onClick={generarWhatsApp}>
                <MessageCircle className="h-4 w-4" /> Generar WhatsApp
              </Btn>
              <Btn size="sm" variant="outline" onClick={agendar}>
                <Calendar className="h-4 w-4" /> Agendar visita
              </Btn>
              <Btn size="sm" variant="outline"><Phone className="h-4 w-4" /> {lead.telefono}</Btn>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="mt-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-momo-muted">Etapa del pipeline</p>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
            {ETAPAS.map((e, i) => {
              const pasado = i < etapaIdx
              const actual = i === etapaIdx
              return (
                <button
                  key={e}
                  onClick={() => esMovible && moverLead(lead.id, e)}
                  disabled={!esMovible}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    actual ? 'bg-momo-amber text-momo-navy'
                      : pasado ? 'bg-momo-navy text-white'
                      : 'bg-neutral-100 text-momo-muted'
                  } ${esMovible ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                >
                  {e}
                </button>
              )
            })}
          </div>
          {!esMovible && (
            <p className="mt-2 text-[11px] text-neutral-400">
              Los leads del dataset base son de solo lectura. Los creados durante la demo sí se pueden mover.
            </p>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5 md:grid-cols-4">
          {[
            [fmtUSD(lead.presupuesto), 'Presupuesto'],
            [lead.zona, 'Zona de interés'],
            [lead.formaPago, 'Forma de pago'],
            [lead.dorm > 0 ? `${lead.dorm} dormitorios` : lead.operacion, 'Interés'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="text-[11px] text-momo-muted">{l}</p>
              <p className="font-display text-lg font-bold leading-tight">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {visitaOk && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <Check className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="flex-1 text-sm text-emerald-900">
            Visita agendada con {lead.nombre}. Ya aparece en el calendario.
          </p>
          <Btn as={Link} to="/pro/calendario" variant="black" size="sm">Ver calendario →</Btn>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Actividad */}
        <div className="space-y-5">
          <div className="rounded-2xl bg-white ring-1 ring-momo-line">
            <div className="flex gap-1 border-b border-momo-line px-4 pt-3">
              {[['resumen', 'Resumen'], ['propiedades', 'Propiedades'], ['notas', 'Notas']].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-t-lg px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    tab === k ? 'border-b-2 border-momo-blue text-momo-navy' : 'text-momo-muted hover:text-momo-navy'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="p-5">
              {tab === 'resumen' && (
                <div className="space-y-4">
                  <Fila icon={Eye} label="Propiedades vistas" valor={`${vistas.length}`} />
                  <Fila icon={Heart} label="Favoritos" valor={`${favs.length}`} />
                  <Fila icon={MessageCircle} label="Conversaciones" valor="1 hilo de WhatsApp" />
                  <Fila icon={Calendar} label="Visitas" valor={lead.etapa === 'Visita' ? '1 agendada' : 'Ninguna'} />
                  <Fila icon={ClipboardList} label="Tareas abiertas" valor={tarea ? '1' : '0'} />
                </div>
              )}

              {tab === 'propiedades' && (
                <div className="space-y-4">
                  <Bloque titulo="Vistas por el lead" props={vistas} favs={lead.favoritos || []} />
                  {recomendadas.length > 0 && (
                    <Bloque titulo="Recomendadas por TuMomo AI" props={recomendadas} favs={[]} destacar />
                  )}
                </div>
              )}

              {tab === 'notas' && (
                <div>
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <p className="text-sm leading-relaxed text-neutral-700">{lead.notas}</p>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Agregar una nota…"
                    className="mt-3 w-full resize-none rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber"
                  />
                  <Btn size="sm" variant="outline" className="mt-2">Guardar nota</Btn>
                </div>
              )}
            </div>
          </div>

          {/* Mensaje generado */}
          {mensaje && (
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
                <div className="flex items-center gap-2 border-b border-momo-line bg-emerald-50 px-4 py-3">
                  <MessageCircle className="h-4 w-4 text-emerald-700" />
                  <p className="font-display text-sm font-bold text-emerald-900">Mensaje generado para WhatsApp</p>
                  <span className="ml-auto"><EstadoTag tipo="simulado" /></span>
                </div>
                <div className="p-4">
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={12}
                    className="w-full resize-none rounded-xl bg-neutral-50 p-4 text-sm leading-relaxed outline-none ring-1 ring-momo-line focus:ring-momo-amber"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Btn size="sm" onClick={copiar}>
                      {copiado ? <><Check className="h-4 w-4" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar mensaje</>}
                    </Btn>
                    <Btn as={Link} to="/pro/whatsapp" size="sm" variant="outline">
                      <Send className="h-4 w-4" /> Abrir conversación
                    </Btn>
                  </div>
                  <NotaDemo>
                    Mensaje construido con plantillas y los datos del lead. En producción lo genera un modelo
                    de IA y se envía por la API de WhatsApp Business.
                  </NotaDemo>
                </div>
              </div>
            </Reveal>
          )}

          {/* Tarea generada */}
          {tarea && (
            <Reveal>
              <div className="rounded-2xl bg-white p-5 ring-1 ring-momo-line">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <p className="font-display font-bold">{tarea.titulo}</p>
                  <Badge tone="yellow" className="ml-auto">{tarea.cuando}</Badge>
                </div>
                <p className="mt-2.5 text-sm text-neutral-600">{tarea.accion}</p>
              </div>
            </Reveal>
          )}
        </div>

        {/* Panel IA */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <AIPanel>
            <p className="text-sm leading-relaxed text-neutral-300">
              <strong className="text-white">{lead.nombre}</strong> está interesada en
              {lead.dorm > 0 ? ` propiedades de ${lead.dorm} dormitorios` : ` ${lead.operacion.toLowerCase()}`} en{' '}
              {lead.zona} y ha visto {vistas.length} {vistas.length === 1 ? 'propiedad' : 'propiedades'} similares.
            </p>

            <div className="mt-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-momo-amber">Recomendación</p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                {recomendadas.length >= 2
                  ? `Enviale estas ${recomendadas.length} propiedades y ofrecé calcular su capacidad de financiamiento.`
                  : lead.etapa === 'Nuevo'
                  ? 'Contactala en las próximas 2 horas: los leads nuevos convierten mucho más si se responden rápido.'
                  : 'Enviá una comparativa de precios de la zona para reforzar la decisión.'}
              </p>
            </div>

            {recomendadas.length > 0 && (
              <div className="mt-3 space-y-2">
                {recomendadas.map((p) => (
                  <Link key={p.id} to={`/propiedad/${p.id}`}
                    className="flex items-center gap-2.5 rounded-lg bg-white/5 p-2.5 transition-colors hover:bg-white/10">
                    <img src={p.fotos[0]} alt="" className="h-10 w-14 shrink-0 rounded object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold">{p.nombre}</p>
                      <p className="text-[11px] text-neutral-400">{p.zona} · {p.superficie} m²</p>
                    </div>
                    <p className="shrink-0 font-display text-sm font-bold text-momo-amber">{fmtUSD(p.precio)}</p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2">
              <BtnIA onClick={generarWhatsApp} icon={MessageCircle} label="Generar WhatsApp" />
              <BtnIA onClick={generarSeguimiento} icon={ClipboardList} label="Generar seguimiento" />
              <BtnIA onClick={agendar} icon={Calendar} label="Agendar visita" />
              <BtnIA onClick={() => setTab('resumen')} icon={Sparkles} label="Resumir lead" />
            </div>
          </AIPanel>
        </div>
      </div>
    </div>
  )
}

function BtnIA({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-2.5 text-left text-xs font-semibold text-neutral-200 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-momo-amber" /> {label}
    </button>
  )
}

function Fila({ icon: Icon, label, valor }) {
  return (
    <div className="flex items-center gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-neutral-100">
        <Icon className="h-4 w-4 text-neutral-600" />
      </span>
      <p className="flex-1 text-sm text-neutral-600">{label}</p>
      <p className="text-sm font-bold">{valor}</p>
    </div>
  )
}

function Bloque({ titulo, props, favs, destacar }) {
  if (!props.length) return null
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-momo-muted">{titulo}</p>
      <div className="space-y-2">
        {props.map((p) => (
          <Link
            key={p.id}
            to={`/propiedad/${p.id}`}
            className={`flex items-center gap-3 rounded-xl p-3 ring-1 transition-all hover:-translate-y-0.5 hover:shadow-card ${
              destacar ? 'bg-momo-blue-soft ring-momo-amber' : 'bg-white ring-momo-line'
            }`}
          >
            <img src={p.fotos[0]} alt="" className="h-12 w-16 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.nombre}</p>
              <p className="text-xs text-momo-muted">{p.zona} · {p.superficie} m² · {p.dorm} dorm</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-display font-bold">{fmtUSD(p.precio)}</p>
              {favs.includes(p.id) && <Heart className="ml-auto h-3.5 w-3.5 fill-momo-blue text-momo-blue" />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
