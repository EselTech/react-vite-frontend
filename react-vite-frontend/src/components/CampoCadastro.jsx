import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";

export function CampoCadastro(props) {
    return (
        <>
            <div className="p-[6%] w-1/2 h-1/1 rounded-l-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />
                <h2 className="mt-[8%] text-4xl font-semibold font-title text-gray-900">Cadastre-se</h2>
                <div className="flex flex-col space-y-3 items-center justify-center mt-8 mb-10">
                    <InputCadastro nome={"Nome"} placeholder={"Digite seu nome"} />
                    <InputCadastro nome={"Email"} placeholder={"Digite seu email"} />
                    <InputCadastro nome={"Telefone"} placeholder={"Digite seu telefone (somente números)"} />
                    <InputCadastro nome={"Senha"} placeholder={"Digite sua senha"} />
                </div>
                <BotaoEntrar legenda={"Já possui uma conta? Entrar"} />
            </div>
        </>
    )
}