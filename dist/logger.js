"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestLogFilePath = exports.profile = exports.fatal = exports.debug = exports.event = exports.info = exports.ready = exports.warn = exports.error = exports.wait = exports.prefixes = void 0;
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("../compiled/fs-extra"));
const enableFSLogger = process.env.FS_LOGGER !== 'none' && !process.versions.webcontainer;
const profilers = {};
const loggerDir = (0, path_1.join)(process.cwd(), '.cache/logger');
const loggerPath = (0, path_1.join)(loggerDir, `plugin-build.log`);
exports.prefixes = {
    wait: chalk_1.default.cyan('wait') + '  -',
    error: chalk_1.default.red('error') + ' -',
    fatal: chalk_1.default.red('fatal') + ' -',
    warn: chalk_1.default.yellow('warn') + '  -',
    ready: chalk_1.default.green('ready') + ' -',
    info: chalk_1.default.cyan('info') + '  -',
    event: chalk_1.default.magenta('event') + ' -',
    debug: chalk_1.default.gray('debug') + ' -',
    profile: chalk_1.default.blue('profile') + ' -',
};
let logger;
if (enableFSLogger) {
    const pino = require('pino');
    fs_extra_1.default.mkdirpSync(loggerDir);
    const customLevels = {
        ready: 31,
        event: 32,
        wait: 55,
        // 虽然这里设置了 debug 为 30，但日志中还是 20，符合预期
        // 这里不加会不生成到 umi.log，transport 的 level 配置没有生效，原因不明
        debug: 30,
    };
    logger = pino({
        customLevels,
    }, pino.transport({
        targets: [
            {
                target: require.resolve('pino/file'),
                options: {
                    destination: loggerPath,
                },
                level: 'trace',
            },
        ],
    }));
}
else {
    logger = {};
    Object.keys(exports.prefixes).forEach((key) => {
        logger[key] = () => { };
    });
}
function wait(...message) {
    console.log(exports.prefixes.wait, ...message);
    logger.wait(message[0]);
}
exports.wait = wait;
function error(...message) {
    console.error(exports.prefixes.error, ...message);
    logger.error(message[0]);
}
exports.error = error;
function warn(...message) {
    console.warn(exports.prefixes.warn, ...message);
    logger.warn(message[0]);
}
exports.warn = warn;
function ready(...message) {
    console.log(exports.prefixes.ready, ...message);
    logger.ready(message[0]);
}
exports.ready = ready;
function info(...message) {
    console.log(exports.prefixes.info, ...message);
    logger.info(message[0]);
}
exports.info = info;
function event(...message) {
    console.log(exports.prefixes.event, ...message);
    logger.event(message[0]);
}
exports.event = event;
function debug(...message) {
    if (process.env.DEBUG) {
        console.log(exports.prefixes.debug, ...message);
    }
    logger.debug(message[0]);
}
exports.debug = debug;
function fatal(...message) {
    console.error(exports.prefixes.fatal, ...message);
    logger.fatal(message[0]);
}
exports.fatal = fatal;
function profile(id, ...message) {
    // Worker logs only available in debug mode
    if (process.env.IS_UMI_BUILD_WORKER && !process.env.DEBUG) {
        return;
    }
    if (!profilers[id]) {
        profilers[id] = {
            startTime: Date.now(),
        };
        console.log(exports.prefixes.profile, chalk_1.default.green(id), ...message);
        return;
    }
    const endTime = Date.now();
    const { startTime } = profilers[id];
    console.log(exports.prefixes.profile, chalk_1.default.green(id), `Completed in ${chalk_1.default.cyan(`${endTime - startTime}ms`)}`, ...message);
    delete profilers[id];
}
exports.profile = profile;
function getLatestLogFilePath() {
    return enableFSLogger ? loggerPath : null;
}
exports.getLatestLogFilePath = getLatestLogFilePath;
