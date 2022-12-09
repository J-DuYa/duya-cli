"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importLazy = void 0;
const import_lazy_1 = __importDefault(require("../compiled/import-lazy"));
function importLazy(moduleName, requireFn) {
    const importLazyLocal = (0, import_lazy_1.default)(requireFn || require);
    return importLazyLocal(moduleName);
}
exports.importLazy = importLazy;
