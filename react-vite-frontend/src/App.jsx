import { useState } from 'react'
import { Cadastro } from './pages/Cadastro'
import { Login } from './pages/Login'

function App() {

  const [tela, setTela] = useState("Login")
  let telaAtual = "";

  switch (tela) {
    case "Cadastro":
      telaAtual = <Cadastro tela={tela} setTela={setTela}/>
      break;
    case "Login":
      telaAtual  = <Login tela={tela} setTela={setTela}/>
      break;
  }


  return (
    <>
      {telaAtual}
    </>
  )

}


export default App
