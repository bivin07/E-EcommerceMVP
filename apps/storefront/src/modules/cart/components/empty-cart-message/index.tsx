import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-32 px-4 flex flex-col justify-center items-center text-center rounded-2xl max-w-2xl mx-auto my-12"
      style={{
        background: "white",
        border: "1px solid rgba(95,72,198,0.1)",
        boxShadow: "0 8px 32px rgba(95,72,198,0.05)",
      }}
      data-testid="empty-cart-message"
    >
      {/* Premium illustration / icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{
          background: "linear-gradient(135deg, rgba(95,72,198,0.1), rgba(136,51,207,0.05))",
          border: "1.5px dashed rgba(95,72,198,0.3)",
        }}
      >
        <span style={{ fontSize: "2.5rem" }}>🛒</span>
      </div>

      <h1
        style={{
          fontFamily: "Cormorant Garamond, serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          color: "#1a1a2e",
          lineHeight: 1.2,
        }}
      >
        Your cart is empty
      </h1>

      <p
        className="text-sm mt-3 mb-8 max-w-md"
        style={{ color: "#6b6b8d", lineHeight: 1.6 }}
      >
        You don&apos;t have any items in your shopping bag. Explore our premium selection of professional solar systems and start building your order.
      </p>

      <LocalizedExploreButton />
    </div>
  )
}

const LocalizedExploreButton = () => {
  return (
    <LocalizedClientLink
      href="/store"
      className="px-8 py-3.5 rounded-full font-semibold text-sm text-white tracking-wide transition-all duration-300 flex items-center gap-2 w-fit"
      style={{
        background: "linear-gradient(135deg, #5f48c6, #8833cf)",
        boxShadow: "0 4px 18px rgba(95,72,198,0.35)",
      }}
    >
      <span>Explore Products</span>
      <span style={{ color: "#fa6a19" }}>-&gt;</span>
    </LocalizedClientLink>
  )
}

export default EmptyCartMessage
