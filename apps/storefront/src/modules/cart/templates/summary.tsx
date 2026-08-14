"use client"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-5">
      {/* Title */}
      <h2
        className="font-bold text-lg"
        style={{ color: "#1a1a2e" }}
      >
        Order Summary
      </h2>

      <DiscountCode cart={cart} />

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, rgba(95,72,198,0.2), transparent)",
        }}
      />

      <CartTotals totals={cart} />

      {/* Checkout CTA */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <button
          className="w-full py-4 rounded-xl font-semibold text-sm text-white tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #5f48c6, #8833cf)",
            boxShadow: "0 6px 24px rgba(95,72,198,0.35)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.transform = "translateY(-2px)"
            el.style.boxShadow = "0 10px 32px rgba(95,72,198,0.45)"
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.transform = "translateY(0)"
            el.style.boxShadow = "0 6px 24px rgba(95,72,198,0.35)"
          }}
        >
          <span>Go to Checkout</span>
          <span style={{ color: "#fa6a19" }}>→</span>
        </button>
      </LocalizedClientLink>

      {/* Security note */}
      <p className="text-center text-xs" style={{ color: "#6b6b8d" }}>
        🔒 Secure checkout powered by Medusa
      </p>
    </div>
  )
}

export default Summary
