export function InputCadastro({ nome, placeholder, aoMudar, erro, type = "text", inputsBloqueados }) {
    return (
        <div className="flex flex-col text-left font-text font-semibold w-96">
            <label className="mb-1 text-sm">{nome}</label>
            <input
                disabled={inputsBloqueados}
                type={type}
                placeholder={placeholder}
                onChange={(e) => aoMudar(e.target.value)}
                className={`placeholder:text-gray-500 placeholder:font-medium placeholder:text-sm ${inputsBloqueados ? "bg-gray-200" : "bg-white"} border rounded-md w-full h-12 text-xs font-semibold px-4 outline-none transition-all ${erro ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]" : "border-[#EDE0F0] focus:border-[#896D95]"} `}
            />
            <div className="h-4 mt-1">
                {erro && <span className="text-red-500 text-[10px] font-medium">{erro}</span>}
            </div>
        </div>
    );
}