import localFont from "next/font/local"
import "./globals.css"

const nord = localFont({
  src: "./fonts/Nord-Bold.woff",
  weight: "700",
  variable: "--font-nord",
  display: "swap",
})

export const metadata = {
  title: "Abrar Ahmed | AI Engineer",
  description:
    "Work directly with Abrar Ahmed, a hands-on AI engineer delivering production AI systems for businesses.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={nord.variable}>
      <body>{children}</body>
    </html>
  )
}
