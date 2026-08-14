  import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
      <div
        data-testid="product-wrapper"
        className="relative rounded-xl overflow-hidden bg-white border border-[rgba(95,72,198,0.1)] shadow-[0_2px_12px_rgba(95,72,198,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_36px_rgba(95,72,198,0.12),0_2px_8px_rgba(0,0,0,0.04)] hover:border-[rgba(95,72,198,0.2)]"
      >
        {/* Purple gradient top accent line — shows on hover via CSS */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)" }}
        />

        {/* Featured / New badge */}
        {isFeatured && (
          <div className="absolute top-2 left-2 z-20">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
              style={{
                background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                color: "white",
                boxShadow: "0 2px 6px rgba(95,72,198,0.3)",
              }}
            >
              Featured
            </span>
          </div>
        )}

        {/* Thumbnail */}
        <div className="overflow-hidden bg-white border-b border-gray-100">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="square"
            isFeatured={isFeatured}
          />
        </div>

        {/* Card body */}
        <div className="p-3">
          {/* Product title */}
          <h3
            className="font-semibold text-xs leading-normal mb-0.5 line-clamp-2 transition-colors duration-200 group-hover:text-[#5f48c6] h-8"
            style={{ color: "#1a1a2e" }}
            data-testid="product-title"
          >
            {product.title}
          </h3>

          {/* Price row */}
          <div className="flex items-center justify-between mt-1">
            <div
              className="text-xs font-bold"
              style={{
                background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>

            {/* Quick view arrow */}
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0"
              style={{
                background: "linear-gradient(135deg, #5f48c6, #8833cf)",
                color: "white",
                fontSize: "0.65rem",
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
