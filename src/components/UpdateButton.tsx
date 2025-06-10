"use client";

import { useState } from "react";
import { updateNote } from "@/app/dashboard/action";

type Props = {
  id: number;
  initialTask: string; // Recebe o texto atual
};

const UpdateButton = ({ id, initialTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(initialTask);

  const handleSave = async () => {
    if (task.trim() === "") return; // Validação simples
    await updateNote(id, task);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-2 border rounded mb-2 text-gray-950"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-red-500 rounded cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-indigo-600 text-white rounded cursor-pointer"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-gray-50 px-3 rounded cursor-pointer"
        >
          Editar
        </button>
      )}
    </>
  );
};

export default UpdateButton;