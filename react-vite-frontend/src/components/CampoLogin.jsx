import { useState } from "react";
import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";
import { api } from "../provider/api";

export function CampoLogin(props) {

    const [senha, setSenha] = useState("");
    const [username, setUsername] = useState("");
    const [mensagemErro, setMensagemErro] = useState("")

    function entrar() {

        setMensagemErro("")

        const credenciais = {
            username,
            senha
        }

        console.log(credenciais);


        api.post("/auth/login", credenciais)
            .then(resposta => {
                props.setTela("Home");
            })
            .catch(erro => {
                if (erro.response && erro.response.status === 400) {
                    setMensagemErro("Usuário não encontrado, confira suas credênciais!")
                    console.log("Usuário não encontrado");
                } else {
                    setMensagemErro("Erro ao realizar login")
                    console.error("Erro no login:", erro.message);
                }
            });
    }

    return (
        <>
            <div className="p-[6%] w-1/2 h-1/1 rounded-r-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />
                <h2 className="mt-[16%] text-4xl font-semibold font-title text-gray-900">Bem-vindo!</h2>
                <div className="flex flex-col space-y-8 items-center justify-center mt-8">
                    <InputCadastro nome={"Username"} placeholder={"Digite seu username"} aoMudar={setUsername} />
                    <InputCadastro nome={"Senha"} placeholder={"Digite sua senha"} aoMudar={setSenha} />
                    <p className="text-[#896D95] font-text text-left self-start text-sm -mt-4 font-semibold mb-12 cursor-pointer">Esqueci minha senha</p>
                </div>
                <BotaoEntrar aoClicar={entrar} mensagemErro={mensagemErro}/>
            </div>
        </>
    )
}