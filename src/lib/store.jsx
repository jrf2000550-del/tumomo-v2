// ---------------------------------------------------------------------------
// Estado global ligero de la demo.
// Permite que las acciones del lado consumidor (contactar a un agente, agendar
// una visita) aparezcan realmente en TuMomo Pro. Esa continuidad es lo que
// sostiene el recorrido de las escenas 9-14 del guion de la demo.
// ---------------------------------------------------------------------------

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { LEADS, EVENTOS } from '../data/demo'
import { retrato } from '../data/ilustraciones'

const Ctx = createContext(null)

const cargar = (k, def) => {
  try {
    const v = localStorage.getItem(k)
    return v ? JSON.parse(v) : def
  } catch { return def }
}

const guardar = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* modo privado */ }
}

export function StoreProvider({ children }) {
  const [compareIds, setCompareIds] = useState(() => cargar('momo.compare', []))
  const [leadsExtra, setLeadsExtra] = useState(() => cargar('momo.leads', []))
  const [eventosExtra, setEventosExtra] = useState(() => cargar('momo.eventos', []))
  const [favoritos, setFavoritos] = useState(() => cargar('momo.favs', []))

  useEffect(() => guardar('momo.compare', compareIds), [compareIds])
  useEffect(() => guardar('momo.leads', leadsExtra), [leadsExtra])
  useEffect(() => guardar('momo.eventos', eventosExtra), [eventosExtra])
  useEffect(() => guardar('momo.favs', favoritos), [favoritos])

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return [...prev.slice(1), id]  // maximo 4
      return [...prev, id]
    })
  }, [])

  const toggleFav = useCallback((id) => {
    setFavoritos((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  }, [])

  /** Un contacto desde la ficha crea un lead real en el CRM de TuMomo Pro. */
  const crearLead = useCallback((datos) => {
    const lead = {
      id: `ld-new-${Date.now()}`,
      etapa: 'Nuevo',
      temperatura: 'Caliente',
      origen: 'TuMomo Search',
      ultimoContacto: 'Recién ahora',
      avatar: retrato(5),
      vistas: [],
      favoritos: [],
      nuevo: true,
      ...datos,
    }
    setLeadsExtra((p) => [lead, ...p])
    return lead
  }, [])

  const moverLead = useCallback((id, etapa) => {
    setLeadsExtra((p) => p.map((l) => (l.id === id ? { ...l, etapa } : l)))
  }, [])

  const agendarVisita = useCallback((ev) => {
    const nuevo = { id: `ev-new-${Date.now()}`, color: 'red', tipo: 'Visita', nuevo: true, ...ev }
    setEventosExtra((p) => [...p, nuevo])
    return nuevo
  }, [])

  const reiniciarDemo = useCallback(() => {
    setLeadsExtra([]); setEventosExtra([]); setCompareIds([]); setFavoritos([])
  }, [])

  // Los leads y eventos base viven en el dataset; los creados en la sesion se
  // anteponen para que se vean de inmediato.
  const leads = useMemo(() => [...leadsExtra, ...LEADS], [leadsExtra])
  const eventos = useMemo(() => [...EVENTOS, ...eventosExtra], [eventosExtra])

  const value = useMemo(() => ({
    compareIds, toggleCompare, setCompareIds,
    favoritos, toggleFav,
    leads, leadsExtra, crearLead, moverLead,
    eventos, agendarVisita,
    reiniciarDemo,
  }), [compareIds, toggleCompare, favoritos, toggleFav, leads, leadsExtra, crearLead, moverLead, eventos, agendarVisita, reiniciarDemo])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStore debe usarse dentro de <StoreProvider>')
  return c
}

export function useCompare() {
  const { compareIds, toggleCompare, setCompareIds } = useStore()
  return { ids: compareIds, toggle: toggleCompare, set: setCompareIds }
}
