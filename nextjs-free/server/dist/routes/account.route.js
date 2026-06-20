"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const account_controller_1 = require("../controllers/account.controller");
const auth_hooks_1 = require("../hooks/auth.hooks");
const account_schema_1 = require("../schemaValidations/account.schema");
async function accountRoutes(fastify, options) {
    fastify.addHook('preValidation', fastify.auth([auth_hooks_1.requireLoginedHook]));
    fastify.get('/me', {
        schema: {
            response: {
                200: account_schema_1.AccountRes
            }
        }
    }, async (request, reply) => {
        reply.send({
            data: request.account,
            message: 'Lấy thông tin thành công'
        });
    });
    fastify.put('/me', {
        schema: {
            response: {
                200: account_schema_1.AccountRes
            }
        }
    }, async (request, reply) => {
        const result = await (0, account_controller_1.updateMeController)(request.account?.id, request.body);
        reply.send({
            data: result,
            message: 'Cập nhật thông tin thành công'
        });
    });
}
exports.default = accountRoutes;
