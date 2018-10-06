"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bin_1 = __importDefault(require("./bin"));
const conf_1 = __importDefault(require("./conf"));
/**
 *
 * @param i
 * @param tipo
 * @param suc
 */
function readConnection(i, tipo, suc) {
    let objConn;
    i.map((c) => {
        if (c.name === suc.toLowerCase() || c.suc === suc.toLowerCase()) {
            objConn = c;
            return;
        }
    });
    if (objConn) {
        const newDbConn = new bin_1.default(objConn[tipo], objConn.database, objConn.user, objConn.pwd, objConn.port);
        return newDbConn;
    }
    throw new Error("Error al crear conexion");
}
/**
 *
 * @param tipo "local" | "remote"
 * @param suc "vc" | "zr" | "ou" | "jl" | "bo"
 * @param query "cadena SQL"
 */
function newRawQuery(tipo, suc, query) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
        const goDb = readConnection(conf_1.default, tipo, suc);
        if (goDb) {
            return goDb.rawQuery(query);
        }
        throw new Error("Lo sentimos no se ha podido crear la conexion");
    });
}
exports.default = newRawQuery;
//# sourceMappingURL=dinamicConn.js.map