import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
      limit: 5, // Premium layout limits to top 5 products for clean presentation
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  // Accent logic: split collection title to highlight last letter of the main word or the title
  const title = collection.title
  const baseTitle = title.slice(0, -1)
  const lastChar = title.slice(-1)

  return (
    <div
      className="w-full"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #F8F7FF 100%)",
        borderBottom: "1px solid rgba(95,72,198,0.06)",
      }}
    >
      <div className="content-container py-16 small:py-24">
        {/* Section header */}
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
              {baseTitle}
              <span style={{ color: "#fa6a19" }}>{lastChar}</span>
            </h2>
            <div
              className="flex-1 h-0.5 mb-2 hidden small:block"
              style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.3), transparent)" }}
            />
          </div>

          <LocalizedClientLink
            href={`/collections/${collection.handle}`}
            className="group flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
            style={{ color: "#5f48c6" }}
          >
            <span className="hover-orange-underline">View collection</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: "#fa6a19" }}>
              →
            </span>
          </LocalizedClientLink>
        </div>

        {/* Product grid */}
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-5 gap-4">
          {pricedProducts.map((product) => (
            <li key={product.id} className="animate-fade-up">
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
