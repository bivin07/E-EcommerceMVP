import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export default async function testModuleQuery({ container }: { container: any }) {
  const orderModuleService = container.resolve("orderModuleService")
  
  try {
    console.log("Fetching orders from module...")
    const orders = await orderModuleService.listOrders(
      {}, 
      { 
        relations: ["shipping_address", "items"] 
      }
    )
    console.log("Orders count from module:", orders.length)
  } catch (error) {
    console.error("Module Query Error:", error)
  }
}
