"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILES = void 0;
const node_1 = require("./cli/node");
const logger_1 = require("./logger");
exports.CONFIG_FILES = [
    '.duyarc.js',
    '.duyarc.ts'
];
function testDefault(obj) {
    return obj.default || obj;
}
function default_1({ cwd }) {
    const configFile = (0, node_1.getExistFile)({
        cwd,
        files: exports.CONFIG_FILES,
        returnRelative: false,
    });
    let userConfig = {};
    if (!configFile) {
        (0, logger_1.warn)(`Can\'t found config file: ${exports.CONFIG_FILES.join(' or ')}`);
        return false;
    }
    try {
        userConfig = testDefault(require(configFile));
    }
    catch (e) {
        (0, logger_1.error)(e);
    }
    return userConfig;
}
exports.default = default_1;
