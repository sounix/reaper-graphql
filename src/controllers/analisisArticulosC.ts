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
    WHERE xMA.Tienda = 1
      AND CONVERT(DATE,xMA.Fecha) = CAST('20180108' AS DATE)
    GROUP BY zA.Subfamilia, ySF.Descripcion, xMA.Almacen
      , xMA.Tienda, xMA.DescripcionAlmacen, xMA.DescripcionTienda
    ORDER BY NumVentas DESC
  `;
  return await newQuery(tipo, suc, _SQLQ, database);
};

async function analisiArticulosC(obj: any, { suc }: ISuc, context: any, info: any) {
  // TODO
  if ( suc === "vc" || "zr" || "ou" || "jl" || "bo" ) {
    // TODOS
    return await getVentaSubfamilia("local", suc , "SPASUPER1_201808");
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
  return await newQuery("remote", "bo", _SQLQUERY);
};

export default analisiArticulosC;
export {
  getAllArticulos,
};
