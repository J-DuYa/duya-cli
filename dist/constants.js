"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_JSON_NAME = exports.DEFAULT_PLUGINS_DIRECTORY = exports.DEFAULT_BUNDLESS_IGNORES = exports.CACHE_PATH = exports.DEBUG_BUNDLESS_NAME = exports.BUILD_COMMANDS = exports.WATCH_DEBOUNCE_STEP = exports.FRAMEWORK_NAME = exports.DEFAULT_CONFIG_FILES = exports.MIN_NODE_VERSION = void 0;
exports.MIN_NODE_VERSION = 16;
exports.DEFAULT_CONFIG_FILES = ['.duyarc.ts', '.duyarc.js'];
exports.FRAMEWORK_NAME = '@duya/cli';
exports.WATCH_DEBOUNCE_STEP = 300;
exports.BUILD_COMMANDS = ['build', 'prebundle'];
exports.DEBUG_BUNDLESS_NAME = '@duya/cli:bundless';
exports.CACHE_PATH = 'node_modules/.cache/@duya/cli';
exports.DEFAULT_BUNDLESS_IGNORES = [
    '**/.*',
    '**/.*/**',
    '**/*.md',
    '**/demos/**',
    '**/fixtures/**',
    '**/__{test,tests,snapshots}__/**',
    '**/*.{test,e2e,spec}.{js,jsx,ts,tsx}',
    '**/tsconfig.json',
];
// default plugin directory
exports.DEFAULT_PLUGINS_DIRECTORY = '/plugins';
exports.CONFIG_JSON_NAME = 'config.json';
