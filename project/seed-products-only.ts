import { MedusaContainer } from "@medusajs/framework";
import { ContainerRegistrationKeys, ProductStatus } from "@medusajs/framework/utils";
import { createProductsWorkflow, createProductCategoriesWorkflow, createProductOptionsWorkflow } from "@medusajs/medusa/core-flows";

export default async function seed_products_only({ container }: { container: MedusaContainer }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  
  logger.info("Fetching shipping profile...");
  const { data: shippingProfileResult } = await query.graph({ entity: "shipping_profile", fields: ["id"] });
  const shippingProfile = shippingProfileResult[0];

  logger.info("Fetching product categories...");
  const { data: categoryResult } = await query.graph({
    entity: "product_category",
    fields: ["id", "name"],
  });

  logger.info("Fetching product options...");
  const { data: productOptionsResult } = await query.graph({
    entity: "product_option",
    fields: ["id", "title"],
  });
  const capacityOption = productOptionsResult.find(o => o.title === "Capacity")!;
  const voltageOption = productOptionsResult.find(o => o.title === "Voltage")!;

  logger.info("Creating electrical products...");
  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Monocrystalline Solar Panel 500W",
          category_ids: [categoryResult.find(c => c.name === "Solar Panels")!.id],
          description: "High-efficiency 500W monocrystalline solar panel.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ id: capacityOption.id }],
          variants: [ 
            { title: "500W", sku: "SOLAR-PANEL-500W", options: { Capacity: "500W" }, prices: [{ amount: 15000, currency_code: "inr" }] },
            { title: "400W", sku: "SOLAR-PANEL-400W", options: { Capacity: "400W" }, prices: [{ amount: 12000, currency_code: "inr" }] }
          ]
        },
        {
          title: "Luminous Solar Inverter",
          category_ids: [categoryResult.find(c => c.name === "Inverters")!.id],
          description: "Pure sine wave solar inverter for home use.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ id: voltageOption.id }],
          variants: [ 
            { title: "12V", sku: "INV-12V", options: { Voltage: "12V" }, prices: [{ amount: 8500, currency_code: "inr" }] },
            { title: "24V", sku: "INV-24V", options: { Voltage: "24V" }, prices: [{ amount: 12500, currency_code: "inr" }] }
          ]
        },
        {
          title: "Exide Tubular Battery 150Ah",
          category_ids: [categoryResult.find(c => c.name === "Batteries")!.id],
          description: "Deep cycle tubular battery designed for long backup.",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          options: [{ id: capacityOption.id }],
          variants: [ 
            { title: "150Ah", sku: "BAT-150AH", options: { Capacity: "150Ah" }, prices: [{ amount: 14000, currency_code: "inr" }] },
            { title: "200Ah", sku: "BAT-200AH", options: { Capacity: "200Ah" }, prices: [{ amount: 18000, currency_code: "inr" }] }
          ]
        }
      ]
    }
  });

  logger.info("Electrical products seeded successfully!");
}
