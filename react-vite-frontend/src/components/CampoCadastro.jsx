import { useState, useEffect } from "react";
import { api } from "../provider/api";
import { MenuCadastroLogin } from "./MenuCadastroLogin";
import { InputCadastro } from "./InputCadastro";

export function CampoCadastro(props) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");

    const [erros, setErros] = useState({});

    useEffect(() => {
        let novosErros = {};

        if (nome && nome.length <= 4) {
            novosErros.nome = "Digite seu nome completo.";
        }

        if (email && (!email.includes("@") || !email.includes("."))) {
            novosErros.email = "Digite um e-mail válido.";
        }

        if (username) {
            if (username.includes(" ")) {
                novosErros.username = "O nome de usuário não deve possuir espaços.";
            } else if (username.length < 5) {
                novosErros.username = "Seu nome de usuário deve possuir ao menos 5 caracteres.";
            }
        }

        if (senha && senha.length < 8) {
            novosErros.senha = "A senha deve possuir ao menos 8 caracteres.";
        }

        setErros(novosErros);
    }, [nome, email, username, senha]); 

    async function cadastrar() {
        const temCamposVazios = !nome || !email || !username || !senha;
        const temErros = Object.keys(erros).length > 0;

        if (temErros || temCamposVazios) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        try {
            const credenciais = { nome, email, username, senha, role: "USER" };
            const response = await api.post("/auth/registrar", credenciais);
            console.log("Cadastro realizado:", response.data);
        } catch (error) {
            console.error("Erro ao cadastrar:", error.response?.data || error.message);
        }
    }

    return (
        <div className="p-[6%] w-1/2 h-1/1 rounded-l-3xl bg-[#FAF7FB] text-center">
            <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />

            <div className="flex flex-col space-y-3 items-center justify-center mt-8 mb-10">
                <InputCadastro
                    nome={"Nome"}
                    placeholder={"Digite seu nome completo"}
                    aoMudar={setNome}
                    erro={erros.nome}
                />
                <InputCadastro
                    nome={"Email"}
                    placeholder={"Digite seu email"}
                    aoMudar={setEmail}
                    erro={erros.email}
                />
                <InputCadastro
                    nome={"Nome de Usuário"}
                    placeholder={"Digite seu nome de usuário"}
                    aoMudar={setUsername}
                    erro={erros.username}
                />
                <InputCadastro
                    nome={"Senha"}
                    type="password"
                    placeholder={"Digite sua senha"}
                    aoMudar={setSenha}
                    erro={erros.senha}
                />
            </div>

            <button
                className={`w-88 h-12 -mt-12 rounded-4xl text-white font-semibold font-title transition-all duration-300 bg-[#896D95] cursor-pointer hover:brightness-110`}
                onClick={cadastrar}
            >
                Cadastrar
            </button>
        </div>
    );
}