import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../provider/api";

export function DrawerDetalhesMaterial({ isOpen, setIsOpen, material, onAtualizar, carregarMateriais }) {
    const [editMaterial, setEditMaterial] = useState(null);

    // Sincroniza o estado interno quando o material ou a abertura da drawer muda
    useEffect(() => {
        if (material) {
            setEditMaterial({ ...material });
        }
    }, [material, isOpen]);

    if (!editMaterial) return null;

    const handleChange = (field, value) => {
        setEditMaterial(prev => ({ ...prev, [field]: value }));
    };

    async function handleSalvar() {
        try {
            // Tratando o material que será enviado para seguir as definições da request
            const { empresa, ...materialSemEmpresa } = editMaterial
            const materialFinal = { ...materialSemEmpresa, empresaId: 1 }

            const response = await api.put(`/materiais/${editMaterial.id}`, materialFinal);
            console.log("Material atualizado:", response.data);
            onAtualizar(editMaterial);
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar:", error.response?.data || error.message);
        }
    }

    async function handleExcluir() {
        try {
            console.log(editMaterial);
            
            const response = await api.delete(`/materiais/${editMaterial.id}`);
            setIsOpen(false);
            carregarMateriais()
        } catch (error) {
            console.error("Erro ao excluir:", error.response?.data || error.message);
        }
    }

    const categorias = ["UNIDADE", "CENTIMETRO", "MILILITROS", "GRAMA"];

    return (
        <div
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            onClick={() => setIsOpen(false)}
        >
            <div className="flex h-full w-full justify-end">
                <div
                    className={`w-full md:w-1/3 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header Identico ao de Orçamento */}
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between text-[#3D2B4F]">
                        <div>
                            <h2 className="font-semibold text-xl tracking-tight font-title uppercase">Editar Material</h2>
                            <p className="text-sm font-text">Altere as informações do insumo</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer border-[#896D9533] hover:bg-white/50 transition-colors"
                        > × </button>
                    </div>

                    {/* Corpo com inputs editáveis diretamente */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 text-[#3D2B4F]">

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 uppercase text-[10px] tracking-widest">Nome do Insumo</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] transition-colors"
                                value={editMaterial.nome}
                                onChange={e => handleChange("nome", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 uppercase text-[10px] tracking-widest">Categoria</label>
                            <select
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] appearance-none"
                                value={editMaterial.categoria}
                                onChange={e => handleChange("categoria", e.target.value)}
                            >
                                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-[#7a6688] font-bold font-text mb-1 uppercase text-[10px] tracking-widest">Qtd em Estoque</label>
                                <input
                                    type="number"
                                    className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                    value={editMaterial.qtdEstoque}
                                    onChange={e => handleChange("qtdEstoque", Number(e.target.value))}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[#7a6688] font-bold font-text mb-1 uppercase text-[10px] tracking-widest">Preço Un. (R$)</label>
                                <input
                                    type="number"
                                    className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                    value={editMaterial.preco}
                                    onChange={e => handleChange("preco", Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold font-text mb-1 uppercase text-[10px] tracking-widest">Descrição</label>
                            <textarea
                                rows="4"
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-4 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] resize-none"
                                value={editMaterial.descricao}
                                onChange={e => handleChange("descricao", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="h-28 border-t border-[#e8d8f0] flex items-center px-8 bg-white">
                        <div className="w-full flex justify-between items-center gap-4">
                            <button
                                onClick={handleSalvar}
                                className="w-3/4 bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                            >
                                Salvar Alterações
                            </button>
                            <button
                                onClick={handleExcluir}
                                className="w-1/4 bg-linear-to-br from-[#f34444] to-[#bb3737] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                            >
                                Exlcuir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}