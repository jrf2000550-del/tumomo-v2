import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Handshake, Banknote, Building, Check, ArrowRight, Star } from 'lucide-react'
import { Btn, Badge, EstadoTag, NotaDemo, SectionHead, Reveal } from '../components/ui'
import Calculadora from '../components/Calculadora'
import { BANCOS, fmtUSD } from '../data/demo'
import { cuotaMensual } from '../lib/nlSearch'

export default function Financiar() {
  return (
    <>
      {/* Hero */}
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <Landmark className="h-3.5 w-3.5" /> Financiamiento
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Encuentra financiamiento para tu propiedad.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              Calculá tu cuota, compará entidades y descubrí si te conviene crédito bancario,
              crédito directo o el plan de pagos del proyecto.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Formas de compra */}
      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
        <SectionHead kicker="Opciones" title="¿Cómo quieres comprar?" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { id: 'contado', icon: Banknote, t: 'Contado', d: 'Pago directo al vendedor, sin intereses ni evaluación crediticia.', puntos: ['Mayor poder de negociación', 'Cierre más rápido', 'Sin costos financieros'] },
            { id: 'bancos', icon: Landmark, t: 'Crédito bancario', d: 'Financiamiento a través de una entidad financiera con garantía hipotecaria.', puntos: ['Plazos de hasta 25 años', 'Requiere evaluación', 'Necesita tasación'] },
            { id: 'directo', icon: Handshake, t: 'Crédito directo', d: 'Plan de pagos acordado directamente con el propietario o desarrollador.', puntos: ['Sin trámite bancario', 'Plazos más cortos', 'Inicial negociable'] },
            { id: 'proyecto', icon: Building, t: 'Financiamiento del proyecto', d: 'Cuotas durante la construcción y saldo a la entrega.', puntos: ['Ticket inicial más bajo', 'Precio de preventa', 'Entrega diferida'] },
          ].map((o, i) => (
            <Reveal key={o.id} delay={i * 60}>
              <div id={o.id} className="flex h-full scroll-mt-24 flex-col rounded-2xl bg-white p-6 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-momo-blue-soft">
                  <o.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{o.t}</h3>
                <p className="mt-2 text-sm text-neutral-600">{o.d}</p>
                <ul className="mt-4 space-y-1.5">
                  {o.puntos.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-xs text-neutral-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Calculadora */}
      <section className="border-y border-momo-line bg-neutral-50 py-14">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <SectionHead kicker="Simulá" title="Calculá tu cuota" />
          <Calculadora />
        </div>
      </section>

      {/* Marketplace de entidades */}
      <section id="bancos" className="mx-auto max-w-[1280px] scroll-mt-24 px-5 py-14 md:px-8">
        <SectionHead
          kicker="Marketplace"
          title="Entidades financieras"
          sub="Compará tasas, plazos y requisitos antes de iniciar el trámite."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BANCOS.map((b, i) => (
            <Reveal key={b.id} delay={i * 60}><BancoCard b={b} /></Reveal>
          ))}
        </div>
        <NotaDemo>
          Información de demostración. Las entidades mostradas son ficticias y las condiciones están
          sujetas a aprobación de cada entidad real.
        </NotaDemo>
      </section>

      {/* Crédito directo */}
      <section id="directo" className="scroll-mt-24 bg-momo-navy py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_.9fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-amber px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-momo-navy">
                <Handshake className="h-3.5 w-3.5" /> Crédito directo
              </span>
              <h2 className="mt-5 font-display text-3xl font-black tracking-tight md:text-4xl">
                Comprá sin pasar por el banco
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-neutral-300">
                Algunos propietarios y desarrolladores financian directamente la compra. TuMomo te conecta
                con esa oferta y te muestra las condiciones antes de que hables con nadie.
              </p>

              <div className="mt-6 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-momo-amber">Importante</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  TuMomo no financia ni otorga crédito. La plataforma conecta al comprador con la oferta
                  de financiamiento del vendedor o del proyecto.
                </p>
              </div>
            </div>

            <SimuladorDirecto />
          </div>
        </div>
      </section>
    </>
  )
}

function BancoCard({ b }) {
  const cuota = cuotaMensual(120000, b.tasa, Math.min(b.plazoMax, 15))
  return (
    <div className={`flex h-full flex-col rounded-2xl bg-white p-6 ring-1 transition-all hover:-translate-y-1 hover:shadow-card ${
      b.destacado ? 'ring-2 ring-momo-amber' : 'ring-momo-line'
    }`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-neutral-100 text-xl">{b.logo}</span>
          <div>
            <p className="font-display font-bold">{b.nombre}</p>
            <p className="text-[11px] text-momo-muted">Entidad de demostración</p>
          </div>
        </div>
        {b.destacado && <Badge tone="yellow"><Star className="h-3 w-3" /> Destacado</Badge>}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        {[
          ['Tasa', `${b.tasa}%`],
          ['Plazo máx.', `${b.plazoMax} a`],
          ['Financia', `${b.financiaHasta}%`],
        ].map(([l, v]) => (
          <div key={l} className="rounded-lg bg-neutral-50 p-2.5">
            <p className="font-display text-lg font-extrabold leading-none">{v}</p>
            <p className="mt-1 text-[10px] text-momo-muted">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-momo-blue-soft p-3">
        <p className="text-[11px] text-neutral-600">Cuota estimada sobre $120.000</p>
        <p className="font-display text-xl font-extrabold">{fmtUSD(Math.round(cuota))}/mes</p>
      </div>

      <ul className="mt-4 flex-1 space-y-1.5">
        {b.requisitos.map((r) => (
          <li key={r} className="flex items-start gap-2 text-xs text-neutral-600">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {r}
          </li>
        ))}
      </ul>

      <Btn variant="outline" size="sm" className="mt-5 w-full">
        Solicitar información <ArrowRight className="h-4 w-4" />
      </Btn>
    </div>
  )
}

function SimuladorDirecto() {
  const [precio] = useState(150000)
  const [inicialPct, setInicialPct] = useState(30)
  const [plazo, setPlazo] = useState(5)

  const inicial = (precio * inicialPct) / 100
  const saldo = precio - inicial
  const cuota = saldo / (plazo * 12)

  return (
    <div className="rounded-2xl bg-white p-6 text-momo-navy">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-lg font-bold">Simulador de crédito directo</p>
        <EstadoTag tipo="simulado" />
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-xs font-semibold text-neutral-600">Inicial</label>
            <span className="font-display text-sm font-bold">{inicialPct}% · {fmtUSD(inicial)}</span>
          </div>
          <input type="range" min={10} max={60} step={5} value={inicialPct}
            onChange={(e) => setInicialPct(Number(e.target.value))}
            className="mt-2 w-full accent-momo-blue" />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <label className="text-xs font-semibold text-neutral-600">Plazo</label>
            <span className="font-display text-sm font-bold">{plazo} años</span>
          </div>
          <input type="range" min={1} max={10} step={1} value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value))}
            className="mt-2 w-full accent-momo-blue" />
        </div>
      </div>

      <dl className="mt-5 space-y-2 border-t border-momo-line pt-4 text-sm">
        {[
          ['Precio de referencia', fmtUSD(precio)],
          ['Inicial', fmtUSD(Math.round(inicial))],
          ['Saldo financiado', fmtUSD(Math.round(saldo))],
          ['Plazo', `${plazo} años (${plazo * 12} cuotas)`],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-momo-muted">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 rounded-xl bg-momo-amber p-4">
        <p className="text-xs font-semibold">Cuota estimada</p>
        <p className="font-display text-3xl font-black tracking-tight">{fmtUSD(Math.round(cuota))}/mes</p>
        <p className="mt-1 text-[11px]">Sin interés en este ejemplo. Cada vendedor define sus condiciones.</p>
      </div>

      <Btn className="mt-4 w-full">Solicitar información</Btn>
      <NotaDemo>Simulación de demostración. No constituye una oferta de crédito.</NotaDemo>
    </div>
  )
}
