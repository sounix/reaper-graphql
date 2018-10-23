
import { gql } from "apollo-server";

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Articulos" type can be used in other type declarations.
  type Articulos {
    Articulo: ID
    Nombre: String
    Descripcion: String
    Relacion: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    articulos: [Articulos!]!,
    ventaAnoAnterior(suc:String): [AnalisiSuc!]!,
    ventaAnoActual(suc: String): [AnalisiSuc!]!,
    ventatotaldiaria(suc: String): [ventaTotalDiaria!]!,
  }

  # Consulta para analisis de venta
  type AnalisiSuc {
      Almacen: Int,
      Tienda: Int,
      DescripcionAlmacen: String,
      DescripcionTienda: String,
      Subfamilia: Int,
      Descripcion: String,
      VentaValorNeta: Float,
      NumVentas: Int
  }
  type ventaTotalDiaria {
    TOTAL: Float
  }
`;

export default typeDefs;

