import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage()
for (const r of ['/','/buscar','/propiedad/p-1','/financiar','/construir','/datos','/pro','/pro/crm','/pro/leads/ld-1']) {
  const malos = []
  p.removeAllListeners('response')
  p.on('response', (x) => { if (x.status() >= 400) malos.push(x.status() + ' ' + x.url().slice(0, 95)) })
  await p.goto('https://jrf2000550-del.github.io/tumomo-v2' + r, { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)
  if (malos.length) { console.log(r); [...new Set(malos)].forEach((m) => console.log('   ' + m)) }
}
console.log('--- fin')
await b.close()
