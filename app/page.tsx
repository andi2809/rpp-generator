import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RppGenerator } from "@/components/rpp-generator";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />

      <section id="generator" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <RppGenerator />
      </section>

      <Footer />
    </main>
  );
}
