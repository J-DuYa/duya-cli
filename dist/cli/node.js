"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistFile = exports.setNoDeprecation = exports.setNodeTitle = exports.checkVersion = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const logger_1 = require("../logger");
function checkVersion() {
    const v = parseInt(process.version.slice(1));
    if (v < constants_1.MIN_NODE_VERSION) {
        (0, logger_1.error)(`Your node version ${v} is not supported, please upgrade to ${constants_1.MIN_NODE_VERSION} or above except 15 or 17 or 18.`);
        process.exit(1);
    }
}
exports.checkVersion = checkVersion;
function setNodeTitle(name) {
    if (process.title === 'node') {
        process.title = name || constants_1.FRAMEWORK_NAME;
    }
}
exports.setNodeTitle = setNodeTitle;
function setNoDeprecation() {
    // Use magic to suppress node deprecation warnings
    // See: https://github.com/nodejs/node/blob/master/lib/internal/process/warning.js#L77
    // @ts-ignore
    process.noDeprecation = '1';
}
exports.setNoDeprecation = setNoDeprecation;
/**
 * Check for configuration files
*/
function getExistFile({ cwd, files, returnRelative }) {
    for (const file of files) {
        const absFilePath = (0, path_1.join)(cwd, file);
        if ((0, fs_1.existsSync)(absFilePath)) {
            return returnRelative ? file : absFilePath;
        }
    }
}
exports.getExistFile = getExistFile;
