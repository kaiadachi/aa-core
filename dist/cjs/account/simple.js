"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleSmartContractAccount = void 0;
const viem_1 = require("viem");
const SimpleAccountAbi_js_1 = require("../abis/SimpleAccountAbi.js");
const SimpleAccountFactoryAbi_js_1 = require("../abis/SimpleAccountFactoryAbi.js");
const base_js_1 = require("./base.js");
const schema_js_1 = require("./schema.js");
class SimpleSmartContractAccount extends base_js_1.BaseSmartContractAccount {
    constructor(params) {
        (0, schema_js_1.SimpleSmartAccountParamsSchema)().parse(params);
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
        return (0, viem_1.encodeFunctionData)({
            abi: SimpleAccountAbi_js_1.SimpleAccountAbi,
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
        return (0, viem_1.encodeFunctionData)({
            abi: SimpleAccountAbi_js_1.SimpleAccountAbi,
            functionName: "executeBatch",
            args: [targets, datas],
        });
    }
    signMessage(msg) {
        if (typeof msg === "string" && msg.startsWith("0x")) {
            msg = (0, viem_1.hexToBytes)(msg);
        }
        else if (typeof msg === "string") {
            msg = new TextEncoder().encode(msg);
        }
        return this.owner.signMessage(msg);
    }
    async getAccountInitCode() {
        return (0, viem_1.concatHex)([
            this.factoryAddress,
            (0, viem_1.encodeFunctionData)({
                abi: SimpleAccountFactoryAbi_js_1.SimpleAccountFactoryAbi,
                functionName: "createAccount",
                args: [await this.owner.getAddress(), this.index],
            }),
        ]);
    }
}
exports.SimpleSmartContractAccount = SimpleSmartContractAccount;
//# sourceMappingURL=simple.js.map