import { BotaoNav } from "./BotaoNav";

export function Nav(props) {

    return (

        <nav className="w-2/12 h-screen bg-[#E6D5FE] flex flex-col gap-8">

            <div className="mt-8 w-full flex ">
                <img className="ml-[0.75vw]" src="logo.svg" />
                <div className="flex flex-col">
                    <p className="font-bold text-[#695088] font-title">Atelier da Cibis</p>
                    <p className="font-bold text-[#896D95] text-[12px] font-text">Papelaria personalizada</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 ml-6 ">

                {/* Botão Home */}
                <BotaoNav imagem="home" descricao="Home" ativo={props.tela == "Home"} aoClicar={() => props.setTela("Home")} />

                {/* Botão Pedidos */}
                <BotaoNav imagem="pedidos" descricao="Pedidos" ativo={props.tela == "Pedidos"} aoClicar={() => props.setTela("Pedidos")} />

                {/* Botão Estoque */}
                <BotaoNav imagem="estoque" descricao="Estoque" ativo={props.tela == "Estoque"} aoClicar={() => props.setTela("Estoque")} />

                {/* Botão Orçamentos */}
                <BotaoNav imagem="calculadora" descricao="Orçamentos" ativo={props.tela == "Orcamentos"} aoClicar={() => props.setTela("Orcamentos")} />

                {/* Botão Dashboard */}
                <BotaoNav imagem="dashboard" descricao="Dashboard" ativo={props.tela == "Dashboard"} aoClicar={() => props.setTela("Dashboard")} />

                {/* Botão Chatbot */}
                <BotaoNav imagem="chatbot" descricao="Chatbot" ativo={props.tela == "Chatbot"} aoClicar={() => props.setTela("Chatbot")} />

                {/* Botão Perfil */}
                <BotaoNav imagem="perfil" descricao="Perfil" ativo={props.tela == "Perfil"} aoClicar={() => props.setTela("Perfil")} />

            </div>

        </nav>

    )

}