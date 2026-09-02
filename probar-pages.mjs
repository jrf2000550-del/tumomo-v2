// Sirve dist/ bajo un subdirectorio, imitando como publica GitHub Pages,
// y verifica que las rutas profundas y las imagenes funcionen ahi.
import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { join, extname } from 'path'
import { chromium } from 'playwright'

const REPO = 'tumomo-v2'
const PUERTO = 4321
const TIPOS = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.json': 'application/json', '.woff2': 'font/woff2',
}

const servidor = createServer(async (req, res) => {
  let ruta = decodeURIComponent(req.url.split('?')[0])
  if (!ruta.startsWith(`/${REPO}`)) { res.writeHead(404); return res.end('fuera del repo') }
  ruta = ruta.slice(REPO.length + 1) || '/'

  let archivo = join('dist', ruta === '/' ? 'index.html' : ruta)
  try {
    const buf = await readFile(archivo)
    res.writeHead(200, { 'content-type': TIPOS[extname(archivo)] || 'application/octet-stream' })
    res.end(buf)
  } catch {
    // Como Pages: lo que no existe cae en 404.html, que es la propia SPA
    try {
      const buf = await readFile(join('dist', '404.html'))
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(buf)
    } catch { res.writeHead(404); res.end('no encontrado') }
  }
})

await new Promise((r) => servidor.listen(PUERTO, r))
const BASE = `http://localhost:${PUERTO}/${REPO}`

const errores = []
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } })
p.on('pageerror', (e) => errores.push(e.message))

let fallas = 0, imgs = 0, rotas = 0
for (const [ruta, esperado] of [
  ['/', 'próxima propiedad'], ['/buscar', 'resultado'], ['/propiedad/p-1', 'Sky Moon'],
  ['/financiar', 'financiamiento'], ['/construir', 'construir'],
  ['/pro', 'Hoy'], ['/pro/crm', 'CRM'], ['/pro/leads/ld-1', 'María'],
]) {
  await p.goto(BASE + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1000)
  const t = await p.locator('h1').first().innerText().catch(() => '')
  const ok = t.toLowerCase().includes(esperado.toLowerCase())
  if (!ok) fallas++
  const d = await p.evaluate(() => [...document.querySelectorAll('img')].map((i) => i.complete && i.naturalWidth > 0))
  imgs += d.length; rotas += d.filter((x) => !x).length
  console.log(`${(ok ? 'OK   ' : 'FALLA')}  ${ruta.padEnd(18)} ${t.replace(/\n/g, ' ').slice(0, 30).padEnd(32)} ${d.length} imgs`)
}

console.log('\n' + '='.repeat(58))
console.log(`Rutas: 8 · fallas: ${fallas} · imagenes: ${imgs} · rotas: ${rotas}`)
console.log(errores.length ? 'Errores: ' + [...new Set(errores)].slice(0, 3).join(' | ') : 'Sin errores de JavaScript.')

await b.close()
servidor.close()
process.exit(fallas || rotas ? 1 : 0)
