import { useState } from 'react'
import { Cadastro } from './pages/Cadastro'
import { Login } from './pages/Login'
import { Orcamentos } from './pages/Orcamentos'
import { Chatbot } from './pages/Chatbot'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Pedidos } from './pages/Pedidos'
import { Perfil } from './pages/Perfil'
import { Produtos } from './pages/Produtos'
import { Materiais } from './pages/Materiais'
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
    case "Orcamentos":
      telaAtual = <Orcamentos tela={tela} setTela={setTela} />
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
    case "Produtos":
      telaAtual = <Produtos tela={tela} setTela={setTela} />
      break;
    case "Materiais":
      telaAtual = <Materiais tela={tela} setTela={setTela} />
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