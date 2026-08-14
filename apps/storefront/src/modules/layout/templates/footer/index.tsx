import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { retrieveCustomer } from "@lib/data/customer"

export default async function Footer() {
  const [customer, { collections }, productCategories] = await Promise.all([
    retrieveCustomer(),
    listCollections({ fields: "*products" }),
    listCategories(),
  ])

  const isDeliveryAgent = customer?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a1930 0%, #061020 100%)",
        color: "white",
      }}
    >
      {/* Blue/Orange gradient top accent */}
      <div
        className="h-1 w-full"
        style={{ background: "linear-gradient(90deg, #0b4c9f, #1565c0, #fa6a19)" }}
      />

      <div className="content-container py-16">
        {/* Top section */}
        <div className="flex flex-col gap-y-10 xsmall:flex-row items-start justify-between">

          {/* Brand column */}
          <div className="flex flex-col gap-4 max-w-xs">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <LocalizedClientLink href="/">
                <img 
                  src="https://solartechind.com/website/images/logo.png" 
                  alt="Solar Tech Logo" 
                  className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                />
              </LocalizedClientLink>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#8ba3b8" }}>
              Power your home or business in Kerala with smart, reliable solar energy that’s simple, sustainable, and future-ready.
            </p>
            {/* Trust badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold w-fit"
              style={{
                background: "rgba(11,76,159,0.2)",
                border: "1px solid rgba(11,76,159,0.35)",
                color: "#60a5fa",
              }}
            >
              <span style={{ color: "#faad14" }}>☀️</span>
              1,000+ Installations in Kerala
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-16 gap-y-8 text-sm">
            {/* Categories */}
            {!isDeliveryAgent && productCategories && productCategories.length > 0 && (
              <div className="flex flex-col gap-3">
                <p
                  className="font-semibold uppercase tracking-widest text-xs"
                  style={{ color: "#60a5fa" }}
                >
                  Categories
                </p>
                <ul
                  className="flex flex-col gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories.slice(0, 6).map((c) => {
                    if (c.parent_category) return null
                    return (
                      <li key={c.id}>
                        <LocalizedClientLink
                          href={`/categories/${c.handle}`}
                          className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {!isDeliveryAgent && collections && collections.length > 0 && (
              <div className="flex flex-col gap-3">
                <p
                  className="font-semibold uppercase tracking-widest text-xs"
                  style={{ color: "#60a5fa" }}
                >
                  Collections
                </p>
                <ul className="flex flex-col gap-2">
                  {collections.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        href={`/collections/${c.handle}`}
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Company / Portal */}
            <div className="flex flex-col gap-3">
              <p
                className="font-semibold uppercase tracking-widest text-xs"
                style={{ color: "#60a5fa" }}
              >
                {isDeliveryAgent ? "Portal" : "Company"}
              </p>
              <ul className="flex flex-col gap-2">
                {isDeliveryAgent ? (
                  <>
                    <li>
                      <LocalizedClientLink
                        href="/account/delivery"
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        Delivery Portal
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        href="/account"
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        My Account
                      </LocalizedClientLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <LocalizedClientLink
                        href="/store"
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        All Products
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        href="/account"
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        My Account
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        href="/cart"
                        className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                      >
                        Cart
                      </LocalizedClientLink>
                    </li>
                  </>
                )}
                <li>
                  <a
                    href="https://docs.medusajs.com"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors duration-200 text-[#8ba3b8] hover:text-[#faad14]"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col xsmall:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(11,76,159,0.3)" }}
        >
          <p className="text-xs" style={{ color: "#8ba3b8" }}>
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#60a5fa" }}>Solar Tech</span>. All rights
            reserved.
          </p>

          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: "#8ba3b8" }}>
              Built with
            </span>
            <span style={{ color: "#faad14", marginLeft: "4px", marginRight: "4px" }}>☀️</span>
            <a
              href="https://medusajs.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium transition-colors duration-200 hover:text-[#faad14]"
              style={{ color: "#8ba3b8" }}
            >
              Medusa
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
