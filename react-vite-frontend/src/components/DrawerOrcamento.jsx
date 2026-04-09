export function DrawerOrcamento(props) {
    return (

        <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-500 ${props.isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => props.setDrawerIsOpen(false)}>
            <div className="flex h-full w-full justify-end">

                <div className={`w-1/3 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 ease-in-out transform ${props.isOpen ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="bg-[#e8d8f0] h-24 border-b border-[#896D95] flex items-center px-8 justify-between">

                        <div>
                            <h2 className="text-[#695088] font-bold text-xl">Novo Orçamento</h2>
                            <p className="text-[#7a6688] text-sm">
                                Selecione produtos e personalize
                            </p>
                        </div>

                        <button className="text-[#695088] text-2xl font-bold cursor-pointer hover:scale-110 transition-transform" onClick={() => props.setDrawerIsOpen(false)}>
                            ✕
                        </button>

                    </div>

                    <div className="flex-1 overflow-y-auto p-8">

                    </div>

                    <div className="h-24 border-t border-[#e8d8f0] flex items-center px-8">
                        <button className="w-full bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity">
                            Calcular Orçamento
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}