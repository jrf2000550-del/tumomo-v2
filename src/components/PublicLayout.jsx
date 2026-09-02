import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, TrendingUp, ArrowUpRight } from 'lucide-react'
import { Logo, Btn, Isotipo } from './ui'
import { INSIGHTS } from '../data/demo'

const NAV = [
  { to: '/buscar?operacion=Comprar', label: 'Comprar' },
  { to: '/buscar?operacion=Alquilar', label: 'Alquilar' },
  { to: '/invertir', label: 'Invertir' },
  { to: '/financiar', label: 'Financiar' },
  { to: '/construir', label: 'Construir' },
  { to: '/profesionales', label: 'Profesionales' },
  { to: '/proyectos', label: 'Proyectos' },
  { to: '/datos', label: 'Datos' },
]

export function Ticker() {
  const items = [...INSIGHTS, ...INSIGHTS]
  return (
    <div className="momo-ticker-host relative flex overflow-hidden border-b border-neutral-800 bg-momo-navy text-white">
      <div className="z-10 flex shrink-0 items-center gap-1.5 bg-momo-yellow px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-momo-black">
        <TrendingUp className="h-3.5 w-3.5" /> Insights
      </div>
      <div className="flex overflow-hidden py-2">
        <div className="momo-ticker flex w-max shrink-0 items-center gap-8 whitespace-nowrap pl-8 text-xs text-neutral-300">
          {items.map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-momo-yellow" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PublicLayout() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [loc.pathname, loc.search])

  return (
    <div className="min-h-screen bg-white">
      <Ticker />

      <header className={`sticky top-0 z-50 border-b transition-all ${
        scrolled ? 'border-momo-line bg-white/90 backdrop-blur-md' : 'border-transparent bg-white'
      }`}>
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 md:px-8">
          <Logo />

          <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.label}
                to={n.to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm ${
                    isActive ? 'bg-neutral-100 text-momo-navy' : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <Link
              to="/pro"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-momo-black px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-momo-black-soft sm:flex"
            >
              Soy profesional <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-neutral-300 lg:hidden"
              aria-label="Menú"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-momo-line bg-white px-5 py-3 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((n) => (
                <Link key={n.label} to={n.to} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                  {n.label}
                </Link>
              ))}
              <Link to="/requerimientos" className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-neutral-100">
                Requerimientos
              </Link>
              <Link to="/pro" className="rounded-lg px-3 py-2.5 text-sm font-semibold text-momo-blue hover:bg-neutral-100">
                Soy profesional →
              </Link>
            </div>
          </div>
        )}
      </header>

      <main><Outlet /></main>

      <Footer />
    </div>
  )
}

function Footer() {
  const cols = [
    { t: 'Buscar', links: [['Comprar', '/buscar?operacion=Comprar'], ['Alquilar', '/buscar?operacion=Alquilar'], ['Proyectos', '/proyectos'], ['Invertir', '/invertir']] },
    { t: 'Servicios', links: [['Financiar', '/financiar'], ['Construir', '/construir'], ['Profesionales', '/profesionales'], ['Comparador', '/comparar']] },
    { t: 'Plataforma', links: [['TuMomo Data', '/datos'], ['TuMomo Global', '/global'], ['Requerimientos', '/requerimientos'], ['TuMomo Pro', '/pro']] },
  ]

  return (
    <footer className="border-t border-momo-line bg-momo-navy text-white">
      <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Isotipo size={30} className="text-white" />
              <span className="font-display text-[23px] font-extrabold tracking-[-0.03em] text-white">tumomo</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              Del portal al ecosistema. Compra, vende, alquila, invierte, financia y construye
              conectado con profesionales verificados.
            </p>
            <p className="mt-5 inline-block rounded-lg bg-white/5 px-3 py-2 text-[11px] leading-relaxed text-neutral-400 ring-1 ring-white/10">
              Demo ejecutiva V2. Contenido, precios y métricas son datos de demostración.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.t}>
              <p className="font-display text-sm font-bold text-white">{c.t}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map(([l, to]) => (
                  <li key={l}>
                    <Link to={to} className="text-sm text-neutral-400 transition-colors hover:text-white">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-momo-muted">
          <p>© {new Date().getFullYear()} TU MOMO Real Estate · Santa Cruz de la Sierra, Bolivia</p>
          <p>Prototipo navegable — no es un entorno de producción.</p>
        </div>
      </div>
    </footer>
  )
}
