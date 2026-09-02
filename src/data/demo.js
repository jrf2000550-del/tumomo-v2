// ---------------------------------------------------------------------------
// DATASET DE DEMOSTRACION - TuMomo V2
// Todos los datos de este archivo son ficticios y existen solo para la demo
// ejecutiva. Nombres, precios, tasas y metricas NO corresponden a personas,
// entidades ni operaciones reales.
// ---------------------------------------------------------------------------

export const ZONAS = [
  'Equipetrol',
  'Equipetrol Norte',
  'Urubó',
  'Sirari',
  'Norte',
  'Las Palmas',
  'Santos Dumont',
  'Centro',
]

export const TIPOS = ['Casa', 'Departamento', 'Terreno', 'Oficina', 'Local', 'Proyecto']

export const FORMAS_COMPRA = ['Contado', 'Crédito bancario', 'Crédito directo', 'Preventa']

export const OBJETIVOS = ['Vivir', 'Invertir', 'Alquilar']

// Precio promedio por m2 de cada zona (dato demo, usado en comparables)
export const PRECIO_M2_ZONA = {
  'Equipetrol': 1520,
  'Equipetrol Norte': 1480,
  'Urubó': 890,
  'Sirari': 1610,
  'Norte': 1180,
  'Las Palmas': 1340,
  'Santos Dumont': 1050,
  'Centro': 1220,
}

import { retrato, logoEmpresa } from './ilustraciones'
import { fotosDe, fotoDe } from './fotos'

// Fotos reales de inmuebles de Santa Cruz, embebidas como data URI: el artifact
// publicado bloquea cualquier host externo. Los retratos y logotipos siguen
// siendo generados, porque no hay material real de personas para la demo.
const img = (tipo, semilla = 0) => fotoDe(tipo, semilla)

const galeria = (tipo, i) => fotosDe(tipo, i)

// ---------------------------------------------------------------------------
// AGENTES
// ---------------------------------------------------------------------------

export const AGENTES = [
  { id: 'ag-1', nombre: 'Carlos Mendoza', inmobiliaria: 'in-1', zonas: ['Equipetrol', 'Equipetrol Norte'], anios: 12, rating: 4.9, resenas: 47, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Departamentos y preventa', telefono: '+591 700 11 002', foto: retrato(12), bio: 'Especialista en departamentos de obra nueva y preventa en el corredor Equipetrol. Acompaño al cliente desde la búsqueda hasta la firma.' },
  { id: 'ag-2', nombre: 'Valeria Áñez', inmobiliaria: 'in-2', zonas: ['Urubó', 'Las Palmas'], anios: 8, rating: 4.8, resenas: 33, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Casas en condominio', telefono: '+591 700 11 003', foto: retrato(45), bio: 'Trabajo condominios cerrados del Urubó. Conozco cada etapa, cada expensa y cada tiempo de entrega.' },
  { id: 'ag-3', nombre: 'Rodrigo Salvatierra', inmobiliaria: 'in-1', zonas: ['Sirari', 'Equipetrol'], anios: 15, rating: 4.9, resenas: 61, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Alto valor e inversión', telefono: '+591 700 11 004', foto: retrato(33), bio: 'Portafolio premium y asesoría de inversión inmobiliaria con análisis de rentabilidad.' },
  { id: 'ag-4', nombre: 'Daniela Justiniano', inmobiliaria: 'in-3', zonas: ['Norte', 'Santos Dumont'], anios: 6, rating: 4.7, resenas: 24, verificadoIdentidad: true, verificadoEmpresa: false, especialidad: 'Primera vivienda', telefono: '+591 700 11 005', foto: retrato(47), bio: 'Ayudo a familias jóvenes a comprar su primera vivienda con crédito bancario.' },
  { id: 'ag-5', nombre: 'Marcelo Vaca', inmobiliaria: 'in-2', zonas: ['Urubó', 'Norte'], anios: 10, rating: 4.6, resenas: 29, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Terrenos y loteamientos', telefono: '+591 700 11 006', foto: retrato(52), bio: 'Terrenos urbanizados y suelo con proyección para desarrollo.' },
  { id: 'ag-6', nombre: 'Andrea Suárez', inmobiliaria: 'in-4', zonas: ['Centro', 'Equipetrol'], anios: 9, rating: 4.8, resenas: 38, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Oficinas y corporativo', telefono: '+591 700 11 007', foto: retrato(44), bio: 'Espacios corporativos, oficinas y locales comerciales en zonas de alto flujo.' },
  { id: 'ag-7', nombre: 'Javier Roca', inmobiliaria: 'in-3', zonas: ['Equipetrol Norte', 'Sirari'], anios: 7, rating: 4.5, resenas: 19, verificadoIdentidad: true, verificadoEmpresa: false, especialidad: 'Alquileres amoblados', telefono: '+591 700 11 008', foto: retrato(59), bio: 'Alquileres amoblados y renta corta para ejecutivos.' },
  { id: 'ag-8', nombre: 'Paola Gutiérrez', inmobiliaria: 'in-5', zonas: ['Las Palmas', 'Urubó'], anios: 11, rating: 4.9, resenas: 42, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Familias y condominios', telefono: '+591 700 11 009', foto: retrato(32), bio: 'Casas familiares en condominios con seguridad y áreas comunes.' },
  { id: 'ag-9', nombre: 'Sergio Landívar', inmobiliaria: 'in-4', zonas: ['Norte', 'Centro'], anios: 5, rating: 4.4, resenas: 14, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Locales comerciales', telefono: '+591 700 11 010', foto: retrato(68), bio: 'Locales comerciales y galpones sobre avenidas principales.' },
  { id: 'ag-10', nombre: 'Camila Ortiz', inmobiliaria: 'in-5', zonas: ['Equipetrol', 'Sirari'], anios: 4, rating: 4.7, resenas: 16, verificadoIdentidad: true, verificadoEmpresa: true, especialidad: 'Inversión de ticket bajo', telefono: '+591 700 11 011', foto: retrato(41), bio: 'Preventa y unidades de inversión con ticket inicial accesible.' },
]

// ---------------------------------------------------------------------------
// INMOBILIARIAS
// ---------------------------------------------------------------------------

export const INMOBILIARIAS = [
  { id: 'in-1', nombre: 'Urubó Living', verificada: true, anios: 14, zonas: ['Equipetrol', 'Equipetrol Norte', 'Sirari'], rating: 4.9, resenas: 128, logo: logoEmpresa('UL', 0), descripcion: 'Inmobiliaria enfocada en producto residencial premium del corredor Equipetrol.' },
  { id: 'in-2', nombre: 'Santa Cruz Propiedades', verificada: true, anios: 18, zonas: ['Urubó', 'Las Palmas', 'Norte'], rating: 4.7, resenas: 96, logo: logoEmpresa('SC', 1), descripcion: 'Una de las carteras más amplias de condominios y terrenos del Urubó.' },
  { id: 'in-3', nombre: 'Nova Bienes Raíces', verificada: true, anios: 7, zonas: ['Norte', 'Santos Dumont', 'Equipetrol Norte'], rating: 4.6, resenas: 54, logo: logoEmpresa('NB', 2), descripcion: 'Especialistas en primera vivienda y acompañamiento de crédito bancario.' },
  { id: 'in-4', nombre: 'Corporativo Oriente', verificada: true, anios: 11, zonas: ['Centro', 'Equipetrol', 'Norte'], rating: 4.8, resenas: 71, logo: logoEmpresa('CO', 3), descripcion: 'Oficinas, locales y activos comerciales para empresas.' },
  { id: 'in-5', nombre: 'Momentum Realty', verificada: true, anios: 6, zonas: ['Las Palmas', 'Urubó', 'Sirari'], rating: 4.8, resenas: 45, logo: logoEmpresa('MR', 4), descripcion: 'Boutique inmobiliaria con foco en inversión y preventa.' },
]

// ---------------------------------------------------------------------------
// PROPIEDADES (24)
// ---------------------------------------------------------------------------

const P = (o) => {
  const precioM2 = o.tipo === 'Terreno'
    ? Math.round(o.precio / o.superficie)
    : Math.round(o.precio / o.superficie)
  return { ...o, precioM2 }
}

export const PROPIEDADES = [
  P({ id: 'p-1', nombre: 'Departamento Sky Moon', tipo: 'Departamento', operacion: 'Comprar', zona: 'Equipetrol Norte', ciudad: 'Santa Cruz', precio: 150000, superficie: 105, dorm: 2, banos: 2, parqueos: 2, estado: 'Nuevo', objetivo: ['Vivir', 'Invertir'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 900, agente: 'ag-1', destacada: true, lat: 42, lng: 58, etiquetas: ['Nuevo', 'Crédito directo'], descripcion: 'Departamento de estreno en torre con amenities completos: piscina, gimnasio, coworking y seguridad 24/7. Dos dormitorios en suite, cocina equipada y balcón con vista abierta.', amenities: ['Piscina', 'Gimnasio', 'Coworking', 'Seguridad 24/7', 'Parrillero', 'Ascensor'] }),
  P({ id: 'p-2', nombre: 'Casa moderna con piscina', tipo: 'Casa', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 385000, superficie: 280, dorm: 4, banos: 4, parqueos: 3, estado: 'Nuevo', objetivo: ['Vivir'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 2100, agente: 'ag-3', destacada: true, lat: 55, lng: 46, etiquetas: ['Nuevo', 'Piscina'], descripcion: 'Casa de diseño contemporáneo con piscina, jardín y espacios de doble altura. Cuatro suites, sala de estar independiente y quincho.', amenities: ['Piscina', 'Jardín', 'Quincho', 'Doble altura', 'Lavandería'] }),
  P({ id: 'p-3', nombre: 'Departamento en condominio cerrado', tipo: 'Departamento', operacion: 'Comprar', zona: 'Urubó', ciudad: 'Santa Cruz', precio: 168000, superficie: 118, dorm: 3, banos: 2, parqueos: 2, estado: 'Nuevo', objetivo: ['Vivir', 'Invertir'], formas: ['Crédito bancario', 'Crédito directo'], alquilerEstimado: 950, agente: 'ag-2', destacada: true, lat: 30, lng: 22, etiquetas: ['Condominio', 'Crédito directo'], descripcion: 'Unidad en condominio cerrado del Urubó con áreas verdes, seguridad y club house. Ideal para familias.', amenities: ['Club house', 'Áreas verdes', 'Seguridad 24/7', 'Cancha'] }),
  P({ id: 'p-4', nombre: 'Departamento amoblado premium', tipo: 'Departamento', operacion: 'Alquilar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 650, superficie: 78, dorm: 2, banos: 2, parqueos: 1, estado: 'Usado', objetivo: ['Vivir'], formas: ['Contado'], alquilerEstimado: 650, agente: 'ag-7', destacada: true, lat: 52, lng: 50, etiquetas: ['Amoblado'], descripcion: 'Departamento completamente amoblado y equipado, listo para mudarse. Incluye expensas.', amenities: ['Amoblado', 'Piscina', 'Gimnasio', 'Seguridad 24/7'] }),
  P({ id: 'p-5', nombre: 'Casa familiar en condominio', tipo: 'Casa', operacion: 'Comprar', zona: 'Las Palmas', ciudad: 'Santa Cruz', precio: 295000, superficie: 310, dorm: 4, banos: 3, parqueos: 2, estado: 'Usado', objetivo: ['Vivir'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 1600, agente: 'ag-8', destacada: true, lat: 62, lng: 34, etiquetas: ['Condominio'], descripcion: 'Casa de dos plantas en condominio consolidado, con patio amplio y parrillero.', amenities: ['Jardín', 'Parrillero', 'Seguridad 24/7', 'Áreas verdes'] }),
  P({ id: 'p-6', nombre: 'Departamento en preventa', tipo: 'Departamento', operacion: 'Comprar', zona: 'Equipetrol Norte', ciudad: 'Santa Cruz', precio: 78000, superficie: 62, dorm: 2, banos: 2, parqueos: 1, estado: 'Preventa', objetivo: ['Invertir'], formas: ['Preventa', 'Crédito directo'], alquilerEstimado: 520, agente: 'ag-10', destacada: true, lat: 40, lng: 62, etiquetas: ['Preventa', 'Ticket bajo'], descripcion: 'Unidad en preventa con plan de pagos durante la obra. Entrega estimada en 18 meses.', amenities: ['Piscina', 'Gimnasio', 'Coworking'] }),
  P({ id: 'p-7', nombre: 'Proyecto Condominio Alto Urubó', tipo: 'Proyecto', operacion: 'Comprar', zona: 'Urubó', ciudad: 'Santa Cruz', precio: 115000, superficie: 130, dorm: 3, banos: 3, parqueos: 2, estado: 'En construcción', objetivo: ['Vivir', 'Invertir'], formas: ['Preventa', 'Crédito directo', 'Crédito bancario'], alquilerEstimado: 780, agente: 'ag-2', destacada: true, lat: 26, lng: 18, etiquetas: ['Proyecto', 'Preventa'], descripcion: 'Condominio cerrado en desarrollo con 48 unidades, club house y seguridad perimetral.', amenities: ['Club house', 'Piscina', 'Cancha', 'Seguridad 24/7', 'Áreas verdes'] }),
  P({ id: 'p-8', nombre: 'Terreno urbanizado en Urubó', tipo: 'Terreno', operacion: 'Comprar', zona: 'Urubó', ciudad: 'Santa Cruz', precio: 68000, superficie: 600, dorm: 0, banos: 0, parqueos: 0, estado: 'Nuevo', objetivo: ['Invertir'], formas: ['Contado', 'Crédito directo'], alquilerEstimado: 0, agente: 'ag-5', lat: 22, lng: 28, etiquetas: ['Urbanizado', 'Crédito directo'], descripcion: 'Terreno en urbanización con servicios completos, listo para construir.', amenities: ['Agua', 'Luz', 'Calles asfaltadas', 'Seguridad'] }),
  P({ id: 'p-9', nombre: 'Oficina corporativa Equipetrol', tipo: 'Oficina', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 195000, superficie: 120, dorm: 0, banos: 2, parqueos: 3, estado: 'Nuevo', objetivo: ['Invertir', 'Alquilar'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 1400, agente: 'ag-6', lat: 50, lng: 54, etiquetas: ['Corporativo', 'Alta renta'], descripcion: 'Oficina en torre corporativa con recepción, sala de reuniones y estacionamientos.', amenities: ['Recepción', 'Ascensor', 'Aire acondicionado', 'Seguridad 24/7'] }),
  P({ id: 'p-10', nombre: 'Local comercial sobre avenida', tipo: 'Local', operacion: 'Alquilar', zona: 'Norte', ciudad: 'Santa Cruz', precio: 1200, superficie: 150, dorm: 0, banos: 2, parqueos: 4, estado: 'Usado', objetivo: ['Alquilar'], formas: ['Contado'], alquilerEstimado: 1200, agente: 'ag-9', lat: 68, lng: 62, etiquetas: ['Alto flujo'], descripcion: 'Local sobre avenida principal con vidriera amplia y alto flujo peatonal.', amenities: ['Vitrina', 'Depósito', 'Baño', 'Estacionamiento'] }),
  P({ id: 'p-11', nombre: 'Departamento vista al río', tipo: 'Departamento', operacion: 'Comprar', zona: 'Sirari', ciudad: 'Santa Cruz', precio: 245000, superficie: 145, dorm: 3, banos: 3, parqueos: 2, estado: 'Nuevo', objetivo: ['Vivir'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 1500, agente: 'ag-3', lat: 58, lng: 40, etiquetas: ['Nuevo', 'Vista panorámica'], descripcion: 'Piso alto con vista despejada, terminaciones premium y balcón corrido.', amenities: ['Piscina', 'Gimnasio', 'Sauna', 'Seguridad 24/7', 'Ascensor'] }),
  P({ id: 'p-12', nombre: 'Casa en Santos Dumont', tipo: 'Casa', operacion: 'Comprar', zona: 'Santos Dumont', ciudad: 'Santa Cruz', precio: 132000, superficie: 180, dorm: 3, banos: 2, parqueos: 2, estado: 'Usado', objetivo: ['Vivir'], formas: ['Crédito bancario', 'Contado'], alquilerEstimado: 720, agente: 'ag-4', lat: 72, lng: 44, etiquetas: ['Primera vivienda'], descripcion: 'Casa en barrio consolidado, cerca de colegios y comercios. Apta para crédito de vivienda social.', amenities: ['Patio', 'Parrillero', 'Lavandería'] }),
  P({ id: 'p-13', nombre: 'Departamento estudio céntrico', tipo: 'Departamento', operacion: 'Alquilar', zona: 'Centro', ciudad: 'Santa Cruz', precio: 380, superficie: 42, dorm: 1, banos: 1, parqueos: 0, estado: 'Usado', objetivo: ['Vivir'], formas: ['Contado'], alquilerEstimado: 380, agente: 'ag-7', lat: 60, lng: 70, etiquetas: ['Céntrico', 'Ticket bajo'], descripcion: 'Monoambiente funcional en pleno centro, ideal para estudiantes o profesionales.', amenities: ['Amoblado', 'Ascensor'] }),
  P({ id: 'p-14', nombre: 'Casa quinta en Urubó', tipo: 'Casa', operacion: 'Comprar', zona: 'Urubó', ciudad: 'Santa Cruz', precio: 420000, superficie: 450, dorm: 5, banos: 5, parqueos: 4, estado: 'Nuevo', objetivo: ['Vivir'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 2400, agente: 'ag-8', lat: 18, lng: 24, etiquetas: ['Premium', 'Piscina'], descripcion: 'Casa quinta con amplio terreno, piscina, quincho y sector de servicio independiente.', amenities: ['Piscina', 'Quincho', 'Jardín', 'Dependencia', 'Seguridad 24/7'] }),
  P({ id: 'p-15', nombre: 'Terreno comercial Norte', tipo: 'Terreno', operacion: 'Comprar', zona: 'Norte', ciudad: 'Santa Cruz', precio: 145000, superficie: 800, dorm: 0, banos: 0, parqueos: 0, estado: 'Nuevo', objetivo: ['Invertir'], formas: ['Contado', 'Crédito directo'], alquilerEstimado: 0, agente: 'ag-5', lat: 74, lng: 56, etiquetas: ['Comercial', 'Esquina'], descripcion: 'Terreno esquinero sobre vía principal, apto para desarrollo comercial.', amenities: ['Servicios completos', 'Esquina', 'Frente amplio'] }),
  P({ id: 'p-16', nombre: 'Departamento 1 dormitorio Equipetrol', tipo: 'Departamento', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 95000, superficie: 58, dorm: 1, banos: 1, parqueos: 1, estado: 'Nuevo', objetivo: ['Invertir', 'Alquilar'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 620, agente: 'ag-10', lat: 48, lng: 52, etiquetas: ['Nuevo', 'Alta renta'], descripcion: 'Unidad compacta de alta demanda para renta, en zona con ocupación sostenida.', amenities: ['Piscina', 'Gimnasio', 'Seguridad 24/7'] }),
  P({ id: 'p-17', nombre: 'Oficina boutique Centro', tipo: 'Oficina', operacion: 'Alquilar', zona: 'Centro', ciudad: 'Santa Cruz', precio: 850, superficie: 85, dorm: 0, banos: 1, parqueos: 2, estado: 'Usado', objetivo: ['Alquilar'], formas: ['Contado'], alquilerEstimado: 850, agente: 'ag-6', lat: 64, lng: 68, etiquetas: ['Céntrico'], descripcion: 'Oficina en edificio corporativo con recepción compartida.', amenities: ['Recepción', 'Ascensor', 'Aire acondicionado'] }),
  P({ id: 'p-18', nombre: 'Proyecto Torre Vitalis', tipo: 'Proyecto', operacion: 'Comprar', zona: 'Equipetrol Norte', ciudad: 'Santa Cruz', precio: 128000, superficie: 88, dorm: 2, banos: 2, parqueos: 1, estado: 'En construcción', objetivo: ['Invertir', 'Vivir'], formas: ['Preventa', 'Crédito directo'], alquilerEstimado: 760, agente: 'ag-1', lat: 38, lng: 60, etiquetas: ['Proyecto', 'Preventa', 'Crédito directo'], descripcion: 'Torre de 14 pisos con amenities de nueva generación. Plan de pagos durante obra.', amenities: ['Piscina', 'Gimnasio', 'Coworking', 'Rooftop', 'Seguridad 24/7'] }),
  P({ id: 'p-19', nombre: 'Casa en Sirari', tipo: 'Casa', operacion: 'Comprar', zona: 'Sirari', ciudad: 'Santa Cruz', precio: 340000, superficie: 240, dorm: 4, banos: 4, parqueos: 3, estado: 'Usado', objetivo: ['Vivir'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 1900, agente: 'ag-3', lat: 56, lng: 38, etiquetas: ['Premium'], descripcion: 'Residencia en barrio consolidado de alto valor, con jardín y sector social amplio.', amenities: ['Jardín', 'Quincho', 'Dependencia', 'Lavandería'] }),
  P({ id: 'p-20', nombre: 'Departamento 3 dorm Norte', tipo: 'Departamento', operacion: 'Comprar', zona: 'Norte', ciudad: 'Santa Cruz', precio: 118000, superficie: 112, dorm: 3, banos: 2, parqueos: 1, estado: 'Usado', objetivo: ['Vivir'], formas: ['Crédito bancario', 'Contado'], alquilerEstimado: 680, agente: 'ag-4', lat: 70, lng: 58, etiquetas: ['Familiar'], descripcion: 'Departamento amplio para familia, en edificio con ascensor y seguridad.', amenities: ['Ascensor', 'Seguridad 24/7', 'Parrillero'] }),
  P({ id: 'p-21', nombre: 'Terreno en Las Palmas', tipo: 'Terreno', operacion: 'Comprar', zona: 'Las Palmas', ciudad: 'Santa Cruz', precio: 92000, superficie: 500, dorm: 0, banos: 0, parqueos: 0, estado: 'Nuevo', objetivo: ['Invertir', 'Vivir'], formas: ['Contado', 'Crédito directo'], alquilerEstimado: 0, agente: 'ag-5', lat: 66, lng: 30, etiquetas: ['Urbanizado'], descripcion: 'Lote en condominio cerrado con servicios y áreas comunes.', amenities: ['Servicios completos', 'Seguridad', 'Áreas verdes'] }),
  P({ id: 'p-22', nombre: 'Local en galería Equipetrol', tipo: 'Local', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 88000, superficie: 55, dorm: 0, banos: 1, parqueos: 1, estado: 'Usado', objetivo: ['Invertir', 'Alquilar'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 700, agente: 'ag-9', lat: 46, lng: 48, etiquetas: ['Alta renta'], descripcion: 'Local en galería consolidada con flujo constante de público.', amenities: ['Vitrina', 'Aire acondicionado', 'Seguridad'] }),
  P({ id: 'p-23', nombre: 'Departamento dúplex Sirari', tipo: 'Departamento', operacion: 'Comprar', zona: 'Sirari', ciudad: 'Santa Cruz', precio: 198000, superficie: 132, dorm: 3, banos: 3, parqueos: 2, estado: 'Nuevo', objetivo: ['Vivir', 'Invertir'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 1200, agente: 'ag-10', lat: 54, lng: 36, etiquetas: ['Nuevo', 'Dúplex'], descripcion: 'Dúplex de dos niveles con terraza propia y terminaciones de primera.', amenities: ['Terraza', 'Piscina', 'Gimnasio', 'Seguridad 24/7'] }),
  P({ id: 'p-24', nombre: 'Proyecto Sky Eclipse', tipo: 'Proyecto', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 172000, superficie: 135, dorm: 3, banos: 2, parqueos: 2, estado: 'En construcción', objetivo: ['Vivir', 'Invertir'], formas: ['Preventa', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 1050, agente: 'ag-1', lat: 44, lng: 44, etiquetas: ['Proyecto', 'Preventa'], descripcion: 'Torre de departamentos con rooftop, piscina panorámica y coworking. Entrega estimada 2027.', amenities: ['Rooftop', 'Piscina', 'Coworking', 'Gimnasio', 'Seguridad 24/7'] }),
  P({ id: 'p-25', nombre: 'Departamento Torre Aurora', tipo: 'Departamento', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 142000, superficie: 96, dorm: 2, banos: 2, parqueos: 1, estado: 'Nuevo', objetivo: ['Vivir', 'Invertir'], formas: ['Contado', 'Crédito bancario', 'Crédito directo'], alquilerEstimado: 870, agente: 'ag-3', lat: 51, lng: 47, etiquetas: ['Nuevo', 'Crédito directo'], descripcion: 'Departamento de dos dormitorios en suite con balcón y cocina equipada, en torre con amenities completos.', amenities: ['Piscina', 'Gimnasio', 'Seguridad 24/7', 'Ascensor', 'Parrillero'] }),
  P({ id: 'p-26', nombre: 'Departamento Vista Equipetrol', tipo: 'Departamento', operacion: 'Comprar', zona: 'Equipetrol', ciudad: 'Santa Cruz', precio: 128000, superficie: 88, dorm: 2, banos: 2, parqueos: 1, estado: 'Nuevo', objetivo: ['Vivir', 'Invertir'], formas: ['Contado', 'Crédito bancario'], alquilerEstimado: 790, agente: 'ag-10', lat: 47, lng: 55, etiquetas: ['Nuevo', 'Entrega inmediata'], descripcion: 'Unidad de estreno con excelente distribución, lista para entrega inmediata.', amenities: ['Piscina', 'Gimnasio', 'Coworking', 'Seguridad 24/7'] }),
  P({ id: 'p-27', nombre: 'Casa en condominio Urubó', tipo: 'Casa', operacion: 'Comprar', zona: 'Urubó', ciudad: 'Santa Cruz', precio: 189000, superficie: 210, dorm: 3, banos: 3, parqueos: 2, estado: 'Nuevo', objetivo: ['Vivir'], formas: ['Crédito directo', 'Crédito bancario', 'Contado'], alquilerEstimado: 1100, agente: 'ag-2', lat: 24, lng: 20, etiquetas: ['Condominio', 'Crédito directo'], descripcion: 'Casa de estreno en condominio cerrado con club house, financiada directamente por la desarrolladora.', amenities: ['Club house', 'Piscina', 'Áreas verdes', 'Seguridad 24/7', 'Parrillero'] }),
].map((p, i) => ({ ...p, fotos: galeria(p.tipo, i) }))

// ---------------------------------------------------------------------------
// PROYECTOS (fichas de desarrollo)
// ---------------------------------------------------------------------------

export const PROYECTOS = [
  { id: 'pr-1', nombre: 'Torre Vitalis', zona: 'Equipetrol Norte', desarrolladora: 'InfoArch Desarrollos', unidades: 84, disponibles: 31, entrega: 'Dic 2027', desde: 128000, avance: 35, foto: fotoDe('Proyecto', 3), etiquetas: ['Preventa', 'Crédito directo'] },
  { id: 'pr-2', nombre: 'Sky Eclipse', zona: 'Equipetrol', desarrolladora: 'Grupo Meridiano', unidades: 120, disponibles: 58, entrega: 'Jun 2027', desde: 172000, avance: 22, foto: fotoDe('Proyecto', 4), etiquetas: ['Preventa', 'Rooftop'] },
  { id: 'pr-3', nombre: 'Condominio Alto Urubó', zona: 'Urubó', desarrolladora: 'Urubó Living', unidades: 48, disponibles: 12, entrega: 'Mar 2027', desde: 115000, avance: 61, foto: fotoDe('Proyecto', 5), etiquetas: ['Condominio', 'En obra'] },
  { id: 'pr-4', nombre: 'Residencial Las Palmas', zona: 'Las Palmas', desarrolladora: 'Constructora Andina', unidades: 36, disponibles: 9, entrega: 'Sep 2026', desde: 98000, avance: 78, foto: fotoDe('Casa', 6), etiquetas: ['Casas', 'Entrega próxima'] },
  { id: 'pr-5', nombre: 'Corporativo Sirari', zona: 'Sirari', desarrolladora: 'Grupo Meridiano', unidades: 42, disponibles: 27, entrega: 'Feb 2028', desde: 145000, avance: 12, foto: fotoDe('Oficina', 7), etiquetas: ['Oficinas', 'Preventa'] },
]

// ---------------------------------------------------------------------------
// PROFESIONALES DEL ECOSISTEMA
// ---------------------------------------------------------------------------

export const CATEGORIAS_PRO = [
  'Agentes', 'Inmobiliarias', 'Arquitectos', 'Constructoras', 'Abogados',
  'Valuadores', 'Bancos', 'Seguros', 'Interioristas', 'Paisajistas',
  'Administradores', 'Fotógrafos', 'Videógrafos', 'Mantenimiento',
]

export const PROFESIONALES = [
  { id: 'pf-1', nombre: 'Estudio Arq. Céspedes', categoria: 'Arquitectos', verificado: true, rating: 4.9, resenas: 34, anios: 16, servicios: ['Diseño arquitectónico', 'Planos municipales', 'Dirección de obra'], desde: 'Desde $12/m²', foto: fotoDe('Proyecto', 8), avatar: retrato(13), bio: 'Estudio de arquitectura residencial con más de 90 proyectos ejecutados en Santa Cruz.' },
  { id: 'pf-2', nombre: 'Constructora Andina', categoria: 'Constructoras', verificado: true, rating: 4.7, resenas: 28, anios: 22, servicios: ['Obra gruesa', 'Llave en mano', 'Remodelación'], desde: 'Desde $480/m²', foto: fotoDe('Proyecto', 9), avatar: retrato(51), bio: 'Constructora con capacidad para vivienda unifamiliar y edificios de mediana altura.' },
  { id: 'pf-3', nombre: 'Dra. Lorena Peña', categoria: 'Abogados', verificado: true, rating: 4.8, resenas: 41, anios: 13, servicios: ['Derecho inmobiliario', 'Minutas y transferencias', 'Due diligence'], desde: 'Desde $150', foto: fotoDe('Proyecto', 10), avatar: retrato(25), bio: 'Especialista en saneamiento de documentación y transferencias inmobiliarias.' },
  { id: 'pf-4', nombre: 'ValuaPro Tasaciones', categoria: 'Valuadores', verificado: true, rating: 4.6, resenas: 19, anios: 9, servicios: ['Tasación bancaria', 'Peritaje', 'Informe de valor'], desde: 'Desde $120', foto: fotoDe('Casa', 11), avatar: retrato(60), bio: 'Tasaciones aceptadas por las principales entidades financieras del país.' },
  { id: 'pf-5', nombre: 'Casa Nova Interiores', categoria: 'Interioristas', verificado: true, rating: 4.9, resenas: 26, anios: 8, servicios: ['Diseño de interiores', 'Amoblamiento', 'Home staging'], desde: 'Desde $2.500', foto: fotoDe('Oficina', 12), avatar: retrato(29), bio: 'Interiorismo residencial y home staging para acelerar la venta de propiedades.' },
  { id: 'pf-6', nombre: 'Verde Paisajismo', categoria: 'Paisajistas', verificado: false, rating: 4.5, resenas: 12, anios: 6, servicios: ['Diseño de jardines', 'Riego automatizado', 'Mantenimiento'], desde: 'Desde $1.800', foto: fotoDe('Proyecto', 13), avatar: retrato(64), bio: 'Diseño y mantenimiento de jardines residenciales y áreas comunes.' },
  { id: 'pf-7', nombre: 'AdminCondominios SC', categoria: 'Administradores', verificado: true, rating: 4.4, resenas: 22, anios: 11, servicios: ['Administración de condominios', 'Cobranza de expensas', 'Reportes'], desde: 'Desde $350/mes', foto: fotoDe('Proyecto', 14), avatar: retrato(53), bio: 'Administración profesional de condominios y edificios residenciales.' },
  { id: 'pf-8', nombre: 'Foco Studio', categoria: 'Fotógrafos', verificado: true, rating: 4.8, resenas: 37, anios: 7, servicios: ['Fotografía inmobiliaria', 'Tour 360°', 'Drone'], desde: 'Desde $180', foto: fotoDe('Proyecto', 15), avatar: retrato(15), bio: 'Fotografía y tours virtuales especializados en propiedades.' },
  { id: 'pf-9', nombre: 'Altura Films', categoria: 'Videógrafos', verificado: true, rating: 4.7, resenas: 18, anios: 5, servicios: ['Video inmobiliario', 'Drone', 'Reels para redes'], desde: 'Desde $320', foto: fotoDe('Casa', 16), avatar: retrato(68), bio: 'Producción audiovisual para desarrollos y agentes inmobiliarios.' },
  { id: 'pf-10', nombre: 'ServiHogar 24', categoria: 'Mantenimiento', verificado: false, rating: 4.3, resenas: 31, anios: 4, servicios: ['Plomería', 'Electricidad', 'Pintura', 'Aire acondicionado'], desde: 'Desde $40', foto: fotoDe('Oficina', 17), avatar: retrato(57), bio: 'Servicio de mantenimiento y reparaciones para el hogar.' },
]

// ---------------------------------------------------------------------------
// ENTIDADES FINANCIERAS (DEMO)
// ---------------------------------------------------------------------------

export const BANCOS = [
  { id: 'bk-1', nombre: 'Banco Alfa', logo: '🏦', tasa: 6.9, plazoMax: 20, financiaHasta: 80, cuotaRef: 'Desde $780/mes', requisitos: ['Antigüedad laboral 1 año', 'Ingresos demostrables', 'Sin mora en central de riesgo'], destacado: true },
  { id: 'bk-2', nombre: 'Banco Beta', logo: logoEmpresa('undefined', 5), tasa: 7.4, plazoMax: 25, financiaHasta: 85, cuotaRef: 'Desde $742/mes', requisitos: ['Antigüedad laboral 2 años', 'Boletas de pago', 'Garantía hipotecaria'], destacado: false },
  { id: 'bk-3', nombre: 'Banco Gamma', logo: logoEmpresa('undefined', 6), tasa: 6.5, plazoMax: 15, financiaHasta: 70, cuotaRef: 'Desde $920/mes', requisitos: ['Cuenta en la entidad', 'Ingresos demostrables', 'Tasación aprobada'], destacado: true },
  { id: 'bk-4', nombre: 'Mutual Delta', logo: logoEmpresa('undefined', 7), tasa: 8.2, plazoMax: 20, financiaHasta: 90, cuotaRef: 'Desde $810/mes', requisitos: ['Ahorro previo 6 meses', 'Ingresos demostrables'], destacado: false },
  { id: 'bk-5', nombre: 'Financiera Épsilon', logo: '💳', tasa: 9.1, plazoMax: 12, financiaHasta: 75, cuotaRef: 'Desde $1.050/mes', requisitos: ['Evaluación crediticia', 'Garante o garantía real'], destacado: false },
]

// ---------------------------------------------------------------------------
// LEADS (TuMomo Pro / CRM)
// ---------------------------------------------------------------------------

export const ETAPAS = [
  'Nuevo', 'Contactado', 'Calificado', 'Propiedades enviadas',
  'Visita', 'Negociación', 'Reserva', 'Cierre',
]

export const LEADS = [
  { id: 'ld-1', nombre: 'María López', etapa: 'Calificado', operacion: 'Compra', presupuesto: 150000, zona: 'Equipetrol', formaPago: 'Crédito bancario', dorm: 2, origen: 'Meta Ads', temperatura: 'Caliente', ultimoContacto: 'Hace 2 h', telefono: '+591 700 22 001', avatar: retrato(24), vistas: ['p-1', 'p-6', 'p-18'], favoritos: ['p-1'], agente: 'ag-1', notas: 'Busca entrega inmediata. Trabaja en zona norte, prefiere Equipetrol por cercanía.' },
  { id: 'ld-2', nombre: 'Jorge Antelo', etapa: 'Nuevo', operacion: 'Compra', presupuesto: 90000, zona: 'Norte', formaPago: 'Crédito bancario', dorm: 2, origen: 'TuMomo Search', temperatura: 'Tibio', ultimoContacto: 'Hace 20 min', telefono: '+591 700 22 002', avatar: retrato(11), vistas: ['p-16', 'p-20'], favoritos: [], agente: 'ag-1', notas: 'Primera vivienda. Consultó por requisitos de crédito.' },
  { id: 'ld-3', nombre: 'Fernanda Rojas', etapa: 'Visita', operacion: 'Compra', presupuesto: 300000, zona: 'Urubó', formaPago: 'Contado', dorm: 4, origen: 'Referido', temperatura: 'Caliente', ultimoContacto: 'Ayer', telefono: '+591 700 22 003', avatar: retrato(31), vistas: ['p-14', 'p-5'], favoritos: ['p-14'], agente: 'ag-2', notas: 'Visita agendada para el sábado. Muy interesada en la casa quinta.' },
  { id: 'ld-4', nombre: 'Luis Barbery', etapa: 'Negociación', operacion: 'Compra', presupuesto: 170000, zona: 'Equipetrol Norte', formaPago: 'Crédito directo', dorm: 2, origen: 'Meta Ads', temperatura: 'Caliente', ultimoContacto: 'Hace 4 h', telefono: '+591 700 22 004', avatar: retrato(8), vistas: ['p-1', 'p-18'], favoritos: ['p-1', 'p-18'], agente: 'ag-1', notas: 'Negociando inicial. Pidió bajar a 15% de entrada.' },
  { id: 'ld-5', nombre: 'Gabriela Áñez', etapa: 'Contactado', operacion: 'Alquiler', presupuesto: 700, zona: 'Equipetrol', formaPago: 'Contado', dorm: 2, origen: 'WhatsApp', temperatura: 'Tibio', ultimoContacto: 'Hace 1 día', telefono: '+591 700 22 005', avatar: retrato(20), vistas: ['p-4'], favoritos: ['p-4'], agente: 'ag-7', notas: 'Necesita amoblado. Se muda en 45 días.' },
  { id: 'ld-6', nombre: 'Pablo Sandoval', etapa: 'Propiedades enviadas', operacion: 'Inversión', presupuesto: 100000, zona: 'Equipetrol', formaPago: 'Contado', dorm: 1, origen: 'TuMomo Search', temperatura: 'Tibio', ultimoContacto: 'Hace 3 días', telefono: '+591 700 22 006', avatar: retrato(54), vistas: ['p-16', 'p-6', 'p-22'], favoritos: ['p-16'], agente: 'ag-10', notas: 'Busca rentabilidad. Le interesa el ticket bajo de preventa.' },
  { id: 'ld-7', nombre: 'Silvia Montero', etapa: 'Reserva', operacion: 'Compra', presupuesto: 120000, zona: 'Santos Dumont', formaPago: 'Crédito bancario', dorm: 3, origen: 'Referido', temperatura: 'Caliente', ultimoContacto: 'Hace 6 h', telefono: '+591 700 22 007', avatar: retrato(26), vistas: ['p-12'], favoritos: ['p-12'], agente: 'ag-4', notas: 'Reserva firmada. En trámite de crédito con Banco Alfa.' },
  { id: 'ld-8', nombre: 'Ricardo Paz', etapa: 'Cierre', operacion: 'Compra', presupuesto: 250000, zona: 'Sirari', formaPago: 'Contado', dorm: 3, origen: 'Meta Ads', temperatura: 'Cerrado', ultimoContacto: 'Hace 2 días', telefono: '+591 700 22 008', avatar: retrato(59), vistas: ['p-11'], favoritos: ['p-11'], agente: 'ag-3', notas: 'Operación cerrada. Firma de minuta esta semana.' },
  { id: 'ld-9', nombre: 'Carla Suárez', etapa: 'Nuevo', operacion: 'Compra', presupuesto: 200000, zona: 'Sirari', formaPago: 'Crédito bancario', dorm: 3, origen: 'Meta Ads', temperatura: 'Frío', ultimoContacto: 'Hace 15 min', telefono: '+591 700 22 009', avatar: retrato(49), vistas: ['p-23'], favoritos: [], agente: 'ag-10', notas: 'Lead recién ingresado desde campaña de Instagram.' },
  { id: 'ld-10', nombre: 'Diego Camacho', etapa: 'Calificado', operacion: 'Inversión', presupuesto: 80000, zona: 'Urubó', formaPago: 'Crédito directo', dorm: 0, origen: 'TuMomo Search', temperatura: 'Tibio', ultimoContacto: 'Hace 1 día', telefono: '+591 700 22 010', avatar: retrato(57), vistas: ['p-8', 'p-21'], favoritos: ['p-8'], agente: 'ag-5', notas: 'Quiere terreno para construir en 2 años.' },
  { id: 'ld-11', nombre: 'Andrea Villarroel', etapa: 'Contactado', operacion: 'Compra', presupuesto: 165000, zona: 'Urubó', formaPago: 'Crédito bancario', dorm: 3, origen: 'WhatsApp', temperatura: 'Tibio', ultimoContacto: 'Hace 8 h', telefono: '+591 700 22 011', avatar: retrato(27), vistas: ['p-3', 'p-7'], favoritos: ['p-3'], agente: 'ag-2', notas: 'Familia con dos hijos, prioriza áreas verdes y seguridad.' },
  { id: 'ld-12', nombre: 'Martín Ribera', etapa: 'Visita', operacion: 'Compra', presupuesto: 195000, zona: 'Equipetrol', formaPago: 'Contado', dorm: 0, origen: 'Referido', temperatura: 'Caliente', ultimoContacto: 'Hace 3 h', telefono: '+591 700 22 012', avatar: retrato(61), vistas: ['p-9'], favoritos: ['p-9'], agente: 'ag-6', notas: 'Busca oficina para su empresa. Visita el jueves.' },
  { id: 'ld-13', nombre: 'Lucía Mercado', etapa: 'Propiedades enviadas', operacion: 'Alquiler', presupuesto: 400, zona: 'Centro', formaPago: 'Contado', dorm: 1, origen: 'TuMomo Search', temperatura: 'Tibio', ultimoContacto: 'Hace 2 días', telefono: '+591 700 22 013', avatar: retrato(23), vistas: ['p-13'], favoritos: ['p-13'], agente: 'ag-7', notas: 'Estudiante universitaria, necesita amoblado.' },
  { id: 'ld-14', nombre: 'Enrique Dorado', etapa: 'Calificado', operacion: 'Compra', presupuesto: 400000, zona: 'Urubó', formaPago: 'Contado', dorm: 5, origen: 'Referido', temperatura: 'Caliente', ultimoContacto: 'Hace 5 h', telefono: '+591 700 22 014', avatar: retrato(50), vistas: ['p-14', 'p-19'], favoritos: ['p-14'], agente: 'ag-8', notas: 'Cliente de alto valor. Compra de contado, decide en 30 días.' },
  { id: 'ld-15', nombre: 'Natalia Egüez', etapa: 'Nuevo', operacion: 'Compra', presupuesto: 130000, zona: 'Equipetrol Norte', formaPago: 'Crédito directo', dorm: 2, origen: 'Meta Ads', temperatura: 'Tibio', ultimoContacto: 'Hace 45 min', telefono: '+591 700 22 015', avatar: retrato(36), vistas: ['p-18', 'p-6'], favoritos: [], agente: 'ag-1', notas: 'Consultó específicamente por crédito directo del proyecto.' },
  { id: 'ld-16', nombre: 'Óscar Balcázar', etapa: 'Contactado', operacion: 'Inversión', presupuesto: 150000, zona: 'Norte', formaPago: 'Contado', dorm: 0, origen: 'TuMomo Search', temperatura: 'Frío', ultimoContacto: 'Hace 4 días', telefono: '+591 700 22 016', avatar: retrato(65), vistas: ['p-15', 'p-10'], favoritos: [], agente: 'ag-9', notas: 'Evalúa terreno comercial. Aún comparando opciones.' },
  { id: 'ld-17', nombre: 'Rosario Cuéllar', etapa: 'Negociación', operacion: 'Compra', presupuesto: 290000, zona: 'Las Palmas', formaPago: 'Crédito bancario', dorm: 4, origen: 'Meta Ads', temperatura: 'Caliente', ultimoContacto: 'Hace 1 día', telefono: '+591 700 22 017', avatar: retrato(38), vistas: ['p-5'], favoritos: ['p-5'], agente: 'ag-8', notas: 'Crédito preaprobado. Negociando precio final.' },
  { id: 'ld-18', nombre: 'Fabio Menacho', etapa: 'Propiedades enviadas', operacion: 'Compra', presupuesto: 175000, zona: 'Sirari', formaPago: 'Crédito bancario', dorm: 3, origen: 'WhatsApp', temperatura: 'Tibio', ultimoContacto: 'Hace 2 días', telefono: '+591 700 22 018', avatar: retrato(69), vistas: ['p-23', 'p-11'], favoritos: ['p-23'], agente: 'ag-3', notas: 'Le enviamos 3 opciones de dúplex. Pendiente respuesta.' },
]

// ---------------------------------------------------------------------------
// REQUERIMIENTOS (demanda publicada)
// ---------------------------------------------------------------------------

export const REQUERIMIENTOS = [
  { id: 'rq-1', autor: 'María López', tipo: 'Departamento', zona: 'Equipetrol', presupuesto: 150000, dorm: 2, superficie: 90, forma: 'Crédito bancario', objetivo: 'Vivir', match: 94, publicado: 'Hace 2 días', comentarios: 'Prefiero edificio con gimnasio y entrega inmediata.' },
  { id: 'rq-2', autor: 'Diego Camacho', tipo: 'Terreno', zona: 'Urubó', presupuesto: 80000, dorm: 0, superficie: 500, forma: 'Crédito directo', objetivo: 'Invertir', match: 88, publicado: 'Hace 4 días', comentarios: 'Busco lote urbanizado para construir en 2 años.' },
  { id: 'rq-3', autor: 'Enrique Dorado', tipo: 'Casa', zona: 'Urubó', presupuesto: 400000, dorm: 5, superficie: 400, forma: 'Contado', objetivo: 'Vivir', match: 91, publicado: 'Hace 1 día', comentarios: 'Casa quinta con piscina, mínimo 4 dormitorios en suite.' },
  { id: 'rq-4', autor: 'Pablo Sandoval', tipo: 'Departamento', zona: 'Equipetrol', presupuesto: 100000, dorm: 1, superficie: 55, forma: 'Contado', objetivo: 'Invertir', match: 96, publicado: 'Hace 5 días', comentarios: 'Prioridad: rentabilidad y facilidad de alquiler.' },
  { id: 'rq-5', autor: 'Andrea Villarroel', tipo: 'Departamento', zona: 'Urubó', presupuesto: 170000, dorm: 3, superficie: 120, forma: 'Crédito bancario', objetivo: 'Vivir', match: 89, publicado: 'Hace 3 días', comentarios: 'Condominio con áreas verdes y seguridad, para familia.' },
  { id: 'rq-6', autor: 'Martín Ribera', tipo: 'Oficina', zona: 'Equipetrol', presupuesto: 200000, dorm: 0, superficie: 120, forma: 'Contado', objetivo: 'Invertir', match: 93, publicado: 'Hace 6 días', comentarios: 'Oficina para 12 personas, con estacionamientos.' },
  { id: 'rq-7', autor: 'Silvia Montero', tipo: 'Casa', zona: 'Santos Dumont', presupuesto: 135000, dorm: 3, superficie: 180, forma: 'Crédito bancario', objetivo: 'Vivir', match: 92, publicado: 'Hace 1 semana', comentarios: 'Cerca de colegios, apta para crédito de vivienda.' },
  { id: 'rq-8', autor: 'Óscar Balcázar', tipo: 'Terreno', zona: 'Norte', presupuesto: 150000, dorm: 0, superficie: 800, forma: 'Contado', objetivo: 'Invertir', match: 95, publicado: 'Hace 2 días', comentarios: 'Terreno esquinero sobre avenida para proyecto comercial.' },
  { id: 'rq-9', autor: 'Natalia Egüez', tipo: 'Departamento', zona: 'Equipetrol Norte', presupuesto: 130000, dorm: 2, superficie: 85, forma: 'Crédito directo', objetivo: 'Vivir', match: 90, publicado: 'Hace 8 h', comentarios: 'Necesito plan de pagos sin banco.' },
  { id: 'rq-10', autor: 'Rosario Cuéllar', tipo: 'Casa', zona: 'Las Palmas', presupuesto: 300000, dorm: 4, superficie: 300, forma: 'Crédito bancario', objetivo: 'Vivir', match: 97, publicado: 'Hace 3 días', comentarios: 'Condominio cerrado, con patio para mascotas.' },
]

// ---------------------------------------------------------------------------
// TuMomo DATA - inteligencia de mercado (demo)
// ---------------------------------------------------------------------------

export const DATA_ZONAS = [
  { zona: 'Equipetrol', precioM2: 1520, alquilerM2: 9.4, oferta: 412, demanda: 638, proyectos: 14, tendencia: 6.2, rentabilidad: 7.4 },
  { zona: 'Equipetrol Norte', precioM2: 1480, alquilerM2: 9.1, oferta: 386, demanda: 592, proyectos: 11, tendencia: 7.8, rentabilidad: 7.4 },
  { zona: 'Sirari', precioM2: 1610, alquilerM2: 9.8, oferta: 198, demanda: 341, proyectos: 6, tendencia: 4.9, rentabilidad: 7.3 },
  { zona: 'Urubó', precioM2: 890, alquilerM2: 5.2, oferta: 524, demanda: 706, proyectos: 19, tendencia: 11.4, rentabilidad: 7.0 },
  { zona: 'Las Palmas', precioM2: 1340, alquilerM2: 7.6, oferta: 241, demanda: 288, proyectos: 5, tendencia: 3.6, rentabilidad: 6.8 },
  { zona: 'Norte', precioM2: 1180, alquilerM2: 6.9, oferta: 468, demanda: 402, proyectos: 8, tendencia: 2.8, rentabilidad: 7.0 },
  { zona: 'Santos Dumont', precioM2: 1050, alquilerM2: 6.1, oferta: 312, demanda: 274, proyectos: 4, tendencia: 2.1, rentabilidad: 7.0 },
  { zona: 'Centro', precioM2: 1220, alquilerM2: 7.8, oferta: 187, demanda: 213, proyectos: 3, tendencia: 1.4, rentabilidad: 7.7 },
]

export const DATA_EVOLUCION = [
  { mes: 'Sep 25', Equipetrol: 1412, Urubó: 782, Norte: 1118 },
  { mes: 'Nov 25', Equipetrol: 1438, Urubó: 806, Norte: 1131 },
  { mes: 'Ene 26', Equipetrol: 1461, Urubó: 831, Norte: 1148 },
  { mes: 'Mar 26', Equipetrol: 1479, Urubó: 852, Norte: 1159 },
  { mes: 'May 26', Equipetrol: 1496, Urubó: 869, Norte: 1167 },
  { mes: 'Jul 26', Equipetrol: 1511, Urubó: 881, Norte: 1174 },
  { mes: 'Sep 26', Equipetrol: 1520, Urubó: 890, Norte: 1180 },
]

// ---------------------------------------------------------------------------
// MARKETING (Meta Ads demo)
// ---------------------------------------------------------------------------

export const CAMPANAS = [
  { id: 'cp-1', nombre: 'Departamentos en Equipetrol', red: 'Instagram + Facebook', estado: 'Activa', inversion: 480, leads: 63, cpl: 7.6, calificados: 28, visitas: 9, conversiones: 2, alcance: 42800 },
  { id: 'cp-2', nombre: 'Preventa Torre Vitalis', red: 'Instagram', estado: 'Activa', inversion: 320, leads: 41, cpl: 7.8, calificados: 19, visitas: 6, conversiones: 1, alcance: 28600 },
  { id: 'cp-3', nombre: 'Casas en Urubó', red: 'Facebook', estado: 'Activa', inversion: 560, leads: 38, cpl: 14.7, calificados: 21, visitas: 11, conversiones: 3, alcance: 31400 },
  { id: 'cp-4', nombre: 'Terrenos con crédito directo', red: 'Facebook', estado: 'Pausada', inversion: 210, leads: 24, cpl: 8.8, calificados: 8, visitas: 2, conversiones: 0, alcance: 18200 },
]

export const CAMPANA_SERIE = [
  { dia: 'Lun', leads: 7, calificados: 3 },
  { dia: 'Mar', leads: 11, calificados: 5 },
  { dia: 'Mié', leads: 9, calificados: 4 },
  { dia: 'Jue', leads: 14, calificados: 7 },
  { dia: 'Vie', leads: 12, calificados: 5 },
  { dia: 'Sáb', leads: 6, calificados: 3 },
  { dia: 'Dom', leads: 4, calificados: 1 },
]

// ---------------------------------------------------------------------------
// CALENDARIO (agenda del agente)
// ---------------------------------------------------------------------------

export const EVENTOS = [
  { id: 'ev-1', dia: 2, hora: '09:00', tipo: 'Visita', titulo: 'Visita Sky Moon', lead: 'María López', color: 'red' },
  { id: 'ev-2', dia: 2, hora: '15:30', tipo: 'Llamada', titulo: 'Seguimiento crédito', lead: 'Silvia Montero', color: 'yellow' },
  { id: 'ev-3', dia: 3, hora: '11:00', tipo: 'Visita', titulo: 'Casa quinta Urubó', lead: 'Fernanda Rojas', color: 'red' },
  { id: 'ev-4', dia: 4, hora: '10:00', tipo: 'Reunión', titulo: 'Firma de reserva', lead: 'Ricardo Paz', color: 'black' },
  { id: 'ev-5', dia: 4, hora: '16:00', tipo: 'Visita', titulo: 'Oficina Equipetrol', lead: 'Martín Ribera', color: 'red' },
  { id: 'ev-6', dia: 5, hora: '09:30', tipo: 'Seguimiento', titulo: 'Enviar comparativa', lead: 'Pablo Sandoval', color: 'yellow' },
  { id: 'ev-7', dia: 5, hora: '14:00', tipo: 'Llamada', titulo: 'Negociación inicial', lead: 'Luis Barbery', color: 'yellow' },
  { id: 'ev-8', dia: 6, hora: '11:30', tipo: 'Visita', titulo: 'Condominio Alto Urubó', lead: 'Andrea Villarroel', color: 'red' },
]

// ---------------------------------------------------------------------------
// INSIGHTS (ticker de la V1)
// ---------------------------------------------------------------------------

export const INSIGHTS = [
  'Equipetrol aumentó su plusvalía en los últimos años',
  'Urubó sigue creciendo como zona de alta proyección inmobiliaria',
  'Departamentos en preventa: alternativa para invertir con menor ticket inicial',
  'Los barrios más seguros para vivir en Bolivia',
  'Crédito directo: cómo funciona y a quién le conviene',
  'Cuánto renta hoy un departamento de 1 dormitorio en Santa Cruz',
]

// ---------------------------------------------------------------------------
// PAISES (TuMomo Global - visión futura)
// ---------------------------------------------------------------------------

export const PAISES = [
  { bandera: '🇧🇴', pais: 'Bolivia', estado: 'Activo', partners: 42, propiedades: '9.135', nota: 'Mercado principal de TuMomo.' },
  { bandera: '🇺🇸', pais: 'Estados Unidos', estado: 'Roadmap', partners: 0, propiedades: '—', nota: 'Inversión de bolivianos en Miami y Texas.' },
  { bandera: '🇪🇸', pais: 'España', estado: 'Roadmap', partners: 0, propiedades: '—', nota: 'Comunidad boliviana con capacidad de inversión.' },
  { bandera: '🇵🇾', pais: 'Paraguay', estado: 'Roadmap', partners: 0, propiedades: '—', nota: 'Mercado regional con dinámica similar.' },
]

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

export const getAgente = (id) => AGENTES.find((a) => a.id === id)
export const getInmobiliaria = (id) => INMOBILIARIAS.find((i) => i.id === id)
export const getPropiedad = (id) => PROPIEDADES.find((p) => p.id === id)
export const getLead = (id) => LEADS.find((l) => l.id === id)

export const fmtUSD = (n) =>
  '$' + Number(n).toLocaleString('es-BO', { maximumFractionDigits: 0 })

export const fmtM2 = (n) => `${Number(n).toLocaleString('es-BO')} m²`
