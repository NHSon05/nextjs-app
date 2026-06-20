"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductDetail = exports.getProductList = void 0;
const database_1 = __importDefault(require("../database"));
const getProductList = () => {
    return database_1.default.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
};
exports.getProductList = getProductList;
const getProductDetail = (id) => {
    return database_1.default.product.findUniqueOrThrow({
        where: {
            id
        }
    });
};
exports.getProductDetail = getProductDetail;
const createProduct = (data) => {
    return database_1.default.product.create({
        data
    });
};
exports.createProduct = createProduct;
const updateProduct = (id, data) => {
    return database_1.default.product.update({
        where: {
            id
        },
        data
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = (id) => {
    return database_1.default.product.delete({
        where: {
            id
        }
    });
};
exports.deleteProduct = deleteProduct;
