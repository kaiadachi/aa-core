export const bigIntMax = (...args) => {
    if (!args.length) {
        throw new Error("bigIntMax requires at least one argument");
    }
    return args.reduce((m, c) => (m > c ? m : c));
};
export const bigIntMin = (...args) => {
    if (!args.length) {
        throw new Error("bigIntMin requires at least one argument");
    }
    return args.reduce((m, c) => (m < c ? m : c));
};
export const bigIntClamp = (value, lower, upper) => {
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
export const bigIntPercent = (base, percent) => {
    return (BigInt(base) * percent) / 100n;
};
//# sourceMappingURL=bigint.js.map