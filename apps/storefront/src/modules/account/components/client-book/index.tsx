"use client"

import { HttpTypes } from "@medusajs/types"
import { Plus, Trash } from "@medusajs/icons"
import { Button, Heading, Text } from "@modules/common/components/ui"
import { useActionState, useEffect, useState } from "react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import CountrySelect from "@modules/checkout/components/country-select"
import { addElectricianClient, deleteElectricianClient } from "./actions"

export type Client = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address_1: string
  city: string
  postal_code: string
  country_code: string
}

export default function ClientBook({
  customer,
  region,
}: {
  customer: HttpTypes.StoreCustomer
  region: HttpTypes.StoreRegion
}) {
  const clients: Client[] = Array.isArray(customer.metadata?.clients)
    ? (customer.metadata?.clients as Client[])
    : []

  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addElectricianClient, {
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  const handleDelete = async (id: string) => {
    await deleteElectricianClient(id, customer.metadata || {})
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 mt-4">
        <button
          className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
          onClick={open}
        >
          <span className="text-base-semi">Add a Client</span>
          <Plus />
        </button>

        {clients.map((client) => (
          <div
            key={client.id}
            className="border border-ui-border-base rounded-rounded p-5 min-h-[220px] h-full w-full flex flex-col justify-between"
          >
            <div className="flex flex-col">
              <Heading className="text-base-semi text-ui-fg-base mb-2">
                {client.first_name} {client.last_name}
              </Heading>
              <Text className="text-small-regular text-ui-fg-subtle mb-1">
                {client.email}
              </Text>
              <Text className="text-small-regular text-ui-fg-subtle mb-1">
                {client.phone}
              </Text>
              <div className="flex flex-col text-left text-base-regular mt-2">
                <Text className="text-small-regular text-ui-fg-base">
                  {client.address_1}
                </Text>
                <Text className="text-small-regular text-ui-fg-base">
                  {client.postal_code}, {client.city}
                </Text>
                <Text className="text-small-regular text-ui-fg-base">
                  {client.country_code?.toUpperCase()}
                </Text>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="text-ui-fg-subtle hover:text-rose-500 transition-colors"
                onClick={() => handleDelete(client.id)}
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={state} close={close}>
        <Modal.Title>
          <Heading className="mb-2">Add Client</Heading>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="current_metadata" value={JSON.stringify(customer.metadata || {})} />
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input label="First name" name="first_name" required />
                <Input label="Last name" name="last_name" required />
              </div>
              <Input label="Email address" name="email" required type="email" />
              <Input label="Phone" name="phone" required />
              <Input label="Address" name="address_1" required />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input label="Postal code" name="postal_code" required />
                <Input label="City" name="city" required />
              </div>
              <CountrySelect region={region} name="country_code" required />
            </div>
            {formState.error && (
              <div className="text-rose-500 text-small-regular py-2">
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-6">
              <Button type="reset" variant="secondary" onClick={close} className="h-10">
                Cancel
              </Button>
              <SubmitButton>Save Client</SubmitButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}
