export function CardOrcamento(props) {
  return (
    <div 
      onClick={props.onClick} 
      className="flex flex-col w-full sm:w-[48%] lg:w-[32%] min-h-65 bg-[#FDFDFD] overflow-hidden border rounded-2xl border-[#e8d8f0] p-5 shadow-[0_4px_24px_rgba(137,109,149,0.1)] relative cursor-pointer hover:border-[#C8A0C0] transition-all group"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-br from-[#896D95] to-[#C8A0C0]"></div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start mt-2">
        <h1 className="font-title text-[#695088] font-bold text-lg leading-tight shrink-0 max-w-[60%]">
          {props.titulo}
        </h1>
        <span className="text-[10px] text-[#7a6688] bg-[#ede0f0] px-3 py-1 rounded-full font-medium whitespace-nowrap self-start font-text">
          {`${props.dia} de ${props.mes}. ${props.ano} • ${props.hora}`}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p className="font-text text-sm text-[#7a6688]">👤 Comprador:</p>
        <span className="text-xs text-[#7a6688] bg-[#ede0f0] px-3 py-0.5 rounded-full font-semibold font-text ">
          {props.comprador}
        </span>
      </div>

      <div className="mt-4 flex-1">
        <p className="font-text text-[10px] text-[#7a6688] font-bold uppercase tracking-wider mb-2">
          Produtos
        </p>
        <div className="flex flex-wrap gap-1.5">
          {props.produtos.map((produto, index) => (
            <span key={index} className="text-[12px] text-[#7a6688] bg-[#f5eaff] px-2 py-0.5 rounded-xl font-semibold font-text ">
              {produto.nome}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#e8d8f0] flex justify-between items-center">
        <div>
          <p className="font-text text-[10px] text-[#7a6688] font-medium uppercase">Total</p>
          <h2 className="font-title text-[#695088] font-bold text-xl">
            R$ {props.precoTotal.toFixed(2)}
          </h2>
        </div>
        <button className="text-xs text-[#7a6688] bg-[#ede0f0] group-hover:bg-[#C8A0C0] group-hover:text-white transition-colors px-4 py-2 rounded-xl font-semibold flex items-center gap-1 font-text">
          Detalhes <span>→</span>
        </button>
      </div>
    </div>
  );
}