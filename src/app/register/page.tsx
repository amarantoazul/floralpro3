// src/app/register/page.tsx
import { cookies } from "next/headers";
import RegisterForm from "./RegisterForm";

export default async function Page() {
  const cookieStore = await cookies();
  const role = cookieStore.get("fp-role-temp")?.value ?? null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10">
        <RegisterForm initialRole={role} />
      </div>
    </main>
  );
}
