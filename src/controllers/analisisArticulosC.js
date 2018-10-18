"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var moment_1 = require("moment");
var dinamicConn_1 = require("../SQL/dinamicConn");
var stadistics = function (suc) {
    // TODO
    console.log("hello");
};
/**
 *
 * @param tipo
 * @param suc
 * @param database
 */
var getVentaSubfamilia = function (tipo, suc, database, tienda, year) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _Tienda, neW, _SQLQUERY;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, dinamicConn_1["default"](tipo, suc, database ? database : undefined)];
            case 1:
                _a = _b.sent(), _Tienda = _a._Tienda, neW = _a.neW;
                _SQLQUERY = "\n    SELECT\n      xMA.Almacen\n      ,xMA.Tienda\n      ,xMA.DescripcionAlmacen\n      ,xMA.DescripcionTienda\n      ,zA.Subfamilia\n      ,ySF.Descripcion\n      ,SUM(xMA.VentaValorNeta) VentaValorNeta\n      ,COUNT(xMA.Articulo) NumVentas\n    FROM QxDeMovAlmacen AS xMA\n    LEFT JOIN Articulos AS zA ON zA.Articulo = xMA.Articulo\n    LEFT JOIN Subfamilias AS ySF ON ySF.Subfamilia = zA.Subfamilia\n    WHERE xMA.Tienda = " + (tienda ? tienda : _Tienda) + " AND TipoDocumento = 'V' AND Estatus = 'E'\n      AND CONVERT(DATE,xMA.Fecha) = CAST(DATEADD(YEAR, " + (year ? year : 0) + " ,GETDATE()) AS DATE)\n    GROUP BY zA.Subfamilia, ySF.Descripcion, xMA.Almacen\n      , xMA.Tienda, xMA.DescripcionAlmacen, xMA.DescripcionTienda\n    ORDER BY NumVentas DESC\n  ";
                return [4 /*yield*/, neW.rawQuery(_SQLQUERY)];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
/**
 *
 * @param date
 * @param tipo
 * @param suc
 */
var getDbLastDate = function (date, tipo, suc) { return __awaiter(_this, void 0, void 0, function () {
    var neW, lastDbName, _SQLQUERY, lastDb, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, dinamicConn_1["default"](tipo, suc)];
            case 1:
                neW = (_a.sent()).neW;
                lastDbName = neW.database + "_" + date;
                _SQLQUERY = "SELECT name FROM sys.databases AS A WHERE A.name = N'" + lastDbName + "'";
                return [4 /*yield*/, neW.rawQuery(_SQLQUERY)];
            case 2:
                lastDb = _a.sent();
                return [2 /*return*/, lastDb];
            case 3:
                e_1 = _a.sent();
                throw new Error("getDbDate:\t \n " + e_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param { object } obj
 * @param { suc: string } args
 * @param context
 * @param info
 */
function previousDetailVenta(obj, _a, context, info) {
    var suc = _a.suc;
    return __awaiter(this, void 0, void 0, function () {
        var e_2, lastDB, nameLastDb, e_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(suc === "vc" || "zr" || "ou" || "jl" || "bo")) return [3 /*break*/, 10];
                    if (!(moment_1["default"]().month() === moment_1["default"]("20171001").month() &&
                        suc === "jl" && moment_1["default"]("20171001").year() === moment_1["default"]().year() - 1)) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getVentaSubfamilia("remote", suc, "JALTIPAN2", 1, -1)];
                case 2: 
                // getVentaSubfamilia(type,sucursal,db,year)
                return [2 /*return*/, _b.sent()];
                case 3:
                    e_2 = _b.sent();
                    throw new Error("" + e_2);
                case 4: return [3 /*break*/, 9];
                case 5:
                    _b.trys.push([5, 8, , 9]);
                    return [4 /*yield*/, getDbLastDate("201808", "remote", suc)];
                case 6:
                    lastDB = _b.sent();
                    nameLastDb = lastDB[0];
                    return [4 /*yield*/, getVentaSubfamilia("remote", suc, nameLastDb.name, undefined, -1)];
                case 7: return [2 /*return*/, _b.sent()];
                case 8:
                    e_3 = _b.sent();
                    throw new Error("analisisArticulos: \n " + e_3);
                case 9: return [3 /*break*/, 11];
                case 10: throw new Error("Solo se aceptan valores como los sig: vc | zr | ou | jl | bo ");
                case 11: return [2 /*return*/];
            }
        });
    });
}
exports.previousDetailVenta = previousDetailVenta;
function latestDetailVenta(obj, _a, context, info) {
    var suc = _a.suc;
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(suc === "zr" || "vc" || "ou" || "jl")) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getVentaSubfamilia("remote", suc)];
                case 2: return [2 /*return*/, _b.sent()];
                case 3:
                    e_4 = _b.sent();
                    throw new Error("latestDetailVenta: \n " + e_4);
                case 4: return [3 /*break*/, 6];
                case 5: throw new Error("latestDetailVenta: \n");
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.latestDetailVenta = latestDetailVenta;
function getAllArticulos() {
    return __awaiter(this, void 0, void 0, function () {
        var _SQLQUERY, neW, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _SQLQUERY = "\n        SELECT Articulo\n          ,Nombre\n          ,Descripcion\n          ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '\n            + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'\n        FROM Articulos\n      ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, dinamicConn_1["default"]("remote", "bo")];
                case 2:
                    neW = (_a.sent()).neW;
                    return [4 /*yield*/, neW.rawQuery(_SQLQUERY)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    e_5 = _a.sent();
                    throw new Error("getAllArticulos:\n \t " + e_5);
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getAllArticulos = getAllArticulos;
