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
exports.uploadImage = void 0;
const helpers_1 = require("../utils/helpers");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const stream_1 = require("stream");
const config_1 = __importStar(require("../config"));
const pump = util_1.default.promisify(stream_1.pipeline);
const uploadImage = async (data) => {
    const uniqueId = (0, helpers_1.randomId)();
    const ext = path_1.default.extname(data.filename);
    const id = uniqueId + ext;
    const filepath = path_1.default.resolve(config_1.default.UPLOAD_FOLDER, id);
    await pump(data.file, fs_1.default.createWriteStream(filepath));
    if (data.file.truncated) {
        // Xóa file nếu file bị trucated
        await fs_1.default.unlinkSync(filepath);
        throw new Error('Giới hạn file là 10MB');
    }
    const url = `${config_1.API_URL}` + '/static/' + id;
    return url;
};
exports.uploadImage = uploadImage;
