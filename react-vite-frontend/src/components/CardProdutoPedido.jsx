import React from "react";

export default function CardProdutoPedido(props) {
    const isSelecionado = props.qty > 0;

    return (
        <div
            className={`transition-all duration-300 border rounded-2xl overflow-hidden cursor-pointer ${isSelecionado ? "bg-[#fcf0ff] border-[#896D95]" : "border-[#896D9533]  hover:border-[#896D9566]"
                }`}
            style={{ height: isSelecionado ? "160px" : "112px" }}
        >
            <div
                className="h-28 flex px-4 items-center"
                onClick={() => props.onUpdate(isSelecionado ? 0 : 1)}
            >
                <div className="w-1/12 text-3xl">{props.emoji}</div>
                <div className="w-8/12 pl-6 flex flex-col justify-center">
                    <p className="font-bold text-[#3D2B4F] font-title">
                        {props.nome}
                    </p>
                    <p className="text-xs text-[#7a6688] font-text">
                        Unitário: R$ {props.preco.toFixed(2).replace(".", ",")}
                    </p>
                </div>
                <div className="w-3/12 text-right font-bold text-[#3D2B4F] text-lg font-title">
                    R$ {props.preco.toFixed(2).replace(".", ",")}
                </div>
            </div>

            {isSelecionado && (
                <div
                    className="h-12 border-t border-[#ede0f0] flex items-center justify-between px-6 "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col">
                        <p className="text-[10px] text-[#7a6688] uppercase font-bold tracking-tighter">Subtotal</p>
                        <p className="text-sm font-bold text-[#695088] font-title">
                            R$ {(props.preco * props.qty).toFixed(2).replace(".", ",")}
                        </p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button
                            className="w-7 h-7 rounded-full font-bold text-[#7a6688] flex items-center justify-center hover:bg-[#896D95] hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); props.onUpdate(props.qty - 1); }}
                        >
                            –
                        </button>
                        <span className="font-bold text-[#3D2B4F] text-lg w-4 text-center">
                            {props.qty}
                        </span>
                        <button
                            className="w-7 h-7 rounded-full font-bold text-[#7a6688] flex items-center justify-center hover:bg-[#896D95] hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); props.onUpdate(props.qty + 1); }}
                        >
                            +
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}