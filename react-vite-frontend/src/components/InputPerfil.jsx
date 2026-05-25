export function InputPerfil({setValor, legenda, valor}) {

    return (
        <>
            <label className="flex flex-col">
                <p className="font-text">{legenda}</p>
                <input value={valor} onChange={(e) => setValor(e.target.value)} type="text" className="font-text border border-[#EDE0F0] h-14 rounded-xl pl-5" />
            </label>

        </>

    )

}