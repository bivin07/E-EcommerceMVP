"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = orderPlacedHandler;
const utils_1 = require("@medusajs/framework/utils");
async function orderPlacedHandler({ event: { data }, container }) {
    const orderId = data.id;
    const query = container.resolve("query");
    const remoteLink = container.resolve("remoteLink");
    // Fetch the order and its customer
    const { data: [order] } = await query.graph({
        entity: "order",
        fields: ["id", "customer_id", "customer.groups.id", "customer.groups.name"],
        filters: { id: orderId }
    });
    if (!order?.customer || !order.customer_id)
        return;
    // Find if they are in the "Referred by Electrician" group
    const referredGroup = order.customer.groups?.find((g) => g.name === "Referred by Electrician");
    if (referredGroup) {
        const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
        await customerModuleService.removeCustomerFromGroup({
            customer_id: order.customer_id,
            customer_group_id: referredGroup.id
        });
    }
}
exports.config = {
    event: "order.placed",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcGxhY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3N1YnNjcmliZXJzL29yZGVyLXBsYWNlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxxQ0F3QkM7QUExQkQscURBQW1EO0FBRXBDLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBa0M7SUFDN0csTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUN2QixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hDLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFbEQsbUNBQW1DO0lBQ25DLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLEVBQUUsT0FBTztRQUNmLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUM7UUFDM0UsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRTtLQUN6QixDQUFDLENBQUE7SUFFRixJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO1FBQUUsT0FBTTtJQUVsRCwwREFBMEQ7SUFDMUQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHlCQUF5QixDQUFDLENBQUE7SUFFbkcsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNsQixNQUFNLHFCQUFxQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ2pFLE1BQU0scUJBQXFCLENBQUMsdUJBQXVCLENBQUM7WUFDbEQsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFxQjtZQUN4QyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsRUFBRTtTQUNwQyxDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQUVZLFFBQUEsTUFBTSxHQUFxQjtJQUN0QyxLQUFLLEVBQUUsY0FBYztDQUN0QixDQUFBIn0=