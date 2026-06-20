"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductParams = exports.UpdateProductBody = exports.ProductListRes = exports.ProductRes = exports.ProductSchema = exports.CreateProductBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateProductBody = zod_1.default.object({
    name: zod_1.default.string().min(1).max(256),
    price: zod_1.default.number().positive(),
    description: zod_1.default.string().max(10000),
    image: zod_1.default.string().url()
});
exports.ProductSchema = zod_1.default.object({
    id: zod_1.default.number(),
    name: zod_1.default.string(),
    price: zod_1.default.number(),
    description: zod_1.default.string(),
    image: zod_1.default.string(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date()
});
exports.ProductRes = zod_1.default.object({
    data: exports.ProductSchema,
    message: zod_1.default.string()
});
exports.ProductListRes = zod_1.default.object({
    data: zod_1.default.array(exports.ProductSchema),
    message: zod_1.default.string()
});
exports.UpdateProductBody = exports.CreateProductBody;
exports.ProductParams = zod_1.default.object({
    id: zod_1.default.coerce.number()
});
