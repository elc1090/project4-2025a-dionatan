import { createClient } from "@/utils/supabase/server";
import { createNote } from "./action";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";
import ChatFloating from "@/components/ChatFloating";

const DashboardPage = async () => {
  const supabase = await createClient();
  const { data: todos } = await supabase.from("todos").select("*");

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        {/* Formulário para criar nova nota */}
        <form action={createNote} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="task"
            placeholder="Digite sua anotação..."
            className="flex-grow bg-gray-50 rounded border border-gray-300 text-gray-900 p-2"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 cursor-pointer rounded hover:bg-indigo-700 transition-colors"
          >
            Criar
          </button>
        </form>

        {/* Lista de notas */}
        <div className="flex flex-col gap-2">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border rounded p-4 shadow-sm"
            >
              <h2 className="break-words text-gray-900 text-base">{todo.task}</h2>
              <div className="flex gap-1 mt-3 sm:mt-0">
                <UpdateButton id={todo.id} initialTask={todo.task} />
                <DeleteButton id={todo.id} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChatFloating />
    </div>
  );
};

export default DashboardPage;
