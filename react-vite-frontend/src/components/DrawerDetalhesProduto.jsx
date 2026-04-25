import { useState, useEffect } from "react";

export function DrawerDetalhesProduto({ isOpen, setIsOpen, produto, onAtualizar }) {
    const [editProd, setEditProd] = useState(null);

    useEffect(() => {
        if (produto) setEditProd({ ...produto });
    }, [produto, isOpen]);

    if (!editProd) return null;

    const handleChange = (field, value) => {
        setEditProd(prev => ({ ...prev, [field]: value }));
    };

    const handleSalvar = () => {
        onAtualizar(editProd);
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
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Editar Produto</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Atualize as informações do estoque</p>
                        </div>
                        <button className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer" onClick={() => setIsOpen(false)}> × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 ">Nome</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editProd.nome}
                                onChange={(e) => handleChange("nome", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 ">Preço (R$)</label>
                            <input
                                type="number"
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editProd.preco}
                                onChange={(e) => handleChange("preco", Number(e.target.value))}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 ">Descrição</label>
                            <textarea
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] resize-none"
                                rows="3"
                                value={editProd.descricao}
                                onChange={(e) => handleChange("descricao", e.target.value)}
                            />
                        </div>

                        <div className="p-4 rounded-2xl border border-[#e8d8f0] bg-white shadow-sm flex justify-between items-center">
                            <span className="text-[#7a6688] font-bold">Quantidade em Estoque</span>
                            <div className="flex items-center gap-3">
                                {/* Ajustado de .estoque para .qtdEstoque conforme o JSON */}
                                <button onClick={() => handleChange("qtdEstoque", Math.max(0, (editProd.qtdEstoque || 0) - 1))} className="w-8 h-8 bg-[#ede0f0] rounded-full font-bold text-[#896D95]">-</button>
                                <span className="font-bold text-[#3D2B4F] text-lg">{editProd.qtdEstoque || 0}</span>
                                <button onClick={() => handleChange("qtdEstoque", (editProd.qtdEstoque || 0) + 1)} className="w-8 h-8 bg-[#ede0f0] rounded-full font-bold text-[#896D95]">+</button>
                            </div>
                        </div>
                    </div>

                    <div className="h-28 border-t border-[#e8d8f0] flex items-center px-8 bg-white">
                        <button
                            onClick={handleSalvar}
                            className="w-full bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}