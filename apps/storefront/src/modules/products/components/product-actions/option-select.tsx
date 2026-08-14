import { HttpTypes } from "@medusajs/types"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#6b6b8d" }}
      >
        {title}
      </span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: isSelected
                  ? "linear-gradient(135deg, #5f48c6, #8833cf)"
                  : "rgba(95,72,198,0.06)",
                color: isSelected ? "white" : "#3d3d6b",
                border: isSelected
                  ? "1.5px solid transparent"
                  : "1.5px solid rgba(95,72,198,0.15)",
                boxShadow: isSelected
                  ? "0 3px 12px rgba(95,72,198,0.3)"
                  : "none",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.5 : 1,
              }}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
