import { WORK } from "@/lib/work"

export default function sitemap() {
  const baseUrl = "https://heyabrar.com"

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...WORK.map((study) => ({
      url: `${baseUrl}/work/${study.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ]
}
