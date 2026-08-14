import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export default async function testUpdateOrder({ container }: { container: any }) {
  const orderModuleService = container.resolve("order")
  
  try {
    const orders = await orderModuleService.listOrders({}, { take: 1 })
    if (orders.length === 0) return console.log("No orders")
    
    const orderId = orders[0].id
    console.log("Updating order:", orderId)
    
    await orderModuleService.updateOrders(orderId, {
      metadata: { delivery_status: "picked_up" }
    })
    
    const updated = await orderModuleService.listOrders({ id: orderId })
    console.log("Updated metadata:", updated[0].metadata)
  } catch (error) {
    console.error("Update Error:", error)
  }
}
