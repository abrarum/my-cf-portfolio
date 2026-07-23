import Link from "next/link"

export default function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <p>© 2026 Abrar Ahmed</p>
      <div>
        <Link href="/">Home</Link>
        <Link href="/work">Selected work</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </footer>
  )
}
