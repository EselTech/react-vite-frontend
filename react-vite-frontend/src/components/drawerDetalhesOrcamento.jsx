import { useState, useEffect } from "react";
import { api } from "../provider/api";
import toast from "react-hot-toast";

export function DrawerDetalhesOrcamento({ isOpen, setIsOpen, orcamento, carregarOrcamentos }) {
    const [editOrcamento, setEditOrcamento] = useState(null);

    useEffect(() => {
        if (orcamento) {
            setEditOrcamento({
                id: orcamento.id,
                titulo: orcamento.titulo || "",
                cliente: orcamento.cliente || "",
                valor: orcamento.valor ? Number(orcamento.valor) : 0
            });
        }
    }, [orcamento, isOpen]);

    if (!editOrcamento) return null;

    const handleChange = (field, value) => {
        setEditOrcamento(prev => ({ ...prev, [field]: value }));
    };

    async function handleSalvar() {
        try {
            const payload = {
                empresaId: 1,
                titulo: editOrcamento.titulo,
                cliente: editOrcamento.cliente,
                valor: Number(editOrcamento.valor)
            };

            await api.put(`/orcamentos/${editOrcamento.id}`, payload);

            carregarOrcamentos();
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar orçamento:", error.message);
        }
    }

    async function handleExcluir() {
        try {
            await api.delete(`/orcamentos/${editOrcamento.id}`);
            carregarOrcamentos(); 
            setIsOpen(false);     
            toast.success("Orçamento excluído com sucesso")
        } catch (error) {
            console.error("Erro ao excluir orçamento:", error.message);
            toast.error("Erro ao excluir orçamento")
        }
    }

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
                    {/* Cabeçalho */}
                    <div className="bg-[#f3eaf8] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Detalhes do Orçamento</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Visualize ou altere os dados salvos</p>
                        </div>
                        <button
                            className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    {/* Formulário de Edição */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Título do Orçamento</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editOrcamento.titulo}
                                onChange={(e) => handleChange("titulo", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Nome do Cliente</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editOrcamento.cliente}
                                onChange={(e) => handleChange("cliente", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Preço Calculado (R$)</label>
                            <input
                                type="number"
                                step="0.01"
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editOrcamento.valor}
                                onChange={(e) => handleChange("valor", e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="p-8 border-t border-[#e8d8f0] flex gap-4 bg-white">
                        <button
                            onClick={handleSalvar}
                            className="flex-1 bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all cursor-pointer font-title tracking-widest"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            onClick={handleExcluir}
                            className="w-1/3 bg-linear-to-br from-[#f34444] to-[#bb3737] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all cursor-pointer font-title tracking-widest"
                        >
                            Excluir
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}