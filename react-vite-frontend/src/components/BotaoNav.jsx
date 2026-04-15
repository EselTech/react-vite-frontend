export function BotaoNav(props) {

    const estiloAtivo = "w-[90%] -ml-4 pl-4 rounded-full flex items-center gap-2 justify-self-start font-medium font-title text-[#FEFEFE] h-[5vh] text-1 cursor-pointer bg-[linear-gradient(90deg,rgba(105,80,136,1)_0%,rgba(194,162,229,1)_100%)]"
    const estiloInativo = "w-[90%] -ml-4 pl-4 flex items-center  gap-2 font-medium font-title text-[#3D2549] h-[5vh] text-1 cursor-pointer"

    return (

        <>
            <button onClick={props.aoClicar} className={props.ativo ? estiloAtivo : estiloInativo}>
                <img src={(props.imagem) + (props.ativo ? "-light.svg" : "-dark.svg")} className="w-4.5" />
                {props.descricao}
            </button>
        </>

    )





}