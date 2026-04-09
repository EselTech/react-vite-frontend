import { CardOrcamento } from "../components/CardOrcamento";

export function Calculadora() {

    return (

        <div className="w-10/12 bg-white pl-20 pt-[4vh]">

            <div className="h-16 flex justify-between w-11/12 items-center">
                <h1 className="text-[#695088] font-title font-semibold text-5xl mb-20 self-start">
                    Meus Orçamentos
                </h1>
                <button className="font-text bg-linear-to-br from-[#896D95] to-[#C8A0C0] text-white rounded-full h-12 w-40 font-semibold cursor-pointer">
                    + Novo Orçamento
                </button>
            </div>

            <div className="w-11/12 mt-8 flex flex-wrap gap-2">

                <CardOrcamento titulo={"Compra XX"} dia={9} mes={"abr"} ano={2026} hora={"11:34"} comprador={"Ana"} produtos={"Sacola"} preco={20.50}/>

            </div>

        </div>

    )

}