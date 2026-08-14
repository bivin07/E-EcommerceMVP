import { Metadata } from "next"
import { notFound } from "next/navigation"

import { retrieveCustomer } from "@lib/data/customer"
import DeliveryPortal from "@modules/account/components/delivery-portal"

export const metadata: Metadata = {
  title: "Delivery Portal",
  description: "Manage your assigned deliveries.",
}

export default async function Delivery() {
  const customer = await retrieveCustomer()

  if (!customer) {
    notFound()
  }

  const isDeliveryAgent = (customer as any)?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  if (!isDeliveryAgent) {
    notFound()
  }

  return (
    <div className="w-full h-full" data-testid="delivery-page-wrapper">
      <DeliveryPortal />
    </div>
  )
}
