"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="content-container max-w-4xl w-full flex flex-col gap-y-6">
        
        {/* Header with back button */}
        <div className="flex gap-2 justify-between items-center pb-4 border-b border-gray-200">
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
            Order Details
          </h1>
          <LocalizedClientLink
            href="/account/orders"
            className="flex gap-2 items-center text-sm font-semibold transition-colors duration-200"
            style={{ color: "#5f48c6" }}
            data-testid="back-to-overview-button"
          >
            <span className="hover-orange-underline flex items-center gap-1.5">
              <XMark className="w-4 h-4" /> Back to overview
            </span>
          </LocalizedClientLink>
        </div>

        {/* Meta details */}
        <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
          <OrderDetails order={order} showStatus />
        </div>

        {/* Delivery/Shipping details */}
        <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
          <ShippingDetails order={order} />
        </div>

        {/* Summary & Items — full width below */}
        <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
          <h2 className="text-lg font-bold mb-4 pb-3 border-b border-gray-100" style={{ color: "#1a1a2e" }}>
            Order Summary
          </h2>
          <Items order={order} />
          <div className="mt-6 pt-6 border-t border-gray-100">
            <OrderSummary order={order} />
          </div>
        </div>

        {/* Help Block */}
        <div className="bg-white rounded-2xl border border-[rgba(95,72,198,0.1)] p-8 shadow-[0_4px_20px_rgba(95,72,198,0.03)]">
          <Help />
        </div>

      </div>
    </div>
  )
}

export default OrderDetailsTemplate
