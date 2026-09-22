import { useState, useEffect } from "react";
import { DrawerProduto } from "../components/DrawerProduto";
import { DrawerDetalhesProduto } from "../components/DrawerDetalhesProduto";
import { api } from "../provider/api";
import { Toaster } from "react-hot-toast";
import { Nav } from "../components/Nav";

export function Produtos() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [drawerDetalhesOpen, setDrawerDetalhesOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [listaMateriais, setListaMateriais] = useState([]);

    const abrirDetalhes = (produto) => {
        setProdutoSelecionado(produto);
        setDrawerDetalhesOpen(true);
    };

    const atualizarProduto = (produtoEditado) => {
        setListaProdutos((prev) =>
            prev.map((prod) =>
                prod.id === produtoSelecionado.id ? produtoEditado : prod
            )
        );
        setProdutoSelecionado(produtoEditado);
    };

    function carregarMateriais() {
        api.get("/materiais")
            .then(resposta => {
                setListaMateriais(resposta.data);
            })
            .catch(erro => {
                if (erro.response && erro.response.status == 404) {
                    console.log("Nenhum material cadastrado");
                } else {
                    console.log("Ocorreu um erro inesperado:", erro.message);
                }
            });
    }

    function carregarProdutos() {
        api.get("/produtos")
            .then(resposta => {
                setListaProdutos(resposta.data);
            })
            .catch(erro => {
                setListaProdutos([]);
                if (erro.response && erro.response.status == 404) {
                    console.log("Nenhum material cadastrado");
                } else {
                    console.log("Erro ao carregar produtos:", erro.message);
                }
            });
    }

    function carregarProdutosShopee() {
        api.post("/api/shopee/importar-produtos", {
            "shopId": 227406387,
            "empresaId": 1,
            "pageSize": 100
        }).then(response => carregarProdutos())
    }

    useEffect(() => {
        carregarMateriais()
        carregarProdutos()
    }, [])

    return (
        <div className="flex h-screen overflow-hidden">
            <Nav tela="Produtos" />
            <div className="w-full flex-1 min-w-0 bg-white px-4 pb-20 pt-[4vh] md:w-10/12 md:pl-10 md:pb-0 lg:pl-20 overflow-y-auto">
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="w-full max-w-350 mt-8">
                    <div className="min-h-16 flex flex-col justify-center gap-4 w-full items-start mb-8 md:flex-row md:justify-between md:items-center md:mb-12">
                        <div>
                            <h1 className={`text-[#695088] font-title font-semibold text-3xl md:text-4xl lg:text-5xl self-start ${listaProdutos.length < 1 ? "hidden" : "block"}`}>
                                Estoque de Produtos
                            </h1>
                            <p className={`text-gray-400 m-0 ${listaProdutos.length < 1 ? "hidden" : "block"}`}>
                                Gerencie produtos, composições e margens de lucro
                            </p>
                        </div>
                        {/* <button
                        className={`bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-58 font-semibold cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95 ${listaProdutos.length > 0 ? "block" : "hidden"}`}
                        onClick={carregarProdutosShopee}
                    >
                        Carregar Produtos Shopee
                    </button> */}
                        <button
                            className={`bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-full sm:w-44 font-semibold cursor-pointer shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-110 active:scale-95 font-title tracking-wider ${listaProdutos.length > 0 ? "block" : "hidden"}`}
                            onClick={() => setDrawerIsOpen(true)}
                        >
                            + Novo Produto
                        </button>
                    </div>

                    {listaProdutos.length > 0 ? (
                        <div className="w-full overflow-x-auto border border-[#e8d8f0] rounded-2xl shadow-[0_4px_24px_rgba(137,109,149,0.05)]">
                            <table className="w-full min-w-155 text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f8f4f9] border-b border-[#e8d8f0]">
                                        <th className="p-5 font-title text-[#695088] font-bold">Produto</th>
                                        <th className="p-5 font-title text-[#695088] font-bold pl-8">Custo Total</th>
                                        <th className="p-5 font-title text-[#695088] font-bold">Preço de Venda</th>
                                        <th className="p-5 font-title text-[#695088] font-bold pl-10">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaProdutos.map((prod) => (

                                        <tr
                                            key={prod.id}
                                            className="border-b border-[#e8d8f0] hover:bg-[#fcf0ff] transition-colors group cursor-pointer font-text"
                                            onClick={() => abrirDetalhes(prod)}
                                        >
                                            <td className="p-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-[#3D2B4F] text-sm">{prod.nome}</span>
                                                    <span className="text-[10px] text-gray-400 line-clamp-1">{prod.descricao}</span>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <span className="p-5 text-right font-bold text-[#695088]">
                                                    R$ {Number(prod.custo).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <span className="p-5 text-right font-bold text-[#695088]">
                                                    R$ {Number(prod.preco).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <button className="text-xs text-[#7a6688] bg-[#ede0f0] group-hover:bg-[#C8A0C0] group-hover:text-white transition-all px-4 py-1.5 rounded-lg font-semibold cursor-pointer">
                                                    Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="w-11/12 md:w-3/4 lg:w-2/4 text-center mx-auto mt-12 md:mt-16 flex flex-col items-center">
                            <div className="w-24 h-24 md:w-30 md:h-30 rounded-full flex justify-center items-center text-5xl md:text-7xl bg-[#ede0f0] animate-bounce">
                                📦
                            </div>
                            <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-[#695088]">Crie seu primeiro produto</h1>
                            <p className="text-gray-400 mt-4 font-text">Combine materiais e defina seus lucros de forma automatizada.</p>
                            <button
                                className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-full max-w-56 font-semibold cursor-pointer mt-8 md:mt-12 shadow-md hover:scale-105 transition-transform font-title tracking-wider"
                                onClick={() => setDrawerIsOpen(true)}
                            >
                                Cadastrar Produto
                            </button>
                            {/* <button
                            className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-56 font-semibold cursor-pointer mt-4 shadow-md hover:scale-105 transition-transform"
                            onClick={carregarProdutosShopee}
                        >
                            Carregar Produtos Shopee
                        </button> */}

                        </div>
                    )}
                </div>

                <DrawerProduto
                    isOpen={drawerIsOpen}
                    setDrawerIsOpen={setDrawerIsOpen}
                    materiaisDisponiveis={listaMateriais}
                    carregarProdutos={carregarProdutos}
                />

                <DrawerDetalhesProduto
                    isOpen={drawerDetalhesOpen}
                    setIsOpen={setDrawerDetalhesOpen}
                    produto={produtoSelecionado}
                    onAtualizar={atualizarProduto}
                    materiaisDisponiveis={listaMateriais}
                    carregarProdutos={carregarProdutos}
                />
            </div>
        </div>
    );
}