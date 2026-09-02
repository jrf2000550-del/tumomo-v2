import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { MapPin, BedDouble, Bath, Car, Maximize, ShieldCheck, Sparkles } from 'lucide-react'
import { fmtUSD, getAgente } from '../data/demo'

// --- Marca -----------------------------------------------------------------

/**
 * Isotipo: pin de ubicacion amarillo con una casa negra calada.
 * Amarillo + negro es el par secundario de la marca; sin contenedor, para que
 * se lea igual a 16px (favicon) que a 40px.
 */
export function Isotipo({ size = 34, className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32" width={size} height={size} fill="none"
      className={`shrink-0 ${className}`} aria-hidden
    >
      {/* Gota de ubicacion */}
      <path
        d="M16 31.2C16 31.2 27.4 21.6 27.4 13.4C27.4 7.1 22.3 2 16 2C9.7 2 4.6 7.1 4.6 13.4C4.6 21.6 16 31.2 16 31.2Z"
        fill="currentColor"
      />
      {/* Casa calada, en negro sobre el amarillo */}
      <path
        d="M16 7.4L23.1 13.3V13.35H21.1V19.9C21.1 20.35 20.73 20.72 20.28 20.72H17.6V15.9H14.4V20.72H11.72C11.27 20.72 10.9 20.35 10.9 19.9V13.35H8.9V13.3L16 7.4Z"
        fill="#111"
      />
    </svg>
  )
}

export function Logo({ className = '', variant = 'dark' }) {
  const claro = variant === 'light'
  return (
    <Link to="/" className={`group flex shrink-0 items-center gap-2 ${className}`}>
      <Isotipo
        size={30}
        className="text-momo-yellow transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className={`whitespace-nowrap font-display text-[21px] font-extrabold tracking-[-0.03em] lg:text-[23px] ${
        claro ? 'text-white' : 'text-momo-black'
      }`}>
        tumomo
      </span>
    </Link>
  )
}

// --- Etiquetas de honestidad (regla 37 del brief) ---------------------------

export function Badge({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'bg-momo-surface text-momo-muted',
    yellow: 'bg-momo-yellow text-momo-black',
    black: 'bg-momo-black text-white',
    red: 'bg-momo-red text-white',
    green: 'bg-momo-green-soft text-momo-green ring-1 ring-momo-green/25',
    outline: 'bg-white text-momo-muted ring-1 ring-momo-line',
    // Alias heredados
    amber: 'bg-momo-yellow text-momo-black',
    blue: 'bg-momo-black text-white',
    navy: 'bg-momo-black text-white',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** Marca visualmente qué es real, qué es simulado y qué es roadmap. */
export function EstadoTag({ tipo }) {
  const map = {
    funcional: { txt: 'Funcional', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    simulado: { txt: 'Simulado', cls: 'bg-amber-50 text-amber-700 ring-amber-200' },
    futuro: { txt: 'Futuro', cls: 'bg-violet-50 text-violet-700 ring-violet-200' },
  }
  const s = map[tipo] || map.simulado
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${s.cls}`}>
      {s.txt}
    </span>
  )
}

export function NotaDemo({ children = 'Datos de demostración / estimación.', className = '' }) {
  return (
    <p className={`mt-2 text-[11px] leading-relaxed text-momo-muted ${className}`}>
      <span className="mr-1 font-semibold text-amber-600">◆</span>
      {children}
    </p>
  )
}

// --- Cabeceras de sección ---------------------------------------------------

export function SectionHead({ kicker, title, action, sub }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {kicker && (
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-momo-black">{kicker}</p>
        )}
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>
        {sub && <p className="mt-2 max-w-2xl text-neutral-600">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Btn({ as: As = 'button', variant = 'primary', size = 'md', display = 'inline-flex', className = '', ...rest }) {
  // Amarillo con texto negro = accion principal. Negro = accion secundaria.
  const variants = {
    primary: 'bg-momo-yellow text-momo-black hover:bg-momo-yellow-dark',
    black: 'bg-momo-black text-white hover:bg-momo-black-soft',
    outline: 'bg-white text-momo-black ring-1 ring-momo-line hover:bg-momo-surface',
    ghost: 'text-momo-black hover:bg-momo-surface',
    red: 'bg-momo-red text-white hover:brightness-95',
    // Alias heredados
    navy: 'bg-momo-black text-white hover:bg-momo-black-soft',
    amber: 'bg-momo-yellow text-momo-black hover:bg-momo-yellow-dark',
    yellow: 'bg-momo-yellow text-momo-black hover:bg-momo-yellow-dark',
  }
  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  }
  // `display` es una prop propia: pasarlo por className chocaba con la clase
  // base inline-flex y dejaba botones ocultos renderizados como cajas vacias.
  return (
    <As
      className={`${display} items-center justify-center gap-2 rounded-full font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  )
}

// --- Revelado al hacer scroll ----------------------------------------------

export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)

    // Respaldo: si el observador no dispara (elemento fuera de vista al montar,
    // grilla que se reordena tras filtrar), el contenido se muestra igual.
    // Sin esto, tarjetas de resultados reales quedaban invisibles.
    const respaldo = setTimeout(() => { setVis(true); io.disconnect() }, 1200 + delay)

    return () => { io.disconnect(); clearTimeout(respaldo) }
  }, [delay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(18px)',
        transition: `opacity .6s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// --- Contador animado -------------------------------------------------------

export function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 1400 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(to * eased)
        if (p < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString('es-BO', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

// --- Tarjeta de propiedad ---------------------------------------------------

export function PropCard({ p, compact = false, onCompare, comparing }) {
  const ag = getAgente(p.agente)
  const esAlquiler = p.operacion === 'Alquilar'

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line transition-all duration-300 hover:-translate-y-1 hover:shadow-lift hover:ring-neutral-300">
      <Link to={`/propiedad/${p.id}`} className="relative block overflow-hidden">
        <div className={`${compact ? 'aspect-[4/3]' : 'aspect-[4/3]'} overflow-hidden bg-neutral-100`}>
          <img
            src={p.fotos[0]}
            alt={p.nombre}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge tone="black">{esAlquiler ? 'Alquiler' : 'Venta'}</Badge>
          {p.objetivo.includes('Invertir') && <Badge tone="yellow">Inversión</Badge>}
        </div>
        {ag?.verificadoEmpresa && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-emerald-700 backdrop-blur-sm">
              <ShieldCheck className="h-3 w-3" /> Verificado
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-xl font-extrabold tracking-tight">
            {fmtUSD(p.precio)}{esAlquiler && <span className="text-sm font-bold text-momo-muted">/mes</span>}
          </p>
          {!esAlquiler && p.tipo !== 'Terreno' && (
            <p className="text-[11px] font-semibold text-momo-muted">{fmtUSD(p.precioM2)}/m²</p>
          )}
        </div>

        <Link to={`/propiedad/${p.id}`}>
          <h3 className="mt-1.5 line-clamp-2 font-display text-base font-bold leading-tight hover:text-momo-blue">
            {p.nombre}
          </h3>
        </Link>

        <p className="mt-1.5 flex items-center gap-1 text-xs text-momo-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" /> {p.zona}, {p.ciudad}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-neutral-600">
          {p.dorm > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1">
              <BedDouble className="h-3 w-3" /> {p.dorm} dorm
            </span>
          )}
          {p.banos > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1">
              <Bath className="h-3 w-3" /> {p.banos}
            </span>
          )}
          {p.parqueos > 0 && (
            <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1">
              <Car className="h-3 w-3" /> {p.parqueos}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-md bg-neutral-100 px-2 py-1">
            <Maximize className="h-3 w-3" /> {p.superficie} m²
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.formas.filter((f) => f !== 'Contado').slice(0, 2).map((f) => (
            <Badge key={f} tone="outline">{f}</Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            {ag && (
              <>
                <img src={ag.foto} alt="" className="h-6 w-6 shrink-0 rounded-full object-cover" />
                <span className="truncate text-[11px] text-momo-muted">{ag.nombre}</span>
              </>
            )}
          </div>
          {onCompare && (
            <button
              onClick={(e) => { e.preventDefault(); onCompare(p.id) }}
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 transition-colors ${
                comparing
                  ? 'bg-momo-navy text-white ring-momo-navy'
                  : 'bg-white text-neutral-600 ring-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {comparing ? '✓ Comparando' : 'Comparar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Panel de IA (usado en Pro y en la ficha) -------------------------------

export function AIPanel({ title = 'TuMomo AI', children, actions }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-momo-navy text-white ring-1 ring-neutral-800">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-momo-amber">
          <Sparkles className="h-3.5 w-3.5 text-momo-navy" />
        </span>
        <span className="font-display text-sm font-bold">{title}</span>
        <span className="ml-auto"><EstadoTag tipo="simulado" /></span>
      </div>
      <div className="p-4">
        {children}
        {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  )
}

export function Stat({ label, value, sub, tone = 'light' }) {
  const dark = tone === 'dark'
  return (
    <div className={dark ? '' : 'rounded-xl bg-white p-4 ring-1 ring-momo-line'}>
      <p className={`font-display text-2xl font-extrabold tracking-tight ${dark ? 'text-momo-amber' : ''}`}>
        {value}
      </p>
      <p className={`mt-0.5 text-xs ${dark ? 'text-neutral-400' : 'text-momo-muted'}`}>{label}</p>
      {sub && <p className="mt-1 text-[11px] text-neutral-400">{sub}</p>}
    </div>
  )
}
