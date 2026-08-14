"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"

const AccountNav = ({
  customer,
}: {
  customer: (HttpTypes.StoreCustomer & { groups?: any[] }) | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  const isElectrician = customer?.groups?.some(
    (g: any) => g.name.toLowerCase() === "electrician" || g.name.toLowerCase() === "electricians"
  )

  const isDeliveryAgent = customer?.groups?.some(
    (g: any) => g.name.toLowerCase() === "delivery agents" || g.name.toLowerCase() === "delivery agent"
  )

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="mb-6 px-8 flex flex-col gap-2">
              <div className="text-xl-semi">
                Hello {customer?.first_name}
              </div>
              {isDeliveryAgent && (
                <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fa6a19]/10 text-[#fa6a19] border border-[#fa6a19]/20 w-fit uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fa6a19]"></span>
                  Delivery Agent
                </span>
              )}
            </div>
            <div className="text-base-regular">
              <ul>
                {!isDeliveryAgent && (
                  <>
                    <li>
                      <LocalizedClientLink
                        href="/account/profile"
                        className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                        data-testid="profile-link"
                      >
                        <>
                          <div className="flex items-center gap-x-2">
                            <User size={20} />
                            <span>Profile</span>
                          </div>
                          <ChevronDown className="transform -rotate-90" />
                        </>
                      </LocalizedClientLink>
                    </li>
                    <li>
                      <LocalizedClientLink
                        href="/account/addresses"
                        className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                        data-testid="addresses-link"
                      >
                        <>
                          <div className="flex items-center gap-x-2">
                            <MapPin size={20} />
                            <span>Addresses</span>
                          </div>
                          <ChevronDown className="transform -rotate-90" />
                        </>
                      </LocalizedClientLink>
                    </li>
                    {isElectrician && (
                      <li>
                        <LocalizedClientLink
                          href="/account/clients"
                          className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                          data-testid="clients-link"
                        >
                          <>
                            <div className="flex items-center gap-x-2">
                              <User size={20} />
                              <span>My Clients</span>
                            </div>
                            <ChevronDown className="transform -rotate-90" />
                          </>
                        </LocalizedClientLink>
                      </li>
                    )}
                  </>
                )}
                {isDeliveryAgent && (
                  <li>
                    <LocalizedClientLink
                      href="/account/delivery"
                      className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                      data-testid="delivery-portal-link"
                    >
                      <>
                        <div className="flex items-center gap-x-2">
                          <Package size={20} />
                          <span>Delivery Portal</span>
                        </div>
                        <ChevronDown className="transform -rotate-90" />
                      </>
                    </LocalizedClientLink>
                  </li>
                )}
                {!isDeliveryAgent && (
                  <li>
                    <LocalizedClientLink
                      href="/account/orders"
                      className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                      data-testid="orders-link"
                    >
                      <div className="flex items-center gap-x-2">
                        <Package size={20} />
                        <span>Orders</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </LocalizedClientLink>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div className="px-5">
          {/* Profile Card Header */}
          <div className="mb-6 pb-6 border-b border-gray-200 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5f48c6]/10 flex items-center justify-center text-[#5f48c6] font-bold text-sm">
                {customer?.first_name?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">
                  {customer?.first_name} {customer?.last_name}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 truncate max-w-[150px]">{customer?.email}</p>
              </div>
            </div>
            {isDeliveryAgent && (
              <span className="inline-flex items-center gap-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fa6a19]/10 text-[#fa6a19] border border-[#fa6a19]/20 w-fit uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fa6a19]"></span>
                Delivery Agent
              </span>
            )}
          </div>

          <p className="text-xs font-semibold text-[#6b6b8d] uppercase tracking-widest mb-5">
            My Account
          </p>
          <ul className="flex flex-col gap-1">
            {!isDeliveryAgent && (
              <>
                <li>
                  <AccountNavLink href="/account" route={route!} data-testid="overview-link">
                    Overview
                  </AccountNavLink>
                </li>
                <li>
                  <AccountNavLink href="/account/profile" route={route!} data-testid="profile-link">
                    Profile
                  </AccountNavLink>
                </li>
                <li>
                  <AccountNavLink href="/account/addresses" route={route!} data-testid="addresses-link">
                    Addresses
                  </AccountNavLink>
                </li>
                {isElectrician && (
                  <li>
                    <AccountNavLink href="/account/clients" route={route!} data-testid="clients-link">
                      My Clients
                    </AccountNavLink>
                  </li>
                )}
              </>
            )}
            {isDeliveryAgent && (
              <li>
                <AccountNavLink href="/account/delivery" route={route!} data-testid="delivery-portal-link">
                  Delivery Portal
                </AccountNavLink>
              </li>
            )}
            {!isDeliveryAgent && (
              <li>
                <AccountNavLink href="/account/orders" route={route!} data-testid="orders-link">
                  Orders
                </AccountNavLink>
              </li>
            )}
          </ul>

          {/* Divider */}
          <div
            className="my-4 h-px"
            style={{ background: "linear-gradient(90deg, rgba(95,72,198,0.2), transparent)" }}
          />

          <button
            type="button"
            onClick={handleLogout}
            data-testid="logout-button"
            className="flex items-center gap-2 px-4 py-2.5 w-full rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "#6b6b8d" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.color = "#fa6a19"
              el.style.background = "rgba(250,106,25,0.06)"
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.color = "#6b6b8d"
              el.style.background = "transparent"
            }}
          >
            <ArrowRightOnRectangle />
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full"
      style={{
        background: active
          ? "linear-gradient(135deg, rgba(95,72,198,0.12), rgba(136,51,207,0.08))"
          : "transparent",
        color: active ? "#5f48c6" : "#3d3d6b",
        borderLeft: active ? "3px solid #5f48c6" : "3px solid transparent",
        fontWeight: active ? "600" : "400",
      }}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
