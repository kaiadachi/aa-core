import type { BigNumberish } from "../types";
export declare const bigIntMax: (...args: bigint[]) => bigint;
export declare const bigIntMin: (...args: bigint[]) => bigint;
export declare const bigIntClamp: (value: BigNumberish, lower: BigNumberish | null | undefined, upper: BigNumberish | null | undefined) => bigint;
export declare const bigIntPercent: (base: BigNumberish, percent: bigint) => bigint;
