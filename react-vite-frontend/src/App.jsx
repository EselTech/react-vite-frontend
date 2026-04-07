import { useState } from 'react'
import { Cadastro } from './pages/Cadastro'

function App() {

  const [tela, setTela] = useState("Cadastro")

  return (
    <>
      <Cadastro tela={tela} setTela={setTela} />
    </>
  )

}


export default App
