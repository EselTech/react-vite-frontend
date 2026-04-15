import { InputPerfil } from "../components/InputPerfil";

export function Perfil() {

    return (

        <div className="w-10/12 bg-white pl-28 pt-[4vh] flex">

            <div className="w-1/2">
                <h1 className="text-[#695088] font-title font-semibold text-5xl mb-20">
                    Informações Pessoais
                </h1>
                <div className="w-xl flex flex-col gap-7">
                    <InputPerfil legenda={"Nome"} placeholder={"Cibelle"} />
                    <InputPerfil legenda={"Email"} placeholder={"cibelle@email.com"} />
                    <InputPerfil legenda={"Telefone"} placeholder={"(11) 98765-4321"} /> 
                    <InputPerfil legenda={"Senha"} placeholder={"password123"} />
                </div>
                <div className="flex gap-4 mt-14">
                    <button className="border border-[#896D95] text-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer">Editar</button>
                    <button className="border border-[#896D95] text-white bg-[#896D95] font-text rounded-3xl w-24 h-12 cursor-pointer">Salvar</button>
                    <button className="border border-[#E07A5F] text-[#E07A5F] font-text rounded-3xl w-40 h-12 cursor-pointer">Deletar Conta</button>
                </div>
            </div>
            <div className="w-1/2 ml-40">

                <div className="flex flex-col items-center justify-self-start">
                    <img src="cibilleFotoCartoon.svg" className="w-28 border-[3px] border-[#896D95] rounded-full mb-2.5" />
                    <p className="font-text text-[#896D95]">Alterar Foto</p>
                </div>
            </div>

        </div>

    )

}
