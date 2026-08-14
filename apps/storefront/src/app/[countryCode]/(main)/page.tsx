import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { retrieveCustomer } from "@lib/data/customer"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Solar Tech — Premium Solar Panels & Solutions",
  description:
    "Professional grade solar panels, inverters, batteries, and clean energy components for engineers and home owners.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const customer = await retrieveCustomer().catch(() => null)
  const isDeliveryAgent = customer?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  if (isDeliveryAgent) {
    redirect("/account/delivery")
  }

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  // Fetch general products (limit 5 for a clean 5-column layout of even smaller cards)
  const { response: { products } } = await listProducts({
    regionId: region?.id,
    queryParams: {
      limit: 5,
      fields: "*variants.calculated_price",
    },
  })

  if (!region) {
    return null
  }

  const hasCollections = collections && collections.length > 0

  return (
    <>
      <Hero />
      <div id="collections-list" className="w-full bg-white">
        {hasCollections ? (
          <ul className="flex flex-col">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        ) : (
          /* General products fallback if no collections are configured in the store */
          <div className="content-container py-16 small:py-24">
            <div className="flex items-end justify-between mb-12 gap-4">
              <div className="flex items-end gap-4 flex-1">
                <h2
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#1a1a2e",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Featured Product
                  <span style={{ color: "#fa6a19" }}>s</span>
                </h2>
                <div
                  className="flex-1 h-0.5 mb-2 hidden small:block"
                  style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.3), transparent)" }}
                />
              </div>

              <LocalizedClientLink
                href="/store"
                className="group flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                style={{ color: "#5f48c6" }}
              >
                <span className="hover-orange-underline">View all products</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#fa6a19" }}>
                  →
                </span>
              </LocalizedClientLink>
            </div>

            <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-5 gap-4">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <li key={product.id} className="animate-fade-up">
                    <ProductPreview product={product} region={region} isFeatured />
                  </li>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-sm" style={{ color: "#6b6b8d" }}>
                    No products found in this region. Add products in the Medusa Admin panel.
                  </p>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
