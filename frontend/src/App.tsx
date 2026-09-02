import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { DealersPage } from './pages/DealersPage'
function HomePage() {
  return (
    <section className="card">
      <h2>Visão geral</h2>
      <p>
        Utilize o menu para gerenciar veículos e concessionárias.
      </p>
    </section>
  )
}
 
  
     
    


function VehiclesPage() {
  return (
    <section className="card">
      <h2>Veículos</h2>
      <p>A listagem de veículos será implementada nesta tela.</p>
    </section>
  )
}

function App() {
  return (
    <div className="app">
      <header className="header">
        <div>
          <span className="eyebrow">Gestão automotiva</span>
          <h1>Vehicle Dealer</h1>
        </div>

        <nav className="navigation">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/dealers">Concessionárias</NavLink>
          <NavLink to="/vehicles">Veículos</NavLink>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dealers" element={<DealersPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
