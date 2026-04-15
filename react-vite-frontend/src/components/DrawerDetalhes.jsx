import { useState, useEffect } from "react";

export function DrawerDetalhes({ isOpen, setIsOpen, orcamento, onAtualizar }) {
    const [editOrcamento, setEditOrcamento] = useState(null);

    useEffect(() => {
        if (orcamento) setEditOrcamento({ ...orcamento });
    }, [orcamento, isOpen]);

    if (!editOrcamento) return null;

    const handleChange = (field, value) => {
        setEditOrcamento(prev => ({ ...prev, [field]: value }));
    };

    const handleUpdateQtd = (index, novaQtd) => {
        if (novaQtd < 1) return;
        const novosProdutos = [...editOrcamento.produtos];
        novosProdutos[index].qtd = novaQtd;

        const novoTotal = novosProdutos.reduce((acc, p) => acc + (p.qtd * p.precoUnitario), 0);

        setEditOrcamento(prev => ({
            ...prev,
            produtos: novosProdutos,
            precoTotal: novoTotal
        }));
    };

    const handleSalvar = () => {
        onAtualizar(editOrcamento);
        setIsOpen(false);
    };

    return (
        <div
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            onClick={() => setIsOpen(false)}
        >
            <div className="flex h-full w-full justify-end">
                <div
                    className={`w-full md:w-1/3 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl tracking-tight font-title">Editar Orçamento</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Altere as informações necessárias</p>
                        </div>
                        <button
                            className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer hover:bg-white/50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        > × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 ">Título do Orçamento</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] transition-colors"
                                value={editOrcamento.titulo}
                                onChange={(e) => handleChange("titulo", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 ">Comprador</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] transition-colors"
                                value={editOrcamento.comprador}
                                onChange={(e) => handleChange("comprador", e.target.value)}
                            />
                        </div>

                        <div>
                            <p className="text-[#7a6688] font-bold font-text mb-1">Ajustar Quantidades</p>
                            <div className="flex flex-col gap-3">
                                {editOrcamento.produtos.map((p, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-2xl border border-[#e8d8f0] bg-white shadow-sm">
                                        <div className="flex flex-col">
                                            <span className="text-[#3D2B4F] font-bold">{p.nome}</span>
                                            <span className="text-xs text-[#7a6688]">unid: R$ {p.precoUnitario.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center bg-[#f8f4f9] rounded-lg border border-[#e8d8f0] px-2 py-1">
                                                <button onClick={() => handleUpdateQtd(i, p.qtd - 1)} className="px-2 text-[#896D95] font-bold">-</button>
                                                <span className="px-2 font-bold text-[#3D2B4F] min-w-[20px] text-center">{p.qtd}</span>
                                                <button onClick={() => handleUpdateQtd(i, p.qtd + 1)} className="px-2 text-[#896D95] font-bold">+</button>
                                            </div>
                                            <span className="text-[#695088] font-bold text-sm min-w-[70px] text-right">
                                                R$ {(p.qtd * p.precoUnitario).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-28 border-t border-[#e8d8f0] flex items-center px-8 bg-white">
                        <div className="w-full flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[#7a6688] font-bold font-text ">Novo Total</span>
                                <span className="text-3xl font-black text-[#695088]">R$ {editOrcamento.precoTotal.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleSalvar}
                                className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white px-8 h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                            >
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}