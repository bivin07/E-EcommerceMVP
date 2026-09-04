"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = testModuleQuery;
async function testModuleQuery({ container }) {
    const orderModuleService = container.resolve("orderModuleService");
    try {
        console.log("Fetching orders from module...");
        const orders = await orderModuleService.listOrders({}, {
            relations: ["shipping_address", "items"]
        });
        console.log("Orders count from module:", orders.length);
    }
    catch (error) {
        console.error("Module Query Error:", error);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1tb2R1bGUtcXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2NyaXB0cy90ZXN0LW1vZHVsZS1xdWVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtDQWVDO0FBZmMsS0FBSyxVQUFVLGVBQWUsQ0FBQyxFQUFFLFNBQVMsRUFBc0I7SUFDN0UsTUFBTSxrQkFBa0IsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFbEUsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsVUFBVSxDQUNoRCxFQUFFLEVBQ0Y7WUFDRSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUM7U0FDekMsQ0FDRixDQUFBO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQzdDLENBQUM7QUFDSCxDQUFDIn0=