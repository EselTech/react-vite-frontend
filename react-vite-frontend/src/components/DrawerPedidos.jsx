import React, { useState, useEffect } from "react";
import CardProdutoPedido from "./CardProdutoPedido";
import { api } from "../provider/api";
import toast from "react-hot-toast";

export default function DrawerPedidos(props) {
    const produtosDisponiveis = props.produtosDisponiveis || [];

    const [form, setForm] = useState({
        empresaId: 1,
        nome: "",
        descricao: "",
        valor: 0,
        status: "",
        prazo: "",
        listaProdutos: [],
    });

    function salvarPedido() {
        const valorTotalCalculado = form.listaProdutos.reduce((total, item) => {
            const infoProduto = produtosDisponiveis.find(p => p.id === item.produtoId);
            return total + (infoProduto ? infoProduto.preco * item.qtdProduto : 0);
        }, 0);

        const payload = {
            ...form,
            valor: valorTotalCalculado
        };

        try {
            if (payload.valor <= 0 || !payload.nome || !payload.prazo) {
                toast.error('Por favor, preencha os campos corretamente', {
                    icon: "⚠️"
                });
                return;
            }
            api.post("/pedidos", payload)
                .then(() => {
                    props.onClose();
                    props.carregarPedidos();
                })
                .catch(erro => console.error("Erro ao salvar pedido:", erro));
            toast.success("Pedido salvo com sucesso");
        } catch (error) {
            console.error("Erro ao salvar pedido:", error.response?.data || error.message);
            toast.error("Erro ao salvar pedido");
        }
    }

    useEffect(() => {
        if (props.order) {
            setForm({ ...props.order });
        } else {
            setForm({
                empresaId: 1,
                nome: "",
                descricao: "",
                valor: 0,
                status: props.colunas?.[0]?.id || "open",
                prazo: "",
                listaProdutos: [],
            });
        }
    }, [props.order, props.open]);

    if (!props.open) return null;

    return (
        <div
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${props.open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={props.onClose}
        >
            <div className="flex h-full w-full justify-end">
                <div
                    className={`w-full md:w-125 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 transform ${props.open ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Novo Pedido</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Personalize o pedido</p>
                        </div>
                        <button onClick={props.onClose} className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">×</button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Nome do Comprador</label>
                            <input
                                placeholder="Ex: Maria Silva"
                                value={form.nome}
                                onChange={e => setForm({ ...form, nome: e.target.value })}
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                            />
                        </div>

                        <div className="flex gap-4 text-[#3D2B4F]">
                            <div className="flex-1">
                                <label className="font-medium mb-2 font-title text-[#3D2B4F] text-sm block">Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm({ ...form, status: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 bg-white outline-none w-full"
                                >
                                    {props.colunas?.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="font-medium mb-2 font-title text-[#3D2B4F] text-sm block">Data de entrega</label>
                                <input
                                    type="date"
                                    value={form.prazo}
                                    onChange={e => setForm({ ...form, prazo: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none w-full"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title text-[#3D2B4F]">Observações</label>
                            <input
                                placeholder="Detalhes adicionais..."
                                value={form.descricao}
                                onChange={e => setForm({ ...form, descricao: e.target.value })}
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                            />
                        </div>

                        <div>
                            <p className="font-medium mb-2 font-title text-[#3D2B4F]">Produtos</p>
                            <div className="flex flex-col gap-1 ">
                                {produtosDisponiveis.map(produto => (
                                    <CardProdutoPedido
                                        key={produto.id}
                                        pedido={form}
                                        atualizarPedido={setForm}
                                        produto={produto}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-[#e8d8f0]">
                        <button
                            onClick={salvarPedido}
                            className="w-full bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity font-title tracking-widest cursor-pointer"
                        >
                            Salvar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}