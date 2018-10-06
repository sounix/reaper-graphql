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
const dinamicConn_1 = __importDefault(require("../SQL/dinamicConn"));
const stadistics = (suc) => ({});
function analisiArticulosC() {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO
    });
}
const selectArticulos = () => __awaiter(this, void 0, void 0, function* () {
    const SQLQuery = `
    SELECT Articulo
      ,Nombre
      ,Descripcion
      ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
        + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
    FROM Articulos
  `;
    return yield dinamicConn_1.default("remote", "bo", SQLQuery);
});
exports.selectArticulos = selectArticulos;
exports.default = analisiArticulosC;
//# sourceMappingURL=analisisArticulosC.js.map