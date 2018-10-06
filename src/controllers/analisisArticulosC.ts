import newQuery from "../SQL/dinamicConn";

type Tsuc = "vc"|"zr"|"ou"|"jl";
const stadistics = (suc: Tsuc) => ({});
async function analisiArticulosC() {
  // TODO
}

const selectArticulos = async () => {
  const SQLQuery: string = `
    SELECT Articulo
      ,Nombre
      ,Descripcion
      ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
        + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
    FROM Articulos
  `;
  return await newQuery("remote", "bo", SQLQuery);
};

export default analisiArticulosC;
export {
  selectArticulos,
};
