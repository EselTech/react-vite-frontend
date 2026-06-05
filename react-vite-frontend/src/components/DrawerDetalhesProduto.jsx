import { useState, useEffect } from "react";
import { api } from "../provider/api";
import toast from "react-hot-toast";

export function DrawerDetalhesProduto({ isOpen, setIsOpen, produto, onAtualizar, carregarProdutos }) {
    const [editProd, setEditProd] = useState(null);

    useEffect(() => {
        if (produto) setEditProd({ ...produto });
    }, [produto, isOpen]);

    if (!editProd) return null;

    const handleChange = (field, value) => {
        setEditProd(prev => ({ ...prev, [field]: value }));
    };

    async function handleSalvar() {
        try {

            const { empresa, ...produtoSemEmpresa } = editProd
            const listaMateriaisFormatados = produtoSemEmpresa.listaMateriais.map((material) => {
                return {
                    materialId: material.material.id,
                    quantidade: material.quantidade
                };
            });

            const { listaMateriais, ...produtoSemMateriais } = produtoSemEmpresa
            const produtoFinal = { materiais: listaMateriaisFormatados, empresaId: 1, ...produtoSemMateriais }

            console.log(produtoFinal);


            const response = await api.put(`/produtos/${editProd.id}`, produtoFinal);
            console.log("Produto atualizado:", response.data);
            onAtualizar(editProd);
            setIsOpen(false);
            toast.success("Produto alterado com sucesso")
        } catch (error) {
            toast.error("Erro ao alterar produto")
            console.error("Erro ao atualizar:", error.response?.data || error.message);
        }
    }

    async function handleExcluir() {
        try {
            const response = await api.delete(`/produtos/${editProd.id}`);
            setIsOpen(false);
            carregarProdutos()
            toast.success("Produto excluído com sucesso")
        } catch (error) {
            toast.error("Não é possível excluir este produto")
            console.error("Erro ao excluir:", error.response?.data || error.message);
        }
    }

    function identificarUnidade(unidade) {
        if (unidade == 'CENTIMETRO') {
            return 'cm'
        } 
        if (unidade == 'MILILITROS') {
            return 'ml'
        }
        if (unidade == 'GRAMAS') {
            return 'g'
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
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Editar Produto</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Atualize as informações do estoque</p>
                        </div>
                        <button className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer" onClick={() => setIsOpen(false)}> × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#7a6688]">Nome</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editProd.nome}
                                onChange={(e) => handleChange("nome", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#7a6688]">Preço (R$)</label>
                            <input
                                type="number"
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editProd.preco}
                                onChange={(e) => handleChange("preco", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title text-[#7a6688]">Descrição</label>
                            <textarea
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95] resize-none"
                                rows="3"
                                value={editProd.descricao}
                                onChange={(e) => handleChange("descricao", e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Produtos deste Pedido</label>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                                {produto.listaMateriais && produto.listaMateriais.length > 0 ? (
                                    produto.listaMateriais.map((material) => (
                                        <div
                                            key={material?.id}
                                            className="flex justify-between items-center bg-[#f8f4f9] border border-[#e8d8f0] p-3 rounded-xl"
                                        >
                                            <span className="font-semibold text-sm">
                                                {material.material?.nome || "Produto não identificado"}
                                            </span>
                                            <span className="bg-[#ede0f0] text-[#3D2B4F] font-bold text-xs px-3 py-1 rounded-full border border-[#896D9522]">
                                                Qtd: {material?.quantidade}{identificarUnidade(material.material?.categoria)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Nenhum material adicionado a este produto.</p>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="h-28 border-t border-[#e8d8f0] flex items-center px-8 gap-4 bg-white">
                        <button
                            onClick={handleSalvar}
                            className="w-2/3 bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all font-title tracking-widest cursor-pointer"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            onClick={handleExcluir}
                            className="w-1/3 bg-linear-to-br from-[#f34444] to-[#bb3737] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all font-title tracking-widest cursor-pointer"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}