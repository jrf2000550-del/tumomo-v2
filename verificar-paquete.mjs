// Verifica el HTML autocontenido tal como lo vera el Artifact:
// se envuelve en el mismo esqueleto y se abre desde el disco.
import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const cuerpo = readFileSync('tumomo-v2-demo.html', 'utf8')
const envuelto = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${cuerpo}</body></html>`
writeFileSync('.paquete-prueba.html', envuelto)

const errores = []
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
p.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
p.on('pageerror', (e) => errores.push('PAGEERROR: ' + e.message))

const url = 'file:///' + resolve('.paquete-prueba.html').replace(/\\/g, '/')
await p.goto(url, { waitUntil: 'networkidle' })
await p.waitForTimeout(2000)

const h1 = await p.locator('h1').first().innerText().catch(() => '(sin h1)')
console.log('Home:', h1.replace(/\n/g, ' '))

// Navegacion interna con hash
for (const [ruta, esperado] of [
  ['#/buscar', 'resultado'],
  ['#/propiedad/p-1', 'Sky Moon'],
  ['#/pro', 'Hoy'],
  ['#/pro/crm', 'CRM'],
  ['#/construir', 'construir'],
  ['#/datos', 'Inteligencia'],
]) {
  await p.goto(url + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)
  const t = await p.locator('h1').first().innerText().catch(() => '')
  const ok = t.toLowerCase().includes(esperado.toLowerCase())
  console.log((ok ? 'OK   ' : 'FALLA') + '  ' + ruta + ' -> ' + t.replace(/\n/g, ' ').slice(0, 40))
}

// Imagenes: el fallo original fue publicar la demo sin ninguna
let imgs = 0, rotas = 0
for (const ruta of ['', '#/buscar', '#/propiedad/p-1', '#/pro/crm', '#/profesionales', '#/proyectos']) {
  await p.goto(url + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1300)
  const d = await p.evaluate(() =>
    [...document.querySelectorAll('img')].map((i) => i.complete && i.naturalWidth > 0))
  imgs += d.length
  rotas += d.filter((x) => !x).length
}
console.log(`Imagenes en el paquete: ${imgs} · rotas: ${rotas}`)

// Contraste del boton clave
await p.goto(url, { waitUntil: 'networkidle' })
await p.waitForTimeout(800)
const btn = await p.locator('a[href="#/pro"]').first().evaluate((e) => {
  const cs = getComputedStyle(e)
  return cs.color + ' sobre ' + cs.backgroundColor
}).catch(() => 'no encontrado')
console.log('Boton "Soy profesional":', btn)

const graves = errores.filter((e) => !/favicon|net::ERR|Failed to load resource|404/i.test(e))
console.log(graves.length ? '\nErrores:\n  ' + [...new Set(graves)].slice(0, 6).join('\n  ') : '\nSin errores de JavaScript.')
await b.close()
