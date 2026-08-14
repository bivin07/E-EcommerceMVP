import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="min-h-[60vh]">
      {/* Cart page header */}
      <div
        className="w-full py-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(95,72,198,0.06) 0%, rgba(136,51,207,0.03) 100%)",
          borderBottom: "1px solid rgba(95,72,198,0.1)",
        }}
      >
        <div className="content-container">
          <div className="flex items-end gap-4">
            <h1
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                color: "#1a1a2e",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Your Car
              <span style={{ color: "#fa6a19" }}>t</span>
            </h1>
            <div
              className="flex-1 h-0.5 mb-3 hidden small:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(95,72,198,0.3), transparent)",
              }}
            />
          </div>
          {cart?.items?.length ? (
            <p className="text-sm mt-2" style={{ color: "#6b6b8d" }}>
              {cart.items.reduce((acc, item) => acc + item.quantity, 0)} item
              {cart.items.reduce((acc, item) => acc + item.quantity, 0) !== 1
                ? "s"
                : ""}{" "}
              in your cart
            </p>
          ) : null}
        </div>
      </div>

      {/* Cart content */}
      <div className="py-10 content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_380px] gap-x-12 gap-y-8">
            {/* Items column */}
            <div className="flex flex-col gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <div
                    className="h-px w-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(95,72,198,0.2), transparent)",
                    }}
                  />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>

            {/* Summary column */}
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-20">
                {cart && cart.region && (
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "white",
                      border: "1px solid rgba(95,72,198,0.1)",
                      boxShadow: "0 4px 24px rgba(95,72,198,0.08)",
                    }}
                  >
                    {/* Top accent */}
                    <div
                      className="h-0.5 w-full rounded-full mb-5"
                      style={{
                        background:
                          "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)",
                      }}
                    />
                    <Summary cart={cart} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  )
}

export default CartTemplate
