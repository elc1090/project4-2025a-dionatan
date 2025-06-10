import { login } from "./action";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-gray-100 w-[300px] h-[250px] flex justify-center items-center rounded">
        <form action={login} className="flex flex-col gap-3">
          <h1 className="text-gray-950">Acesse sua conta!</h1>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="bg-gray-50 rounded text-gray-950 p-2 w-full border"
            defaultValue="dionatan@supabase.next"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            required
            className="bg-gray-50 rounded text-gray-950 p-2 w-full border"
            defaultValue="secret"
          />
          <button
            type="submit"
            className="bg-indigo-600 p-2 rounded cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
