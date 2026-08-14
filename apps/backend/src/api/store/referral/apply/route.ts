import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { applyReferralCodeWorkflow } from "../../../../workflows/apply-referral-code"

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const { code } = req.body as { code: string }
  
  // Store APIs require an authenticated customer to use customer groups
  const customerId = req.auth_context?.actor_id

  if (!customerId) {
    res.status(401).json({ success: false, message: "You must be logged in to use a referral code." })
    return
  }

  if (!code) {
    res.status(400).json({ success: false, message: "Code is required." })
    return
  }

  try {
    const { result } = await applyReferralCodeWorkflow(req.scope).run({
      input: {
        customerId,
        code
      }
    })

    res.status(200).json(result)
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message })
  }
}
