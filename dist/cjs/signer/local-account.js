"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalAccountSigner = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
class LocalAccountSigner {
    constructor(inner) {
        Object.defineProperty(this, "inner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "signerType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "signMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (msg) => {
                if (typeof msg === "string" && !(0, viem_1.isHex)(msg)) {
                    return this.inner.signMessage({
                        message: msg,
                    });
                }
                else {
                    return this.inner.signMessage({
                        message: {
                            raw: msg,
                        },
                    });
                }
            }
        });
        Object.defineProperty(this, "signTypedData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params) => {
                return this.inner.signTypedData(params);
            }
        });
        Object.defineProperty(this, "getAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                return this.inner.address;
            }
        });
        this.inner = inner;
        this.signerType = inner.type;
    }
    static mnemonicToAccountSigner(key) {
        const owner = (0, accounts_1.mnemonicToAccount)(key);
        return new LocalAccountSigner(owner);
    }
    static privateKeyToAccountSigner(key) {
        const owner = (0, accounts_1.privateKeyToAccount)(key);
        return new LocalAccountSigner(owner);
    }
}
exports.LocalAccountSigner = LocalAccountSigner;
//# sourceMappingURL=local-account.js.map