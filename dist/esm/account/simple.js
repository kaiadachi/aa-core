import { concatHex, encodeFunctionData, hexToBytes, } from "viem";
import { SimpleAccountAbi } from "../abis/SimpleAccountAbi.js";
import { SimpleAccountFactoryAbi } from "../abis/SimpleAccountFactoryAbi.js";
import { BaseSmartContractAccount } from "./base.js";
import { SimpleSmartAccountParamsSchema } from "./schema.js";
export class SimpleSmartContractAccount extends BaseSmartContractAccount {
    constructor(params) {
        SimpleSmartAccountParamsSchema().parse(params);
        super(params);
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.owner = params.owner;
        this.index = params.index ?? 0n;
    }
    getDummySignature() {
        return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
    }
    async encodeExecute(target, value, data) {
        return encodeFunctionData({
            abi: SimpleAccountAbi,
            functionName: "execute",
            args: [target, value, data],
        });
    }
    async encodeBatchExecute(txs) {
        const [targets, datas] = txs.reduce((accum, curr) => {
            accum[0].push(curr.target);
            accum[1].push(curr.data);
            return accum;
        }, [[], []]);
        return encodeFunctionData({
            abi: SimpleAccountAbi,
            functionName: "executeBatch",
            args: [targets, datas],
        });
    }
    signMessage(msg) {
        if (typeof msg === "string" && msg.startsWith("0x")) {
            msg = hexToBytes(msg);
        }
        else if (typeof msg === "string") {
            msg = new TextEncoder().encode(msg);
        }
        return this.owner.signMessage(msg);
    }
    async getAccountInitCode() {
        return concatHex([
            this.factoryAddress,
            encodeFunctionData({
                abi: SimpleAccountFactoryAbi,
                functionName: "createAccount",
                args: [await this.owner.getAddress(), this.index],
            }),
        ]);
    }
}
//# sourceMappingURL=simple.js.map