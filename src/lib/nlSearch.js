// ---------------------------------------------------------------------------
// Interprete de busqueda en lenguaje natural — SIMULADO
// No usa IA real. Es un parser por reglas que reconoce las intenciones tipicas
// del mercado inmobiliario boliviano para demostrar la experiencia.
// ---------------------------------------------------------------------------

import { ZONAS, PROPIEDADES } from '../data/demo'

const norm = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const TIPO_PATRONES = [
  { tipo: 'Departamento', re: /\b(depa|depto|departamento|departamentos|dpto|monoambiente|duplex)\b/ },
  { tipo: 'Casa', re: /\b(casa|casas|chalet|vivienda|quinta)\b/ },
  { tipo: 'Terreno', re: /\b(terreno|terrenos|lote|lotes|predio)\b/ },
  { tipo: 'Oficina', re: /\b(oficina|oficinas)\b/ },
  { tipo: 'Local', re: /\b(local|locales|tienda|comercial)\b/ },
  { tipo: 'Proyecto', re: /\b(proyecto|proyectos|torre|condominio en obra)\b/ },
]

// Convierte "150.000", "150 mil", "150k", "$150000" a numero
function parseMonto(texto) {
  const t = norm(texto)

  // "150 mil" / "150mil"
  const mil = t.match(/(\d+(?:[.,]\d+)?)\s*mil\b/)
  if (mil) return Math.round(parseFloat(mil[1].replace(',', '.')) * 1000)

  // "150k"
  const k = t.match(/(\d+(?:[.,]\d+)?)\s*k\b/)
  if (k) return Math.round(parseFloat(k[1].replace(',', '.')) * 1000)

  // "$150.000" / "150000" / "150,000"
  const plain = t.match(/\$?\s*(\d{1,3}(?:[.,]\d{3})+|\d{4,7})/)
  if (plain) return parseInt(plain[1].replace(/[.,]/g, ''), 10)

  return null
}

export function interpretar(consulta) {
  const q = norm(consulta || '')
  if (!q.trim()) return null

  const r = {
    consulta,
    tipo: null,
    zona: null,
    dorm: null,
    presupuesto: null,
    estado: null,
    operacion: 'Comprar',
    objetivo: null,
    financiamiento: false,
    formaCompra: null,
  }

  // --- Tipo de propiedad ---
  for (const { tipo, re } of TIPO_PATRONES) {
    if (re.test(q)) { r.tipo = tipo; break }
  }

  // --- Zona ---
  for (const z of ZONAS) {
    const zn = norm(z)
    if (q.includes(zn)) { r.zona = z; break }
  }
  // "equipetrol norte" gana sobre "equipetrol"
  if (q.includes('equipetrol norte')) r.zona = 'Equipetrol Norte'

  // --- Dormitorios ---
  const dorm = q.match(/(\d+)\s*(dormitorio|dormitorios|dorm|habitacion|habitaciones|cuarto|cuartos|amb)/)
  if (dorm) r.dorm = parseInt(dorm[1], 10)
  else if (/\bmonoambiente\b/.test(q)) r.dorm = 1

  // --- Presupuesto ---
  // Se toma el texto que sigue al indicador de tope; no se corta en el punto
  // porque en Bolivia el separador de miles es justamente el punto ("150.000").
  const conTope = q.match(/(?:hasta|maximo|max|menos de|no mas de|tope|presupuesto de|por)\s+(\$?\s*[\d.,]+\s*(?:mil|k)?)/)
  r.presupuesto = parseMonto(conTope ? conTope[1] : q)

  // --- Operacion ---
  if (/\b(alquil|arrend|renta mensual|para rentar)\w*/.test(q)) r.operacion = 'Alquilar'
  if (/\b(compr|vender|venta|adquirir)\w*/.test(q)) r.operacion = 'Comprar'

  // --- Estado ---
  if (/\b(nuevo|nueva|estreno|obra nueva|a estrenar)\b/.test(q)) r.estado = 'Nuevo'
  if (/\b(preventa|pre-venta|en pozo)\b/.test(q)) r.estado = 'Preventa'
  if (/\b(usado|usada|segunda mano)\b/.test(q)) r.estado = 'Usado'
  if (/\b(en construccion|en obra)\b/.test(q)) r.estado = 'En construcción'

  // --- Objetivo ---
  if (/\b(invertir|inversion|rentabilidad|rentar|renta|plusvalia)\b/.test(q)) r.objetivo = 'Invertir'
  else if (/\b(vivir|mudarme|para mi familia|primera vivienda|habitar)\b/.test(q)) r.objetivo = 'Vivir'

  // --- Financiamiento / forma de compra ---
  // Sin \b final: cubre "financiarlo", "financiarla", "financiamiento".
  if (/(financia|credito|cuotas|prestamo|hipotec|banco)/.test(q)) {
    r.financiamiento = true
  }
  if (/credito directo/.test(q)) r.formaCompra = 'Crédito directo'
  else if (/(credito bancario|banco|hipotecario|hipoteca)/.test(q)) r.formaCompra = 'Crédito bancario'
  else if (/\b(contado|efectivo|cash)\b/.test(q)) r.formaCompra = 'Contado'
  else if (/preventa/.test(q)) r.formaCompra = 'Preventa'

  if (r.formaCompra && r.formaCompra !== 'Contado') r.financiamiento = true

  return r
}

// Aplica una interpretacion (o un objeto de filtros) sobre el dataset
export function filtrar(criterios, base = PROPIEDADES) {
  if (!criterios) return base

  return base.filter((p) => {
    if (criterios.operacion && p.operacion !== criterios.operacion) return false
    if (criterios.tipo && p.tipo !== criterios.tipo) {
      // Un "Proyecto" tambien satisface la busqueda de departamento en preventa
      const proyectoValido = criterios.tipo === 'Departamento' && p.tipo === 'Proyecto'
      if (!proyectoValido) return false
    }
    // Una zona "madre" incluye sus derivadas: quien busca en Equipetrol
    // espera ver tambien Equipetrol Norte.
    if (criterios.zona && p.zona !== criterios.zona && !p.zona.startsWith(criterios.zona + ' ')) return false
    if (criterios.dorm != null && p.dorm < criterios.dorm) return false
    if (criterios.dormMax != null && p.dorm > criterios.dormMax) return false
    if (criterios.presupuesto != null && p.precio > criterios.presupuesto * 1.02) return false
    if (criterios.precioMin != null && p.precio < criterios.precioMin) return false
    if (criterios.estado && p.estado !== criterios.estado) return false
    if (criterios.objetivo && !p.objetivo.includes(criterios.objetivo)) return false
    if (criterios.formaCompra && !p.formas.includes(criterios.formaCompra)) return false
    if (criterios.financiamiento && !p.formas.some((f) => f !== 'Contado')) return false
    if (criterios.supMin != null && p.superficie < criterios.supMin) return false
    if (criterios.supMax != null && p.superficie > criterios.supMax) return false
    if (criterios.tipos?.length && !criterios.tipos.includes(p.tipo)) return false
    // Misma regla de zona madre que arriba, para los filtros multiples de la UI
    if (criterios.zonas?.length &&
        !criterios.zonas.some((z) => p.zona === z || p.zona.startsWith(z + ' '))) return false
    return true
  })
}

// Chips visibles de la interpretacion, para pintarlos en la UI
export function chipsDe(r) {
  if (!r) return []
  const c = []
  if (r.tipo) c.push({ k: 'Tipo', v: r.tipo })
  if (r.zona) c.push({ k: 'Zona', v: r.zona })
  if (r.dorm != null) c.push({ k: 'Dormitorios', v: `${r.dorm}+` })
  if (r.estado) c.push({ k: 'Estado', v: r.estado })
  if (r.presupuesto) c.push({ k: 'Presupuesto', v: 'hasta $' + r.presupuesto.toLocaleString('es-BO') })
  if (r.objetivo) c.push({ k: 'Objetivo', v: r.objetivo })
  if (r.formaCompra) c.push({ k: 'Forma de compra', v: r.formaCompra })
  else if (r.financiamiento) c.push({ k: 'Financiamiento', v: 'Sí' })
  if (r.operacion) c.push({ k: 'Operación', v: r.operacion })
  return c
}

export const EJEMPLOS = [
  'Departamento de 2 dormitorios en Equipetrol hasta $150.000 y quiero financiarlo',
  'Casa con crédito directo en Urubó',
  'Propiedad para invertir con buena rentabilidad',
  'Terreno para construir en Urubó',
]

// Calculo de cuota francesa — usado por la calculadora de financiamiento
export function cuotaMensual(monto, tasaAnual, anios) {
  const i = tasaAnual / 100 / 12
  const n = anios * 12
  if (i === 0) return monto / n
  return (monto * i) / (1 - Math.pow(1 + i, -n))
}
