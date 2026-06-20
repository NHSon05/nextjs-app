"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: '.env'
});
const checkEnv = async () => {
    const chalk = (await import('chalk')).default;
    if (!fs_1.default.existsSync(path_1.default.resolve('.env'))) {
        console.log(chalk.red(`Không tìm thấy file môi trường .env`));
        process.exit(1);
    }
};
checkEnv();
const configSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number().default(4000),
    DATABASE_URL: zod_1.default.string(),
    SESSION_TOKEN_SECRET: zod_1.default.string(),
    SESSION_TOKEN_EXPIRES_IN: zod_1.default.string(),
    DOMAIN: zod_1.default.string(),
    PROTOCOL: zod_1.default.string(),
    UPLOAD_FOLDER: zod_1.default.string()
});
const configServer = configSchema.safeParse(process.env);
if (!configServer.success) {
    console.error(configServer.error.issues);
    throw new Error('Các giá trị khai báo trong file .env không hợp lệ');
}
const envConfig = configServer.data;
exports.API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`;
exports.default = envConfig;
