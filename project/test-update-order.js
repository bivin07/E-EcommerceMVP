"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = testUpdateOrder;
async function testUpdateOrder({ container }) {
    const orderModuleService = container.resolve("order");
    try {
        const orders = await orderModuleService.listOrders({}, { take: 1 });
        if (orders.length === 0)
            return console.log("No orders");
        const orderId = orders[0].id;
        console.log("Updating order:", orderId);
        await orderModuleService.updateOrders(orderId, {
            metadata: { delivery_status: "picked_up" }
        });
        const updated = await orderModuleService.listOrders({ id: orderId });
        console.log("Updated metadata:", updated[0].metadata);
    }
    catch (error) {
        console.error("Update Error:", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC11cGRhdGUtb3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy90ZXN0LXVwZGF0ZS1vcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQW1CQztBQW5CYyxLQUFLLFVBQVUsZUFBZSxDQUFDLEVBQUUsU0FBUyxFQUFzQjtJQUM3RSxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFckQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkUsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7UUFFeEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBRXZDLE1BQU0sa0JBQWtCLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUM3QyxRQUFRLEVBQUUsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFO1NBQzNDLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQWtCLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0FBQ0gsQ0FBQyJ9