
import { gql } from "apollo-server";

const typeDefs = gql`
	scalar Date
	# Comments in GraphQL are defined with the hash (#) symbol.
	# This "Articulos" type can be used in other type declarations.
	type Articulos  @cacheControl(maxAge: 240) {
		Articulo: ID
		Nombre: String
		Descripcion: String
		Relacion: String
	}

	# Consulta para analisis de venta
	type AnalisiSuc @cacheControl(maxAge: 240) {
		Almacen: Int,
		Tienda: Int,
		DescripcionAlmacen: String,
		DescripcionTienda: String,
		Subfamilia: Int,
		Descripcion: String,
		VentaValorNeta: Float,
		NumVentas: Int
	}

	type typeArticuloProductos {
		Articulo: String
		CodigoBarras: String
		Nombre: String
		Descripcion: String
		Relacion: String
		Url: String
	}

	type ArticuloProductos {
		count: Int!
		Articulos: [typeArticuloProductos!]!
	}

	input ArticuloProductosWhereInput {
		Articulo: String
		Articulo_in: String
		CodigoBarras: String
		CodigoBarras_in: String
		Nombre: String

		"""Todos los valores que contenga la cadena. Ej: %coca%600%"""
		Nombre_like: String
	}

	enum ArticuloProductosOrderByInput {
		Articulo_ASC
		Articulo_DESC
		Nombre_ASC
		Nombre_DESC
	}

	type typeTiempoAire {
		Fecha: Date
		Articulo: String
		Nombre: String
		Precio: Float
		Cantidad: Int
		VentaNeta: Float
	}

	type TiempoAire {
		total: Float!
		Tipos: [typeTiempoAire!]!
	}

	input TiempoAireWhereInput {
		FechaInicio: Date!
		FechaFinal: Date!
	}

	enum TiempoAireOrderByInput {
		Fecha_ASC
		Fecha_DESC
		Cantidad_ASC
		Cantidad_DESC
		VentaNeta_ASC
		VentaNeta_DESC
	}

	# The "Query" type is the root of all GraphQL queries.
	# (A "Mutation" type will be covered later on.)
	type Query {
		articulos: [Articulos!]!,
		ventaAnoAnterior(suc:String, filter: String): [AnalisiSuc!]!,
		ventaAnoActual(suc: String, filter: String): [AnalisiSuc!]!,
		ventaTotalDia(suc: String): Float!,
		ventaTotalDiaAnoAnterior(suc: String): Float!,

		productos(where: ArticuloProductosWhereInput, orderBy: ArticuloProductosOrderByInput): ArticuloProductos!,
		ventatiempoaire(where: TiempoAireWhereInput!, orderBy: TiempoAireOrderByInput): TiempoAire!
	}

`;

export default typeDefs;
