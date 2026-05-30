import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { InputPerfil } from "../components/InputPerfil";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";
import { useNavigate } from "react-router-dom";

export function Perfil() {

    const id = localStorage.getItem("userid")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [senha, setSenha] = useState("")
    const [block, setBlock] = useState(true)
    const navigate = useNavigate();

    function carregarUsuario() {
        try {
            api.get(`/usuario/find-by-id/${id}`).then(response => {
                setNome(response.data.nome),
                    setEmail(response.data.email),
                    setUserName(response.data.username),
                    setSenha(response.data.senha)
            })
        } catch (error) {
            toast.error("Erro ao carregar usuários")
            console.log(error)
        }
    }

    function editarUsuario() {
        let copia = {}
        try {
            api.get(`/usuario/find-by-id/${id}`).then(response => {
                if (response.data.nome == nome && response.data.email == email && response.data.username == userName && response.data.senha == senha) {
                    setBlock(true)
                    return
                }
                copia = {
                    ...response.data,
                    nome: nome,
                    email: email,
                    username: userName,
                    senha: senha
                }
                api.patch(`/usuario/atualizar/${id}`, copia).then(() => {
                    toast.success("Alterações salvas com sucesso")
                })
                setBlock(true)
            })
        } catch (error) {
            toast.error("Não foi possível salvar suas alterações, tente novamente mais tarde")
            console.log(error)
        }
    }

    function deletarUsuario() {
        try {
            api.delete(`/usuario/remover/${id}`).then(() => {
                toast.success("Conta excluída com sucesso!");
                navigate("/")

            });
        } catch (error) {
            toast.error("Erro ao tentar excluir a conta.");
            console.log(error);
        }
    }

    function confirmarExclusao() {
        toast((t) => (
            <div className="flex flex-col gap-4 w-80">
                <span className="text-base font-medium text-gray-800 leading-relaxed">
                    Tem certeza que deseja deletar sua conta?
                    <br /> Esta ação é permanente e não poderá ser desfeita.
                </span>
                <div className="flex justify-center gap-3 mt-2">
                    <button
                        className="px-4 py-2 text-sm bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-linear-to-br from-[#f34444] to-[#bb3737] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-text font-bold rounded-xl w-30 h-12 cursor-pointer"
                        onClick={() => {
                            toast.dismiss(t.id);
                            deletarUsuario();
                        }}
                    >
                        Sim, excluir
                    </button>
                </div>
            </div>
        ), {
            id: "confirmar-exclusao-toast", 
            duration: Infinity,
            position: "top-center",
            className: "min-w-[400px] max-w-lg p-5 rounded-2xl shadow-2xl border border-gray-100"
        });
    }

    useEffect(() => {
        carregarUsuario()
    }, [])

    return (
        <div className="flex">
            <Nav tela="Perfil" />
            <div className="w-10/12 bg-white pl-28 pt-[4vh] flex">

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />

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
                        {block ? <button className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-bold font-text rounded-3xl w-24 h-12 cursor-pointer hover:bg-[#896D95] hover:text-[#F4F4F4] hover:font-bold" onClick={() => block ? setBlock(false) : setBlock(true)}>Editar</button> : <button className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-bold bg-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer" onClick={() => editarUsuario()}>Salvar</button>}

                        <button
                            className="bg-linear-to-br from-[#f34444] to-[#bb3737] hover:shadow-lg hover:brightness-110 active:scale-95 text-[#F4F4F4] font-text font-bold rounded-3xl w-40 h-12 cursor-pointer"
                            onClick={confirmarExclusao}
                        >
                            Deletar Conta
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}