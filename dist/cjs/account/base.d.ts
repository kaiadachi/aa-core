import type { Address } from "abitype";
import { type Chain, type GetContractReturnType, type Hash, type Hex, type HttpTransport, type PublicClient, type Transport } from "viem";
import { EntryPointAbi } from "../abis/EntryPointAbi.js";
import type { PublicErc4337Client, SupportedTransports } from "../client/types.js";
import type { SmartAccountSigner } from "../signer/types.js";
import type { BatchUserOperationCallData } from "../types.js";
import type { BaseSmartAccountParams, ISmartContractAccount, SignTypedDataParams } from "./types.js";
export declare enum DeploymentState {
    UNDEFINED = "0x0",
    NOT_DEPLOYED = "0x1",
    DEPLOYED = "0x2"
}
export declare abstract class BaseSmartContractAccount<TTransport extends SupportedTransports = Transport> implements ISmartContractAccount {
    protected factoryAddress: Address;
    protected deploymentState: DeploymentState;
    accountAddress?: Address;
    protected accountInitCode?: Hex;
    protected owner: SmartAccountSigner | undefined;
    protected entryPoint: GetContractReturnType<typeof EntryPointAbi, PublicClient, Chain>;
    protected entryPointAddress: Address;
    protected rpcProvider: PublicErc4337Client<TTransport> | PublicErc4337Client<HttpTransport>;
    constructor(params_: BaseSmartAccountParams<TTransport>);
    abstract getDummySignature(): Hash;
    abstract encodeExecute(target: string, value: bigint, data: string): Promise<Hash>;
    abstract signMessage(msg: string | Uint8Array): Promise<Hash>;
    protected abstract getAccountInitCode(): Promise<Hash>;
    signUserOperationHash(uoHash: Hash): Promise<Hash>;
    signTypedData(_params: SignTypedDataParams): Promise<`0x${string}`>;
    signMessageWith6492(msg: string | Uint8Array): Promise<`0x${string}`>;
    signTypedDataWith6492(params: SignTypedDataParams): Promise<`0x${string}`>;
    encodeBatchExecute(_txs: BatchUserOperationCallData): Promise<`0x${string}`>;
    getNonce(): Promise<bigint>;
    getInitCode(): Promise<Hex>;
    getAddress(): Promise<Address>;
    setAddress(addr: Address): Promise<void>;
    getOwner(): SmartAccountSigner | undefined;
    getFactoryAddress(): Address;
    getEntryPointAddress(): Address;
    isAccountDeployed(): Promise<boolean>;
    getDeploymentState(): Promise<DeploymentState>;
    protected parseFactoryAddressFromAccountInitCode(): Promise<[
        Address,
        Hex
    ]>;
    private _getAccountInitCode;
    private create6492Signature;
}
