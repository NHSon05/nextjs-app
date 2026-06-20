"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_hooks_1 = require("../hooks/auth.hooks");
const auth_schema_1 = require("../schemaValidations/auth.schema");
const common_schema_1 = require("../schemaValidations/common.schema");
async function authRoutes(fastify, options) {
    fastify.post('/register', {
        schema: {
            response: {
                200: auth_schema_1.RegisterRes
            },
            body: auth_schema_1.RegisterBody
        }
    }, async (request, reply) => {
        const { body } = request;
        const { session, account } = await (0, auth_controller_1.registerController)(body);
        reply
            .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: session.expiresAt,
            sameSite: 'none',
            domain: config_1.default.DOMAIN
        })
            .send({
            message: 'Đăng ký thành công',
            data: {
                token: session.token,
                account
            }
        });
    });
    fastify.post('/logout', {
        schema: {
            response: {
                200: common_schema_1.MessageRes
            }
        },
        preValidation: fastify.auth([auth_hooks_1.requireLoginedHook])
    }, async (request, reply) => {
        const { sessionToken } = request.cookies;
        const message = await (0, auth_controller_1.logoutController)(sessionToken);
        reply
            .clearCookie('sessionToken', {
            path: '/',
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
            .send({
            message
        });
    });
    fastify.post('/login', {
        schema: {
            response: {
                200: auth_schema_1.LoginRes
            },
            body: auth_schema_1.LoginBody
        }
    }, async (request, reply) => {
        const { body } = request;
        const { session, account } = await (0, auth_controller_1.loginController)(body);
        reply
            .setCookie('sessionToken', session.token, {
            path: '/',
            httpOnly: true,
            secure: true,
            expires: session.expiresAt,
            sameSite: 'none',
            domain: config_1.default.DOMAIN
        })
            .send({
            message: 'Đăng nhập thành công',
            data: {
                token: session.token,
                account
            }
        });
    });
}
exports.default = authRoutes;
