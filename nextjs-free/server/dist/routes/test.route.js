"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function testRoutes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        reply.send({
            message: 'Hello from test route 5!'
        });
    });
}
exports.default = testRoutes;
