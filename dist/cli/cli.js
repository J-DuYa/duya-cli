"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const yargs_parser_1 = __importDefault(require("yargs-parser"));
const node_1 = require("./node");
const build_1 = __importDefault(require("./../command/build"));
const module_1 = __importDefault(require("./../command/module"));
const init_1 = __importDefault(require("./../command/init"));
const logger_1 = require("./../logger");
const cwd = process.cwd();
async function run(_opts) {
    (0, node_1.checkVersion)();
    (0, node_1.setNodeTitle)();
    (0, node_1.setNoDeprecation)();
    const args = (_opts === null || _opts === void 0 ? void 0 : _opts.args) ||
        (0, yargs_parser_1.default)(process.argv.slice(2), {
            alias: {
                version: ['v'],
                help: ['h'],
            },
            boolean: ['version'],
        });
    const command = args._[0];
    switch (command) {
        case 'build':
            await (0, build_1.default)({ cwd, args });
            break;
        case 'build:module':
            await (0, module_1.default)();
            break;
        case 'init':
            await (0, init_1.default)();
            break;
        default:
            (0, logger_1.warn)(`@duya/cli does not support this directive temporarily!
current support:
  build
  build:module [package.json's name]
  init
      `);
            break;
    }
}
exports.run = run;
