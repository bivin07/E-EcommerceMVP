"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seed_products_only;
const utils_1 = require("@medusajs/framework/utils");
const core_flows_1 = require("@medusajs/medusa/core-flows");
async function seed_products_only({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    const query = container.resolve(utils_1.ContainerRegistrationKeys.QUERY);
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
    const capacityOption = productOptionsResult.find(o => o.title === "Capacity");
    const voltageOption = productOptionsResult.find(o => o.title === "Voltage");
    logger.info("Creating electrical products...");
    await (0, core_flows_1.createProductsWorkflow)(container).run({
        input: {
            products: [
                {
                    title: "Monocrystalline Solar Panel 500W",
                    category_ids: [categoryResult.find(c => c.name === "Solar Panels").id],
                    description: "High-efficiency 500W monocrystalline solar panel.",
                    status: utils_1.ProductStatus.PUBLISHED,
                    shipping_profile_id: shippingProfile.id,
                    options: [{ id: capacityOption.id }],
                    variants: [
                        { title: "500W", sku: "SOLAR-PANEL-500W", options: { Capacity: "500W" }, prices: [{ amount: 15000, currency_code: "inr" }] },
                        { title: "400W", sku: "SOLAR-PANEL-400W", options: { Capacity: "400W" }, prices: [{ amount: 12000, currency_code: "inr" }] }
                    ]
                },
                {
                    title: "Luminous Solar Inverter",
                    category_ids: [categoryResult.find(c => c.name === "Inverters").id],
                    description: "Pure sine wave solar inverter for home use.",
                    status: utils_1.ProductStatus.PUBLISHED,
                    shipping_profile_id: shippingProfile.id,
                    options: [{ id: voltageOption.id }],
                    variants: [
                        { title: "12V", sku: "INV-12V", options: { Voltage: "12V" }, prices: [{ amount: 8500, currency_code: "inr" }] },
                        { title: "24V", sku: "INV-24V", options: { Voltage: "24V" }, prices: [{ amount: 12500, currency_code: "inr" }] }
                    ]
                },
                {
                    title: "Exide Tubular Battery 150Ah",
                    category_ids: [categoryResult.find(c => c.name === "Batteries").id],
                    description: "Deep cycle tubular battery designed for long backup.",
                    status: utils_1.ProductStatus.PUBLISHED,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1wcm9kdWN0cy1vbmx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21pZ3JhdGlvbi1zY3JpcHRzL3NlZWQtcHJvZHVjdHMtb25seS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLHFDQW1FQztBQXRFRCxxREFBcUY7QUFDckYsNERBQW9JO0FBRXJILEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUFFLFNBQVMsRUFBa0M7SUFDNUYsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRSxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpFLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM1QyxNQUFNLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxRyxNQUFNLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRCxNQUFNLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDOUMsTUFBTSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDakQsTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO0tBQ3ZCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztJQUMzQyxNQUFNLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FB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