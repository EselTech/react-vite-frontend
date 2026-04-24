import { useState } from "react";
import { CardMaterialSelecao } from "./CardMaterialSelecao";

export function DrawerProduto({ isOpen, setDrawerIsOpen, onSalvar, materiaisDisponiveis = [] }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [custoMaoDeObra, setCustoMaoDeObra] = useState(0);
    const [margemLucro, setMargemLucro] = useState(0);
    const [quantidades, setQuantidades] = useState({});

    const custoMateriais = materiaisDisponiveis.reduce((acc, mat) => {
        const qtd = quantidades[mat.id] || 0;
        return acc + (mat.preco * qtd);
    }, 0);

    const custoTotal = custoMateriais + Number(custoMaoDeObra);
    const precoSugerido = margemLucro > 0 ? custoTotal * (1 + (margemLucro / 100)) : custoTotal;

    const atualizarQuantidade = (id, novaQtd) => {
        setQuantidades(prev => ({
            ...prev,
            [id]: novaQtd
        }));
    };

    const handleSalvar = () => {
        const materiaisFormatados = Object.entries(quantidades)
            .filter(([_, qtd]) => qtd > 0)
            .map(([id, qtd]) => ({
                materialId: Number(id),
                qtdUsada: Number(qtd) 
            }));

        const novoProduto = {
            empresaId: 1,
            nome,
            descricao,
            custo: custoTotal,
            preco: precoSugerido,
            custoMaoDeObra: Number(custoMaoDeObra),
            margemLucroPercentual: Number(margemLucro),
            qtdEstoque: 0,
            materiaisUsados: materiaisFormatados
        };

        onSalvar(novoProduto);
        setDrawerIsOpen(false);
    };

    return (
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} onClick={() => setDrawerIsOpen(false)}>
            <div className="flex h-full justify-end">
                <div className={`w-full md:w-112.5 h-screen bg-[#fcfaff] shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`} onClick={e => e.stopPropagation()}>

                    {/* Header */}
                    <div className="bg-white p-8 border-b border-[#e8d8f0]">
                        <h2 className="text-[#695088] font-black text-2xl font-title uppercase tracking-tighter">Novo Produto</h2>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Composição e Precificação</p>
                    </div>

                    <div className="p-6 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
                        {/* Informações Básicas */}
                        <div className="space-y-4 mb-8">
                            <div className="flex flex-col">
                                <label className="text-[10px] font-black text-[#896D95] mb-1 uppercase ml-1">Identificação</label>
                                <input
                                    placeholder="Ex: Sacola Temática Luxo"
                                    className="bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm"
                                    value={nome} onChange={e => setNome(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black text-[#896D95] mb-1 uppercase ml-1">Mão de Obra (R$)</label>
                                    <input type="number" className="bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm" value={custoMaoDeObra} onChange={e => setCustoMaoDeObra(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[10px] font-black text-[#896D95] mb-1 uppercase ml-1">Lucro (%)</label>
                                    <input type="number" className="bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm" value={margemLucro} onChange={e => setMargemLucro(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Listagem de Materiais */}
                        <div className="mb-4 flex items-center justify-between">
                            <label className="text-[10px] font-black text-[#896D95] uppercase tracking-widest ml-1 text-center">Selecionar Materiais</label>
                            <span className="text-[10px] bg-[#896D95] text-white px-2 py-0.5 rounded-full">{materiaisDisponiveis.length} disponíveis</span>
                        </div>

                        <div className="pb-20">
                            {materiaisDisponiveis.map(mat => (
                                <CardMaterialSelecao
                                    key={mat.id}
                                    material={mat}
                                    qtd={quantidades[mat.id] || 0}
                                    onUpdate={(novaQtd) => atualizarQuantidade(mat.id, novaQtd)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer Fixo */}
                    <div className="h-28 border-t border-[#e8d8f0] p-6 bg-white absolute bottom-0 w-full flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter text-center">Preço de Venda</p>
                            <p className="text-3xl font-black text-[#695088]">R$ {precoSugerido.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleSalvar}
                            disabled={!nome || precoSugerido <= 0}
                            className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white px-8 h-14 rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                        >
                            Finalizar Produto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}