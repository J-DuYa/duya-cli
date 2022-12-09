"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require('debug')('demo');
function DebugWorker({ worker, message }) {
    debug(message);
}
exports.default = DebugWorker;
