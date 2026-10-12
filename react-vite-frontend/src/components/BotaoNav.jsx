export function BotaoNav(props) {

    const estiloBase = "shrink-0 cursor-pointer font-medium font-title md:w-full md:ml-0 md:pl-4 md:h-[5vh] md:flex-row md:justify-self-start"
    const estiloAtivo = `${estiloBase} w-16 h-14 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] text-[#FEFEFE] bg-[linear-gradient(90deg,rgba(105,80,136,1)_0%,rgba(194,162,229,1)_100%)] md:rounded-full md:flex-row md:items-center md:justify-start md:gap-2 md:text-base`
    const estiloInativo = `${estiloBase} w-16 h-14 flex flex-col items-center justify-center gap-0.5 text-[10px] text-[#3D2549] md:flex-row md:justify-start md:gap-2 md:text-base`

    return (

        <>
            <button onClick={props.aoClicar} className={props.ativo ? estiloAtivo : estiloInativo}>
                <img src={(props.imagem) + (props.ativo ? "-light.svg" : "-dark.svg")} alt="" className="w-4.5" />
                {props.descricao}
            </button>
        </>

    )





}