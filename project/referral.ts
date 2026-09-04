"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheTag, getCartId } from "./cookies"
import { revalidateTag } from "next/cache"

export async function applyElectricianReferralCode(
  currentState: Record<string, unknown>,
  formData: FormData
) {
  const code = formData.get("code") as string

  if (!code) {
    return { success: false, error: "Referral code is required." }
  }

  const authHeaders = await getAuthHeaders()

  if (!authHeaders || !authHeaders.authorization) {
    return { success: false, error: "You must be logged in to use an Electrician Referral Code." }
  }

  try {
    const response = await sdk.client.fetch(`/store/referral/apply`, {
      method: "POST",
      body: { code },
      headers: authHeaders,
    })

    // Force the cart to recalculate its prices now that the customer group has changed
    // Medusa locks line item prices when they are added. Updating their quantity to the same amount forces a refresh.
    const cartId = await getCartId()
    if (cartId) {
      // Fetch cart items using an existing helper or sdk
      const cartResp = await sdk.store.cart.retrieve(cartId, { fields: "*items" }, authHeaders)
      
      if (cartResp.cart && cartResp.cart.items) {
        for (const item of cartResp.cart.items) {
          await sdk.store.cart.updateLineItem(
            cartId,
            item.id,
            { quantity: item.quantity },
            {},
            authHeaders
          )
        }
      }
    }

    // Invalidate cart and customer cache so new prices appear
    const cartCacheTag = await getCacheTag("carts")
    revalidateTag(cartCacheTag)
    
    const customerCacheTag = await getCacheTag("customers")
    revalidateTag(customerCacheTag)

    return { success: true, message: "Electrician Referral Code applied successfully! Your cart has been updated with special pricing." }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to apply referral code. Please check if it is valid." }
  }
}
