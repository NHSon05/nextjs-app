"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = exports.randomId = void 0;
const fs_1 = __importDefault(require("fs"));
const randomId = () => crypto.randomUUID().replace(/-/g, '');
exports.randomId = randomId;
const createFolder = (folderPath) => {
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
};
exports.createFolder = createFolder;
