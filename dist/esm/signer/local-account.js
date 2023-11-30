import { isHex, } from "viem";
import { mnemonicToAccount, privateKeyToAccount } from "viem/accounts";
export class LocalAccountSigner {
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
                if (typeof msg === "string" && !isHex(msg)) {
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
        const owner = mnemonicToAccount(key);
        return new LocalAccountSigner(owner);
    }
    static privateKeyToAccountSigner(key) {
        const owner = privateKeyToAccount(key);
        return new LocalAccountSigner(owner);
    }
}
//# sourceMappingURL=local-account.js.map