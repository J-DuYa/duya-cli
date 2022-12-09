"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
exports.default = {
    info: (message) => {
        log(chalk_1.default.green(`${message}`));
    },
    warning: (message) => {
        log(chalk_1.default.red(`🌈 Warning ${message}`));
    },
    error: (message) => {
        log(chalk_1.default.red(`🙅 Error: ${message}`));
    }
};
