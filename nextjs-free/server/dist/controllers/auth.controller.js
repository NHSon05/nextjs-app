"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.logoutController = exports.registerController = void 0;
const config_1 = __importDefault(require("../config"));
const error_reference_1 = require("../constants/error-reference");
const database_1 = __importDefault(require("../database"));
const crypto_1 = require("../utils/crypto");
const errors_1 = require("../utils/errors");
const jwt_1 = require("../utils/jwt");
const date_fns_1 = require("date-fns");
const ms_1 = __importDefault(require("ms"));
const registerController = async (body) => {
    try {
        const hashedPassword = await (0, crypto_1.hashPassword)(body.password);
        const account = await database_1.default.account.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        });
        const sessionToken = (0, jwt_1.signSessionToken)({
            userId: account.id
        });
        const expiresAt = (0, date_fns_1.addMilliseconds)(new Date(), (0, ms_1.default)(config_1.default.SESSION_TOKEN_EXPIRES_IN));
        const session = await database_1.default.session.create({
            data: {
                accountId: account.id,
                token: sessionToken,
                expiresAt
            }
        });
        return {
            account,
            session
        };
    }
    catch (error) {
        if ((0, errors_1.isPrismaClientKnownRequestError)(error)) {
            if (error.code === error_reference_1.PrismaErrorCode.UniqueConstraintViolation) {
                throw new errors_1.EntityError([{ field: 'email', message: 'Email đã tồn tại' }]);
            }
        }
        throw error;
    }
};
exports.registerController = registerController;
const logoutController = async (sessionToken) => {
    await database_1.default.session.delete({
        where: {
            token: sessionToken
        }
    });
    return 'Đăng xuất thành công';
};
exports.logoutController = logoutController;
const loginController = async (body) => {
    const account = await database_1.default.account.findUnique({
        where: {
            email: body.email
        }
    });
    if (!account) {
        throw new errors_1.EntityError([{ field: 'email', message: 'Email không tồn tại' }]);
    }
    const isPasswordMatch = await (0, crypto_1.comparePassword)(body.password, account.password);
    if (!isPasswordMatch) {
        throw new errors_1.EntityError([{ field: 'password', message: 'Email hoặc mật khẩu không đúng' }]);
    }
    const sessionToken = (0, jwt_1.signSessionToken)({
        userId: account.id
    });
    const expiresAt = (0, date_fns_1.addMilliseconds)(new Date(), (0, ms_1.default)(config_1.default.SESSION_TOKEN_EXPIRES_IN));
    const session = await database_1.default.session.create({
        data: {
            accountId: account.id,
            token: sessionToken,
            expiresAt
        }
    });
    return {
        account,
        session
    };
};
exports.loginController = loginController;
