import db from "./bin";

interface IreadConf {
  name: string;
  suc: string;
  port: number;
  user: string;
  pwd: string;
  database: string;
  remote: string;
  local: string | number;
}

function readConnection(i: IreadConf[], tipo: "local" | "remote", suc: "vc"|"zr"|"ou"|"jl"|"bo") {
  // TODO
  i.map((c) => {
    if (c.name === suc || c.suc === suc.toUpperCase()) {
      return c;
    }
  });
}

export default readConnection;
