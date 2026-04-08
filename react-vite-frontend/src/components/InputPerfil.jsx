export function InputPerfil(props) {

    return (

        <>

            <label className="flex flex-col">
                <p className="font-text">{props.legenda}</p>
                <input type="text" className="font-text border border-[#EDE0F0] h-14 rounded-xl pl-5" placeholder={props.placeholder}/>
            </label>

        </>

    )

}