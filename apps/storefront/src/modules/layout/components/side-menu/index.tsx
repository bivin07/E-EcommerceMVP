"use client"

import { Popover, PopoverPanel, Transition, Portal } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  isDeliveryAgent?: boolean
}

const SideMenu = ({ regions, locales, currentLocale, isDeliveryAgent }: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const SideMenuItems = {
    ...(isDeliveryAgent ? {} : { Home: "/" }),
    ...(isDeliveryAgent ? {} : { Store: "/store" }),
    Account: "/account",
    ...(isDeliveryAgent ? {} : { Cart: "/cart" }),
  }

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full items-center">
                {/* Hamburger / Menu trigger */}
                <Popover.Button
                  data-testid="nav-menu-button"
                  className={clx(
                    "group relative flex flex-col justify-center gap-[5px] w-8 h-8 rounded-lg transition-all duration-200 focus:outline-none",
                    open ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                  aria-label="Open menu"
                >
                  <span
                    className="block h-0.5 w-6 rounded-full transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf)" }}
                  />
                  <span
                    className="block h-0.5 w-4 rounded-full transition-all duration-300 group-hover:w-6"
                    style={{ background: "#fa6a19" }}
                  />
                  <span
                    className="block h-0.5 w-6 rounded-full transition-all duration-300"
                    style={{ background: "linear-gradient(90deg, #5f48c6, #8833cf)" }}
                  />
                </Popover.Button>
              </div>

              {/* Portal the overlay panel and backdrop outside the sticky header containing block */}
              <Portal>
                {/* Backdrop */}
                {open && (
                  <div
                    className="fixed inset-0 z-[9998] bg-[#1a1a2e]/40 backdrop-blur-sm pointer-events-auto"
                    onClick={close}
                    data-testid="side-menu-backdrop"
                  />
                )}

                {/* Slide-out panel */}
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-300"
                  enterFrom="opacity-0 -translate-x-full"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 -translate-x-full"
                >
                  <PopoverPanel className="fixed inset-y-0 left-0 z-[9999] w-[320px] sm:w-[380px] flex flex-col">
                    <div
                      data-testid="nav-menu-popup"
                      className="flex flex-col h-full overflow-y-auto no-scrollbar"
                      style={{ background: "white" }}
                    >
                      {/* Panel header with purple gradient */}
                      <div
                        className="flex items-center justify-between px-8 py-6"
                        style={{
                          background: "linear-gradient(135deg, #5f48c6 0%, #8833cf 100%)",
                        }}
                      >
                        {/* Brand inside sidebar */}
                        <div className="flex items-center gap-3">
                          <div className="bg-white p-1.5 rounded-lg shadow-sm">
                            <img src="https://solartechind.com/website/images/logo.png" alt="Solar Tech Logo" className="h-6 object-contain" />
                          </div>
                          <div>
                            <p className="text-white font-bold text-lg leading-none tracking-tight">
                              Solar<span style={{ color: "#fa6a19" }}> Tech</span>
                            </p>
                            <p className="text-purple-200 text-xs mt-0.5">Solar Installation Company</p>
                          </div>
                        </div>

                        {/* Close button */}
                        <button
                          data-testid="close-menu-button"
                          onClick={close}
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                          aria-label="Close menu"
                        >
                          <XMark />
                        </button>
                      </div>

                      {/* Purple accent stripe */}
                      <div
                        className="h-1 w-full"
                        style={{ background: "linear-gradient(90deg, #fa6a19, #5f48c6, #8833cf)" }}
                      />

                      {/* Nav items */}
                      <nav className="flex-1 px-8 py-8">
                        <p className="text-xs font-semibold text-[#6b6b8d] uppercase tracking-widest mb-6">
                          Navigation
                        </p>
                        <ul className="flex flex-col gap-1">
                          {Object.entries(SideMenuItems).map(([name, href]) => (
                            <li key={name}>
                              <LocalizedClientLink
                                href={href}
                                className="group flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#1a1a2e] font-medium text-lg transition-all duration-200 hover:bg-[#F8F7FF]"
                                onClick={close}
                                data-testid={`${name.toLowerCase()}-link`}
                              >
                                {/* Left accent dot */}
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100"
                                  style={{ background: "#fa6a19" }}
                                />
                                <span className="transition-colors duration-200 group-hover:text-[#5f48c6]">
                                  {name}
                                </span>
                                {/* Arrow */}
                                <span className="ml-auto text-[#6b6b8d] opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                                  →
                                </span>
                              </LocalizedClientLink>
                            </li>
                          ))}
                        </ul>


                      </nav>

                      {/* Footer section */}
                      <div
                        className="px-8 py-6 border-t"
                        style={{ borderColor: "rgba(95,72,198,0.1)" }}
                      >
                        {/* Language select */}
                        {!!locales?.length && (
                          <div
                            className="flex justify-between items-center mb-4 py-2"
                            onMouseEnter={languageToggleState.open}
                            onMouseLeave={languageToggleState.close}
                          >
                            <LanguageSelect
                              toggleState={languageToggleState}
                              locales={locales}
                              currentLocale={currentLocale}
                            />
                          </div>
                        )}

                        {/* Country select */}
                        <div
                          className="flex justify-between items-center mb-4 py-2"
                          onMouseEnter={countryToggleState.open}
                          onMouseLeave={countryToggleState.close}
                        >
                          {regions && (
                            <CountrySelect
                              toggleState={countryToggleState}
                              regions={regions}
                            />
                          )}
                        </div>

                        <p className="text-xs text-[#6b6b8d] mt-4">
                          © {new Date().getFullYear()} Solar Tech. All rights reserved.
                        </p>
                      </div>
                    </div>
                  </PopoverPanel>
                </Transition>
              </Portal>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
