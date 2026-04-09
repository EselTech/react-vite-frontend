import { useState } from "react";
import { CardOrcamento } from "../components/CardOrcamento";
import { DrawerOrcamento } from "../components/DrawerOrcamento";

export function Orcamentos() {

    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    let orcamentos = [
        // {
        //     "titulo": "Compra XX",
        //     "dia": "09",
        //     "mes": "abr",
        //     "ano": "2026",
        //     "hora": "11:34",
        //     "comprador": "Ana",
        //     "produtos": [["Sacola", 10], ["Caixa", 5]],
        //     "precoTotal": 20.50
        // },
    ]

    return (

        <div className="w-10/12 bg-white pl-20 pt-[4vh]">



            <div className="w-11/12 mt-8 flex flex-wrap gap-2">

                {orcamentos.length > 0
                    ?
                    <>
                        <div className="h-16 flex justify-between w-11/12 items-center mb-12">
                            <h1 className="text-[#695088] font-title font-semibold text-5xl mb-20 self-start">
                                Meus Orçamentos
                            </h1>
                            <button className="font-text bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-40 font-semibold cursor-pointer" onClick={() => setDrawerIsOpen(true)}>
                                + Novo Orçamento
                            </button>
                        </div>

                        {orcamentos.map(orcamento => {
                            return <CardOrcamento titulo={orcamento.titulo} dia={orcamento.dia} mes={orcamento.mes} ano={orcamento.ano} hora={orcamento.hora} comprador={orcamento.comprador} produtos={orcamento.produtos} precoTotal={orcamento.precoTotal} />
                        })}
                    </>

                    :
                    (
                        <div className="w-3/4 text-center mx-50 mt-32 flex flex-col items-center">
                            <div className="w-30 h-30 rounded-full flex justify-center items-center text-5xl bg-linear-to-br from-[#ede0f0] to-[#f5eaff] animate-bounce [animation-duration:3s]">
                                🧾
                            </div>
                            <h1 className="font-title text-6xl font-bold text-[#695088]">
                                Nenhum orçamento criado ainda
                            </h1>
                            <p className="font-text text-[#896D95] font-medium text-l w-3/4 mt-4">
                                Crie orçamentos personalizados em segundos e mantenha seu histórico sempre organizado.
                            </p>
                            <button className="font-text bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-56 font-semibold cursor-pointer mt-16" onClick={() => setDrawerIsOpen(true)}>
                                Criar Primeiro Orçamento
                            </button>
                        </div>
                    )}




            </div>


            <DrawerOrcamento isOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
        </div>

    )

}