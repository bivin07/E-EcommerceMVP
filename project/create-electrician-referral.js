"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createElectricianReferralWorkflow = void 0;
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const utils_1 = require("@medusajs/framework/utils");
const referral_1 = require("../modules/referral");
const generateReferralCodeStep = (0, workflows_sdk_1.createStep)("generate-referral-code-step", async ({ customer }, { container }) => {
    const referralModuleService = container.resolve(referral_1.REFERRAL_MODULE);
    const remoteLink = container.resolve("remoteLink");
    // Generate a unique code
    const baseName = customer.first_name ? customer.first_name.toUpperCase() : "REF";
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referralCode = `ELEC-${baseName}-${randomSuffix}`;
    // Create the referral code record
    const referral = await referralModuleService.createReferralCodes({
        code: referralCode,
        is_active: true
    });
    // Link the Referral Code to the Customer
    await remoteLink.create({
        [utils_1.Modules.CUSTOMER]: { customer_id: customer.id },
        [referral_1.REFERRAL_MODULE]: { referral_code_id: referral.id }
    });
    return new workflows_sdk_1.StepResponse({ code: referralCode }, { referralId: referral.id, customerId: customer.id });
}, async (revertData, { container }) => {
    if (!revertData)
        return;
    const { referralId, customerId } = revertData;
    const referralModuleService = container.resolve(referral_1.REFERRAL_MODULE);
    const remoteLink = container.resolve("remoteLink");
    await remoteLink.dismiss({
        [utils_1.Modules.CUSTOMER]: { customer_id: customerId },
        [referral_1.REFERRAL_MODULE]: { referral_code_id: referralId }
    });
    await referralModuleService.deleteReferralCodes(referralId);
});
exports.createElectricianReferralWorkflow = (0, workflows_sdk_1.createWorkflow)("create-electrician-referral", (input) => {
    const stepResult = generateReferralCodeStep(input);
    return new workflows_sdk_1.WorkflowResponse(stepResult);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWVsZWN0cmljaWFuLXJlZmVycmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9jcmVhdGUtZWxlY3RyaWNpYW4tcmVmZXJyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQThHO0FBQzlHLHFEQUFtRDtBQUNuRCxrREFBcUQ7QUFHckQsTUFBTSx3QkFBd0IsR0FBRyxJQUFBLDBCQUFVLEVBQ3pDLDZCQUE2QixFQUM3QixLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQXFCLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO0lBQ3ZELE1BQU0scUJBQXFCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUEwQixDQUFBO0lBQ3pGLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFbEQseUJBQXlCO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtJQUNoRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7SUFDNUQsTUFBTSxZQUFZLEdBQUcsUUFBUSxRQUFRLElBQUksWUFBWSxFQUFFLENBQUE7SUFFdkQsa0NBQWtDO0lBQ2xDLE1BQU0sUUFBUSxHQUFHLE1BQU0scUJBQXFCLENBQUMsbUJBQW1CLENBQUM7UUFDL0QsSUFBSSxFQUFFLFlBQVk7UUFDbEIsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFBO0lBRUYseUNBQXlDO0lBQ3pDLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN0QixDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFO1FBQ2hELENBQUMsMEJBQWUsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRTtLQUNyRCxDQUFDLENBQUE7SUFFRixPQUFPLElBQUksNEJBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUN2RyxDQUFDLEVBQ0QsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7SUFDbEMsSUFBSSxDQUFDLFVBQVU7UUFBRSxPQUFNO0lBRXZCLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsVUFBVSxDQUFBO0lBQzdDLE1BQU0scUJBQXFCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQywwQkFBZSxDQUEwQixDQUFBO0lBQ3pGLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUE7SUFFbEQsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRTtRQUMvQyxDQUFDLDBCQUFlLENBQUMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRTtLQUNwRCxDQUFDLENBQUE7SUFDRixNQUFNLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FDRixDQUFBO0FBRVksUUFBQSxpQ0FBaUMsR0FBRyxJQUFBLDhCQUFjLEVBQzdELDZCQUE2QixFQUM3QixDQUFDLEtBQXdCLEVBQUUsRUFBRTtJQUMzQixNQUFNLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNsRCxPQUFPLElBQUksZ0NBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUNGLENBQUEifQ==