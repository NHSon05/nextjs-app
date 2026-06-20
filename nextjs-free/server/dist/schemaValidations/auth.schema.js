"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRes = exports.LoginBody = exports.RegisterRes = exports.RegisterBody = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RegisterBody = zod_1.default
    .object({
    name: zod_1.default.string().trim().min(2).max(256),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(100),
    confirmPassword: zod_1.default.string().min(6).max(100)
})
    .strict()
    .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Mật khẩu không khớp',
            path: ['confirmPassword']
        });
    }
});
exports.RegisterRes = zod_1.default.object({
    data: zod_1.default.object({
        token: zod_1.default.string(),
        account: zod_1.default.object({
            id: zod_1.default.number(),
            name: zod_1.default.string(),
            email: zod_1.default.string()
        })
    }),
    message: zod_1.default.string()
});
exports.LoginBody = zod_1.default
    .object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6).max(100)
})
    .strict();
exports.LoginRes = exports.RegisterRes;
