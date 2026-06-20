"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeBody = exports.AccountRes = void 0;
const zod_1 = __importDefault(require("zod"));
exports.AccountRes = zod_1.default
    .object({
    data: zod_1.default.object({
        id: zod_1.default.number(),
        name: zod_1.default.string(),
        email: zod_1.default.string()
    }),
    message: zod_1.default.string()
})
    .strict();
exports.UpdateMeBody = zod_1.default.object({
    name: zod_1.default.string().trim().min(2).max(256)
});
