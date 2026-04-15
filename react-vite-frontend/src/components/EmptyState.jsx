export function EmptyState({ onNew }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-175 text-center gap-8">

      <div className="hero-float w-42.5 h-42.5 rounded-full mx-auto mb-7 bg-linear-to-br from-[#EDE0F0] to-[#f5eaff] flex items-center justify-center text-[72px] shadow-[0_8px_40px_rgba(137,109,149,0.15)]" >🗃️</div>

      <h1 className="font-fredoka text-[clamp(1.9rem,4vw,2.8rem)] text-[#3D2B4F] font-semibold leading-[1.15]">
        Nenhum produto<br/>cadastrado ainda
      </h1>

      <button onClick={onNew} className="font-quicksand border-none rounded-3xl cursor-pointer font-bold w-60 h-8 bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white shadow-[0_6px_24px_rgba(137,109,149,0.3)] transition-all duration-200 items-center">
        Cadastrar Primeiro Produto
      </button>
    </div>
  );
}


