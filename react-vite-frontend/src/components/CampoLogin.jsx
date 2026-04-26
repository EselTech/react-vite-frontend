import { BotaoEntrar } from "./BotaoEntrar";
import { InputCadastro } from "./InputCadastro";
import { MenuCadastroLogin } from "./MenuCadastroLogin";

export function CampoLogin(props) {

    async function entrar() {

        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");

        try {
            const response = await api.post("/login", {
                email,
                senha,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            props.setTela("Home");
        } catch (error) {
            console.error("Erro ao logar:", error.response?.data || error.message);
        }


    }

    return (
        <>
            <div className="p-[6%] w-1/2 h-1/1 rounded-r-3xl bg-[#FAF7FB] text-center" aria-label="Area com os campos de entrada do usuario para realizar o cadastro">
                <MenuCadastroLogin tela={props.tela} setTela={props.setTela} />
                <h2 className="mt-[16%] text-4xl font-semibold font-title text-gray-900">Bem-vindo!</h2>
                <div className="flex flex-col space-y-8 items-center justify-center mt-8">
                    <InputCadastro nome={"Email"} placeholder={"Digite seu email"} />
                    <InputCadastro nome={"Senha"} placeholder={"Digite sua senha"} />
                    <p className="text-[#896D95] font-text text-left self-start ml-5 text-sm -m-5 font-semibold mb-12">Esqueci minha senha</p>
                </div>
                <BotaoEntrar tela={props.tela} setTela={props.setTela}/>
            </div>
        </>
    )
}