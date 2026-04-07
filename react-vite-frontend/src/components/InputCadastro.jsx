export function InputCadastro(props){
    return <>
        <label className="flex flex-col text-left font-text font-semibold">{props.nome}
            <input type="text" placeholder={props.placeholder} className="placeholder:text-gray-500 placeholder:font-medium placeholder:p-3.5 placeholder:text-sm  font-display bg-white border-[#EDE0F0] border rounded-md w-96 h-12 mt-1 text-xs font-semibold" />
        </label>
        
    </>
}