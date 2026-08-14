import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export default async function testModuleQuery({ container }: { container: any }) {
  const orderModuleService = container.resolve("order")
  
  try {
    console.log("Fetching orders from 'order' module...")
    const orders = await orderModuleService.listOrders(
      {}, 
      { 
        relations: ["shipping_address", "items"] 
      }
    )
    console.log("Orders count from 'order' module:", orders.length)
    if (orders.length > 0) {
      console.log(JSON.stringify(orders[0], null, 2))
    }
  } catch (error) {
    console.error("Module Query Error:", error)
  }
}
