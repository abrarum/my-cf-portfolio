"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { TESTIMONIALS } from "@/lib/testimonials"
import { SERVICES } from "@/lib/services"

// ─── Brand + Palette ──────────────────────────────────────────────────────────
const B = {
  primary:     "#660033",
  primaryDark: "#4a0025",
  gold:        "#EFBF04",
  cream:       "#FAF7F2",
  creamDark:   "#F2EDE4",
  ink:         "#1A1714",
  inkSoft:     "#3A3530",
  muted:       "#7A7068",
  mutedLight:  "#ADA79E",
  white:       "#FFFFFF",
}

const SERIF = "Georgia, 'Palatino Linotype', serif"
const WHATSAPP_US_NUMBER = "16507708841"
const US_PHONE_TEL = "+16507708841"
const US_PHONE_DISPLAY = "+1 (650)-770-8841"
const FEATURED_REVIEW_PREVIEW_LENGTH = 800
const GRID_REVIEW_PREVIEW_LENGTH = 400

function truncateReview(text, maxLength) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}...`
}

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    window.addEventListener("scroll", h, { passive: true })
    return () => window.removeEventListener("scroll", h)
  }, [threshold])
  return scrolled
}

function useBreakpoint(maxWidth) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return undefined

    const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch)
      return () => mediaQuery.removeEventListener("change", updateMatch)
    }

    mediaQuery.addListener(updateMatch)
    return () => mediaQuery.removeListener(updateMatch)
  }, [maxWidth])

  return matches
}

function FadeIn({ children, delay = 0, y = 28, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.22, 0.44, 0.44, 0.96] }}
    >
      {children}
    </motion.div>
  )
}

function BlobPrimary({ style }) {
  return (
    <svg viewBox="0 0 200 200" style={style} aria-hidden="true">
      <path
        d="M47.7,-65.8C60.9,-56.6,69.9,-41.5,73.8,-25.3C77.8,-9.1,76.7,8.2,70.5,23.1C64.3,38,53,50.5,39.4,59.6C25.8,68.7,9.9,74.4,-6.8,74.8C-23.5,75.2,-41,70.3,-53.5,59.5C-66,48.7,-73.5,32,-75.2,14.7C-76.9,-2.6,-72.8,-20.5,-63.3,-34.6C-53.8,-48.7,-38.9,-59,-23.8,-67.1C-8.7,-75.1,6.6,-80.9,20.6,-78.4C34.6,-75.8,34.5,-74.9,47.7,-65.8Z"
        transform="translate(100 100)"
        fill="#660033"
        opacity="0.10"
      />
    </svg>
  )
}

function BlobGold({ style }) {
  return (
    <svg viewBox="0 0 200 200" style={style} aria-hidden="true">
      <path
        d="M39.5,-52.8C50.8,-43.5,59.3,-30.6,63.8,-15.8C68.3,-1,68.8,15.7,62.8,29.6C56.8,43.5,44.3,54.7,30.1,61.3C15.9,67.9,0,69.9,-16.8,67.5C-33.6,65.1,-51.4,58.3,-62.8,45.8C-74.2,33.3,-79.2,15.1,-77.1,-2.1C-75,-19.3,-65.8,-35.5,-53,-46.9C-40.2,-58.3,-23.8,-64.9,-7.5,-63.9C8.8,-62.9,28.2,-62.1,39.5,-52.8Z"
        transform="translate(100 100)"
        fill="#EFBF04"
        opacity="0.12"
      />
    </svg>
  )
}





function Field({ label, type = "text", name, value, onChange, placeholder, multiline }) {
  const Tag = multiline ? "textarea" : "input"
  const id = `contact-${name}`
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: B.mutedLight,
          fontWeight: 600,
          marginBottom: 7,
          fontFamily: "var(--font-space-global)",
        }}
      >
        {label}
      </label>
      <Tag
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        suppressHydrationWarning={name === "email"}
        rows={multiline ? 5 : undefined}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.09)",
          border: "1.5px solid rgba(255,255,255,0.45)",
          borderRadius: 12,
          padding: "13px 16px",
          fontSize: 15,
          color: B.white,
          fontFamily: "var(--font-space-global)",
          outline: "none",
          resize: multiline ? "vertical" : "none",
          boxSizing: "border-box",
          transition: "border-color 0.25s",
        }}
        onFocus={(e) => { e.target.style.borderColor = B.gold }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.45)" }}
      />
    </div>
  )
}

export default function AbrarOrganic({ featuredCaseStudies }) {
  const scrolled = useScrolled(60)
  const isTablet = useBreakpoint(960)
  const isMobile = useBreakpoint(640)
  const heroCaseStudy = featuredCaseStudies?.hero || null
  const supportingCaseStudies = featuredCaseStudies?.more || []
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => { document.documentElement.style.scrollBehavior = "" }
  }, [])
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" })
  const [formStatus, setFormStatus] = useState(null)
  const [leadForm, setLeadForm] = useState({ email: "", idea: "", users: "", budget: "", features: "" })
  const [leadStatus, setLeadStatus] = useState(null)
  const [wizardStep, setWizardStep] = useState(1)
  const [expandedReviewIds, setExpandedReviewIds] = useState({})

  function toggleReview(id) {
    setExpandedReviewIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function scrollToSection(href) {
    if (!href.startsWith("#")) return

    const target = document.querySelector(href)
    if (!target) return

    const navHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 0
    const top = window.scrollY + target.getBoundingClientRect().top - navHeight - 16

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  }

  useEffect(() => {
    const handleHashNavigation = () => {
      if (!window.location.hash) return
      scrollToSection(window.location.hash)
    }

    handleHashNavigation()
    window.addEventListener("hashchange", handleHashNavigation)
    return () => window.removeEventListener("hashchange", handleHashNavigation)
  }, [])

  function handleSectionNav(e, href) {
    if (!href.startsWith("#")) return

    e.preventDefault()

    window.history.pushState(null, "", href)
    scrollToSection(href)
  }

  async function handleLeadSubmit() {
    setLeadStatus("loading")
    try {
      const res = await fetch("/api/abrar-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Abrar Ahmed portfolio - Free Feasibility Review",
          email: leadForm.email,
          idea: leadForm.idea,
          users: leadForm.users,
          budget: leadForm.budget,
          features: leadForm.features,
        }),
      })
      setLeadStatus(res.ok ? "success" : "error")
      if (res.ok) {
        if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
        setLeadForm({ email: "", idea: "", users: "", budget: "", features: "" })
        setWizardStep(1)
      }
    } catch {
      setLeadStatus("error")
    }
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormStatus("loading")
    try {
      const res = await fetch("/api/abrar-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: "Abrar Ahmed portfolio lead message" }),
      })
      setFormStatus(res.ok ? "success" : "error")
      if (res.ok) {
        if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
        setForm({ firstName: "", lastName: "", email: "", message: "" })
      }
    } catch {
      setFormStatus("error")
    }
  }

  return (
    <div style={{ background: B.cream, color: B.ink, overflowX: "clip", fontFamily: "var(--font-space-global)" }}>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: isTablet ? (isMobile ? "12px 5vw" : "14px 6vw") : "18px 8vw",
          display: "flex",
          alignItems: isTablet ? "flex-start" : "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: isTablet ? 10 : 0,
          background: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(102,0,51,0.10)" : "1px solid transparent",
          transition: "background 0.4s, border-bottom 0.4s",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <span
            aria-hidden="true"
            style={{ width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: "50%", background: B.primary, color: B.white, fontSize: 9, fontWeight: 800, letterSpacing: "0.10em" }}
          >
            AA
          </span>
          <span style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: B.ink, letterSpacing: "-0.01em", lineHeight: 1 }}>Abrar Ahmed</span>
        </Link>
        <div style={{ display: "flex", gap: isTablet ? 10 : "clamp(14px,1.8vw,26px)", alignItems: "center", flexWrap: "wrap", width: isTablet ? "100%" : "auto" }}>
          {[
            { label: "Process",      href: "#process" },
            { label: "Services",     href: "#services" },
            { label: "Selected Work", href: "#case-studies" },
            { label: "References", href: "#reviews" },
            { label: "Contact",      href: "#contact" },
          ].map(({ label, href }) => (
            <a key={label} href={href} onClick={(e) => handleSectionNav(e, href)} style={{ fontSize: isMobile ? 11 : 12, letterSpacing: "0.08em", textTransform: "uppercase", color: B.muted, textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
              {label}
            </a>
          ))}
          <div style={{ display: "flex", gap: 6, alignItems: "center", width: isMobile ? "100%" : "auto" }}>
            <a
              href="#contact"
              onClick={(e) => handleSectionNav(e, "#contact")}
              style={{ display: "inline-flex", justifyContent: "center", width: isMobile ? "100%" : "auto", background: B.primary, color: B.white, padding: isTablet ? "10px 18px" : "9px 22px", borderRadius: 50, fontSize: 13, letterSpacing: "0.07em", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap", transition: "transform 0.2s ease, box-shadow 0.2s ease", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(102,0,51,0.35)" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
            >
              Contact me →
            </a>

          </div>
        </div>
      </nav>

      {/* HERO + VIDEO - side by side */}
      <section
        style={{
          position: "relative",
          padding: isTablet
            ? `${isMobile ? 168 : 156}px ${isMobile ? "5vw" : "6vw"} ${isMobile ? 72 : 92}px`
            : "clamp(110px,16vh,160px) 8vw clamp(72px,10vw,110px)",
          overflow: "hidden",
        }}
      >
        <BlobPrimary style={{ position: "absolute", top: "-12%", right: "-6%", width: "clamp(300px,36vw,500px)", pointerEvents: "none", zIndex: 0 }} />
        <BlobGold    style={{ position: "absolute", bottom: "-8%", left: "-6%",  width: "clamp(220px,26vw,360px)", pointerEvents: "none", zIndex: 0 }} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr",
            gap: isTablet ? "clamp(28px,5vw,40px)" : "clamp(40px,6vw,88px)",
            alignItems: "center",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          {/* Left - text */}
          <div style={{ order: isTablet ? 2 : 1 }}>
            <FadeIn delay={0.00}>
              <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(34px,3.8vw,60px)", lineHeight: 1.1, color: B.ink, letterSpacing: "-0.025em", marginBottom: "clamp(20px,2.8vw,32px)" }}>
                I turn difficult product requirements into{" "}
                <em style={{ color: B.primary, fontStyle: "italic" }}>dependable systems.</em>
              </h1>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center" }}>
                <Link
                  href="/work"
                  style={{ display: "inline-flex", justifyContent: "center", width: isMobile ? "100%" : "auto", background: B.primary, color: B.white, padding: "14px 30px", borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em", transition: "transform 0.2s ease, box-shadow 0.2s ease", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(102,0,51,0.35)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                >
                  View selected work →
                </Link>
                <a
                  href="#contact"
                  style={{ display: "inline-flex", justifyContent: "center", width: isMobile ? "100%" : "auto", background: "transparent", color: B.ink, padding: "14px 30px", borderRadius: 50, fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em", border: "1.5px solid rgba(26,23,20,0.18)", transition: "transform 0.2s ease, background 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "rgba(26,23,20,0.06)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "transparent" }}
                >
                  Contact me
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right - video */}
          <FadeIn delay={0.18} style={{ order: isTablet ? 1 : 2 }}>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -30,
                  borderRadius: "52% 48% 44% 56% / 46% 54% 48% 52%",
                  background: `radial-gradient(ellipse at 60% 40%, ${B.primary}14, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 20, overflow: "hidden", boxShadow: "0 28px 70px rgba(102,0,51,0.18), 0 6px 18px rgba(0,0,0,0.09)" }}>
                <iframe
                  src="https://www.youtube.com/embed/Iwu7pIEBjW8?rel=0&modestbranding=1"
                  title="How Abrar Can Help You"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Logo strip - inside hero */}
        <FadeIn delay={0.36}>
          <div style={{ borderTop: "1px solid rgba(102,0,51,0.10)", marginTop: "clamp(40px,6vw,72px)", paddingTop: "clamp(28px,4vw,44px)", position: "relative", zIndex: 1 }}>
            <p style={{ textAlign: "center", fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: B.muted, fontWeight: 700, marginBottom: "clamp(18px,2.8vw,30px)" }}>
              Trusted by
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "clamp(24px,4vw,56px)" }}>
              {[
                { name: "Volkswagen",  src: "/logos/vw.jpg", width: 36 },
                { name: "Accenture",   src: "/logos/Accenture.png", width: 120 },
                { name: "BSI",         src: "/logos/bsi.png", width: 74 },
                { name: "Marc O'Polo", src: "/logos/marcopolo.webp", width: 60 },
                { name: "Sandoz",      src: "/logos/sandoz.png", width: 117 },
                { name: "ADAC",        src: "/logos/adac.png", width: 36 },
              ].map(({ name, src, width }) => (
                <Image
                  key={name}
                  src={src}
                  alt={name}
                  width={width}
                  height={36}
                  style={{ objectFit: "contain", filter: "grayscale(1)", opacity: 0.48, mixBlendMode: "multiply", transition: "filter 0.3s, opacity 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "grayscale(0)"; e.currentTarget.style.opacity = "1" }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = "grayscale(1)"; e.currentTarget.style.opacity = "0.48" }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* TRUST BAR */}
      <section
        style={{
          background: B.primaryDark,
          padding: "clamp(44px,6vw,72px) 8vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 0,
          position: "relative",
          overflow: "hidden",
          flexWrap: "wrap",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 80% 50%, ${B.gold}18, transparent 60%)`, pointerEvents: "none" }} />
        {[
          { value: "100+",       label: "Clients Served",    sub: "10 countries · since 2014" },
          { value: "100%",       label: "Project Success",   sub: "zero failed projects" },
          { value: "10+",       label: "Years in AI",       sub: "since 2014" },
          { value: "$50M+",      label: "Revenue Generated", sub: "for clients since 2014" },
        ].map((s, i) => (
          <FadeIn key={i} delay={i * 0.1} style={{ flex: isTablet ? "1 1 220px" : "1 1 0", minWidth: isMobile ? "100%" : 200, textAlign: "center", position: "relative", zIndex: 1, borderRight: !isTablet && i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", borderBottom: isTablet && i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", padding: "clamp(16px,2vw,24px) clamp(14px,2.5vw,36px)" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "clamp(56px,7vw,88px)" }}>
              <div style={{ fontFamily: "var(--font-space-global)", fontSize: s.isText ? "clamp(30px,3vw,42px)" : "clamp(48px,5.5vw,76px)", fontWeight: 800, color: B.gold, letterSpacing: s.isText ? "0.01em" : "-0.04em", lineHeight: 1 }}>
                {s.value}
              </div>
            </div>
            <div style={{ fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontWeight: 700, marginTop: 10 }}>
              {s.label}
            </div>
            <div style={{ fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.55)", fontWeight: 500, marginTop: 5 }}>
              {s.sub}
            </div>
          </FadeIn>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="process" style={{ padding: "clamp(80px,11vw,140px) 8vw", background: B.cream, position: "relative", overflow: "hidden" }}>
        <BlobPrimary style={{ position: "absolute", bottom: "-18%", left: "-8%", width: "clamp(280px,32vw,440px)", pointerEvents: "none" }} />
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.primary, fontWeight: 700, marginBottom: 12 }}>
            The Process
          </p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px,3.8vw,48px)", fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.15, color: B.ink, marginBottom: "clamp(48px,6.5vw,84px)", maxWidth: 480 }}>
            Simple, transparent,<br />no surprises.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "repeat(3,1fr)", gap: "clamp(24px,4vw,56px)", position: "relative", zIndex: 1 }}>
          {[
            { no: "01", title: "Discovery Call",    desc: "30 minutes. No pitch, no pressure. We talk through your problem, your constraints, and your goals. I'll tell you honestly whether AI is the right tool." },
            { no: "02", title: "Scoped Proposal",   desc: "Within 48 hours you receive a clear written scope: deliverables, timeline, cost, and what I need from you. No ambiguity before we start." },
            { no: "03", title: "Build \u0026 Ship",       desc: "I build in short cycles with regular check-ins. You see working software early and often. No 6-week black boxes - just steady, visible progress." },
          ].map((step, i) => (
            <FadeIn key={i} delay={0.08 + i * 0.12}>
              <div style={{ position: "relative", paddingTop: "clamp(10px,2vw,20px)" }}>
                <div style={{ fontFamily: SERIF, fontSize: "clamp(72px,9vw,120px)", fontWeight: 400, color: B.primary, opacity: 0.08, lineHeight: 1, position: "absolute", top: -10, left: -8, userSelect: "none", pointerEvents: "none" }}>
                  {step.no}
                </div>
                <p style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: B.primary, fontWeight: 700, marginBottom: 14, position: "relative" }}>
                  {step.no}
                </p>
                <h3 style={{ fontFamily: SERIF, fontSize: "clamp(18px,1.7vw,24px)", fontWeight: 400, color: B.ink, marginBottom: 12, lineHeight: 1.28, position: "relative" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.78, color: B.muted, position: "relative" }}>
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "clamp(72px,10vw,130px) 8vw", background: B.creamDark, position: "relative", overflow: "hidden" }}>
        <BlobGold style={{ position: "absolute", top: "-14%", right: "-8%", width: "clamp(300px,38vw,520px)", pointerEvents: "none" }} />
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.primary, fontWeight: 700, marginBottom: 12 }}>What I Build</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,50px)", fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.15, color: B.ink, marginBottom: "clamp(40px,5.5vw,72px)", maxWidth: 520 }}>
            Systems that work while you do everything else.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 18, position: "relative", zIndex: 1 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                style={{ background: B.cream, borderRadius: 22, padding: "clamp(22px,3vw,36px)", border: `1.5px solid ${s.accent}22`, height: "100%", boxSizing: "border-box", transition: "transform 0.32s ease, box-shadow 0.32s ease", display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = `0 18px 52px ${s.accent}22` }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
              >
                <Image width={150} height={150} src={s.sticker} alt={s.title} style={{ width: "clamp(110px,14vw,150px)", height: "clamp(110px,14vw,150px)", objectFit: "contain", marginBottom: 20, filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.10))" }} />
                <h3 style={{ fontFamily: SERIF, fontSize: "clamp(17px,1.6vw,21px)", fontWeight: 400, color: B.ink, marginBottom: 10, lineHeight: 1.28 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.72, color: B.muted }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TECH STACK - animated marquee */}
      <section style={{ background: B.ink, padding: "clamp(72px,10vw,130px) 0", overflow: "hidden", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "10%", right: "-5%", width: "clamp(260px,32vw,440px)", height: "clamp(260px,32vw,440px)", borderRadius: "50%", background: `radial-gradient(ellipse at center, ${B.primary}22, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ padding: "0 8vw", marginBottom: "clamp(40px,5.5vw,72px)" }}>
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.gold, fontWeight: 700, marginBottom: 12 }}>
              Tech Stack
            </p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px,3.8vw,48px)", fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.15, color: B.white, maxWidth: 520 }}>
              Frontier tools.<br />Production-grade stacks.
            </h2>
          </FadeIn>
        </div>
        {[
          { color: B.gold,    duration: 38, tools: ["GPT-5", "o3 / o4-mini", "Claude 3.7 Sonnet", "Claude Opus 4", "Gemini 2.0 Flash", "DeepSeek R1", "Llama 3.3", "Grok 3", "Mistral Large", "Whisper", "ElevenLabs", "DALL·E 3", "Sora", "Gemma 3"] },
          { color: B.primary, duration: 52, tools: ["LangChain", "LangGraph", "CrewAI", "AutoGen", "Agno", "Pydantic AI", "OpenAI Agents SDK", "MCP", "Dify", "n8n", "Make", "Zapier", "Flowise", "Semantic Kernel", "LlamaIndex"] },
          { color: "#14a800", duration: 44, tools: ["Python", "FastAPI", "Next.js", "Docker", "Supabase", "Pinecone", "Qdrant", "Weaviate", "PostgreSQL", "MongoDB", "Redis", "AWS", "GCP", "Azure", "Vercel", "Ollama", "HuggingFace"] },
        ].map((row, ri) => (
          <div key={ri} style={{ position: "relative", marginBottom: ri < 2 ? 14 : 0, overflow: "hidden" }}>
            <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10vw", background: `linear-gradient(to right, ${B.ink}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <div aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "10vw", background: `linear-gradient(to left, ${B.ink}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
            <motion.div
              style={{ display: "flex", gap: 12, width: "max-content", padding: "6px 0" }}
              animate={{ x: ri % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: row.duration, repeat: Infinity, repeatType: "loop", ease: "linear" }}
            >
              {[...row.tools, ...row.tools].map((tool, j) => (
                <span
                  key={j}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 50, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.78)", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", whiteSpace: "nowrap", letterSpacing: "0.02em" }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: row.color, flexShrink: 0, opacity: 0.85 }} />
                  {tool}
                </span>
              ))}
            </motion.div>
          </div>
        ))}
        <div style={{ padding: "clamp(28px,4vw,44px) 8vw 0", display: "flex", gap: "clamp(24px,4vw,60px)", flexWrap: "wrap" }}>
          {[
            { label: "LLMs & AI",   color: B.gold },
            { label: "Frameworks",  color: B.primary },
            { label: "Infra & Dev", color: "#14a800" },
          ].map((l, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }} />
              <span style={{ fontSize: 11, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", fontWeight: 700 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      {(heroCaseStudy || supportingCaseStudies.length > 0) && (
        <section id="case-studies" style={{ padding: "clamp(72px,10vw,130px) 8vw", background: B.creamDark, position: "relative", overflow: "hidden" }}>
          <BlobGold style={{ position: "absolute", top: "-12%", right: "-6%", width: "clamp(280px,34vw,460px)", pointerEvents: "none" }} />
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.primary, fontWeight: 700, marginBottom: 12 }}>
              Selected Work
            </p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(26px,3.8vw,48px)", fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.15, color: B.ink, marginBottom: "clamp(40px,5.5vw,72px)", maxWidth: 500 }}>
              The constraints, decisions,<br />and outcomes behind the work.
            </h2>
          </FadeIn>

          {heroCaseStudy && (
            <FadeIn>
              <Link
                href={heroCaseStudy.href}
                style={{ textDecoration: "none", display: "block" }}
              >
                <div
                  style={{ background: B.ink, borderRadius: 28, padding: "clamp(36px,5vw,64px)", marginBottom: 20, position: "relative", overflow: "hidden", transition: "box-shadow 0.35s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 32px 80px rgba(26,23,20,0.30)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none" }}
                >
                  <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-5%", width: "clamp(260px,38vw,520px)", height: "clamp(260px,38vw,520px)", borderRadius: "50%", background: `radial-gradient(ellipse at center, ${B.primary}28, transparent 60%)`, pointerEvents: "none" }} />
                  <div aria-hidden="true" style={{ position: "absolute", bottom: "-15%", left: "-3%", width: "clamp(180px,24vw,340px)", height: "clamp(180px,24vw,340px)", borderRadius: "50%", background: `radial-gradient(ellipse at center, ${B.gold}14, transparent 65%)`, pointerEvents: "none" }} />
                  <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 50, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", background: `${B.primary}35`, color: B.gold, marginBottom: 24, position: "relative", border: `1px solid ${B.primary}55` }}>
                    {heroCaseStudy.industry}
                  </span>
                  <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.3fr 0.9fr", gap: isTablet ? 24 : "clamp(32px,5vw,72px)", alignItems: "center", position: "relative", zIndex: 1 }}>
                    <div>
                      <h3 style={{ fontFamily: SERIF, fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.08, color: B.white, marginBottom: 18, letterSpacing: "-0.02em", fontWeight: 400 }}>
                        {heroCaseStudy.title}
                      </h3>
                      {heroCaseStudy.client && (
                        <p style={{ fontSize: 10, letterSpacing: "0.20em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)", fontWeight: 700, marginBottom: 18 }}>
                          Client: {heroCaseStudy.client}
                        </p>
                      )}
                      <p style={{ fontFamily: SERIF, fontSize: "clamp(16px,1.5vw,20px)", lineHeight: 1.68, color: "rgba(255,255,255,0.85)", marginBottom: 28 }}>
                        {heroCaseStudy.excerpt || heroCaseStudy.description}
                      </p>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color: B.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        Read case study →
                      </div>
                    </div>
                    {heroCaseStudy.featuredImageUrl && (
                      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "16/9" }}>
                        <Image
                          src={heroCaseStudy.featuredImageUrl}
                          alt={heroCaseStudy.featuredImageAlt || heroCaseStudy.title}
                          fill
                          sizes="(max-width: 960px) 84vw, 34vw"
                          unoptimized
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}

          {supportingCaseStudies.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: 20, position: "relative", zIndex: 1 }}>
              {supportingCaseStudies.slice(0, 2).map((article, i) => (
                <FadeIn key={article.id} delay={(i + 1) * 0.12}>
                  <Link href={article.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                    <div
                      style={{ background: B.cream, borderRadius: 22, overflow: "hidden", border: "1.5px solid rgba(102,0,51,0.10)", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column", transition: "transform 0.32s ease, box-shadow 0.32s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 18px 52px rgba(102,0,51,0.12)" }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                    >
                      {article.featuredImageUrl && (
                        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden", flexShrink: 0 }}>
                          <Image
                            src={article.featuredImageUrl}
                            alt={article.featuredImageAlt || article.title}
                            fill
                            sizes="(max-width: 960px) 84vw, 42vw"
                            unoptimized
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)" }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
                          />
                        </div>
                      )}
                      <div style={{ padding: "clamp(24px,3.5vw,40px)", display: "flex", flexDirection: "column", flex: 1 }}>
                      <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 50, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", background: `${B.primary}12`, color: B.primary, marginBottom: 20, alignSelf: "flex-start" }}>
                        {article.industry}
                      </span>
                      <div style={{ fontFamily: SERIF, fontSize: "clamp(28px,3vw,40px)", fontWeight: 400, color: B.primary, lineHeight: 1.08, marginBottom: 12, letterSpacing: "-0.02em" }}>
                        {article.title}
                      </div>
                      <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: B.muted, fontWeight: 600, marginBottom: 20 }}>
                        {article.client || article.category || "Case Study"}
                      </p>
                      <p style={{ fontSize: 14, lineHeight: 1.72, color: B.inkSoft, marginBottom: 22 }}>
                        {article.excerpt || article.description}
                      </p>
                      <div style={{ marginTop: "auto" }}>
                        <p style={{ fontSize: 12, lineHeight: 1.55, color: B.primary, display: "flex", gap: 8, fontWeight: 700 }}>
                          <span style={{ flexShrink: 0 }}>→</span>
                          Read case study
                        </p>
                      </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}

          <FadeIn delay={0.18}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(28px,4vw,40px)", position: "relative", zIndex: 1 }}>
              <Link
                href="/work"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 28px",
                  borderRadius: 999,
                  background: B.primary,
                  color: B.white,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  boxShadow: "0 12px 28px rgba(102,0,51,0.14)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 18px 36px rgba(102,0,51,0.18)"
                  e.currentTarget.style.background = B.primaryDark
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(102,0,51,0.14)"
                  e.currentTarget.style.background = B.primary
                }}
              >
                See all selected work →
              </Link>
            </div>
          </FadeIn>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section id="reviews" style={{ padding: "clamp(72px,10vw,130px) 8vw", background: B.ink, position: "relative", overflow: "hidden", scrollMarginTop: isTablet ? 120 : 110 }}>
        <div aria-hidden="true" style={{ position: "absolute", top: -50, left: "2vw", fontFamily: SERIF, fontSize: "clamp(200px,28vw,380px)", color: "rgba(239,191,4,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>&quot;</div>
        <FadeIn>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.gold, fontWeight: 700, marginBottom: "clamp(22px,3.2vw,40px)" }}>
            What Clients Say
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          {(() => {
            const featuredReview = TESTIMONIALS[0]
            const isExpanded = Boolean(expandedReviewIds[featuredReview.id])
            const isTruncated = featuredReview.abrarQuote.length > FEATURED_REVIEW_PREVIEW_LENGTH
            const displayedQuote = isExpanded
              ? featuredReview.abrarQuote
              : truncateReview(featuredReview.abrarQuote, FEATURED_REVIEW_PREVIEW_LENGTH)

            return (
              <>
                <div style={{ marginBottom: 10 }}>
                  {[1,2,3,4,5].map((n) => <span key={n} style={{ color: B.gold, fontSize: 20 }}>★</span>)}
                </div>
                <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.30)", fontWeight: 600, marginBottom: 14 }}>{featuredReview.company} · {featuredReview.projectLabel}</p>
                <blockquote style={{ fontFamily: SERIF, fontSize: "clamp(18px,2.4vw,34px)", fontWeight: 400, lineHeight: 1.52, color: B.white, maxWidth: 880, marginBottom: 18, fontStyle: "italic" }}>
                  &ldquo;{displayedQuote}&rdquo;
                  {isTruncated && (
                    <button
                      type="button"
                      aria-label={isExpanded ? "Collapse testimonial" : "Expand testimonial"}
                      onClick={() => toggleReview(featuredReview.id)}
                      style={{
                        appearance: "none",
                        border: `1px solid ${B.gold}`,
                        background: "transparent",
                        color: B.gold,
                        fontSize: "0.7em",
                        fontWeight: 700,
                        lineHeight: 1,
                        width: "1.6em",
                        height: "1.6em",
                        borderRadius: "999px",
                        padding: 0,
                        marginLeft: 10,
                        verticalAlign: "0.08em",
                        cursor: "pointer",
                      }}
                    >
                      {isExpanded ? "−" : "+"}
                    </button>
                  )}
                </blockquote>
                <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)", fontWeight: 700, marginBottom: "clamp(40px,5.5vw,80px)" }}>
                  - {featuredReview.clientName}, {featuredReview.company}
                </p>
              </>
            )
          })()}
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
          {TESTIMONIALS.slice(1).map((t, i) => {
            const isExpanded = Boolean(expandedReviewIds[t.id])
            const isTruncated = t.abrarQuote.length > GRID_REVIEW_PREVIEW_LENGTH
            const displayedQuote = isExpanded
              ? t.abrarQuote
              : truncateReview(t.abrarQuote, GRID_REVIEW_PREVIEW_LENGTH)

            return (
              <FadeIn key={i} delay={0.14 + i * 0.07}>
                <div style={{ background: "rgba(239,191,4,0.06)", borderRadius: 20, padding: "clamp(22px,3vw,36px)", border: "1px solid rgba(239,191,4,0.14)", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ marginBottom: 10 }}>
                    {[1,2,3,4,5].map((n) => <span key={n} style={{ color: B.gold, fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", fontWeight: 600, marginBottom: 10 }}>{t.company} · {t.projectLabel}</p>
                  <p style={{ fontFamily: SERIF, fontSize: "clamp(13px,1.2vw,16px)", lineHeight: 1.72, color: "rgba(255,255,255,0.84)", marginBottom: 16, fontStyle: "italic" }}>
                    &ldquo;{displayedQuote}&rdquo;
                    {isTruncated && (
                      <button
                        type="button"
                        aria-label={isExpanded ? "Collapse testimonial" : "Expand testimonial"}
                        onClick={() => toggleReview(t.id)}
                        style={{
                          appearance: "none",
                          border: `1px solid ${B.gold}`,
                          background: "transparent",
                          color: B.gold,
                          fontSize: "0.8em",
                          fontWeight: 700,
                          lineHeight: 1,
                          width: "1.5em",
                          height: "1.5em",
                          borderRadius: "999px",
                          padding: 0,
                          marginLeft: 8,
                          verticalAlign: "0.08em",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? "−" : "+"}
                      </button>
                    )}
                  </p>
                  <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.34)", fontWeight: 700 }}>
                    - {t.clientName}, {t.company}
                  </p>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </section>

      {/* FREE FEASIBILITY REVIEW - wizard */}
      <section
        style={{
          padding: "clamp(72px,10vw,120px) 8vw",
          background: B.creamDark,
          borderTop: "1px solid rgba(102,0,51,0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <BlobPrimary style={{ position: "absolute", top: "-14%", left: "-8%", width: "clamp(280px,34vw,460px)", pointerEvents: "none" }} />
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1.1fr", gap: isTablet ? 32 : "clamp(40px,6vw,80px)", maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1, alignItems: "center" }}>

          {/* Left - pitch */}
          <FadeIn>
            <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: B.primary, fontWeight: 700, marginBottom: 16 }}>
              Free Review
            </p>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(24px,3vw,40px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.18, color: B.ink, marginBottom: 16 }}>
              Is your AI idea<br />actually buildable?
            </h2>
            <p style={{ fontSize: "clamp(14px,1.2vw,16px)", lineHeight: 1.8, color: B.muted }}>
              3 questions. I&apos;ll personally send back a candid assessment within 48 hours - scope, risks, and whether to build it at all.
            </p>
          </FadeIn>

          {/* Right - wizard card */}
          <FadeIn delay={0.1}>
            <div style={{ background: B.white, borderRadius: 24, border: "1.5px solid rgba(102,0,51,0.10)", overflow: "hidden", boxShadow: "0 8px 32px rgba(102,0,51,0.07)" }}>

              {/* Progress bar */}
              {leadStatus !== "success" && (
                <div style={{ padding: "22px 28px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: B.mutedLight, fontWeight: 700 }}>
                      Step {wizardStep} of 3
                    </span>
                    <span style={{ fontSize: 11, color: B.mutedLight, letterSpacing: "0.06em" }}>
                      {wizardStep === 1 ? "The Idea" : wizardStep === 2 ? "Your Context" : "Final Details"}
                    </span>
                  </div>
                  <div style={{ height: 2, background: "rgba(102,0,51,0.10)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div
                      style={{ height: "100%", background: B.primary, borderRadius: 2, originX: 0 }}
                      initial={false}
                      animate={{ width: `${(wizardStep / 3) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              )}

              {/* Step content */}
              <div style={{ padding: "clamp(20px,2.8vw,34px) 28px clamp(26px,3.2vw,40px)", position: "relative", minHeight: 300, overflow: "hidden" }}>
                {leadStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ textAlign: "center", paddingTop: 24 }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${B.primary}12`, border: `1.5px solid ${B.primary}33`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 20 }}>✓</div>
                    <p style={{ fontFamily: SERIF, fontSize: 22, fontStyle: "italic", color: B.primary, marginBottom: 10, lineHeight: 1.3 }}>Review request received.</p>
                    <p style={{ fontSize: 14, color: B.muted, lineHeight: 1.7 }}>I&apos;ll personally send you a write-up within 48 hours.</p>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    {wizardStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        <p style={{ fontFamily: SERIF, fontSize: "clamp(16px,1.7vw,21px)", fontWeight: 400, color: B.ink, lineHeight: 1.38, marginBottom: 18 }}>
                          What problem are you trying to solve with AI?
                        </p>
                        <textarea
                          aria-label="AI problem"
                          value={leadForm.idea}
                          onChange={(e) => setLeadForm(f => ({ ...f, idea: e.target.value }))}
                          placeholder={"e.g. Our support team spends 4 hours a day answering the same 20 questions - I want an agent to handle them automatically."}
                          rows={5}
                          suppressHydrationWarning
                          style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(102,0,51,0.15)", background: B.cream, fontSize: 14, color: B.ink, outline: "none", fontFamily: "var(--font-space-global)", resize: "none", lineHeight: 1.65, boxSizing: "border-box", transition: "border-color 0.2s" }}
                          onFocus={(e) => { e.target.style.borderColor = B.primary }}
                          onBlur={(e) => { e.target.style.borderColor = "rgba(102,0,51,0.15)" }}
                        />
                        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                          <button
                            type="button"
                            onClick={() => { if (leadForm.idea.trim()) setWizardStep(2) }}
                            style={{ background: B.gold, color: B.ink, padding: "11px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, border: "none", cursor: leadForm.idea.trim() ? "pointer" : "default", letterSpacing: "0.04em", opacity: leadForm.idea.trim() ? 1 : 0.38, transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s" }}
                            onMouseEnter={(e) => { if (leadForm.idea.trim()) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(239,191,4,0.38)" } }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                          >
                            Next →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {wizardStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        <p style={{ fontFamily: SERIF, fontSize: "clamp(16px,1.7vw,21px)", fontWeight: 400, color: B.ink, lineHeight: 1.38, marginBottom: 18 }}>
                          Who will use it, and what&apos;s the budget?
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <input
                            aria-label="Target users"
                            type="text"
                            value={leadForm.users}
                            onChange={(e) => setLeadForm(f => ({ ...f, users: e.target.value }))}
                            placeholder="Who is this for? (e.g. support team of 10, solo founder)"
                            suppressHydrationWarning
                            style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(102,0,51,0.15)", background: B.cream, fontSize: 14, color: B.ink, outline: "none", fontFamily: "var(--font-space-global)", boxSizing: "border-box", transition: "border-color 0.2s" }}
                            onFocus={(e) => { e.target.style.borderColor = B.primary }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(102,0,51,0.15)" }}
                          />
                          <input
                            aria-label="Budget"
                            type="text"
                            value={leadForm.budget}
                            onChange={(e) => setLeadForm(f => ({ ...f, budget: e.target.value }))}
                            placeholder="Budget? (e.g. $5k–$15k, $2k/mo, not sure yet)"
                            suppressHydrationWarning
                            style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(102,0,51,0.15)", background: B.cream, fontSize: 14, color: B.ink, outline: "none", fontFamily: "var(--font-space-global)", boxSizing: "border-box", transition: "border-color 0.2s" }}
                            onFocus={(e) => { e.target.style.borderColor = B.primary }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(102,0,51,0.15)" }}
                          />
                        </div>
                        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={() => setWizardStep(1)}
                            style={{ background: "transparent", color: B.mutedLight, padding: "11px 0", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.04em", transition: "color 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = B.muted }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = B.mutedLight }}
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => { if (leadForm.users.trim()) setWizardStep(3) }}
                            style={{ background: B.gold, color: B.ink, padding: "11px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, border: "none", cursor: leadForm.users.trim() ? "pointer" : "default", letterSpacing: "0.04em", opacity: leadForm.users.trim() ? 1 : 0.38, transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s" }}
                            onMouseEnter={(e) => { if (leadForm.users.trim()) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(239,191,4,0.38)" } }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                          >
                            Next →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {wizardStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 32 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -32 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        <p style={{ fontFamily: SERIF, fontSize: "clamp(16px,1.7vw,21px)", fontWeight: 400, color: B.ink, lineHeight: 1.38, marginBottom: 18 }}>
                          What must work on day one, and where should I send the review?
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                          <textarea
                            aria-label="Must-have features"
                            value={leadForm.features}
                            onChange={(e) => setLeadForm(f => ({ ...f, features: e.target.value }))}
                            placeholder="Must-have features on launch (e.g. handle refunds, escalate edge cases to a human)"
                            rows={3}
                            suppressHydrationWarning
                            style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: "1.5px solid rgba(102,0,51,0.15)", background: B.cream, fontSize: 14, color: B.ink, outline: "none", fontFamily: "var(--font-space-global)", resize: "none", lineHeight: 1.65, boxSizing: "border-box", transition: "border-color 0.2s" }}
                            onFocus={(e) => { e.target.style.borderColor = B.primary }}
                            onBlur={(e) => { e.target.style.borderColor = "rgba(102,0,51,0.15)" }}
                          />
                          <input
                            aria-label="Email for feasibility review"
                            type="email"
                            required
                            value={leadForm.email}
                            onChange={(e) => setLeadForm(f => ({ ...f, email: e.target.value }))}
                            placeholder="Your email - where should I send the review?"
                            suppressHydrationWarning
                            style={{ width: "100%", padding: "13px 16px", borderRadius: 12, border: `1.5px solid ${B.primary}44`, background: B.cream, fontSize: 14, color: B.ink, outline: "none", fontFamily: "var(--font-space-global)", boxSizing: "border-box", transition: "border-color 0.2s" }}
                            onFocus={(e) => { e.target.style.borderColor = B.primary }}
                            onBlur={(e) => { e.target.style.borderColor = `${B.primary}44` }}
                          />
                        </div>
                        {leadStatus === "error" && (
                          <p style={{ fontSize: 13, color: B.primary, marginTop: 10 }}>Something went wrong. Please use the contact form below.</p>
                        )}
                        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <button
                            type="button"
                            onClick={() => setWizardStep(2)}
                            style={{ background: "transparent", color: B.mutedLight, padding: "11px 0", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", letterSpacing: "0.04em", transition: "color 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = B.muted }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = B.mutedLight }}
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={handleLeadSubmit}
                            disabled={leadStatus === "loading"}
                            style={{ background: B.gold, color: B.ink, padding: "11px 28px", borderRadius: 50, fontSize: 14, fontWeight: 700, border: "none", cursor: (leadForm.email.trim() && leadStatus !== "loading") ? "pointer" : "default", letterSpacing: "0.04em", opacity: (leadForm.email.trim() && leadStatus !== "loading") ? 1 : 0.38, transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s" }}
                            onMouseEnter={(e) => { if (leadForm.email.trim() && leadStatus !== "loading") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(239,191,4,0.38)" } }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                          >
                            {leadStatus === "loading" ? "Sending…" : "Get My Free Review →"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA + CONTACT */}
      <section id="contact" style={{ padding: "clamp(80px,12vw,150px) 8vw", background: B.primary, position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-10%", width: "clamp(360px,50vw,700px)", height: "clamp(360px,50vw,700px)", borderRadius: "52% 48% 44% 56% / 46% 54% 48% 52%", background: `radial-gradient(ellipse at center, ${B.gold}22, transparent 65%)`, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "clamp(280px,38vw,520px)", height: "clamp(280px,38vw,520px)", borderRadius: "38% 62% 56% 44% / 52% 48% 54% 46%", background: "rgba(0,0,0,0.18)", pointerEvents: "none" }} />
        <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1fr 1fr", gap: isTablet ? 36 : "clamp(44px,7vw,100px)", position: "relative", zIndex: 1, alignItems: "start" }}>

          {/* Left - CTA copy */}
          <FadeIn>
            <h2 style={{ fontFamily: SERIF, fontSize: "clamp(32px,4.8vw,62px)", fontWeight: 400, letterSpacing: "-0.022em", lineHeight: 1.1, color: B.white, marginBottom: "clamp(16px,2.2vw,26px)" }}>
              Ready to build{" "}<em style={{ color: B.gold, fontStyle: "italic" }}>something real?</em>
            </h2>
            <p style={{ fontSize: "clamp(14px,1.35vw,17px)", lineHeight: 1.8, color: "rgba(255,255,255,0.72)", marginBottom: "clamp(22px,3.2vw,36px)", maxWidth: 400 }}>
              Message me directly on WhatsApp. We&apos;ll figure out whether I&apos;m the right fit for what you need - and if not, I&apos;ll point you somewhere better.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_US_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Send a WhatsApp message to ${US_PHONE_DISPLAY}`}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: B.white, padding: "15px 28px", borderRadius: 50, fontSize: 15, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", marginBottom: "clamp(32px,4.5vw,54px)", transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,211,102,0.35)"; e.currentTarget.style.background = "#1fba59" }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#25D366" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path d="M19.11 4.93A9.82 9.82 0 0 0 12.06 2C6.65 2 2.23 6.42 2.23 11.83c0 1.74.45 3.43 1.3 4.92L2 22l5.4-1.51a9.77 9.77 0 0 0 4.67 1.19c5.41 0 9.83-4.42 9.83-9.83 0-2.63-1.02-5.1-2.79-6.92Zm-7.05 15.12a8.11 8.11 0 0 1-4.15-1.14l-.3-.18-3.2.9.86-3.12-.2-.32a8.14 8.14 0 0 1-1.25-4.35c0-4.5 3.67-8.17 8.19-8.17a8.1 8.1 0 0 1 5.79 2.39 8.14 8.14 0 0 1 2.39 5.8c0 4.51-3.68 8.18-8.18 8.18Zm4.48-6.11c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.55.12-.16.24-.63.78-.77.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.42-.55-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.18.87 2.32.99 2.48.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.15 1.53.09.47-.07 1.41-.58 1.61-1.14.2-.56.2-1.05.14-1.14-.06-.1-.22-.16-.46-.28Z" />
              </svg>
              Send Message on WhatsApp
            </a>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "✓  100+ clients served",
                "✓  10+ years building AI - since 2014",
                "✓  You work directly with me, always",
              ].map((line, i) => (
                <p key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.58)", letterSpacing: "0.02em", lineHeight: 1.5 }}>{line}</p>
              ))}

            </div>
          </FadeIn>

          {/* Right - contact form */}
          <FadeIn delay={0.12}>
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 26, padding: "clamp(26px,4vw,46px)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(10px)" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 22 }}>
                Or send a message
              </p>
              {formStatus === "success" ? (
                <div style={{ padding: "12px 0", textAlign: "center" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 20, color: B.gold, fontStyle: "italic", marginBottom: 6 }}>Message sent.</div>
                  <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 1.6 }}>
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                    <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First" />
                    <Field label="Last Name"  name="lastName"  value={form.lastName}  onChange={handleChange} placeholder="Last" />
                  </div>
                  <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                  <Field label="What are you building?" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project…" multiline />
                  {formStatus === "error" && (
                    <p style={{ color: B.gold, fontSize: 13 }}>Something went wrong. Message me on WhatsApp directly.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formStatus === "loading"}
                    style={{ background: B.gold, color: B.ink, padding: "14px 32px", borderRadius: 50, fontSize: 15, fontWeight: 700, border: "none", cursor: formStatus === "loading" ? "wait" : "pointer", opacity: formStatus === "loading" ? 0.6 : 1, transition: "opacity 0.2s, transform 0.2s ease, box-shadow 0.2s ease", letterSpacing: "0.04em", alignSelf: isMobile ? "stretch" : "flex-start" }}
                    onMouseEnter={(e) => { if (formStatus !== "loading") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(239,191,4,0.45)" } }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                  >
                    {formStatus === "loading" ? "Sending…" : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "26px 8vw", background: B.primaryDark, display: "flex", alignItems: isTablet ? "flex-start" : "center", justifyContent: "space-between", flexWrap: "wrap", flexDirection: isTablet ? "column" : "row", gap: 14 }}>
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "center", gap: 24, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}>© 2026 Abrar Ahmed</span>
          <a href={`tel:${US_PHONE_TEL}`} style={{ textDecoration: "none" }}
            onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = B.white}
            onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "rgba(255,255,255,0.75)"}
          >
            <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 2 }}>USA</span>
            <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em", transition: "color 0.2s" }}>{US_PHONE_DISPLAY}</span>
          </a>
          <a href="tel:+498941112866" style={{ textDecoration: "none" }}
            onMouseEnter={(e) => e.currentTarget.querySelector("span").style.color = B.white}
            onMouseLeave={(e) => e.currentTarget.querySelector("span").style.color = "rgba(255,255,255,0.75)"}
          >
            <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 2 }}>Germany</span>
            <span style={{ display: "block", fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.75)", letterSpacing: "0.02em", transition: "color 0.2s" }}>+49 89 41112866</span>
          </a>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
          {[
            { label: "Selected work", href: "/work" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              style={{ fontSize: 13, color: "rgba(255,255,255,0.32)", textDecoration: "none", letterSpacing: "0.06em" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  )
}
