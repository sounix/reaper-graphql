"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("../SQL/conf"));
const dinamicConn_1 = __importDefault(require("../SQL/dinamicConn"));
const Resolvers = {
    Query: {
        books: () => dinamicConn_1.default(conf_1.default, "local", "vc"),
    },
};
exports.default = Resolvers;
//# sourceMappingURL=resolvers.js.map