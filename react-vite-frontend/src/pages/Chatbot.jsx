import { useState } from "react";
import { MensagemChatbot } from "../components/MensagemChatbot";
import { Nav } from "../components/Nav";
import { api } from "../provider/api";
import toast, { Toaster } from "react-hot-toast";

export function Chatbot() {

    const [pergunta, setPergunta] = useState("")
    const [chat, setChat] = useState([])

    function enviarPergunta(pergunta) {
        if (!pergunta) {
            toast.error("Escreva uma mensagem")
            return
        }

        const copia = [...chat]
        copia.push(<MensagemChatbot remetente={1} texto={pergunta}></MensagemChatbot>)
        copia.push(<MensagemChatbot remetente={0} img={"public/loading-icon.png"} />)
        setChat(copia)

        api.post(`/ia?prompt=${pergunta}`).then(
            resposta => {
                
                copia.pop()
                copia.push(<MensagemChatbot remetente={0} texto={resposta.data}></MensagemChatbot>)

                setChat([...copia])

            }
        )
        setPergunta("")
    }

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Nav tela="Chatbot" />

            <div className="w-10/12 flex flex-col justify-between items-center pt-[4vh] pb-[4vh]">

                <div className="self-start pl-[9vw] w-max shrink-0">
                    <h1 className="text-[#695088] font-semibold text-5xl mb-2.5 font-title">Chatbot</h1>
                    <p className="text-[#896D95] font-normal text-lg font-text">Tire todas as suas dúvidas aqui</p>
                </div>

                <div className="w-5xl h-140 flex flex-col gap-8 overflow-y-auto px-4 py-2 border border-gray-100 rounded-xl chat-container-invisible-scroll">
                    {chat.map(mensagem => {
                        return mensagem
                    })}

                </div>

                <div className="border border-[#e8d8f0] w-5xl rounded-2xl h-14 flex items-center shrink-0 shadow-[0_4px_12px_rgba(137,109,149,0.05)] bg-[#FDFDFD]">
                    <img src="chatIcon.svg" alt="" className="w-5 mx-6" />
                    <input
                        value={pergunta}
                        onChange={e => {
                            setPergunta(e.target.value)
                        }}
                        type="text"
                        placeholder="Digite sua mensagem..."
                        className="h-full flex-1 outline-none text-lg font-text text-[#3D2B4F] placeholder-gray-400"
                    />
                    <img onClick={() => { enviarPergunta(pergunta) }} src="chatSend.svg" alt="" className="w-5 mx-6 cursor-pointer hover:scale-110 transition-transform" />
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .chat-container-invisible-scroll::-webkit-scrollbar {
                    display: none; /* Safari e Chrome */
                }
                .chat-container-invisible-scroll {
                    -ms-overflow-style: none;  /* IE e Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}} />
        </div>
    );
}