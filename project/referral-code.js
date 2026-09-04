"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralCode = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.ReferralCode = utils_1.model.define("referral_code", {
    id: utils_1.model.id().primaryKey(),
    code: utils_1.model.text().unique(),
    is_active: utils_1.model.boolean().default(true),
});
exports.default = exports.ReferralCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJyYWwtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JlZmVycmFsL21vZGVscy9yZWZlcnJhbC1jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVwQyxRQUFBLFlBQVksR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRTtJQUN4RCxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRTtJQUMzQixTQUFTLEVBQUUsYUFBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FDekMsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsb0JBQVksQ0FBQSJ9