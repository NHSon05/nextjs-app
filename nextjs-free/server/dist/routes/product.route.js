"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = require("../controllers/product.controller");
const common_schema_1 = require("../schemaValidations/common.schema");
const product_schema_1 = require("../schemaValidations/product.schema");
async function productRoutes(fastify, options) {
    fastify.get('/', {
        schema: {
            response: {
                200: product_schema_1.ProductListRes
            }
        }
    }, async (request, reply) => {
        const products = await (0, product_controller_1.getProductList)();
        reply.send({
            data: products,
            message: 'Lấy danh sách sản phẩm thành công!'
        });
    });
    fastify.get('/:id', {
        schema: {
            params: product_schema_1.ProductParams,
            response: {
                200: product_schema_1.ProductRes
            }
        }
    }, async (request, reply) => {
        const product = await (0, product_controller_1.getProductDetail)(request.params.id);
        reply.send({
            data: product,
            message: 'Lấy thông tin sản phẩm thành công!'
        });
    });
    fastify.post('', {
        schema: {
            body: product_schema_1.CreateProductBody,
            response: {
                200: product_schema_1.ProductRes
            }
        }
    }, async (request, reply) => {
        const product = await (0, product_controller_1.createProduct)(request.body);
        reply.send({
            data: product,
            message: 'Tạo sản phẩm thành công!'
        });
    });
    fastify.put('/:id', {
        schema: {
            params: product_schema_1.ProductParams,
            body: product_schema_1.UpdateProductBody,
            response: {
                200: product_schema_1.ProductRes
            }
        }
    }, async (request, reply) => {
        const product = await (0, product_controller_1.updateProduct)(request.params.id, request.body);
        reply.send({
            data: product,
            message: 'Cập nhật sản phẩm thành công!'
        });
    });
    fastify.delete('/:id', {
        schema: {
            params: product_schema_1.ProductParams,
            response: {
                200: common_schema_1.MessageRes
            }
        }
    }, async (request, reply) => {
        await (0, product_controller_1.deleteProduct)(request.params.id);
        reply.send({
            message: 'Xóa sản phẩm thành công!'
        });
    });
}
exports.default = productRoutes;
