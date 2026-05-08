import { useState } from "react";
import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";
import { api } from "../provider/api";
import toast, { Toaster } from "react-hot-toast";

export function CampoLogin(props) {

    const [senha, setSenha] = useState("");
    const [username, setUsername] = useState("");
    const [mensagemErro, setMensagemErro] = useState("")

    const [inputsBloqueados, setInputsBloqueados] = useState(false)

    async function entrar() {

        try {
            const credenciais = {
                username,
                senha
            }
            const response = await api.post("/auth/login", credenciais)
            toast.success("Login realizado com sucesso!")
            setInputsBloqueados(true)
            setTimeout(() => {
                props.setTela("Home")
            }, 1500)

        } catch (erro) {
            if (erro.response && erro.response.status === 400) {
                // setMensagemErro("Usuário não encontrado, confira suas credênciais!")
                console.log("Usuário não encontrado");
                toast.error("Credenciais incorretas")
            } else {
                // setMensagemErro("Erro ao realizar login")
                console.error("Erro no login:", erro.message);
                toast.error("Erro ao realizar login")
            }
        }
    }

    return (
        <>
            <Toaster />
            <div className="p-[6%] w-1/2 h-1/1 rounded-r-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />
                <h2 className="mt-[16%] text-4xl font-semibold font-title text-gray-900">Bem-vindo!</h2>
                <div className="flex flex-col space-y-8 items-center justify-center mt-8">
                    <InputCadastro
                        nome={"Nome de Usuário"}
                        placeholder={"Digite seu nome de usuário"}
                        aoMudar={setUsername}
                        inputsBloqueados={inputsBloqueados}
                    />
                    <InputCadastro
                        nome={"Senha"}
                        placeholder={"Digite sua senha"}
                        aoMudar={setSenha}
                        inputsBloqueados={inputsBloqueados}
                    />
                    <p className="text-[#896D95] font-text text-left self-start text-sm -mt-4 font-semibold mb-12 cursor-pointer">Esqueci minha senha</p>
                </div>
                <BotaoEntrar aoClicar={entrar} mensagemErro={mensagemErro} />
            </div>
        </>
    )
}