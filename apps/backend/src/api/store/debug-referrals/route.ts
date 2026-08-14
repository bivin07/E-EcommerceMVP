import { MedusaRequest, MedusaResponse } from "@medusajs/framework"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve("query")

  const { data: customers } = await query.graph({
    entity: "customer",
    fields: ["id", "email", "first_name", "groups.name", "referral_code.code"],
  })

  res.json({ customers })
}
