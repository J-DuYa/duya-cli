"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = require("fs");
const rollup_1 = __importDefault(require("./../rollup/rollup"));
const getUserConfig_1 = __importDefault(require("../getUserConfig"));
const logger_1 = require("./../logger");
const constants_1 = require("./../constants");
async function build({ cwd, args }) {
    const { config: PLUGINS_PATH = constants_1.DEFAULT_PLUGINS_DIRECTORY, ...userConfig } = (0, lodash_1.merge)((0, getUserConfig_1.default)({ cwd }), args);
    const PLUGIN_DIR_PATH = (0, path_1.join)(cwd, PLUGINS_PATH);
    const isExistConfigFile = await (0, fs_1.existsSync)((0, path_1.join)(PLUGIN_DIR_PATH, constants_1.CONFIG_JSON_NAME));
    let CONFIG_CONTENT = { name: '', plugins: {} };
    if (!isExistConfigFile) {
        (0, logger_1.error)(`config.json file not found`);
    }
    try {
        const PluginBuffer = await (0, fs_1.readFileSync)((0, path_1.join)(PLUGIN_DIR_PATH, constants_1.CONFIG_JSON_NAME));
        CONFIG_CONTENT = JSON.parse(PluginBuffer.toString());
        const pluginsCfg = (CONFIG_CONTENT === null || CONFIG_CONTENT === void 0 ? void 0 : CONFIG_CONTENT.plugins) || {};
        for (let pln in pluginsCfg) {
            if (Array.isArray(pluginsCfg[pln])) {
                const plnArray = pluginsCfg[pln];
                for (let idx = 0; idx < plnArray.length; idx++) {
                    if (typeof plnArray[idx] === 'string') {
                        await (0, rollup_1.default)({ cwd, enrtyPath: plnArray[idx] });
                    }
                    else {
                        (0, logger_1.error)(`Plugin ${chalk_1.default.blueBright(pln)}: ${plnArray[idx]} is not in the correct format`);
                    }
                }
            }
            else if (typeof pluginsCfg[pln] === 'string') {
                await (0, rollup_1.default)({ cwd, enrtyPath: pluginsCfg[pln] });
            }
            else {
                (0, logger_1.error)(`${chalk_1.default.blueBright('Plugin ' + pln)}: ${JSON.stringify(pluginsCfg[pln])} is not in the correct format`);
            }
        }
    }
    catch (e) {
        (0, logger_1.error)(e);
    }
}
exports.default = build;
