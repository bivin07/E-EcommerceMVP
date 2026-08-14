import ReferralModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const REFERRAL_MODULE = "referralModuleService"

export default Module(REFERRAL_MODULE, {
  service: ReferralModuleService,
})
