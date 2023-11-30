import type { Address } from "abitype";
import type { Hash, Hex, HttpTransport, RpcTransactionRequest, Transport } from "viem";
import type { SignTypedDataParameters } from "viem/accounts";
import type { z } from "zod";
import type { ISmartContractAccount, SignTypedDataParams } from "../account/types.js";
import type { PublicErc4337Client, SupportedTransports } from "../client/types.js";
import type { BatchUserOperationCallData, UserOperationCallData, UserOperationFeeOptions, UserOperationOverrides, UserOperationReceipt, UserOperationRequest, UserOperationResponse, UserOperationStruct } from "../types.js";
import type { Deferrable } from "../utils";
import type { SmartAccountProviderOptsSchema, createSmartAccountProviderConfigSchema } from "./schema.js";
type WithRequired<T, K extends keyof T> = Required<Pick<T, K>>;
type WithOptional<T, K extends keyof T> = Pick<Partial<T>, K>;
export type ConnectorData = {
    chainId?: Hex;
};
export interface ProviderEvents {
    chainChanged(chainId: Hex): void;
    accountsChanged(accounts: Address[]): void;
    connect(data: ConnectorData): void;
    message({ type, data }: {
        type: string;
        data?: unknown;
    }): void;
    disconnect(): void;
    error(error: Error): void;
}
export type SendUserOperationResult = {
    hash: Hash;
    request: UserOperationRequest;
};
export type AccountMiddlewareFn = (struct: Deferrable<UserOperationStruct>, overrides?: UserOperationOverrides, feeOptions?: UserOperationFeeOptions) => Promise<Deferrable<UserOperationStruct>>;
export type AccountMiddlewareOverrideFn<Req extends keyof UserOperationStruct = never, Opt extends keyof UserOperationStruct = never> = (struct: Deferrable<UserOperationStruct>, overrides?: UserOperationOverrides, feeOptions?: UserOperationFeeOptions) => Promise<WithRequired<UserOperationStruct, Req> & WithOptional<UserOperationStruct, Opt>>;
export type PaymasterAndDataMiddleware = AccountMiddlewareOverrideFn<"paymasterAndData", "callGasLimit" | "preVerificationGas" | "verificationGasLimit" | "maxFeePerGas" | "maxPriorityFeePerGas">;
export type GasEstimatorMiddleware = AccountMiddlewareOverrideFn<"callGasLimit" | "preVerificationGas" | "verificationGasLimit">;
export type FeeDataMiddleware = AccountMiddlewareOverrideFn<"maxFeePerGas" | "maxPriorityFeePerGas">;
export type SmartAccountProviderOpts = z.infer<typeof SmartAccountProviderOptsSchema>;
export type SmartAccountProviderConfig<TTransport extends SupportedTransports = Transport> = z.infer<ReturnType<typeof createSmartAccountProviderConfigSchema<TTransport>>>;
export interface ISmartAccountProvider<TTransport extends SupportedTransports = Transport> {
    readonly rpcClient: PublicErc4337Client<TTransport> | PublicErc4337Client<HttpTransport>;
    readonly dummyPaymasterDataMiddleware: AccountMiddlewareFn;
    readonly paymasterDataMiddleware: AccountMiddlewareFn;
    readonly gasEstimator: AccountMiddlewareFn;
    readonly feeDataGetter: AccountMiddlewareFn;
    readonly customMiddleware?: AccountMiddlewareFn;
    readonly account?: ISmartContractAccount;
    sendUserOperation: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<SendUserOperationResult>;
    dropAndReplaceUserOperation: (data: UserOperationRequest, overrides?: UserOperationOverrides) => Promise<SendUserOperationResult>;
    buildUserOperation: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<UserOperationStruct>;
    checkGasSponsorshipEligibility: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<boolean>;
    buildUserOperationFromTx: (tx: RpcTransactionRequest, overrides?: UserOperationOverrides) => Promise<UserOperationStruct>;
    waitForUserOperationTransaction: (hash: Hash) => Promise<Hash>;
    getUserOperationByHash: (hash: Hash) => Promise<UserOperationResponse | null>;
    getUserOperationReceipt: (hash: Hash) => Promise<UserOperationReceipt | null>;
    sendTransaction: (request: RpcTransactionRequest, overrides?: UserOperationOverrides) => Promise<Hash>;
    sendTransactions: (request: RpcTransactionRequest[], overrides?: UserOperationOverrides) => Promise<Hash>;
    request(args: {
        method: string;
        params?: any[];
    }): Promise<any>;
    signMessage: (msg: string | Uint8Array) => Promise<Hash>;
    signTypedData: (params: SignTypedDataParameters) => Promise<Hash>;
    signMessageWith6492(msg: string | Uint8Array | Hex): Promise<Hex>;
    signTypedDataWith6492(params: SignTypedDataParams): Promise<Hash>;
    getAddress: () => Promise<Address>;
    getEntryPointAddress: () => Address;
    isConnected: () => boolean;
    withPaymasterMiddleware: (overrides: {
        dummyPaymasterDataMiddleware?: PaymasterAndDataMiddleware;
        paymasterDataMiddleware?: PaymasterAndDataMiddleware;
    }) => this;
    withGasEstimator: (override: GasEstimatorMiddleware) => this;
    withFeeDataGetter: (override: FeeDataMiddleware) => this;
    withCustomMiddleware: (override: AccountMiddlewareFn) => this;
    connect<TAccount extends ISmartContractAccount>(fn: (provider: PublicErc4337Client<TTransport> | PublicErc4337Client<HttpTransport>) => TAccount): this & {
        account: TAccount;
    };
    disconnect(): this & {
        account: undefined;
    };
    extend: <R>(extendFn: (self: this) => R) => this & R;
}
export {};
