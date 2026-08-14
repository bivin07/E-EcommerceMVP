"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(undefined)
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) clearTimeout(activeTimer)
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) clearTimeout(activeTimer)
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div className="h-full z-50" onMouseEnter={openAndCancel} onMouseLeave={close}>
      <Popover className="relative h-full">
        <PopoverButton className="h-full focus:outline-none">
          <LocalizedClientLink
            href="/cart"
            data-testid="nav-cart-link"
            className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm text-white transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #5f48c6, #8833cf)",
              boxShadow: "0 3px 14px rgba(95,72,198,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>Cart</span>
            {totalItems > 0 && (
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={{ background: "#fa6a19", color: "white" }}
              >
                {totalItems}
              </span>
            )}
          </LocalizedClientLink>
        </PopoverButton>

        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+12px)] right-0 w-[400px] rounded-2xl overflow-hidden"
            data-testid="nav-cart-dropdown"
            style={{
              background: "white",
              boxShadow: "0 24px 80px rgba(95,72,198,0.18), 0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(95,72,198,0.1)",
            }}
          >
            {/* Dropdown header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg, #5f48c6, #8833cf)",
              }}
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <h3 className="font-semibold text-white text-sm">Your Cart</h3>
              </div>
              {totalItems > 0 && (
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#fa6a19", color: "white" }}
                >
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {cartState && cartState.items?.length ? (
              <>
                {/* Items list */}
                <div className="overflow-y-scroll max-h-[320px] px-4 py-3 grid grid-cols-1 gap-y-4 no-scrollbar">
                  {cartState.items
                    .sort((a, b) =>
                      (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    )
                    .map((item) => (
                      <div
                        className="grid grid-cols-[80px_1fr] gap-x-3 py-2 rounded-xl transition-colors duration-150"
                        key={item.id}
                        data-testid="cart-item"
                        style={{ background: "rgba(248,247,255,0)" }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLDivElement).style.background = "rgba(248,247,255,1)"
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLDivElement).style.background = "rgba(248,247,255,0)"
                        }}
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-20 rounded-lg overflow-hidden"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail || item.variant?.product?.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <h3
                                className="text-sm font-medium truncate"
                                style={{ color: "#1a1a2e" }}
                              >
                                <LocalizedClientLink
                                  href={`/products/${item.product_handle}`}
                                  data-testid="product-link"
                                >
                                  {item.title}
                                </LocalizedClientLink>
                              </h3>
                              <LineItemOptions
                                variant={item.variant}
                                data-testid="cart-item-variant"
                                data-value={item.variant}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "#6b6b8d" }}
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                Qty: {item.quantity}
                              </span>
                            </div>
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            <span className="text-xs text-[#6b6b8d] hover:text-[#fa6a19] transition-colors duration-150">
                              Remove
                            </span>
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Subtotal + CTA */}
                <div
                  className="px-4 pb-4 pt-3 flex flex-col gap-3"
                  style={{ borderTop: "1px solid rgba(95,72,198,0.1)" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: "#6b6b8d" }}>
                      Subtotal{" "}
                      <span className="text-xs">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-base font-bold"
                      style={{ color: "#5f48c6" }}
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <button
                      className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                        boxShadow: "0 4px 16px rgba(95,72,198,0.35)",
                      }}
                      data-testid="go-to-cart-button"
                    >
                      Go to Cart →
                    </button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="flex py-14 flex-col gap-4 items-center justify-center px-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(95,72,198,0.1), rgba(136,51,207,0.08))",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#5f48c6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
                    Your cart is empty
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6b6b8d" }}>
                    Add some solar products to get started
                  </p>
                </div>
                <LocalizedClientLink href="/store">
                  <button
                    onClick={close}
                    className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #5f48c6, #8833cf)" }}
                  >
                    Explore Products
                  </button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
