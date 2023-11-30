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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = exports.filterUndefined = exports.isPercentage = exports.isBigNumberish = exports.defineReadOnly = exports.getUserOperationHash = exports.applyFeeOption = exports.deepHexlify = exports.resolveProperties = exports.asyncPipe = exports.getChain = void 0;
const viem_1 = require("viem");
const chains = __importStar(require("viem/chains"));
const bigint_js_1 = require("./bigint.js");
const schema_js_1 = require("./schema.js");
const getChain = (chainId) => {
    for (const chain of Object.values(chains)) {
        if (chain.id === chainId) {
            return chain;
        }
    }
    throw new Error("could not find chain");
};
exports.getChain = getChain;
const asyncPipe = (...fns) => async (s, o, f) => {
    let result = s;
    for (const fn of fns) {
        result = await fn(result, o, f);
    }
    return result;
};
exports.asyncPipe = asyncPipe;
async function resolveProperties(object) {
    const promises = Object.keys(object).map((key) => {
        const value = object[key];
        return Promise.resolve(value).then((v) => ({ key: key, value: v }));
    });
    const results = await Promise.all(promises);
    return results.reduce((accum, curr) => {
        accum[curr.key] = curr.value;
        return accum;
    }, {});
}
exports.resolveProperties = resolveProperties;
function deepHexlify(obj) {
    if (typeof obj === "function") {
        return undefined;
    }
    if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
        return obj;
    }
    else if (typeof obj === "bigint") {
        return (0, viem_1.toHex)(obj);
    }
    else if (obj._isBigNumber != null || typeof obj !== "object") {
        return (0, viem_1.toHex)(obj).replace(/^0x0/, "0x");
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce((set, key) => ({
        ...set,
        [key]: deepHexlify(obj[key]),
    }), {});
}
exports.deepHexlify = deepHexlify;
function applyFeeOption(value, feeOption) {
    if (feeOption == null) {
        return value ?? 0n;
    }
    return value
        ? (0, bigint_js_1.bigIntClamp)(feeOption.percentage
            ? (0, bigint_js_1.bigIntPercent)(value, BigInt(100 + feeOption.percentage))
            : value, feeOption.min, feeOption.max)
        : feeOption.min ?? 0n;
}
exports.applyFeeOption = applyFeeOption;
function getUserOperationHash(request, entryPointAddress, chainId) {
    const encoded = (0, viem_1.encodeAbiParameters)([{ type: "bytes32" }, { type: "address" }, { type: "uint256" }], [(0, viem_1.keccak256)(packUo(request)), entryPointAddress, chainId]);
    return (0, viem_1.keccak256)(encoded);
}
exports.getUserOperationHash = getUserOperationHash;
function packUo(request) {
    const hashedInitCode = (0, viem_1.keccak256)(request.initCode);
    const hashedCallData = (0, viem_1.keccak256)(request.callData);
    const hashedPaymasterAndData = (0, viem_1.keccak256)(request.paymasterAndData);
    return (0, viem_1.encodeAbiParameters)([
        { type: "address" },
        { type: "uint256" },
        { type: "bytes32" },
        { type: "bytes32" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "bytes32" },
    ], [
        request.sender,
        (0, viem_1.hexToBigInt)(request.nonce),
        hashedInitCode,
        hashedCallData,
        (0, viem_1.hexToBigInt)(request.callGasLimit),
        (0, viem_1.hexToBigInt)(request.verificationGasLimit),
        (0, viem_1.hexToBigInt)(request.preVerificationGas),
        (0, viem_1.hexToBigInt)(request.maxFeePerGas),
        (0, viem_1.hexToBigInt)(request.maxPriorityFeePerGas),
        hashedPaymasterAndData,
    ]);
}
function defineReadOnly(object, key, value) {
    Object.defineProperty(object, key, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
exports.defineReadOnly = defineReadOnly;
function isBigNumberish(x) {
    return schema_js_1.BigNumberishSchema.safeParse(x).success;
}
exports.isBigNumberish = isBigNumberish;
function isPercentage(x) {
    return schema_js_1.PercentageSchema.safeParse(x).success;
}
exports.isPercentage = isPercentage;
function filterUndefined(obj) {
    Object.keys(obj).forEach((key) => {
        if (obj[key] == null) {
            delete obj[key];
        }
    });
    return obj;
}
exports.filterUndefined = filterUndefined;
function pick(obj, keys) {
    return Object.keys(obj)
        .filter((k) => keys.includes(k))
        .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});
}
exports.pick = pick;
__exportStar(require("./bigint.js"), exports);
__exportStar(require("./defaults.js"), exports);
__exportStar(require("./schema.js"), exports);
__exportStar(require("./userop.js"), exports);
//# sourceMappingURL=index.js.map