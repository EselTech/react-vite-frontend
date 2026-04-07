import { BotaoNav } from "./BotaoNav";

export function Nav(props) {

    return (

        <nav className="w-2/12 h-screen bg-[#E6D5FE] flex flex-col gap-8">

            <div className="mt-8 w-full flex ">
                <img className="ml-6" src="./src/assets/logo.svg" />
                <div className="flex flex-col">
                    <p className="font-bold text-[#695088]">Atelier da Cibis</p>
                    <p className="font-bold text-[#896D95] text-[12px] font-nunito">Papelaria personalizada</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 ml-6 ">

                {/* Botão Home */}
                <BotaoNav imagem="./src/assets/home" descricao="Home" ativo={props.tela == "Home"} aoClicar={() => props.setTela("Home")} />

                {/* Botão Pedidos */}
                <BotaoNav imagem="./src/assets/pedidos" descricao="Pedidos" ativo={props.tela == "Pedidos"} aoClicar={() => props.setTela("Pedidos")} />

                {/* Botão Estoque */}
                <BotaoNav imagem="./src/assets/estoque" descricao="Estoque" ativo={props.tela == "Estoque"} aoClicar={() => props.setTela("Estoque")} />

                {/* Botão Calculadora */}
                <BotaoNav imagem="./src/assets/calculadora" descricao="Calculadora" ativo={props.tela == "Calculadora"} aoClicar={() => props.setTela("Calculadora")} />

                {/* Botão Dashboard */}
                <BotaoNav imagem="./src/assets/dashboard" descricao="Dashboard" ativo={props.tela == "Dashboard"} aoClicar={() => props.setTela("Dashboard")} />

                {/* Botão Chatbot */}
                <BotaoNav imagem="./src/assets/chatbot" descricao="Chatbot" ativo={props.tela == "Chatbot"} aoClicar={() => props.setTela("Chatbot")} />

                {/* Botão Perfil */}
                <BotaoNav imagem="./src/assets/perfil" descricao="Perfil" ativo={props.tela == "Perfil"} aoClicar={() => props.setTela("Perfil")} />

            </div>

        </nav>

    )

}