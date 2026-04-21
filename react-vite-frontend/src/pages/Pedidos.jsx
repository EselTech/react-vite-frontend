import React, { useState } from "react";
import DrawerPedidos from "../components/DrawerPedidos";

const produtosIniciais = [
    { id: "p1", nome: "Sacola de Papel", preco: 45.00, emoji: "🛍️" },
    { id: "p2", nome: "Agenda Personalizada", preco: 32.50, emoji: "📒" },
    { id: "p3", nome: "Caneta Laser", preco: 15.00, emoji: "🖊️" },
    { id: "p4", nome: "Kit Corporativo", preco: 89.90, emoji: "📦" },
];

const colunas = [
    { id: "open", label: "Abertos", color: "text-emerald-700", headerFrom: "from-emerald-100", strip: "from-emerald-500 to-emerald-300" },
    { id: "ongoing", label: "Em Andamento", color: "text-amber-700", headerFrom: "from-amber-100", strip: "from-amber-500 to-amber-300" },
    { id: "shipped", label: "Enviados", color: "text-blue-700", headerFrom: "from-blue-100", strip: "from-blue-500 to-blue-300" },
    { id: "late", label: "Atrasados", color: "text-red-700", headerFrom: "from-red-100", strip: "from-red-500 to-red-300" },
    { id: "cancelled", label: "Cancelados", color: "text-gray-500", headerFrom: "from-gray-100", strip: "from-gray-400 to-gray-300" },
];

export function Pedidos() {
    const [orders, setOrders] = useState([]);
    const [drawer, setDrawer] = useState({ open: false, order: null });
    const [dragOverCol, setDragOverCol] = useState(null);

    const handleSave = (form) => {
        if (drawer.order) setOrders(orders.map(o => o.id === form.id ? form : o));
        else setOrders([form, ...orders]);
        setDrawer({ open: false, order: null });
    };

    return (
        <div className="h-screen overflow-y-auto flex flex-col w-10/12 bg-[#FAF7FB] font-text p-10">

            <header className="h-20 flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h1 className="text-4xl font-title font-bold text-[#634C89] mb-1">Pedidos</h1>
                    <p className="text-gray-400 m-0">Gerencie aqui todos os seus pedidos</p>
                </div>
                <button onClick={() => setDrawer({ open: true, order: null })} className="bg-[#896D95] text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:bg-[#7a6285] transition-all active:scale-95">
                    + Novo Pedido
                </button>
            </header>

            <main className="p-8 flex gap-6 overflow-x-auto items-start flex-1">
                {colunas.map(b => (
                    <div key={b.id}
                        onDragOver={(e) => { e.preventDefault(); setDragOverCol(b.id); }}
                        onDragLeave={() => setDragOverCol(null)}
                        onDrop={(e) => {
                            const id = e.dataTransfer.getData("orderId");
                            setOrders(orders.map(o => o.id === id ? { ...o, status: b.id } : o));
                            setDragOverCol(null);
                        }}
                        className={`w-80 shrink-0 bg-white/60 rounded-3xl border flex flex-col overflow-hidden transition-all duration-200 ${dragOverCol === b.id ? "border-[#896D95] scale-[1.02] bg-[#f3eaf8]" : "border-purple-100"}`}
                    >
                        <div className={`p-5 border-b bg-linear-to-b ${b.headerFrom} to-white flex justify-between items-center`}>
                            <span className={`font-bold text-sm ${b.color} font-title`}>{b.label}</span>
                            <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-bold text-gray-500">
                                {orders.filter(o => o.status === b.id).length}
                            </span>
                        </div>

                        <div className="p-4 space-y-4 overflow-y-auto">
                            {orders.filter(o => o.status === b.id).map(o => (
                                <div key={o.id} draggable onDragStart={(e) => e.dataTransfer.setData("orderId", o.id)} onClick={() => setDrawer({ open: true, order: o })}
                                    className="bg-white p-4 rounded-2xl border border-purple-50 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative overflow-hidden group"
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${b.strip}`} />
                                    <div className="font-bold text-[#3D2B4F] mb-1 font-title">{o.title || "Sem título"}</div>
                                    <div className="text-xs text-gray-400">{o.customer || "Cliente"}</div>
                                    <div className="flex justify-between mt-4 items-center">
                                        <span className="text-[10px] font-bold text-[#896D95] bg-purple-50 px-2 py-0.5 rounded">
                                            {o.deliveryDate ? new Date(o.deliveryDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) : "—"}
                                        </span>
                                        <span className="font-bold text-[#3D2B4F] text-xs">
                                            R$ {o.items.reduce((acc, i) => acc + (i.qty * i.preco), 0).toFixed(2).replace(".", ",")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            <DrawerPedidos
                open={drawer.open}
                order={drawer.order}
                produtosIniciais={produtosIniciais}
                colunas={colunas}
                onClose={() => setDrawer({ open: false, order: null })}
                onSave={handleSave}
            />
        </div>
    );
}