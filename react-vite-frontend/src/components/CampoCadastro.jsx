import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";

export function CampoCadastro() {
    return (
        <>
            <div className="p-[6%] w-1/2 h-1/1 rounded-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin />
                <h2 className="mt-[8%] text-4xl font-semibold font-title">Cadastre-se</h2>
                <div className="flex flex-col space-y-3 items-center justify-center mt-8 mb-10">
                    <InputCadastro nome={"Nome"} />
                    <InputCadastro nome={"Email"} />
                    <InputCadastro nome={"Telefone"} />
                    <InputCadastro nome={"Senha"} />
                </div>
                <BotaoEntrar legenda={"Já possui uma conta? Entrar"}/>
            </div>
        </>
    )
}