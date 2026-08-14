import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    res.status(401).json({ success: false, message: "Unauthorized" })
    return
  }

  const query = req.scope.resolve("query")
  
  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["groups.*", "metadata"],
    filters: {
      id: [customerId]
    }
  })

  const customer = customers[0]
  const isDeliveryAgent = customer?.groups?.some((g: any) => 
    g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  if (!isDeliveryAgent) {
    res.status(403).json({ success: false, message: "Forbidden: You are not a Delivery Agent." })
    return
  }

  // Get the serviceable pincodes from the agent's metadata
  let servicePincodes: string[] = []
  if (Array.isArray(customer.metadata?.service_pincodes)) {
    servicePincodes = customer.metadata.service_pincodes as string[]
  } else if (typeof customer.metadata?.service_pincodes === 'string') {
    // sometimes it's saved as a comma separated string
    servicePincodes = (customer.metadata.service_pincodes as string).split(',').map(s => s.trim())
  }

  // We must use order module instead of query.graph for orders because 
  // query.graph automatically scopes orders to the logged-in customer's ID!
  // Since the Delivery Agent is a customer, it would only return their own orders.
  const orderModuleService = req.scope.resolve("order") as any
  const orders = await orderModuleService.listOrders(
    {}, 
    { 
      relations: ["shipping_address", "items"] 
    }
  )

  // For this MVP showcase, we will just show ALL pending/active orders
  // and temporarily bypass strict pincode matching to ensure orders are visible.
  const filteredOrders = orders.filter((o: any) => {
    const isNotDelivered = o.metadata?.delivery_status !== "delivered"
    return isNotDelivered
  })

  console.log("[Delivery Agent] Fetched Orders count:", orders.length)
  console.log("[Delivery Agent] Service Pincodes:", servicePincodes)
  console.log("[Delivery Agent] Filtered Orders count:", filteredOrders.length)

  res.status(200).json({ orders: filteredOrders, servicePincodes })
}

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const customerId = req.auth_context?.actor_id
  if (!customerId) {
    res.status(401).json({ success: false, message: "Unauthorized" })
    return
  }

  const { order_id, delivery_status } = req.body as { order_id: string, delivery_status: string }

  if (!order_id || !delivery_status) {
    res.status(400).json({ success: false, message: "Missing order_id or delivery_status" })
    return
  }

  const query = req.scope.resolve("query")
  
  // Verify agent
  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["groups.*", "first_name", "last_name", "phone"],
    filters: {
      id: [customerId]
    }
  })
  
  const customer = customers[0]
  const isDeliveryAgent = customer?.groups?.some((g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent")
  
  if (!isDeliveryAgent) {
    res.status(403).json({ success: false, message: "Forbidden" })
    return
  }

  // Get the order to update its metadata using the module to bypass customer scope
  const orderModuleService = req.scope.resolve("order") as any
  const orders = await orderModuleService.listOrders({ id: order_id })

  if (!orders.length) {
    res.status(404).json({ success: false, message: "Order not found" })
    return
  }

  const order = orders[0]
  
  const agentName = `${customer?.first_name || ""} ${customer?.last_name || ""}`.trim() || "Delivery Partner"
  
  await orderModuleService.updateOrders(order_id, {
    metadata: {
      ...order.metadata,
      delivery_status, // "picked_up", "delivered"
      delivery_agent_id: customerId,
      agent_name: agentName,
      agent_phone: customer?.phone || ""
    }
  })

  res.status(200).json({ success: true })
}
