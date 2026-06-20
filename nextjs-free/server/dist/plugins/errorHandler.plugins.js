"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerPlugin = void 0;
const errors_1 = require("../utils/errors");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const zod_1 = require("zod");
const isZodFastifyError = (error) => {
    if (error instanceof zod_1.ZodError) {
        return true;
    }
    return false;
};
const isEntityError = (error) => {
    if (error instanceof errors_1.EntityError) {
        return true;
    }
    return false;
};
const isAuthError = (error) => {
    if (error instanceof errors_1.AuthError) {
        return true;
    }
    return false;
};
const isForbiddenError = (error) => {
    if (error instanceof errors_1.ForbiddenError) {
        return true;
    }
    return false;
};
const isStatusError = (error) => {
    if (error instanceof errors_1.StatusError) {
        return true;
    }
    return false;
};
exports.errorHandlerPlugin = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.setErrorHandler(function (error, request, reply) {
        if (isEntityError(error)) {
            return reply.status(error.status).send({
                message: 'Lỗi xảy ra khi xác thực dữ liệu...',
                errors: error.fields,
                statusCode: error.status
            });
        }
        else if (isForbiddenError(error)) {
            return reply.status(error.status).send({
                message: error.message,
                statusCode: error.status
            });
        }
        else if (isAuthError(error)) {
            return reply
                .setCookie('session_token', '', {
                path: '/',
                httpOnly: true,
                sameSite: 'none',
                secure: true
            })
                .status(error.status)
                .send({
                message: error.message,
                statusCode: error.status
            });
        }
        else if (isStatusError(error)) {
            return reply.status(error.status).send({
                message: error.message,
                statusCode: error.status
            });
        }
        else if (isZodFastifyError(error)) {
            const { issues, validationContext } = error;
            const errors = issues.map((issue) => {
                return {
                    ...issue,
                    field: issue.path.join('.')
                };
            });
            const statusCode = 422;
            return reply.status(statusCode).send({
                // validationContext will be 'body' or 'params' or 'headers' or 'query'
                message: `A validation error occurred when validating the ${validationContext}...`,
                errors,
                code: error.code,
                statusCode
            });
        }
        else if ((0, errors_1.isPrismaClientKnownRequestError)(error) && error.code === 'P2025') {
            const statusCode = 404;
            return reply.status(statusCode).send({
                message: 'Không tìm thấy dữ liệu!',
                statusCode: statusCode
            });
        }
        else {
            const statusCode = error.statusCode || 400;
            return reply.status(statusCode).send({
                message: error.message,
                error,
                statusCode
            });
        }
    });
});
