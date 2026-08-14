import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import ElectricianReferralCode from "@modules/checkout/components/referral-code"
import CartTotals from "@modules/common/components/cart-totals"
import { HttpTypes } from "@medusajs/types"

import { retrieveCustomer } from "@lib/data/customer"

const CheckoutSummary = async ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const customer = await retrieveCustomer()
  const customerWithGroups = customer as typeof customer & { groups?: any[] }
  const isElectrician = customerWithGroups?.groups?.some(
    (g: any) =>
      g.name.toLowerCase() === "electrician" ||
      g.name.toLowerCase() === "electricians"
  )
  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0">
      <div
        className="w-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "white",
          border: "1px solid rgba(11,76,159,0.1)",
          boxShadow: "0 4px 24px rgba(11,76,159,0.08)",
        }}
      >
        {/* Summary header */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ background: "linear-gradient(135deg, #0b4c9f, #1565c0)" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <h2 className="font-semibold text-white text-sm">Order Summary</h2>
        </div>

        {/* Orange gradient line */}
        <div
          className="h-0.5 w-full"
          style={{ background: "linear-gradient(90deg, #fa8c16, #fa6a19)" }}
        />

        {/* Content */}
        <div className="p-6">
          <CartTotals totals={cart} />

          {/* Divider */}
          <div
            className="h-px w-full my-5"
            style={{ background: "linear-gradient(90deg, rgba(11,76,159,0.2), transparent)" }}
          />

          <ItemsPreviewTemplate cart={cart} />

          <div className="mt-6 flex flex-col gap-3">
            <DiscountCode cart={cart} />
            {!isElectrician && <ElectricianReferralCode />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
