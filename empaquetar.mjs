// Empaqueta dist/ en un unico HTML autocontenido, apto para publicar como Artifact.
// El Artifact envuelve el contenido en su propio <html><head><body>, asi que aca
// se emite solo el contenido del body mas <title>, <style> y <script>.
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'

const DIST = 'dist'
const assets = readdirSync(join(DIST, 'assets'))
const cssFile = assets.find((f) => f.endsWith('.css'))
const jsFile = assets.find((f) => f.endsWith('.js'))

const css = readFileSync(join(DIST, 'assets', cssFile), 'utf8')
const js = readFileSync(join(DIST, 'assets', jsFile), 'utf8')

const favicon = readFileSync('public/favicon.svg', 'utf8')
  .replace(/\n\s*/g, '')

// El @import de Google Fonts debe salir del <style> y volverse <link>:
// dentro de un <style> que no es el primero del documento, no siempre carga.
const IMPORT_FUENTES = /@import\s+(?:url\()?["'][^"']*fonts\.googleapis[^"']*["']\)?\s*;/g
const urlFuentes = (css.match(IMPORT_FUENTES) || [])
  .map((m) => (m.match(/["']([^"']+)["']/) || [])[1])
  .filter(Boolean)
const cssLimpio = css.replace(IMPORT_FUENTES, '')

const salida = `<title>TU MOMO Real Estate</title>
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
${urlFuentes.map((u) => `<link rel="stylesheet" href="${u}" />`).join('\n')}
<style>
${cssLimpio}
/* El Artifact aporta su propio contenedor: asegura que la app ocupe todo el alto */
html, body, #root { min-height: 100%; }
body { margin: 0; }
</style>

<div id="root"></div>

<script type="module">
${js}
</script>
`

writeFileSync('tumomo-v2-demo.html', salida)

const kb = (Buffer.byteLength(salida) / 1024).toFixed(0)
console.log(`tumomo-v2-demo.html generado — ${kb} KB`)
if (kb > 16000) console.log('AVISO: supera el limite de 16 MB del Artifact')
