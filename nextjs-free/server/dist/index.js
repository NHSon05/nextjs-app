"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the framework and instantiate it
const config_1 = __importStar(require("./config"));
const errorHandler_plugins_1 = require("./plugins/errorHandler.plugins");
const validatorCompiler_plugins_1 = __importDefault(require("./plugins/validatorCompiler.plugins"));
const account_route_1 = __importDefault(require("./routes/account.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_1 = __importDefault(require("@fastify/auth"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./utils/helpers");
const media_route_1 = __importDefault(require("./routes/media.route"));
const static_route_1 = __importDefault(require("./routes/static.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const test_route_1 = __importDefault(require("./routes/test.route"));
const fastify = (0, fastify_1.default)({
    logger: false
});
// Run the server!
const start = async () => {
    try {
        (0, helpers_1.createFolder)(path_1.default.resolve(config_1.default.UPLOAD_FOLDER));
        const whitelist = ['*'];
        fastify.register(cors_1.default, {
            origin: whitelist, // Cho phép tất cả các domain gọi API
            credentials: true // Cho phép trình duyệt gửi cookie đến server
        });
        fastify.register(auth_1.default, {
            defaultRelation: 'and'
        });
        fastify.register(helmet_1.default, {
            crossOriginResourcePolicy: {
                policy: 'cross-origin'
            }
        });
        fastify.register(cookie_1.default);
        fastify.register(validatorCompiler_plugins_1.default);
        fastify.register(errorHandler_plugins_1.errorHandlerPlugin);
        fastify.register(auth_route_1.default, {
            prefix: '/auth'
        });
        fastify.register(account_route_1.default, {
            prefix: '/account'
        });
        fastify.register(media_route_1.default, {
            prefix: '/media'
        });
        fastify.register(static_route_1.default, {
            prefix: '/static'
        });
        fastify.register(product_route_1.default, {
            prefix: '/products'
        });
        fastify.register(test_route_1.default, {
            prefix: '/test'
        });
        await fastify.listen({
            port: config_1.default.PORT
        });
        console.log(`Server đang chạy: ${config_1.API_URL}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
