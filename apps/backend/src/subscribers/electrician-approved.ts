import { SubscriberConfig, SubscriberArgs } from "@medusajs/framework"
import { createElectricianReferralWorkflow } from "../workflows/create-electrician-referral"

export default async function electricianApprovedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  const customerId = data.id
  const query = container.resolve("query")

  // Fetch customer and check their groups and existing referral code
  const { data: [customer] } = await query.graph({
    entity: "customer",
    fields: ["id", "first_name", "groups.name", "referral_code.id"],
    filters: { id: customerId }
  })

  if (!customer) return

  // Check if they are in the Electricians group
  const isElectrician = customer.groups?.some(group => group?.name === "Electricians")

  // Only generate if they are an Electrician and DO NOT already have a code
  const hasCode = Array.isArray(customer.referral_code) ? customer.referral_code.length > 0 : !!customer.referral_code;

  if (isElectrician && !hasCode) {
    // Run the workflow to generate their unique code
    await createElectricianReferralWorkflow(container).run({
      input: { customer }
    })
  }
}

export const config: SubscriberConfig = {
  event: ["customer.updated", "customer.created"],
}
