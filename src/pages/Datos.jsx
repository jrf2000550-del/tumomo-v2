import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import { TrendingUp, TrendingDown, Database, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Btn, Badge, EstadoTag, NotaDemo, SectionHead, Reveal, Counter } from '../components/ui'
import { DATA_ZONAS, DATA_EVOLUCION } from '../data/demo'

export default function Datos() {
  const [zonaSel, setZonaSel] = useState(DATA_ZONAS[0].zona)
  const z = DATA_ZONAS.find((x) => x.zona === zonaSel)

  const presion = (x) => (x.demanda / x.oferta)

  return (
    <>
      <section className="border-b border-neutral-800 bg-momo-navy py-14 text-white">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-amber px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-momo-navy">
                <Database className="h-3.5 w-3.5" /> TuMomo Data
              </span>
              <EstadoTag tipo="simulado" />
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Inteligencia inmobiliaria
            </h1>
            <p className="mt-3 text-lg text-neutral-400">Santa Cruz de la Sierra</p>
          </Reveal>

          <div className="mt-9 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { v: <>$<Counter to={1256} /></>, l: 'Precio promedio / m²' },
              { v: <>$<Counter to={7.7} decimals={1} /></>, l: 'Alquiler promedio / m²' },
              { v: <Counter to={2728} />, l: 'Inmuebles en oferta' },
              { v: <Counter to={70} />, l: 'Proyectos en desarrollo' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="font-display text-3xl font-black tracking-tight text-white md:text-4xl">{s.v}</p>
                <p className="mt-1 text-sm text-neutral-400">{s.l}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-8">
        {/* Selector de zona */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-2">
          {DATA_ZONAS.map((x) => (
            <button
              key={x.zona}
              onClick={() => setZonaSel(x.zona)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold ring-1 transition-colors ${
                zonaSel === x.zona
                  ? 'bg-momo-navy text-white ring-momo-navy'
                  : 'bg-white text-neutral-700 ring-momo-line hover:bg-neutral-50'
              }`}
            >
              {x.zona}
            </button>
          ))}
        </div>

        {/* Detalle de zona */}
        <Reveal key={zonaSel}>
          <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-momo-line">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold tracking-tight">{z.zona}</h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold ${
                z.tendencia > 5 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {z.tendencia > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {z.tendencia > 0 ? '+' : ''}{z.tendencia}% interanual
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [`$${z.precioM2.toLocaleString('es-BO')}`, 'Precio / m²'],
                [`$${z.alquilerM2}`, 'Alquiler / m² mensual'],
                [`${z.rentabilidad}%`, 'Rentabilidad bruta est.'],
                [`${presion(z).toFixed(2)}x`, 'Presión de demanda'],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-neutral-50 p-4">
                  <p className="font-display text-2xl font-extrabold tracking-tight">{v}</p>
                  <p className="mt-0.5 text-xs text-momo-muted">{l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                [z.oferta, 'Inmuebles en oferta', 'bg-neutral-300'],
                [z.demanda, 'Búsquedas activas', 'bg-momo-amber'],
                [z.proyectos, 'Proyectos en obra', 'bg-momo-blue'],
              ].map(([v, l, c]) => (
                <div key={l}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-neutral-600">{l}</span>
                    <span className="font-display font-bold">{v}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div className={`h-full rounded-full ${c}`} style={{ width: `${Math.min(100, (v / 750) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Gráficos */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
              <h3 className="font-display text-lg font-bold">Precio por m² según zona</h3>
              <p className="text-xs text-momo-muted">En dólares por metro cuadrado</p>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DATA_ZONAS} margin={{ left: -18, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                    <XAxis dataKey="zona" tick={{ fontSize: 10 }} interval={0} angle={-22} textAnchor="end" height={62} stroke="#999" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 12 }}
                      formatter={(v) => [`$${v.toLocaleString('es-BO')}`, 'Precio/m²']}
                    />
                    <Bar dataKey="precioM2" fill="#f6c400" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-momo-line">
              <h3 className="font-display text-lg font-bold">Evolución del precio por m²</h3>
              <p className="text-xs text-momo-muted">Últimos 12 meses en las zonas principales</p>
              <div className="mt-5 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DATA_EVOLUCION} margin={{ left: -18, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11 }} stroke="#999" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#999" />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e8e8e8', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="Equipetrol" stroke="#151515" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="Norte" stroke="#d7262e" strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="Urubó" stroke="#f6c400" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Tabla comparativa */}
        <div className="mt-8">
          <SectionHead kicker="Comparativa" title="Todas las zonas" />
          <div className="overflow-x-auto rounded-2xl ring-1 ring-momo-line">
            <table className="w-full min-w-[720px] bg-white text-sm">
              <thead className="bg-neutral-50">
                <tr className="text-left text-xs uppercase tracking-wider text-momo-muted">
                  {['Zona', '$/m²', 'Alquiler/m²', 'Oferta', 'Demanda', 'Proyectos', 'Rentab.', 'Tendencia'].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA_ZONAS.map((x, i) => (
                  <tr key={x.zona} className={`border-t border-neutral-100 ${i % 2 ? 'bg-neutral-50/50' : ''}`}>
                    <td className="px-4 py-3 font-semibold">{x.zona}</td>
                    <td className="px-4 py-3">${x.precioM2.toLocaleString('es-BO')}</td>
                    <td className="px-4 py-3">${x.alquilerM2}</td>
                    <td className="px-4 py-3">{x.oferta}</td>
                    <td className="px-4 py-3">{x.demanda}</td>
                    <td className="px-4 py-3">{x.proyectos}</td>
                    <td className="px-4 py-3">{x.rentabilidad}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 font-semibold ${
                        x.tendencia > 5 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        <TrendingUp className="h-3.5 w-3.5" /> +{x.tendencia}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
          <p className="font-display font-bold text-amber-900">Sobre estos datos</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-800">
            Todos los indicadores de esta pantalla son <strong>datos simulados</strong> creados para la
            demostración. En producción, TuMomo Data se alimentaría de las publicaciones reales de la
            plataforma, del histórico de operaciones y de fuentes de mercado verificables.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-momo-navy p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-momo-blue-soft">El activo real</p>
          <h3 className="mt-2 font-display text-3xl font-black tracking-tight">
            Cada búsqueda, cada lead y cada operación alimenta el dato.
          </h3>
          <p className="mt-3 max-w-2xl text-neutral-400">
            Cuando la plataforma concentra la oferta y la demanda, TuMomo deja de ser un portal y pasa a ser
            la fuente de referencia del mercado inmobiliario boliviano.
          </p>
          <Btn as={Link} to="/global" variant="yellow" className="mt-6">
            Ver TuMomo Global <ArrowRight className="h-4 w-4" />
          </Btn>
        </div>
      </section>
    </>
  )
}
