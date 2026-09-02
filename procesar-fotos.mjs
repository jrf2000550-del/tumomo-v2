// ---------------------------------------------------------------------------
// Convierte las fotos reales en WebP livianos y los embebe como data URI.
// El artifact bloquea hosts externos, asi que las imagenes tienen que viajar
// dentro del propio archivo. Se descartan las que llevan marca de agua de
// terceros (RE/MAX, Red Inmobiliaria, Lennar).
// ---------------------------------------------------------------------------
import sharp from 'sharp'
import { writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DIR = 'fotos-origen'

// Clasificacion revisada foto por foto sobre la hoja de contactos
const CATALOGO = {
  // Lotes vistos desde dron
  terreno: ['DJI_0100-HDR.jpg', 'DJI_0101.jpg', 'DJI_0104.jpg', 'DJI_0105.jpg',
            'DJI_0107.jpg', 'DJI_0110.jpg', 'DJI_0706.JPG'],

  // Torre Sky Moon y sus interiores
  departamento: ['IMG_7402.png', 'IMG_7403.png', 'IMG_8232.png', 'IMG_8235.png',
                 'IMG_8236.png', 'IMG_8237.png', 'IMG_8243.png', 'IMG_8246.png'],

  // Casas: fachadas con piscina, livings, cocinas, dormitorios, quinchos
  casa: ['IMG_8960.jpg', 'IMG_8973.jpg', 'IMG_8979.jpg', 'IMG_8980.jpg',
         'IMG_8984.jpg', 'IMG_8990.jpg', 'IMG_8992.jpg', 'IMG_8999.jpg',
         'IMG_9001.jpg', 'IMG_9002.jpg'],

  // Desarrollos y conjuntos
  proyecto: ['casa club westviw+.jpg', 'casa west.jpg', 'fachada Everbe+.webp',
             'urubo village.jpg', 'casaiacolinas.png'],
}

// Oficinas y locales reutilizan la torre corporativa y el club house
CATALOGO.oficina = ['IMG_4605.jpg', 'IMG_7402.png', 'IMG_7403.png']
CATALOGO.local = ['casa club westviw+.jpg', 'IMG_4605.jpg', 'IMG_8246.png']

const ANCHO = 760      // suficiente para tarjeta y galeria en pantalla grande
const CALIDAD = 52     // WebP agresivo: la demo prioriza que el archivo sea liviano

async function aDataUri(archivo) {
  const ruta = join(DIR, archivo)
  if (!existsSync(ruta)) {
    console.log('  falta:', archivo)
    return null
  }
  const buf = await sharp(ruta)
    .rotate()                                        // respeta la orientacion EXIF
    .resize(ANCHO, Math.round(ANCHO * 0.625), { fit: 'cover', position: 'attention' })
    .webp({ quality: CALIDAD, effort: 6 })
    .toBuffer()
  return 'data:image/webp;base64,' + buf.toString('base64')
}

const salida = {}
let total = 0

for (const [tipo, archivos] of Object.entries(CATALOGO)) {
  salida[tipo] = []
  for (const a of archivos) {
    const uri = await aDataUri(a)
    if (uri) {
      salida[tipo].push(uri)
      total += uri.length
    }
  }
  console.log(`${tipo.padEnd(14)} ${salida[tipo].length} fotos`)
}

const js = `// ---------------------------------------------------------------------------
// GENERADO por procesar-fotos.mjs — no editar a mano.
// Fotos reales de inmuebles de Santa Cruz, convertidas a WebP y embebidas como
// data URI porque el artifact publicado bloquea cualquier host externo.
// ---------------------------------------------------------------------------

export const FOTOS = ${JSON.stringify(salida, null, 0)}

/** Galeria de 3 fotos para una propiedad, estable segun su indice. */
export function fotosDe(tipo, i = 0) {
  const clave = {
    Departamento: 'departamento', Casa: 'casa', Terreno: 'terreno',
    Oficina: 'oficina', Local: 'local', Proyecto: 'proyecto',
  }[tipo] || 'departamento'
  const banco = FOTOS[clave] || FOTOS.departamento
  return [0, 1, 2].map((k) => banco[(i * 2 + k) % banco.length])
}

/** Una sola foto, para proyectos y cabeceras. */
export function fotoDe(tipo, i = 0) {
  return fotosDe(tipo, i)[0]
}
`

writeFileSync('src/data/fotos.js', js)
console.log(`\nsrc/data/fotos.js — ${(js.length / 1048576).toFixed(2)} MB`)
