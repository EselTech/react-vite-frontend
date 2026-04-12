import { useState } from 'react'
import { Cadastro } from './pages/Cadastro'
import { Login } from './pages/Login'
import { Calculadora } from './pages/Calculadora'
import { Chatbot } from './pages/Chatbot'
import { Dashboard } from './pages/Dashboard'
import { Estoque } from './pages/Estoque'
import { Home } from './pages/Home'
import { Pedidos } from './pages/Pedidos'
import { Perfil } from './pages/Perfil'
import { Nav } from './components/Nav'

function App() {

  const [tela, setTela] = useState("Login")
  let telaAtual = "";

  switch (tela) {
    case "Cadastro":
      telaAtual = <Cadastro tela={tela} setTela={setTela} />
      break;
    case "Login":
      telaAtual = <Login tela={tela} setTela={setTela} />
      break;
    case "Calculadora":
      telaAtual = <Calculadora tela={tela} setTela={setTela} />
      break;
    case "Chatbot":
      telaAtual = <Chatbot tela={tela} setTela={setTela} />
      break;
    case "Dashboard":
      telaAtual = <Dashboard tela={tela} setTela={setTela} />
      break;
    case "Estoque":
      telaAtual = <Estoque tela={tela} setTela={setTela} />
      break;
    case "Home":
      telaAtual = <Home tela={tela} setTela={setTela} />
      break;
    case "Pedidos":
      telaAtual = <Pedidos tela={tela} setTela={setTela} />
      break;
    case "Perfil":
      telaAtual = <Perfil tela={tela} setTela={setTela} />
      break;
  }


  return (
    <main className='flex'>
      {tela != "Login" && tela != "Cadastro" && <Nav tela={tela} setTela={setTela} />}
      {telaAtual}
    </main>
  )

}


export default App