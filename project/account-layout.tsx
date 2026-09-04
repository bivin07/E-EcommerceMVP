import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ customer, children }) => {
  return (
    <div
      className="flex-1 small:py-12"
      data-testid="account-page"
      style={{
        background: "radial-gradient(ellipse at 80% 20%, rgba(95,72,198,0.07) 0%, transparent 60%), #F8F7FF",
      }}
    >
      <div
        className="flex-1 content-container h-full max-w-5xl mx-auto rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: "white",
          boxShadow: "0 8px 48px rgba(95,72,198,0.1), 0 2px 16px rgba(0,0,0,0.04)",
          border: "1px solid rgba(95,72,198,0.1)",
        }}
      >
        {/* Account page header */}
        <div
          className="px-8 py-6 flex items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #5f48c6, #8833cf)",
          }}
        >
          {/* Avatar ring */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(250,106,25,0.7)",
            }}
          >
            {customer?.first_name?.[0] ?? "U"}
          </div>
          <div>
            <p className="text-white font-semibold text-base leading-none">
              {customer?.first_name
                ? `${customer.first_name} ${customer.last_name ?? ""}`
                : "My Account"}
            </p>
            <p className="text-purple-200 text-xs mt-1">{customer?.email ?? ""}</p>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 small:grid-cols-[220px_1fr] flex-1">
          {/* Sidebar */}
          {customer && (
            <div
              className="py-8 relative z-10 border-b small:border-b-0 small:border-r border-[rgba(95,72,198,0.1)]"
              style={{
                background: "rgba(248,247,255,0.6)",
              }}
            >
              <AccountNav customer={customer} />
            </div>
          )}

          {/* Main content */}
          <div className="p-8 flex-1 relative z-0">{children}</div>
        </div>

        {/* Footer section */}
        <div
          className="flex flex-col small:flex-row items-end justify-between py-8 px-8 gap-6"
          style={{ borderTop: "1px solid rgba(95,72,198,0.1)" }}
        >
          <div>
            <h3
              className="font-semibold mb-1"
              style={{ color: "#1a1a2e", fontSize: "1rem" }}
            >
              Got questions?
            </h3>
            <span className="text-sm" style={{ color: "#6b6b8d" }}>
              Find answers on our customer service page.
            </span>
          </div>
          <div>
            <UnderlineLink href="/customer-service">Customer Service</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
