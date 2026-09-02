import { Link } from 'react-router-dom'
import { Layers, Building2, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { Btn, Badge, SectionHead, Reveal, NotaDemo } from '../components/ui'
import { PROYECTOS, PROPIEDADES, fmtUSD } from '../data/demo'

export default function Proyectos() {
  return (
    <>
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <Layers className="h-3.5 w-3.5" /> En desarrollo
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Proyectos y preventa
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              Comprá en etapa de obra con precio de preventa, plan de pagos y menor ticket inicial.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-8">
        <SectionHead kicker="Desarrollos" title={`${PROYECTOS.length} proyectos activos`} />
        <div className="space-y-5">
          {PROYECTOS.map((pr, i) => (
            <Reveal key={pr.id} delay={i * 60}><ProyectoCard pr={pr} /></Reveal>
          ))}
        </div>
        <NotaDemo>
          Proyectos, desarrolladoras y fechas de entrega son datos de demostración.
        </NotaDemo>

        <div className="mt-12">
          <SectionHead
            kicker="Unidades"
            title="Unidades disponibles en preventa"
            action={<Link to="/buscar?tipo=Proyecto" className="text-sm font-semibold text-momo-black hover:underline">Ver todas →</Link>}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {PROPIEDADES.filter((p) => p.estado === 'Preventa' || p.tipo === 'Proyecto').slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <Link to={`/propiedad/${p.id}`} className="group flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                  <img src={p.fotos[0]} alt="" className="h-24 w-28 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="font-display text-xl font-extrabold">{fmtUSD(p.precio)}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm font-semibold group-hover:text-momo-blue">{p.nombre}</p>
                    <p className="mt-1 text-xs text-momo-muted">{p.zona} · {p.superficie} m² · {p.dorm} dorm</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.formas.filter((f) => f !== 'Contado').slice(0, 2).map((f) => (
                        <Badge key={f} tone="outline">{f}</Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ProyectoCard({ pr }) {
  const vendidas = pr.unidades - pr.disponibles
  const pctVendido = Math.round((vendidas / pr.unidades) * 100)

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line transition-all hover:shadow-card lg:grid-cols-[.8fr_1.2fr]">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 lg:aspect-auto">
        <img src={pr.foto} alt={pr.nombre} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {pr.etiquetas.map((e) => <Badge key={e} tone="yellow">{e}</Badge>)}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">{pr.nombre}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-600">
              <Building2 className="h-3.5 w-3.5" /> {pr.desarrolladora} · {pr.zona}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-momo-muted">Desde</p>
            <p className="font-display text-2xl font-black tracking-tight">{fmtUSD(pr.desde)}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [pr.unidades, 'Unidades'],
            [pr.disponibles, 'Disponibles'],
            [pr.entrega, 'Entrega'],
            [`${pr.avance}%`, 'Avance de obra'],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-neutral-50 p-3">
              <p className="font-display text-lg font-extrabold leading-none">{v}</p>
              <p className="mt-1 text-[11px] text-momo-muted">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          <Progreso label="Avance de obra" pct={pr.avance} color="bg-momo-amber" />
          <Progreso label={`Unidades vendidas (${vendidas}/${pr.unidades})`} pct={pctVendido} color="bg-momo-blue" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Btn as={Link} to={`/buscar?tipo=Proyecto`} size="sm">
            Ver unidades <ArrowRight className="h-4 w-4" />
          </Btn>
          <Btn as={Link} to="/financiar#proyecto" variant="outline" size="sm">
            Plan de pagos
          </Btn>
        </div>
      </div>
    </div>
  )
}

function Progreso({ label, pct, color }) {
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-neutral-600">{label}</span>
        <span className="font-semibold">{pct}%</span>
      </div>
      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
