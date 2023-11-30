import type { Transport } from "viem";
import z from "zod";
import type { SupportedTransports } from "../client/types";
export declare const UserOperationFeeOptionsFieldSchema: z.ZodObject<{
    min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
    max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
    percentage: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    min?: number | bigint | `0x${string}` | undefined;
    max?: number | bigint | `0x${string}` | undefined;
    percentage?: number | undefined;
}, {
    min?: number | bigint | `0x${string}` | undefined;
    max?: number | bigint | `0x${string}` | undefined;
    percentage?: number | undefined;
}>;
export declare const UserOperationFeeOptionsSchema: z.ZodObject<{
    maxFeePerGas: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        percentage: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }>>;
    maxPriorityFeePerGas: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        percentage: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }>>;
    callGasLimit: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        percentage: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }>>;
    verificationGasLimit: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        percentage: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }>>;
    preVerificationGas: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
        percentage: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }, {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    maxFeePerGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    maxPriorityFeePerGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    callGasLimit?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    verificationGasLimit?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    preVerificationGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
}, {
    maxFeePerGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    maxPriorityFeePerGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    callGasLimit?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    verificationGasLimit?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
    preVerificationGas?: {
        min?: number | bigint | `0x${string}` | undefined;
        max?: number | bigint | `0x${string}` | undefined;
        percentage?: number | undefined;
    } | undefined;
}>;
export declare const SmartAccountProviderOptsSchema: z.ZodObject<{
    txMaxRetries: z.ZodOptional<z.ZodNumber>;
    txRetryIntervalMs: z.ZodOptional<z.ZodNumber>;
    txRetryMulitplier: z.ZodOptional<z.ZodNumber>;
    feeOptions: z.ZodOptional<z.ZodObject<{
        maxFeePerGas: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            percentage: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }>>;
        maxPriorityFeePerGas: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            percentage: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }>>;
        callGasLimit: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            percentage: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }>>;
        verificationGasLimit: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            percentage: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }>>;
        preVerificationGas: z.ZodOptional<z.ZodObject<{
            min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
            percentage: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }, {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        maxFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        maxPriorityFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        callGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        verificationGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        preVerificationGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
    }, {
        maxFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        maxPriorityFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        callGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        verificationGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        preVerificationGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    txMaxRetries?: number | undefined;
    txRetryIntervalMs?: number | undefined;
    txRetryMulitplier?: number | undefined;
    feeOptions?: {
        maxFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        maxPriorityFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        callGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        verificationGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        preVerificationGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
    } | undefined;
}, {
    txMaxRetries?: number | undefined;
    txRetryIntervalMs?: number | undefined;
    txRetryMulitplier?: number | undefined;
    feeOptions?: {
        maxFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        maxPriorityFeePerGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        callGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        verificationGasLimit?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
        preVerificationGas?: {
            min?: number | bigint | `0x${string}` | undefined;
            max?: number | bigint | `0x${string}` | undefined;
            percentage?: number | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const createSmartAccountProviderConfigSchema: <TTransport extends SupportedTransports = Transport>() => z.ZodObject<{
    rpcProvider: z.ZodUnion<[z.ZodString, z.ZodType<import("../client/types").PublicErc4337Client<TTransport>, z.ZodTypeDef, import("../client/types").PublicErc4337Client<TTransport>>]>;
    chain: z.ZodType<import("viem").Chain, z.ZodTypeDef, import("viem").Chain>;
    entryPointAddress: z.ZodOptional<z.ZodEffects<z.ZodString, `0x${string}`, string>>;
    opts: z.ZodOptional<z.ZodObject<{
        txMaxRetries: z.ZodOptional<z.ZodNumber>;
        txRetryIntervalMs: z.ZodOptional<z.ZodNumber>;
        txRetryMulitplier: z.ZodOptional<z.ZodNumber>;
        feeOptions: z.ZodOptional<z.ZodObject<{
            maxFeePerGas: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                percentage: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }>>;
            maxPriorityFeePerGas: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                percentage: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }>>;
            callGasLimit: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                percentage: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }>>;
            verificationGasLimit: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                percentage: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }>>;
            preVerificationGas: z.ZodOptional<z.ZodObject<{
                min: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                max: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>, z.ZodNumber, z.ZodBigInt]>>>;
                percentage: z.ZodOptional<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }, {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            }>>;
        }, "strict", z.ZodTypeAny, {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        }, {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        txMaxRetries?: number | undefined;
        txRetryIntervalMs?: number | undefined;
        txRetryMulitplier?: number | undefined;
        feeOptions?: {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        } | undefined;
    }, {
        txMaxRetries?: number | undefined;
        txRetryIntervalMs?: number | undefined;
        txRetryMulitplier?: number | undefined;
        feeOptions?: {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcProvider: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    entryPointAddress?: `0x${string}` | undefined;
    opts?: {
        txMaxRetries?: number | undefined;
        txRetryIntervalMs?: number | undefined;
        txRetryMulitplier?: number | undefined;
        feeOptions?: {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}, {
    chain: import("viem/_types/types/chain.js").ChainConstants & import("viem/_types/types/chain.js").ChainConfig<import("viem").ChainFormatters | undefined>;
    rpcProvider: (string | import("../client/types").PublicErc4337Client<TTransport>) & (string | import("../client/types").PublicErc4337Client<TTransport> | undefined);
    entryPointAddress?: string | undefined;
    opts?: {
        txMaxRetries?: number | undefined;
        txRetryIntervalMs?: number | undefined;
        txRetryMulitplier?: number | undefined;
        feeOptions?: {
            maxFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            maxPriorityFeePerGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            callGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            verificationGasLimit?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
            preVerificationGas?: {
                min?: number | bigint | `0x${string}` | undefined;
                max?: number | bigint | `0x${string}` | undefined;
                percentage?: number | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
}>;
