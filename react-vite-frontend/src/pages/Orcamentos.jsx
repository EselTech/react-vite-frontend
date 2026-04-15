import { useState } from "react";
import { CardOrcamento } from "../components/CardOrcamento";
import { DrawerOrcamento } from "../components/DrawerOrcamento";
import { DrawerDetalhes } from "../components/DrawerDetalhes";

export function Orcamentos() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [drawerDetalhesOpen, setDrawerDetalhesOpen] = useState(false);
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

    const [listaOrcamentos, setListaOrcamentos] = useState([]);

    const salvarNovoOrcamento = (novo) => {
        setListaOrcamentos((prev) => [novo, ...prev]);
        setDrawerIsOpen(false);
    };

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

    return (
        <div className="w-10/12 bg-white pl-20 pt-[4vh]">
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
                                className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-40 font-semibold cursor-pointer shadow-md transition-all duration-300 hover:hover:shadow-lg hover:brightness-110 active:scale-95"
                                onClick={() => setDrawerIsOpen(true)}
                            >
                                + Novo Orçamento
                            </button>
                        </div>

                        {listaOrcamentos.map((orc, index) => (
                            <CardOrcamento
                                key={index}
                                {...orc}
                                onClick={() => abrirDetalhes(orc)}
                            />
                        ))}
                    </>
                ) : (
                    <div className="w-2/4 text-center mx-auto mt-32 flex flex-col items-center">
                        <div className="w-30 h-30 rounded-full flex justify-center items-center text-7xl bg-[#ede0f0] animate-bounce">
                            🧾
                        </div>
                        <h1 className="font-title text-6xl font-bold text-[#695088]">Nenhum orçamento criado ainda</h1>
                        <button
                            className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-56 font-semibold cursor-pointer mt-16"
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

            <DrawerDetalhes
                isOpen={drawerDetalhesOpen}
                setIsOpen={setDrawerDetalhesOpen}
                orcamento={orcamentoSelecionado}
                onAtualizar={atualizarOrcamento}
            />
        </div>
    );
}