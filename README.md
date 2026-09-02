# TU MOMO Real Estate — V2 (demo ejecutiva)

Prototipo navegable de la evolución de TuMomo: de portal inmobiliario a
ecosistema digital del Real Estate.

## Links

- **Repositorio:** https://github.com/jrf2000550-del/tumomo-v2 (privado)
- **Demo desplegada:** ver sección "Publicar en Vercel" más abajo

## Cómo levantarlo

```bash
npm install
npm run dev      # http://localhost:5173
```

Para compilar y desplegar (Vercel, igual que la V1):

```bash
npm run build    # genera dist/
```

## Verificar que la demo funciona

```bash
npm run dev                # en una terminal
node verificar-demo.mjs    # en otra
```

Recorre el guion completo en un navegador real y reporta errores de consola.

---

## Guion de la presentación

| # | Pantalla | Qué mostrar |
|---|----------|-------------|
| 1-3 | `/` | Escribir la consulta en el buscador. La interpretación aparece **en vivo** mientras se escribe. |
| 4 | `/buscar` | Chips de interpretación + resultados. Alternar **Lista / Mapa**. |
| 5-6 | Ficha de propiedad | Precio/m², rentabilidad, **comparables** con barras, verificación del agente. |
| 7-8 | Misma ficha | "¿Cómo quieres comprar?" → calculadora: mover los sliders. |
| 9-10 | Misma ficha | "Hablar con un agente" → completar → **el lead entra al CRM**. |
| 11-13 | `/pro/crm` → lead | El lead recién creado está ahí. Panel de IA → "Generar WhatsApp". |
| 14 | Mismo lead | "Agendar visita" → aparece en `/pro/calendario`. |
| 16-17 | `/construir` | Responder **No** a las 5 preguntas → TuMomo arma la ruta completa. |
| 18 | `/datos` | Inteligencia de mercado por zona. |
| 19-20 | `/global` | Visión futura y cierre: "Del portal al ecosistema". |

> La continuidad entre el lado consumidor y TuMomo Pro es el momento fuerte:
> una acción del comprador aparece de verdad en el CRM del agente.
> Se reinicia desde el botón "Reiniciar demo" en la barra lateral de Pro.

## Honestidad de la demo

Cada pantalla está etiquetada:

- **Funcional** — realmente funciona (búsqueda, filtros, calculadora, comparador, CRM, requerimientos, calendario).
- **Simulado** — experiencia conceptual con datos ficticios (IA, WhatsApp, Meta Ads, TuMomo Data).
- **Futuro** — roadmap (TuMomo Global, marketplace general).

Todos los datos son ficticios. No hay backend, autenticación ni integraciones reales.

## Estructura

```
src/
  data/demo.js        Dataset completo (27 propiedades, agentes, leads, etc.)
  lib/nlSearch.js     Intérprete de lenguaje natural (por reglas) + filtros
  lib/store.jsx       Estado compartido consumidor ↔ Pro
  components/         UI reutilizable, layouts, calculadora
  pages/              Pantallas del consumidor
  pages/pro/          Pantallas de TuMomo Pro
```

## Identidad visual

Se conserva la de la V1: amarillo `#f6c400`, rojo `#d7262e`, negro `#151515`,
fondo blanco, hero con rayas diagonales, subrayado amarillo en titulares,
ticker de insights, bloques amarillos sólidos y cards con sombra suave.
Tipografía: Archivo (titulares) + Inter (texto).

---


## Identidad de marca

Jerarquía de color definida por el cliente:

| # | Rol | Color | Uso |
|---|-----|-------|-----|
| 1 | Fondo | `#ffffff` | Blanco dominante en toda la interfaz |
| 2 | Texto / oscuro | `#111111` | Texto, precios, superficies oscuras, botón secundario |
| 3 | Secundario | `#ffc700` | Botones y destacados — **siempre con texto negro encima** |
| 4 | Acento | `#e02424` | Solo alertas (leads calientes). Uso escaso |

Complementarios funcionales: verde `#00915f` (verificado), azul `#1358d8`
(enlaces donde el amarillo no contrasta). Neutros cálidos, para acompañar al
amarillo.

- **Isotipo:** pin de ubicación amarillo con una casa negra calada. Sin
  contenedor, legible a 16 px. En `Isotipo` (`components/ui.jsx`) y
  `public/favicon.svg`.
- **Logotipo:** "tumomo" en Archivo ExtraBold, minúsculas, tracking cerrado.
- **Regla del amarillo:** nunca lleva texto blanco encima. El componente `Btn`
  con `variant="primary"` ya aplica amarillo + negro.

## Imágenes

Son **fotos reales de inmuebles de Santa Cruz**, tomadas de la carpeta de
descargas de José Luis y convertidas a WebP embebido (data URI) porque el
artifact publicado bloquea todo host externo.

- Origen: `fotos-origen/` (no se versiona; 35 fotos originales)
- Generado: `src/data/fotos.js` (36 fotos WebP, ~1,65 MB)
- Regenerar: `node procesar-fotos.mjs`

Se descartaron las fotos con marca de agua de terceros (RE/MAX Fortaleza,
Red Inmobiliaria, Lennar) para no mostrar la marca de un competidor en la
presentación.

Retratos de personas y logotipos de empresas siguen siendo generados en
`src/data/ilustraciones.js`, porque no hay material real para esos casos.

Para comprobar que ninguna imagen quedó rota o externa:

```bash
node verificar-imagenes.mjs   # revisa 200+ imágenes en 18 pantallas
```

## Publicar en Vercel

El proyecto ya trae `vercel.json` con la reescritura que necesita una SPA
(todas las rutas sirven `index.html`, para que `/buscar` o `/pro/crm` funcionen
al recargar la página).

**Opción recomendada — conectar el repo (se actualiza solo):**

1. Entrar a https://vercel.com/new
2. Importar `jrf2000550-del/tumomo-v2`
3. Vercel detecta Vite automáticamente: no hay que tocar configuración
4. Deploy

Desde ahí, cada `git push` republica el sitio solo.

**Opción rápida — desde la terminal:**

```bash
npx vercel login     # una sola vez
npx vercel --prod
```

Para comprobar que el sitio desplegado funciona de verdad:

```bash
node verificar-online.mjs https://tu-dominio.vercel.app
```

Revisa 9 rutas, cuenta las imágenes y reporta errores de JavaScript.
