import { Container, clx } from "@modules/common/components/ui"
import Image from "next/image"
import React from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <Container
      className={clx(
        "relative w-full overflow-hidden transition-all duration-300",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[4/3]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
      style={{
        background: "#FFFFFF",
        borderRadius: 0,
      }}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  const isSmall = size === "small" || size === "square"

  return image ? (
    <Image
      src={image}
      alt="Product thumbnail"
      className={clx(
        "absolute inset-0 object-center transition-transform duration-500 group-hover:scale-105",
        size === "square" || size === "small" ? "object-contain p-4" : "object-cover"
      )}
      draggable={false}
      quality={75}
      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
      fill
    />
  ) : (
    <div
      className="w-full h-full absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: "#F9FAFB" }}
    >
      {/* Premium custom placeholder circle in brand colors */}
      <div
        className={clx(
          "rounded-full flex items-center justify-center shadow-sm",
          isSmall ? "w-8 h-8" : "w-12 h-12"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(95,72,198,0.12), rgba(136,51,207,0.08))",
          border: "1px solid rgba(95,72,198,0.15)",
        }}
      >
        <span
          style={{
            color: "#5f48c6",
            fontSize: isSmall ? "0.875rem" : "1.25rem",
          }}
        >
          ⚡
        </span>
      </div>
    </div>
  )
}

export default Thumbnail
