import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Star, ShieldCheck, Users, ArrowRight, MapPin } from 'lucide-react'
import { Btn, Badge, SectionHead, Reveal, NotaDemo } from '../components/ui'
import { PROFESIONALES, AGENTES, INMOBILIARIAS, CATEGORIAS_PRO, BANCOS, getInmobiliaria } from '../data/demo'

export default function Profesionales() {
  const [sp, setSp] = useSearchParams()
  const cat = sp.get('cat') || 'Todos'

  const setCat = (c) => (c === 'Todos' ? setSp({}) : setSp({ cat: c }))

  const items = useMemo(() => {
    if (cat === 'Agentes') return AGENTES.map(agenteToPro)
    if (cat === 'Inmobiliarias') return INMOBILIARIAS.map(inmoToPro)
    if (cat === 'Bancos') return BANCOS.map(bancoToPro)
    if (cat === 'Todos') return [...AGENTES.slice(0, 4).map(agenteToPro), ...PROFESIONALES]
    return PROFESIONALES.filter((p) => p.categoria === cat)
  }, [cat])

  return (
    <>
      <section className="momo-stripes border-b border-momo-line">
        <div className="mx-auto max-w-[1280px] px-5 py-14 md:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-momo-navy px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              <Users className="h-3.5 w-3.5" /> Ecosistema
            </span>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
              Todos los profesionales del Real Estate, en un solo lugar.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              Agentes, inmobiliarias, arquitectos, constructoras, abogados, valuadores y más.
              Con verificación, portafolio y reseñas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
        {/* Filtro de categorías */}
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto pb-2">
          {['Todos', ...CATEGORIAS_PRO].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold ring-1 transition-colors ${
                cat === c
                  ? 'bg-momo-navy text-white ring-momo-navy'
                  : 'bg-white text-neutral-700 ring-momo-line hover:bg-neutral-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <SectionHead
            title={cat === 'Todos' ? 'Profesionales destacados' : cat}
            sub={`${items.length} ${items.length === 1 ? 'perfil' : 'perfiles'} en el ecosistema`}
          />

          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-14 text-center">
              <p className="font-display text-lg font-bold">Todavía no hay perfiles en esta categoría</p>
              <p className="mt-2 text-sm text-neutral-600">
                En producción, los profesionales se registran y verifican su identidad y empresa.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i, 9) * 50}><Card p={p} /></Reveal>
              ))}
            </div>
          )}

          <NotaDemo>
            Perfiles, reseñas y verificaciones son datos de demostración. El sistema real de verificación
            forma parte del roadmap.
          </NotaDemo>
        </div>
      </section>
    </>
  )
}

// Normalizadores para mostrar todo con la misma tarjeta
const agenteToPro = (a) => ({
  id: a.id, nombre: a.nombre, categoria: 'Agentes', verificado: a.verificadoEmpresa,
  rating: a.rating, resenas: a.resenas, anios: a.anios, avatar: a.foto,
  servicios: [a.especialidad], desde: getInmobiliaria(a.inmobiliaria)?.nombre || '',
  bio: a.bio, zonas: a.zonas, link: `/agente/${a.id}`,
})

const inmoToPro = (i) => ({
  id: i.id, nombre: i.nombre, categoria: 'Inmobiliarias', verificado: i.verificada,
  rating: i.rating, resenas: i.resenas, anios: i.anios, emoji: i.logo,
  servicios: i.zonas.slice(0, 2), desde: `${i.zonas.length} zonas`,
  bio: i.descripcion, link: `/inmobiliaria/${i.id}`,
})

const bancoToPro = (b) => ({
  id: b.id, nombre: b.nombre, categoria: 'Bancos', verificado: true,
  rating: 4.5, resenas: 0, anios: 0, emoji: b.logo,
  servicios: [`Tasa ${b.tasa}%`, `Hasta ${b.plazoMax} años`], desde: b.cuotaRef,
  bio: `Financia hasta el ${b.financiaHasta}% del valor de la propiedad.`, link: '/financiar#bancos',
})

function Card({ p }) {
  const Wrapper = p.link ? Link : 'div'
  return (
    <Wrapper
      {...(p.link ? { to: p.link } : {})}
      className="flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card hover:ring-neutral-300"
    >
      <div className="flex items-start gap-3">
        {p.avatar ? (
          <img src={p.avatar} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
        ) : (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-neutral-100 text-2xl">{p.emoji}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-display font-bold">{p.nombre}</p>
            {p.verificado && <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />}
          </div>
          <p className="text-xs text-momo-muted">{p.categoria}</p>
          <div className="mt-1 flex items-center gap-2 text-xs">
            {p.resenas > 0 && (
              <>
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="h-3 w-3 fill-momo-amber text-momo-amber" /> {p.rating}
                </span>
                <span className="text-neutral-400">({p.resenas})</span>
              </>
            )}
            {p.anios > 0 && <span className="text-momo-muted">· {p.anios} años</span>}
          </div>
        </div>
      </div>

      {p.bio && <p className="mt-3 line-clamp-2 flex-1 text-sm text-neutral-600">{p.bio}</p>}

      {p.zonas && (
        <p className="mt-2 flex items-center gap-1 text-xs text-momo-muted">
          <MapPin className="h-3 w-3" /> {p.zonas.join(' · ')}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.servicios?.slice(0, 3).map((s) => <Badge key={s} tone="neutral">{s}</Badge>)}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
        <span className="text-xs font-semibold text-neutral-600">{p.desde}</span>
        <span className="inline-flex items-center gap-1 text-xs font-bold text-momo-blue">
          Ver perfil <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Wrapper>
  )
}
