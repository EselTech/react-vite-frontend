import { useState } from "react";
import { CardProdutoOrcamento } from "./CardProdutoOrcamento";

export function DrawerOrcamento({ isOpen, setDrawerIsOpen, onSalvar }) {
    const [titulo, setTitulo] = useState("");
    const [comprador, setComprador] = useState("");

    const [carrinho, setCarrinho] = useState({});

    const produtosDisponiveis = [
        { id: 1, nome: "Sacola Kraft", preco: 2.50 },
        { id: 2, nome: "Caixa Presente", preco: 15.00 },
        { id: 3, nome: "Fita Cetim", preco: 0.80 }
    ];

    const atualizarQtd = (nome, qtd) => {
        setCarrinho(prev => ({ ...prev, [nome]: qtd }));
    };

    const handleCalcular = () => {
        const agora = new Date();

        const selecionados = produtosDisponiveis
            .filter(p => carrinho[p.nome] > 0)
            .map(p => ({
                nome: p.nome,
                qtd: carrinho[p.nome],
                precoUnitario: p.preco
            }));

        const total = produtosDisponiveis.reduce((acc, p) => {
            return acc + (p.preco * (carrinho[p.nome] || 0));
        }, 0);

        const novoOrcamento = {
            titulo: titulo || "Orçamento sem título",
            comprador: comprador || "Cliente",
            dia: agora.getDate().toString().padStart(2, '0'),
            mes: agora.toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
            ano: agora.getFullYear().toString(),
            hora: agora.getHours() + ":" + agora.getMinutes().toString().padStart(2, '0'),
            produtos: selecionados,
            precoTotal: total
        };

        onSalvar(novoOrcamento);
        
        setTitulo("");
        setComprador("");
        setCarrinho({});
    };

    return (
        <div
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            onClick={() => setDrawerIsOpen(false)}
        >
            <div className="flex h-full w-full justify-end">
                <div
                    className={`w-full md:w-1/3 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Novo Orçamento</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Selecione produtos e personalize</p>
                        </div>
                        <button
                            className="text-[#3D2B4F] text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer"
                            onClick={() => setDrawerIsOpen(false)}
                        > × </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title">Título do Orçamento</label>
                            <input 
                                placeholder="Ex: Festa de 15 anos da Maria" 
                                type="text" 
                                value={titulo} 
                                onChange={(e) => setTitulo(e.target.value)} 
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]" 
                            />
                        </div>

                        <div className="flex flex-col text-[#3D2B4F]">
                            <label className="font-medium mb-2 font-title">Nome do Comprador</label>
                            <input 
                                placeholder="Ex: Ana Claudia Silva" 
                                type="text" 
                                value={comprador} 
                                onChange={(e) => setComprador(e.target.value)} 
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]" 
                            />
                        </div>

                        <div>
                            <p className="font-medium mb-4 text-[#3D2B4F] font-title">Escolha os Produtos</p>
                            <div className="flex flex-col gap-4">
                                {produtosDisponiveis.map(p => (
                                    <CardProdutoOrcamento 
                                        key={p.id} 
                                        nome={p.nome} 
                                        preco={p.preco} 
                                        qtd={carrinho[p.nome] || 0} 
                                        onUpdate={(qtd) => atualizarQtd(p.nome, qtd)} 
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="h-24 border-t border-[#e8d8f0] flex items-center px-8">
                        <button
                            onClick={handleCalcular}
                            className="w-full bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity font-title tracking-widest cursor-pointer"
                        > 
                            Calcular Orçamento 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}