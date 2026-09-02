import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, MapPin, BedDouble, Bath, Car, Maximize, ShieldCheck, Star,
  MessageCircle, Calendar, Scale, Heart, Banknote, Landmark, Handshake,
  Building, TrendingUp, Check, X,
} from 'lucide-react'
import {
  PROPIEDADES, PRECIO_M2_ZONA, getAgente, getInmobiliaria, fmtUSD,
} from '../data/demo'
import { Badge, Btn, EstadoTag, NotaDemo, SectionHead, PropCard, Reveal } from '../components/ui'
import { useStore } from '../lib/store'
import Calculadora from '../components/Calculadora'

export default function Propiedad() {
  const { id } = useParams()
  const nav = useNavigate()
  const p = PROPIEDADES.find((x) => x.id === id)
  const { toggleCompare, compareIds, favoritos, toggleFav, crearLead, agendarVisita } = useStore()

  const [foto, setFoto] = useState(0)
  const [modal, setModal] = useState(null)   // 'contacto' | 'visita' | null
  const [hecho, setHecho] = useState(null)

  if (!p) {
    return (
      <div className="mx-auto max-w-[1280px] px-5 py-20 text-center md:px-8">
        <p className="font-display text-2xl font-bold">Propiedad no encontrada</p>
        <Btn as={Link} to="/buscar" className="mt-5">Volver a buscar</Btn>
      </div>
    )
  }

  const ag = getAgente(p.agente)
  const inmo = getInmobiliaria(ag?.inmobiliaria)
  const esAlquiler = p.operacion === 'Alquilar'
  const promZona = PRECIO_M2_ZONA[p.zona]
  const rentabilidad = p.alquilerEstimado ? ((p.alquilerEstimado * 12) / p.precio) * 100 : null

  // Comparables: mismas caracteristicas en la misma zona
  const comparables = useMemo(() =>
    PROPIEDADES.filter(
      (x) => x.id !== p.id && x.zona === p.zona && x.tipo === p.tipo && x.operacion === p.operacion
    ).slice(0, 4)
  , [p])

  const promComparables = comparables.length
    ? Math.round(comparables.reduce((s, x) => s + x.precio, 0) / comparables.length)
    : null

  const similares = PROPIEDADES.filter(
    (x) => x.id !== p.id && x.tipo === p.tipo && x.operacion === p.operacion
  ).slice(0, 3)

  const competitivo = promComparables ? p.precio <= promComparables : null
  const difM2 = promZona ? ((p.precioM2 - promZona) / promZona) * 100 : null

  const enviarContacto = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    crearLead({
      nombre: fd.get('nombre') || 'Interesado sin nombre',
      telefono: fd.get('telefono') || '+591 700 00 000',
      operacion: esAlquiler ? 'Alquiler' : 'Compra',
      presupuesto: p.precio,
      zona: p.zona,
      formaPago: fd.get('forma') || 'Crédito bancario',
      dorm: p.dorm,
      agente: p.agente,
      vistas: [p.id],
      favoritos: [p.id],
      notas: fd.get('mensaje') || `Consulta por ${p.nombre}.`,
    })
    setModal(null)
    setHecho('contacto')
  }

  const enviarVisita = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    agendarVisita({
      dia: Number(fd.get('dia')),
      hora: fd.get('hora'),
      titulo: `Visita ${p.nombre}`,
      lead: fd.get('nombre') || 'Interesado',
    })
    crearLead({
      nombre: fd.get('nombre') || 'Interesado',
      telefono: fd.get('telefono') || '+591 700 00 000',
      operacion: esAlquiler ? 'Alquiler' : 'Compra',
      presupuesto: p.precio, zona: p.zona, formaPago: 'Crédito bancario',
      dorm: p.dorm, agente: p.agente, etapa: 'Visita',
      vistas: [p.id], favoritos: [p.id],
      notas: `Visita agendada para ${p.nombre}.`,
    })
    setModal(null)
    setHecho('visita')
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8">
      <button onClick={() => nav(-1)} className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-momo-navy">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      {hecho && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-200">
          <Check className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="flex-1 text-sm text-emerald-900">
            {hecho === 'visita'
              ? 'Visita agendada. El lead y el evento ya aparecen en TuMomo Pro.'
              : 'Consulta enviada. El lead ya ingresó al CRM de TuMomo Pro.'}
          </p>
          <Btn as={Link} to="/pro/crm" variant="black" size="sm">Ver en TuMomo Pro →</Btn>
        </div>
      )}

      <div className="mt-4 grid gap-8 lg:grid-cols-[1.5fr_.8fr]">
        {/* ---------------- COLUMNA PRINCIPAL ---------------- */}
        <div>
          {/* Galería */}
          <div className="overflow-hidden rounded-2xl bg-neutral-100">
            <img src={p.fotos[foto]} alt={p.nombre} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-3">
            {p.fotos.map((f, i) => (
              <button
                key={i}
                onClick={() => setFoto(i)}
                className={`overflow-hidden rounded-lg ring-2 transition-all ${
                  foto === i ? 'ring-momo-blue' : 'ring-transparent hover:ring-neutral-300'
                }`}
              >
                <img src={f} alt="" className="h-20 w-28 object-cover" />
              </button>
            ))}
          </div>

          {/* Encabezado */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge tone="black">{esAlquiler ? 'Alquiler' : 'Venta'}</Badge>
            <Badge tone="yellow">{p.tipo}</Badge>
            {p.etiquetas.map((e) => <Badge key={e} tone="black">{e}</Badge>)}
            {ag?.verificadoEmpresa && <Badge tone="green"><ShieldCheck className="h-3 w-3" /> Profesional verificado</Badge>}
          </div>

          <h1 className="mt-4 font-display text-3xl font-black leading-tight tracking-tight md:text-4xl">
            {p.nombre}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-neutral-600">
            <MapPin className="h-4 w-4" /> {p.zona}, {p.ciudad}
          </p>

          <div className="mt-5 flex flex-wrap items-baseline gap-4">
            <p className="font-display text-4xl font-black tracking-tight">
              {fmtUSD(p.precio)}{esAlquiler && <span className="text-lg font-bold text-momo-muted">/mes</span>}
            </p>
            {!esAlquiler && (
              <p className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm font-semibold">
                {fmtUSD(p.precioM2)} / m²
              </p>
            )}
          </div>

          {/* Ficha técnica */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              [Maximize, `${p.superficie} m²`, 'Superficie'],
              p.dorm > 0 && [BedDouble, p.dorm, 'Dormitorios'],
              p.banos > 0 && [Bath, p.banos, 'Baños'],
              p.parqueos > 0 && [Car, p.parqueos, 'Parqueos'],
            ].filter(Boolean).map(([Icon, v, l]) => (
              <div key={l} className="rounded-xl bg-white p-4 ring-1 ring-momo-line">
                <Icon className="h-4 w-4 text-neutral-400" />
                <p className="mt-2 font-display text-xl font-extrabold">{v}</p>
                <p className="text-xs text-momo-muted">{l}</p>
              </div>
            ))}
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h2 className="font-display text-xl font-bold">Descripción</h2>
            <p className="mt-3 leading-relaxed text-neutral-700">{p.descripcion}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.amenities.map((a) => (
                <span key={a} className="rounded-lg bg-neutral-100 px-3 py-1.5 text-sm">{a}</span>
              ))}
            </div>
          </div>

          {/* ---------- ANÁLISIS DE INVERSIÓN ---------- */}
          {!esAlquiler && rentabilidad && (
            <div className="mt-10 rounded-2xl bg-momo-blue-soft p-6 ring-1 ring-momo-amber">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-bold">Análisis de inversión</h2>
                <EstadoTag tipo="simulado" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Precio / m²', fmtUSD(p.precioM2), 'Publicado'],
                  ['Alquiler estimado', fmtUSD(p.alquilerEstimado) + '/mes', 'Según zona y tipo'],
                  ['Rentabilidad bruta', rentabilidad.toFixed(1) + '%', 'Anual estimada'],
                ].map(([l, v, s]) => (
                  <div key={l} className="rounded-xl bg-white p-4">
                    <p className="text-xs text-momo-muted">{l}</p>
                    <p className="mt-1 font-display text-2xl font-extrabold tracking-tight">{v}</p>
                    <p className="text-[11px] text-neutral-400">{s}</p>
                  </div>
                ))}
              </div>
              <NotaDemo>
                Datos de demostración / estimación. El alquiler y la rentabilidad son cálculos referenciales,
                no una proyección garantizada.
              </NotaDemo>
            </div>
          )}

          {/* ---------- COMPARABLES ---------- */}
          {promComparables && (
            <div className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-momo-line">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-xl font-bold">¿Cómo se compara esta propiedad?</h2>
                <EstadoTag tipo="simulado" />
              </div>

              <div className="mt-5 space-y-4">
                <Barra
                  label="Precio publicado" valor={p.precio} max={Math.max(p.precio, promComparables)}
                  texto={fmtUSD(p.precio)} tone="black"
                />
                <Barra
                  label={`Promedio de ${p.tipo.toLowerCase()}s similares en ${p.zona}`}
                  valor={promComparables} max={Math.max(p.precio, promComparables)}
                  texto={fmtUSD(promComparables)} tone="neutral"
                />
                <Barra
                  label="Precio / m² de esta propiedad" valor={p.precioM2} max={Math.max(p.precioM2, promZona)}
                  texto={fmtUSD(p.precioM2)} tone="yellow"
                />
                <Barra
                  label={`Promedio / m² en ${p.zona}`} valor={promZona} max={Math.max(p.precioM2, promZona)}
                  texto={fmtUSD(promZona)} tone="neutral"
                />
              </div>

              <div className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-3 ${
                competitivo ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
              }`}>
                <TrendingUp className="h-5 w-5" />
                <div>
                  <p className="font-display font-bold">
                    {competitivo ? 'Precio competitivo' : 'Precio por encima del promedio'}
                  </p>
                  <p className="text-xs">
                    {difM2 != null && (
                      <>Está {Math.abs(difM2).toFixed(1)}% {difM2 < 0 ? 'por debajo' : 'por encima'} del precio/m² promedio de la zona.</>
                    )}
                  </p>
                </div>
              </div>

              {comparables.length > 0 && (
                <div className="mt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-momo-muted">
                    Propiedades comparables
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] text-sm">
                      <thead>
                        <tr className="border-b border-momo-line text-left text-xs text-momo-muted">
                          <th className="pb-2 font-semibold">Propiedad</th>
                          <th className="pb-2 font-semibold">Precio</th>
                          <th className="pb-2 font-semibold">m²</th>
                          <th className="pb-2 font-semibold">$/m²</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparables.map((c) => (
                          <tr key={c.id} className="border-b border-neutral-100">
                            <td className="py-2.5">
                              <Link to={`/propiedad/${c.id}`} className="font-medium hover:text-momo-blue">{c.nombre}</Link>
                            </td>
                            <td className="py-2.5">{fmtUSD(c.precio)}</td>
                            <td className="py-2.5">{c.superficie}</td>
                            <td className="py-2.5">{fmtUSD(c.precioM2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              <NotaDemo>Comparables calculados sobre el dataset de demostración.</NotaDemo>
            </div>
          )}

          {/* ---------- FORMAS DE COMPRA ---------- */}
          {!esAlquiler && (
            <div className="mt-8">
              <h2 className="font-display text-2xl font-extrabold tracking-tight">¿Cómo quieres comprar?</h2>
              <p className="mt-1 text-sm text-neutral-600">Cada opción abre una experiencia distinta.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Banknote, t: 'Contado', d: 'Pago directo al vendedor', to: '/financiar#contado', on: p.formas.includes('Contado') },
                  { icon: Landmark, t: 'Crédito bancario', d: 'Marketplace de entidades', to: '/financiar#bancos', on: p.formas.includes('Crédito bancario') },
                  { icon: Handshake, t: 'Crédito directo', d: 'Plan de pagos con el propietario', to: '/financiar#directo', on: p.formas.includes('Crédito directo') },
                  { icon: Building, t: 'Financiamiento del proyecto', d: 'Cuotas durante la obra', to: '/financiar#proyecto', on: p.formas.includes('Preventa') },
                ].map((o) => (
                  <Link
                    key={o.t}
                    to={o.on ? o.to : '#'}
                    onClick={(e) => !o.on && e.preventDefault()}
                    className={`group flex h-full flex-col rounded-xl p-4 ring-1 transition-all ${
                      o.on
                        ? 'bg-white ring-momo-line hover:-translate-y-1 hover:shadow-card hover:ring-momo-amber'
                        : 'cursor-not-allowed bg-neutral-50 opacity-50 ring-momo-line'
                    }`}
                  >
                    <o.icon className="h-6 w-6" />
                    <p className="mt-3 font-display font-bold">{o.t}</p>
                    <p className="mt-1 text-xs text-neutral-600">{o.d}</p>
                    <p className="mt-2 text-[11px] font-semibold text-neutral-400">
                      {o.on ? 'Disponible' : 'No disponible en esta propiedad'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ---------- CALCULADORA ---------- */}
          {!esAlquiler && (
            <div className="mt-8">
              <Calculadora precioInicial={p.precio} />
            </div>
          )}

          {/* ---------- SIMILARES ---------- */}
          {similares.length > 0 && (
            <div className="mt-12">
              <SectionHead kicker="También te puede interesar" title="Propiedades similares" />
              <div className="grid gap-5 sm:grid-cols-3">
                {similares.map((s, i) => (
                  <Reveal key={s.id} delay={i * 60}><PropCard p={s} /></Reveal>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ---------------- SIDEBAR ---------------- */}
        <aside>
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Agente */}
            {ag && (
              <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-momo-line">
                <p className="text-xs font-bold uppercase tracking-wider text-momo-muted">Anunciante</p>
                <Link to={`/agente/${ag.id}`} className="mt-3 flex items-center gap-3 group">
                  <img src={ag.foto} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="font-display font-bold group-hover:text-momo-blue">{ag.nombre}</p>
                    <p className="truncate text-xs text-momo-muted">{inmo?.nombre} · Inmobiliaria</p>
                  </div>
                </Link>

                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 font-semibold">
                    <Star className="h-3.5 w-3.5 fill-momo-amber text-momo-amber" /> {ag.rating}
                  </span>
                  <span className="text-momo-muted">{ag.resenas} reseñas</span>
                  <span className="text-momo-muted">{ag.anios} años</span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  {ag.verificadoIdentidad && (
                    <p className="flex items-center gap-1.5 text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" /> Identidad verificada
                    </p>
                  )}
                  {ag.verificadoEmpresa && (
                    <p className="flex items-center gap-1.5 text-emerald-700">
                      <ShieldCheck className="h-3.5 w-3.5" /> Empresa verificada
                    </p>
                  )}
                  <p className="flex items-center gap-1.5 text-momo-muted">
                    <MapPin className="h-3.5 w-3.5" /> {ag.zonas.join(' · ')}
                  </p>
                </div>

                <Btn onClick={() => setModal('contacto')} className="mt-4 w-full">
                  <MessageCircle className="h-4 w-4" /> Hablar con un agente
                </Btn>
                <Btn onClick={() => setModal('visita')} variant="outline" className="mt-2 w-full">
                  <Calendar className="h-4 w-4" /> Agendar visita
                </Btn>

                <p className="mt-3 text-center text-[11px] leading-relaxed text-momo-muted">
                  Antes de conectar con el anunciante, registramos tu interés para mejorar la atención.
                </p>
              </div>
            )}

            {/* Acciones */}
            <div className="rounded-2xl bg-white p-4 ring-1 ring-momo-line">
              <button
                onClick={() => toggleCompare(p.id)}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold ring-1 transition-colors ${
                  compareIds.includes(p.id)
                    ? 'bg-momo-navy text-white ring-momo-navy'
                    : 'ring-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <Scale className="h-4 w-4" />
                {compareIds.includes(p.id) ? 'En el comparador' : 'Agregar al comparador'}
              </button>
              <button
                onClick={() => toggleFav(p.id)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold ring-1 ring-neutral-300 transition-colors hover:bg-neutral-50"
              >
                <Heart className={`h-4 w-4 ${favoritos.includes(p.id) ? 'fill-momo-blue text-momo-blue' : ''}`} />
                {favoritos.includes(p.id) ? 'Guardado' : 'Guardar'}
              </button>
              {compareIds.length > 1 && (
                <Btn as={Link} to="/comparar" variant="black" size="sm" className="mt-3 w-full">
                  Ver comparador ({compareIds.length})
                </Btn>
              )}
            </div>

            {/* Resumen rápido */}
            <div className="rounded-2xl bg-momo-navy p-5 text-white">
              <p className="font-display text-sm font-bold text-momo-amber">Resumen rápido</p>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ['Estado', p.estado],
                  ['Objetivo', p.objetivo.join(' / ')],
                  ['Formas de compra', p.formas.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-white/10 pb-2">
                    <dt className="shrink-0 text-neutral-400">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>

      {/* ---------------- MODALES ---------------- */}
      {modal && (
        <Modal onClose={() => setModal(null)} titulo={modal === 'visita' ? 'Agendar visita' : 'Hablar con un agente'}>
          {modal === 'contacto' ? (
            <form onSubmit={enviarContacto} className="space-y-3">
              <Campo name="nombre" label="Tu nombre" required />
              <Campo name="telefono" label="WhatsApp" placeholder="+591 7…" required />
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-600">Forma de compra</label>
                <select name="forma" className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber">
                  {p.formas.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-neutral-600">Mensaje</label>
                <textarea name="mensaje" rows={3} defaultValue={`Hola, me interesa ${p.nombre}.`}
                  className="w-full resize-none rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber" />
              </div>
              <Btn type="submit" className="w-full">Enviar consulta</Btn>
              <p className="text-center text-[11px] text-momo-muted">
                En la demo, esta consulta crea un lead real dentro de TuMomo Pro.
              </p>
            </form>
          ) : (
            <form onSubmit={enviarVisita} className="space-y-3">
              <Campo name="nombre" label="Tu nombre" required />
              <Campo name="telefono" label="WhatsApp" placeholder="+591 7…" required />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-600">Día</label>
                  <select name="dia" defaultValue="3" className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((d, i) => (
                      <option key={d} value={i + 1}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-neutral-600">Hora</label>
                  <select name="hora" defaultValue="10:00" className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber">
                    {['09:00', '10:00', '11:00', '15:00', '16:00', '17:00'].map((h) => <option key={h}>{h}</option>)}
                  </select>
                </div>
              </div>
              <Btn type="submit" className="w-full">Confirmar visita</Btn>
              <p className="text-center text-[11px] text-momo-muted">
                La visita aparecerá en el calendario del agente en TuMomo Pro.
              </p>
            </form>
          )}
        </Modal>
      )}
    </div>
  )
}

function Barra({ label, valor, max, texto, tone }) {
  const pct = max ? (valor / max) * 100 : 0
  const colores = { black: 'bg-momo-navy', yellow: 'bg-momo-amber', neutral: 'bg-neutral-300' }
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs text-neutral-600">{label}</p>
        <p className="shrink-0 font-display text-sm font-bold">{texto}</p>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div className={`h-full rounded-full transition-all duration-700 ${colores[tone]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Campo({ label, ...rest }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-neutral-600">{label}</label>
      <input {...rest} className="w-full rounded-lg border border-momo-line px-3 py-2.5 text-sm outline-none focus:border-momo-amber" />
    </div>
  )
}

function Modal({ titulo, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-pop"
      >
        <div className="flex items-center justify-between border-b border-momo-line px-5 py-3.5">
          <p className="font-display font-bold">{titulo}</p>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-neutral-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
