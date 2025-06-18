/* eslint-disable @next/next/no-img-element */
import { login } from "./action";

export default function LoginPage() {
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
          <form action={login} className="flex flex-col space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              defaultValue="dionatan@supabase.next"
            />
            <input
              name="password"
              type="password"
              placeholder="Senha"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
              defaultValue="secret"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
