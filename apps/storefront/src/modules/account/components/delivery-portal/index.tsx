"use client"

import { useEffect, useState, useRef } from "react"
import { fetchDeliveryOrders, updateDeliveryStatus } from "./actions"
import { Heading, Text, clx } from "@modules/common/components/ui"
import { CheckCircleSolid, MapPin, Phone } from "@medusajs/icons"

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const audioCtx = new AudioContextClass()
    
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const osc = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(frequency, startTime)
      
      gainNode.gain.setValueAtTime(0.2, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
      
      osc.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      
      osc.start(startTime)
      osc.stop(startTime + duration)
    }

    const now = audioCtx.currentTime
    // Double beep chime (Swiggy dispatch tone style)
    playNote(587.33, now, 0.2) // D5
    playNote(698.46, now + 0.1, 0.2) // F5
    playNote(880.00, now + 0.2, 0.35) // A5
  } catch (error) {
    console.warn("Audio playback blocked or failed:", error)
  }
}

function RadarWaitingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in duration-500">
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        <div className="absolute inset-0 rounded-full border border-green-500/10 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute w-24 h-24 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute w-14 h-14 rounded-full border border-green-500/30 animate-ping" style={{ animationDuration: '1.5s' }} />
        
        <div className="relative w-10 h-10 rounded-full bg-green-50 border-2 border-green-500 flex items-center justify-center shadow-lg shadow-green-500/10">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      <Text className="text-base font-bold text-gray-900 mb-1.5">Looking for orders...</Text>
      <Text className="text-xs text-gray-500 max-w-xs leading-normal">
        You are currently online. Incoming delivery requests in your area will pop up here instantly.
      </Text>
    </div>
  )
}

export default function DeliveryPortal() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [pincodes, setPincodes] = useState<string[]>([])
  const [suppressedOrderIds, setSuppressedOrderIds] = useState<string[]>([])

  // Alert & Polling refs
  const [newOrderAlert, setNewOrderAlert] = useState<any>(null)
  const prevAvailableIdsRef = useRef<string[]>([])
  const isFirstLoadRef = useRef(true)
  const suppressedRef = useRef<string[]>([])

  const suppressOrder = (id: string) => {
    suppressedRef.current = [...suppressedRef.current, id]
    setSuppressedOrderIds(suppressedRef.current)
  }

  const loadOrders = async (showLoadingSpinner = false) => {
    if (showLoadingSpinner) setLoading(true)
    const res = await fetchDeliveryOrders()
    if (res.success) {
      const allOrders = res.orders || []
      setOrders(allOrders)
      setPincodes(res.servicePincodes || [])

      // Filter available (pending) orders
      const currentAvailable = allOrders.filter(
        (o: any) => (!o.metadata?.delivery_status || o.metadata?.delivery_status === "pending") && !suppressedRef.current.includes(o.id)
      )
      const currentAvailableIds = currentAvailable.map((o: any) => o.id)

      // Only check for new alerts if it's NOT the very first load
      if (!isFirstLoadRef.current) {
        const newlyAdded = currentAvailable.filter(
          (o: any) => !prevAvailableIdsRef.current.includes(o.id)
        )
        if (newlyAdded.length > 0) {
          setNewOrderAlert(newlyAdded[0])
        }
      }

      prevAvailableIdsRef.current = currentAvailableIds
      isFirstLoadRef.current = false
    }
    if (showLoadingSpinner) setLoading(false)
  }

  useEffect(() => {
    loadOrders(true)

    const interval = setInterval(() => {
      loadOrders(false)
    }, 6000) // Poll every 6 seconds

    // Unblock audio context on first user click or touch interaction
    const unlockAudio = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass()
          const buffer = audioCtx.createBuffer(1, 1, 22050)
          const source = audioCtx.createBufferSource()
          source.buffer = buffer
          source.connect(audioCtx.destination)
          source.start(0)
          if (audioCtx.state === "suspended") {
            audioCtx.resume()
          }
        }
      } catch (e) {
        console.warn("Could not pre-unlock audio:", e)
      }
      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
    }

    window.addEventListener("click", unlockAudio)
    window.addEventListener("touchstart", unlockAudio)

    return () => {
      clearInterval(interval)
      window.removeEventListener("click", unlockAudio)
      window.removeEventListener("touchstart", unlockAudio)
    }
  }, [])

  // Loop alert sound chime while notification modal is visible
  useEffect(() => {
    if (!newOrderAlert) return

    playNotificationSound() // Play immediately

    const chimeInterval = setInterval(() => {
      playNotificationSound()
    }, 1500) // Re-chime every 1.5 seconds

    return () => clearInterval(chimeInterval)
  }, [newOrderAlert])

  const handleUpdateStatus = async (orderId: string, status: string) => {
    if (status === "pending") {
      suppressOrder(orderId)
    }
    setOrders((prev) => 
      prev.map(o => o.id === orderId ? { ...o, metadata: { ...o.metadata, delivery_status: status } } : o)
    )
    await updateDeliveryStatus(orderId, status)
    loadOrders()
  }

  const availableOrders = orders.filter(o => (!o.metadata?.delivery_status || o.metadata?.delivery_status === "pending") && !suppressedOrderIds.includes(o.id))
  const activeOrders = orders.filter(o => o.metadata?.delivery_status === "assigned" || o.metadata?.delivery_status === "picked_up")

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gray-100 font-sans pb-24 relative flex flex-col">
      {/* App Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <Heading className="text-xl font-bold text-gray-900">Deliveries</Heading>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <Text className="text-xs font-bold text-gray-600 uppercase tracking-wider">Online</Text>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        {activeOrders.length > 0 ? (
          <>
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 px-1">Active Deliveries ({activeOrders.length})</Text>
            {activeOrders.map((order) => (
              <SwiggyOrderCard key={order.id} order={order} type="active" onUpdate={handleUpdateStatus} />
            ))}
          </>
        ) : (
          <RadarWaitingScreen />
        )}
      </div>

      {/* Visual Alert Modal (Swiggy Style) */}
      {newOrderAlert && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in slide-in-from-bottom duration-300">
             {/* Header */}
            <div className="bg-gradient-to-r from-[#5f48c6] to-[#fa6a19] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white animate-bounce text-lg">🔔</span>
                <span className="text-white font-bold text-sm tracking-wider uppercase">New Delivery Request</span>
              </div>
              <button 
                onClick={() => {
                  suppressOrder(newOrderAlert.id)
                  setNewOrderAlert(null)
                }}
                className="text-white/80 hover:text-white text-xs font-bold bg-white/10 px-3 py-1 rounded-full"
              >
                Dismiss
              </button>
            </div>

            {/* Order Content */}
            <div className="px-6 py-2 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Order ID</Text>
                  <Heading className="text-2xl font-black text-gray-900 mt-0.5">#{newOrderAlert.display_id}</Heading>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-black">
                  {newOrderAlert.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0} items
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Store/Warehouse</Text>
                  <Text className="text-sm font-bold text-gray-800">Kerala Warehouse (Kochi)</Text>
                </div>
                <div className="w-full h-px bg-gray-200/60 my-1" />
                <div>
                  <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Customer Location</Text>
                  <Text className="text-sm font-bold text-gray-800 leading-tight">
                    {newOrderAlert.shipping_address?.first_name} {newOrderAlert.shipping_address?.last_name}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-0.5 leading-snug">
                    {newOrderAlert.shipping_address?.address_1}, {newOrderAlert.shipping_address?.city}
                  </Text>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 pt-2 flex gap-3 border-t border-gray-100 mt-2">
              <button 
                onClick={() => {
                  suppressOrder(newOrderAlert.id)
                  setNewOrderAlert(null)
                }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-3.5 rounded-xl transition-colors"
              >
                Decline
              </button>
              <button 
                onClick={async () => {
                  const orderId = newOrderAlert.id
                  setNewOrderAlert(null)
                  await handleUpdateStatus(orderId, "assigned")
                }}
                className="flex-[2] bg-[#5f48c6] hover:bg-[#4a3699] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#5f48c6]/20 flex justify-center items-center gap-1.5"
              >
                Accept Order
              </button>
            </div>
          </div>
        </div>
      )}
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
