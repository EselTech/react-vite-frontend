import { CampoCadastro } from "../components/CampoCadastro";

export function Cadastro(props) {
    return <>
        <div className="w-full h-screen flex items-center justify-center drop-shadow-2xl">
            <div className="bg-gray-400 w-3/5 h-7/8 rounded-3xl" aria-label="Container principal para Cadastro">
                <CampoCadastro tela = {props.tela} setTela = {props.setTela}/>
            </div>
        </div>
    </>
}

