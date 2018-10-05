"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function readConnection(i, tipo, suc) {
    // TODO
    const objConn = i.map((c) => {
        if (c.name === suc || c.suc === suc.toUpperCase()) {
            return c;
        }
    });
    console.log(objConn);
    return objConn;
}
exports.default = readConnection;
//# sourceMappingURL=dinamicConn.js.map