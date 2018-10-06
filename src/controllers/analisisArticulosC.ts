import newQuery from "../SQL/dinamicConn";

async function analisiArticulosC() {
  const SQLQuery: string = `
    SELECT Articulo
      ,Nombre
      ,Descripcion
      ,Relacion = '['+ CAST(CAST(FactorCompra AS INT) AS VARCHAR) + UnidadCompra + ' / '
        + CAST(CAST(FactorVenta AS INT) AS VARCHAR) + UnidadVenta +']'
    FROM Articulos
    `;
  return await newQuery("remote", "bo", SQLQuery);
}

const selectArticulos = async () => {
  // TODO
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
