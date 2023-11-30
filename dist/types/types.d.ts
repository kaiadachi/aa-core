import type { Address, Hash } from "viem";
import type { z } from "zod";
import type { UserOperationFeeOptionsFieldSchema, UserOperationFeeOptionsSchema } from "./provider/schema";
import type { BigNumberishRangeSchema, BigNumberishSchema, HexSchema, PercentageSchema } from "./utils";
export type Hex = z.infer<typeof HexSchema>;
export type EmptyHex = `0x`;
export type PromiseOrValue<T> = T | Promise<T>;
export type BytesLike = Uint8Array | string;
export type Percentage = z.infer<typeof PercentageSchema>;
export type BigNumberish = z.infer<typeof BigNumberishSchema>;
export type BigNumberishRange = z.infer<typeof BigNumberishRangeSchema>;
export type UserOperationCallData = {
    target: Address;
    data: Hex;
    value?: bigint;
} | Hex;
export type BatchUserOperationCallData = Exclude<UserOperationCallData, Hex>[];
export type UserOperationFeeOptionsField = z.infer<typeof UserOperationFeeOptionsFieldSchema>;
export type UserOperationFeeOptions = z.infer<typeof UserOperationFeeOptionsSchema>;
export type UserOperationOverrides = Partial<Pick<UserOperationStruct, "callGasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas" | "paymasterAndData" | "preVerificationGas" | "verificationGasLimit">>;
export interface UserOperationRequest {
    sender: Address;
    nonce: Hex;
    initCode: Hex | EmptyHex;
    callData: Hex;
    callGasLimit: Hex;
    verificationGasLimit: Hex;
    preVerificationGas: Hex;
    maxFeePerGas: Hex;
    maxPriorityFeePerGas: Hex;
    paymasterAndData: Hex | EmptyHex;
    signature: Hex;
}
export interface UserOperationEstimateGasResponse {
    preVerificationGas: BigNumberish;
    verificationGasLimit: BigNumberish;
    callGasLimit: BigNumberish;
}
export interface UserOperationResponse {
    userOperation: UserOperationRequest;
    entryPoint: Address;
    blockNumber: BigNumberish;
    blockHash: Hash;
    transactionHash: Hash;
}
export interface UserOperationReceipt {
    userOpHash: Hash;
    entryPoint: Address;
    sender: Address;
    nonce: BigNumberish;
    paymaster?: Address;
    actualGasCost: BigNumberish;
    actualGasUsed: BigNumberish;
    success: boolean;
    reason?: string;
    logs: string[];
    receipt: UserOperationReceiptObject;
}
export interface UserOperationReceiptObject {
    blockHash: Hash;
    blockNumber: BigNumberish;
    transactionIndex: BigNumberish;
    transactionHash: Hash;
    from: Address;
    to: Address;
    cumulativeGasUsed: BigNumberish;
    gasUsed: BigNumberish;
    contractAddress: Address;
    logs: UserOperationReceiptLog[];
    logsBloom: Hex;
    root: Hex;
    status: number;
    effectiveGasPrice: BigNumberish;
    type: string;
}
export interface UserOperationReceiptLog {
    blockHash: Hash;
    blockNumber: BigNumberish;
    transactionIndex: BigNumberish;
    address: Address;
    logIndex: BigNumberish;
    data: Hex;
    removed: boolean;
    topics: string[];
    transactionHash: Hash;
}
export interface UserOperationStruct {
    sender: string;
    nonce: BigNumberish;
    initCode: BytesLike | "0x";
    callData: BytesLike;
    callGasLimit?: BigNumberish;
    verificationGasLimit?: BigNumberish;
    preVerificationGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
    paymasterAndData: BytesLike | "0x";
    signature: BytesLike;
}
//# sourceMappingURL=types.d.ts.map