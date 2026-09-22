import { CampoLogin } from "../components/CampoLogin";

export function Login(props) {
    return <>
        <div className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 drop-shadow-2xl">
            <div className="bg-[#EDE0F0] w-full max-w-5xl min-h-[90vh] md:min-h-0 md:h-7/8 rounded-3xl flex flex-col md:flex-row overflow-hidden" aria-label="Container principal para Login">
                <div className="w-full md:w-1/2 min-h-40 md:min-h-0 flex justify-center items-center">
                    <img src="/atelie-logo.png" alt="Logo Atelier da Cibis" className="w-40 md:w-2l" />
                </div>
                <CampoLogin tela={"Login"} />
            </div>

        </div>
    </>
}

