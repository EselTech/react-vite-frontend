import { useEffect, useState } from "react";
import { CardMaterialSelecao } from "./CardMaterialSelecao";
import axios from "axios";
import { api } from "../provider/api";

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

    async function handleSalvar() {
        const materiaisFormatados = Object.entries(quantidades)
            .filter(([_, qtd]) => qtd > 0)
            .map(([id, qtd]) => ({
                materialId: Number(id),
                quantidade: Number(qtd)
            }));

        const novoProduto = {
            empresaId: 1,
            nome: nome || "Material não nomeado",
            descricao,
            custo: custoTotal,
            preco: precoSugerido,
            custoMaoDeObra: Number(custoMaoDeObra),
            margemLucroPercentual: Number(margemLucro),
            qtdEstoque: 0,
            materiais: materiaisFormatados
        };

        try {
            const response = await api.post("/produtos", novoProduto);
            console.log("Produto salvo:", response.data);
            onSalvar(novoProduto);
            setDrawerIsOpen(false);
        } catch (error) {
            console.error("Erro ao salvar produto:", error.response?.data || error.message);
        }
    }

    return (
        <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`} onClick={() => setDrawerIsOpen(false)}>
            <div className="flex h-full justify-end">
                <div className={`w-full md:w-112.5 h-screen bg-[#fcfaff] shadow-2xl transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"}`} onClick={e => e.stopPropagation()}>

                    {/* Header */}
                    <div className="bg-[#EDE0F0] h-24 border-b border-[#896D9533] flex items-center px-8 justify-between text-[#3D2B4F]">
                        <div>
                            <h2 className="text-[#3D2B4F] font-semibold text-xl font-title">Novo Produto</h2>
                            <p className="text-[#3D2B4F] text-sm font-text">Composição e Precificação</p>
                        </div>
                    </div>

                    <div className="p-6 overflow-y-auto h-[calc(100vh-180px)] custom-scrollbar">
                        {/* Corpo */}
                        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-6 text-[#3D2B4F]">
                            <div className="flex flex-col">
                                <label className="font-medium mb-2 font-title">Identificação</label>
                                <input
                                    placeholder="Ex: Sacola Temática Luxo"
                                    className="font-text bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm"
                                    value={nome} onChange={e => setNome(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="font-medium mb-2 font-title">Mão de Obra (R$)</label>
                                    <input type="number" className="bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm" value={custoMaoDeObra} onChange={e => setCustoMaoDeObra(e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium mb-2 font-title">Lucro (%)</label>
                                    <input type="number" className="bg-white border border-[#e8d8f0] rounded-2xl h-12 px-4 outline-none focus:border-[#896D95] shadow-sm" value={margemLucro} onChange={e => setMargemLucro(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Listagem de Materiais */}
                        <div className="mb-4 flex items-center justify-between">
                            <label className="font-medium mb-4 mt-4 px-2 text-[#3D2B4F] font-title">Escolha os Materiais Usados</label>
                            <span className="text-[12px] font-title bg-[#896D95] text-white px-2 py-0.5 rounded-full">{materiaisDisponiveis.length} disponíveis</span>
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
                            <p className="text-[10px] text-gray-400 uppercase font-black font-title tracking-wider text-center">Preço de Venda</p>
                            <p className="text-3xl font-black font-title text-[#695088]">R$ {precoSugerido.toFixed(2)}</p>
                        </div>
                        <button
                            onClick={handleSalvar}
                            className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white px-8 h-14 rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 text-title"
                        >
                            Finalizar Produto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}