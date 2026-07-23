import Link from "next/link"

export default function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <Link className="portfolio-brand" href="/" aria-label="Abrar Ahmed home">
        <span className="portfolio-monogram" aria-hidden="true">
          AA
        </span>
        <span>Abrar Ahmed</span>
      </Link>
      <nav className="portfolio-nav" aria-label="Primary navigation">
        <Link href="/work">Selected work</Link>
        <Link href="/#reviews">References</Link>
        <Link className="portfolio-nav-cta" href="/#contact">
          Contact
        </Link>
      </nav>
    </header>
  )
}
