import { createWorkflow, createStep, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { REFERRAL_MODULE } from "../modules/referral"
import ReferralModuleService from "../modules/referral/service"

const generateReferralCodeStep = createStep(
  "generate-referral-code-step",
  async ({ customer }: { customer: any }, { container }) => {
    const referralModuleService = container.resolve(REFERRAL_MODULE) as ReferralModuleService
    const remoteLink = container.resolve("remoteLink")
    
    // Generate a unique code
    const baseName = customer.first_name ? customer.first_name.toUpperCase() : "REF"
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const referralCode = `ELEC-${baseName}-${randomSuffix}`

    // Create the referral code record
    const referral = await referralModuleService.createReferralCodes({
      code: referralCode,
      is_active: true
    })

    // Link the Referral Code to the Customer
    await remoteLink.create({
      [Modules.CUSTOMER]: { customer_id: customer.id },
      [REFERRAL_MODULE]: { referral_code_id: referral.id }
    })

    return new StepResponse({ code: referralCode }, { referralId: referral.id, customerId: customer.id })
  },
  async (revertData, { container }) => {
    if (!revertData) return

    const { referralId, customerId } = revertData
    const referralModuleService = container.resolve(REFERRAL_MODULE) as ReferralModuleService
    const remoteLink = container.resolve("remoteLink")

    await remoteLink.dismiss({
      [Modules.CUSTOMER]: { customer_id: customerId },
      [REFERRAL_MODULE]: { referral_code_id: referralId }
    })
    await referralModuleService.deleteReferralCodes(referralId)
  }
)

export const createElectricianReferralWorkflow = createWorkflow(
  "create-electrician-referral",
  (input: { customer: any }) => {
    const stepResult = generateReferralCodeStep(input)
    return new WorkflowResponse(stepResult)
  }
)
