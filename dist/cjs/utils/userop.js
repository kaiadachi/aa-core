"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRequest = void 0;
function isValidRequest(request) {
    return (!!request.callGasLimit &&
        !!request.maxFeePerGas &&
        request.maxPriorityFeePerGas != null &&
        !!request.preVerificationGas &&
        !!request.verificationGasLimit);
}
exports.isValidRequest = isValidRequest;
//# sourceMappingURL=userop.js.map