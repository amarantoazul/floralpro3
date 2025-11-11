import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Roles } from "@/components/Roles";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col gap-12">
        <Hero />
        <Roles />
      </main>
      <Footer />
    </div>
  );
}
