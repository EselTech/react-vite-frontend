import { useState } from "react";

export function DrawerMaterial({ isOpen, setDrawerIsOpen, onSalvar }) {
    const [form, setForm] = useState({
        empresaId: 1,
        categoria: "UNIDADE",
        nome: "",
        descricao: "",
        qtdEstoque: 0,
        preco: 0
    });

    const categorias = ["UNIDADE", "CENTIMETRO", "MILILITROS", "GRAMA"];

    const handleSalvar = () => {
        onSalvar(form);
        setForm({ empresaId: 1, categoria: "UNIDADE", nome: "", descricao: "", qtdEstoque: 0, preco: 0 });
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} 
            onClick={() => setDrawerIsOpen(false)}
        >
            <div className="flex h-full w-full justify-end">
                <div 
                    className={`w-full md:w-1/3 h-screen bg-white flex flex-col shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`} 
                    onClick={e => e.stopPropagation()}
                >
                    
                    {/* Header estilizado como o de Orçamento */}
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between text-[#3D2B4F]">
                        <div>
                            <h2 className="font-semibold text-xl font-title tracking-tighter uppercase">Novo Material</h2>
                            <p className="text-sm font-text">Entrada de Insumo</p>
                        </div>
                        <button 
                            className="text-2xl border w-8 h-8 rounded-full flex items-center justify-center pb-1 cursor-pointer border-[#896D9533]" 
                            onClick={() => setDrawerIsOpen(false)}
                        > × </button>
                    </div>

                    {/* Corpo com scroll e espaçamento idêntico */}
                    <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 text-[#3D2B4F]">
                        
                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title">Nome do Insumo</label>
                            <input 
                                className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]" 
                                value={form.nome} 
                                onChange={e => setForm({...form, nome: e.target.value})} 
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title">Categoria de Medida</label>
                            <select 
                                className="border border-[#e8d8f0] bg-white rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] appearance-none"
                                value={form.categoria} 
                                onChange={e => setForm({...form, categoria: e.target.value})}
                            >
                                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="font-medium mb-2 font-title">Qtd. Estoque</label>
                                <input 
                                    type="number" 
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]" 
                                    value={form.qtdEstoque} 
                                    onChange={e => setForm({...form, qtdEstoque: Number(e.target.value)})} 
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium mb-2 font-title">Preço Un. (R$)</label>
                                <input 
                                    type="number" 
                                    className="border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95]" 
                                    value={form.preco} 
                                    onChange={e => setForm({...form, preco: Number(e.target.value)})} 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="font-medium mb-2 font-title">Descrição</label>
                            <textarea 
                                rows="3"
                                className="border border-[#e8d8f0] rounded-2xl p-4 outline-none focus:border-[#896D95] shadow-sm resize-none" 
                                value={form.descricao} 
                                onChange={e => setForm({...form, descricao: e.target.value})} 
                            />
                        </div>
                    </div>

                    {/* Footer fixo idêntico ao de Orçamento */}
                    <div className="h-24 border-t border-[#e8d8f0] flex items-center px-8 bg-white">
                        <button 
                            onClick={handleSalvar}
                            className="w-full bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white h-12 rounded-full font-semibold shadow-md hover:opacity-90 transition-opacity font-title tracking-widest cursor-pointer"
                        >
                            Salvar Material
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}