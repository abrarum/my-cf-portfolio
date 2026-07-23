import localFont from "next/font/local"
import "./globals.css"

const nord = localFont({
  src: "./fonts/Nord-Bold.woff",
  weight: "700",
  variable: "--font-nord",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://heyabrar.com"),
  title: {
    default: "Abrar Ahmed | AI and Full-stack Engineer",
    template: "%s",
  },
  description:
    "Portfolio of Abrar Ahmed, an AI and full-stack engineer focused on production systems and thoughtful technical decisions.",
  applicationName: "Abrar Ahmed Portfolio",
  authors: [{ name: "Abrar Ahmed", url: "https://heyabrar.com" }],
  creator: "Abrar Ahmed",
  publisher: "Abrar Ahmed",
  openGraph: {
    siteName: "Abrar Ahmed",
    url: "https://heyabrar.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nord.variable}>
      <body>{children}</body>
    </html>
  )
}
