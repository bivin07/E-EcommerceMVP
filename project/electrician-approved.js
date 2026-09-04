"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = electricianApprovedHandler;
const create_electrician_referral_1 = require("../workflows/create-electrician-referral");
async function electricianApprovedHandler({ event: { data }, container }) {
    const customerId = data.id;
    const query = container.resolve("query");
    // Fetch customer and check their groups and existing referral code
    const { data: [customer] } = await query.graph({
        entity: "customer",
        fields: ["id", "first_name", "groups.name", "referral_code.id"],
        filters: { id: customerId }
    });
    if (!customer)
        return;
    // Check if they are in the Electricians group
    const isElectrician = customer.groups?.some(group => group?.name === "Electricians");
    // Only generate if they are an Electrician and DO NOT already have a code
    const hasCode = Array.isArray(customer.referral_code) ? customer.referral_code.length > 0 : !!customer.referral_code;
    if (isElectrician && !hasCode) {
        // Run the workflow to generate their unique code
        await (0, create_electrician_referral_1.createElectricianReferralWorkflow)(container).run({
            input: { customer }
        });
    }
}
exports.config = {
    event: ["customer.updated", "customer.created"],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3RyaWNpYW4tYXBwcm92ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvZWxlY3RyaWNpYW4tYXBwcm92ZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsNkNBeUJDO0FBM0JELDBGQUE0RjtBQUU3RSxLQUFLLFVBQVUsMEJBQTBCLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQWtDO0lBQ3JILE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDMUIsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUV4QyxtRUFBbUU7SUFDbkUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdDLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDO1FBQy9ELE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUU7S0FDNUIsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFNO0lBRXJCLDhDQUE4QztJQUM5QyxNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUE7SUFFcEYsMEVBQTBFO0lBQzFFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0lBRXJILElBQUksYUFBYSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsaURBQWlEO1FBQ2pELE1BQU0sSUFBQSwrREFBaUMsRUFBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDckQsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFO1NBQ3BCLENBQUMsQ0FBQTtJQUNKLENBQUM7QUFDSCxDQUFDO0FBRVksUUFBQSxNQUFNLEdBQXFCO0lBQ3RDLEtBQUssRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO0NBQ2hELENBQUEifQ==