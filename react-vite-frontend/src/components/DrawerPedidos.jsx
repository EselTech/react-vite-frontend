import React, { useState, useEffect } from "react";
import CardProdutoPedido from "./CardProdutoPedido";

export default function DrawerPedidos(props) {
    const [form, setForm] = useState({
        title: "",
        customer: "",
        phone: "",
        deliveryAddress: "",
        observations: "",
        status: "open",
        items: [],
        deliveryDate: ""
    });

    useEffect(() => {
        if (props.order) {
            setForm({ ...props.order });
        } else {
            setForm({
                id: "PED-" + String(Date.now()).slice(-6),
                title: "",
                customer: "",
                phone: "",
                deliveryAddress: "",
                observations: "",
                status: "open",
                items: [],
                deliveryDate: ""
            });
        }
    }, [props.order, props.open]);

    if (!props.open) return null;

    const totalOrcamento = form.items.reduce((acc, i) => acc + (i.qty * i.preco), 0);

    async function salvar() {
        try {
            const response = await api.post("/pedidos", form);
            console.log("Pedido salvo:", response.data);
            props.onSave(form);
        } catch (error) {
            console.error("Erro ao salvar pedido:", error.response?.data || error.message);
        }
    }

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
                        <button
                            onClick={props.onClose}
                            className="text-[#3D2B4F] text-2xl border pt-1 w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer"
                        >
                            × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        {/* Título do Pedido */}
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title">Título do Pedido</label>
                            <input
                                placeholder="Ex: Pedido Corporativo"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                            />
                        </div>

                        {/* Nome e Telefone */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col text-[#3D2B4F]">
                                <label className="font-medium mb-2 font-title">Nome do Comprador</label>
                                <input

                                    placeholder="Ex: Maria Silva"
                                    value={form.customer}
                                    onChange={e => setForm({ ...form, customer: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                                />
                            </div>
                            <div className="flex flex-col text-[#3D2B4F]">
                                <label className="font-medium mb-2 font-title">Telefone</label>
                                <input
                                    placeholder="(00) 00000-0000"
                                    value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                                />
                            </div>
                        </div>

                        {/* Endereço de Entrega */}
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title">Endereço de Entrega</label>
                            <input
                                placeholder="Rua, número, bairro e cidade"
                                value={form.deliveryAddress}
                                onChange={e => setForm({ ...form, deliveryAddress: e.target.value })}
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                            />
                        </div>

                        {/* Status e Data */}
                        <div className="flex gap-4 text-[#3D2B4F]">
                            <div>
                                <label className="font-medium mb-2 font-title">Status do Pedido</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm({ ...form, status: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 bg-white outline-none"
                                >
                                    {props.colunas.map(b => <option key={b.id} value={b.id}>{b.label}</option>)}
                                </select>

                            </div>
                            <div>
                                <label className="font-medium mb-2 font-title">Data de entrega</label>
                                <input
                                    type="date"
                                    value={form.deliveryDate}
                                    onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none"
                                />
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title">Observações</label>
                            <input
                                placeholder="Detalhes adicionais, cores, temas..."
                                value={form.observations}
                                onChange={e => setForm({ ...form, observations: e.target.value })}
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]"
                            />
                        </div>

                        {/* Lista de Produtos */}
                        <div>
                            <p className="font-medium mb-2 font-title">Produtos</p>
                            <div className="flex flex-col gap-4">
                                {props.produtosIniciais.map(p => (
                                    <CardProdutoPedido
                                        key={p.id}
                                        emoji={p.emoji}
                                        nome={p.nome}
                                        preco={p.preco}
                                        qty={form.items.find(i => i.productId === p.id)?.qty || 0}
                                        onUpdate={(newQty) => {
                                            let updatedItems = [...form.items];
                                            const index = updatedItems.findIndex(i => i.productId === p.id);
                                            if (newQty <= 0) {
                                                updatedItems = updatedItems.filter(i => i.productId !== p.id);
                                            } else if (index >= 0) {
                                                updatedItems[index].qty = newQty;
                                            } else {
                                                updatedItems.push({
                                                    productId: p.id,
                                                    nome: p.nome,
                                                    preco: p.preco,
                                                    emoji: p.emoji,
                                                    qty: newQty
                                                });
                                            }
                                            setForm({ ...form, items: updatedItems });
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 border-t border-[#e8d8f0]">
                        <button
                            onClick={salvar}
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