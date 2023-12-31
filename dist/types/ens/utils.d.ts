import * as chains from "viem/chains";
import { type Chain } from "viem/chains";
export declare const ChainsById: Map<number, chains.Chain>;
export declare const convertChainIdToCoinType: (chainId: number) => number;
export declare const convertCoinTypeToChainId: (coinType: number) => number;
export declare const convertCoinTypeToChain: (coinType: number) => Chain;
//# sourceMappingURL=utils.d.ts.map