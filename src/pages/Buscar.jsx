import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Sparkles, SlidersHorizontal, LayoutGrid, Map as MapIcon, X, Scale } from 'lucide-react'
import { PropCard, Btn, Badge, EstadoTag, NotaDemo, Reveal } from '../components/ui'
import { PROPIEDADES, ZONAS, TIPOS, FORMAS_COMPRA, OBJETIVOS, fmtUSD, getAgente } from '../data/demo'
import { interpretar, chipsDe, filtrar } from '../lib/nlSearch'
import { useCompare } from '../lib/store'

const ESTADOS = ['Nuevo', 'Usado', 'Preventa', 'En construcción']

export default function Buscar() {
  const [sp, setSp] = useSearchParams()
  const nav = useNavigate()
  const { ids: compareIds, toggle: toggleCompare } = useCompare()

  const [q, setQ] = useState(sp.get('q') || '')
  const [vista, setVista] = useState('lista')
  const [panelAbierto, setPanelAbierto] = useState(false)

  // Filtros manuales
  const [f, setF] = useState({
    operacion: sp.get('operacion') || 'Comprar',
    tipos: sp.get('tipo') ? [sp.get('tipo')] : [],
    zonas: [],
    precioMin: '',
    presupuesto: '',
    dorm: '',
    supMin: '',
    estado: '',
    formaCompra: '',
    objetivo: '',
  })

  // Interpretación de la consulta en lenguaje natural
  const interpretacion = useMemo(() => {
    const texto = sp.get('q')
    return texto ? interpretar(texto) : null
  }, [sp])

  // Cuando llega una consulta NL, precarga los filtros con lo interpretado
  useEffect(() => {
    if (!interpretacion) return
    setF((prev) => ({
      ...prev,
      operacion: interpretacion.operacion || prev.operacion,
      tipos: interpretacion.tipo ? [interpretacion.tipo] : prev.tipos,
      zonas: interpretacion.zona ? [interpretacion.zona] : prev.zonas,
      dorm: interpretacion.dorm ?? prev.dorm,
      presupuesto: interpretacion.presupuesto ?? prev.presupuesto,
      estado: interpretacion.estado || prev.estado,
      objetivo: interpretacion.objetivo || prev.objetivo,
      formaCompra: interpretacion.formaCompra || prev.formaCompra,
    }))
  }, [interpretacion])

  const resultados = useMemo(() => {
    const criterios = {
      operacion: f.operacion,
      tipos: f.tipos.length ? f.tipos : null,
      zonas: f.zonas.length ? f.zonas : null,
      dorm: f.dorm === '' ? null : Number(f.dorm),
      presupuesto: f.presupuesto === '' ? null : Number(f.presupuesto),
      precioMin: f.precioMin === '' ? null : Number(f.precioMin),
      supMin: f.supMin === '' ? null : Number(f.supMin),
      estado: f.estado || null,
      formaCompra: f.formaCompra || null,
      objetivo: f.objetivo || null,
    }
    return filtrar(criterios)
  }, [f])

  const buscarNL = () => {
    if (q.trim()) setSp({ q: q.trim() })
    else setSp({})
  }

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const toggleArr = (k, v) =>
    setF((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }))

  const limpiar = () => {
    setF({ operacion: 'Comprar', tipos: [], zonas: [], precioMin: '', presupuesto: '', dorm: '', supMin: '', estado: '', formaCompra: '', objetivo: '' })
    setQ('')
    setSp({})
  }

  const activos =
    f.tipos.length + f.zonas.length +
    [f.precioMin, f.presupuesto, f.dorm, f.supMin, f.estado, f.formaCompra, f.objetivo].filter(Boolean).length

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
      {/* Buscador */}
      <div className="rounded-2xl bg-white p-2 shadow-card ring-1 ring-momo-line">
        <div className="flex items-center gap-2 px-2">
          <Sparkles className="h-5 w-5 shrink-0 text-momo-black" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarNL()}
            placeholder="¿Qué estás buscando? Escribí en lenguaje natural…"
            className="w-full bg-transparent py-3 text-[15px] outline-none placeholder:text-neutral-400"
          />
          <Btn onClick={buscarNL} size="md" className="shrink-0">
            <Search className="h-4 w-4" /> <span className="hidden sm:inline">Buscar</span>
          </Btn>
        </div>
      </div>

      {/* Interpretación */}
      {interpretacion && chipsDe(interpretacion).length > 0 && (
        <Reveal>
          <div className="mt-4 rounded-2xl bg-momo-blue-soft p-4 ring-1 ring-momo-amber">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                TuMomo interpretó tu búsqueda así
              </span>
              <EstadoTag tipo="simulado" />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {chipsDe(interpretacion).map((c) => (
                <span key={c.k} className="rounded-lg bg-white px-3 py-1.5 text-xs ring-1 ring-momo-line">
                  <span className="text-momo-muted">{c.k}:</span> <span className="font-bold">{c.v}</span>
                </span>
              ))}
            </div>
            <p className="mt-3 font-display text-lg font-extrabold">
              Encontramos {resultados.length} {resultados.length === 1 ? 'propiedad' : 'propiedades'} que coinciden con tu búsqueda.
            </p>
            <NotaDemo>
              Interpretación generada con reglas simuladas para la demo, no con un modelo de IA en producción.
            </NotaDemo>
          </div>
        </Reveal>
      )}

      {/* Barra de control */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl font-extrabold tracking-tight">
            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
          </h1>
          {activos > 0 && (
            <button onClick={limpiar} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold hover:bg-neutral-200">
              <X className="h-3 w-3" /> Limpiar {activos}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {compareIds.length > 0 && (
            <Btn as={Link} to="/comparar" variant="black" size="sm">
              <Scale className="h-4 w-4" /> Comparar ({compareIds.length})
            </Btn>
          )}
          <button
            onClick={() => setPanelAbierto((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ring-1 ring-neutral-300 hover:bg-neutral-50 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filtros
          </button>
          <div className="flex rounded-full bg-neutral-100 p-1">
            {[['lista', LayoutGrid, 'Lista'], ['mapa', MapIcon, 'Mapa']].map(([v, Icon, label]) => (
              <button
                key={v}
                onClick={() => setVista(v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                  vista === v ? 'bg-white shadow-sm' : 'text-neutral-600'
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* --------- FILTROS --------- */}
        <aside className={`${panelAbierto ? 'block' : 'hidden'} lg:block`}>
          <div className="lg:sticky lg:top-24 space-y-5 rounded-2xl bg-white p-5 ring-1 ring-momo-line">
            <Grupo titulo="Operación">
              <div className="flex gap-2">
                {['Comprar', 'Alquilar'].map((o) => (
                  <Chip key={o} activo={f.operacion === o} onClick={() => set('operacion', o)}>{o}</Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Tipo">
              <div className="flex flex-wrap gap-1.5">
                {TIPOS.map((t) => (
                  <Chip key={t} activo={f.tipos.includes(t)} onClick={() => toggleArr('tipos', t)}>{t}</Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Precio (USD)">
              <div className="flex gap-2">
                <input type="number" placeholder="Mín" value={f.precioMin}
                  onChange={(e) => set('precioMin', e.target.value)}
                  className="w-full rounded-lg border border-momo-line px-2.5 py-2 text-sm outline-none focus:border-momo-amber" />
                <input type="number" placeholder="Máx" value={f.presupuesto}
                  onChange={(e) => set('presupuesto', e.target.value)}
                  className="w-full rounded-lg border border-momo-line px-2.5 py-2 text-sm outline-none focus:border-momo-amber" />
              </div>
            </Grupo>

            <Grupo titulo="Zona">
              <div className="flex flex-wrap gap-1.5">
                {ZONAS.map((z) => (
                  <Chip key={z} activo={f.zonas.includes(z)} onClick={() => toggleArr('zonas', z)}>{z}</Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Dormitorios (mínimo)">
              <div className="flex gap-1.5">
                {['', '1', '2', '3', '4'].map((d) => (
                  <Chip key={d} activo={String(f.dorm) === d} onClick={() => set('dorm', d)}>
                    {d === '' ? 'Todos' : `${d}+`}
                  </Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Superficie mínima (m²)">
              <input type="number" placeholder="Ej. 90" value={f.supMin}
                onChange={(e) => set('supMin', e.target.value)}
                className="w-full rounded-lg border border-momo-line px-2.5 py-2 text-sm outline-none focus:border-momo-amber" />
            </Grupo>

            <Grupo titulo="Estado">
              <div className="flex flex-wrap gap-1.5">
                {ESTADOS.map((e) => (
                  <Chip key={e} activo={f.estado === e} onClick={() => set('estado', f.estado === e ? '' : e)}>{e}</Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Forma de compra">
              <div className="flex flex-wrap gap-1.5">
                {FORMAS_COMPRA.map((x) => (
                  <Chip key={x} activo={f.formaCompra === x} onClick={() => set('formaCompra', f.formaCompra === x ? '' : x)}>{x}</Chip>
                ))}
              </div>
            </Grupo>

            <Grupo titulo="Objetivo">
              <div className="flex flex-wrap gap-1.5">
                {OBJETIVOS.map((x) => (
                  <Chip key={x} activo={f.objetivo === x} onClick={() => set('objetivo', f.objetivo === x ? '' : x)}>{x}</Chip>
                ))}
              </div>
            </Grupo>
          </div>
        </aside>

        {/* --------- RESULTADOS --------- */}
        <div>
          {vista === 'lista' ? (
            resultados.length === 0 ? (
              <Vacio onLimpiar={limpiar} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {resultados.map((p, i) => (
                  <Reveal key={p.id} delay={Math.min(i, 8) * 40}>
                    <PropCard
                      p={p}
                      onCompare={toggleCompare}
                      comparing={compareIds.includes(p.id)}
                    />
                  </Reveal>
                ))}
              </div>
            )
          ) : (
            <MapaDemo propiedades={resultados} />
          )}
        </div>
      </div>
    </div>
  )
}

function Grupo({ titulo, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-momo-muted">{titulo}</p>
      {children}
    </div>
  )
}

function Chip({ activo, children, ...rest }) {
  return (
    <button
      {...rest}
      className={`rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 transition-colors ${
        activo
          ? 'bg-momo-navy text-white ring-momo-navy'
          : 'bg-white text-neutral-700 ring-momo-line hover:bg-neutral-50'
      }`}
    >
      {children}
    </button>
  )
}

function Vacio({ onLimpiar }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 p-14 text-center">
      <p className="font-display text-xl font-bold">No encontramos propiedades con esos criterios</p>
      <p className="mt-2 text-sm text-neutral-600">Probá ampliando el presupuesto o quitando algún filtro.</p>
      <Btn onClick={onLimpiar} variant="outline" className="mt-5">Limpiar filtros</Btn>
    </div>
  )
}

// --- Mapa simulado ----------------------------------------------------------

function MapaDemo({ propiedades }) {
  const [sel, setSel] = useState(null)
  const activa = propiedades.find((p) => p.id === sel)

  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-momo-line">
      <div className="flex items-center justify-between gap-2 border-b border-momo-line bg-white px-4 py-2.5">
        <p className="text-sm font-semibold">{propiedades.length} propiedades en el mapa</p>
        <EstadoTag tipo="simulado" />
      </div>

      <div className="momo-grid-dots relative h-[560px] bg-neutral-100">
        {/* Trazas de referencia urbana */}
        {/* Trazado esquematico en coordenadas 0-100 escaladas al contenedor */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.18]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,55 L100,42" stroke="#151515" strokeWidth="1.6" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M38,0 L46,100" stroke="#151515" strokeWidth="1.3" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M0,78 L100,72" stroke="#151515" strokeWidth="0.9" fill="none" vectorEffect="non-scaling-stroke" />
          <circle cx="50" cy="50" r="21" stroke="#151515" strokeWidth="0.9" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute left-[8%] top-[30%] rounded bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-momo-muted">
          Urubó
        </span>
        <span className="absolute left-[50%] top-[52%] rounded bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-momo-muted">
          Equipetrol
        </span>
        <span className="absolute left-[70%] top-[62%] rounded bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-momo-muted">
          Norte
        </span>

        {propiedades.map((p) => (
          <button
            key={p.id}
            onClick={() => setSel(p.id === sel ? null : p.id)}
            style={{ left: `${p.lng}%`, top: `${p.lat}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold shadow-card ring-1 transition-all hover:z-20 hover:scale-110 ${
              sel === p.id
                ? 'z-20 bg-momo-navy text-white ring-momo-navy'
                : 'bg-white text-momo-navy ring-neutral-300 hover:bg-momo-blue-soft'
            }`}
          >
            {p.operacion === 'Alquilar' ? `$${p.precio}` : `$${Math.round(p.precio / 1000)}k`}
          </button>
        ))}

        {activa && (
          <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-pop ring-1 ring-momo-line">
            <div className="flex gap-3 p-3">
              <img src={activa.fotos[0]} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-extrabold leading-none">
                  {fmtUSD(activa.precio)}{activa.operacion === 'Alquilar' && <span className="text-xs text-momo-muted">/mes</span>}
                </p>
                <p className="mt-1 line-clamp-1 text-sm font-semibold">{activa.nombre}</p>
                <p className="text-xs text-momo-muted">{activa.zona} · {activa.superficie} m² · {activa.dorm} dorm</p>
                <Link to={`/propiedad/${activa.id}`} className="mt-1.5 inline-block text-xs font-bold text-momo-black hover:underline">
                  Ver ficha completa →
                </Link>
              </div>
              <button onClick={() => setSel(null)} className="h-6 w-6 shrink-0 rounded-full text-neutral-400 hover:bg-neutral-100">
                <X className="mx-auto h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white px-4 py-3">
        <NotaDemo className="mt-0">
          Representación visual de demostración. La versión de producción usará un mapa real con geolocalización de cada propiedad.
        </NotaDemo>
      </div>
    </div>
  )
}
