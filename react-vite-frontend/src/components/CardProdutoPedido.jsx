import React, { useState, useEffect } from "react";

export default function CardProdutoPedido({ produto, pedido, atualizarPedido }) {
    const [qtd, setQtd] = useState(0);
    const isSelecionado = qtd > 0;

    useEffect(() => {
        const listaSemProdutoAtual = pedido.listaProdutos.filter(
            (item) => item.produtoId !== produto.id
        );

        let novaLista = listaSemProdutoAtual;

        if (qtd > 0) {
            novaLista = [
                ...listaSemProdutoAtual,
                {
                    produtoId: produto.id,
                    qtdProduto: qtd
                }
            ];
        }

        atualizarPedido({ ...pedido, listaProdutos: novaLista });
    }, [qtd]);

    const handleCardClick = () => {
        setQtd(isSelecionado ? 0 : 1);
    };

    return (
        <div
            className={`transition-all duration-300 border rounded-2xl overflow-hidden cursor-pointer mb-3 ${isSelecionado ? "h-40 bg-[#fcf0ff] border-[#896D95] shadow-sm" : "h-24 border-[#896D9533] bg-white hover:border-[#896D9566]"
                }`}
        >
            <div className="h-24 flex px-4 items-center" onClick={handleCardClick}>
                <div className="w-12 h-12 rounded-xl bg-[#f8f4f9] flex items-center justify-center text-2xl">
                    📦
                </div>
                <div className="flex-1 pl-4 flex flex-col justify-center">
                    <p className="text-[#3D2B4F] font-title font-semibold">{produto.nome}</p>
                    <p className="text-xs text-[#7a6688] font-title">Unitário: R$ {produto.preco.toFixed(2)}</p>
                </div>
                <div className="text-right font-title font-bold text-[#695088]">
                    R$ {produto.preco.toFixed(2)}
                </div>
            </div>

            {isSelecionado && (
                <div className="h-16 border-t border-[#ede0f0] flex items-center justify-between px-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col">
                        <p className="text-[9px] text-[#7a6688] uppercase font-black tracking-widest">Subtotal Item</p>
                        <p className="text-sm font-bold text-[#695088]">R$ {(produto.preco * qtd).toFixed(2)}</p>
                    </div>
                    <div className="flex gap-4 items-center bg-white px-3 py-1 rounded-full border border-[#ede0f0]">
                        <button
                            className="w-6 h-6 flex items-center justify-center hover:bg-[#ede0f0] rounded-full font-bold text-[#7a6688] transition-colors"
                            onClick={() => setQtd(Math.max(0, qtd - 1))}
                        > − </button>
                        <span className="font-bold text-[#3D2B4F] min-w-5 text-center">{qtd}</span>
                        <button
                            className="w-6 h-6 flex items-center justify-center hover:bg-[#ede0f0] rounded-full font-bold text-[#7a6688] transition-colors"
                            onClick={() => setQtd(qtd + 1)}
                        > + </button>
                    </div>
                </div>
            )}
        </div>
    );
}