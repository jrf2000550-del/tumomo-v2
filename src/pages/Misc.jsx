import { Link } from 'react-router-dom'
import { Globe, TrendingUp, Sparkles, ArrowRight, Home as HomeIcon, Car, Laptop, Wrench, Sofa } from 'lucide-react'
import { Btn, Badge, EstadoTag, NotaDemo, SectionHead, Reveal, PropCard } from '../components/ui'
import { PAISES, PROPIEDADES, DATA_ZONAS, fmtUSD } from '../data/demo'

// ---------------------------------------------------------------------------
// INVERTIR
// ---------------------------------------------------------------------------

export function Invertir() {
  const oportunidades = PROPIEDADES
    .filter((p) => p.objetivo.includes('Invertir') && p.alquilerEstimado > 0)
    .map((p) => ({ ...p, rent: ((p.alquilerEstimado * 12) / p.precio) * 100 }))
    .sort((a, b) => b.rent - a.rent)

  const zonasTop = [...DATA_ZONAS].sort((a, b) => b.tendencia - a.tendencia).slice(0, 4)

  return (
    <>
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <TrendingUp className="h-3.5 w-3.5" /> Inversión
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Oportunidades de inversión
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              Preventa, zonas con plusvalía, proyectos en desarrollo y unidades con mejor rentabilidad estimada.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-8">
        <SectionHead kicker="Zonas" title="Dónde está creciendo el mercado" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {zonasTop.map((z, i) => (
            <Reveal key={z.zona} delay={i * 60}>
              <Link to={`/buscar?zona=${z.zona}`} className="block rounded-xl bg-white p-5 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                <p className="font-display font-bold">{z.zona}</p>
                <p className="mt-2 flex items-center gap-1 font-display text-2xl font-extrabold text-emerald-600">
                  <TrendingUp className="h-5 w-5" /> +{z.tendencia}%
                </p>
                <p className="mt-1 text-xs text-momo-muted">Variación interanual del precio/m²</p>
                <div className="mt-3 flex justify-between border-t border-neutral-100 pt-2.5 text-xs">
                  <span className="text-momo-muted">Rentabilidad</span>
                  <span className="font-bold">{z.rentabilidad}%</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <NotaDemo>Indicadores de demostración.</NotaDemo>

        <div className="mt-12">
          <SectionHead
            kicker="Ranking"
            title="Mejor rentabilidad estimada"
            sub="Ordenadas por rentabilidad bruta anual estimada sobre el precio publicado."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {oportunidades.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <div className="relative">
                  <span className="absolute -top-2 left-3 z-10 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-card">
                    {p.rent.toFixed(1)}% rentabilidad est.
                  </span>
                  <PropCard p={p} />
                </div>
              </Reveal>
            ))}
          </div>
          <NotaDemo>
            Rentabilidad bruta estimada = alquiler estimado anual ÷ precio publicado. Es un cálculo de
            demostración; no considera expensas, impuestos, vacancia ni mantenimiento.
          </NotaDemo>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { t: 'Departamentos en preventa', d: 'Proyectos con ticket inicial más accesible y potencial de valorización.', to: '/proyectos' },
            { t: 'Zonas con plusvalía', d: 'Propiedades en zonas con alta demanda y movimiento inmobiliario.', to: '/datos' },
            { t: 'Crédito directo', d: 'Oportunidades financiadas por el propietario, sin trámite bancario.', to: '/financiar#directo' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 60}>
              <Link to={c.to} className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                <h3 className="font-display text-lg font-bold">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">{c.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-momo-blue">
                  Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

// ---------------------------------------------------------------------------
// TUMOMO GLOBAL (visión futura)
// ---------------------------------------------------------------------------

export function Global() {
  return (
    <>
      <section className="bg-momo-navy py-16 text-white">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-amber px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-momo-navy">
                <Globe className="h-3.5 w-3.5" /> TuMomo Global
              </span>
              <EstadoTag tipo="futuro" />
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-black leading-[1.03] tracking-tight md:text-6xl">
              Invierte en Real Estate estés donde estés.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-neutral-400">
              Conecta con partners inmobiliarios verificados. Esta sección representa la visión a futuro
              de la plataforma, no una funcionalidad disponible hoy.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PAISES.map((p, i) => (
            <Reveal key={p.pais} delay={i * 70}>
              <div className={`flex h-full flex-col rounded-2xl p-6 ring-1 transition-all hover:-translate-y-1 ${
                p.estado === 'Activo'
                  ? 'bg-momo-blue-soft ring-momo-amber'
                  : 'bg-white ring-momo-line'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-5xl leading-none">{p.bandera}</span>
                  <Badge tone={p.estado === 'Activo' ? 'black' : 'neutral'}>{p.estado}</Badge>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{p.pais}</h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">{p.nota}</p>
                <dl className="mt-4 space-y-1.5 border-t border-momo-line/70 pt-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-momo-muted">Partners</dt>
                    <dd className="font-bold">{p.partners || '—'}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-momo-muted">Propiedades</dt>
                    <dd className="font-bold">{p.propiedades}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <NotaDemo>
          Roadmap conceptual. La expansión internacional requiere acuerdos con partners locales,
          cumplimiento regulatorio y estructura operativa en cada país.
        </NotaDemo>

        {/* Plan B: marketplace general */}
        <div className="mt-14">
          <SectionHead
            kicker="Plan B — arquitectura preparada"
            title="Marketplace general"
            sub="La prioridad actual es TuMomo Real Estate. La arquitectura queda preparada para otras categorías en el futuro, sin desarrollarlas todavía."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {[
              { icon: HomeIcon, t: 'Inmuebles', activo: true },
              { icon: Car, t: 'Autos' },
              { icon: Laptop, t: 'Electrónicos' },
              { icon: Wrench, t: 'Servicios' },
              { icon: Sofa, t: 'Hogar' },
              { icon: Sparkles, t: 'Otros' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 50}>
                <div className={`flex h-full flex-col items-center gap-2 rounded-xl p-5 text-center ring-1 ${
                  c.activo
                    ? 'bg-momo-navy text-white ring-momo-navy'
                    : 'bg-neutral-50 text-neutral-400 ring-momo-line'
                }`}>
                  <c.icon className={`h-6 w-6 ${c.activo ? 'text-momo-amber' : ''}`} />
                  <p className="text-sm font-semibold">{c.t}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    c.activo ? 'text-momo-amber' : 'text-neutral-400'
                  }`}>
                    {c.activo ? 'Prioridad actual' : 'Futuro'}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Cierre */}
        <div className="mt-14 rounded-2xl bg-momo-amber p-10 text-center md:p-16">
          <p className="text-xs font-bold uppercase tracking-wider text-momo-blue">TuMomo Real Estate</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight md:text-6xl">
            Del portal al ecosistema.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg">
            No estamos construyendo otro portal inmobiliario. Estamos construyendo el ecosistema digital
            del Real Estate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn as={Link} to="/" variant="black">Volver al inicio</Btn>
            <Btn as={Link} to="/pro" variant="outline">Ver TuMomo Pro</Btn>
          </div>
        </div>
      </section>
    </>
  )
}
