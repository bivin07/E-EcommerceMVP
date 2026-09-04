import { cookies as nextCookies } from "next/headers"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="content-container max-w-6xl w-full flex flex-col gap-y-6">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        
        {/* Split grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Success card and details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Success Card */}
            <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
              {/* Checkmark icon wrapper */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse"
                  style={{
                    background: "linear-gradient(135deg, rgba(95,72,198,0.12), rgba(136,51,207,0.08))",
                    border: "1px solid rgba(95,72,198,0.2)",
                  }}
                >
                  <span style={{ color: "#5f48c6", fontSize: "1.5rem" }}>✓</span>
                </div>
                <div>
                  <h1
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                      color: "#1a1a2e",
                      lineHeight: 1.1,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Thank you
                    <span style={{ color: "#fa6a19" }}>!</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5">Your order has been placed successfully.</p>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-6" />

              <OrderDetails order={order} />

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <LocalizedClientLink href="/store">
                  <button
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                    }}
                  >
                    Continue Shopping
                  </button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Delivery & Payment details card */}
            <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)] flex flex-col gap-6">
              <ShippingDetails order={order} />
              <div className="h-px bg-gray-100" />
              <PaymentDetails order={order} />
            </div>

            {/* Help Block */}
            <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
              <Help />
            </div>
          </div>

          {/* Right Column: Order items and totals summary */}
          <div className="lg:col-span-1 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-6 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
              <h2
                className="text-lg font-bold mb-4 pb-3 border-b border-gray-100"
                style={{ color: "#1a1a2e" }}
              >
                Order Summary
              </h2>
              <div className="max-h-[350px] overflow-y-auto pr-1">
                <Items order={order} />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <CartTotals totals={order} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
