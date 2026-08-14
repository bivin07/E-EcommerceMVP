import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import ClientBook from "@modules/account/components/client-book"

export const metadata: Metadata = {
  title: "My Clients",
  description: "Manage your clients",
}

export default async function Clients(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  const customerWithGroups = customer as typeof customer & {
    groups?: { id: string; name: string }[]
  }

  const isElectrician = customerWithGroups.groups?.some(
    (g) => g.name.toLowerCase() === "electrician" || g.name.toLowerCase() === "electricians"
  )

  if (!isElectrician) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="clients-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">My Clients</h1>
        <p className="text-base-regular">
          Manage your clients here. You can quickly select these clients during checkout when ordering on their behalf. Their email and shipping address will be automatically applied to the order.
        </p>
      </div>
      <ClientBook customer={customer} region={region} />
    </div>
  )
}
