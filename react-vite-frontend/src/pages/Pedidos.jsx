import React, { useEffect, useState } from "react";
import DrawerPedidos from "../components/DrawerPedidos";
import { DrawerDetalhesPedido } from "../components/DrawerDetalhesPedido";
import { api } from "../provider/api";
import { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav";

export function Pedidos() {
    const [listaProdutos, setListaProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [dragOverCol, setDragOverCol] = useState(null);

    const [isNovoOpen, setIsNovoOpen] = useState(false);
    const [isDetalhesOpen, setIsDetalhesOpen] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    const colunas = [
        { id: "open", label: "Abertos", color: "text-emerald-700", headerFrom: "from-emerald-100", strip: "from-emerald-500 to-emerald-300", borderColor: "border-emerald-200" },
        { id: "ongoing", label: "Em Andamento", color: "text-amber-700", headerFrom: "from-amber-100", strip: "from-amber-500 to-amber-300", borderColor: "border-amber-300" },
        { id: "shipped", label: "Enviados", color: "text-blue-700", headerFrom: "from-blue-100", strip: "from-blue-500 to-blue-300", borderColor: "border-blue-100" },
        { id: "late", label: "Atrasados", color: "text-red-700", headerFrom: "from-red-100", strip: "from-red-500 to-red-300", borderColor: "border-red-200" },
        { id: "cancelled", label: "Cancelados", color: "text-gray-500", headerFrom: "from-gray-100", strip: "from-gray-400 to-gray-300", borderColor: "border-gray-200" },
    ];

    function carregarListaProdutos() {
        api.get("/produtos")
            .then(resposta => setListaProdutos(resposta.data))
            .catch(() => setListaProdutos([]));
    }

    function carregarPedidos() {
        api.get("/pedidos")
            .then(response => {
                setPedidos(response.data);
            })
            .catch(err => console.error("Erro ao carregar pedidos", err));
    }

    useEffect(() => {
        carregarListaProdutos();
        carregarPedidos();
    }, []);

    const abrirDetalhes = (pedido) => {
        setPedidoSelecionado(pedido);
        setIsDetalhesOpen(true);
    };

    const handleDrop = async (e, status) => {
        const id = e.dataTransfer.getData("orderId");
        setDragOverCol(null);

        const pedidoOriginal = pedidos.find(p => String(p.id) === id);
        if (!pedidoOriginal || pedidoOriginal.status === status) return;

        setPedidos(pedidos.map(p => String(p.id) === id ? { ...p, status: p.statusDestino } : p));

        try {
            await api.patch(`/pedidos/atualizar-status/${id}`, {}, {
                params: {
                    status: status
                }
            });
            carregarPedidos();
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            carregarPedidos();
        }
    };

    return (
        <div className="flex">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Nav tela="Pedidos" />
            <div className="h-screen overflow-y-auto flex flex-col w-10/12 bg-[#FAF7FB] font-text p-10">
                <header className="h-20 flex items-center justify-between mb-6 shrink-0">
                    <div>
                        <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">Pedidos</h1>
                        <p className="text-gray-400 m-0">Gerencie aqui todos os seus pedidos</p>
                    </div>
                    <button
                        onClick={() => setIsNovoOpen(true)}
                        className="bg-[#896D95] text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:bg-[#7a6285] transition-all active:scale-95 cursor-pointer font-title tracking-wider"
                    >
                        + Novo Pedido
                    </button>
                </header>

                <main className="p-8 flex gap-6 overflow-x-auto items-start flex-1 h-[calc(100vh-160px)]">
                    {colunas.map(coluna => (
                        <div
                            key={coluna.id}
                            onDragOver={(e) => { e.preventDefault(); setDragOverCol(coluna.id); }}
                            onDragLeave={() => setDragOverCol(null)}
                            onDrop={(e) => handleDrop(e, coluna.id)}
                            className={`w-80 max-h-full shrink-0 bg-white/60 rounded-3xl border flex flex-col overflow-hidden transition-all duration-200 ${dragOverCol === coluna.id ? "border-[#896D95] scale-[1.02] bg-[#f3eaf8]" : "border-purple-100"
                                }`}
                        >
                            {/* Header da Coluna */}
                            <div className={`p-5 border-b ${coluna.borderColor} bg-linear-to-b ${coluna.headerFrom} to-white flex justify-between items-center shrink-0`}>
                                <span className={`font-bold text-sm ${coluna.color} font-title`}>{coluna.label}</span>
                                <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-bold text-gray-500">
                                    {pedidos.filter(o => String(o.status).trim().toLowerCase() === String(coluna.id).trim().toLowerCase()).length}
                                </span>
                            </div>

                            {/* Lista de Pedidos com Scroll Próprio */}
                            <div className="p-4 space-y-4 overflow-y-auto flex-1 manual-scroll-style">
                                {pedidos
                                    .filter(pedido => String(pedido.status).trim().toLowerCase() === String(coluna.id).trim().toLowerCase())
                                    .map(pedido => (
                                        <div
                                            key={pedido.id}
                                            draggable
                                            onDragStart={(e) => e.dataTransfer.setData("orderId", String(pedido.id))}
                                            onClick={() => abrirDetalhes(pedido)}
                                            className="bg-white p-4 rounded-2xl border border-purple-50 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative overflow-hidden group"
                                        >
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${coluna.strip}`} />
                                            <div className="font-bold text-[#3D2B4F] mb-1 font-title">{pedido.nome || "Cliente"}</div>
                                            <div className="text-xs text-gray-400 line-clamp-2">{pedido.descricao || "Sem observações"}</div>

                                            <div className="flex justify-between mt-4 items-center">
                                                <span className="text-[10px] font-bold text-[#896D95] bg-purple-50 px-2 py-0.5 rounded">
                                                    {pedido.prazo ? new Date(pedido.prazo).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "—"}
                                                </span>
                                                <span className="font-bold text-[#3D2B4F] text-xs">
                                                    R$ {Number(pedido.valor || 0).toFixed(2).replace(".", ",")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </main>

                <DrawerPedidos
                    open={isNovoOpen}
                    onClose={() => setIsNovoOpen(false)}
                    colunas={colunas}
                    produtosDisponiveis={listaProdutos}
                    carregarPedidos={carregarPedidos}
                />

                <DrawerDetalhesPedido
                    isOpen={isDetalhesOpen}
                    setIsOpen={setIsDetalhesOpen}
                    pedido={pedidoSelecionado}
                    colunas={colunas}
                    carregarPedidos={carregarPedidos}
                />
            </div>
        </div>
    );
}