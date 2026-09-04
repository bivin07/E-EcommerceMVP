"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyReferralCodeWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const applyReferralGroupStep = (0, workflows_sdk_1.createStep)("apply-referral-group-step", async ({ customerId, code }, { container }) => {
    const query = container.resolve("query");
    const customerGroupService = container.resolve(utils_1.Modules.CUSTOMER);
    // 1. Verify the code exists and is active
    const { data: [referralCode] } = await query.graph({
        entity: "referral_code",
        fields: ["id", "code", "is_active"],
        filters: { code, is_active: true }
    });
    if (!referralCode) {
        throw new Error("Invalid or inactive referral code.");
    }
    // 2. Find the "Referred by Electrician" group
    const { data: [referredGroup] } = await query.graph({
        entity: "customer_group",
        fields: ["id", "name"],
        filters: { name: "Referred by Electrician" }
    });
    let referredGroupId = referredGroup?.id;
    if (!referredGroupId) {
        // Auto-create the group so the admin doesn't have to manually ensure it exists
        const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
        const newGroup = await customerModuleService.createCustomerGroups({
            name: "Referred by Electrician"
        });
        referredGroupId = newGroup.id;
    }
    // 3. Check if the customer is already in this group
    const { data: [customer] } = await query.graph({
        entity: "customer",
        fields: ["id", "groups.id"],
        filters: { id: customerId }
    });
    if (!customer) {
        throw new Error("Customer not found.");
    }
    const alreadyInGroup = customer.groups?.some((g) => g.id === referredGroupId);
    if (alreadyInGroup) {
        return new workflows_sdk_1.StepResponse({ success: true, message: "Code already applied." }, null);
    }
    // 4. Add the customer to the group
    const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
    await customerModuleService.addCustomerToGroup({
        customer_id: customerId,
        customer_group_id: referredGroupId
    });
    return new workflows_sdk_1.StepResponse({ success: true, message: "Referral code applied." }, { customerId, groupId: referredGroupId });
}, async (revertData, { container }) => {
    if (!revertData)
        return;
    const { customerId, groupId } = revertData;
    const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
    await customerModuleService.removeCustomerFromGroup({
        customer_id: customerId,
        customer_group_id: groupId
    });
});
exports.applyReferralCodeWorkflow = (0, workflows_sdk_1.createWorkflow)("apply-referral-code", (input) => {
    const result = applyReferralGroupStep(input);
    return new workflows_sdk_1.WorkflowResponse(result);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktcmVmZXJyYWwtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy93b3JrZmxvd3MvYXBwbHktcmVmZXJyYWwtY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBOEc7QUFDOUcscURBQW1EO0FBUW5ELE1BQU0sc0JBQXNCLEdBQUcsSUFBQSwwQkFBVSxFQUN2QywyQkFBMkIsRUFDM0IsS0FBSyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBc0IsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN4QyxNQUFNLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRWhFLDBDQUEwQztJQUMxQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDakQsTUFBTSxFQUFFLGVBQWU7UUFDdkIsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7UUFDbkMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUU7S0FDbkMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBRUQsOENBQThDO0lBQzlDLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNsRCxNQUFNLEVBQUUsZ0JBQWdCO1FBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7UUFDdEIsT0FBTyxFQUFFLEVB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