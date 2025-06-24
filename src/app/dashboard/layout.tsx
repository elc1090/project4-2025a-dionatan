import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "@/utils/action";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  const userEmail = user.email;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="md:w-64 w-full md:h-auto h-auto bg-white shadow-md flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <span className="text-2xl font-bold text-indigo-600">Note Taker</span>
        </div>
        <nav className="flex-1 p-4">
          <Link href="/dashboard" legacyBehavior>
            <a className="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md transition-colors duration-200">
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-11 2v10a1 1 0 001 1h3"
                ></path>
              </svg>
              Dashboard
            </a>
          </Link>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-screen">
        <header className="bg-white shadow-sm p-4 flex flex-col md:flex-row justify-between items-center border-b border-gray-200 gap-2">
          <span className="text-sm text-gray-600">{userEmail}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Sair
            </button>
          </form>
        </header>

        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
