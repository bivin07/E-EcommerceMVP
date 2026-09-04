import { defineLink } from "@medusajs/framework/utils"
import CustomerModule from "@medusajs/medusa/customer"
import ReferralModule from "../modules/referral"

export default defineLink(
  CustomerModule.linkable.customer,
  {
    linkable: ReferralModule.linkable.referralCode,
    isList: false, // One customer (electrician) has one referral code
  }
)

