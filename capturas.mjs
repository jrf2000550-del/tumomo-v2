import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport:{width:1440,height:1100} })
const q = encodeURIComponent('Departamento de 2 dormitorios en Equipetrol hasta $150.000 y quiero financiarlo')
const shots = [
  ['/', 'home', false],
  ['/buscar?q='+q, 'resultados', false],
  ['/propiedad/p-1', 'ficha', false],
  ['/pro', 'pro-dashboard', false],
  ['/pro/crm', 'pro-crm', false],
  ['/construir', 'construir', false],
  ['/datos', 'datos', false],
]
for (const [ruta, nombre] of shots) {
  await p.goto('http://localhost:5173'+ruta, { waitUntil:'networkidle' })
  await p.waitForTimeout(1400)
  await p.screenshot({ path:`capturas/${nombre}.png` })
  console.log('ok', nombre)
}
await b.close()
