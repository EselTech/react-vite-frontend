export function BotaoEntrar(props) {
    return <>
        <button
            className={`block w-full max-w-88 mx-auto h-12 mt-4 rounded-4xl text-white font-semibold font-title transition-all duration-300 bg-[#896D95] cursor-pointer hover:brightness-110`}
            onClick={() => props.aoClicar()}
        >{props.texto}</button>
    </>
}