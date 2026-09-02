import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search, Sparkles, ArrowRight, Home as HomeIcon, Building2, Trees, Store,
  Briefcase, Layers, Wallet, HandCoins, HardHat, UserSearch, Users,
  ShieldCheck, TrendingUp, MessageSquare, Calculator,
} from 'lucide-react'
import { Reveal, Counter, SectionHead, Btn, Badge, PropCard, EstadoTag, NotaDemo } from '../components/ui'
import { PROPIEDADES, PROYECTOS, DATA_ZONAS, fmtUSD } from '../data/demo'
import { interpretar, chipsDe, filtrar, EJEMPLOS } from '../lib/nlSearch'

const ACCIONES = [
  { icon: HomeIcon, label: 'Comprar', to: '/buscar?operacion=Comprar' },
  { icon: Building2, label: 'Alquilar', to: '/buscar?operacion=Alquilar' },
  { icon: TrendingUp, label: 'Invertir', to: '/invertir' },
  { icon: Wallet, label: 'Financiar', to: '/financiar' },
  { icon: HandCoins, label: 'Crédito directo', to: '/financiar#directo' },
  { icon: HardHat, label: 'Construir', to: '/construir' },
  { icon: UserSearch, label: 'Encontrar agente', to: '/profesionales?cat=Agentes' },
  { icon: Users, label: 'Encontrar profesional', to: '/profesionales' },
]

const CATEGORIAS = [
  { icon: HomeIcon, label: 'Casas', n: '2.840', tipo: 'Casa' },
  { icon: Building2, label: 'Departamentos', n: '3.950', tipo: 'Departamento' },
  { icon: Trees, label: 'Terrenos', n: '1.120', tipo: 'Terreno' },
  { icon: Store, label: 'Locales', n: '540', tipo: 'Local' },
  { icon: Briefcase, label: 'Oficinas', n: '380', tipo: 'Oficina' },
  { icon: Layers, label: 'Proyectos', n: '95', tipo: 'Proyecto' },
]

export default function Home() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [preview, setPreview] = useState(null)

  const onChange = (v) => {
    setQ(v)
    if (v.trim().length > 8) {
      const r = interpretar(v)
      setPreview({ r, n: filtrar(r).length })
    } else setPreview(null)
  }

  const buscar = (texto) => {
    const t = (texto ?? q).trim()
    if (!t) return nav('/buscar')
    nav(`/buscar?q=${encodeURIComponent(t)}`)
  }

  const destacadas = PROPIEDADES.filter((p) => p.destacada).slice(0, 6)
  const heroProp = PROPIEDADES.find((p) => p.id === 'p-1') || PROPIEDADES[0]

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="momo-stripes momo-fade-bottom relative overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-0">
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
                <Sparkles className="h-3.5 w-3.5" /> Nuevo · Búsqueda inteligente
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-5 font-display text-[2.4rem] font-black leading-[1.03] tracking-tight sm:text-5xl xl:text-[3.6rem]">
                Encuentra tu <span className="momo-underline">próxima propiedad</span>.
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-neutral-700">
                Busca, compara, financia y conecta con profesionales en un solo lugar.
              </p>
            </Reveal>

            {/* Buscador conversacional */}
            <Reveal delay={180}>
              <div className="mt-7 rounded-2xl bg-white p-2.5 shadow-pop ring-1 ring-black/[0.06] transition-shadow focus-within:ring-2 focus-within:ring-momo-blue">
                <div className="flex items-center gap-2.5 pl-3">
                  <Sparkles className="h-5 w-5 shrink-0 text-momo-black" />
                  <input
                    value={q}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && buscar()}
                    placeholder="¿Qué estás buscando?"
                    aria-label="Buscar propiedades en lenguaje natural"
                    className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-neutral-400"
                  />
                  <Btn onClick={() => buscar()} size="md" className="shrink-0">
                    <Search className="h-4 w-4" /> Buscar
                  </Btn>
                </div>

                {/* Interpretación en vivo */}
                {preview?.r && (
                  <div className="mx-1 mt-2 rounded-xl bg-neutral-50 p-3 ring-1 ring-momo-line">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-momo-muted">
                        Así interpretamos tu búsqueda
                      </span>
                      <EstadoTag tipo="simulado" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {chipsDe(preview.r).length === 0 ? (
                        <span className="text-xs text-momo-muted">Seguí escribiendo para afinar la búsqueda…</span>
                      ) : chipsDe(preview.r).map((c) => (
                        <span key={c.k} className="rounded-lg bg-white px-2.5 py-1.5 text-[11px] ring-1 ring-momo-line">
                          <span className="text-momo-muted">{c.k}:</span>{' '}
                          <span className="font-semibold">{c.v}</span>
                        </span>
                      ))}
                    </div>
                    <p className="mt-2.5 text-xs font-semibold text-momo-black">
                      Encontramos {preview.n} {preview.n === 1 ? 'propiedad' : 'propiedades'} que coinciden.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto">
                <span className="shrink-0 py-1 text-xs text-momo-muted">Probá:</span>
                {EJEMPLOS.map((e) => (
                  <button
                    key={e}
                    onClick={() => { setQ(e); onChange(e) }}
                    title={e}
                    className="shrink-0 whitespace-nowrap rounded-full bg-white/70 px-3 py-1.5 text-xs text-neutral-700 ring-1 ring-neutral-300 transition-colors hover:bg-white"
                  >
                    {e.length > 34 ? e.slice(0, 34) + '…' : e}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Vista previa del producto: una ficha real del dataset */}
          <Reveal delay={140}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl bg-white shadow-pop ring-1 ring-black/[0.06]">
                <div className="relative">
                  <img
                    src={heroProp.fotos[0]}
                    alt={heroProp.nombre}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    <Badge tone="blue">Venta</Badge>
                    <Badge tone="amber">Inversión</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-2xl font-extrabold tracking-tight">
                      {fmtUSD(heroProp.precio)}
                    </p>
                    <p className="text-xs font-semibold text-momo-muted">
                      {fmtUSD(heroProp.precioM2)}/m²
                    </p>
                  </div>
                  <p className="mt-1 font-display text-base font-bold">{heroProp.nombre}</p>
                  <p className="text-xs text-momo-muted">{heroProp.zona}, {heroProp.ciudad}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3 text-center">
                    {[
                      [heroProp.superficie + ' m²', 'Superficie'],
                      [heroProp.dorm, 'Dormitorios'],
                      ['7,2%', 'Rentab. est.'],
                    ].map(([v, l]) => (
                      <div key={l}>
                        <p className="font-display text-base font-extrabold">{v}</p>
                        <p className="text-[10px] text-momo-muted">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 right-4 rounded-xl bg-momo-navy px-4 py-3 text-white shadow-pop md:right-6">
                <p className="font-display text-xs font-bold text-momo-amber">+15 AÑOS</p>
                <p className="text-xs text-neutral-300">conectando oferta y demanda en Bolivia</p>
              </div>
              <div className="absolute -bottom-6 -left-5 hidden rounded-xl bg-white p-3.5 shadow-pop ring-1 ring-black/[0.06] xl:block">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-momo-green-soft">
                    <ShieldCheck className="h-4.5 w-4.5 text-momo-green" />
                  </span>
                  <div>
                    <p className="text-xs font-bold">Profesionales verificados</p>
                    <p className="text-[11px] text-momo-muted">Identidad y empresa validadas</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- ACCIONES RÁPIDAS ---------------- */}
      <section className="border-y border-momo-line bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
            {ACCIONES.map((a, i) => (
              <Reveal key={a.label} delay={i * 40}>
                <Link
                  to={a.to}
                  className="group flex h-full flex-col items-center gap-2 rounded-xl border border-momo-line p-4 text-center transition-all hover:-translate-y-1 hover:border-momo-amber hover:shadow-card"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-momo-blue-soft transition-colors group-hover:bg-momo-amber">
                    <a.icon className="h-5 w-5 text-momo-navy" />
                  </span>
                  <span className="text-xs font-semibold leading-tight">{a.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORÍAS ---------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        <SectionHead
          kicker="Explora"
          title="Categorías principales"
          action={<Link to="/buscar" className="text-sm font-semibold text-momo-black hover:underline">Ver todo →</Link>}
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIAS.map((c, i) => (
            <Reveal key={c.label} delay={i * 50}>
              <Link
                to={`/buscar?tipo=${c.tipo}`}
                className="group flex h-full flex-col gap-2 rounded-xl bg-white p-4 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card hover:ring-neutral-300"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-momo-blue-soft">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="mt-1 font-display font-bold leading-tight">{c.label}</span>
                <span className="text-xs text-momo-muted">{c.n} publicaciones</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <NotaDemo>Volúmenes de publicaciones son datos de demostración.</NotaDemo>
      </section>

      {/* ---------------- DESTACADAS ---------------- */}
      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHead
            kicker="Selección"
            title="Inmuebles destacados"
            action={<Link to="/buscar" className="text-sm font-semibold text-momo-black hover:underline">Ver todos →</Link>}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destacadas.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}><PropCard p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ECOSISTEMA ---------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        <SectionHead
          kicker="Nuevo enfoque"
          title="La propiedad es el centro. Todo lo demás se conecta."
          sub="TuMomo deja de ser un tablón de anuncios para convertirse en el lugar donde ocurre toda la operación inmobiliaria: buscar, comparar, financiar, construir y cerrar."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { icon: Calculator, t: 'Financiamiento integrado', d: 'Calculadora, crédito bancario, crédito directo y marketplace de entidades dentro de la misma ficha.', to: '/financiar', tag: 'funcional' },
            { icon: HardHat, t: 'Quiero construir', d: 'Terreno → arquitecto → constructora → financiamiento → servicios. Un recorrido guiado paso a paso.', to: '/construir', tag: 'funcional' },
            { icon: Users, t: 'Marketplace de profesionales', d: 'Agentes, arquitectos, abogados, valuadores, constructoras y más, con verificación y reseñas.', to: '/profesionales', tag: 'funcional' },
            { icon: MessageSquare, t: 'Demanda publicada', d: 'El comprador publica lo que busca y TuMomo notifica a los profesionales con propiedades compatibles.', to: '/requerimientos', tag: 'funcional' },
            { icon: TrendingUp, t: 'TuMomo Data', d: 'Precio por m², alquiler promedio, oferta, demanda y tendencia por zona de Santa Cruz.', to: '/datos', tag: 'simulado' },
            { icon: Sparkles, t: 'TuMomo Pro + IA', d: 'CRM inmobiliario con pipeline, IA que recomienda la siguiente acción, WhatsApp, marketing y agenda.', to: '/pro', tag: 'simulado' },
          ].map((c, i) => (
            <Reveal key={c.t} delay={i * 60}>
              <Link
                to={c.to}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-lift hover:ring-neutral-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-momo-blue-soft">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <EstadoTag tipo={c.tag} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">{c.d}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-momo-blue">
                  Explorar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- BANDA DE STATS ---------------- */}
      <section className="bg-momo-navy py-14 text-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-5 md:grid-cols-4 md:px-8">
          {[
            { v: <><Counter to={15} />+</>, l: 'años en Bolivia' },
            { v: <Counter to={9135} />, l: 'inmuebles publicados' },
            { v: <><Counter to={42} />+</>, l: 'profesionales verificados' },
            { v: <><Counter to={7.2} decimals={1} />%</>, l: 'rentabilidad bruta promedio' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="font-display text-4xl font-black tracking-tight text-momo-amber md:text-5xl">{s.v}</p>
              <p className="mt-1 text-sm text-neutral-400">{s.l}</p>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-[1280px] px-5 text-[11px] text-momo-muted md:px-8">
          ◆ Métricas de demostración para esta presentación.
        </p>
      </section>

      {/* ---------------- PROYECTOS ---------------- */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-8">
        <SectionHead
          kicker="En desarrollo"
          title="Proyectos y preventa"
          action={<Link to="/proyectos" className="text-sm font-semibold text-momo-black hover:underline">Ver todos →</Link>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {PROYECTOS.slice(0, 3).map((pr, i) => (
            <Reveal key={pr.id} delay={i * 60}>
              <Link to="/proyectos" className="group block overflow-hidden rounded-2xl ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img src={pr.foto} alt={pr.nombre} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 flex gap-1.5">
                    {pr.etiquetas.map((e) => <Badge key={e} tone="yellow">{e}</Badge>)}
                  </div>
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-display text-lg font-bold">{pr.nombre}</h3>
                  <p className="text-xs text-momo-muted">{pr.zona} · {pr.desarrolladora}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-display font-extrabold">Desde {fmtUSD(pr.desde)}</span>
                    <span className="text-xs text-momo-muted">Entrega {pr.entrega}</span>
                  </div>
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
                      <div className="h-full rounded-full bg-momo-amber" style={{ width: `${pr.avance}%` }} />
                    </div>
                    <p className="mt-1.5 text-[11px] text-momo-muted">{pr.avance}% de avance · {pr.disponibles} unidades disponibles</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- PARA VENDEDORES (bloque amarillo V1) ---------------- */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 md:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl bg-white p-8 ring-1 ring-momo-line md:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-momo-blue">Para compradores</p>
              <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                Encuentra tu inmueble en 3 pasos
              </h3>
              <div className="mt-6 space-y-3">
                {[
                  ['Busca', 'Escribí lo que buscás en lenguaje natural. TuMomo lo interpreta.'],
                  ['Compara', 'Precio/m², rentabilidad estimada y comparables de la zona.'],
                  ['Financia y conecta', 'Calculá tu cuota y hablá con un profesional verificado.'],
                ].map(([t, d], i) => (
                  <div key={t} className="flex gap-3 rounded-xl border border-momo-line p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-momo-amber font-display text-sm font-black">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display font-bold">{t}</p>
                      <p className="text-sm text-neutral-600">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Btn as={Link} to="/buscar" variant="black" className="mt-6 self-start">
                Empezar a buscar <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex h-full flex-col rounded-2xl bg-momo-amber p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-wider text-momo-blue">Para profesionales</p>
              <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight">
                Captá, gestioná y cerrá desde una sola plataforma
              </h3>
              <ul className="mt-6 space-y-3">
                {[
                  'CRM con pipeline inmobiliario de 8 etapas',
                  'IA que recomienda la siguiente acción por cada lead',
                  'WhatsApp, campañas de Meta y landing pages',
                  'Agenda de visitas conectada al lead',
                  'Demanda publicada: los compradores te encuentran',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-momo-navy text-[10px] text-momo-amber">✓</span>
                    <span className="text-sm font-medium">{t}</span>
                  </li>
                ))}
              </ul>
              <Btn as={Link} to="/pro" variant="black" className="mt-7 self-start">
                Conocer TuMomo Pro <ArrowRight className="h-4 w-4" />
              </Btn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DATA TEASER ---------------- */}
      <section className="border-t border-momo-line bg-neutral-50 py-16">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHead
            kicker="TuMomo Data"
            title="Inteligencia inmobiliaria de Santa Cruz"
            sub="Precio por m², alquiler promedio, oferta, demanda y tendencia por zona."
            action={<Link to="/datos" className="text-sm font-semibold text-momo-black hover:underline">Ver dashboard →</Link>}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DATA_ZONAS.slice(0, 4).map((z, i) => (
              <Reveal key={z.zona} delay={i * 60}>
                <div className="rounded-xl bg-white p-5 ring-1 ring-momo-line">
                  <p className="font-display font-bold">{z.zona}</p>
                  <p className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                    ${z.precioM2.toLocaleString('es-BO')}<span className="text-sm font-bold text-momo-muted">/m²</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" /> +{z.tendencia}% interanual
                  </p>
                  <p className="mt-2 text-[11px] text-momo-muted">
                    Rentabilidad bruta est. {z.rentabilidad}%
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <NotaDemo>Datos de demostración. No provienen todavía de una fuente de mercado real.</NotaDemo>
        </div>
      </section>
    </>
  )
}
