import { MensagemChatbot } from "../components/MensagemChatbot";

export function Chatbot() {

    return (

        <div className="w-4/5 bg-white flex flex-col pl-28 pt-32">

            <div className="">
                <h1 className="text-[#695088] font-semibold text-5xl mb-3.5">Chatbot</h1>
                <p className="text-[#896D95] font-normal text-lg">Tire todas as suas dúvidas aqui</p>
            </div>
            <div className="mt-9 w-5xl h-7/12 flex flex-col gap-2">

                <MensagemChatbot remetente={0} texto={"Olá eu sou a cibis, sua assistente virtual, irei te ajudar caso precise!"}/>
                <MensagemChatbot remetente={1} texto={"Olá, boa tarde"}/>

            </div>
            <div className="border w-5xl rounded-lg h-14 mt-8 flex">
                <img src="./src/assets/chatIcon.svg" alt="" className="w-5 mx-6"/>
                <input type="text" className="h-1/1 w-7/8 outline-none text-2l" />
                <img src="./src/assets/chatSend.svg" alt="" className="w-5 mx-6"/>
            </div>

        </div>
        
    )

}