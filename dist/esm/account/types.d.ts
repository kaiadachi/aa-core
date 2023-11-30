import type { Address } from "abitype";
import type { Hash, Hex, Transport } from "viem";
import type { SignTypedDataParameters } from "viem/accounts";
import type { z } from "zod";
import type { SupportedTransports } from "../client/types";
import type { SmartAccountSigner } from "../signer/types";
import type { BatchUserOperationCallData } from "../types";
import type { SimpleSmartAccountParamsSchema, createBaseSmartAccountParamsSchema } from "./schema";
export type SignTypedDataParams = Omit<SignTypedDataParameters, "privateKey">;
export type BaseSmartAccountParams<TTransport extends SupportedTransports = Transport> = z.infer<ReturnType<typeof createBaseSmartAccountParamsSchema<TTransport>>>;
export type SimpleSmartAccountParams<TTransport extends SupportedTransports = Transport> = z.infer<ReturnType<typeof SimpleSmartAccountParamsSchema<TTransport>>>;
export interface ISmartContractAccount {
    getInitCode(): Promise<Hex>;
    getDummySignature(): Hex;
    encodeExecute(target: string, value: bigint, data: string): Promise<Hex>;
    encodeBatchExecute(txs: BatchUserOperationCallData): Promise<Hex>;
    getNonce(): Promise<bigint>;
    signUserOperationHash(uoHash: Hash): Promise<Hash>;
    signMessage(msg: string | Uint8Array | Hex): Promise<Hex>;
    signTypedData(params: SignTypedDataParams): Promise<Hash>;
    signMessageWith6492(msg: string | Uint8Array | Hex): Promise<Hex>;
    signTypedDataWith6492(params: SignTypedDataParams): Promise<Hash>;
    getAddress(): Promise<Address>;
    getOwner(): SmartAccountSigner | undefined;
    getFactoryAddress(): Address;
    getEntryPointAddress(): Address;
}
