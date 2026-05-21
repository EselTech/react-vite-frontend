import { useState, useEffect } from "react";
import { api } from "../provider/api";
import toast from "react-hot-toast";

export function DrawerDetalhesPedido({ isOpen, setIsOpen, pedido, carregarPedidos, colunas }) {
    const [editPedido, setEditPedido] = useState(null);

    useEffect(() => {
        if (pedido) setEditPedido({ ...pedido });
    }, [pedido, isOpen]);

    if (!editPedido) return null;

    const handleChange = (field, value) => {
        setEditPedido(prev => ({ ...prev, [field]: value }));
    };

    async function handleSalvar() {
        try {
            const payload = {
                nome: editPedido.nome,
                descricao: editPedido.descricao,
                status: editPedido.status,
                prazo: editPedido.prazo,
                valor: editPedido.valor,
                empresaId: 1
            };
            
            if (payload.valor <= 0 || !payload.nome || !payload.prazo) {
                toast.error('Por favor, preencha os campos corretamente', {
                    icon: "⚠️"
                })
                return
            }

            await api.put(`/pedidos/${editPedido.id}`, payload);
            carregarPedidos();
            toast.success("Pedido alterado com sucesso")
            setIsOpen(false);
        } catch (error) {
            console.error("Erro ao atualizar pedido:", error.message);
            toast.error("Erro ao alterar pedido")
        }
    }

    async function handleExcluir() {
        try {
            await api.delete(`/pedidos/${editPedido.id}`);
            carregarPedidos();
            setIsOpen(false);
            toast.success("Pedido excluído com sucesso")
        } catch (error) {
            console.error("Erro ao excluir pedido:", error.message);
            toast.error("Erro ao excluir pedido")
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
                    <div className="bg-[#f3eaf8] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Detalhes do Pedido</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Altere informações do seu pedido</p>
                        </div>
                        <button className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer" onClick={() => setIsOpen(false)}> × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold text-xs uppercase mb-1">Nome do Cliente</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editPedido.nome}
                                onChange={(e) => handleChange("nome", e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="text-[#7a6688] font-bold text-xs uppercase mb-1">Status</label>
                                <select
                                    className="w-full text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none"
                                    value={editPedido.status}
                                    onChange={(e) => handleChange("status", e.target.value)}
                                >
                                    {colunas.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-[#7a6688] font-bold text-xs uppercase mb-1">Prazo</label>
                                <input
                                    type="date"
                                    className="w-full text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none"
                                    value={editPedido.prazo}
                                    onChange={(e) => handleChange("prazo", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold text-xs uppercase mb-1">Descrição / Observações</label>
                            <textarea
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none resize-none"
                                rows="3"
                                value={editPedido.descricao}
                                onChange={(e) => handleChange("descricao", e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="text-[#7a6688] font-bold text-xs uppercase mb-2">Produtos deste Pedido</label>
                            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                                {editPedido.listaProdutos && editPedido.listaProdutos.length > 0 ? (
                                    editPedido.listaProdutos.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center bg-[#f8f4f9] border border-[#e8d8f0] p-3 rounded-xl"
                                        >
                                            <span className="font-semibold text-sm">
                                                {item.produto?.nome || "Produto não identificado"}
                                            </span>
                                            <span className="bg-[#ede0f0] text-[#3D2B4F] font-bold text-xs px-3 py-1 rounded-full border border-[#896D9522]">
                                                Qtd: {item.qtdProduto}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 italic">Nenhum produto adicionado a este pedido.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[#7a6688] font-bold text-xs uppercase mb-1">Preço (R$)</label>
                            <input
                                className="text-[#3D2B4F] font-semibold bg-[#f8f4f9] p-3 rounded-xl border border-[#e8d8f0] outline-none focus:border-[#896D95]"
                                value={editPedido.valor}
                                onChange={(e) => handleChange("valor", e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="p-8 border-t border-[#e8d8f0] flex gap-4 bg-white">
                        <button
                            onClick={handleSalvar}
                            className="flex-1 bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            onClick={handleExcluir}
                            className="w-1/3 bg-linear-to-br from-[#f34444] to-[#bb3737] text-white h-12 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}