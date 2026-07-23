import Image from "next/image"
import Link from "next/link"
import PortfolioFooter from "@/components/PortfolioFooter"
import PortfolioHeader from "@/components/PortfolioHeader"
import { WORK } from "@/lib/work"

export const metadata = {
  title: "Selected work | Abrar Ahmed",
  description:
    "Selected AI, full-stack, mobile, and platform engineering work by Abrar Ahmed, with the constraints, decisions, and outcomes behind each system.",
  alternates: {
    canonical: "/work",
  },
}

export default function WorkPage() {
  return (
    <div className="portfolio-page">
      <PortfolioHeader />
      <main>
        <section className="work-index-hero">
          <p className="portfolio-eyebrow">Selected work</p>
          <h1>Systems are easiest to judge by the decisions inside them.</h1>
          <p className="work-index-intro">
            These case studies focus on my contribution, the constraints that
            shaped the architecture, and what changed after the work shipped.
          </p>
        </section>

        <section className="work-index-grid" aria-label="Case studies">
          {WORK.map((study) => (
            <article className="work-index-card" key={study.slug}>
              <Link
                className="work-index-image"
                href={`/work/${study.slug}`}
                aria-label={`Read ${study.title}`}
              >
                <Image
                  src={study.featuredImageUrl}
                  alt={study.featuredImageAlt}
                  fill
                  sizes="(max-width: 900px) 92vw, 44vw"
                  unoptimized
                />
                <span className="work-index-type">Case study</span>
              </Link>
              <div className="work-index-content">
                <div className="work-index-meta">
                  <span>{study.industry}</span>
                  <span>{study.role}</span>
                </div>
                <h2>
                  <Link href={`/work/${study.slug}`}>{study.title}</Link>
                </h2>
                <p>{study.summary}</p>
                <Link className="text-link" href={`/work/${study.slug}`}>
                  Read the decision trail <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}
