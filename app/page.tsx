import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RppGenerator } from "@/components/rpp-generator";
import { absoluteUrl, siteConfig } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "EducationalApplication",
  applicationSubCategory: "Lesson Planning Tool",
  operatingSystem: "Web Browser",
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.ogImage),
  inLanguage: "id-ID",
  description: siteConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Generate draft RPP dengan AI",
    "Dukungan Kurikulum Merdeka dan Kurikulum 2013",
    "Editor markdown dengan live preview",
    "Export ke PDF dan DOCX",
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main>
        <Header />
        <Hero />

        <section id="generator" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <RppGenerator />
        </section>

        <Footer />
      </main>
    </>
  );
}
