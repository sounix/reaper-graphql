
import { gql } from "apollo-server";
import db from "../SQL/bin";
import conf from "../SQL/confWincaja";
export default {
	resolvers: {
		Query: {
			productos: async (_: any, args: any) => await productosAll(_, args),
		},
	},

	typeDef: gql`

        extend type Query {
            productos(where: ProductoWhereInput!, orderBy: ProductoOrderByInput): Producto!,
        }

        type typeProducto {
            uuid: String
            Articulo: String
            CodigoBarras: String
            Nombre: String
            Descripcion: String
            Relacion: String
        }

        type Producto {
            count: Int!
            Productos: [typeProducto!]!
        }

        input ProductoWhereInput {
            Origen: ProductoOrigen!
            Nombre_like: String
        }

        enum ProductoOrigen {
            WINCAJA_BO
            WINCAJA_ZR
            WINCAJA_VC
            WINCAJA_OU
            WINCAJA_JL
        }

        # input ProveedorInsertInput {
        #     Origen: WincajaOrigen!
        #     Proveedor: ProveedorInput!
        # }

        # input ProveedorInput {
        #     cuenta: String!
        #     nombre: String!
        #     rfc: String!
        # }

        # enum WincajaOrigen {
        #     WINCAJA_BO
        #     WINCAJA_ZR
        #     WINCAJA_VC
        #     WINCAJA_OU
        #     WINCAJA_JL
        # }

        enum ProductoOrderByInput {
            Articulo_ASC
            Articulo_DESC
            Nombre_ASC
            Nombre_DESC
        }
    `,

};

async function productosAll(obj: any, args: any) {
	const { where } = args;

	if (where.Origen) {
		switch (where.Origen) {
			case "WINCAJA_BO":
				return WincajaOrigen(args, "BO");
			case "WINCAJA_ZR":
				return WincajaOrigen(args, "ZR");
			case "WINCAJA_VC":
				return WincajaOrigen(args, "VC");
			case "WINCAJA_OU":
				return WincajaOrigen(args, "OU");
			case "WINCAJA_JL":
				return WincajaOrigen(args, "JL");
			default:
				return WincajaOrigen(args, "BO");
		}
	} else {
		return WincajaOrigen(args, "BO");
	}
}

async function WincajaOrigen(args: any, suc: string) {
	const { where, orderBy } = args;
	let _SQLQUERY: string = `
		SELECT
            uuid = '',
            Articulo,
            CodigoBarras,
            Nombre,
            Descripcion,
            Relacion = '[' + CAST(CAST(FactorCompra AS INT) AS NVARCHAR) + 
                            UnidadCompra + '/' + CAST(CAST(FactorVenta AS INT) AS NVARCHAR) + 
                            UnidadVenta + ']'
		FROM Articulos
	`;

	if (where.Nombre_like) {
		const valor = where.Nombre_like;
		_SQLQUERY += ` WHERE Nombre LIKE '${valor}'`;
	}

	try {
		let _CONF;
		switch (suc) {
			case "BO":
				_CONF = conf.SPABODEGA;
				break;
			case "ZR":
				_CONF = conf.SPAZARAGOZA;
				break;
			case "VC":
				_CONF = conf.SPAVICTORIA;
				break;
			case "OU":
				_CONF = conf.SPAOLUTA;
				break;
			case "JL":
				_CONF = conf.SPAJALTIPAN;
				break;
			default:
				_CONF = conf.SPABODEGA;
				break;
		}
		const _MSSQL = new db(_CONF.host, _CONF.database, _CONF.user, _CONF.pwd, _CONF.port);
		const _PRODUCTOS = await _MSSQL.rawQuery(_SQLQUERY);
		// _PRODUCTOS.map((item: any) => {
		// 	item.uuid = item.Articulo;
		// });
		// console.log(_PRODUCTOS);
		return {
			count: _PRODUCTOS.length,
			// tslint:disable-next-line:object-literal-sort-keys
			Productos: _PRODUCTOS,
		};
	} catch (e) {
		throw new Error(`WincajaOrigen: \n ${e}`);
	}
}
