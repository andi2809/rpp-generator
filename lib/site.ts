export const siteConfig = {
  name: "Generator RPP AI",
  shortName: "RPP AI",
  title: "Generator RPP AI",
  description:
    "Generator RPP berbasis AI untuk membantu guru menyusun draft RPP Kurikulum Merdeka dan Kurikulum 2013 secara cepat, rapi, dan siap diedit.",
  url: "https://rpp-generator.vercel.app",
  locale: "id_ID",
  ogImage: "/assets/rpp-kurikulum-image.png",
  creator: "Generator RPP AI",
  keywords: [
    "generator rpp ai",
    "rpp kurikulum merdeka",
    "rpp kurikulum 2013",
    "aplikasi pembuat rpp",
    "ai untuk guru",
    "draft rpp otomatis",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
