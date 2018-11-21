
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

	type typeProveedor {
		Cuenta: String
		Nombre: String
		RFC: String
	}

	type Proveedor {
		count: Int!
		Proveedores: [typeProveedor!]!
	}

	input ProveedorWhereInput {
		Origen: ProveedorOrigen!
		Cuenta: String
		# Compras_Cuenta_in: String
		# Compras_Nombre: String
		# Compras_Nombre_like: String
		# Compras_RFC: String
		# Compras_RFC_in: String
	}

	enum ProveedorOrigen {
		COMPRAS
		BITACORA
		WINCAJA_BO
		WINCAJA_ZR
		WINCAJA_VC
		WINCAJA_OU
		WINCAJA_JL
	}

	input ProveedorInsertInput {
		Origen: WincajaOrigen!
		Proveedor: ProveedorInput!
	}

	input ProveedorInput {
		cuenta: String!
		nombre: String!
		rfc: String!
	}

	enum WincajaOrigen {
		WINCAJA_BO
		WINCAJA_ZR
		WINCAJA_VC
		WINCAJA_OU
		WINCAJA_JL
	}

	enum ProveedorOrderByInput {
		Cuenta_ASC
		Cuenta_DESC
		Nombre_ASC
		Nombre_DESC
		RFC_ASC
		RFC_DESC
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
		ventatiempoaire(where: TiempoAireWhereInput!, orderBy: TiempoAireOrderByInput): TiempoAire!,
		proveedores(where: ProveedorWhereInput!, orderBy: ProveedorOrderByInput): Proveedor!,
	}

	type Mutation {
		proveedoraddcompra(cuenta: String!, nombre: String!, rfc: String!): Boleean!,
		proveedoraddbitacora(cuenta: String!, nombre: String!, rfc: String!): Boleean!,
		proveedoraddwincaja(insert: ProveedorInsertInput): Boleean!,
	}

`;

export default typeDefs;
