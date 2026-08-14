"use client"

import { useEffect, useState } from "react"
import { fetchDeliveryOrders, updateDeliveryStatus } from "./actions"
import { Heading, Text, clx } from "@modules/common/components/ui"
import { CheckCircleSolid, MapPin, Phone } from "@medusajs/icons"

export default function DeliveryPortal() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [pincodes, setPincodes] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"available" | "active">("available")

  const loadOrders = async () => {
    setLoading(true)
    const res = await fetchDeliveryOrders()
    if (res.success) {
      setOrders(res.orders || [])
      setPincodes(res.servicePincodes || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setOrders((prev) => 
      prev.map(o => o.id === orderId ? { ...o, metadata: { ...o.metadata, delivery_status: status } } : o)
    )
    await updateDeliveryStatus(orderId, status)
    loadOrders()
  }

  const availableOrders = orders.filter(o => !o.metadata?.delivery_status || o.metadata?.delivery_status === "pending")
  const activeOrders = orders.filter(o => o.metadata?.delivery_status === "assigned" || o.metadata?.delivery_status === "picked_up")

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gray-100 font-sans pb-24">
      {/* App Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <Heading className="text-xl font-bold text-gray-900">Orders</Heading>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <Text className="text-xs font-bold text-gray-600 uppercase tracking-wider">Online</Text>
          </div>
        </div>
        
        {/* Compact Tabs */}
        <div className="flex px-2 pb-0">
          <button
            onClick={() => setActiveTab("available")}
            className={clx("flex-1 pb-3 text-sm font-bold transition-colors border-b-2", {
              "border-[#5f48c6] text-[#5f48c6]": activeTab === "available",
              "border-transparent text-gray-500 hover:text-gray-800": activeTab !== "available"
            })}
          >
            New ({availableOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("active")}
            className={clx("flex-1 pb-3 text-sm font-bold transition-colors border-b-2", {
              "border-[#fa6a19] text-[#fa6a19]": activeTab === "active",
              "border-transparent text-gray-500 hover:text-gray-800": activeTab !== "active"
            })}
          >
            Active ({activeOrders.length})
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="p-3 flex flex-col gap-2">
        {activeTab === "available" && (
          availableOrders.length > 0 ? (
            availableOrders.map((order) => (
              <SwiggyOrderCard key={order.id} order={order} type="available" onUpdate={handleUpdateStatus} />
            ))
          ) : (
            <div className="text-center py-20 flex flex-col items-center">
              <Text className="text-gray-400 font-medium">No new orders available.</Text>
            </div>
          )
        )}

        {activeTab === "active" && (
          activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <SwiggyOrderCard key={order.id} order={order} type="active" onUpdate={handleUpdateStatus} />
            ))
          ) : (
            <div className="text-center py-20 flex flex-col items-center">
              <Text className="text-gray-400 font-medium">No active deliveries.</Text>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function SwiggyOrderCard({ order, type, onUpdate }: { order: any, type: "available" | "active", onUpdate: (id: string, status: string) => void }) {
  const [confirmAction, setConfirmAction] = useState<"accept" | "pickup" | "deliver" | "cancel" | null>(null)
  
  const address = order.shipping_address
  const itemsCount = order.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0
  const status = order.metadata?.delivery_status || "pending"

  // Progress Bar Steps (for active tab)
  const isActive = type === "active"
  const isAssigned = status === "assigned"
  const isPickedUp = status === "picked_up"

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4 active:bg-gray-50 transition-colors border border-gray-100 mb-1">
      <div className="flex justify-between items-start border-b border-gray-100 pb-3">
        <div>
           <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order #{order.display_id}</Text>
           <Text className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">{address?.first_name} {address?.last_name}</Text>
        </div>
        <div className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-bold">
           {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Swiggy-style vertical timeline */}
        <div className="flex flex-col items-center mt-1 w-6">
          <div className={clx("w-3 h-3 rounded-full border-2", {
            "border-[#5f48c6] bg-[#5f48c6] shadow-[0_0_8px_rgba(95,72,198,0.4)]": isActive && isPickedUp, // Completed pickup
            "border-[#5f48c6] bg-white": !isActive || isAssigned // Pending pickup
          })}></div>
          <div className={clx("w-0.5 h-8 my-1", {
            "bg-[#5f48c6]": isActive && isPickedUp,
            "bg-gray-200": !isActive || isAssigned
          })}></div>
          <div className={clx("w-3 h-3 rounded-full border-2", {
            "border-[#fa6a19] bg-white": true // Dropoff always pending until disappeared
          })}></div>
        </div>

        <div className="flex-1 flex flex-col justify-between py-0.5">
           <div className="mb-4">
              <Text className={clx("text-[10px] font-bold uppercase tracking-wider", {
                "text-[#5f48c6]": isAssigned,
                "text-gray-400": !isAssigned
              })}>Pickup</Text>
              <Text className="text-sm font-semibold text-gray-800">Warehouse</Text>
           </div>
           <div>
              <Text className={clx("text-[10px] font-bold uppercase tracking-wider", {
                "text-[#fa6a19]": isPickedUp,
                "text-gray-400": !isPickedUp
              })}>Dropoff</Text>
              <Text className="text-sm font-semibold text-gray-800 line-clamp-1">{address?.address_1}</Text>
              <Text className="text-xs text-gray-500 line-clamp-1">{address?.city}</Text>
           </div>
        </div>
      </div>

      {confirmAction ? (
        <div className="flex flex-col gap-2 mt-2 p-3 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
           <Text className="text-sm font-bold text-center mb-1 text-gray-800">
             {confirmAction === "accept" && "Accept and take responsibility for this order?"}
             {confirmAction === "pickup" && "Confirm you have picked up the items?"}
             {confirmAction === "deliver" && "Confirm you have delivered this order?"}
             {confirmAction === "cancel" && "Cancel and return order to the available pool?"}
           </Text>
           <div className="flex gap-2">
             <button 
               onClick={() => setConfirmAction(null)} 
               className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-bold py-2.5 rounded-xl"
             >
               Go Back
             </button>
             <button 
               onClick={() => {
                 setConfirmAction(null);
                 if (confirmAction === "accept") onUpdate(order.id, "assigned");
                 if (confirmAction === "pickup") onUpdate(order.id, "picked_up");
                 if (confirmAction === "deliver") onUpdate(order.id, "delivered");
                 if (confirmAction === "cancel") onUpdate(order.id, "pending");
               }} 
               className={clx("flex-1 text-white text-sm font-bold py-2.5 rounded-xl shadow-sm", {
                 "bg-[#5f48c6]": confirmAction === "accept" || confirmAction === "pickup",
                 "bg-[#fa6a19]": confirmAction === "deliver",
                 "bg-red-500": confirmAction === "cancel"
               })}
             >
               Yes, Confirm
             </button>
           </div>
        </div>
      ) : (
        <div className="flex gap-2 mt-2">
          {type === "active" && (
            <>
              {isPickedUp && address?.phone && (
                <a href={`tel:${address?.phone}`} className="w-14 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 text-sm font-semibold py-2.5 rounded-xl flex justify-center items-center">
                  <Phone className="w-5 h-5" />
                </a>
              )}
              {isAssigned && (
                <button 
                  onClick={() => setConfirmAction("cancel")}
                  className="w-14 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-sm font-semibold py-2.5 rounded-xl flex justify-center items-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
              
              {isAssigned && (
                <button 
                  onClick={() => setConfirmAction("pickup")}
                  className="flex-1 bg-[#5f48c6] hover:bg-[#4a3699] text-white text-sm font-bold py-3.5 rounded-xl text-center transition-all shadow-sm"
                >
                  Confirm Pickup
                </button>
              )}

              {isPickedUp && (
                <button 
                  onClick={() => setConfirmAction("deliver")}
                  className="flex-1 bg-[#fa6a19] hover:bg-[#e05f15] text-white text-sm font-bold py-3.5 rounded-xl text-center transition-all shadow-sm flex items-center justify-center gap-2"
                >
                   Mark Delivered <CheckCircleSolid className="w-5 h-5" />
                </button>
              )}
            </>
          )}
          {type === "available" && (
            <button 
              onClick={() => setConfirmAction("accept")}
              className="w-full bg-[#5f48c6] hover:bg-[#4a3699] text-white text-sm font-bold py-3.5 rounded-xl text-center transition-all shadow-sm"
            >
              Accept Order
            </button>
          )}
        </div>
      )}
    </div>
  )
}
