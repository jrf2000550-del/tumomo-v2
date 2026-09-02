// Recorre el guion de la demo en un navegador real y reporta errores de consola.
import { chromium } from 'playwright'

const BASE = 'http://localhost:5173'
const errores = []
const pasos = []

const ok = (t) => { pasos.push(['OK ', t]); console.log('  OK   ' + t) }
const fail = (t, e) => { pasos.push(['FALLA', t]); console.log('  FALLA ' + t + (e ? ' -> ' + e : '')) }

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

page.on('console', (m) => {
  if (m.type() === 'error') errores.push(m.text())
})
page.on('pageerror', (e) => errores.push('PAGEERROR: ' + e.message))

const irA = async (ruta) => {
  await page.goto(BASE + ruta, { waitUntil: 'networkidle' })
}

try {
  // --- ESCENA 1-2: Home y busqueda en lenguaje natural ---
  await irA('/')
  const h1 = await page.locator('h1').first().innerText()
  h1.includes('próxima propiedad') ? ok('Escena 1 · Home carga con el hero correcto') : fail('Escena 1 · hero', h1)

  const consulta = 'Departamento de 2 dormitorios en Equipetrol hasta $150.000 y quiero financiarlo'
  await page.locator('input[placeholder="¿Qué estás buscando?"]').fill(consulta)
  await page.waitForTimeout(400)

  // --- ESCENA 3: interpretacion visible en el home ---
  const chips = await page.locator('text=Así interpretamos tu búsqueda').count()
  chips > 0 ? ok('Escena 3 · La IA interpreta la consulta en vivo') : fail('Escena 3 · interpretacion')

  await page.keyboard.press('Enter')
  await page.waitForURL('**/buscar**')
  await page.waitForTimeout(500)

  // --- ESCENA 4: resultados ---
  const encontrados = await page.locator('text=/Encontramos \\d+ propiedad/').first().innerText().catch(() => '')
  const cuantos = parseInt((encontrados.match(/\d+/) || [0])[0], 10)
  cuantos > 0
    ? ok(`Escena 4 · Resultados: ${cuantos} propiedades coinciden`)
    : fail('Escena 4 · la busqueda estrella devolvio 0 resultados')

  const tarjetas = await page.locator('a[href^="/propiedad/"]').count()
  tarjetas > 0 ? ok(`Escena 4 · ${tarjetas} enlaces a fichas de propiedad`) : fail('Escena 4 · sin tarjetas')

  // Vista de mapa
  await page.locator('button:has-text("Mapa")').click()
  await page.waitForTimeout(400)
  const marcadores = await page.locator('text=propiedades en el mapa').count()
  marcadores > 0 ? ok('Mapa · Vista de mapa funciona') : fail('Mapa')
  await page.locator('button:has-text("Lista")').click()
  await page.waitForTimeout(300)

  // --- ESCENA 5-6: ficha de propiedad ---
  await irA('/propiedad/p-1')
  const titulo = await page.locator('h1').first().innerText()
  titulo.includes('Sky Moon') ? ok('Escena 5 · Ficha de propiedad abre') : fail('Escena 5', titulo)

  for (const [txt, etiqueta] of [
    ['Análisis de inversión', 'Escena 6 · Rentabilidad'],
    ['¿Cómo se compara esta propiedad?', 'Escena 6 · Comparables'],
    ['¿Cómo quieres comprar?', 'Escena 7 · Formas de compra'],
    ['Calculadora de financiamiento', 'Escena 8 · Calculadora'],
    ['Profesional verificado', 'Escena 6 · Verificación'],
  ]) {
    const n = await page.locator(`text=${txt}`).count()
    n > 0 ? ok(etiqueta) : fail(etiqueta)
  }

  // --- ESCENA 8: calculadora responde ---
  const cuotaEl = page.locator('p:has-text("Cuota mensual estimada")').locator('xpath=following-sibling::p[1]')
  const cuotaAntes = await cuotaEl.innerText()
  // React solo reacciona si se usa el setter nativo del input
  await page.locator('input[type="range"]').first().evaluate((el) => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    set.call(el, '50')
    el.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await page.waitForTimeout(400)
  const cuotaDespues = await cuotaEl.innerText()
  cuotaAntes !== cuotaDespues
    ? ok(`Escena 8 · Calculadora recalcula (${cuotaAntes} -> ${cuotaDespues})`)
    : fail('Escena 8 · la calculadora no recalculo', `${cuotaAntes} = ${cuotaDespues}`)

  // --- ESCENA 9-10: contacto crea lead en el CRM ---
  await page.locator('button:has-text("Hablar con un agente")').click()
  await page.waitForTimeout(400)
  await page.locator('input[name="nombre"]').fill('María López')
  await page.locator('input[name="telefono"]').fill('+591 700 99 999')
  await page.locator('button[type="submit"]:has-text("Enviar consulta")').click()
  await page.waitForTimeout(600)

  const confirmado = await page.locator('text=El lead ya ingresó al CRM').count()
  confirmado > 0 ? ok('Escena 9 · Consulta enviada, lead creado') : fail('Escena 9 · contacto')

  // --- ESCENA 11: el lead aparece en TuMomo Pro ---
  await irA('/pro/crm')
  const enCRM = await page.locator('text=María López').count()
  enCRM > 0 ? ok('Escena 10-11 · El lead aparece en el CRM de TuMomo Pro') : fail('Escena 10-11 · lead no llego al CRM')

  // --- ESCENA 12-13: IA recomienda y genera WhatsApp ---
  await page.locator('a:has-text("María López")').first().click()
  await page.waitForTimeout(600)
  const hayIA = await page.locator('text=TuMomo AI').count()
  hayIA > 0 ? ok('Escena 12 · Panel de TuMomo AI presente en el lead') : fail('Escena 12 · panel IA')

  await page.locator('button:has-text("Generar WhatsApp")').first().click()
  await page.waitForTimeout(500)
  const msg = await page.locator('textarea').first().inputValue()
  msg.includes('María') ? ok('Escena 13 · Mensaje de WhatsApp generado') : fail('Escena 13 · mensaje', msg.slice(0, 60))

  // --- ESCENA 14: agendar visita ---
  await page.locator('button:has-text("Agendar visita")').first().click()
  await page.waitForTimeout(500)
  const visitaOk = await page.locator('text=Visita agendada con').count()
  visitaOk > 0 ? ok('Escena 14 · Visita agendada desde el lead') : fail('Escena 14 · visita')

  await irA('/pro/calendario')
  const enCal = await page.locator('text=/Visita con María/').count()
  enCal > 0 ? ok('Escena 14 · La visita aparece en el calendario') : fail('Escena 14 · calendario')

  // --- ESCENA 16-17: quiero construir ---
  await irA('/construir')
  await page.locator('button:has-text("No")').first().click()
  await page.waitForTimeout(300)
  await page.locator('button:has-text("No")').first().click()
  await page.waitForTimeout(300)
  await page.locator('button:has-text("No")').first().click()
  await page.waitForTimeout(300)
  await page.locator('button:has-text("No")').first().click()
  await page.waitForTimeout(300)
  await page.locator('button:has-text("No")').first().click()
  await page.waitForTimeout(600)
  const ruta = await page.locator('text=/TuMomo te conecta con \\d+ servicio/').count()
  ruta > 0 ? ok('Escena 16-17 · Quiero construir arma la ruta completa') : fail('Escena 16-17 · construir')

  // --- Resto de pantallas P0/P1 ---
  const pantallas = [
    ['/comparar', 'Comparador'],
    ['/requerimientos', 'Requerimientos'],
    ['/profesionales', 'Profesionales'],
    ['/proyectos', 'Proyectos'],
    ['/invertir', 'Invertir'],
    ['/financiar', 'Financiar'],
    ['/datos', 'Escena 18 · TuMomo Data'],
    ['/global', 'Escena 19-20 · TuMomo Global'],
    ['/agente/ag-1', 'Perfil de agente'],
    ['/inmobiliaria/in-1', 'Perfil de inmobiliaria'],
    ['/pro', 'Pro · Dashboard'],
    ['/pro/leads', 'Pro · Leads'],
    ['/pro/ia', 'Pro · TuMomo AI'],
    ['/pro/whatsapp', 'Pro · WhatsApp'],
    ['/pro/marketing', 'Pro · Marketing'],
    ['/pro/landings', 'Pro · Landing Pages'],
    ['/pro/propiedades', 'Pro · Propiedades'],
    ['/pro/requerimientos', 'Pro · Requerimientos'],
  ]

  for (const [ruta, nombre] of pantallas) {
    await irA(ruta)
    const tieneH1 = await page.locator('h1').count()
    tieneH1 > 0 ? ok(nombre) : fail(nombre + ' (sin h1)')
  }

  // --- Comparador con propiedades ---
  await irA('/buscar')
  const botonesComparar = page.locator('button:has-text("Comparar")')
  const n = await botonesComparar.count()
  if (n >= 3) {
    await botonesComparar.nth(0).click()
    await botonesComparar.nth(1).click()
    await botonesComparar.nth(2).click()
    await page.waitForTimeout(300)
    await irA('/comparar')
    const filas = await page.locator('text=Precio / m²').count()
    filas > 0 ? ok('Comparador · Compara 3 propiedades') : fail('Comparador con datos')
  }

  // --- Responsive movil ---
  await page.setViewportSize({ width: 390, height: 844 })
  await irA('/')
  const scrollX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
  !scrollX ? ok('Responsive · Home sin scroll horizontal en móvil') : fail('Responsive · scroll horizontal en móvil')

  await irA('/pro')
  const scrollX2 = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2)
  !scrollX2 ? ok('Responsive · Pro sin scroll horizontal en móvil') : fail('Responsive · Pro scroll horizontal')

} catch (e) {
  fail('EXCEPCION', e.message)
}

await browser.close()

// --- Resumen ---
const fallas = pasos.filter(([s]) => s === 'FALLA')
console.log('\n' + '='.repeat(60))
console.log(`Pasos verificados: ${pasos.length} · OK: ${pasos.length - fallas.length} · Fallas: ${fallas.length}`)

const relevantes = errores.filter((e) =>
  !/favicon|net::ERR|Failed to load resource|404|images\.unsplash|pravatar/i.test(e)
)
if (relevantes.length) {
  console.log('\nErrores de consola:')
  ;[...new Set(relevantes)].slice(0, 12).forEach((e) => console.log('  ! ' + e.slice(0, 200)))
} else {
  console.log('Sin errores de JavaScript en consola.')
}
process.exit(fallas.length ? 1 : 0)
