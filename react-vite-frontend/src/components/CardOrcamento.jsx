export function CardOrcamento(props) {

    return (

        <>

            <div className="w-[32%] h-56 bg-[#FDFDFD]  overflow-hidden  border rounded-2xl border-[#e8d8f0] p-4 shadow-[0_4px_24px_rgba(137,109,149,0.1)]">
                <div className="bg-linear-to-br from-[#896D95] to-[#C8A0C0] w-[200%] h-1 -mt-4  justify-self-center"></div>

                <div className="flex justify-between mt-3">
                    <h1 className="font-title text-[#695088] font-bold text-lg">
                        {props.titulo}
                    </h1>
                    <p className="w-1/2 text-xs text-[#7a6688] bg-[#ede0f0] flex items-center justify-center rounded-2xl font-medium">
                        {props.dia + " de " + props.mes + ". de" + props.ano + "•" + props.hora}
                    </p>
                </div>
                <div className="flex mt-4">
                    <p className="font-text text-[#7a6688]">
                        👤 Comprador:
                    </p>
                    <p className="w-2/8 ml-2 text-xs text-[#7a6688] bg-[#ede0f0] flex items-center justify-center rounded-2xl font-medium">
                        {props.comprador}
                    </p>
                </div>
                <div className="mt-4">
                    <p className="font-text text-xs text-[#7a6688] font-medium">
                        PRODUTOS
                    </p>
                    <div className="flex">
                        {
                            props.produtos.map(produto => {
                                return (
                                    <p className="w-max h-5 px-2 mt-1 ml-1 text-xs text-[#7a6688] bg-[#ede0f0] flex items-center justify-center rounded-2xl">
                                        {produto[0]}
                                    </p>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="mt-4 border-t border-[#e8d8f0] flex justify-between items-center">
                    <div>
                        <p className="mt-2 font-text text-sm text-[#7a6688] font-medium">
                            Total
                        </p>
                        <h1 className="font-title text-[#7a6688] font-bold text-2xl">
                            R$ {props.precoTotal.toFixed(2)}
                        </h1>
                    </div>
                    <button className="w-1/3 h-1/1 py-2 text-xs text-[#7a6688] bg-[#ede0f0] flex items-center justify-center rounded-2xl font-medium cursor-pointer">
                        Ver detalhes →
                    </button>
                </div>


            </div>

        </>

    )

}