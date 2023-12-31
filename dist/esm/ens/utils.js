import * as chains from "viem/chains";
import { mainnet } from "viem/chains";
export const ChainsById = new Map(Object.values(chains).map((x) => [x.id, x]));
export const convertChainIdToCoinType = (chainId) => {
    if (chainId === mainnet.id) {
        return 60;
    }
    return (0x80000000 | chainId) >>> 0;
};
export const convertCoinTypeToChainId = (coinType) => {
    if (coinType === 60) {
        return mainnet.id;
    }
    return (0x7fffffff & coinType) >> 0;
};
export const convertCoinTypeToChain = (coinType) => {
    const chainId = convertCoinTypeToChainId(coinType);
    const chain = ChainsById.get(chainId);
    if (!chain) {
        throw new Error("CoinType does not map to a supported chain");
    }
    return chain;
};
//# sourceMappingURL=utils.js.map