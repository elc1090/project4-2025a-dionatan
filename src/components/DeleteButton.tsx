"use client";

import { deleteNote } from "@/app/dashboard/action";

type Props = {
  id: number;
};

const DeleteButton = ({id} : Props) => {
  return <button className="bg-red-500 text-gray-50 px-3 rounded cursor-pointer" onClick={async()=>deleteNote(id)}>
    Apagar
  </button>;
};

export default DeleteButton;
