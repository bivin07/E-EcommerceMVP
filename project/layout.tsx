import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Solar Tech — Premium Solar Panels & Clean Energy Solutions",
    template: "%s | Solar Tech",
  },
  description:
    "Your one-stop shop for professional-grade solar systems, components, and clean energy tools in Kerala.",
  keywords: ["solar panels", "inverters", "solar systems", "renewable energy", "solar installations"],
  openGraph: {
    type: "website",
    siteName: "Solar Tech",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-[#1a1a2e] antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
