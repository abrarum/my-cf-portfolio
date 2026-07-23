import AbrarOrganic from "./AbrarOrganic"
import { FEATURED_CASE_STUDIES } from "@/lib/work"

export const metadata = {
  title: "Abrar Ahmed | AI and Full-stack Engineer",
  description:
    "Portfolio of Abrar Ahmed, an AI and full-stack engineer building production systems across commerce, fintech, and regulated platforms.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abrar Ahmed | AI and Full-stack Engineer",
    description:
      "Selected engineering work, decisions, and outcomes from production AI, mobile, and platform systems.",
    type: "website",
  },
}

export default function HomePage() {
  return <AbrarOrganic featuredCaseStudies={FEATURED_CASE_STUDIES} />
}
