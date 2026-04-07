import { useState } from 'react'
import { Nav } from './components/Nav'
import { Home } from './pages/Home'
import { Pedidos } from './pages/Pedidos'
import { Estoque } from './pages/Estoque'
import { Calculadora } from './pages/Calculadora'
import { Dashboard } from './pages/Dashboard'
import { Chatbot } from './pages/Chatbot'
import { Perfil } from './pages/Perfil'

function App() {

  const [tela, setTela] = useState("Chatbot")

  const carregarTela = () => {

    switch (tela) {
      
      case "Home":
        return <Home />

      case "Pedidos":
        return <Pedidos />

      case "Estoque":
        return <Estoque />

      case "Calculadora":
        return <Calculadora />

      case "Dashboard":
        return <Dashboard />

      case "Chatbot":
        return <Chatbot />

      case "Perfil":
        return <Perfil />

    }

  }

  return (
    <>
      <main className="h-screen flex flex-wrap">


        <Nav tela={tela} setTela={setTela} />

        {carregarTela()}

      </main>
    </>
  )
}

export default App
