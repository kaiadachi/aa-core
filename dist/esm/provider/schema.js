import { Address } from "abitype/zod";
import z from "zod";
import { createPublicErc4337ClientSchema } from "../client/schema.js";
import { BigNumberishRangeSchema, ChainSchema, PercentageSchema, } from "../utils/index.js";
export const UserOperationFeeOptionsFieldSchema = BigNumberishRangeSchema.merge(PercentageSchema).partial();
export const UserOperationFeeOptionsSchema = z
    .object({
    maxFeePerGas: UserOperationFeeOptionsFieldSchema,
    maxPriorityFeePerGas: UserOperationFeeOptionsFieldSchema,
    callGasLimit: UserOperationFeeOptionsFieldSchema,
    verificationGasLimit: UserOperationFeeOptionsFieldSchema,
    preVerificationGas: UserOperationFeeOptionsFieldSchema,
})
    .partial()
    .strict();
export const SmartAccountProviderOptsSchema = z
    .object({
    txMaxRetries: z.number().min(0).optional(),
    txRetryIntervalMs: z.number().min(0).optional(),
    txRetryMulitplier: z.number().min(0).optional(),
    feeOptions: UserOperationFeeOptionsSchema.optional(),
})
    .strict();
export const createSmartAccountProviderConfigSchema = () => {
    return z.object({
        rpcProvider: z.union([
            z.string(),
            createPublicErc4337ClientSchema(),
        ]),
        chain: ChainSchema,
        entryPointAddress: Address.optional(),
        opts: SmartAccountProviderOptsSchema.optional(),
    });
};
//# sourceMappingURL=schema.js.map