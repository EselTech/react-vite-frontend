import { useEffect, useState } from "react";
import { InputPerfil } from "../components/InputPerfil";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

export function Perfil() {

    const id = 1
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [senha, setSenha] = useState("")

    function carregarUsuario() {
        api.get(`/usuario/find-by-id/${id}`).then(response => {
            setNome(response.data.nome),
                setEmail(response.data.email),
                setUserName(response.data.username),
                setSenha(response.data.senha)
            console.log(response.data)
        })
    }
    function editarUsuario() {
        let copia = {}
        api.get(`/usuario/find-by-id/${id}`).then(response => {
            copia = {
                ...response.data,
                nome: nome,
                email: email,
                username: userName,
                senha: senha
            }
            console.log(copia)
            api.patch(`/usuario/atualizar/${id}`, copia)
        })
    }

    useEffect(() => {
        carregarUsuario()
    }, [])


    return (
        <div className="flex">
            <Nav tela="Perfil" />
            <div className="w-10/12 bg-white pl-28 pt-[4vh] flex">

                <div className="w-1/2">
                    <h1 className="text-[#695088] font-title font-semibold text-5xl mb-20">
                        Informações Pessoais
                    </h1>
                    <div className="w-xl flex flex-col gap-7">
                        <InputPerfil valor={nome} setValor={setNome} legenda={"Nome"} />
                        <InputPerfil valor={email} setValor={setEmail} legenda={"Email"} />
                        <InputPerfil valor={userName} setValor={setUserName} legenda={"Nome de usuário"} />
                        <InputPerfil valor={senha} setValor={setSenha} legenda={"Senha"} />
                    </div>
                    <div className="flex gap-4 mt-14">
                        <button className="border border-[#896D95] text-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer">Editar</button>
                        <button className="border border-[#896D95] text-white bg-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer" onClick={() => editarUsuario()}>Salvar</button>
                        <button className="border border-[#E07A5F] text-[#E07A5F] font-text rounded-3xl w-40 h-12 cursor-pointer">Deletar Conta</button>
                    </div>
                </div>

            </div>
        </div>
    )

}
