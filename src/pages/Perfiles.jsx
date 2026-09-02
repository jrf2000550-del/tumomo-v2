import { Link, useParams } from 'react-router-dom'
import {
  Star, ShieldCheck, MapPin, Phone, MessageCircle, Award, Building2, Users, ArrowLeft,
} from 'lucide-react'
import { Btn, Badge, PropCard, SectionHead, Reveal, NotaDemo, EstadoTag } from '../components/ui'
import {
  AGENTES, INMOBILIARIAS, PROPIEDADES, PROYECTOS, getInmobiliaria, getAgente,
} from '../data/demo'

const RESENAS = [
  { autor: 'Cliente verificado', txt: 'Muy claro con los tiempos y con la documentación. Cerramos sin sobresaltos.', estrellas: 5 },
  { autor: 'Cliente verificado', txt: 'Nos mostró opciones que no habíamos considerado y acertó con la zona.', estrellas: 5 },
  { autor: 'Cliente verificado', txt: 'Buen acompañamiento en el trámite del crédito. Respondió siempre rápido.', estrellas: 4 },
]

export function PerfilAgente() {
  const { id } = useParams()
  const a = getAgente(id)

  if (!a) return <NoEncontrado />

  const inmo = getInmobiliaria(a.inmobiliaria)
  const props = PROPIEDADES.filter((p) => p.agente === a.id)

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
      <Link to="/profesionales" className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-momo-navy">
        <ArrowLeft className="h-4 w-4" /> Profesionales
      </Link>

      {/* Cabecera */}
      <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
        <div className="momo-stripes h-28" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end gap-5">
            <img src={a.foto} alt={a.nombre} className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-black tracking-tight">{a.nombre}</h1>
                {a.verificadoIdentidad && (
                  <Badge tone="green"><ShieldCheck className="h-3 w-3" /> Identidad verificada</Badge>
                )}
                {a.verificadoEmpresa && (
                  <Badge tone="green"><ShieldCheck className="h-3 w-3" /> Empresa verificada</Badge>
                )}
              </div>
              <p className="mt-1 text-neutral-600">Agente inmobiliario</p>
              {inmo && (
                <Link to={`/inmobiliaria/${inmo.id}`} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-momo-black hover:underline">
                  <Building2 className="h-3.5 w-3.5" /> {inmo.nombre}
                </Link>
              )}
            </div>
            <div className="flex gap-2">
              <Btn><MessageCircle className="h-4 w-4" /> Solicitar asesoría</Btn>
              <Btn variant="outline"><Phone className="h-4 w-4" /> {a.telefono}</Btn>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              [a.rating, 'Calificación', <Star key="s" className="h-3.5 w-3.5 fill-momo-amber text-momo-amber" />],
              [a.resenas, 'Reseñas'],
              [a.anios, 'Años de experiencia'],
              [props.length, 'Propiedades activas'],
            ].map(([v, l, icon]) => (
              <div key={l} className="rounded-xl bg-neutral-50 p-4">
                <p className="flex items-center gap-1.5 font-display text-2xl font-extrabold">{icon}{v}</p>
                <p className="mt-0.5 text-xs text-momo-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_.8fr]">
        <div>
          <SectionHead title={`Propiedades de ${a.nombre.split(' ')[0]}`} kicker="Portafolio" />
          {props.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {props.map((p, i) => <Reveal key={p.id} delay={i * 60}><PropCard p={p} /></Reveal>)}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-neutral-300 p-10 text-center text-sm text-momo-muted">
              Sin propiedades publicadas en este momento.
            </p>
          )}

          <div className="mt-10">
            <SectionHead title="Reseñas" kicker="Opiniones" />
            <div className="space-y-3">
              {RESENAS.map((r, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="rounded-xl bg-white p-5 ring-1 ring-momo-line">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`h-3.5 w-3.5 ${k < r.estrellas ? 'fill-momo-amber text-momo-amber' : 'text-neutral-300'}`} />
                      ))}
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-700">"{r.txt}"</p>
                    <p className="mt-2 text-xs text-momo-muted">{r.autor}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <NotaDemo>Reseñas de demostración.</NotaDemo>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl bg-white p-5 ring-1 ring-momo-line">
            <p className="font-display font-bold">Sobre {a.nombre.split(' ')[0]}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{a.bio}</p>
          </div>

          <div className="rounded-2xl bg-white p-5 ring-1 ring-momo-line">
            <p className="font-display font-bold">Especialidad</p>
            <div className="mt-3 space-y-2.5 text-sm">
              <p className="flex items-start gap-2">
                <Award className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" /> {a.especialidad}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" /> {a.zonas.join(' · ')}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-momo-navy p-5 text-white">
            <p className="font-display font-bold text-momo-amber">¿Buscás algo específico?</p>
            <p className="mt-2 text-sm text-neutral-300">
              Publicá tu requerimiento y este agente lo recibirá si tiene propiedades compatibles.
            </p>
            <Btn as={Link} to="/requerimientos" variant="yellow" size="sm" className="mt-4 w-full">
              Publicar requerimiento
            </Btn>
          </div>
        </aside>
      </div>
    </div>
  )
}

export function PerfilInmobiliaria() {
  const { id } = useParams()
  const inmo = INMOBILIARIAS.find((x) => x.id === id)

  if (!inmo) return <NoEncontrado />

  const agentes = AGENTES.filter((a) => a.inmobiliaria === inmo.id)
  const props = PROPIEDADES.filter((p) => agentes.some((a) => a.id === p.agente))
  const proyectos = PROYECTOS.filter((pr) => pr.desarrolladora === inmo.nombre)

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
      <Link to="/profesionales?cat=Inmobiliarias" className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-momo-navy">
        <ArrowLeft className="h-4 w-4" /> Inmobiliarias
      </Link>

      <div className="mt-5 overflow-hidden rounded-2xl bg-white ring-1 ring-momo-line">
        <div className="momo-stripes h-28" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end gap-5">
            <span className="grid h-24 w-24 place-items-center rounded-2xl bg-white text-4xl ring-4 ring-white shadow-card">
              {inmo.logo}
            </span>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl font-black tracking-tight">{inmo.nombre}</h1>
                {inmo.verificada && <Badge tone="green"><ShieldCheck className="h-3 w-3" /> Empresa verificada</Badge>}
              </div>
              <p className="mt-1 text-neutral-600">{inmo.descripcion}</p>
            </div>
            <Btn><MessageCircle className="h-4 w-4" /> Contactar</Btn>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
            {[
              [inmo.rating, 'Calificación'],
              [inmo.resenas, 'Reseñas'],
              [inmo.anios, 'Años'],
              [agentes.length, 'Agentes'],
              [props.length, 'Propiedades'],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-neutral-50 p-4">
                <p className="font-display text-2xl font-extrabold">{v}</p>
                <p className="mt-0.5 text-xs text-momo-muted">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {inmo.zonas.map((z) => <Badge key={z} tone="outline"><MapPin className="h-3 w-3" /> {z}</Badge>)}
          </div>
        </div>
      </div>

      {/* Equipo */}
      <div className="mt-10">
        <SectionHead kicker="Equipo" title="Agentes" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agentes.map((a, i) => (
            <Reveal key={a.id} delay={i * 60}>
              <Link to={`/agente/${a.id}`} className="flex gap-3 rounded-xl bg-white p-4 ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                <img src={a.foto} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-display font-bold">{a.nombre}</p>
                    {a.verificadoIdentidad && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-momo-muted">{a.especialidad}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 fill-momo-amber text-momo-amber" />
                    <span className="font-semibold">{a.rating}</span>
                    <span className="text-neutral-400">· {a.anios} años</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {proyectos.length > 0 && (
        <div className="mt-10">
          <SectionHead kicker="Desarrollo" title="Proyectos" />
          <div className="grid gap-5 md:grid-cols-3">
            {proyectos.map((pr) => (
              <Link key={pr.id} to="/proyectos" className="overflow-hidden rounded-2xl ring-1 ring-momo-line transition-all hover:-translate-y-1 hover:shadow-card">
                <img src={pr.foto} alt="" className="aspect-[16/10] w-full object-cover" />
                <div className="bg-white p-4">
                  <p className="font-display font-bold">{pr.nombre}</p>
                  <p className="text-xs text-momo-muted">{pr.zona} · Entrega {pr.entrega}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <SectionHead kicker="Portafolio" title="Propiedades publicadas" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {props.slice(0, 6).map((p, i) => <Reveal key={p.id} delay={i * 50}><PropCard p={p} /></Reveal>)}
        </div>
      </div>

      <NotaDemo>Perfil, equipo y métricas son datos de demostración.</NotaDemo>
    </div>
  )
}

function NoEncontrado() {
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-20 text-center md:px-8">
      <Users className="mx-auto h-10 w-10 text-neutral-300" />
      <p className="mt-4 font-display text-2xl font-bold">Perfil no encontrado</p>
      <Btn as={Link} to="/profesionales" className="mt-5">Ver profesionales</Btn>
    </div>
  )
}
