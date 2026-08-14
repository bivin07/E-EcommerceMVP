import { Heading } from "@modules/common/components/ui"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col text-sm">
          <li>
            <a
              href="mailto:support@solartechind.com"
              className="text-[#8b8bab] transition-colors duration-200 hover:text-[#fa6a19]"
            >
              Contact Support
            </a>
          </li>
          <li>
            <a
              href="mailto:support@solartechind.com?subject=Returns%20and%20Exchanges"
              className="text-[#8b8bab] transition-colors duration-200 hover:text-[#fa6a19]"
            >
              Returns & Exchanges
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
