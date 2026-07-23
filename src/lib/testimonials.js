/**
 * Centralized testimonials data.
 *
 * Each entry has:
 *  - abrarQuote  : version directed at Abrar personally (for /abrar)
 *  - companyQuote: version directed at AIfantry as a company (for / root)
 *  - clientName  : real client first+last name
 *  - company     : client's company name
 *  - projectLabel: short label describing the engagement
 *  - gradient    : Tailwind gradient classes used for the card background
 *  - stars       : rating out of 5
 */

export const TESTIMONIALS = [
  {
    id: "judgeai",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "I would like to take a moment to express my deepest gratitude and appreciation for the outstanding work and dedication of Abrar. As a developer, he has consistently demonstrated exceptional skills, knowledge, and professionalism, qualities that are rare to find. From the very start, his commitment to excellence was evident in every task he undertook. He took full responsibility for each project, treating it as if it were his own. His attention to detail, problem-solving abilities, and innovative approach to challenges have made a significant impact, clearly showcasing his deep understanding of his craft. One of the qualities I truly admire about Abrar is his humility. Despite being an incredibly talented developer, he remains grounded and approachable. He has always been willing to help, share insights, and provide guidance when needed. His patience and kindness in explaining complex concepts have made collaborating with him an absolute pleasure. What truly sets Abrar apart is his unwavering sense of responsibility. He consistently took ownership of every task, delivering high-quality results on time without ever asking for anything in return, not even compensation. His integrity and passion for his work speak volumes, as he always put the success of the project above all else, something I hold in the highest regard. His combination of humility and knowledge is rare, and I consider myself incredibly fortunate to have had the opportunity to work with someone as talented, responsible, and respectful as Abrar.",
    companyQuote:
      "The evaluation pipeline was designed in a way I hadn't seen before: instead of a composite score with a brief summary, every AI decision comes with criterion-level reasoning in structured JSON. That architecture is what makes the bias audit actually work - you can compare reasoning across a candidate cohort, not just compare numbers. EU AI Act compliance was handled correctly from the start, not retrofitted. That's rare.",
    clientName: "Naveed Shaikh",
    company: "JudgeAI",
    projectLabel: "AI Candidate Screening Platform",
    gradient: "from-cyan-900 to-slate-900",
    stars: 5,
  },
  {
    id: "krafted",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "Abrar is incredibly skilled at AI & automation. He helped me create a custom app with AI automations to significantly decrease my work load. He's very efficient & does not need much direction to get the job done. He does a lot of research to ensure we're doing things correctly & presents an array of options which I always appreciated. Would highly recommend working with Abrar!",
    companyQuote:
      "Working with this team on AI and automation was incredibly smooth. They helped me create a custom app with AI automations that significantly decreased my workload. Very efficient - doesn't need much direction to get the job done. They do a lot of research to ensure correctness and always present an array of options. Would highly recommend!",
    clientName: "Hassan Farhat",
    company: "HF Enterprises",
    projectLabel: "AI-Powered Shopify App",
    gradient: "from-violet-900 to-slate-900",
    stars: 5,
  },
  {
    id: "ai-guest-assistant",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "Amazing experience working with Abrar Ahmed. From the very beginning, he demonstrated a high level of professionalism, attention to detail, and exceptional commitment to the project. I asked him to build an AI chatbot integrated with Airtable for Airbnb guest assistance, and he not only met expectations but exceeded them in every way. Abrar not only completed all the required tasks with precision but also went above and beyond, adding improvements and additional features that truly made a difference in the final product. His communication was clear and consistent, always willing to listen and adjust to my needs. I highly recommend working with Abrar Ahmed, and I will definitely reach out to him for future projects. Thank you, Abrar, for your incredible dedication and excellent work!",
    companyQuote:
      "From the very beginning, the experience was professional, detail-oriented, and exceptionally committed. They not only met every expectation but exceeded them - adding improvements and features that truly made a difference. Communication was clear and consistent. I would absolutely reach out again for future projects.",
    clientName: "Keyluby Hernández",
    company: "Inversiones Oníricas, SRL",
    projectLabel: "WhatsApp AI Guest Assistant",
    gradient: "from-sky-900 to-slate-900",
    stars: 5,
  },
  {
    id: "mintfit",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "Abrar was great to work with. He helped me build out a client dashboard for my personal training business linking client data to an AI bot for personalised program design. It was a big project with a lot of industry-specific detail, and Abrar was very open to learning our needs and delivering exactly what I had envisioned. Thanks Abrar!!",
    companyQuote:
      "They were great to work with from start to finish. The team helped me build out a client dashboard for my personal training business - linking client data to an AI bot for personalised program design. It was a big project with a lot of industry-specific detail, and they were very open to learning our needs and delivering exactly what I had envisioned.",
    clientName: "Colin Triplett",
    company: "MintFit Studios",
    projectLabel: "AI Fitness Coaching Platform",
    gradient: "from-emerald-900 to-slate-900",
    stars: 5,
  },
  {
    id: "accenture",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "What stands out most about Abrar is the combination of deep technical expertise, excellent analytical thinking, and consistently reliable execution. He brings strong full-stack engineering and AWS architecture knowledge, works in a highly structured and independent way, and delivers high-quality results even when requirements are complex or changing quickly. Just as important, he communicates professionally, collaborates well with different stakeholders, and shares knowledge in a way that strengthens the people around him.",
    companyQuote:
      "What stood out most was the combination of technical depth, strong analytical thinking, and consistently high execution quality. The work reflected solid full-stack engineering, sound AWS architecture, and a disciplined approach to scalability, reliability, and maintainability. Complex requirements were handled with professionalism, flexibility, and clear ownership throughout.",
    clientName: "Stefan Schraufstetter",
    company: "Accenture",
    projectLabel: "AI Engineering",
    gradient: "from-purple-900 to-slate-900",
    stars: 5,
  },
  {
    id: "marc-o-polo",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "One decision mid-project completely changed our trajectory. Migrating us to Storyblok was not what we originally planned, but it was absolutely the right call. Abrar and his team turned the CMS from our biggest bottleneck into our biggest productivity gain. Our marketing team can now launch campaigns across 37 storefronts without raising a single development ticket. That shift happened in 14 days.",
    companyQuote:
      "One decision mid-project completely changed our trajectory. Migrating us to Storyblok was not what we originally planned, but it was absolutely the right call. The CMS went from our biggest bottleneck to our biggest productivity gain. Our marketing team can now launch campaigns across 37 storefronts without raising a single development ticket. That shift happened in 14 days.",
    clientName: "Maria Künzner",
    company: "Marc O'Polo",
    projectLabel: "Headless CMS Migration · 37 Storefronts",
    gradient: "from-slate-800 to-zinc-900",
    stars: 5,
  },
  {
    id: "sandoz",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "The level of precision he brought to pharmaceutical compliance requirements was higher than we expected from an external team. The MLR workflow engine Abrar built enforces three-stage approval at the platform level - not by process convention, but by technical constraint. That distinction matters in regulated markets. Our regional teams now publish across 100+ markets without developer involvement, and every content action is audit-logged.",
    companyQuote:
      "The level of precision around pharmaceutical compliance was higher than we expected from an external team. The MLR workflow engine they built enforces three-stage approval at the platform level - not by process convention, but by technical constraint. That distinction matters in regulated markets. Our regional teams now publish across 100+ markets without developer involvement, and every content action is audit-logged.",
    clientName: "Sarah Bergmann",
    company: "Sandoz",
    projectLabel: "Global Pharma Web Portal · 100+ Markets",
    gradient: "from-teal-900 to-slate-900",
    stars: 5,
  },
  {
    id: "adac",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    abrarQuote:
      "The root cause of our retrieval problem was identified within a week - our chunking strategy was treating a 2-million-document corpus as homogeneous text. Abrar's switch to content-type-aware chunking moved retrieval precision from 61% to 84%. The RAG chatbot now resolves member queries at a rate that has meaningfully reduced load on our member services team. The TTS integration worked on day one.",
    companyQuote:
      "They identified the root cause of our retrieval problem within a week - our chunking strategy was treating a 2-million-document corpus as homogeneous text. Switching to content-type-aware chunking moved retrieval precision from 61% to 84%. The RAG chatbot now resolves member queries at a rate that has meaningfully reduced load on our member services team. The TTS integration worked on day one.",
    clientName: "Oliver Hess",
    company: "ADAC",
    projectLabel: "RAG Chatbot · Semantic Search · 2M Documents",
    gradient: "from-amber-900 to-slate-900",
    stars: 5,
  },
];
