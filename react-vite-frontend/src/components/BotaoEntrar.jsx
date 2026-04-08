export function BotaoEntrar(props) {
    return <>
        <button onClick={() => {if (props.tela == "Login") { props.setTela("Home") }} } className="bg-[#896D95] w-96 h-12 rounded-4xl text-white font-semibold font-title cursor-pointer">Entrar</button>
        <p className="text-3.5 font-normal mt-3.5 text-[#6B7280] font-text">{props.legenda}</p>
    </>
}