import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <div
        className="w-full py-12"
        style={{
          background: "linear-gradient(135deg, rgba(95,72,198,0.06) 0%, rgba(136,51,207,0.04) 100%)",
          borderBottom: "1px solid rgba(95,72,198,0.1)",
        }}
      >
        <div className="content-container">
          {/* Breadcrumb */}
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "#6b6b8d" }}>
            <span style={{ color: "#5f48c6" }}>Home</span>
            {" / "}
            <span>Store</span>
          </p>
          <div className="flex items-end gap-4">
            <h1
              data-testid="store-page-title"
              className="leading-none"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "#1a1a2e",
                letterSpacing: "-0.02em",
              }}
            >
              All Product
              <span style={{ color: "#fa6a19" }}>s</span>
            </h1>
            {/* Accent line */}
            <div
              className="flex-1 h-0.5 mb-3 hidden small:block"
              style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.4), transparent)" }}
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: "#6b6b8d" }}>
            Professional solar panels, inverters, and clean energy solutions — all in one place.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div
        className="flex flex-col small:flex-row small:items-start py-8 content-container gap-8"
        data-testid="category-container"
      >
        {/* Sidebar / Refinement */}
        <div
          className="small:w-64 small:flex-shrink-0 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(95,72,198,0.1)",
            boxShadow: "0 2px 16px rgba(95,72,198,0.06)",
          }}
        >
          {/* Sidebar header */}
          <div
            className="px-5 py-4"
            style={{
              background: "linear-gradient(135deg, #5f48c6 0%, #8833cf 100%)",
            }}
          >
            <p className="text-white font-semibold text-sm uppercase tracking-wider">
              Filter & Sort
            </p>
          </div>
          <div className="bg-white">
            <RefinementList sortBy={sort} />
          </div>
        </div>

        {/* Product grid */}
        <div className="w-full">
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate
