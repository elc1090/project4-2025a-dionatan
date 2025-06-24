"use client";

import { useState } from "react";

const ChatFloating = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: { role: "user" | "ai"; text: string } = {
        role: "user",
        text: input,
      };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (data.response) {
        const aiMessage: { role: "ai" | "user"; text: string } = {
          role: "ai",
          text: data.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "ai", text: "Erro ao obter resposta da IA." },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Falha na requisição para a IA." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hidden sm:block">
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-indigo-600 cursor-pointer text-white px-4 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        {open ? "Fechar Chat" : "Abrir Chat"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border rounded-xl shadow-lg flex flex-col overflow-hidden z-50">
          <div className="bg-indigo-600 text-white p-3 text-sm font-medium">
            Assistente IA
          </div>
          <div className="flex flex-col p-3 space-y-2 h-64 overflow-y-auto text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] p-2 rounded ${
                  msg.role === "user"
                    ? "self-end bg-indigo-100"
                    : "self-start bg-gray-100"
                }`}
              >
                <span className="text-gray-900">{msg.text}</span>
              </div>
            ))}
            {loading && (
              <div className="self-start text-gray-900 text-sm italic">Pensando...</div>
            )}
          </div>
          <form onSubmit={sendMessage} className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 text-sm outline-none text-gray-900"
              placeholder="Digite sua pergunta..."
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-700 transition"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatFloating;
