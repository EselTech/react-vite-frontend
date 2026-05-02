export function InputCadastro(props) {
    return <>
        <label className="flex flex-col text-left font-text font-semibold h-16" >{props.nome}
            <input
                type="text"
                placeholder={props.placeholder}
                onChange={(e) => props.aoMudar(e.target.value)}
                className="placeholder:text-gray-500 placeholder:font-medium placeholder:text-sm font-display bg-white border-[#EDE0F0] border rounded-md w-96 h-12 mt-1 text-xs font-semibold px-4 font-text"
            />
        </label>

    </>
}