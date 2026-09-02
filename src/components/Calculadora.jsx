import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight } from 'lucide-react'
import { Btn, EstadoTag, NotaDemo } from './ui'
import { cuotaMensual } from '../lib/nlSearch'
import { fmtUSD } from '../data/demo'

export default function Calculadora({ precioInicial = 150000, compacta = false }) {
  const [precio, setPrecio] = useState(precioInicial)
  const [inicialPct, setInicialPct] = useState(20)
  const [plazo, setPlazo] = useState(15)
  const [tasa, setTasa] = useState(6.9)

  const r = useMemo(() => {
    const inicial = (precio * inicialPct) / 100
    const financiado = precio - inicial
    const cuota = cuotaMensual(financiado, tasa, plazo)
    const totalPagado = cuota * plazo * 12
    const interes = totalPagado - financiado
    return { inicial, financiado, cuota, interes, totalPagado }
  }, [precio, inicialPct, plazo, tasa])

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
      <div className="flex flex-wrap items-center gap-2 border-b border-momo-line bg-neutral-50 px-6 py-4">
        <Calculator className="h-5 w-5" />
        <h2 className="font-display text-xl font-bold">Calculadora de financiamiento</h2>
        <span className="ml-auto"><EstadoTag tipo="funcional" /></span>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_.8fr]">
        {/* Controles */}
        <div className="space-y-5">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-xs font-semibold text-neutral-600">Precio de la propiedad</label>
              <span className="font-display text-sm font-bold">{fmtUSD(precio)}</span>
            </div>
            <input
              type="number" value={precio} min={10000} step={1000}
              onChange={(e) => setPrecio(Math.max(0, Number(e.target.value)))}
              className="mt-1.5 w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber"
            />
          </div>

          <Slider
            label="Inicial" valor={inicialPct} min={0} max={60} step={5}
            onChange={setInicialPct} texto={`${inicialPct}% · ${fmtUSD(r.inicial)}`}
          />
          <Slider
            label="Plazo" valor={plazo} min={1} max={25} step={1}
            onChange={setPlazo} texto={`${plazo} años`}
          />
          <Slider
            label="Tasa anual" valor={tasa} min={4} max={14} step={0.1}
            onChange={setTasa} texto={`${tasa.toFixed(1)}%`}
          />
        </div>

        {/* Resultado */}
        <div className="flex flex-col rounded-xl bg-momo-navy p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Cuota mensual estimada
          </p>
          <p className="mt-1.5 font-display text-4xl font-black tracking-tight text-momo-amber">
            {fmtUSD(Math.round(r.cuota))}
          </p>

          <dl className="mt-5 space-y-2.5 text-sm">
            {[
              ['Inicial', fmtUSD(Math.round(r.inicial))],
              ['Monto a financiar', fmtUSD(Math.round(r.financiado))],
              ['Plazo', `${plazo} años (${plazo * 12} cuotas)`],
              ['Interés estimado', fmtUSD(Math.round(r.interes))],
              ['Total pagado', fmtUSD(Math.round(r.totalPagado + r.inicial))],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                <dt className="text-neutral-400">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

          {!compacta && (
            <Btn as={Link} to="/financiar#bancos" variant="yellow" className="mt-5 w-full">
              Ver opciones de financiamiento <ArrowRight className="h-4 w-4" />
            </Btn>
          )}
        </div>
      </div>

      <div className="px-6 pb-5">
        <NotaDemo className="mt-0">
          Cálculo referencial con sistema de amortización francés. Las condiciones reales dependen de la
          evaluación de cada entidad financiera.
        </NotaDemo>
      </div>
    </div>
  )
}

function Slider({ label, valor, min, max, step, onChange, texto }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-semibold text-neutral-600">{label}</label>
        <span className="font-display text-sm font-bold">{texto}</span>
      </div>
      <input
        type="range" value={valor} min={min} max={max} step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-momo-blue"
      />
    </div>
  )
}
