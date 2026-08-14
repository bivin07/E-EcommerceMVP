import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const InfoBlock = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
    <div className="text-sm font-semibold text-gray-800 leading-relaxed">{children}</div>
  </div>
)

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const addr = order.shipping_address

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900">Delivery Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="shipping-address-summary">
        <InfoBlock label="Shipping Address">
          <p>{addr?.first_name} {addr?.last_name}</p>
          <p className="text-gray-500 font-normal">{addr?.address_1} {addr?.address_2}</p>
          <p className="text-gray-500 font-normal">{addr?.postal_code}, {addr?.city}</p>
          <p className="text-gray-500 font-normal">{addr?.country_code?.toUpperCase()}</p>
        </InfoBlock>

        <InfoBlock label="Contact">
          <p data-testid="shipping-contact-summary">{addr?.phone || "—"}</p>
          <p className="text-gray-500 font-normal">{order.email}</p>
        </InfoBlock>

        <InfoBlock label="Delivery Method">
          <p>Solar Tech Agent</p>
          <p className="text-gray-500 font-normal text-xs mt-0.5">
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
          </p>
        </InfoBlock>
      </div>


    </div>
  )
}

export default ShippingDetails
