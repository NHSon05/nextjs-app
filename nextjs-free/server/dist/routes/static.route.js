"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
async function staticRoutes(fastify, options) {
    fastify.register(static_1.default, {
        root: path_1.default.resolve(config_1.default.UPLOAD_FOLDER)
    });
    fastify.get('/static/:id', async (request, reply) => {
        return reply.sendFile(request.params.id);
    });
}
exports.default = staticRoutes;
