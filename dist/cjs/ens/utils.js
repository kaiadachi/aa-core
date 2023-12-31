"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCoinTypeToChain = exports.convertCoinTypeToChainId = exports.convertChainIdToCoinType = exports.ChainsById = void 0;
const chains = __importStar(require("viem/chains"));
const chains_1 = require("viem/chains");
exports.ChainsById = new Map(Object.values(chains).map((x) => [x.id, x]));
const convertChainIdToCoinType = (chainId) => {
    if (chainId === chains_1.mainnet.id) {
        return 60;
    }
    return (0x80000000 | chainId) >>> 0;
};
exports.convertChainIdToCoinType = convertChainIdToCoinType;
const convertCoinTypeToChainId = (coinType) => {
    if (coinType === 60) {
        return chains_1.mainnet.id;
    }
    return (0x7fffffff & coinType) >> 0;
};
exports.convertCoinTypeToChainId = convertCoinTypeToChainId;
const convertCoinTypeToChain = (coinType) => {
    const chainId = (0, exports.convertCoinTypeToChainId)(coinType);
    const chain = exports.ChainsById.get(chainId);
    if (!chain) {
        throw new Error("CoinType does not map to a supported chain");
    }
    return chain;
};
exports.convertCoinTypeToChain = convertCoinTypeToChain;
//# sourceMappingURL=utils.js.map