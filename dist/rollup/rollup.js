"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rollup_1 = require("rollup");
const path_1 = require("path");
const getRollupConfig_1 = __importDefault(require("./getRollupConfig"));
const logger_1 = require("./../logger");
const node_1 = require("./../cli/node");
async function rollupRunner({ cwd, enrtyPath }) {
    try {
        const projectPath = (0, path_1.join)(cwd, enrtyPath);
        const entry = (0, node_1.getExistFile)({
            cwd: projectPath,
            files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js', 'src/main.js', 'src/main.ts'],
            returnRelative: true,
        });
        if (!entry) {
            (0, logger_1.error)('Entry file is not exist.');
        }
        const EntryFile = (0, path_1.join)(projectPath, entry);
        const { rollupCfg } = (0, getRollupConfig_1.default)({
            entry: EntryFile,
            projectPath
        });
        const bundle = await (0, rollup_1.rollup)(rollupCfg);
        await bundle.write({
            format: rollupCfg === null || rollupCfg === void 0 ? void 0 : rollupCfg.output.format,
            exports: 'named',
            extend: true,
            sourcemap: rollupCfg === null || rollupCfg === void 0 ? void 0 : rollupCfg.output.sourcemap,
            file: (0, path_1.join)(projectPath, 'dist/index.js'),
            globals: {},
            name: 'duya'
        });
    }
    catch (e) {
        (0, logger_1.error)(e);
    }
}
exports.default = rollupRunner;
