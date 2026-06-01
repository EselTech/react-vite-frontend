import { useEffect, useState } from "react";
import { CardOrcamento } from "../components/CardOrcamento";
import { DrawerOrcamento } from "../components/DrawerOrcamento";
import { DrawerDetalhesOrcamento } from "../components/DrawerDetalhesOrcamento";
import toast, { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";

export function Orcamentos() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [drawerDetalhesOpen, setDrawerDetalhesOpen] = useState(false);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);
    const [listaOrcamentos, setListaOrcamentos] = useState([]);

    const abrirDetalhes = (orcamento) => {
        setOrcamentoSelecionado(orcamento);
        setDrawerDetalhesOpen(true);
    };

    const atualizarOrcamento = (orcamentoEditado) => {
        setListaOrcamentos((prev) =>
            prev.map((orc) =>
                orc === orcamentoSelecionado ? orcamentoEditado : orc
            )
        );
        setOrcamentoSelecionado(orcamentoEditado);
    }

    function carregarOrcamentos() {
        api.get("/orcamentos").then(resposta => setListaOrcamentos(resposta.data))
    }

    useEffect(() => {
        carregarOrcamentos()
    }, [])

    const salvarNovoOrcamento = (novo) => {
        try {
            if (novo.valor <= 0) {
                toast.error('Por favor, selecione ao menos um produto', {
                    icon: "⚠️"
                })
                return
            }
            api.post("/orcamentos", novo)
            carregarOrcamentos()
            toast.success("Orçamento finalizado com sucesso")
        } catch {
            console.error("Erro ao salvar produto:", error.response?.data || error.message);
            toast.error("Erro ao realizar orçamento")
        }
        setDrawerIsOpen(false);
    };


    return (
        <div className="flex h-screen overflow-hidden">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />            <Nav tela="Orcamentos" />
            <div className="w-10/12 bg-white pl-20 pt-[4vh] overflow-y-auto">
                <div className="w-11/12 mt-8 flex flex-wrap gap-2">
                    {listaOrcamentos.length > 0 ? (
                        <>
                            <div className="h-16 flex justify-between w-11/12 items-center mb-12">
                                <div>
                                    <h1 className="text-[#695088] font-title font-semibold text-5xl self-start">
                                        Meus Orçamentos
                                    </h1>
                                    <p className="text-gray-400 m-0">
                                        Faça o orçamento de seus pedidos
                                    </p>

                                </div>
                                <button
                                    className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-44 font-semibold cursor-pointer shadow-md transition-all duration-300 hover:hover:shadow-lg hover:brightness-110 active:scale-95 font-title tracking-wider"
                                    onClick={() => setDrawerIsOpen(true)}
                                >
                                    + Novo Orçamento
                                </button>
                            </div>

                            {listaOrcamentos.map((orcamento, index) => (
                                <CardOrcamento
                                    key={index}
                                    {...orcamento}
                                    onClick={() => abrirDetalhes(orcamento)}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="w-2/4 text-center mx-auto mt-32 flex flex-col items-center">
                            <div className="w-30 h-30 rounded-full flex justify-center items-center text-7xl bg-[#ede0f0] animate-bounce">
                                🧾
                            </div>
                            <h1 className="font-title text-5xl font-bold text-[#695088]">Nenhum orçamento criado ainda</h1>
                            <p className="text-gray-400 mt-4 font-text">Combine materiais e defina seus lucros de forma automatizada.</p>
                            <button
                                className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-56 font-semibold cursor-pointer mt-12"
                                onClick={() => setDrawerIsOpen(true)}
                            >
                                Criar Primeiro Orçamento
                            </button>
                        </div>
                    )}
                </div>

                <DrawerOrcamento
                    isOpen={drawerIsOpen}
                    setDrawerIsOpen={setDrawerIsOpen}
                    onSalvar={salvarNovoOrcamento}
                />

                <DrawerDetalhesOrcamento
                    isOpen={drawerDetalhesOpen}
                    setIsOpen={setDrawerDetalhesOpen}
                    orcamento={orcamentoSelecionado}
                    carregarOrcamentos={carregarOrcamentos}
                />
            </div>
        </div>
    );
}