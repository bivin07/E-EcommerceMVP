"use server"

import { revalidatePath, revalidateTag } from "next/cache"

import { getAuthHeaders, getCacheTag } from "@lib/data/cookies"
import { sdk } from "@lib/config"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export async function fetchDeliveryOrders() {
  try {
    const headers = await getAuthHeaders()
    // Use the official SDK client to correctly inject the publishable key and auth headers
    const data: any = await sdk.client.fetch(`/store/delivery-orders`, {
      method: "GET",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    })
    
    console.log("[Delivery Portal] Successfully fetched orders:", data.orders?.length)
    return { success: true, orders: data.orders, servicePincodes: data.servicePincodes }
  } catch (error) {
    console.log("[Delivery Portal] Network or parsing error:", error)
    return { success: false, orders: [] }
  }
}

export async function updateDeliveryStatus(orderId: string, status: string) {
  try {
    const headers = await getAuthHeaders()
    const data = await sdk.client.fetch(`/store/delivery-orders`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: { order_id: orderId, delivery_status: status }
    })

    revalidatePath("/account/delivery")
    
    const orderCacheTag = await getCacheTag("orders")
    if (orderCacheTag) {
      revalidateTag(orderCacheTag)
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}
