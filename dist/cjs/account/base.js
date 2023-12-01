"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSmartContractAccount = exports.DeploymentState = void 0;
const viem_1 = require("viem");
const EntryPointAbi_js_1 = require("../abis/EntryPointAbi.js");
const create_client_js_1 = require("../client/create-client.js");
const logger_js_1 = require("../logger.js");
const utils_js_1 = require("../signer/utils.js");
const defaults_js_1 = require("../utils/defaults.js");
const schema_js_1 = require("./schema.js");
var DeploymentState;
(function (DeploymentState) {
    DeploymentState["UNDEFINED"] = "0x0";
    DeploymentState["NOT_DEPLOYED"] = "0x1";
    DeploymentState["DEPLOYED"] = "0x2";
})(DeploymentState || (exports.DeploymentState = DeploymentState = {}));
class BaseSmartContractAccount {
    constructor(params_) {
        Object.defineProperty(this, "factoryAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deploymentState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: DeploymentState.UNDEFINED
        });
        Object.defineProperty(this, "accountAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "accountInitCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "owner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entryPoint", {
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
        Object.defineProperty(this, "rpcProvider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const params = (0, schema_js_1.createBaseSmartAccountParamsSchema)().parse(params_);
        this.entryPointAddress =
            params.entryPointAddress ?? (0, defaults_js_1.getDefaultEntryPointAddress)(params.chain);
        const rpcUrl = typeof params.rpcClient === "string"
            ? params.rpcClient
            : params.rpcClient.transport.type === "http"
                ? params.rpcClient.transport.url || params.chain.rpcUrls.default.http[0]
                : undefined;
        const fetchOptions = typeof params.rpcClient === "string"
            ? undefined
            : params.rpcClient.transport.type === "http"
                ? params.rpcClient.transport.fetchOptions
                : undefined;
        this.rpcProvider = rpcUrl
            ? (0, create_client_js_1.createPublicErc4337Client)({
                chain: params.chain,
                rpcUrl,
                fetchOptions: {
                    ...fetchOptions,
                    headers: {
                        ...fetchOptions?.headers,
                        "Alchemy-Aa-Sdk-Signer": params.owner?.signerType || "unknown",
                        "Alchemy-Aa-Sdk-Factory-Address": params.factoryAddress,
                    },
                },
            })
            : params.rpcClient;
        this.accountAddress = params.accountAddress;
        this.factoryAddress = params.factoryAddress;
        this.owner = params.owner;
        this.accountInitCode = params.initCode;
        this.entryPoint = (0, viem_1.getContract)({
            address: this.entryPointAddress,
            abi: EntryPointAbi_js_1.EntryPointAbi,
            publicClient: this.rpcProvider,
        });
    }
    async signUserOperationHash(uoHash) {
        return this.signMessage(uoHash);
    }
    async signTypedData(_params) {
        throw new Error("signTypedData not supported");
    }
    async signMessageWith6492(msg) {
        const [isDeployed, signature] = await Promise.all([
            this.isAccountDeployed(),
            this.signMessage(msg),
        ]);
        return this.create6492Signature(isDeployed, signature);
    }
    async signTypedDataWith6492(params) {
        const [isDeployed, signature] = await Promise.all([
            this.isAccountDeployed(),
            this.signTypedData(params),
        ]);
        return this.create6492Signature(isDeployed, signature);
    }
    async encodeBatchExecute(_txs) {
        throw new Error("encodeBatchExecute not supported");
    }
    async getNonce() {
        if (!(await this.isAccountDeployed())) {
            return 0n;
        }
        const address = await this.getAddress();
        return this.entryPoint.read.getNonce([address, BigInt(0)]);
    }
    async getInitCode() {
        if (this.deploymentState === DeploymentState.DEPLOYED) {
            return "0x";
        }
        const contractCode = await this.rpcProvider.getBytecode({
            address: await this.getAddress(),
        });
        if ((contractCode?.length ?? 0) > 2) {
            this.deploymentState = DeploymentState.DEPLOYED;
            return "0x";
        }
        else {
            this.deploymentState = DeploymentState.NOT_DEPLOYED;
        }
        return this._getAccountInitCode();
    }
    async getAddress() {
        if (!this.accountAddress) {
            const initCode = await this._getAccountInitCode();
            logger_js_1.Logger.verbose("[BaseSmartContractAccount](getAddress) initCode: ", initCode);
            try {
                await this.entryPoint.simulate.getSenderAddress([initCode]);
            }
            catch (err) {
                if (err.cause?.data?.errorName === "SenderAddressResult") {
                    this.accountAddress = err.cause.data.args[0];
                    logger_js_1.Logger.verbose("[BaseSmartContractAccount](getAddress) entrypoint.getSenderAddress result:", this.accountAddress);
                    return this.accountAddress;
                }
            }
            throw new Error("getCounterFactualAddress failed");
        }
        return this.accountAddress;
    }
    async setAddress(addr) {
        this.accountAddress = addr;
    }
    getOwner() {
        return this.owner;
    }
    getFactoryAddress() {
        return this.factoryAddress;
    }
    getEntryPointAddress() {
        return this.entryPointAddress;
    }
    async isAccountDeployed() {
        return (await this.getDeploymentState()) === DeploymentState.DEPLOYED;
    }
    async getDeploymentState() {
        if (this.deploymentState === DeploymentState.UNDEFINED) {
            const initCode = await this.getInitCode();
            return initCode === "0x"
                ? DeploymentState.DEPLOYED
                : DeploymentState.NOT_DEPLOYED;
        }
        else {
            return this.deploymentState;
        }
    }
    async parseFactoryAddressFromAccountInitCode() {
        const initCode = await this._getAccountInitCode();
        const factoryAddress = `0x${initCode.substring(2, 42)}`;
        const factoryCalldata = `0x${initCode.substring(42)}`;
        return [factoryAddress, factoryCalldata];
    }
    async _getAccountInitCode() {
        return this.accountInitCode ?? this.getAccountInitCode();
    }
    async create6492Signature(isDeployed, signature) {
        if (isDeployed) {
            return signature;
        }
        const [factoryAddress, factoryCalldata] = await this.parseFactoryAddressFromAccountInitCode();
        logger_js_1.Logger.verbose(`[BaseSmartContractAccount](create6492Signature)\
        factoryAddress: ${factoryAddress}, factoryCalldata: ${factoryCalldata}`);
        return (0, utils_js_1.wrapSignatureWith6492)({
            factoryAddress,
            factoryCalldata,
            signature,
        });
    }
}
exports.BaseSmartContractAccount = BaseSmartContractAccount;
//# sourceMappingURL=base.js.map