"use client"

import { useActionState, useState } from "react"
import Input from "@modules/common/components/input"
import NativeSelect from "@modules/common/components/native-select"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [isProfessional, setIsProfessional] = useState(false)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">
        {isProfessional ? "Register as a Professional Partner" : "Become a Store Member"}
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {isProfessional 
          ? "Apply for partner benefits, trade discounts, and referral rewards." 
          : "Create your Customer profile and get access to an enhanced shopping experience."
        }
      </p>

      {/* Account Type Selector Tabs */}
      <div className="flex w-full mb-6 border border-ui-border-base rounded-rounded p-1 bg-ui-bg-subtle">
        <button
          type="button"
          onClick={() => setIsProfessional(false)}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-sm transition-all ${
            !isProfessional ? "bg-white shadow text-black" : "text-ui-fg-subtle"
          }`}
        >
          Customer Account
        </button>
        <button
          type="button"
          onClick={() => setIsProfessional(true)}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-sm transition-all ${
            isProfessional ? "bg-white shadow text-black" : "text-ui-fg-subtle"
          }`}
        >
          Professional Partner
        </button>
      </div>

      {message?.state === "verification_required" && (
        <div
          className="w-full mb-4 text-center text-base-regular text-ui-fg-base bg-ui-bg-subtle border border-ui-border-base rounded-rounded p-4"
          data-testid="register-verification-message"
        >
          We sent a verification link to <strong>{message.email}</strong>.
          Please check your inbox to verify your email, then sign in.
        </div>
      )}
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <div className="flex gap-x-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />

          {isProfessional && (
            <div className="flex flex-col gap-y-2 mt-2 pt-2 border-t border-ui-border-base">
              <NativeSelect
                name="profession"
                required
                data-testid="profession-select"
              >
                <option value="Electrician">Electrician</option>
                <option value="Delivery Agent">Delivery Agent</option>
              </NativeSelect>
            </div>
          )}

          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage
          error={message?.state === "error" ? message.error : null}
          data-testid="register-error"
        />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          By creating an account, you agree to the store&apos;s{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          {isProfessional ? "Submit Application" : "Join"}
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
