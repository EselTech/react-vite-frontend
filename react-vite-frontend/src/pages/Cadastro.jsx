import { CampoCadastro } from "../components/CampoCadastro";

export function Cadastro(props) {
    return <>
        <div className="w-full h-screen flex items-center justify-center drop-shadow-2xl flex-wrap">
            <div className="bg-[#EDE0F0] w-3/5 h-7/8 rounded-3xl flex" aria-label="Container principal para Cadastro">
                <CampoCadastro tela={props.tela} setTela={props.setTela} />
                <div className="w-1/2 flex justify-center items-center">
                    <img src="/atelie-logo.png" alt="" className="w-2l" />
                </div>
            </div>

        </div>
    </>
}

