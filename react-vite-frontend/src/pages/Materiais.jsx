import { useEffect, useState } from "react";
import { DrawerMaterial } from "../components/DrawerMaterial";
import { DrawerDetalhesMaterial } from "../components/DrawerDetalhesMaterial";
import axios from "axios";
import { api } from "../provider/api";

export function Materiais() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [drawerDetalhesOpen, setDrawerDetalhesOpen] = useState(false);
    const [materialSelecionado, setMaterialSelecionado] = useState(null);
    const [listaMateriais, setListaMateriais] = useState([]);

    const salvarNovoMaterial = (novo) => {
        const materialComId = { ...novo, id: Date.now() };
        setListaMateriais((prev) => [materialComId, ...prev]);
        setDrawerIsOpen(false);
    };

    const abrirDetalhes = (material) => {
        
        setMaterialSelecionado(material);
        setDrawerDetalhesOpen(true);
    };

    const atualizarMaterial = (materialEditado) => {
        // setListaMateriais((prev) =>
        //     prev.map((mat) =>
        //         mat.id === materialSelecionado.id ? materialEditado : mat
        //     )
        // );
        // setMaterialSelecionado(materialEditado);
        carregarMateriais()
    };

    function carregarMateriais() {
        api.get("/materiais").then(resposta => setListaMateriais(resposta.data))
    }

    useEffect(() => { 
        carregarMateriais()
    }, [])

    return (
        <div className="w-10/12 bg-white pl-20 pt-[4vh]">
            <div className="w-11/12 mt-8">
                <div className="h-16 flex justify-between w-full items-center mb-12">
                    <div>
                        <h1 className={`text-[#695088] font-title font-semibold text-5xl self-start ${listaMateriais.length < 1 ? "hidden" : "block"}`}>
                            Estoque de Materiais
                        </h1>
                        <p className={`text-gray-400 m-0 font-text ${listaMateriais.length < 1 ? "hidden" : "block"}`}>
                            Controle seus insumos e matéria-prima
                        </p>
                    </div>
                    <button
                        className={`bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-48 font-semibold cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95 ${listaMateriais.length > 0 ? "block" : "hidden"}`}
                        onClick={() => setDrawerIsOpen(true)}
                    >
                        + Novo Material
                    </button>
                </div>

                {listaMateriais.length > 0 ? (
                    <div className="w-full overflow-hidden border border-[#e8d8f0] rounded-2xl shadow-[0_4px_24px_rgba(137,109,149,0.05)]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f4f9] border-b border-[#e8d8f0]">
                                    <th className="p-5 font-title text-[#695088] font-bold">Material</th>
                                    <th className="p-5 font-title text-[#695088] font-bold">Categoria</th>
                                    <th className="p-5 font-title text-[#695088] font-bold text-center">Estoque</th>
                                    <th className="p-5 font-title text-[#695088] font-bold text-right">Preço Un.</th>
                                    <th className="p-5 font-title text-[#695088] font-bold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaMateriais.map((mat) => (
                                    <tr
                                        key={mat.id}
                                        className="border-b border-[#e8d8f0] hover:bg-[#fcf0ff] transition-colors group cursor-pointer font-text"
                                        onClick={() => abrirDetalhes(mat)}
                                    >
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[#3D2B4F] text-sm uppercase">{mat.nome}</span>
                                                <span className="text-[10px] text-gray-400 line-clamp-1">{mat.descricao}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-xs font-bold text-[#896D95] bg-[#ede0f0] px-2 py-1 rounded-md uppercase tracking-wider">
                                                {mat.categoria}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${mat.qtdEstoque < 10 ? 'bg-red-100 text-red-500' : 'bg-[#ede0f0] text-[#7a6688]'}`}>
                                                {mat.qtdEstoque} itens
                                            </span>
                                        </td>
                                        <td className="p-5 text-right font-bold text-[#695088]">
                                            R$ {Number(mat.preco).toFixed(2)}
                                        </td>
                                        <td className="p-5 text-center">
                                            <button className="text-xs text-[#7a6688] bg-[#ede0f0] group-hover:bg-[#C8A0C0] group-hover:text-white transition-all px-4 py-1.5 rounded-lg font-semibold">
                                                Detalhes
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="w-2/4 text-center mx-auto mt-16 flex flex-col items-center">
                        <div className="w-30 h-30 rounded-full flex justify-center items-center text-7xl bg-[#ede0f0] animate-bounce">
                            📦
                        </div>
                        <h1 className="font-title text-5xl font-bold text-[#695088]">Adicione seu primeiro material</h1>
                        <p className="text-gray-400 mt-4 font-text">Cadastre seus papéis, fitas e colas para começar a criar produtos.</p>
                        <button
                            className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-56 font-semibold cursor-pointer mt-12 shadow-md"
                            onClick={() => setDrawerIsOpen(true)}
                        >
                            Cadastrar Material
                        </button>
                    </div>
                )}
            </div>

            <DrawerMaterial
                isOpen={drawerIsOpen}
                setDrawerIsOpen={setDrawerIsOpen}
                onSalvar={salvarNovoMaterial}
            />

            <DrawerDetalhesMaterial
                isOpen={drawerDetalhesOpen}
                setIsOpen={setDrawerDetalhesOpen}
                material={materialSelecionado}
                onAtualizar={atualizarMaterial}
            />
        </div>
    );
}