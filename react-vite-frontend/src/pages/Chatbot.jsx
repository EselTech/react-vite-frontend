import { MensagemChatbot } from "../components/MensagemChatbot";

export function Chatbot() {

    return (

        <div className="w-10/12 flex flex-col justify-around items-center">

            <div className="self-start pl-[9vw] w-max">
                <h1 className="text-[#695088] font-semibold text-5xl mb-3.5 font-title">Chatbot</h1>
                <p className="text-[#896D95] font-normal text-lg font-text">Tire todas as suas dúvidas aqui</p>
            </div>
            <div className=" w-5xl h-7/12 flex flex-col gap-2 ">

                <MensagemChatbot remetente={0} texto={"Olá eu sou a cibis, sua assistente virtual, irei te ajudar caso precise!"} />
                <MensagemChatbot remetente={1} texto={"Olá, boa tarde"} />

            </div>
            <div className="border w-5xl rounded-lg h-14 flex ">
                <img src="chatIcon.svg" alt="" className="w-5 mx-6" />
                <input type="text" className="h-1/1 w-7/8 outline-none text-2l font-text" />
                <img src="chatSend.svg" alt="" className="w-5 mx-6 cursor-pointer" />
            </div>

        </div>

    )

}