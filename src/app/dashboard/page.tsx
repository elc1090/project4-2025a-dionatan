import { createClient } from "@/utils/supabase/server";
import { createNote } from "./action";
import UpdateButton from "@/components/UpdateButton";
import DeleteButton from "@/components/DeleteButton";

const DashboardPage = async () => {
  const supabase = await createClient();
  const { data: todos } = await supabase.from("todos").select("*");
  
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5">
        <form action={createNote} className="flex gap-2">
          <input
            type="text"
            name="task"
            placeholder="Digite sua anotação..."
            className="bg-gray-50 rounded text-gray-950 p-2 w-full"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-gray-50 px-3 rounded cursor-pointer"
          >
            Criar
          </button>
        </form>
        <div className="flex flex-col gap-3">
          {todos?.map((todo) => (
            <div
              key={todo.id}
              className="w-full flex justify-between items-center border rounded p-2"
            >
              <h2>{todo.task}</h2>
              <div className="flex gap-2">
                <UpdateButton id={todo.id} initialTask={todo.task} />
                <DeleteButton id={todo.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default DashboardPage;