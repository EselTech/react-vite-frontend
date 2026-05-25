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
    const [block, setBlock] = useState(true)

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
                        <InputPerfil isBlocked={block} valor={nome} setValor={setNome} legenda={"Nome"} />
                        <InputPerfil isBlocked={block} valor={email} setValor={setEmail} legenda={"Email"} />
                        <InputPerfil isBlocked={block} valor={userName} setValor={setUserName} legenda={"Nome de usuário"} />
                        <InputPerfil isBlocked={block} valor={senha} setValor={setSenha} legenda={"Senha"} />
                    </div>
                    <div className="flex gap-8 mt-14">
                        <button className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-bold font-text rounded-3xl w-24 h-12 cursor-pointer hover:bg-[#896D95] hover:text-[#F4F4F4] hover:font-bold" onClick={() => block ? setBlock(false) : setBlock(true)}>Editar</button>
                        <button className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-bold bg-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer" onClick={() => editarUsuario()}>Salvar</button>
                        <button className="bg-linear-to-br from-[#f34444] to-[#bb3737] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-text font-bold rounded-3xl w-40 h-12 cursor-pointer">Deletar Conta</button>
                    </div>
                </div>

            </div>
        </div>
    )

}
