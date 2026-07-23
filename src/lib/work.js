export const WORK = [
  {
    slug: "krafted-ai-shopify-app",
    title: "Krafted: an AI product page generator for Shopify",
    shortTitle: "Krafted",
    client: "Krafted",
    industry: "AI commerce",
    role: "AI and full-stack engineer",
    summary:
      "I helped turn a messy, multi-platform product import process into a resumable generation pipeline that could publish complete Shopify product pages without asking merchants to rebuild the result.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/19116776369d13bbaab00a71d90a703c9f2ebb79-2222x1240.png",
    featuredImageAlt:
      "Krafted embedded Shopify application showing its product page generation workflow.",
    highlights: [
      { value: "7", label: "niche-specific page systems" },
      { value: "4.5:1", label: "minimum text contrast enforced" },
      { value: "Resumable", label: "generation pipeline" },
    ],
    context: [
      "Importing a product into Shopify is quick. Turning unreliable marketplace data into a page that is accurate, on-brand, accessible, and ready to publish is not.",
      "The product had to coordinate AI classification, image evaluation, colour extraction, Shopify theme writes, billing gates, and third-party platform limits. A failure halfway through could not force a merchant to start over.",
    ],
    contribution: [
      "I worked across the generation architecture, AI decision boundaries, Shopify integration, and reliability controls.",
      "The central design choice was to use models only for subjective work such as classification and copy generation. Deterministic code remained responsible for measurable facts such as contrast ratios, asset availability, billing state, and whether a Shopify write actually persisted.",
    ],
    decisions: [
      {
        constraint:
          "One generation request crossed AI services, external marketplaces, billing checks, and eventually consistent Shopify APIs.",
        decision:
          "Model every stage as an idempotent step with explicit status, retry behaviour, and a durable checkpoint.",
        impact:
          "Interrupted jobs resume from the last verified step instead of repeating paid model calls or duplicating Shopify writes.",
      },
      {
        constraint:
          "Language models produced visually plausible colour palettes that still failed accessibility checks.",
        decision:
          "Constrain colour generation to validated families, then calculate and correct contrast in code.",
        impact:
          "Generated pages meet the 4.5:1 WCAG AA text contrast requirement without relying on prompt compliance.",
      },
      {
        constraint:
          "Shopify theme writes can return a successful response while silently dropping an app block.",
        decision:
          "Read every critical write back from Shopify before marking the step complete.",
        impact:
          "The pipeline treats persistence, not a 200 response, as the definition of success.",
      },
      {
        constraint:
          "Marketplace titles were keyword-stuffed and regularly pushed classification toward the wrong niche.",
        decision:
          "Add a title-normalisation stage and benchmark models against deliberately ambiguous products.",
        impact:
          "The classification decision uses both title and description, giving every downstream layout and copy step a stronger starting signal.",
      },
    ],
    outcomes: [
      "A full product-page generation flow across seven niche-specific theme systems.",
      "A billing-aware publish gate that preserves completed work when a plan limit is reached.",
      "Verified theme installation and app-block writes despite Shopify's eventual consistency.",
      "An architecture ready to add more marketplaces and niches through the same normalisation layer.",
    ],
    stack: [
      "GPT-4",
      "Gemini",
      "Shopify API",
      "Shopify Functions",
      "React",
      "Node.js",
      "MongoDB",
      "AWS S3",
    ],
    reflection:
      "The useful lesson was not which model performed best. It was that AI systems become dependable when subjective decisions are bounded and every objective claim is verified by code.",
  },
  {
    slug: "cryptozilla-mobile-wallet",
    title: "Cryptozilla: secure self-custody in a mobile interface",
    shortTitle: "Cryptozilla",
    client: "Cryptozilla",
    industry: "Mobile fintech",
    role: "React Native and security engineer",
    summary:
      "I worked on a non-custodial wallet where device security, key management, and a fluid consumer interface had to coexist across more than 50 React Native screens.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/d08f74f7730022088a918625ba2198c7a2eeff50-1600x900.heif",
    featuredImageAlt:
      "Cryptozilla mobile wallet interface with portfolio and self-custody features.",
    highlights: [
      { value: "50+", label: "mobile screens shipped" },
      { value: "90%+", label: "seed backup completion" },
      { value: "2", label: "production app stores" },
    ],
    context: [
      "A self-custody wallet has no support-led recovery path for a compromised seed phrase. Security requirements therefore shape the product architecture, not just the authentication screen.",
      "The application combined BIP-39 and BIP-44 key derivation, encrypted local storage, biometric access, certificate-pinned network calls, real-time prices, interactive portfolio charts, and an in-app token swap.",
    ],
    contribution: [
      "I worked across the React Native application, secure key lifecycle, native platform behaviour, and the interaction problems created by screenshot protection.",
      "The hardest part was not implementing each requirement independently. It was resolving cases where a security control changed the rendering or gesture behaviour of otherwise stable UI code.",
    ],
    decisions: [
      {
        constraint:
          "Applying Android FLAG_SECURE to the root window caused Reanimated chart gestures to stutter on Samsung and Xiaomi devices.",
        decision:
          "Move secure-window activation into a native module and enable it only on screens that display sensitive information.",
        impact:
          "Sensitive screens remain protected while animation-heavy portfolio views keep their expected interaction performance.",
      },
      {
        constraint:
          "iOS has no direct equivalent to Android's screenshot-blocking API, and the secure text overlay interfered with repeated chart gestures.",
        decision:
          "Prioritise protection on sensitive screens and replace the drag scrubber there with a simpler tap interaction.",
        impact:
          "The security boundary remains clear without pretending the platform can provide behaviour it does not support safely.",
      },
      {
        constraint:
          "A technically correct seed backup flow can still fail if people skip or misunderstand it.",
        decision:
          "Use a three-stage reveal, record, and ordered-word verification flow before unlocking the wallet.",
        impact:
          "More than 90% of users who started seed backup completed it.",
      },
      {
        constraint:
          "Private keys and seed material could not remain available in plaintext between sessions.",
        decision:
          "Use hardware-backed biometric access to unlock an AES-256 encrypted local keystore and derive individual keys only when needed.",
        impact:
          "Key material stays device-bound, encrypted at rest, and absent from remote infrastructure.",
      },
    ],
    outcomes: [
      "Production releases for both iOS and Android.",
      "Self-custody support for BTC, ETH, and ERC-20 assets.",
      "Real-time portfolio updates, interactive performance views, and token-swap confirmation with slippage visibility.",
      "A documented security and interaction model tested across OEM-specific Android behaviour.",
    ],
    stack: [
      "React Native",
      "TypeScript",
      "BIP-39",
      "BIP-44",
      "bitcoinjs-lib",
      "ethers.js",
      "Redux Toolkit",
      "Reanimated",
      "Detox",
    ],
    reflection:
      "Cryptozilla reinforced a practical rule: a security control is not finished until it has been tested against the interactions people need to complete.",
  },
  {
    slug: "bsi-incident-reporting-platform",
    title: "BSI MIP: engineering a legally auditable incident workflow",
    shortTitle: "BSI MIP",
    client: "German Federal Office for Information Security (BSI)",
    industry: "Government cybersecurity",
    role: "Full-stack and platform engineer",
    summary:
      "I contributed to a regulated reporting platform where identity, deadlines, encryption, and every workflow transition carried a security or legal consequence.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/d954b8ea89f0efe39a307f438701a28aba5f7e75-1920x1080.jpg",
    featuredImageAlt:
      "German Federal Office for Information Security incident reporting platform.",
    highlights: [
      { value: "7", label: "auditable workflow states" },
      { value: "12", label: "controlled transitions" },
      { value: "24h", label: "initial reporting window" },
    ],
    context: [
      "Germany's NIS2 reporting workflow requires regulated organisations to submit an initial notification within 24 hours, followed by detailed updates and closure. The platform needed to preserve the exact sequence and timing of every action.",
      "It also had to support authenticated organisations and anonymous voluntary reporters without allowing one trust model to weaken the other.",
    ],
    contribution: [
      "I worked on the platform architecture and implementation around workflow integrity, identity, encrypted payload handling, and operational edge cases.",
      "The engineering standard was shaped by federal infrastructure, formal penetration testing, and the requirement that audit evidence remain tamper-evident.",
    ],
    decisions: [
      {
        constraint:
          "Updating a mutable status field would lose the legal history of how and when an incident changed state.",
        decision:
          "Represent every transition as an append-only event and derive the current state by replaying the event sequence.",
        impact:
          "The platform retains a complete record of submissions, analyst actions, reasons, identities, and timestamps.",
      },
      {
        constraint:
          "A two-minute clock error around a 24-hour deadline could change the compliance status of a submission.",
        decision:
          "Use monitored server time for audit events and alert on infrastructure clock drift beyond the accepted threshold.",
        impact:
          "Deadline evidence is consistent, centralised, and defensible during later review.",
      },
      {
        constraint:
          "Anonymous reports had to remain unlinkable while still entering the national threat-intelligence workflow.",
        decision:
          "Separate the anonymous endpoint and data path from authenticated sessions, account stores, and application-level source logging.",
        impact:
          "Voluntary reports can contribute useful indicators without inheriting the identity model of mandatory reporting.",
      },
      {
        constraint:
          "Incident payloads could expose active vulnerabilities and mitigation details if infrastructure were compromised.",
        decision:
          "Encrypt payloads before submission and keep private-key operations inside controlled federal key-management infrastructure.",
        impact:
          "Stored and transmitted report data remains protected beyond the outer TLS connection.",
      },
    ],
    outcomes: [
      "A structured incident lifecycle covering initial notification, detailed reporting, progress updates, and closure.",
      "Organisation identity and delegated reporting through Keycloak-backed access controls.",
      "A technically isolated anonymous reporting path.",
      "A platform designed and remediated against formal penetration-test findings before launch.",
    ],
    stack: [
      "Angular",
      "TypeScript",
      "Java Spring Boot",
      "Keycloak",
      "PostgreSQL",
      "Kubernetes",
      "Redis",
      "Splunk",
      "AES-256",
    ],
    reflection:
      "This work made one principle concrete: in regulated systems, compliance cannot be a checklist around the product. It has to be encoded in the state model, identity boundaries, timestamps, and failure behaviour.",
  },
]

export function getWorkBySlug(slug) {
  return WORK.find((study) => study.slug === slug)
}

export const FEATURED_CASE_STUDIES = {
  hero: {
    ...WORK[0],
    id: WORK[0].slug,
    href: `/work/${WORK[0].slug}`,
    excerpt: WORK[0].summary,
  },
  more: WORK.slice(1).map((study) => ({
    ...study,
    id: study.slug,
    href: `/work/${study.slug}`,
    excerpt: study.summary,
  })),
}
