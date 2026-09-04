import { SubscriberConfig, SubscriberArgs } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  const orderId = data.id
  const query = container.resolve("query")
  const remoteLink = container.resolve("remoteLink")

  // Fetch the order and its customer
  const { data: [order] } = await query.graph({
    entity: "order",
    fields: ["id", "customer_id", "customer.groups.id", "customer.groups.name"],
    filters: { id: orderId }
  })

  if (!order?.customer || !order.customer_id) return

  // Find if they are in the "Referred by Electrician" group
  const referredGroup = order.customer.groups?.find((g: any) => g.name === "Referred by Electrician")

  if (referredGroup) {
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    await customerModuleService.removeCustomerFromGroup({
      customer_id: order.customer_id as string,
      customer_group_id: referredGroup.id
    })
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
