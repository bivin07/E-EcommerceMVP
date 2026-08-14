import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import { retrieveCustomer } from "@lib/data/customer"

export default async function Nav() {
  const [regions, locales, currentLocale, customer] = await Promise.all([
    listRegions().then((regions: StoreRegion[] | null) => regions),
    listLocales(),
    getLocale(),
    retrieveCustomer(),
  ])

  const isDeliveryAgent = customer?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      {/* Main nav — glass morphism with purple gradient border bottom */}
      <header
        className="relative h-18 mx-auto transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(95,72,198,0.12)",
          boxShadow: "0 2px 32px rgba(95,72,198,0.08)",
        }}
      >
        {/* Purple gradient accent line at the very top */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: "linear-gradient(135deg, #5f48c6 0%, #8833cf 50%, #fa6a19 100%)" }}
        />

        <nav className="content-container flex items-center justify-between w-full h-full py-3">
          {/* Left — Menu trigger & Brand Logo */}
          <div className="flex-1 basis-0 h-full flex items-center gap-4">
            <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} isDeliveryAgent={isDeliveryAgent} />
            
            <LocalizedClientLink
              href="/"
              className="group flex items-center select-none"
              data-testid="nav-store-link"
            >
              <img 
                src="https://solartechind.com/website/images/logo.png" 
                alt="Solar Tech Logo" 
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </LocalizedClientLink>
          </div>

          {/* Right — Account + Cart */}
          <div className="flex items-center gap-x-4 h-full flex-1 basis-0 justify-end">
            {/* Store link */}
            <div className="hidden small:flex items-center gap-x-5">
              {!isDeliveryAgent && (
                <LocalizedClientLink
                  href="/store"
                  className="text-sm font-medium text-[#3d3d6b] transition-colors duration-200 hover:text-[#fa6a19] relative group"
                  data-testid="nav-store-page-link"
                >
                  <span>Products</span>
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: "#fa6a19" }}
                  />
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                href="/account"
                className="text-sm font-medium text-[#3d3d6b] transition-colors duration-200 hover:text-[#fa6a19] relative group"
                data-testid="nav-account-link"
              >
                <span>Account</span>
                <span
                  className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full transition-all duration-300 group-hover:w-full"
                  style={{ background: "#fa6a19" }}
                />
              </LocalizedClientLink>
            </div>

            {/* Cart button */}
            {!isDeliveryAgent && (
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-full transition-all duration-200"
                    href="/cart"
                    data-testid="nav-cart-link"
                    style={{ background: "linear-gradient(135deg, #5f48c6, #8833cf)" }}
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            )}
          </div>
        </nav>
      </header>
    </div>
  )
}
