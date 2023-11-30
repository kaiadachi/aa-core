"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSmartAccountParamsSchema = exports.createBaseSmartAccountParamsSchema = void 0;
const zod_1 = require("abitype/zod");
const viem_1 = require("viem");
const zod_2 = __importDefault(require("zod"));
const schema_js_1 = require("../client/schema.js");
const schema_js_2 = require("../signer/schema.js");
const index_js_1 = require("../utils/index.js");
const createBaseSmartAccountParamsSchema = () => zod_2.default.object({
    rpcClient: zod_2.default.union([
        zod_2.default.string(),
        (0, schema_js_1.createPublicErc4337ClientSchema)(),
    ]),
    factoryAddress: zod_1.Address,
    owner: schema_js_2.SignerSchema.optional(),
    entryPointAddress: zod_1.Address.optional(),
    chain: index_js_1.ChainSchema,
    accountAddress: zod_1.Address.optional().describe("Optional override for the account address."),
    initCode: zod_2.default
        .string()
        .refine(viem_1.isHex, "initCode must be a valid hex.")
        .optional()
        .describe("Optional override for the account init code."),
});
exports.createBaseSmartAccountParamsSchema = createBaseSmartAccountParamsSchema;
const SimpleSmartAccountParamsSchema = () => (0, exports.createBaseSmartAccountParamsSchema)().extend({
    owner: schema_js_2.SignerSchema,
    index: zod_2.default.bigint().optional(),
});
exports.SimpleSmartAccountParamsSchema = SimpleSmartAccountParamsSchema;
//# sourceMappingURL=schema.js.map