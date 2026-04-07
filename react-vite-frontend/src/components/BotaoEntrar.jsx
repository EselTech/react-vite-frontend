export function BotaoEntrar(props){
    return <> 
        <button className="bg-[#896D95] w-96 h-12 rounded-4xl text-white font-semibold font-title">Entrar</button>
        <p className="text-3.5 font-normal mt-3.5 text-[#6B7280] font-quicksand">{props.legenda}</p>
    </>
}