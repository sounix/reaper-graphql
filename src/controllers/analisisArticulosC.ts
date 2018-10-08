import newQuery from "../SQL/dinamicConn";

interface ISuc {
  suc: string;
}

type Tsuc = "vc"|"zr"|"ou"|"jl";
const stadistics = (suc: Tsuc) => {
  // TODO
};
async function analisiArticulosC(obj: any, { suc }: ISuc, context: any, info: any) {
  // TODO
  console.log(obj, suc, context, info);
  return suc;
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
