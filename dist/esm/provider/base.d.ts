import { default as EventEmitter } from "eventemitter3";
import { type Address, type Chain, type Hash, type HttpTransport, type RpcTransactionRequest, type Transaction, type Transport } from "viem";
import type { ISmartContractAccount, SignTypedDataParams } from "../account/types.js";
import type { PublicErc4337Client, SupportedTransports } from "../client/types.js";
import { type BatchUserOperationCallData, type UserOperationCallData, type UserOperationOverrides, type UserOperationReceipt, type UserOperationRequest, type UserOperationResponse, type UserOperationStruct } from "../types.js";
import type { AccountMiddlewareFn, FeeDataMiddleware, GasEstimatorMiddleware, ISmartAccountProvider, PaymasterAndDataMiddleware, ProviderEvents, SendUserOperationResult, SmartAccountProviderConfig } from "./types.js";
export declare const noOpMiddleware: AccountMiddlewareFn;
export declare class SmartAccountProvider<TTransport extends SupportedTransports = Transport> extends EventEmitter<ProviderEvents> implements ISmartAccountProvider<TTransport> {
    private txMaxRetries;
    private txRetryIntervalMs;
    private txRetryMulitplier;
    private feeOptions;
    readonly account?: ISmartContractAccount;
    protected entryPointAddress?: Address;
    protected chain: Chain;
    rpcClient: PublicErc4337Client<TTransport> | PublicErc4337Client<HttpTransport>;
    constructor(config: SmartAccountProviderConfig<TTransport>);
    request: (args: {
        method: string;
        params?: any[];
    }) => Promise<any>;
    getAddress: () => Promise<`0x${string}`>;
    signMessage: (msg: string | Uint8Array) => Promise<Hash>;
    signTypedData: (params: SignTypedDataParams) => Promise<Hash>;
    signMessageWith6492: (msg: string | Uint8Array) => Promise<`0x${string}`>;
    signTypedDataWith6492: (params: SignTypedDataParams) => Promise<`0x${string}`>;
    sendTransaction: (request: RpcTransactionRequest, overrides?: UserOperationOverrides) => Promise<Hash>;
    buildUserOperationFromTx: (request: RpcTransactionRequest, overrides?: UserOperationOverrides) => Promise<UserOperationStruct>;
    buildUserOperationFromTxs: (requests: RpcTransactionRequest[], overrides?: UserOperationOverrides) => {
        batch: {
            target: `0x${string}`;
            data: `0x${string}`;
            value: bigint;
        }[];
        overrides: Partial<Pick<UserOperationStruct, "paymasterAndData" | "callGasLimit" | "verificationGasLimit" | "preVerificationGas" | "maxFeePerGas" | "maxPriorityFeePerGas">> | undefined;
    };
    sendTransactions: (requests: RpcTransactionRequest[], overrides?: UserOperationOverrides) => Promise<`0x${string}`>;
    waitForUserOperationTransaction: (hash: Hash) => Promise<Hash>;
    getUserOperationByHash: (hash: Hash) => Promise<UserOperationResponse | null>;
    getUserOperationReceipt: (hash: Hash) => Promise<UserOperationReceipt | null>;
    getTransaction: (hash: Hash) => Promise<Transaction>;
    buildUserOperation: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<UserOperationStruct>;
    sendUserOperation: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<SendUserOperationResult>;
    dropAndReplaceUserOperation: (uoToDrop: UserOperationRequest, overrides?: UserOperationOverrides) => Promise<SendUserOperationResult>;
    checkGasSponsorshipEligibility: (data: UserOperationCallData | BatchUserOperationCallData, overrides?: UserOperationOverrides) => Promise<boolean>;
    private _runMiddlewareStack;
    private _sendUserOperation;
    readonly dummyPaymasterDataMiddleware: AccountMiddlewareFn;
    readonly overridePaymasterDataMiddleware: AccountMiddlewareFn;
    readonly paymasterDataMiddleware: AccountMiddlewareFn;
    readonly gasEstimator: AccountMiddlewareFn;
    readonly feeDataGetter: AccountMiddlewareFn;
    readonly customMiddleware: AccountMiddlewareFn;
    readonly simulateUOMiddleware: AccountMiddlewareFn;
    withPaymasterMiddleware: (overrides: {
        dummyPaymasterDataMiddleware?: PaymasterAndDataMiddleware;
        paymasterDataMiddleware?: PaymasterAndDataMiddleware;
    }) => this;
    withGasEstimator: (override: GasEstimatorMiddleware) => this;
    withFeeDataGetter: (override: FeeDataMiddleware) => this;
    withCustomMiddleware: (override: AccountMiddlewareFn) => this;
    withSimulateUOMiddleware: (override: AccountMiddlewareFn) => this;
    connect: <TAccount extends ISmartContractAccount>(fn: (provider: PublicErc4337Client<TTransport> | PublicErc4337Client<HttpTransport>) => TAccount) => this & {
        account: TAccount;
    };
    disconnect: () => this & {
        account: undefined;
    };
    isConnected: <TAccount extends ISmartContractAccount>() => this is this & {
        account: TAccount;
    };
    getEntryPointAddress: () => Address;
    extend: <R>(fn: (self: this) => R) => this & R;
    private overrideMiddlewareFunction;
}
