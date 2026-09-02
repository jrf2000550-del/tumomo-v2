// Abre el artifact publicado y comprueba que carga y navega bien.
import { chromium } from 'playwright'

const URL = process.argv[2]
if (!URL) { console.log('uso: node verificar-artifact.mjs <url>'); process.exit(1) }

const errores = []
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
p.on('pageerror', (e) => errores.push(e.message))

await p.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
await p.waitForTimeout(4000)

// El artifact se renderiza dentro de un iframe
const marcos = p.frames()
console.log('marcos en la pagina:', marcos.length)

let app = null
for (const f of marcos) {
  const n = await f.locator('#root h1').count().catch(() => 0)
  if (n > 0) { app = f; break }
}

if (!app) {
  console.log('No se encontro la app renderizada (puede requerir sesion iniciada).')
} else {
  console.log('Titular:', (await app.locator('h1').first().innerText()).replace(/\n/g, ' '))
  const fuente = await app.locator('h1').first().evaluate((e) => getComputedStyle(e).fontFamily.split(',')[0])
  console.log('Fuente del titular:', fuente)
  const btn = await app.locator('a[href="#/pro"]').first()
    .evaluate((e) => getComputedStyle(e).color + ' sobre ' + getComputedStyle(e).backgroundColor)
    .catch(() => 'n/d')
  console.log('Boton "Soy profesional":', btn)
}

console.log(errores.length ? 'Errores: ' + errores.slice(0, 3).join(' | ') : 'Sin errores de JavaScript.')
await b.close()
