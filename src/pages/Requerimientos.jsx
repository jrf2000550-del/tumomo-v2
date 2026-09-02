import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, Check, Target, Bell, ArrowRight } from 'lucide-react'
import { Btn, Badge, EstadoTag, NotaDemo, SectionHead, Reveal } from '../components/ui'
import { REQUERIMIENTOS, ZONAS, TIPOS, FORMAS_COMPRA, OBJETIVOS, PROPIEDADES, fmtUSD } from '../data/demo'
import { filtrar } from '../lib/nlSearch'

export default function Requerimientos() {
  const [enviado, setEnviado] = useState(null)
  const [lista, setLista] = useState(REQUERIMIENTOS)

  const publicar = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const nuevo = {
      id: `rq-${Date.now()}`,
      autor: 'Vos',
      tipo: fd.get('tipo'),
      zona: fd.get('zona'),
      presupuesto: Number(fd.get('presupuesto')) || 0,
      dorm: Number(fd.get('dorm')) || 0,
      superficie: Number(fd.get('superficie')) || 0,
      forma: fd.get('forma'),
      objetivo: fd.get('objetivo'),
      comentarios: fd.get('comentarios') || '',
      publicado: 'Recién ahora',
      nuevo: true,
    }

    // Matching contra el dataset
    const compatibles = filtrar({
      tipo: nuevo.tipo,
      zona: nuevo.zona,
      presupuesto: nuevo.presupuesto || null,
      dorm: nuevo.dorm || null,
      formaCompra: nuevo.forma,
      operacion: 'Comprar',
    })

    const match = compatibles.length
      ? Math.min(98, 72 + compatibles.length * 4)
      : 61

    const conMatch = { ...nuevo, match, compatibles: compatibles.slice(0, 3) }
    setLista((p) => [conMatch, ...p])
    setEnviado(conMatch)
    e.target.reset()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <Megaphone className="h-3.5 w-3.5" /> Demanda → Oferta
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Publica lo que estás buscando.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              En vez de revisar cientos de avisos, publicá tu requerimiento. TuMomo notifica a los
              profesionales que tienen propiedades compatibles y ellos te buscan a vos.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Confirmación con matching */}
      {enviado && (
        <section className="mx-auto max-w-[1280px] px-5 pt-10 md:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-2xl bg-momo-navy text-white">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-6 py-4">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20">
                  <Check className="h-4 w-4 text-emerald-400" />
                </span>
                <p className="font-display font-bold">Tu requerimiento fue publicado</p>
                <span className="ml-auto"><EstadoTag tipo="simulado" /></span>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-[.7fr_1.3fr]">
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/5 p-6 text-center ring-1 ring-white/10">
                  <Target className="h-6 w-6 text-momo-amber" />
                  <p className="mt-3 font-display text-5xl font-black tracking-tight text-momo-amber">
                    {enviado.match}%
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">de coincidencia</p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-sm text-neutral-300">
                    <Bell className="h-4 w-4 text-momo-amber" />
                    TuMomo notificará a los profesionales con propiedades compatibles.
                  </p>

                  {enviado.compatibles?.length > 0 ? (
                    <>
                      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-momo-muted">
                        Coincidencias encontradas ahora mismo
                      </p>
                      <div className="mt-3 space-y-2">
                        {enviado.compatibles.map((c) => (
                          <Link key={c.id} to={`/propiedad/${c.id}`}
                            className="flex items-center gap-3 rounded-lg bg-white/5 p-3 transition-colors hover:bg-white/10">
                            <img src={c.fotos[0]} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold">{c.nombre}</p>
                              <p className="text-xs text-neutral-400">{c.zona} · {c.superficie} m² · {c.dorm} dorm</p>
                            </div>
                            <p className="shrink-0 font-display font-bold text-momo-amber">{fmtUSD(c.precio)}</p>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="mt-5 rounded-lg bg-white/5 p-4 text-sm text-neutral-400">
                      Todavía no hay propiedades publicadas que coincidan exactamente. Los profesionales
                      recibirán tu requerimiento y te contactarán cuando tengan algo.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          {/* Formulario */}
          <div>
            <div className="lg:sticky lg:top-24 rounded-2xl bg-white p-6 shadow-card ring-1 ring-momo-line">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl font-bold">Publicar requerimiento</h2>
                <EstadoTag tipo="funcional" />
              </div>

              <form onSubmit={publicar} className="mt-5 space-y-3.5">
                <Select name="tipo" label="Tipo de propiedad" opciones={TIPOS} />
                <Select name="zona" label="Zona" opciones={ZONAS} />
                <div className="grid grid-cols-2 gap-3">
                  <Input name="presupuesto" label="Presupuesto (USD)" type="number" placeholder="150000" required />
                  <Input name="dorm" label="Dormitorios" type="number" placeholder="2" min={0} />
                </div>
                <Input name="superficie" label="Superficie mínima (m²)" type="number" placeholder="90" />
                <Select name="forma" label="Forma de compra" opciones={FORMAS_COMPRA} />
                <Select name="objetivo" label="Objetivo" opciones={OBJETIVOS} />
                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-600">Comentarios</label>
                  <textarea name="comentarios" rows={3} placeholder="Contanos qué es importante para vos…"
                    className="w-full resize-none rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber" />
                </div>
                <Btn type="submit" className="w-full">Publicar requerimiento</Btn>
              </form>

              <NotaDemo>
                En la demo, publicar calcula un porcentaje de coincidencia contra el dataset de propiedades.
              </NotaDemo>
            </div>
          </div>

          {/* Lista */}
          <div>
            <SectionHead
              kicker="Demanda activa"
              title="Requerimientos publicados"
              sub="Lo que los compradores están buscando ahora mismo."
            />
            <div className="space-y-3">
              {lista.map((r, i) => (
                <Reveal key={r.id} delay={Math.min(i, 6) * 50}>
                  <ReqCard r={r} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ReqCard({ r }) {
  return (
    <div className={`rounded-2xl bg-white p-5 ring-1 transition-all hover:shadow-card ${
      r.nuevo ? 'ring-2 ring-momo-amber' : 'ring-momo-line'
    }`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-display font-bold">{r.autor}</p>
            {r.nuevo && <Badge tone="yellow">Nuevo</Badge>}
          </div>
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
        {r.superficie > 0 && <Badge tone="outline">{r.superficie}+ m²</Badge>}
        <Badge tone="yellow">{r.forma}</Badge>
        <Badge tone="neutral">{r.objetivo}</Badge>
      </div>

      {r.comentarios && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-600">"{r.comentarios}"</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
        <p className="text-xs text-momo-muted">
          Visible para profesionales verificados
        </p>
        <Link to="/pro/leads" className="inline-flex items-center gap-1 text-xs font-bold text-momo-black hover:underline">
          Responder desde Pro <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}

function Input({ label, ...rest }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-neutral-600">{label}</label>
      <input {...rest} className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber" />
    </div>
  )
}

function Select({ label, opciones, ...rest }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-neutral-600">{label}</label>
      <select {...rest} className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber">
        {opciones.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}
