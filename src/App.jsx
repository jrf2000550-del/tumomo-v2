import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from './lib/store'

import PublicLayout from './components/PublicLayout'
import ProLayout from './components/ProLayout'

import Home from './pages/Home'
import Buscar from './pages/Buscar'
import Propiedad from './pages/Propiedad'
import Comparar from './pages/Comparar'
import Financiar from './pages/Financiar'
import Construir from './pages/Construir'
import Requerimientos from './pages/Requerimientos'
import Profesionales from './pages/Profesionales'
import Proyectos from './pages/Proyectos'
import Datos from './pages/Datos'
import { PerfilAgente, PerfilInmobiliaria } from './pages/Perfiles'
import { Invertir, Global } from './pages/Misc'

import Dashboard from './pages/pro/Dashboard'
import CRM from './pages/pro/CRM'
import { LeadsLista, LeadDetalle } from './pages/pro/Leads'
import {
  WhatsApp, Marketing, Calendario, Landings, IA, PropiedadesPro, RequerimientosPro,
} from './pages/pro/Modulos'

// En un archivo unico (file://, Artifact) no hay servidor que resuelva rutas:
// ahi se usa HashRouter. En el sitio desplegado se mantiene BrowserRouter.
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

// GitHub Pages sirve el sitio bajo /<repo>/, asi que el router necesita esa
// base para que /buscar resuelva a /tumomo-v2/buscar. En Vercel y en local
// la base es "/" y esto queda en cadena vacia.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <StoreProvider>
      <Router basename={BASE || undefined}>
        <Routes>
          {/* --- Consumidor --- */}
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="buscar" element={<Buscar />} />
            <Route path="propiedad/:id" element={<Propiedad />} />
            <Route path="comparar" element={<Comparar />} />
            <Route path="invertir" element={<Invertir />} />
            <Route path="financiar" element={<Financiar />} />
            <Route path="construir" element={<Construir />} />
            <Route path="requerimientos" element={<Requerimientos />} />
            <Route path="profesionales" element={<Profesionales />} />
            <Route path="proyectos" element={<Proyectos />} />
            <Route path="datos" element={<Datos />} />
            <Route path="global" element={<Global />} />
            <Route path="agente/:id" element={<PerfilAgente />} />
            <Route path="inmobiliaria/:id" element={<PerfilInmobiliaria />} />
          </Route>

          {/* --- Profesional --- */}
          <Route path="/pro" element={<ProLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="crm" element={<CRM />} />
            <Route path="leads" element={<LeadsLista />} />
            <Route path="leads/:id" element={<LeadDetalle />} />
            <Route path="propiedades" element={<PropiedadesPro />} />
            <Route path="requerimientos" element={<RequerimientosPro />} />
            <Route path="ia" element={<IA />} />
            <Route path="whatsapp" element={<WhatsApp />} />
            <Route path="marketing" element={<Marketing />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="landings" element={<Landings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </StoreProvider>
  )
}
