import { useNavigate } from "react-router-dom"

export function MenuCadastroLogin(props) {

    const estiloAtivo = "bg-[#896D95] w-1/2 rounded-3xl flex text-center items-center justify-center text-white font-semibold"
    const estiloInativo = "w-1/2 rounded-3xl flex text-center items-center justify-center text-[#896D95] font-semibold"
    const navigate = useNavigate()
    return <>
        <div className="h-[8%] w-[62%] bg-white justify-self-center rounded-3xl flex shadow-sm font-text cursor-pointer">
            <div className={props.tela == "Cadastro" ? estiloInativo : estiloAtivo} onClick={() => navigate("/")}>Entrar</div>
            <div className={props.tela == "Login" ? estiloInativo : estiloAtivo} onClick={() => navigate("/cadastro")}>Cadastrar</div>
        </div>
    </>
}