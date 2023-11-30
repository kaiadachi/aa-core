import type { Address, Hash } from "viem";
import * as chains from "viem/chains";
import type { BigNumberish, Percentage, PromiseOrValue, UserOperationFeeOptionsField, UserOperationRequest } from "../types.js";
/**
 * Utility method for converting a chainId to a {@link chains.Chain} object
 *
 * @param chainId
 * @returns a {@link chains.Chain} object for the given chainId
 * @throws if the chainId is not found
 */
export declare const getChain: (chainId: number) => chains.Chain;
/**
 * Utility function that allows for piping a series of async functions together
 *
 * @param fns - functions to pipe
 * @returns result of the pipe
 */
export declare const asyncPipe: <S, O, F>(...fns: ((s: S, o?: O | undefined, f?: F | undefined) => Promise<S>)[]) => (s: S, o?: O | undefined, f?: F | undefined) => Promise<S>;
export type Deferrable<T> = {
    [K in keyof T]: PromiseOrValue<T[K]>;
};
/**
 * Await all of the properties of a {@link Deferrable} object
 *
 * @param object - a {@link Deferrable} object
 * @returns the object with its properties resolved
 */
export declare function resolveProperties<T>(object: Deferrable<T>): Promise<T>;
/**
 * Recursively converts all values in an object to hex strings
 *
 * @param obj - obj to deep hexlify
 * @returns object with all of its values hexlified
 */
export declare function deepHexlify(obj: any): any;
export declare function applyFeeOption(value: BigNumberish | undefined, feeOption?: UserOperationFeeOptionsField): BigNumberish;
/**
 * Generates a hash for a UserOperation valid from entrypoint version 0.6 onwards
 *
 * @param request - the UserOperation to get the hash for
 * @param entryPointAddress - the entry point address that will be used to execute the UserOperation
 * @param chainId - the chain on which this UserOperation will be executed
 * @returns the hash of the UserOperation
 */
export declare function getUserOperationHash(request: UserOperationRequest, entryPointAddress: Address, chainId: bigint): Hash;
export declare function defineReadOnly<T, K extends keyof T>(object: T, key: K, value: T[K]): void;
export declare function isBigNumberish(x: any): x is BigNumberish;
export declare function isPercentage(x: any): x is Percentage;
export declare function filterUndefined(obj: Record<string, unknown>): Record<string, unknown>;
export declare function pick(obj: Record<string, unknown>, keys: string | string[]): {};
export * from "./bigint.js";
export * from "./defaults.js";
export * from "./schema.js";
export * from "./userop.js";
//# sourceMappingURL=index.d.ts.map