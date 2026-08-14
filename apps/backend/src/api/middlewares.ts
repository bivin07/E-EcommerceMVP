import { defineMiddlewares } from "@medusajs/medusa"
import { authenticate } from "@medusajs/framework/http"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/delivery-orders",
      middlewares: [
        authenticate("customer", ["session", "bearer", "api-key"]),
      ],
    },
  ],
})
