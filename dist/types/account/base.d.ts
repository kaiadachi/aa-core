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
    /**
     * This method should return a signature that will not `revert` during validation.
     * It does not have to pass validation, just not cause the contract to revert.
     * This is required for gas estimation so that the gas estimate are accurate.
     *
     */
    abstract getDummySignature(): Hash;
    /**
     * this method should return the abi encoded function data for a call to your contract's `execute` method
     *
     * @param target -- equivalent to `to` in a normal transaction
     * @param value -- equivalent to `value` in a normal transaction
     * @param data -- equivalent to `data` in a normal transaction
     * @returns abi encoded function data for a call to your contract's `execute` method
     */
    abstract encodeExecute(target: string, value: bigint, data: string): Promise<Hash>;
    /**
     * this should return an ERC-191 compliant message and is used to sign UO Hashes
     *
     * @param msg -- the message to sign
     */
    abstract signMessage(msg: string | Uint8Array): Promise<Hash>;
    /**
     * this should return the init code that will be used to create an account if one does not exist.
     * This is the concatenation of the account's factory address and the abi encoded function data of the account factory's `createAccount` method.
     * https://github.com/eth-infinitism/account-abstraction/blob/abff2aca61a8f0934e533d0d352978055fddbd96/contracts/core/SenderCreator.sol#L12
     */
    protected abstract getAccountInitCode(): Promise<Hash>;
    /**
     * If your account handles 1271 signatures of personal_sign differently
     * than it does UserOperations, you can implement two different approaches to signing
     *
     * @param uoHash -- The hash of the UserOperation to sign
     * @returns the signature of the UserOperation
     */
    signUserOperationHash(uoHash: Hash): Promise<Hash>;
    /**
     * If your contract supports signing and verifying typed data,
     * you should implement this method.
     *
     * @param _params -- Typed Data params to sign
     */
    signTypedData(_params: SignTypedDataParams): Promise<`0x${string}`>;
    /**
     * This method should wrap the result of `signMessage` as per
     * [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492)
     *
     * @param msg -- the message to sign
     */
    signMessageWith6492(msg: string | Uint8Array): Promise<`0x${string}`>;
    /**
     * Similar to the signMessageWith6492 method above,
     * this method should wrap the result of `signTypedData` as per
     * [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492)
     *
     * @param params -- Typed Data params to sign
     */
    signTypedDataWith6492(params: SignTypedDataParams): Promise<`0x${string}`>;
    /**
     * Not all contracts support batch execution.
     * If your contract does, this method should encode a list of
     * transactions into the call data that will be passed to your
     * contract's batch execution method.
     *
     * @param _txs -- the transactions to batch execute
     */
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
    /**
     * https://eips.ethereum.org/EIPS/eip-4337#first-time-account-creation
     * The initCode field (if non-zero length) is parsed as a 20-byte address,
     * followed by calldata to pass to this address.
     * The factory address is the first 40 char after the 0x, and the callData is the rest.
     */
    protected parseFactoryAddressFromAccountInitCode(): Promise<[
        Address,
        Hex
    ]>;
    private _getAccountInitCode;
    private create6492Signature;
}
//# sourceMappingURL=base.d.ts.map