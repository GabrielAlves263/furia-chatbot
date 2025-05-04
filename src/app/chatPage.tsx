"use client";

import ChatBubble from "@/components/ChatBubble";
import FuriosoEntry from "@/components/FuriosoEntry";
import Typing from "@/components/Typing";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const playSend = () => {
    const audio = new Audio("notification.mp3");
    audio.play();
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const botReply: Message = {
        sender: "bot",
        text: await generateBotReply(text),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
      playSend();
    }, 1500);
  };

  // Groq
  const generateBotReply = async (text: string): Promise<string> => {
    try {
      const res = await fetch("/api/chat2", {
        method: "POST",
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10), // envia o histórico
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      return data.reply || "Hmm... não entendi, repete aí!";
    } catch (err) {
      console.error(err);
      return "O Furioso teve um probleminha técnico 😿";
    }
  };

  // Open ai
  // const generateBotReply = async (text: string): Promise<string> => {
  //   try {
  //     const res = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: text }),
  //     });

  //     const data = await res.json();
  //     return data.reply || "Hmm... não entendi, tente de novo!";
  //   } catch (error) {
  //     return "O Furioso teve um probleminha técnico 🐾";
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  const addMessage = (text: string, sender: "bot" | "user") => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const simulateConversation = async () => {
    await new Promise((res) => setTimeout(res, 1500));
    setIsTyping(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsTyping(false);
    playSend();
    addMessage(
      "Olá, fã da FURIA! Eu sou o Furioso, seu parceiro de chat.",
      "bot"
    );

    await new Promise((res) => setTimeout(res, 700));
    setIsTyping(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsTyping(false);
    playSend();
    addMessage("Quer saber quando tem jogo? Me pergunta aí!", "bot");

    await new Promise((res) => setTimeout(res, 700));
    setIsTyping(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsTyping(false);
    playSend();
    addMessage(
      'Ou digita "curiosidades" pra saber mais sobre o time 😏',
      "bot"
    );
  };

  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
    simulateConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#0e0e0e] to-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-3xl bg-[#0d0d0d] rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] p-8 flex flex-col justify-between min-h-[600px]">
        <div>
          <div className="flex flex-col items-center gap-4 mb-8">
            <img
              src="/furia-logo.png"
              alt="Logo da Pantera"
              className="w-20 h-20"
            />
            {/* <h1 className="text-xl font-medium">Pergunte à Pantera</h1> */}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Sugestões de perguntas</p>
            <div className="flex flex-wrap gap-4">
              {[
                "Qual o próximo jogo da FURIA?",
                "Quem são os jogadores atuais da line de CS?",
                "Quiz furioso",
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="bg-[#1f1f1f] hover:bg-[#2a2a2a] border border-gray-700 px-4 py-2 rounded-lg text-sm transition shadow-md hover:shadow-purple-500/20"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat messages */}

        <div
          ref={chatRef}
          className="chat-container max-h-[500px] overflow-y-auto px-4 py-2 custom-scroll"
        >
          <FuriosoEntry />
          {messages.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} sender={msg.sender} />
          ))}

          {isTyping && <Typing />}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center mt-6 gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo sobre a FURIA"
            className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 p-3 rounded-lg transition shadow-[0_0_15px_#7c3aed] hover:shadow-[0_0_20px_#7c3aed]"
          >
            <FaPaperPlane size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
