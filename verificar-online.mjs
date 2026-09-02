// Comprueba el sitio ya desplegado, como lo vera cualquier persona con el link.
import { chromium } from 'playwright'

const BASE = process.argv[2]
if (!BASE) { console.log('uso: node verificar-online.mjs <url>'); process.exit(1) }

const errores = []
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
p.on('pageerror', (e) => errores.push(e.message))
p.on('console', (m) => { if (m.type() === 'error') errores.push('[consola] ' + m.text()) })

const RUTAS = [
  ['/', 'próxima propiedad'],
  ['/buscar', 'resultado'],
  ['/propiedad/p-1', 'Sky Moon'],
  ['/financiar', 'financiamiento'],
  ['/construir', 'construir'],
  ['/datos', 'Inteligencia'],
  ['/pro', 'Hoy'],
  ['/pro/crm', 'CRM'],
  ['/pro/leads/ld-1', 'María'],
]

let fallas = 0
let imgs = 0
let rotas = 0

for (const [ruta, esperado] of RUTAS) {
  await p.goto(BASE + ruta, { waitUntil: 'networkidle', timeout: 45000 })
  await p.waitForTimeout(1200)

  const txt = await p.locator('h1').first().innerText().catch(() => '')
  const ok = txt.toLowerCase().includes(esperado.toLowerCase())
  if (!ok) fallas++

  const d = await p.evaluate(() =>
    [...document.querySelectorAll('img')].map((i) => i.complete && i.naturalWidth > 0))
  imgs += d.length
  rotas += d.filter((x) => !x).length

  console.log(`${(ok ? 'OK   ' : 'FALLA')}  ${ruta.padEnd(18)} ${txt.replace(/\n/g, ' ').slice(0, 34).padEnd(36)} ${d.length} imgs`)
}

console.log('\n' + '='.repeat(62))
console.log(`Rutas: ${RUTAS.length} · fallas: ${fallas}`)
console.log(`Imagenes: ${imgs} · rotas: ${rotas}`)
const graves = errores.filter((e) => !/favicon|net::ERR_ABORTED/i.test(e))
console.log(graves.length ? 'Errores:\n  ' + [...new Set(graves)].slice(0, 5).join('\n  ') : 'Sin errores de JavaScript.')
await b.close()
process.exit(fallas || rotas ? 1 : 0)
