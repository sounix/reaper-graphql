
import moment from "moment";
import newQuery from "../SQL/dinamicConn";

interface ISuc {
  suc: "vc"|"zr"|"ou"|"jl";
}
type Tsuc = "vc"|"zr"|"ou"|"jl";
type Ttipo = "local" | "remote";

const stadistics = (suc: Tsuc) => {
  // TODO
};

const getVentaSubfamilia = async (tipo: Ttipo, suc: Tsuc, database: string) => {
  const { _Tienda, neW } = await newQuery(tipo, suc, database);
  const _SQLQ: string = `
    SELECT
      xMA.Almacen
      ,xMA.Tienda
      ,xMA.DescripcionAlmacen
      ,xMA.DescripcionTienda
      ,zA.Subfamilia
      ,ySF.Descripcion
      ,SUM(xMA.VentaValorNeta) VentaValorNeta
      ,COUNT(xMA.Articulo) NumVentas
    FROM QxDeMovAlmacen AS xMA
    LEFT JOIN Articulos AS zA ON zA.Articulo = xMA.Articulo
    LEFT JOIN Subfamilias AS ySF ON ySF.Subfamilia = zA.Subfamilia
    WHERE xMA.Tienda = ${_Tienda} AND TipoDocumento = 'V' AND Estatus = 'E'
      AND CONVERT(DATE,xMA.Fecha) = CAST(DATEADD(YEAR,-1,GETDATE()) AS DATE)
    GROUP BY zA.Subfamilia, ySF.Descripcion, xMA.Almacen
      , xMA.Tienda, xMA.DescripcionAlmacen, xMA.DescripcionTienda
    ORDER BY NumVentas DESC
  `;
  return await neW.rawQuery(_SQLQ);
};
interface ILastDB {
  name: string;
}
const getDbLastDate = async (date: string, tipo: Ttipo, suc: Tsuc): Promise<ILastDB[]> => {
  try {
    const today: any = moment().format("L");
    console.log(today);
    const { neW } = await newQuery(tipo, suc);
    const lastDbName: string = `${neW.database}_${date}`;
    const _SQLQUERY: string = `
      SELECT name FROM sys.databases AS A WHERE A.name = N'${lastDbName}'
      `;
    const lastDb: ILastDB[] = await neW.rawQuery(_SQLQUERY);
    return lastDb;
  } catch (e) {
    throw new Error(`getDbDate:\t \n ${e}`);
  }
};
/**
 *
 * @param { object } obj
 * @param { suc: string } args
 * @param context
 * @param info
 */

async function analisiArticulosC(obj: any, { suc }: ISuc, context: any, info: any) {
  if ( suc === "vc" || "zr" || "ou" || "jl" || "bo" ) {
    try {
      const lastDB = await getDbLastDate("201808", "remote", suc);
      const nameLastDb: ILastDB = lastDB[0];
      return await getVentaSubfamilia("remote", suc , nameLastDb.name);
    } catch (e) {
      throw new Error(`analisisArticulos: \n ${e}`);
    }
  } else {
    throw new Error("Solo se aceptan valores como los sig: vc | zr | ou | jl | bo ");
  }
}

const getAllArticulos = async () => {
  const _SQLQUERY: string = `
    SELECT Articulo
      ,Nombre
      ,Descripcion
      ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
        + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
    FROM Articulos
  `;
  try {
    const { neW } = await newQuery("remote", "bo");
    return await neW.rawQuery(_SQLQUERY);
  } catch (e) {
    throw new Error(`getAllArticulos:\n \t ${e}`);
  }
};

export default analisiArticulosC;
export {
  getAllArticulos,
};
