import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import CheckoutProgress from "@modules/checkout/components/checkout-progress"
import { Suspense } from "react"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      {/* Checkout nav bar */}
      <div
        className="h-16"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(95,72,198,0.1)",
          boxShadow: "0 1px 16px rgba(95,72,198,0.06)",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)" }}
        />

        <nav className="flex h-full items-center content-container justify-between">
          {/* Back link */}
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 flex-1 basis-0 text-sm font-medium transition-colors duration-200"
            style={{ color: "#5f48c6" }}
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block hover:text-[#fa6a19] transition-colors duration-200">
              Back to cart
            </span>
            <span className="mt-px block small:hidden hover:text-[#fa6a19] transition-colors duration-200">
              Back
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="flex items-center gap-1.5 select-none group"
            data-testid="store-link"
          >
            <span style={{ color: "#fa6a19" }} className="text-lg transition-transform duration-200 group-hover:scale-110">☀️</span>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#1a1a2e" }}>
              Solar
            </span>
            <span className="font-bold text-lg tracking-tight" style={{ color: "#5f48c6" }}>
              Tech
            </span>
          </LocalizedClientLink>

          {/* Spacer */}
          <div className="flex-1 basis-0 flex justify-end">
            <span className="text-xs font-medium" style={{ color: "#6b6b8d" }}>
              Secure Checkout 🔒
            </span>
          </div>
        </nav>
      </div>

      {/* Progress indicator */}
      <Suspense fallback={
        <div className="h-1 w-full bg-gray-100 relative overflow-hidden">
          <div className="h-full w-1/4 bg-[#5f48c6]" />
        </div>
      }>
        <CheckoutProgress />
      </Suspense>

      {/* Page content */}
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>

      {/* Footer */}
      <div
        className="py-6 w-full flex items-center justify-center gap-2 text-xs"
        style={{ color: "#6b6b8d", borderTop: "1px solid rgba(95,72,198,0.08)" }}
      >
        <span>Built with</span>
        <span style={{ color: "#fa6a19" }}>⚡</span>
        <a
          href="https://medusajs.com"
          target="_blank"
          rel="noreferrer"
          className="font-medium hover:text-[#fa6a19] transition-colors duration-200"
          style={{ color: "#5f48c6" }}
        >
          Medusa
        </a>
      </div>
    </div>
  )
}
