import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Carta from './pages/Carta'
import MenuDia from './pages/MenuDia'
import MenuDiaForm from './pages/MenuDiaForm'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/carta" />} />
          <Route path="/carta" element={<Carta />} />
          <Route path="/menu-dia" element={<MenuDia />} />
          {/* Ruta para crear nuevo menú */}
          <Route path="/menu-dia/nuevo" element={<MenuDiaForm />} />
          {/* Ruta para editar menú existente */}
          <Route path="/menu-dia/editar/:id" element={<MenuDiaForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App