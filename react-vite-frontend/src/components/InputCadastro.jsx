export function InputCadastro(props){
    return <>
        <label className="flex flex-col text-left">{props.nome}
            <input type="text" className="font-display bg-white border-[#EDE0F0] border rounded-md w-96 h-12 mt-1 text-xs font-semibold" />
        </label>
        
    </>
}