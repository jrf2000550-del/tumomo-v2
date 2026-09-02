import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HardHat, Check, ArrowRight, ArrowLeft, Trees, Compass, Building2,
  Wallet, Sparkles, RotateCcw, Star, ShieldCheck,
} from 'lucide-react'
import { Btn, Badge, EstadoTag, NotaDemo, Reveal } from '../components/ui'
import { PROPIEDADES, PROFESIONALES, BANCOS, fmtUSD } from '../data/demo'

const PASOS = [
  { id: 'terreno', icon: Trees, pregunta: '¿Tenés terreno?', si: 'Ya tengo mi terreno', no: 'Todavía no tengo terreno', necesita: 'Buscar terrenos' },
  { id: 'arquitecto', icon: Compass, pregunta: '¿Tenés arquitecto?', si: 'Ya tengo arquitecto', no: 'Necesito un arquitecto', necesita: 'Encontrar arquitecto' },
  { id: 'constructora', icon: Building2, pregunta: '¿Necesitás constructora?', si: 'Ya tengo constructora', no: 'Necesito una constructora', necesita: 'Encontrar constructora', invertido: true },
  { id: 'financiamiento', icon: Wallet, pregunta: '¿Necesitás financiamiento?', si: 'Tengo el capital', no: 'Necesito financiamiento', necesita: 'Ver financiamiento', invertido: true },
  { id: 'servicios', icon: Sparkles, pregunta: '¿Necesitás servicios adicionales?', si: 'Por ahora no', no: 'Sí, quiero ver opciones', necesita: 'Servicios complementarios', invertido: true },
]

export default function Construir() {
  const [paso, setPaso] = useState(0)
  const [resp, setResp] = useState({})
  const terminado = paso >= PASOS.length

  const responder = (v) => {
    setResp((p) => ({ ...p, [PASOS[paso].id]: v }))
    setPaso((p) => p + 1)
  }

  const reiniciar = () => { setResp({}); setPaso(0) }

  // Lo que TuMomo debe resolverle segun sus respuestas
  const necesita = PASOS.filter((s) => {
    const r = resp[s.id]
    return s.invertido ? r === 'no' : r === 'no'
  })

  return (
    <>
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <HardHat className="h-3.5 w-3.5" /> Experiencia guiada
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Quiero construir mi casa.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              Respondé cinco preguntas y TuMomo arma tu ruta: terreno, arquitecto, constructora,
              financiamiento y servicios. Todo conectado en un solo lugar.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-8">
        {/* Progreso */}
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {PASOS.map((s, i) => {
            const hecho = resp[s.id] !== undefined
            const actual = i === paso
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                  hecho ? 'bg-momo-navy text-white'
                    : actual ? 'bg-momo-blue text-white'
                    : 'bg-neutral-100 text-momo-muted'
                }`}>
                  {hecho ? <Check className="h-3.5 w-3.5" /> : <s.icon className="h-3.5 w-3.5" />}
                  <span className="hidden sm:inline">{s.id.charAt(0).toUpperCase() + s.id.slice(1)}</span>
                </div>
                {i < PASOS.length - 1 && <div className="h-px w-4 bg-neutral-300" />}
              </div>
            )
          })}
        </div>

        {!terminado ? (
          <Reveal key={paso}>
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 text-center shadow-card ring-1 ring-momo-line md:p-12">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-momo-blue-soft">
                {(() => { const I = PASOS[paso].icon; return <I className="h-6 w-6" /> })()}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-wider text-momo-muted">
                Paso {paso + 1} de {PASOS.length}
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                {PASOS[paso].pregunta}
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => responder('si')}
                  className="rounded-xl border-2 border-momo-line p-5 text-left transition-all hover:-translate-y-1 hover:border-momo-navy hover:shadow-card"
                >
                  <p className="font-display font-bold">Sí</p>
                  <p className="mt-1 text-sm text-neutral-600">{PASOS[paso].si}</p>
                </button>
                <button
                  onClick={() => responder('no')}
                  className="rounded-xl border-2 border-momo-amber bg-momo-blue-soft p-5 text-left transition-all hover:-translate-y-1 hover:shadow-card"
                >
                  <p className="font-display font-bold">No</p>
                  <p className="mt-1 text-sm text-neutral-700">{PASOS[paso].no}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-momo-blue">
                    TuMomo te ayuda <ArrowRight className="h-3 w-3" />
                  </p>
                </button>
              </div>

              {paso > 0 && (
                <button onClick={() => setPaso((p) => p - 1)} className="mt-6 inline-flex items-center gap-1.5 text-sm text-momo-muted hover:text-momo-navy">
                  <ArrowLeft className="h-4 w-4" /> Volver
                </button>
              )}
            </div>
          </Reveal>
        ) : (
          <Resultado necesita={necesita} onReiniciar={reiniciar} />
        )}
      </section>

      {/* Diagrama del ecosistema */}
      <section className="border-t border-momo-line bg-momo-navy py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <p className="text-xs font-bold uppercase tracking-wider text-momo-blue-soft">El ecosistema</p>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight md:text-4xl">
            La propiedad como centro de todo
          </h2>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Construir no es una transacción: es una cadena de decisiones. TuMomo conecta cada eslabón.
          </p>

          <div className="mt-9 flex flex-wrap items-stretch gap-3">
            {[
              ['Terreno', Trees], ['Arquitecto', Compass], ['Constructora', Building2],
              ['Financiamiento', Wallet], ['Servicios', Sparkles],
            ].map(([t, I], i, arr) => (
              <div key={t} className="flex items-center gap-3">
                <div className="rounded-xl bg-white/5 px-5 py-4 text-center ring-1 ring-white/10">
                  <I className="mx-auto h-5 w-5 text-momo-blue-soft" />
                  <p className="mt-2 text-sm font-semibold">{t}</p>
                </div>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-neutral-600" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function Resultado({ necesita, onReiniciar }) {
  const terrenos = PROPIEDADES.filter((p) => p.tipo === 'Terreno').slice(0, 3)
  const arquitectos = PROFESIONALES.filter((p) => p.categoria === 'Arquitectos')
  const constructoras = PROFESIONALES.filter((p) => p.categoria === 'Constructoras')
  const servicios = PROFESIONALES.filter((p) =>
    ['Interioristas', 'Paisajistas', 'Mantenimiento', 'Abogados'].includes(p.categoria)
  )

  const ids = necesita.map((n) => n.id)

  return (
    <Reveal>
      <div className="space-y-8">
        <div className="rounded-2xl bg-momo-amber p-8 md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-momo-blue">Tu ruta de construcción</p>
          <h2 className="mt-2 font-display text-3xl font-black tracking-tight">
            {ids.length === 0
              ? 'Ya tenés todo resuelto'
              : `TuMomo te conecta con ${ids.length} ${ids.length === 1 ? 'servicio' : 'servicios'}`}
          </h2>
          <p className="mt-3 max-w-2xl text-sm">
            {ids.length === 0
              ? 'Igual podés explorar el marketplace de profesionales para comparar opciones.'
              : 'Según tus respuestas, esto es lo que necesitás resolver. Todo dentro de la plataforma.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {necesita.map((n) => (
              <span key={n.id} className="rounded-full bg-momo-navy px-3 py-1.5 text-xs font-semibold text-white">
                {n.necesita}
              </span>
            ))}
          </div>
          <button onClick={onReiniciar} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline">
            <RotateCcw className="h-4 w-4" /> Empezar de nuevo
          </button>
        </div>

        {ids.includes('terreno') && (
          <Bloque titulo="Terrenos disponibles" sub="Lotes urbanizados listos para construir" to="/buscar?tipo=Terreno">
            <div className="grid gap-4 md:grid-cols-3">
              {terrenos.map((t) => (
                <Link key={t.id} to={`/propiedad/${t.id}`} className="group overflow-hidden rounded-xl bg-white ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                  <img src={t.fotos[0]} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="p-4">
                    <p className="font-display text-lg font-extrabold">{fmtUSD(t.precio)}</p>
                    <p className="mt-1 text-sm font-semibold">{t.nombre}</p>
                    <p className="text-xs text-momo-muted">{t.zona} · {t.superficie} m²</p>
                  </div>
                </Link>
              ))}
            </div>
          </Bloque>
        )}

        {ids.includes('arquitecto') && (
          <Bloque titulo="Arquitectos verificados" sub="Diseño, planos municipales y dirección de obra" to="/profesionales?cat=Arquitectos">
            <div className="grid gap-4 md:grid-cols-2">
              {arquitectos.map((a) => <ProCard key={a.id} p={a} />)}
            </div>
          </Bloque>
        )}

        {ids.includes('constructora') && (
          <Bloque titulo="Constructoras" sub="Obra gruesa, llave en mano y remodelación" to="/profesionales?cat=Constructoras">
            <div className="grid gap-4 md:grid-cols-2">
              {constructoras.map((c) => <ProCard key={c.id} p={c} />)}
            </div>
          </Bloque>
        )}

        {ids.includes('financiamiento') && (
          <Bloque titulo="Financiamiento de construcción" sub="Entidades que financian obra nueva" to="/financiar">
            <div className="grid gap-4 md:grid-cols-3">
              {BANCOS.slice(0, 3).map((b) => (
                <div key={b.id} className="rounded-xl bg-white p-5 ring-1 ring-momo-line">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-neutral-100 text-lg">{b.logo}</span>
                    <p className="font-display font-bold">{b.nombre}</p>
                  </div>
                  <p className="mt-3 text-sm text-neutral-600">Tasa desde <span className="font-bold">{b.tasa}%</span> · hasta {b.plazoMax} años</p>
                  <Btn as={Link} to="/financiar#bancos" variant="outline" size="sm" className="mt-3 w-full">Ver condiciones</Btn>
                </div>
              ))}
            </div>
            <NotaDemo>Entidades de demostración. Condiciones sujetas a aprobación.</NotaDemo>
          </Bloque>
        )}

        {ids.includes('servicios') && (
          <Bloque titulo="Servicios complementarios" sub="Interiorismo, paisajismo, legal y mantenimiento" to="/profesionales">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {servicios.map((s) => <ProCard key={s.id} p={s} compacto />)}
            </div>
          </Bloque>
        )}
      </div>
    </Reveal>
  )
}

function Bloque({ titulo, sub, to, children }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-extrabold tracking-tight">{titulo}</h3>
          <p className="text-sm text-neutral-600">{sub}</p>
        </div>
        <Link to={to} className="text-sm font-semibold text-momo-black hover:underline">Ver todos →</Link>
      </div>
      {children}
    </div>
  )
}

function ProCard({ p, compacto }) {
  return (
    <Link
      to={`/profesionales?cat=${p.categoria}`}
      className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <img src={p.avatar} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-display font-bold">{p.nombre}</p>
          {p.verificado && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
        </div>
        <p className="text-xs text-momo-muted">{p.categoria}</p>
        <div className="mt-1.5 flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 font-semibold">
            <Star className="h-3 w-3 fill-momo-amber text-momo-amber" /> {p.rating}
          </span>
          <span className="text-neutral-400">·</span>
          <span className="text-momo-muted">{p.desde}</span>
        </div>
        {!compacto && (
          <div className="mt-2 flex flex-wrap gap-1">
            {p.servicios.slice(0, 2).map((s) => <Badge key={s} tone="neutral">{s}</Badge>)}
          </div>
        )}
      </div>
    </Link>
  )
}
