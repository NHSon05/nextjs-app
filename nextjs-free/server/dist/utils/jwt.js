"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySessionToken = exports.signSessionToken = void 0;
const config_1 = __importDefault(require("../config"));
const type_1 = require("../constants/type");
const fast_jwt_1 = require("fast-jwt");
const ms_1 = __importDefault(require("ms"));
const signSessionToken = (payload, options) => {
    const signSync = (0, fast_jwt_1.createSigner)({
        key: config_1.default.SESSION_TOKEN_SECRET,
        algorithm: 'HS256',
        expiresIn: (0, ms_1.default)(config_1.default.SESSION_TOKEN_EXPIRES_IN),
        ...options
    });
    return signSync({ ...payload, tokenType: type_1.TokenType.SessionToken });
};
exports.signSessionToken = signSessionToken;
const verifySessionToken = (token) => {
    const verifySync = (0, fast_jwt_1.createVerifier)({
        key: config_1.default.SESSION_TOKEN_SECRET
    });
    return verifySync(token);
};
exports.verifySessionToken = verifySessionToken;
