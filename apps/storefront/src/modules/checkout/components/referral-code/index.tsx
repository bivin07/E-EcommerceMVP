"use client"

import React, { useActionState, useEffect } from "react"
import { Text, Input, Heading } from "@medusajs/ui"
import { applyElectricianReferralCode } from "@lib/data/referral"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"

export default function ElectricianReferralCode() {
  const [state, formAction] = useActionState(applyElectricianReferralCode, {
    success: false,
    error: undefined,
    message: undefined,
  })

  useEffect(() => {
    if (state.success) {
      // Reload or show toast if needed, cart cache is already invalidated
      console.log("Success:", state.message)
    }
  }, [state])

  return (
    <div className="flex flex-col bg-white p-6 mt-4 gap-y-4">
      <Heading level="h2" className="text-xl">
        Electrician Referral Code
      </Heading>
      <Text className="text-ui-fg-subtle txt-small">
        Have a referral code from an approved electrician? Enter it here to get special trade pricing.
      </Text>
      
      <form action={formAction} className="w-full">
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-2">
            <Input
              name="code"
              placeholder="e.g. ELEC-JOHN-123"
              className="flex-1"
              required
            />
            <SubmitButton variant="secondary">Apply</SubmitButton>
          </div>
          
          <ErrorMessage error={state.error} />
          {state.success && (
            <Text className="text-emerald-600 txt-small">
              {state.message}
            </Text>
          )}
        </div>
      </form>
    </div>
  )
}
