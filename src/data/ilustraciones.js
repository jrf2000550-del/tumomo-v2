// ---------------------------------------------------------------------------
// Ilustraciones de inmuebles, generadas como SVG y embebidas como data URI.
// El artifact publicado bloquea todo host externo (solo admite Google Fonts),
// asi que cualquier foto remota queda en blanco. Estas ilustraciones viajan
// dentro del propio archivo: siempre cargan y siguen la paleta de marca.
// ---------------------------------------------------------------------------

const C = {
  cielo1: '#dbe9ff', cielo2: '#f2f7ff',
  cieloTarde1: '#ffe7c9', cieloTarde2: '#fff6ea',
  azul: '#0b5fff', azulOsc: '#0847c4', navy: '#0a2540', navySoft: '#14375c',
  ambar: '#f5a524', ambarSoft: '#ffd694',
  verde: '#00a870', verdeSoft: '#7fd9b8', verdeOsc: '#00815699',
  vidrio: '#9fc4f5', vidrioClaro: '#c9dEfa', muro: '#ffffff', muroSombra: '#e8eef6',
  suelo: '#eef2f7', asfalto: '#dbe3ec',
}

const svg = (contenido, w = 800, h = 600) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${contenido}</svg>`

const uri = (s) =>
  'data:image/svg+xml,' + encodeURIComponent(s.replace(/\s{2,}/g, ' ').trim())

const cielo = (id, a = C.cielo1, b = C.cielo2) => `
  <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${a}"/><stop offset="100%" stop-color="${b}"/>
  </linearGradient></defs>
  <rect width="800" height="600" fill="url(#${id})"/>`

const sol = (x, y, r = 34) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.ambarSoft}" opacity=".85"/>`

// Ventanas en retícula para las torres
const ventanas = (x, y, cols, filas, dw, dh, gap, color = C.vidrio) => {
  let s = ''
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < filas; j++) {
      const op = (i * 7 + j * 3) % 5 === 0 ? 0.45 : 0.9
      s += `<rect x="${x + i * (dw + gap)}" y="${y + j * (dh + gap)}" width="${dw}" height="${dh}" rx="2" fill="${color}" opacity="${op}"/>`
    }
  }
  return s
}

const arboles = (posiciones) => posiciones.map(([x, y, e]) => `
  <rect x="${x - 3 * e}" y="${y - 14 * e}" width="${6 * e}" height="${16 * e}" rx="2" fill="#b08159"/>
  <circle cx="${x}" cy="${y - 26 * e}" r="${17 * e}" fill="${C.verdeSoft}"/>
  <circle cx="${x - 11 * e}" cy="${y - 18 * e}" r="${12 * e}" fill="${C.verde}" opacity=".55"/>
  <circle cx="${x + 11 * e}" cy="${y - 19 * e}" r="${11 * e}" fill="${C.verde}" opacity=".45"/>`).join('')

// --- Torre / departamento ---------------------------------------------------

const torre = (variante = 0) => {
  const tarde = variante % 3 === 2
  const alturaExtra = (variante % 3) * 26
  const yTop = 120 - alturaExtra
  const alto = 400 + alturaExtra
  return svg(`
    ${cielo('c' + variante, tarde ? C.cieloTarde1 : C.cielo1, tarde ? C.cieloTarde2 : C.cielo2)}
    ${sol(660, 96, tarde ? 42 : 32)}
    <rect x="0" y="470" width="800" height="130" fill="${C.suelo}"/>
    <!-- torre secundaria -->
    <rect x="96" y="${yTop + 92}" width="150" height="${alto - 92}" rx="6" fill="${C.muroSombra}"/>
    ${ventanas(118, yTop + 122, 4, Math.floor((alto - 150) / 40), 22, 26, 10, C.vidrioClaro)}
    <!-- torre principal -->
    <rect x="268" y="${yTop}" width="266" height="${alto}" rx="8" fill="${C.muro}"/>
    <rect x="268" y="${yTop}" width="266" height="26" rx="8" fill="${C.navy}"/>
    ${ventanas(292, yTop + 46, 5, Math.floor((alto - 90) / 44), 34, 30, 12)}
    <!-- balcones -->
    <rect x="268" y="${yTop + 150}" width="266" height="6" fill="${C.azul}" opacity=".5"/>
    <rect x="268" y="${yTop + 282}" width="266" height="6" fill="${C.azul}" opacity=".5"/>
    <!-- torre lateral derecha -->
    <rect x="556" y="${yTop + 140}" width="140" height="${alto - 140}" rx="6" fill="${C.muroSombra}"/>
    ${ventanas(576, yTop + 168, 3, Math.floor((alto - 200) / 40), 26, 26, 12, C.vidrioClaro)}
    <!-- planta baja -->
    <rect x="268" y="440" width="266" height="30" fill="${C.navySoft}"/>
    <rect x="372" y="446" width="58" height="24" rx="3" fill="${C.ambar}"/>
    ${arboles([[80, 500, 1], [740, 505, 1.15], [176, 498, .8]])}
    <rect x="0" y="524" width="800" height="10" fill="${C.asfalto}"/>`)
}

// --- Casa -------------------------------------------------------------------

const casa = (variante = 0) => {
  const conPiscina = variante % 2 === 0
  return svg(`
    ${cielo('h' + variante)}
    ${sol(148, 92, 30)}
    <rect x="0" y="430" width="800" height="170" fill="${C.suelo}"/>
    <!-- volumen posterior -->
    <rect x="170" y="222" width="230" height="208" rx="6" fill="${C.muroSombra}"/>
    <!-- volumen principal -->
    <rect x="330" y="272" width="330" height="158" rx="6" fill="${C.muro}"/>
    <rect x="330" y="264" width="330" height="14" rx="4" fill="${C.navy}"/>
    <rect x="170" y="214" width="230" height="14" rx="4" fill="${C.navy}"/>
    <!-- ventanales -->
    <rect x="360" y="300" width="112" height="86" rx="3" fill="${C.vidrio}"/>
    <rect x="492" y="300" width="140" height="86" rx="3" fill="${C.vidrio}" opacity=".8"/>
    <line x1="416" y1="300" x2="416" y2="386" stroke="${C.muro}" stroke-width="4"/>
    <line x1="562" y1="300" x2="562" y2="386" stroke="${C.muro}" stroke-width="4"/>
    <rect x="200" y="252" width="76" height="64" rx="3" fill="${C.vidrioClaro}"/>
    <rect x="300" y="252" width="66" height="64" rx="3" fill="${C.vidrioClaro}"/>
    <!-- puerta -->
    <rect x="252" y="352" width="46" height="78" rx="3" fill="${C.navySoft}"/>
    <circle cx="290" cy="392" r="3" fill="${C.ambar}"/>
    ${conPiscina ? `
      <rect x="366" y="452" width="250" height="86" rx="10" fill="${C.azul}" opacity=".24"/>
      <rect x="380" y="464" width="222" height="62" rx="8" fill="${C.azul}" opacity=".45"/>
      <path d="M392 494 q22 -9 44 0 t44 0 t44 0 t44 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>` : `
      <rect x="366" y="470" width="250" height="60" rx="8" fill="${C.verdeSoft}" opacity=".5"/>`}
    ${arboles([[104, 470, 1.25], [700, 462, 1.1], [640, 486, .75]])}
    <rect x="0" y="556" width="800" height="12" fill="${C.asfalto}"/>`)
}

// --- Terreno ----------------------------------------------------------------

const terreno = (variante = 0) => svg(`
  ${cielo('t' + variante, '#e4f2e8', '#f6fbf8')}
  ${sol(660, 100, 30)}
  <rect x="0" y="360" width="800" height="240" fill="#e8f3ec"/>
  <path d="M0 360 Q200 330 400 356 T800 344 L800 380 L0 380 Z" fill="${C.verdeSoft}" opacity=".5"/>
  <!-- lote demarcado -->
  <path d="M148 470 L400 386 L664 470 L400 556 Z" fill="#fff" opacity=".75"/>
  <path d="M148 470 L400 386 L664 470 L400 556 Z" fill="none" stroke="${C.azul}" stroke-width="4" stroke-dasharray="14 9"/>
  ${[[148, 470], [400, 386], [664, 470], [400, 556]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="7" fill="${C.azul}"/><circle cx="${x}" cy="${y}" r="3" fill="#fff"/>`).join('')}
  <!-- cartel -->
  <rect x="576" y="290" width="8" height="88" fill="#b08159"/>
  <rect x="524" y="252" width="130" height="52" rx="6" fill="${C.azul}"/>
  <rect x="538" y="268" width="78" height="7" rx="3.5" fill="#fff" opacity=".95"/>
  <rect x="538" y="282" width="52" height="6" rx="3" fill="#fff" opacity=".6"/>
  ${arboles([[96, 420, 1.2], [724, 404, 1], [176, 392, .7]])}`)

// --- Oficina / corporativo --------------------------------------------------

const oficina = (variante = 0) => svg(`
  ${cielo('o' + variante, '#dde8f7', '#f4f8fd')}
  <rect x="0" y="486" width="800" height="114" fill="${C.suelo}"/>
  <rect x="128" y="150" width="216" height="336" rx="5" fill="${C.muroSombra}"/>
  ${ventanas(148, 176, 5, 7, 30, 32, 10, C.vidrioClaro)}
  <rect x="368" y="96" width="300" height="390" rx="6" fill="${C.navy}"/>
  ${ventanas(392, 128, 6, 8, 36, 32, 8, '#3f6da8')}
  <rect x="368" y="96" width="300" height="18" rx="6" fill="${C.azul}"/>
  <!-- acceso vidriado -->
  <rect x="440" y="416" width="156" height="70" rx="4" fill="${C.vidrio}" opacity=".9"/>
  <line x1="518" y1="416" x2="518" y2="486" stroke="${C.muro}" stroke-width="5"/>
  <rect x="368" y="404" width="300" height="8" fill="${C.azul}" opacity=".5"/>
  ${arboles([[76, 520, 1], [724, 524, 1.1]])}
  <rect x="0" y="540" width="800" height="12" fill="${C.asfalto}"/>`)

// --- Local comercial --------------------------------------------------------

const local = (variante = 0) => svg(`
  ${cielo('l' + variante, '#f0e7f8', '#fbf7fe')}
  <rect x="0" y="470" width="800" height="130" fill="${C.suelo}"/>
  <rect x="120" y="176" width="560" height="294" rx="6" fill="${C.muro}"/>
  <rect x="120" y="176" width="560" height="16" rx="5" fill="${C.navy}"/>
  <!-- toldo -->
  <path d="M120 250 L680 250 L680 296 L120 296 Z" fill="${C.azul}" opacity=".92"/>
  ${Array.from({ length: 8 }, (_, i) =>
    `<rect x="${120 + i * 70}" y="250" width="35" height="46" fill="#fff" opacity=".22"/>`).join('')}
  <!-- vidrieras -->
  <rect x="156" y="318" width="200" height="130" rx="4" fill="${C.vidrio}" opacity=".85"/>
  <rect x="446" y="318" width="196" height="130" rx="4" fill="${C.vidrio}" opacity=".7"/>
  <rect x="376" y="330" width="52" height="118" rx="3" fill="${C.navySoft}"/>
  <circle cx="418" cy="392" r="4" fill="${C.ambar}"/>
  <rect x="180" y="212" width="230" height="12" rx="6" fill="${C.navy}" opacity=".25"/>
  ${arboles([[726, 500, .95]])}
  <rect x="0" y="518" width="800" height="12" fill="${C.asfalto}"/>`)

// --- Proyecto en obra -------------------------------------------------------

const proyecto = (variante = 0) => svg(`
  ${cielo('p' + variante, '#dfeaff', '#f5f9ff')}
  ${sol(120, 92, 28)}
  <rect x="0" y="474" width="800" height="126" fill="${C.suelo}"/>
  <!-- grua -->
  <rect x="640" y="120" width="12" height="354" fill="${C.ambar}"/>
  <rect x="470" y="120" width="290" height="11" fill="${C.ambar}"/>
  <line x1="646" y1="120" x2="756" y2="90" stroke="${C.ambar}" stroke-width="4"/>
  <line x1="646" y1="120" x2="480" y2="92" stroke="${C.ambar}" stroke-width="4"/>
  <line x1="530" y1="131" x2="530" y2="212" stroke="${C.navy}" stroke-width="3"/>
  <rect x="512" y="212" width="38" height="30" rx="3" fill="${C.navySoft}"/>
  <!-- edificio en construccion -->
  <rect x="150" y="196" width="330" height="278" rx="5" fill="${C.muro}"/>
  ${Array.from({ length: 5 }, (_, j) =>
    `<rect x="150" y="${210 + j * 54}" width="330" height="5" fill="${C.muroSombra}"/>`).join('')}
  ${ventanas(174, 224, 5, 4, 42, 34, 14, C.vidrioClaro)}
  <!-- ultimos pisos sin cerrar -->
  <rect x="150" y="196" width="330" height="56" fill="${C.navy}" opacity=".08"/>
  ${Array.from({ length: 6 }, (_, i) =>
    `<rect x="${162 + i * 54}" y="196" width="7" height="56" fill="${C.navy}" opacity=".35"/>`).join('')}
  <!-- vallado -->
  ${Array.from({ length: 13 }, (_, i) =>
    `<rect x="${60 + i * 56}" y="452" width="46" height="26" rx="2" fill="${C.azul}" opacity="${i % 2 ? .35 : .55}"/>`).join('')}
  <rect x="0" y="520" width="800" height="12" fill="${C.asfalto}"/>`)

// ---------------------------------------------------------------------------

const GENERADORES = {
  Departamento: torre,
  Casa: casa,
  Terreno: terreno,
  Oficina: oficina,
  Local: local,
  Proyecto: proyecto,
}

/** Devuelve 3 ilustraciones (galeria) para un tipo de inmueble. */
export function ilustracionesDe(tipo, semilla = 0) {
  const gen = GENERADORES[tipo] || torre
  return [0, 1, 2].map((k) => uri(gen(semilla + k)))
}

/** Ilustracion suelta, para proyectos y cabeceras. */
export function ilustracion(tipo, semilla = 0) {
  const gen = GENERADORES[tipo] || torre
  return uri(gen(semilla))
}

// --- Retratos de personas ---------------------------------------------------

const PALETAS = [
  ['#0b5fff', '#eaf1ff'], ['#00a870', '#e6f7f1'], ['#f5a524', '#fff6e5'],
  ['#7c5cff', '#f0ecff'], ['#e0576b', '#ffeef1'], ['#0a2540', '#e8eef6'],
  ['#0e9f8e', '#e4f5f3'], ['#c2410c', '#fff0e8'],
]

const PELOS = ['#2b2118', '#4a3423', '#6b4a2f', '#1a1a1a', '#8a6240', '#3d2b1f']

/**
 * Retrato geometrico. Sustituye a pravatar.cc, que el artifact bloquea.
 * La semilla fija los rasgos para que cada persona se vea siempre igual.
 */
export function retrato(semilla = 0) {
  const [acento, fondo] = PALETAS[semilla % PALETAS.length]
  const pelo = PELOS[semilla % PELOS.length]
  const largo = semilla % 3 === 0
  const piel = ['#f0c9a8', '#e0ab84', '#c98d63', '#a86c46'][semilla % 4]

  return uri(svg(`
    <rect width="200" height="200" fill="${fondo}"/>
    <circle cx="100" cy="196" r="86" fill="${acento}" opacity=".22"/>
    ${largo ? `<path d="M46 118 Q46 56 100 56 Q154 56 154 118 L154 154 L46 154 Z" fill="${pelo}"/>` : ''}
    <!-- hombros -->
    <path d="M40 200 Q40 146 100 146 Q160 146 160 200 Z" fill="${acento}"/>
    <path d="M84 128 h32 v30 h-32 Z" fill="${piel}"/>
    <!-- cabeza -->
    <ellipse cx="100" cy="98" rx="36" ry="41" fill="${piel}"/>
    <!-- cabello -->
    <path d="M62 92 Q62 52 100 52 Q138 52 138 92 Q138 74 100 74 Q62 74 62 92 Z" fill="${pelo}"/>
    <ellipse cx="88" cy="98" rx="3.4" ry="4" fill="${C.navy}"/>
    <ellipse cx="112" cy="98" rx="3.4" ry="4" fill="${C.navy}"/>
    <path d="M91 116 q9 7 18 0" stroke="${C.navy}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".65"/>
  `, 200, 200))
}

// --- Logotipos de empresa ---------------------------------------------------

export function logoEmpresa(iniciales, semilla = 0) {
  const [acento, fondo] = PALETAS[semilla % PALETAS.length]
  return uri(svg(`
    <rect width="120" height="120" rx="26" fill="${fondo}"/>
    <path d="M60 26 L96 56 V58 H88 V88 Q88 92 84 92 H70 V72 H50 V92 H36 Q32 92 32 88 V58 H24 V56 Z" fill="${acento}"/>
    <text x="60" y="112" font-family="Archivo, sans-serif" font-size="17" font-weight="800"
          fill="${acento}" text-anchor="middle" opacity=".85">${iniciales}</text>
  `, 120, 120))
}
