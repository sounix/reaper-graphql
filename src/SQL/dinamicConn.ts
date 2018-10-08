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
}

type Tsuc = "vc"|"zr"|"ou"|"jl"|"bo";
type Ttipo = "local" | "remote";

/**
 *
 * @param i
 * @param tipo
 * @param suc
 */
function readConnection(i: IreadConf[], tipo: Ttipo, suc: Tsuc) {
  let objConn: IreadConf | undefined;
  i.map((c) => {
    if (c.name === suc.toLowerCase() || c.suc === suc.toUpperCase()) {
      objConn = c;
      return;
    }
  });
  if (objConn) {
    const newDbConn = new db(objConn[tipo], objConn.database, objConn.user, objConn.pwd, objConn.port );
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
async function newRawQuery(tipo: Ttipo, suc: Tsuc, query: string) {
  // TODO
  const goDb = readConnection(conf, tipo, suc);
  if (goDb) {
    return goDb.rawQuery(query);
  }
  throw new Error("Lo sentimos no se ha podido crear la conexion");
}

export default newRawQuery;
