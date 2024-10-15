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
exports.PuppetMaster = void 0;
const axios_1 = __importStar(require("axios"));
const util_1 = __importDefault(require("util"));
const stream_1 = __importDefault(require("stream"));
const fs_1 = __importDefault(require("fs"));
const pipeline = util_1.default.promisify(stream_1.default.pipeline);
class PuppetMaster {
    constructor(opts) {
        this.axios = axios_1.default.create({
            baseURL: opts.baseUrl,
            headers: {
                "x-api-key": opts.apiKey
            }
        });
    }
    async pdf(opts) {
        try {
            const request = await this.axios.post("/pdf", { task: opts }, {
                responseType: "stream"
            });
            await pipeline(request.data, fs_1.default.createWriteStream(opts.pdfPath));
        }
        catch (err) {
            if (err instanceof axios_1.AxiosError) {
                err.response?.data.setEncoding('utf8');
                function streamToString(stream) {
                    const chunks = [];
                    return new Promise((resolve, reject) => {
                        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
                        stream.on('error', (err) => reject(err));
                        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
                    });
                }
                const streamString = await streamToString(err.response?.data);
                let data = JSON.parse(streamString);
                console.log(data);
                throw new Error(data.message);
            }
            throw err;
        }
    }
}
exports.PuppetMaster = PuppetMaster;
