import { useState, useEffect } from "react";
import { api } from "../provider/api";
import { MenuCadastroLogin } from "./MenuCadastroLogin";
import { InputCadastro } from "./InputCadastro";
import toast, { Toaster } from "react-hot-toast";
import { BotaoEntrar } from "./BotaoEntrar";
import { useNavigate } from "react-router-dom";

export function CampoCadastro(props) {
    const caracteresEspeciais = [".", ",", "!", "?", "@", "#", "$"]
    let haveCaractere = false
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [inputsBloqueados, setInputsBloqueados] = useState(false)
    const [erros, setErros] = useState({});
    const navigate = useNavigate()

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

        if (senha.toLowerCase() == senha) {
            novosErros.senha = "A senha deve possuir ao menos uma letra maiúscula.";
        }

        if (senha.toUpperCase() == senha) {
            novosErros.senha = "A senha deve possuir ao menos uma letra minúscula.";
        }

        // Validar presença de caracteres especiais
        caracteresEspeciais.map(caractere => {
            if (senha.includes(caractere)) {
                haveCaractere = true
            }
        })

        if (!haveCaractere) {
            novosErros.senha = "A senha deve possuir ao menos um caractere especial.";
        }

        setErros(novosErros);
    }, [nome, email, username, senha]);

    async function cadastrar() {
        const temCamposVazios = !nome || !email || !username || !senha;
        const temErros = Object.keys(erros).length > 0;

        if (temErros || temCamposVazios) {
            toast("Por favor, preencha todos os campos corretamente", {
                icon: "⚠️"
            })
            return
        }

        try {
            const credenciais = { nome, email, username, senha, role: "USER" };
            console.log("Passou 1")
            const response = await api.post("/auth/registrar", credenciais);
            console.log("Passou Axios")
            toast.success("Cadastro realizado com sucesso!")
            console.log("Passou tudo")
            setInputsBloqueados(true)
            setTimeout(() => {
                navigate("/")
            }, 2000)
        } catch (error) {
            console.error("Erro ao cadastrar:", error.response?.data || error.message);
        }
    }

    return (
        <div className="p-[6%] w-1/2 h-1/1 rounded-l-3xl bg-[#FAF7FB] text-center">
            <Toaster />
            <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />

            <h2 className="mt-8 text-4xl font-semibold font-title text-gray-900">Cadastre-se</h2>

            <div className="flex flex-col space-y-3 items-center justify-center mt-8 ">
                <InputCadastro
                    nome={"Nome"}
                    placeholder={"Digite seu nome completo"}
                    aoMudar={setNome}
                    erro={erros.nome}
                    inputsBloqueados={inputsBloqueados}
                />
                <InputCadastro
                    nome={"Email"}
                    placeholder={"Digite seu email"}
                    aoMudar={setEmail}
                    erro={erros.email}
                    inputsBloqueados={inputsBloqueados}
                />
                <InputCadastro
                    nome={"Nome de Usuário"}
                    placeholder={"Digite seu nome de usuário"}
                    aoMudar={setUsername}
                    erro={erros.username}
                    inputsBloqueados={inputsBloqueados}
                />
                <InputCadastro
                    type="password"
                    nome={"Senha"}
                    placeholder={"Digite sua senha"}
                    aoMudar={setSenha}
                    erro={erros.senha}
                    inputsBloqueados={inputsBloqueados}
                />
            </div>

            <BotaoEntrar aoClicar={cadastrar} texto={"Cadastrar"} />
        </div>
    );
}