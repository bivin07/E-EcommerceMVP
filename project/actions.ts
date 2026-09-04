"use server"

import { updateCustomer } from "@lib/data/customer"
import { revalidateTag } from "next/cache"
import { HttpTypes } from "@medusajs/types"

export async function addElectricianClient(
  currentState: Record<string, unknown>,
  formData: FormData
) {
  try {
    const rawCustomerMetadata = formData.get("current_metadata")?.toString()
    const metadata = rawCustomerMetadata ? JSON.parse(rawCustomerMetadata) : {}
    const clients = Array.isArray(metadata.clients) ? metadata.clients : []

    const newClient = {
      id: Math.random().toString(36).substring(7),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address_1: formData.get("address_1"),
      city: formData.get("city"),
      postal_code: formData.get("postal_code"),
      country_code: formData.get("country_code"),
    }

    clients.push(newClient)

    await updateCustomer({
      metadata: {
        ...metadata,
        clients,
      },
    })

    revalidateTag("customer")

    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function deleteElectricianClient(
  clientId: string,
  currentMetadata: Record<string, unknown>
) {
  try {
    const clients = Array.isArray(currentMetadata.clients) ? currentMetadata.clients : []
    const updatedClients = clients.filter((c: any) => c.id !== clientId)

    await updateCustomer({
      metadata: {
        ...currentMetadata,
        clients: updatedClients,
      },
    })

    revalidateTag("customer")
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
