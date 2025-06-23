/* eslint-disable @next/next/no-img-element */
"use client"; // Adicione esta diretiva para componentes que usam hooks no Next.js App Router

import { useState } from "react";
import { login } from "./action";
import { signinWithGoogle } from "@/utils/action";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o loader

  const handleSubmit = async (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    setIsLoading(true); // Ativa o loader

    const formData = new FormData(event.currentTarget); // Coleta os dados do formulário
    await login(formData); // Chama a função de login (assumindo que ela é assíncrona)

    setIsLoading(false); // Desativa o loader após a conclusão
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl flex border border-gray-200 overflow-hidden">
        {/* Image Side (Hidden on small screens, visible on medium and larger) */}
        <div className="hidden md:flex md:w-1/2 bg-indigo-100 p-6 items-center justify-center rounded-l-lg">
          <img
            src="./login-image.png"
            alt="Ilustração de Login"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form Side */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Acesse sua conta
          </h1>
          {/* Adicione o onSubmit ao formulário */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              defaultValue="dionatan@supabase.next"
              disabled={isLoading} // Desabilita o input enquanto carrega
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              defaultValue="secret"
              disabled={isLoading} // Desabilita o input enquanto carrega
            />
            <button
              type="submit"
              className={`w-full py-2 rounded-md transition-colors duration-200
                ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed" // Estilo quando carregando
                    : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer" // Estilo normal
                }
              `}
              disabled={isLoading} // Desabilita o botão enquanto carrega
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  {/* Ícone de loader simples (você pode substituir por um SVG ou componente de spinner) */}
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Carregando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
          <form action= {signinWithGoogle}>
            <button
              type="submit"
              className="w-full mt-2 py-2 rounded-md transition-colors bg-gray-700 cursor-pointer duration-200"
            >
              Entrar com Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
