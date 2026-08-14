import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const stepLabels = ["Searching", "Assigned", "Out for Delivery", "Delivered"]
const stepKeys = ["pending", "assigned", "picked_up", "delivered"]

const DeliveryStatusTracker = ({ status, order }: { status: string, order: any }) => {
  const currentStepIdx = stepKeys.indexOf(status) >= 0 ? stepKeys.indexOf(status) : 0

  const getStatusMessage = () => {
    switch (status) {
      case "pending": return "Searching for a nearby delivery agent…"
      case "assigned": return "Agent assigned & heading to warehouse."
      case "picked_up": return "Your order is out for delivery!"
      case "delivered": return "Delivered. Thank you for your order!"
      default: return "Processing delivery details…"
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
      {/* Top colour bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#5f48c6] to-[#fa6a19]" />

      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
          Live Delivery Status
        </p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
          {getStatusMessage()}
        </p>

        {/* Progress stepper */}
        <div className="relative flex items-start justify-between">
          {/* Background line */}
          <div className="absolute top-[10px] left-0 right-0 h-1 bg-gray-200 mx-4 sm:mx-6" />
          {/* Active line */}
          <div
            className="absolute top-[10px] left-0 h-1 bg-[#5f48c6] mx-4 sm:mx-6 transition-all duration-700"
            style={{ width: `calc(${(currentStepIdx / (stepKeys.length - 1)) * 100}% - 2rem)` }}
          />

          {stepKeys.map((step, idx) => {
            const isActive = idx <= currentStepIdx
            const isCurrent = idx === currentStepIdx
            return (
              <div key={step} className="relative flex flex-col items-center gap-3 flex-1">
                <div
                  className={`w-5 h-5 rounded-full border-2 z-10 transition-all duration-500 ${isActive
                      ? isCurrent
                        ? "bg-[#5f48c6] border-[#5f48c6] ring-4 ring-[#5f48c6]/20 scale-110"
                        : "bg-[#5f48c6] border-[#5f48c6]"
                      : "bg-white border-gray-300"
                    }`}
                />
                <span
                  className={`text-[10px] sm:text-xs font-semibold text-center leading-tight ${isActive ? "text-[#5f48c6]" : "text-gray-400"
                    }`}
                >
                  {stepLabels[idx]}
                </span>
              </div>
            )
          })}
        </div>

        {/* Agent card — shown once assigned */}
        {(status === "assigned" || status === "picked_up") && (
          <div className="mt-8 flex items-center justify-between gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <svg className="w-9 h-9 text-gray-400 mt-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-gray-900 leading-tight">
                  {order.metadata?.agent_name as string || "Delivery Partner"}
                </p>
                <p className="text-sm text-gray-500">Your delivery agent</p>
              </div>
            </div>
            <a
              href={`tel:${order.metadata?.agent_phone || ""}`}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 flex items-center justify-center transition-colors"
              aria-label="Call delivery agent"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        )}

        {status === 'picked_up' && (
          <div className="relative w-full h-56 bg-[#f0f2f5] rounded-xl overflow-hidden border border-gray-200 shadow-inner mt-6">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute top-[20%] left-0 w-full h-8 bg-white/40 skew-y-6"></div>
            <div className="absolute top-[60%] left-0 w-full h-12 bg-white/40 -skew-y-3"></div>
            <svg className="absolute inset-0 w-full h-full drop-shadow-sm" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 20 80 L 50 80 L 50 50 L 80 20" fill="none" stroke="#fa6a19" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round" className="opacity-80" />
            </svg>
            <div className="absolute left-[20%] top-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-3.5 h-3.5 bg-gray-700 rounded-full border-2 border-white shadow-md z-10"></div>
              <div className="mt-1.5 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider rounded shadow-sm text-gray-700">Warehouse</div>
            </div>
            <div className="absolute left-[80%] top-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-4 h-4 bg-[#5f48c6] rounded-full border-2 border-white shadow-md z-10 flex items-center justify-center animate-bounce">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="mt-1 px-2 py-0.5 bg-[#5f48c6] text-[10px] font-bold uppercase tracking-wider rounded shadow-md text-white">Your Location</div>
            </div>
            <div className="absolute w-8 h-8 z-20" style={{ animation: 'driveAgent 15s infinite ease-in-out' }}>
              <div className="relative w-8 h-8 bg-[#fa6a19] rounded-full border-2 border-white shadow-[0_4px_12px_rgba(250,106,25,0.4)] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <div className="absolute inset-0 rounded-full border-2 border-[#fa6a19] animate-ping opacity-75"></div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-gray-900 text-[9px] font-bold rounded shadow-md text-white whitespace-nowrap">
                Agent Arriving
              </div>
            </div>
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes driveAgent {
                0% { left: 20%; top: 80%; transform: translate(-50%, -50%); }
                30% { left: 50%; top: 80%; transform: translate(-50%, -50%); }
                60% { left: 50%; top: 50%; transform: translate(-50%, -50%); }
                95% { left: 75%; top: 25%; transform: translate(-50%, -50%); }
                100% { left: 75%; top: 25%; transform: translate(-50%, -50%); }
              }
            `}} />
          </div>
        )}
      </div>
    </div>
  )
}

const StatusBadge = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-sm font-semibold text-gray-800 w-fit capitalize">
      {value.replace(/_/g, " ")}
    </span>
  </div>
)

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Order meta info row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Number</p>
          <p className="text-base font-bold text-[#5f48c6]" data-testid="order-id">#{order.display_id}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Date</p>
          <p className="text-base font-semibold text-gray-800" data-testid="order-date">
            {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirmation sent to</p>
          <p className="text-base font-semibold text-gray-800 truncate" data-testid="order-email">{order.email}</p>
        </div>
      </div>

      {/* Status badges */}
      {!!showStatus && (
        <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
          <StatusBadge label="Order Status" value={order.fulfillment_status as string} />
          <StatusBadge label="Payment Status" value={order.payment_status as string} />
        </div>
      )}

      {/* Delivery tracker */}
      <DeliveryStatusTracker
        status={(order.metadata?.delivery_status as string) || "pending"}
        order={order}
      />
    </div>
  )
}

export default OrderDetails
