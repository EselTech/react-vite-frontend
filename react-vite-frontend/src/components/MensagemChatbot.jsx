export function MensagemChatbot(props) {

    const mensagemBot = "border border-[#242424] rounded-lg px-5 py-4 w-max max-w-140 font-text"
    const mensagemUser = "border border-[#242424] rounded-lg px-5 py-4 w-max self-end font-text"
    const img = props.img

    return (
        <>
            <div className={props.remetente == 0 ? mensagemBot : mensagemUser}>
                {img && <img src={img} className="w-4 h-4 animate-spin" />}
                {props.texto}
            </div>
        </>
    )
}