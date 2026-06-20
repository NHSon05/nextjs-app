"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_hooks_1 = require("../hooks/auth.hooks");
const multipart_1 = __importDefault(require("@fastify/multipart"));
const media_controller_1 = require("../controllers/media.controller");
async function mediaRoutes(fastify, options) {
    fastify.register(multipart_1.default);
    fastify.addHook('preValidation', fastify.auth([auth_hooks_1.requireLoginedHook]));
    fastify.post('/upload', {}, async (request, reply) => {
        const data = await request.file({
            limits: {
                fileSize: 1024 * 1024 * 10, // 10MB,
                fields: 1,
                files: 1
            }
        });
        if (!data) {
            throw new Error('Không tìm thấy file');
        }
        const url = await (0, media_controller_1.uploadImage)(data);
        return reply.send({ message: 'Upload ảnh thành công', data: url });
    });
}
exports.default = mediaRoutes;
