import { useState } from "react";

export function CardProdutoOrcamento({ nome, preco, qtd, onUpdate }) {
  const [isSelecionado, setIsSelecionado] = useState(false);

  const handleCardClick = () => {
    const novoEstado = !isSelecionado;
    setIsSelecionado(novoEstado);
    onUpdate(novoEstado ? 1 : 0);
  };

  return (
    <div className={`transition-all border rounded-2xl overflow-hidden cursor-pointer ${
        isSelecionado ? "h-40 bg-[#fcf0ff] border-[#896D95]" : "h-28 border-[#896D9533] bg-white"
      }`}
    >
      <div className="h-28 flex px-4 items-center" onClick={handleCardClick}>
        <div className="w-1/12 text-3xl">🛍️</div>
        <div className="w-8/12 pl-4 flex flex-col justify-center">
          <p className="font-bold text-[#3D2B4F]">{nome}</p>
          <p className="text-xs text-[#7a6688]">Unitário: R$ {preco.toFixed(2)}</p>
        </div>
        <div className="w-3/12 text-right font-bold text-[#3D2B4F] text-lg">
          R$ {preco.toFixed(2)}
        </div>
      </div>

      {isSelecionado && (
        <div className="h-12 border-t border-[#ede0f0] flex items-center justify-between px-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col">
            <p className="text-[10px] text-[#7a6688] uppercase font-bold">Subtotal</p>
            <p className="text-sm font-bold text-[#695088]">R$ {(preco * qtd).toFixed(2)}</p>
          </div>
          <div className="flex gap-4 items-center">
            <button className="w-6 h-6 bg-[#ede0f0] rounded-full font-bold text-[#7a6688]" onClick={() => qtd > 1 && onUpdate(qtd - 1)}> − </button>
            <span className="font-bold text-[#3D2B4F]">{qtd}</span>
            <button className="w-6 h-6 bg-[#ede0f0] rounded-full font-bold text-[#7a6688]" onClick={() => onUpdate(qtd + 1)}> + </button>
          </div>
        </div>
      )}
    </div>
  );
}