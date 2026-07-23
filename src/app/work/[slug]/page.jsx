import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import PortfolioFooter from "@/components/PortfolioFooter"
import PortfolioHeader from "@/components/PortfolioHeader"
import { getWorkBySlug, WORK } from "@/lib/work"
import { getWorkGallery } from "@/lib/workMedia"

export function generateStaticParams() {
  return WORK.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const study = getWorkBySlug(slug)

  if (!study) {
    return {}
  }

  return {
    title: `${study.shortTitle} case study | Abrar Ahmed`,
    description: study.summary,
    alternates: {
      canonical: `/work/${study.slug}`,
    },
    openGraph: {
      title: study.title,
      description: study.summary,
      type: "article",
      images: [
        {
          url: study.featuredImageUrl,
          alt: study.featuredImageAlt,
        },
      ],
    },
  }
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params
  const study = getWorkBySlug(slug)

  if (!study) {
    notFound()
  }

  const currentIndex = WORK.findIndex((item) => item.slug === study.slug)
  const nextStudy = WORK[(currentIndex + 1) % WORK.length]
  const gallery = getWorkGallery(study.slug)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    image: study.featuredImageUrl,
    author: {
      "@type": "Person",
      name: "Abrar Ahmed",
      url: "https://heyabrar.com",
    },
    mainEntityOfPage: `https://heyabrar.com/work/${study.slug}`,
  }

  return (
    <div className="portfolio-page">
      <PortfolioHeader />
      <main>
        <article>
          <header className="work-detail-hero">
            <Link className="work-back-link" href="/work">
              <span aria-hidden="true">←</span> All selected work
            </Link>
            <div className="work-detail-heading">
              <div>
                <p className="portfolio-eyebrow">{study.industry}</p>
                <h1>{study.title}</h1>
              </div>
              <dl className="work-detail-meta">
                <div>
                  <dt>Client</dt>
                  <dd>{study.client}</dd>
                </div>
                <div>
                  <dt>My role</dt>
                  <dd>{study.role}</dd>
                </div>
              </dl>
            </div>
            <p className="work-detail-summary">{study.summary}</p>
          </header>

          <div className="work-detail-visual">
            <Image
              src={study.featuredImageUrl}
              alt={study.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 900px) 94vw, 84vw"
              unoptimized
            />
          </div>

          <section className="work-highlight-strip" aria-label="Project highlights">
            {study.highlights.map((highlight) => (
              <div key={highlight.label}>
                <strong>{highlight.value}</strong>
                <span>{highlight.label}</span>
              </div>
            ))}
          </section>

          <div className="work-narrative">
            <aside className="work-narrative-label">Context</aside>
            <section>
              <h2>The system I joined</h2>
              {study.context.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <aside className="work-narrative-label">Contribution</aside>
            <section>
              <h2>Where I contributed</h2>
              {study.contribution.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          </div>

          {gallery && (
            <section className="work-gallery" aria-labelledby="work-gallery-title">
              <div className="work-gallery-heading">
                <div>
                  <p className="portfolio-eyebrow">{gallery.eyebrow}</p>
                  <h2 id="work-gallery-title">{gallery.title}</h2>
                </div>
                <p>{gallery.description}</p>
              </div>
              <div
                className="work-gallery-track"
                tabIndex="0"
                aria-label={`${gallery.title} screenshot gallery`}
              >
                {gallery.screenshots.map((screenshot, index) => (
                  <figure className="work-gallery-card" key={screenshot.src}>
                    <div className="work-gallery-image">
                      <Image
                        src={screenshot.src}
                        alt={screenshot.alt}
                        fill
                        sizes="(max-width: 720px) 88vw, 720px"
                        unoptimized
                      />
                    </div>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{screenshot.title}</strong>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="decision-trail">
            <div className="decision-trail-intro">
              <p className="portfolio-eyebrow">Decision trail</p>
              <h2>Constraints became architecture.</h2>
              <p>
                Each decision below connects a concrete limitation to the
                engineering response and its practical effect.
              </p>
            </div>
            <ol>
              {study.decisions.map((decision, index) => (
                <li key={decision.constraint}>
                  <span className="decision-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="decision-label">Constraint</p>
                    <h3>{decision.constraint}</h3>
                  </div>
                  <div>
                    <p className="decision-label">Decision</p>
                    <p>{decision.decision}</p>
                  </div>
                  <div>
                    <p className="decision-label">Impact</p>
                    <p>{decision.impact}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="work-outcomes">
            <div>
              <p className="portfolio-eyebrow">Outcome</p>
              <h2>What the work produced</h2>
            </div>
            <ul>
              {study.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </section>

          <section className="work-stack">
            <p className="portfolio-eyebrow">Technology</p>
            <div>
              {study.stack.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </section>

          <blockquote className="work-reflection">
            <p>{study.reflection}</p>
            <cite>Abrar Ahmed</cite>
          </blockquote>

          <nav className="work-next" aria-label="Next case study">
            <span>Next case study</span>
            <Link href={`/work/${nextStudy.slug}`}>
              {nextStudy.title} <span aria-hidden="true">→</span>
            </Link>
          </nav>
        </article>
      </main>
      <PortfolioFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  )
}
