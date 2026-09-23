import { useNavigate } from "react-router-dom";
import { BotaoNav } from "./BotaoNav";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function Nav(props) {

    const navigate = useNavigate()

    const [navAtiva, setNavAtiva] = useState(true)

    useEffect(() => {
        if (!localStorage.getItem("userid")) {
            voltarParaLogin()
        }
    }, [])


    function voltarParaLogin() {
        toast("Realize o login antes de cotinuar", {
            icon: "⚠️"
        })
        setTimeout(() => { navigate("/") }, 2000)
    }

    function logout() {
        localStorage.setItem("userid", "")
        navigate("/")
    }

    return (

        <nav
            className={navAtiva ? "fixed bottom-0 left-0 z-40 w-full h-16 bg-[#E6D5FE] flex flex-row gap-2 shadow-[0_-4px_16px_rgba(105,80,136,0.12)] md:static md:w-2/12 md:h-screen md:flex-col md:gap-8 md:shadow-none" : "bg-[#FAF7FB]"}
        >
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {navAtiva ? (
                <div className="h-full flex flex-col">

                    <div className="w-full pt-2 pr-2">
                        <p
                            className="text-right font-bold text-xl cursor-pointer hidden md:block"
                            onClick={() => setNavAtiva(!navAtiva)}
                        >
                            ×
                        </p>
                    </div>
                    <div className="hidden w-full md:flex">

                        <img className="ml-[0.75vw]" src="logo.svg" alt="Logo Atelier da Cibis" />
                        <div className="flex flex-col">
                            <p className="font-bold text-[#695088] font-title">Atelier da Cibis</p>
                            <p className="font-bold text-[#896D95] text-[12px] font-text">Papelaria personalizada</p>
                        </div>
                    </div>
                    <div className="flex flex-row w-full gap-1 px-1 overflow-x-auto md:flex-col md:gap-4 md:ml-0 md:px-3">

                        {/* Botão Home */}
                        <BotaoNav imagem="home" descricao="Home" ativo={props.tela == "Home"} aoClicar={() => navigate("/home")} />

                        {/* Botão Pedidos */}
                        <BotaoNav imagem="pedidos" descricao="Pedidos" ativo={props.tela == "Pedidos"} aoClicar={() => navigate("/pedidos")} />

                        {/* Botão Estoque */}
                        {/* <BotaoNav imagem="estoque" descricao="Estoque" ativo={props.tela == "Estoque"} aoClicar={() => props.setTela("Estoque")} /> */}

                        {/* Botão Materiais */}
                        <BotaoNav imagem="estoque" descricao="Materiais" ativo={props.tela == "Materiais"} aoClicar={() => navigate("/materiais")} />

                        {/* Botão Produtos */}
                        <BotaoNav imagem="estoque" descricao="Produtos" ativo={props.tela == "Produtos"} aoClicar={() => navigate("/produtos")} />

                        {/* Botão Dashboard */}
                        <BotaoNav imagem="dashboard" descricao="Dashboard" ativo={props.tela == "Dashboard"} aoClicar={() => navigate("/dashboard")} />

                        {/* Botão Orçamentos */}
                        <BotaoNav imagem="calculadora" descricao="Orçamentos" ativo={props.tela == "Orcamentos"} aoClicar={() => navigate("/orcamentos")} />

                        {/* Botão Chatbot */}
                        <BotaoNav imagem="chatbot" descricao="Chatbot" ativo={props.tela == "Chatbot"} aoClicar={() => navigate("/chatbot")} />

                        {/* Botão Perfil */}
                        <BotaoNav imagem="perfil" descricao="Perfil" ativo={props.tela == "Perfil"} aoClicar={() => navigate("/perfil")} />

                    </div>
                    <div className="shrink-0 flex items-center justify-center gap-2 mt-auto mb-1 md:mb-4 ml-0 md:ml-4" >
                        <img src="logoutIcon.svg" alt="Sair" className="w-4 cursor-pointer" onClick={logout} />
                        <p className="hidden md:block font-title cursor-pointer" onClick={logout}>
                            Sair
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    className="bg-[#E6D5FE] border-[#634C89] w-10 h-12 mt-10 rounded-tr-4xl rounded-br-4xl content-center cursor-pointer"
                    onClick={() => {setNavAtiva(!navAtiva)}}
                >
                    <img
                        src="hamburguer-icon.png"
                        className="w-8"
                    />
                </div>
            )}


        </nav>

    )

}