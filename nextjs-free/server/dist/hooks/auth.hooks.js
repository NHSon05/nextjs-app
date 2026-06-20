"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLoginedHook = void 0;
const database_1 = __importDefault(require("../database"));
const errors_1 = require("../utils/errors");
const requireLoginedHook = async (request) => {
    const authorization = request.headers['authorization'];
    let sessionToken = request.cookies?.sessionToken || request.headers['sessiontoken'];
    if (!sessionToken && authorization && authorization.startsWith('Bearer ')) {
        sessionToken = authorization.split(' ')[1];
    }
    if (!sessionToken)
        throw new errors_1.AuthError('Không nhận được session token');
    const session_row = await database_1.default.session.findUnique({
        where: {
            token: sessionToken
        },
        include: {
            account: true
        }
    });
    if (!session_row)
        throw new errors_1.AuthError('Session Token không tồn tại');
    request.account = session_row.account;
};
exports.requireLoginedHook = requireLoginedHook;
