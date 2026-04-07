export function MensagemChatbot(props) {

    const mensagemBot = "border border-[#242424] rounded-lg px-5 py-4 w-max font-text"
    const mensagemUser = "border border-[#242424] rounded-lg px-5 py-4 w-max self-end font-text"

    return (

        <>

            <div className={props.remetente == 0 ? mensagemBot : mensagemUser}>
                {props.texto}
            </div>

        </>

    )

}