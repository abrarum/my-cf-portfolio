import AbrarOrganic from "./AbrarOrganic"
import { FEATURED_CASE_STUDIES } from "@/lib/featuredCaseStudies"

export const metadata = {
  title: "Abrar Ahmed | Work Directly With an AI Engineer",
  description:
    "Work directly with Abrar Ahmed, hands-on AI engineer and founder of AIfantry. No middlemen.",
  openGraph: {
    title: "Abrar Ahmed | Work Directly With an AI Engineer",
    description:
      "Skip the agency. Work directly with the founder. Real AI shipped for real businesses.",
    type: "website",
  },
}

export default function HomePage() {
  return <AbrarOrganic featuredCaseStudies={FEATURED_CASE_STUDIES} />
}
