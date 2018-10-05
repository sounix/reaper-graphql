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
const sequelize_1 = __importDefault(require("sequelize"));
class ConnectionDB {
    constructor(host, database, user, pwd, port) {
        this.host = host;
        this.database = database;
        this.user = user;
        this.pwd = pwd;
        // TODO
    }
    /**
     * rawQuery
     * @param query This requires an sql query
     */
    rawQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const ask = this.createConn();
            let result = [];
            if (ask.authenticate()) {
                return result = yield ask.query(query, { type: ask.QueryTypes.SELECT });
            }
            throw new Error("No existe coneccion con la base de datos");
        });
    }
    /**
     * objConnection
     * return private function createConn
     */
    objConnection() {
        return this.createConn;
    }
    /**
     * createConn
     * create the connect object of sequelize and return this object
     */
    createConn() {
        let created;
        return created = new sequelize_1.default(this.database, this.user, this.pwd, {
            host: this.host,
            // tslint:disable-next-line:object-literal-sort-keys
            dialect: "mssql",
        });
    }
}
exports.default = ConnectionDB;
//# sourceMappingURL=bin.js.map