import { encodeAbiParameters, hexToBigInt, keccak256, toHex } from "viem";
import * as chains from "viem/chains";
import { bigIntClamp, bigIntPercent } from "./bigint.js";
import { BigNumberishSchema, PercentageSchema } from "./schema.js";
export const getChain = (chainId) => {
    for (const chain of Object.values(chains)) {
        if (chain.id === chainId) {
            return chain;
        }
    }
    throw new Error("could not find chain");
};
export const asyncPipe = (...fns) => async (s, o, f) => {
    let result = s;
    for (const fn of fns) {
        result = await fn(result, o, f);
    }
    return result;
};
export async function resolveProperties(object) {
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
export function deepHexlify(obj) {
    if (typeof obj === "function") {
        return undefined;
    }
    if (obj == null || typeof obj === "string" || typeof obj === "boolean") {
        return obj;
    }
    else if (typeof obj === "bigint") {
        return toHex(obj);
    }
    else if (obj._isBigNumber != null || typeof obj !== "object") {
        return toHex(obj).replace(/^0x0/, "0x");
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce((set, key) => ({
        ...set,
        [key]: deepHexlify(obj[key]),
    }), {});
}
export function applyFeeOption(value, feeOption) {
    if (feeOption == null) {
        return value ?? 0n;
    }
    return value
        ? bigIntClamp(feeOption.percentage
            ? bigIntPercent(value, BigInt(100 + feeOption.percentage))
            : value, feeOption.min, feeOption.max)
        : feeOption.min ?? 0n;
}
export function getUserOperationHash(request, entryPointAddress, chainId) {
    const encoded = encodeAbiParameters([{ type: "bytes32" }, { type: "address" }, { type: "uint256" }], [keccak256(packUo(request)), entryPointAddress, chainId]);
    return keccak256(encoded);
}
function packUo(request) {
    const hashedInitCode = keccak256(request.initCode);
    const hashedCallData = keccak256(request.callData);
    const hashedPaymasterAndData = keccak256(request.paymasterAndData);
    return encodeAbiParameters([
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
        hexToBigInt(request.nonce),
        hashedInitCode,
        hashedCallData,
        hexToBigInt(request.callGasLimit),
        hexToBigInt(request.verificationGasLimit),
        hexToBigInt(request.preVerificationGas),
        hexToBigInt(request.maxFeePerGas),
        hexToBigInt(request.maxPriorityFeePerGas),
        hashedPaymasterAndData,
    ]);
}
export function defineReadOnly(object, key, value) {
    Object.defineProperty(object, key, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
export function isBigNumberish(x) {
    return BigNumberishSchema.safeParse(x).success;
}
export function isPercentage(x) {
    return PercentageSchema.safeParse(x).success;
}
export function filterUndefined(obj) {
    Object.keys(obj).forEach((key) => {
        if (obj[key] == null) {
            delete obj[key];
        }
    });
    return obj;
}
export function pick(obj, keys) {
    return Object.keys(obj)
        .filter((k) => keys.includes(k))
        .reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {});
}
export * from "./bigint.js";
export * from "./defaults.js";
export * from "./schema.js";
export * from "./userop.js";
//# sourceMappingURL=index.js.map