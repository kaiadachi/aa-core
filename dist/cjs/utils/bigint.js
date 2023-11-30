"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigIntPercent = exports.bigIntClamp = exports.bigIntMin = exports.bigIntMax = void 0;
const bigIntMax = (...args) => {
    if (!args.length) {
        throw new Error("bigIntMax requires at least one argument");
    }
    return args.reduce((m, c) => (m > c ? m : c));
};
exports.bigIntMax = bigIntMax;
const bigIntMin = (...args) => {
    if (!args.length) {
        throw new Error("bigIntMin requires at least one argument");
    }
    return args.reduce((m, c) => (m < c ? m : c));
};
exports.bigIntMin = bigIntMin;
const bigIntClamp = (value, lower, upper) => {
    lower = lower != null ? BigInt(lower) : null;
    upper = upper != null ? BigInt(upper) : null;
    if (upper != null && lower != null && upper < lower) {
        throw new Error(`invalid range: upper bound ${upper} is less than lower bound ${lower}`);
    }
    let ret = BigInt(value);
    if (lower != null && lower > ret) {
        ret = lower;
    }
    if (upper != null && upper < ret) {
        ret = upper;
    }
    return ret;
};
exports.bigIntClamp = bigIntClamp;
const bigIntPercent = (base, percent) => {
    return (BigInt(base) * percent) / 100n;
};
exports.bigIntPercent = bigIntPercent;
//# sourceMappingURL=bigint.js.map