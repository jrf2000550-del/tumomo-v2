import { Link } from 'react-router-dom'
import { X, Scale, Trophy } from 'lucide-react'
import { PROPIEDADES, fmtUSD, getAgente } from '../data/demo'
import { Btn, EstadoTag, NotaDemo, SectionHead } from '../components/ui'
import { useStore } from '../lib/store'

export default function Comparar() {
  const { compareIds, toggleCompare } = useStore()
  const props = compareIds.map((id) => PROPIEDADES.find((p) => p.id === id)).filter(Boolean)

  if (props.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-5 py-20 text-center md:px-8">
        <Scale className="mx-auto h-10 w-10 text-neutral-300" />
        <h1 className="mt-4 font-display text-2xl font-extrabold">El comparador está vacío</h1>
        <p className="mt-2 text-neutral-600">Agregá entre 2 y 4 propiedades desde los resultados de búsqueda.</p>
        <Btn as={Link} to="/buscar" className="mt-6">Buscar propiedades</Btn>
      </div>
    )
  }

  // Mejor valor en cada fila (para resaltar)
  const menor = (k) => Math.min(...props.map((p) => p[k]))
  const mayor = (k) => Math.max(...props.map((p) => p[k]))

  const rent = (p) => (p.alquilerEstimado ? ((p.alquilerEstimado * 12) / p.precio) * 100 : 0)
  const mejorRent = Math.max(...props.map(rent))

  const FILAS = [
    { l: 'Precio', v: (p) => fmtUSD(p.precio), mejor: (p) => p.precio === menor('precio') },
    { l: 'Superficie', v: (p) => `${p.superficie} m²`, mejor: (p) => p.superficie === mayor('superficie') },
    { l: 'Precio / m²', v: (p) => fmtUSD(p.precioM2), mejor: (p) => p.precioM2 === menor('precioM2') },
    { l: 'Dormitorios', v: (p) => p.dorm || '—', mejor: (p) => p.dorm === mayor('dorm') && p.dorm > 0 },
    { l: 'Baños', v: (p) => p.banos || '—', mejor: (p) => p.banos === mayor('banos') && p.banos > 0 },
    { l: 'Parqueos', v: (p) => p.parqueos || '—', mejor: (p) => p.parqueos === mayor('parqueos') && p.parqueos > 0 },
    { l: 'Alquiler estimado', v: (p) => (p.alquilerEstimado ? fmtUSD(p.alquilerEstimado) + '/mes' : '—'), mejor: (p) => p.alquilerEstimado === mayor('alquilerEstimado') && p.alquilerEstimado > 0, demo: true },
    { l: 'Rentabilidad bruta est.', v: (p) => (rent(p) ? rent(p).toFixed(1) + '%' : '—'), mejor: (p) => rent(p) === mejorRent && mejorRent > 0, demo: true },
    { l: 'Estado', v: (p) => p.estado },
    { l: 'Ubicación', v: (p) => `${p.zona}, ${p.ciudad}` },
    { l: 'Formas de compra', v: (p) => p.formas.join(', ') },
    { l: 'Objetivo', v: (p) => p.objetivo.join(' / ') },
    { l: 'Agente', v: (p) => getAgente(p.agente)?.nombre || '—' },
  ]

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
      <SectionHead
        kicker="Comparador"
        title={`Comparando ${props.length} ${props.length === 1 ? 'propiedad' : 'propiedades'}`}
        sub="Los valores resaltados indican la mejor posición en cada criterio."
        action={<Btn as={Link} to="/buscar" variant="outline" size="sm">Agregar más</Btn>}
      />

      <div className="overflow-x-auto rounded-2xl ring-1 ring-momo-line">
        <table className="w-full min-w-[720px] border-collapse bg-white">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-44 bg-white p-4 text-left align-bottom">
                <span className="text-xs font-bold uppercase tracking-wider text-momo-muted">Criterio</span>
              </th>
              {props.map((p) => (
                <th key={p.id} className="min-w-[210px] border-l border-momo-line p-4 text-left align-top">
                  <div className="relative">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-neutral-400 ring-1 ring-momo-line hover:text-momo-blue"
                      aria-label="Quitar"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <img src={p.fotos[0]} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                    <Link to={`/propiedad/${p.id}`} className="mt-2.5 block font-display text-sm font-bold leading-tight hover:text-momo-blue">
                      {p.nombre}
                    </Link>
                    <p className="mt-0.5 text-xs font-normal text-momo-muted">{p.zona}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FILAS.map((f, i) => (
              <tr key={f.l} className={i % 2 ? 'bg-neutral-50/60' : ''}>
                <td className="sticky left-0 z-10 bg-inherit p-4 text-sm font-semibold text-neutral-600">
                  {f.l}
                  {f.demo && <span className="ml-1 text-amber-600" title="Dato de demostración">◆</span>}
                </td>
                {props.map((p) => {
                  const destacado = f.mejor?.(p)
                  return (
                    <td key={p.id} className="border-l border-momo-line p-4 text-sm">
                      <span className={destacado
                        ? 'inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 font-bold text-emerald-800'
                        : ''}>
                        {destacado && <Trophy className="h-3.5 w-3.5" />}
                        {f.v(p)}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
            <tr>
              <td className="sticky left-0 bg-white p-4" />
              {props.map((p) => (
                <td key={p.id} className="border-l border-momo-line p-4">
                  <Btn as={Link} to={`/propiedad/${p.id}`} size="sm" className="w-full">Ver ficha</Btn>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <EstadoTag tipo="funcional" />
        <NotaDemo className="mt-0 flex-1">
          Las filas marcadas con ◆ (alquiler y rentabilidad) son estimaciones de demostración.
        </NotaDemo>
      </div>
    </div>
  )
}
