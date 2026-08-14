"use client"

import { useSearchParams } from "next/navigation"

export default function CheckoutProgress() {
  const searchParams = useSearchParams()
  const step = searchParams.get("step") || "address"

  let progress = 25
  if (step === "delivery") progress = 50
  if (step === "payment") progress = 75
  if (step === "review") progress = 100

  return (
    <div className="w-full bg-gray-100 h-1 relative overflow-hidden">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #5f48c6, #8833cf, #fa6a19)",
        }}
      />
    </div>
  )
}
