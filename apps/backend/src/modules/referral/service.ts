import { MedusaService } from "@medusajs/framework/utils"
import { ReferralCode } from "./models/referral-code"

class ReferralModuleService extends MedusaService({
  ReferralCode,
}) {}

export default ReferralModuleService
