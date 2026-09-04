import { createWorkflow, createStep, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { REFERRAL_MODULE } from "../modules/referral"

type ApplyReferralInput = {
  customerId: string
  code: string
}

const applyReferralGroupStep = createStep(
  "apply-referral-group-step",
  async ({ customerId, code }: ApplyReferralInput, { container }) => {
    const query = container.resolve("query")
    const customerGroupService = container.resolve(Modules.CUSTOMER)

    // 1. Verify the code exists and is active
    const { data: [referralCode] } = await query.graph({
      entity: "referral_code",
      fields: ["id", "code", "is_active"],
      filters: { code, is_active: true }
    })

    if (!referralCode) {
      throw new Error("Invalid or inactive referral code.")
    }

    // 2. Find the "Referred by Electrician" group
    const { data: [referredGroup] } = await query.graph({
      entity: "customer_group",
      fields: ["id", "name"],
      filters: { name: "Referred by Electrician" }
    })

    let referredGroupId = referredGroup?.id

    if (!referredGroupId) {
      // Auto-create the group so the admin doesn't have to manually ensure it exists
      const customerModuleService = container.resolve(Modules.CUSTOMER)
      const newGroup = await customerModuleService.createCustomerGroups({
        name: "Referred by Electrician"
      })
      referredGroupId = newGroup.id
    }

    // 3. Check if the customer is already in this group
    const { data: [customer] } = await query.graph({
      entity: "customer",
      fields: ["id", "groups.id"],
      filters: { id: customerId }
    })

    if (!customer) {
      throw new Error("Customer not found.")
    }

    const alreadyInGroup = customer.groups?.some((g: any) => g.id === referredGroupId)
    if (alreadyInGroup) {
      return new StepResponse({ success: true, message: "Code already applied." }, null)
    }

    // 4. Add the customer to the group
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    await customerModuleService.addCustomerToGroup({
      customer_id: customerId,
      customer_group_id: referredGroupId
    })

    return new StepResponse({ success: true, message: "Referral code applied." }, { customerId, groupId: referredGroupId })
  },
  async (revertData, { container }) => {
    if (!revertData) return
    const { customerId, groupId } = revertData
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    await customerModuleService.removeCustomerFromGroup({
      customer_id: customerId,
      customer_group_id: groupId
    })
  }
)

export const applyReferralCodeWorkflow = createWorkflow(
  "apply-referral-code",
  (input: ApplyReferralInput) => {
    const result = applyReferralGroupStep(input)
    return new WorkflowResponse(result)
  }
)
