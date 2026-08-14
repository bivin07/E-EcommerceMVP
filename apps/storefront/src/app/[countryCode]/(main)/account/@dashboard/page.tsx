import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { redirect, notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    notFound()
  }

  const isDeliveryAgent = (customer as any)?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  if (isDeliveryAgent) {
    // Redirect delivery agents directly to their portal since they don't need a normal overview
    redirect("/account/delivery")
  }

  const orders = (await listOrders().catch(() => null)) || null

  return <Overview customer={customer} orders={orders} />
}
