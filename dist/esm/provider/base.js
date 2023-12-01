import { default as EventEmitter } from "eventemitter3";
import { fromHex, toHex, } from "viem";
import { createPublicErc4337Client } from "../client/create-client.js";
import { Logger } from "../logger.js";
import {} from "../types.js";
import { applyFeeOption, asyncPipe, bigIntMax, bigIntPercent, deepHexlify, defineReadOnly, filterUndefined, getDefaultEntryPointAddress, getDefaultUserOperationFeeOptions, getUserOperationHash, isValidRequest, resolveProperties, } from "../utils/index.js";
import { createSmartAccountProviderConfigSchema } from "./schema.js";
export const noOpMiddleware = async (struct, _overrides, _feeOptions) => struct;
export class SmartAccountProvider extends EventEmitter {
    constructor(config) {
        createSmartAccountProviderConfigSchema().parse(config);
        const { rpcProvider, entryPointAddress, chain, opts } = config;
        super();
        Object.defineProperty(this, "txMaxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "txRetryIntervalMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "txRetryMulitplier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "feeOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "account", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entryPointAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rpcClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "request", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (args) => {
                const { method, params } = args;
                switch (method) {
                    case "eth_sendTransaction":
                        const [tx] = params;
                        return this.sendTransaction(tx);
                    case "eth_sign":
                        const [address, data] = params;
                        if (address !== (await this.getAddress())) {
                            throw new Error("cannot sign for address that is not the current account");
                        }
                        return this.signMessage(data);
                    case "personal_sign": {
                        const [data, address] = params;
                        if (address !== (await this.getAddress())) {
                            throw new Error("cannot sign for address that is not the current account");
                        }
                        return this.signMessage(data);
                    }
                    case "eth_signTypedData_v4": {
                        const [address, dataParams] = params;
                        if (address !== (await this.getAddress())) {
                            throw new Error("cannot sign for address that is not the current account");
                        }
                        return this.signTypedData(dataParams);
                    }
                    case "eth_chainId":
                        return this.chain.id;
                    default:
                        return this.rpcClient.request(args);
                }
            }
        });
        Object.defineProperty(this, "getAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.getAddress();
            }
        });
        Object.defineProperty(this, "setAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (addr) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                this.account.setAddress(addr);
            }
        });
        Object.defineProperty(this, "signMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (msg) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.signMessage(msg);
            }
        });
        Object.defineProperty(this, "signTypedData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (params) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.signTypedData(params);
            }
        });
        Object.defineProperty(this, "signMessageWith6492", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (msg) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.signMessageWith6492(msg);
            }
        });
        Object.defineProperty(this, "signTypedDataWith6492", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (params) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                return this.account.signTypedDataWith6492(params);
            }
        });
        Object.defineProperty(this, "sendTransaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, overrides) => {
                const uoStruct = await this.buildUserOperationFromTx(request, overrides);
                const { hash } = await this._sendUserOperation(uoStruct);
                return await this.waitForUserOperationTransaction(hash);
            }
        });
        Object.defineProperty(this, "buildUserOperationFromTx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request, overrides) => {
                if (!request.to) {
                    throw new Error("transaction is missing to address");
                }
                const _overrides = {
                    maxFeePerGas: overrides?.maxFeePerGas != null
                        ? overrides?.maxFeePerGas
                        : request.maxFeePerGas
                            ? fromHex(request.maxFeePerGas, "bigint")
                            : undefined,
                    maxPriorityFeePerGas: overrides?.maxPriorityFeePerGas != null
                        ? overrides?.maxPriorityFeePerGas
                        : request.maxPriorityFeePerGas
                            ? fromHex(request.maxPriorityFeePerGas, "bigint")
                            : undefined,
                };
                filterUndefined(_overrides);
                return this.buildUserOperation({
                    target: request.to,
                    data: request.data ?? "0x",
                    value: request.value ? fromHex(request.value, "bigint") : 0n,
                }, _overrides);
            }
        });
        Object.defineProperty(this, "buildUserOperationFromTxs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (requests, overrides) => {
                const batch = requests.map((request) => {
                    if (!request.to) {
                        throw new Error("one transaction in the batch is missing a target address");
                    }
                    return {
                        target: request.to,
                        data: request.data ?? "0x",
                        value: request.value ? fromHex(request.value, "bigint") : 0n,
                    };
                });
                const maxFeePerGas = overrides?.maxFeePerGas != null
                    ? overrides?.maxFeePerGas
                    : bigIntMax(...requests
                        .filter((x) => x.maxFeePerGas != null)
                        .map((x) => fromHex(x.maxFeePerGas, "bigint")));
                const maxPriorityFeePerGas = overrides?.maxPriorityFeePerGas != null
                    ? overrides?.maxPriorityFeePerGas
                    : bigIntMax(...requests
                        .filter((x) => x.maxPriorityFeePerGas != null)
                        .map((x) => fromHex(x.maxPriorityFeePerGas, "bigint")));
                const _overrides = {
                    maxFeePerGas,
                    maxPriorityFeePerGas,
                };
                filterUndefined(_overrides);
                return {
                    batch,
                    overrides,
                };
            }
        });
        Object.defineProperty(this, "sendTransactions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (requests, overrides) => {
                const { batch, overrides: _overrides } = this.buildUserOperationFromTxs(requests, overrides);
                const { hash } = await this.sendUserOperation(batch, _overrides);
                return await this.waitForUserOperationTransaction(hash);
            }
        });
        Object.defineProperty(this, "waitForUserOperationTransaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (hash) => {
                for (let i = 0; i < this.txMaxRetries; i++) {
                    const txRetryIntervalWithJitterMs = this.txRetryIntervalMs * Math.pow(this.txRetryMulitplier, i) +
                        Math.random() * 100;
                    await new Promise((resolve) => setTimeout(resolve, txRetryIntervalWithJitterMs));
                    const receipt = await this.getUserOperationReceipt(hash).catch((e) => {
                        Logger.error(`[SmartAccountProvider] waitForUserOperationTransaction error fetching receipt for ${hash}: ${e}`);
                    });
                    if (receipt) {
                        return this.getTransaction(receipt.receipt.transactionHash).then((x) => x.hash);
                    }
                }
                throw new Error("Failed to find transaction for User Operation");
            }
        });
        Object.defineProperty(this, "getUserOperationByHash", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (hash) => {
                return this.rpcClient.getUserOperationByHash(hash);
            }
        });
        Object.defineProperty(this, "getUserOperationReceipt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (hash) => {
                return this.rpcClient.getUserOperationReceipt(hash);
            }
        });
        Object.defineProperty(this, "getTransaction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (hash) => {
                return this.rpcClient.getTransaction({ hash: hash });
            }
        });
        Object.defineProperty(this, "buildUserOperation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (data, overrides) => {
                if (!this.account) {
                    throw new Error("account not connected!");
                }
                const initCode = await this.account.getInitCode();
                return this._runMiddlewareStack({
                    initCode,
                    sender: this.getAddress(),
                    nonce: this.account.getNonce(),
                    callData: Array.isArray(data)
                        ? this.account.encodeBatchExecute(data)
                        : typeof data === "string"
                            ? data
                            : this.account.encodeExecute(data.target, data.value ?? 0n, data.data),
                    signature: this.account.getDummySignature(),
                }, overrides);
            }
        });
        Object.defineProperty(this, "sendUserOperation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (data, overrides) => {
                if (!this.account) {
                    throw new Error("account not connected");
                }
                const uoStruct = await this.buildUserOperation(data, overrides);
                return this._sendUserOperation(uoStruct);
            }
        });
        Object.defineProperty(this, "dropAndReplaceUserOperation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (uoToDrop, overrides) => {
                const uoToSubmit = {
                    initCode: uoToDrop.initCode,
                    sender: uoToDrop.sender,
                    nonce: uoToDrop.nonce,
                    callData: uoToDrop.callData,
                    signature: uoToDrop.signature,
                };
                const { maxFeePerGas, maxPriorityFeePerGas } = await this._runMiddlewareStack(uoToSubmit, overrides);
                const _overrides = {
                    maxFeePerGas: bigIntMax(BigInt(maxFeePerGas ?? 0n), bigIntPercent(uoToDrop.maxFeePerGas, 110n)),
                    maxPriorityFeePerGas: bigIntMax(BigInt(maxPriorityFeePerGas ?? 0n), bigIntPercent(uoToDrop.maxPriorityFeePerGas, 110n)),
                    paymasterAndData: uoToDrop.paymasterAndData,
                };
                const uoToSend = await this._runMiddlewareStack(uoToSubmit, _overrides);
                return this._sendUserOperation(uoToSend);
            }
        });
        Object.defineProperty(this, "checkGasSponsorshipEligibility", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (data, overrides) => {
                return this.buildUserOperation(data, overrides)
                    .then((userOperationStruct) => userOperationStruct.paymasterAndData !== "0x" &&
                    userOperationStruct.paymasterAndData !== null)
                    .catch(() => false);
            }
        });
        Object.defineProperty(this, "_runMiddlewareStack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (uo, overrides) => {
                const result = await asyncPipe(this.dummyPaymasterDataMiddleware, this.feeDataGetter, this.gasEstimator, this.customMiddleware ?? noOpMiddleware, overrides?.paymasterAndData != null
                    ? this.overridePaymasterDataMiddleware
                    : this.paymasterDataMiddleware, this.simulateUOMiddleware)(uo, overrides, this.feeOptions);
                return resolveProperties(result);
            }
        });
        Object.defineProperty(this, "_sendUserOperation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (uoStruct) => {
                if (!this.account) {
                    throw new Error("account not connected");
                }
                const request = deepHexlify(uoStruct);
                if (!isValidRequest(request)) {
                    throw new Error(`Request is missing parameters. All properties on UserOperationStruct must be set. uo: ${JSON.stringify(uoStruct, null, 2)}`);
                }
                request.verificationGasLimit = `0x32000`;
                request.signature = (await this.account.signUserOperationHash(getUserOperationHash(request, this.getEntryPointAddress(), BigInt(this.chain.id))));
                return {
                    hash: await this.rpcClient.sendUserOperation(request, this.getEntryPointAddress()),
                    request,
                };
            }
        });
        Object.defineProperty(this, "dummyPaymasterDataMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (struct, _overrides, _feeOptions) => {
                struct.paymasterAndData = "0x";
                return struct;
            }
        });
        Object.defineProperty(this, "overridePaymasterDataMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (struct, overrides, _feeOptions) => {
                struct.paymasterAndData =
                    overrides?.paymasterAndData != null ? overrides?.paymasterAndData : "0x";
                return struct;
            }
        });
        Object.defineProperty(this, "paymasterDataMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (struct, _overrides, _feeOptions) => {
                struct.paymasterAndData = "0x";
                return struct;
            }
        });
        Object.defineProperty(this, "gasEstimator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (struct, overrides, feeOptions) => {
                let { callGasLimit, verificationGasLimit, preVerificationGas } = overrides ?? {};
                if (callGasLimit == null ||
                    verificationGasLimit == null ||
                    preVerificationGas == null) {
                    const request = deepHexlify(await resolveProperties(struct));
                    const estimates = await this.rpcClient.estimateUserOperationGas(request, this.getEntryPointAddress());
                    callGasLimit =
                        callGasLimit ??
                            applyFeeOption(estimates.callGasLimit, feeOptions?.callGasLimit);
                    verificationGasLimit =
                        verificationGasLimit ??
                            applyFeeOption(estimates.verificationGasLimit, feeOptions?.verificationGasLimit);
                    preVerificationGas =
                        preVerificationGas ??
                            applyFeeOption(estimates.preVerificationGas, feeOptions?.preVerificationGas);
                }
                struct.callGasLimit = callGasLimit;
                struct.verificationGasLimit = verificationGasLimit;
                struct.preVerificationGas = preVerificationGas;
                return struct;
            }
        });
        Object.defineProperty(this, "feeDataGetter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (struct, overrides, feeOptions) => {
                const estimateMaxPriorityFeePerGas = async () => {
                    const estimate = await this.rpcClient.estimateMaxPriorityFeePerGas();
                    return applyFeeOption(estimate, feeOptions?.maxPriorityFeePerGas);
                };
                const estimateMaxFeePerGas = async (maxPriorityFeePerGas) => {
                    const feeData = await this.rpcClient.estimateFeesPerGas();
                    if (!feeData.maxFeePerGas || !feeData.maxPriorityFeePerGas) {
                        throw new Error("feeData is missing maxFeePerGas or maxPriorityFeePerGas");
                    }
                    const baseFee = applyFeeOption(feeData.maxFeePerGas - feeData.maxPriorityFeePerGas, feeOptions?.maxFeePerGas);
                    return BigInt(baseFee) + BigInt(maxPriorityFeePerGas);
                };
                struct.maxPriorityFeePerGas =
                    overrides?.maxPriorityFeePerGas != null
                        ? overrides?.maxPriorityFeePerGas
                        : await estimateMaxPriorityFeePerGas();
                struct.maxFeePerGas =
                    overrides?.maxFeePerGas != null
                        ? overrides?.maxFeePerGas
                        : await estimateMaxFeePerGas(struct.maxPriorityFeePerGas);
                return struct;
            }
        });
        Object.defineProperty(this, "customMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: noOpMiddleware
        });
        Object.defineProperty(this, "simulateUOMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: noOpMiddleware
        });
        Object.defineProperty(this, "withPaymasterMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (overrides) => {
                const newDummyMiddleware = overrides.dummyPaymasterDataMiddleware
                    ? this.overrideMiddlewareFunction(overrides.dummyPaymasterDataMiddleware)
                    : this.dummyPaymasterDataMiddleware;
                defineReadOnly(this, "dummyPaymasterDataMiddleware", newDummyMiddleware);
                const newPaymasterMiddleware = overrides.paymasterDataMiddleware
                    ? this.overrideMiddlewareFunction(overrides.paymasterDataMiddleware)
                    : this.paymasterDataMiddleware;
                defineReadOnly(this, "paymasterDataMiddleware", newPaymasterMiddleware);
                return this;
            }
        });
        Object.defineProperty(this, "withGasEstimator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (override) => {
                defineReadOnly(this, "gasEstimator", this.overrideMiddlewareFunction(override));
                return this;
            }
        });
        Object.defineProperty(this, "withFeeDataGetter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (override) => {
                defineReadOnly(this, "feeDataGetter", this.overrideMiddlewareFunction(override));
                return this;
            }
        });
        Object.defineProperty(this, "withCustomMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (override) => {
                defineReadOnly(this, "customMiddleware", override);
                return this;
            }
        });
        Object.defineProperty(this, "withSimulateUOMiddleware", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (override) => {
                defineReadOnly(this, "simulateUOMiddleware", override);
                return this;
            }
        });
        Object.defineProperty(this, "connect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (fn) => {
                const account = fn(this.rpcClient);
                if (this.entryPointAddress &&
                    account.getEntryPointAddress() !== this.entryPointAddress) {
                    throw new Error(`Account entryPoint address: ${account.getEntryPointAddress()} does not match the current provider's entryPoint address: ${this.entryPointAddress}`);
                }
                defineReadOnly(this, "account", account);
                if (this.rpcClient.transport.type === "http") {
                    const { url = this.chain.rpcUrls.default.http[0], fetchOptions } = this
                        .rpcClient.transport;
                    const signer = account.getOwner();
                    const factoryAddress = account.getFactoryAddress();
                    this.rpcClient = createPublicErc4337Client({
                        chain: this.chain,
                        rpcUrl: url,
                        fetchOptions: {
                            ...fetchOptions,
                            headers: {
                                ...fetchOptions?.headers,
                                "Alchemy-Aa-Sdk-Signer": signer?.signerType || "unknown",
                                "Alchemy-Aa-Sdk-Factory-Address": factoryAddress,
                            },
                        },
                    });
                }
                this.emit("connect", {
                    chainId: toHex(this.chain.id),
                });
                account
                    .getAddress()
                    .then((address) => this.emit("accountsChanged", [address]));
                return this;
            }
        });
        Object.defineProperty(this, "disconnect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.account) {
                    this.emit("disconnect");
                    this.emit("accountsChanged", []);
                }
                defineReadOnly(this, "account", undefined);
                return this;
            }
        });
        Object.defineProperty(this, "isConnected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.account !== undefined;
            }
        });
        Object.defineProperty(this, "getEntryPointAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return (this.entryPointAddress ??
                    this.account?.getEntryPointAddress() ??
                    getDefaultEntryPointAddress(this.chain));
            }
        });
        Object.defineProperty(this, "extend", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (fn) => {
                const extended = fn(this);
                for (const key in this) {
                    delete extended[key];
                }
                return Object.assign(this, extended);
            }
        });
        Object.defineProperty(this, "overrideMiddlewareFunction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (override) => {
                return async (struct, overrides) => {
                    return {
                        ...struct,
                        ...(await override(struct, overrides)),
                    };
                };
            }
        });
        this.chain = chain;
        this.txMaxRetries = opts?.txMaxRetries ?? 5;
        this.txRetryIntervalMs = opts?.txRetryIntervalMs ?? 2000;
        this.txRetryMulitplier = opts?.txRetryMulitplier ?? 1.5;
        this.entryPointAddress = entryPointAddress;
        this.feeOptions = {
            ...getDefaultUserOperationFeeOptions(chain),
            ...opts?.feeOptions,
        };
        this.rpcClient =
            typeof rpcProvider === "string"
                ? createPublicErc4337Client({
                    chain,
                    rpcUrl: rpcProvider,
                })
                : rpcProvider;
    }
}
//# sourceMappingURL=base.js.map