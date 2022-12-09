"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const plugin_typescript_1 = __importDefault(require("@rollup/plugin-typescript"));
const plugin_commonjs_1 = __importDefault(require("@rollup/plugin-commonjs"));
const rollup_plugin_uglify_1 = require("rollup-plugin-uglify");
const plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
const plugin_babel_1 = require("@rollup/plugin-babel");
const logger_1 = require("./../logger");
const constants_1 = require("./../constants");
const node_1 = require("./../cli/node");
function getRollupConfig({ entry, projectPath, }) {
    const cfgPath = (0, node_1.getExistFile)({
        cwd: projectPath,
        files: constants_1.DEFAULT_CONFIG_FILES,
        returnRelative: true,
    });
    if (!cfgPath) {
        (0, logger_1.error)('.duyarc.js or .duyarc.ts file is not exist.');
    }
    const fileName = projectPath.split('/')[projectPath.split('/').length - 1];
    console.log('fileName', fileName);
    const { output = {
        format: 'umd',
        name: fileName,
        dir: 'dist'
    } } = require((0, path_1.join)(projectPath, cfgPath));
    console.log('output?.name', output === null || output === void 0 ? void 0 : output.name);
    return {
        rollupCfg: {
            input: entry,
            output: {
                file: 'core.umd.js',
                dir: (output === null || output === void 0 ? void 0 : output.dist) || 'dist',
                format: output === null || output === void 0 ? void 0 : output.format,
                sourcemap: false,
                name: (output === null || output === void 0 ? void 0 : output.name) || fileName,
                inlineDynamicImports: true,
            },
            plugins: [
                (0, plugin_babel_1.babel)({
                    babelHelpers: 'bundled'
                }),
                (0, rollup_plugin_uglify_1.uglify)(),
                (0, plugin_node_resolve_1.nodeResolve)(),
                (0, plugin_commonjs_1.default)(),
                (0, plugin_typescript_1.default)()
            ]
        }
    };
}
exports.default = getRollupConfig;
