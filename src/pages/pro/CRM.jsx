import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, ChevronRight, ChevronLeft, Filter, LayoutGrid, List } from 'lucide-react'
import { Badge, Btn, EstadoTag, NotaDemo, Reveal } from '../../components/ui'
import { useStore } from '../../lib/store'
import { ETAPAS, fmtUSD } from '../../data/demo'

export default function CRM() {
  const { leads, moverLead, leadsExtra } = useStore()
  const [vista, setVista] = useState('kanban')
  const [filtro, setFiltro] = useState('Todos')

  const visibles = filtro === 'Todos' ? leads : leads.filter((l) => l.temperatura === filtro)

  const porEtapa = (e) => visibles.filter((l) => l.etapa === e)

  // Solo los leads creados en esta sesion se pueden mover (los del dataset son fijos)
  const esMovible = (id) => leadsExtra.some((l) => l.id === id)

  const mover = (lead, dir) => {
    const i = ETAPAS.indexOf(lead.etapa)
    const nuevo = ETAPAS[i + dir]
    if (nuevo) moverLead(lead.id, nuevo)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black tracking-tight">CRM</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Pipeline inmobiliario · {visibles.length} leads
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-momo-line">
            <Filter className="h-3.5 w-3.5 text-neutral-400" />
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="bg-transparent text-sm outline-none"
            >
              {['Todos', 'Caliente', 'Tibio', 'Frío'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex rounded-full bg-neutral-100 p-1">
            {[['kanban', LayoutGrid], ['lista', List]].map(([v, Icon]) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={`rounded-full px-3 py-1.5 transition-colors ${vista === v ? 'bg-white shadow-sm' : 'text-momo-muted'}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {vista === 'kanban' ? (
        <>
          <div className="no-scrollbar -mx-5 overflow-x-auto px-5 pb-2 md:-mx-8 md:px-8">
            <div className="flex gap-4" style={{ minWidth: ETAPAS.length * 264 }}>
              {ETAPAS.map((etapa, ei) => {
                const items = porEtapa(etapa)
                return (
                  <div key={etapa} className="w-[248px] shrink-0">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-bold">{etapa}</p>
                      <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[11px] font-bold">
                        {items.length}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      {items.map((l, i) => (
                        <Reveal key={l.id} delay={Math.min(i, 4) * 40}>
                          <Card lead={l} movible={esMovible(l.id)} onMover={mover} etapaIdx={ei} />
                        </Reveal>
                      ))}
                      {items.length === 0 && (
                        <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-xs text-neutral-400">
                          Sin leads
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <NotaDemo>
            Los leads generados durante esta demo se pueden mover entre etapas con las flechas de cada tarjeta.
          </NotaDemo>
        </>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-momo-line">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-neutral-50">
              <tr className="text-left text-xs uppercase tracking-wider text-momo-muted">
                {['Lead', 'Etapa', 'Operación', 'Presupuesto', 'Zona', 'Forma de pago', 'Origen', 'Último contacto'].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibles.map((l, i) => (
                <tr key={l.id} className={`border-t border-neutral-100 transition-colors hover:bg-neutral-50 ${i % 2 ? 'bg-neutral-50/40' : ''}`}>
                  <td className="px-4 py-3">
                    <Link to={`/pro/leads/${l.id}`} className="flex items-center gap-2.5 font-semibold hover:text-momo-blue">
                      <img src={l.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                      <span>
                        {l.nombre}
                        {l.nuevo && <Badge tone="yellow" className="ml-1.5">Nuevo</Badge>}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3"><Badge tone="outline">{l.etapa}</Badge></td>
                  <td className="px-4 py-3">{l.operacion}</td>
                  <td className="px-4 py-3 font-semibold">{fmtUSD(l.presupuesto)}</td>
                  <td className="px-4 py-3">{l.zona}</td>
                  <td className="px-4 py-3">{l.formaPago}</td>
                  <td className="px-4 py-3">{l.origen}</td>
                  <td className="px-4 py-3 text-momo-muted">{l.ultimoContacto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Card({ lead, movible, onMover, etapaIdx }) {
  const tono = {
    Caliente: 'bg-red-50 text-red-700',
    Tibio: 'bg-amber-50 text-amber-700',
    Frío: 'bg-blue-50 text-blue-700',
    Cerrado: 'bg-emerald-50 text-emerald-700',
  }[lead.temperatura]

  return (
    <div className={`rounded-xl bg-white p-3.5 ring-1 transition-all hover:shadow-card ${
      lead.nuevo ? 'ring-2 ring-momo-amber' : 'ring-momo-line'
    }`}>
      <Link to={`/pro/leads/${lead.id}`} className="block">
        <div className="flex items-start gap-2.5">
          <img src={lead.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{lead.nombre}</p>
            <p className="text-[11px] text-momo-muted">{lead.origen}</p>
          </div>
          {lead.temperatura === 'Caliente' && <Flame className="h-4 w-4 shrink-0 text-momo-blue" />}
        </div>

        <p className="mt-2.5 font-display text-lg font-extrabold leading-none">
          {fmtUSD(lead.presupuesto)}
        </p>
        <p className="mt-1 text-[11px] text-momo-muted">
          {lead.zona} · {lead.dorm > 0 ? `${lead.dorm} dorm` : lead.operacion}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${tono}`}>{lead.temperatura}</span>
          <span className="text-[10px] text-neutral-400">{lead.ultimoContacto}</span>
        </div>
      </Link>

      {movible && (
        <div className="mt-3 flex gap-1.5 border-t border-neutral-100 pt-2.5">
          <button
            onClick={() => onMover(lead, -1)}
            disabled={etapaIdx === 0}
            className="flex flex-1 items-center justify-center rounded-lg py-1.5 text-momo-muted ring-1 ring-momo-line transition-colors hover:bg-neutral-50 disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onMover(lead, 1)}
            disabled={etapaIdx === ETAPAS.length - 1}
            className="flex flex-1 items-center justify-center rounded-lg bg-momo-navy py-1.5 text-white transition-colors hover:bg-neutral-800 disabled:opacity-30"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
