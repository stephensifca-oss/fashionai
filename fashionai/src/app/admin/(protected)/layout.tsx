import { requireAuthPage } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAuth = await requireAuthPage();

  if (!isAuth) {
    redirect("/admin/login");
  }

  // Action server pour logout
  async function logout() {
    "use server";
    const c = await cookies();
    c.delete("fa_admin");
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F6F8] font-sans">
      <nav className="bg-white border-b border-[#DCDCE2] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/admin">
            <span className="font-bold tracking-tighter text-lg cursor-pointer">
              FASHION<span className="text-[#0051FF]">AI</span> ADMINISTRATION
            </span>
          </Link>
          <div className="h-4 w-px bg-[#DCDCE2]"></div>
          <Link href="/admin/leads">
            <span className="text-sm font-medium hover:text-[#0051FF] transition-colors cursor-pointer text-[#56565F]">
              Leads & Pipeline
            </span>
          </Link>
          <Link href="/admin/test-pipeline">
            <span className="text-sm font-medium hover:text-[#0051FF] transition-colors cursor-pointer text-[#56565F]">
              Test Pipeline
            </span>
          </Link>
          <div className="h-4 w-px bg-[#DCDCE2]"></div>
          <Link href="/" target="_blank">
            <span className="text-sm font-medium hover:text-[#0051FF] transition-colors cursor-pointer text-[#56565F]">
              Voir le site ↗
            </span>
          </Link>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="text-xs uppercase tracking-wider font-bold bg-[#F6F6F8] hover:bg-[#EBEBEF] text-[#56565F] hover:text-[#0B0B0D] px-4 py-2 border border-[#DCDCE2] transition-colors"
          >
            Se déconnecter
          </button>
        </form>
      </nav>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
