export function InputPerfil({setValor, legenda, valor, isBlocked}) {


    const estiloInativo = "bg-gray-200"
    return (
        <>
            <label className="flex flex-col">
                <p className="font-text">{legenda}</p>
                <input disabled={isBlocked} value={valor} onChange={(e) => setValor(e.target.value)} type="text" className={`focus:outline-none border font-text border-[#EDE0F0] h-14 rounded-xl pl-5 ${isBlocked ? estiloInativo : "*:"}`} />
            </label>

        </>

    )

}