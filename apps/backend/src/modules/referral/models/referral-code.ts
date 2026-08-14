import { model } from "@medusajs/framework/utils"

export const ReferralCode = model.define("referral_code", {
  id: model.id().primaryKey(),
  code: model.text().unique(),
  is_active: model.boolean().default(true),
})

export default ReferralCode
