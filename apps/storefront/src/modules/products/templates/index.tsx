import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Breadcrumb / page header */}
      <div
        className="w-full"
        style={{
          background: "linear-gradient(135deg, rgba(95,72,198,0.04) 0%, rgba(136,51,207,0.02) 100%)",
          borderBottom: "1px solid rgba(95,72,198,0.08)",
        }}
      >
        <div className="content-container py-4">
          <p className="text-xs font-medium" style={{ color: "#6b6b8d" }}>
            <span className="hover:text-[#5f48c6] cursor-pointer transition-colors duration-200">Home</span>
            {" / "}
            <span className="hover:text-[#5f48c6] cursor-pointer transition-colors duration-200">Store</span>
            {" / "}
            <span style={{ color: "#5f48c6" }}>{product.title}</span>
          </p>
        </div>
      </div>

      {/* Main product section */}
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-8 gap-x-8 relative"
        data-testid="product-container"
      >
        {/* Left — Product info (sticky) */}
        <div
          className="flex flex-col small:sticky small:top-20 small:py-0 small:max-w-[320px] w-full py-8 gap-y-6"
        >
          <ProductInfo product={product} />

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.25), transparent)" }}
          />

          <ProductTabs product={product} />
        </div>

        {/* Center — Image gallery */}
        <div className="block w-full relative flex-1">
          <ImageGallery images={images} />
        </div>

        {/* Right — Actions (sticky) */}
        <div
          className="flex flex-col small:sticky small:top-20 small:py-0 small:max-w-[320px] w-full py-8 gap-y-8"
        >
          <ProductOnboardingCta />

          {/* Actions card */}
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
              className="h-0.5 w-full rounded-full mb-6"
              style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)" }}
            />

            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "🔒", label: "Secure Checkout" },
              { icon: "🚚", label: "Fast Delivery" },
              { icon: "↩️", label: "Easy Returns" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                style={{
                  background: "rgba(95,72,198,0.04)",
                  border: "1px solid rgba(95,72,198,0.08)",
                }}
              >
                <span className="text-base">{icon}</span>
                <span className="text-xs font-medium" style={{ color: "#3d3d6b" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div
        className="w-full"
        style={{
          background: "linear-gradient(135deg, rgba(95,72,198,0.03) 0%, rgba(248,247,255,1) 100%)",
        }}
      >
        <div
          className="content-container my-0 py-16 small:py-24"
          data-testid="related-products-container"
        >
          {/* Section heading */}
          <div className="mb-8 flex items-end gap-4">
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
              Related Product
              <span style={{ color: "#fa6a19" }}>s</span>
            </h2>
            <div
              className="flex-1 h-0.5 mb-2 hidden small:block"
              style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.3), transparent)" }}
            />
          </div>

          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default ProductTemplate
