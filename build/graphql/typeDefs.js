"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.
  type Articulos {
    Articulo: ID
    Nombre: String
    Descripcion: String,
    Relacion: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    articulos: [Articulos!]!,
    metadiaria(suc:String): String,
  }

  # Consulta para analisis de venta
  # type AnalisiSuc {
  #   # TODO
  # }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map