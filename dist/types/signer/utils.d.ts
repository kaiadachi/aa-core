import { type Address, type Hash, type PublicClient, type Hex } from "viem";
export type SignWith6492Params = {
    factoryAddress: Address;
    factoryCalldata: Hex;
    signature: Hash;
};
type VerifyEIP6492SignatureParams = {
    signer: Address;
    hash: Hash;
    signature: Hash;
    client: PublicClient;
};
export declare const wrapSignatureWith6492: ({ factoryAddress, factoryCalldata, signature, }: SignWith6492Params) => Hash;
export declare const verifyEIP6492Signature: ({ signer, hash, signature, client, }: VerifyEIP6492SignatureParams) => Promise<boolean>;
export {};
//# sourceMappingURL=utils.d.ts.map