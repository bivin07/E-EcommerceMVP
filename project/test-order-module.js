"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = testModuleQuery;
async function testModuleQuery({ container }) {
    const orderModuleService = container.resolve("order");
    try {
        console.log("Fetching orders from 'order' module...");
        const orders = await orderModuleService.listOrders({}, {
            relations: ["shipping_address", "items"]
        });
        console.log("Orders count from 'order' module:", orders.length);
        if (orders.length > 0) {
            console.log(JSON.stringify(orders[0], null, 2));
        }
    }
    catch (error) {
        console.error("Module Query Error:", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy90ZXN0LW9yZGVyLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQWtCQztBQWxCYyxLQUFLLFVBQVUsZUFBZSxDQUFDLEVBQUUsU0FBUyxFQUFzQjtJQUM3RSxNQUFNLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFckQsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1FBQ3JELE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsVUFBVSxDQUNoRCxFQUFFLEVBQ0Y7WUFDRSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7U0FDekMsQ0FDRixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDL0QsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakQsQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0FBQ0gsQ0FBQyJ9