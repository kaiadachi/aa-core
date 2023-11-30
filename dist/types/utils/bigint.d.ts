import type { BigNumberish } from "../types";
/**
 * Returns the max bigint in a list of bigints
 *
 * @param args a list of bigints to get the max of
 * @returns the max bigint in the list
 */
export declare const bigIntMax: (...args: bigint[]) => bigint;
/**
 * Returns the min bigint in a list of bigints
 *
 * @param args a list of bigints to get the max of
 * @returns the min bigint in the list
 */
export declare const bigIntMin: (...args: bigint[]) => bigint;
/**
 * Given a bigint and a min-max range, returns the min-max clamped bigint value
 *
 * @param value a bigint value to clamp
 * @param lower lower bound min max tuple value
 * @param upper upper bound min max tuple value
 * @returns the clamped bigint value per given range
 */
export declare const bigIntClamp: (value: BigNumberish, lower: BigNumberish | null | undefined, upper: BigNumberish | null | undefined) => bigint;
/**
 * Useful if you want to increment a bigint by N% or decrement by N%
 *
 * example:
 * ```
 * const tenPercentIncrease = bigIntPercent(100n, 110n);
 * const tenPercentDecrease = bigIntPercent(100n, 90n);
 * ```
 *
 * @param base -- the base bigint that we want to apply a percent to
 * @param percent -- the percent to apply to the base
 * @returns the base multiplied by the percent and divided by 100
 */
export declare const bigIntPercent: (base: BigNumberish, percent: bigint) => bigint;
//# sourceMappingURL=bigint.d.ts.map