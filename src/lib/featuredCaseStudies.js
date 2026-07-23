const CASE_STUDY_BASE_URL = "https://aifantry.com/case-studies"

const studies = [
  {
    id: "building-ai-shopify-app-krafted",
    slug: "building-ai-shopify-app-krafted",
    title: "Krafted - Building an AI Product Page Generator for Shopify",
    industry: "E-commerce",
    client: "Krafted",
    excerpt:
      "We built Krafted to automate the post-import phase for Shopify merchants: one URL in, complete product page live in their store. Here's how we approached it and what broke.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/19116776369d13bbaab00a71d90a703c9f2ebb79-2222x1240.png",
    featuredImageAlt: "Krafted AI product page generator",
  },
  {
    id: "cryptozilla-non-custodial-crypto-wallet-react-native",
    slug: "cryptozilla-non-custodial-crypto-wallet-react-native",
    title: "How We Built Cryptozilla: A Non-Custodial Crypto Wallet App in React Native",
    industry: "Web3 & Fintech",
    client: "Cryptozilla",
    excerpt:
      "FLAG_SECURE set app-wide broke React Native Reanimated on Samsung and Xiaomi OEM builds. We moved to per-screen native module activation, hit the iOS screenshot prevention wall, and shipped the app with a 90%+ seed phrase backup completion rate. Here's the full build.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/d08f74f7730022088a918625ba2198c7a2eeff50-1600x900.heif",
    featuredImageAlt: "Cryptozilla crypto wallet",
  },
  {
    id: "bsi-mip-cybersecurity-incident-reporting-platform",
    slug: "bsi-mip-cybersecurity-incident-reporting-platform",
    title: "Building BSI's MIP: Germany's National Cybersecurity Incident Reporting Portal",
    industry: "Government & Cybersecurity",
    client: "Bundesamt für Sicherheit in der Informationstechnik (BSI)",
    excerpt:
      "Every workflow state change is a legal event under NIS2 Article 23. We built the append-only compliance state machine, Keycloak ELSTER identity integration, and HSM-backed encrypted payloads for Germany's national incident reporting portal.",
    featuredImageUrl:
      "https://cdn.sanity.io/images/10hjydtp/production/d954b8ea89f0efe39a307f438701a28aba5f7e75-1920x1080.jpg",
    featuredImageAlt: "German BSI cybersecurity portal",
  },
]

const linkedStudies = studies.map((study) => ({
  ...study,
  href: `${CASE_STUDY_BASE_URL}/${study.slug}`,
}))

export const FEATURED_CASE_STUDIES = {
  hero: linkedStudies[0],
  more: linkedStudies.slice(1),
}
