"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSmartAccountProviderConfigSchema = exports.SmartAccountProviderOptsSchema = exports.UserOperationFeeOptionsSchema = exports.UserOperationFeeOptionsFieldSchema = void 0;
const zod_1 = require("abitype/zod");
const zod_2 = __importDefault(require("zod"));
const schema_js_1 = require("../client/schema.js");
const index_js_1 = require("../utils/index.js");
exports.UserOperationFeeOptionsFieldSchema = index_js_1.BigNumberishRangeSchema.merge(index_js_1.PercentageSchema).partial();
exports.UserOperationFeeOptionsSchema = zod_2.default
    .object({
    maxFeePerGas: exports.UserOperationFeeOptionsFieldSchema,
    maxPriorityFeePerGas: exports.UserOperationFeeOptionsFieldSchema,
    callGasLimit: exports.UserOperationFeeOptionsFieldSchema,
    verificationGasLimit: exports.UserOperationFeeOptionsFieldSchema,
    preVerificationGas: exports.UserOperationFeeOptionsFieldSchema,
})
    .partial()
    .strict();
exports.SmartAccountProviderOptsSchema = zod_2.default
    .object({
    txMaxRetries: zod_2.default.number().min(0).optional(),
    txRetryIntervalMs: zod_2.default.number().min(0).optional(),
    txRetryMulitplier: zod_2.default.number().min(0).optional(),
    feeOptions: exports.UserOperationFeeOptionsSchema.optional(),
})
    .strict();
const createSmartAccountProviderConfigSchema = () => {
    return zod_2.default.object({
        rpcProvider: zod_2.default.union([
            zod_2.default.string(),
            (0, schema_js_1.createPublicErc4337ClientSchema)(),
        ]),
        chain: index_js_1.ChainSchema,
        entryPointAddress: zod_1.Address.optional(),
        opts: exports.SmartAccountProviderOptsSchema.optional(),
    });
};
exports.createSmartAccountProviderConfigSchema = createSmartAccountProviderConfigSchema;
//# sourceMappingURL=schema.js.map