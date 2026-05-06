import { useState } from "react";
import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";
import { api } from "../provider/api";

export function CampoCadastro(props) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");

    async function cadastrar() {
        try {
            const credenciais = {
                nome,
                email,
                username,
                senha,
                role: "USER"
            }
            console.log(credenciais);

            const response = await api.post("/auth/registrar", credenciais);
            console.log("Cadastro realizado:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar:", error.response?.data || error.message);
        }
    }

    return (
        <>
            <div className="p-[6%] w-1/2 h-1/1 rounded-l-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />
                <h2 className="mt-[8%] text-4xl font-semibold font-title text-gray-900">Cadastre-se</h2>
                <div className="flex flex-col space-y-4 items-center justify-center mt-8 mb-10">
                    <InputCadastro nome={"Nome"} placeholder={"Digite seu nome completo"} aoMudar={setNome} />
                    <InputCadastro nome={"Email"} placeholder={"Digite seu email"} aoMudar={setEmail} />
                    <InputCadastro nome={"Nome de Usuário"} placeholder={"Digite seu nome de usuário"} aoMudar={setUsername} />
                    <InputCadastro nome={"Senha"} placeholder={"Digite sua senha"} aoMudar={setSenha} />
                </div>
                <button
                    className="bg-[#896D95] w-96 h-12 rounded-4xl text-white font-semibold font-title cursor-pointer"
                    onClick={() => cadastrar()}
                >
                    Cadastrar
                </button>
            </div>
        </>
    )
}
