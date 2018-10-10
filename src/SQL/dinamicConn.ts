import db from "./bin";
import conf from "./conf";

interface IreadConf {
  name: string;
  suc: string;
  port: number;
  user: string;
  pwd: string;
  database: string;
  remote: string;
  local: string;
  tienda: number;
  almacen: number;
}

interface INew {
  _Almacen: number;
  _Tienda: number;
  neW: db;
}

type Tsuc = "vc"|"zr"|"ou"|"jl"|"bo";
type Ttipo = "local" | "remote";

/**
 *
 * @param i
 * @param tipo
 * @param suc
 */
function readConnection(i: IreadConf[], tipo: Ttipo, suc: Tsuc, database?: string): INew {
  let objConn: IreadConf | undefined;
  i.map((c) => {
    if (c.name === suc.toLowerCase() || c.suc === suc.toUpperCase()) {
      objConn = c;
      return;
    }
  });
  if (objConn && database) {
    const newDbConn = new db(objConn[tipo], database, objConn.user, objConn.pwd, objConn.port );
    return {
      _Almacen: objConn.almacen,
      _Tienda: objConn.tienda,
      neW: newDbConn,
    };
  } else if (objConn && database === undefined ) {
    const newDbConn = new db(objConn[tipo], objConn.database , objConn.user, objConn.pwd, objConn.port );
    return {
      _Almacen: objConn.almacen,
      _Tienda: objConn.tienda,
      neW: newDbConn,
    };
  }
  throw new Error("Error al crear conexion");
}

/**
 *
 * @param tipo "local" | "remote"
 * @param suc "vc" | "zr" | "ou" | "jl" | "bo"
 * @param query "cadena SQL"
 * @param database si se define se esperara la base de datos del sistema | undefined
 */
async function newRawQuery(tipo: Ttipo, suc: Tsuc, database?: string): Promise<INew> {
  // TODO
  if ( database ) {
    const { _Almacen, _Tienda, neW } = readConnection(conf, tipo, suc, database);
    return {
      _Almacen,
      _Tienda,
      neW,
    };
  } else {
    // TODO
    const { _Almacen, _Tienda, neW } = readConnection(conf, tipo, suc);
    return {
      _Almacen,
      _Tienda,
      neW,
    };
  }
}
export default newRawQuery;
