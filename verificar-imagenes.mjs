// Recorre las pantallas y comprueba que TODAS las imagenes cargan.
// Nace de un fallo real: el artifact bloquea hosts externos y la demo salio
// publicada sin una sola foto.
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:5173'
const RUTAS = ['/', '/buscar', '/propiedad/p-1', '/propiedad/p-8', '/propiedad/p-9',
  '/proyectos', '/profesionales', '/invertir', '/construir', '/comparar',
  '/agente/ag-1', '/inmobiliaria/in-1', '/pro', '/pro/crm', '/pro/leads',
  '/pro/leads/ld-1', '/pro/whatsapp', '/pro/propiedades']

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })

let totalImgs = 0
let rotas = 0
const externas = new Set()

for (const ruta of RUTAS) {
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)

  const r = await p.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')]
    return imgs.map((i) => ({
      src: i.currentSrc || i.src,
      ok: i.complete && i.naturalWidth > 0,
      w: i.naturalWidth,
    }))
  })

  totalImgs += r.length
  const malas = r.filter((x) => !x.ok)
  rotas += malas.length
  r.forEach((x) => {
    if (/^https?:\/\//.test(x.src) && !x.src.includes('fonts.g')) externas.add(new URL(x.src).host)
  })

  const marca = malas.length ? 'ROTAS ' + malas.length : 'ok'
  console.log(`${marca.padEnd(9)} ${ruta}  (${r.length} imagenes)`)
  malas.slice(0, 3).forEach((m) => console.log('        ! ' + m.src.slice(0, 90)))
}

console.log('\n' + '='.repeat(58))
console.log(`Imagenes revisadas: ${totalImgs} · rotas: ${rotas}`)
console.log(externas.size
  ? 'ATENCION, hosts externos (el artifact los bloquea): ' + [...externas].join(', ')
  : 'Todas las imagenes son locales o embebidas. Ninguna depende de internet.')
await b.close()
process.exit(rotas || externas.size ? 1 : 0)
