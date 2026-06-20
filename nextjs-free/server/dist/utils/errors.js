"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrismaClientKnownRequestError = exports.StatusError = exports.ForbiddenError = exports.AuthError = exports.EntityError = void 0;
const client_1 = require("@prisma/client");
class EntityError extends Error {
    fields;
    status = 422;
    constructor(fields) {
        super('Lỗi xác thực dữ liệu');
        this.fields = fields;
    }
}
exports.EntityError = EntityError;
class AuthError extends Error {
    status = 401;
    constructor(message) {
        super(message);
    }
}
exports.AuthError = AuthError;
class ForbiddenError extends Error {
    status = 403;
    constructor(message) {
        super(message);
    }
}
exports.ForbiddenError = ForbiddenError;
class StatusError extends Error {
    status;
    constructor({ message, status }) {
        super(message);
        this.status = status;
    }
}
exports.StatusError = StatusError;
function isPrismaClientKnownRequestError(error) {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError;
}
exports.isPrismaClientKnownRequestError = isPrismaClientKnownRequestError;
