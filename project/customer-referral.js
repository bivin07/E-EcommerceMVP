"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const customer_1 = __importDefault(require("@medusajs/medusa/customer"));
const referral_1 = __importDefault(require("../modules/referral"));
exports.default = (0, utils_1.defineLink)(customer_1.default.linkable.customer, {
    linkable: referral_1.default.linkable.referralCode,
    isList: false, // One customer (electrician) has one referral code
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItcmVmZXJyYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGlua3MvY3VzdG9tZXItcmVmZXJyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxxREFBc0Q7QUFDdEQseUVBQXNEO0FBQ3RELG1FQUFnRDtBQUVoRCxrQkFBZSxJQUFBLGtCQUFVLEVBQ3ZCLGtCQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDaEM7SUFDRSxRQUFRLEVBQUUsa0JBQWMsQ0FBQyxRQUFRLENBQUMsWUFBWTtJQUM5QyxNQUFNLEVBQUUsS0FBSyxFQUFFLG1EQUFtRDtDQUNuRSxDQUNGLENBQUEifQ==