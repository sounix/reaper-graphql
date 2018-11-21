
import { getAimDayofPreviousYear, getMetadelDia as getAimLatestSaleC } from "../controllers/getAimLatestSaleC";
import getAllArticlesC from "../controllers/getAllArticlesC";
import {
	getLatestDetailVenta as latestDetailVenta,
	getPreviousDetailVenta as previousDetailVenta,
} from "../controllers/saleAnalysisC";

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const resolverMap = {
  Date: new GraphQLScalarType({
	name: "Date",
	// tslint:disable-next-line:object-literal-sort-keys
	description: "Date custom scalar type",
	parseValue(value) {
		return new Date(value); // value from the client
	},
	serialize(value) {
		return value.getTime(); // value sent to the client
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
		return new Date(ast.value); // ast value is always in string format
		}
		return null;
	},
  }),
};

import productosAll from "../controllers/ProductosController";
import {
	proveedorAddBitacora, proveedorAddCompra,
	proveedorAddWincaja, proveedoresAll,
} from "../controllers/ProveedoresController";
import ventaTiempoAireAll from "../controllers/TiempoAireController";

const Resolvers = {
	Query: {
		articulos: async () => await getAllArticlesC(),
		ventaAnoActual: async (_: any, args: any) => await latestDetailVenta( _, args),
		ventaAnoAnterior: async (_: any, args: any) => await previousDetailVenta(_, args),
		ventaTotalDia:  async (_: any, args: any) =>  await getAimLatestSaleC(_, args),
		ventaTotalDiaAnoAnterior: async (_: any, args: any) => await getAimDayofPreviousYear(_, args),

		productos: async (_: any, args: any) => await productosAll(_, args),
		proveedores: async (_: any, args: any) => await proveedoresAll(_, args),
		ventatiempoaire: async (_: any, args: any) => await ventaTiempoAireAll(_, args),
	},
	// tslint:disable-next-line:object-literal-sort-keys
	Mutation: {
		proveedoraddbitacora: async (_: any, args: any) => await proveedorAddBitacora(_, args),
		proveedoraddcompra: async (_: any, args: any) => await proveedorAddCompra(_, args),
		proveedoraddwincaja: async (_: any, args: any) => await proveedorAddWincaja(_, args),
	},
};

export default Resolvers;
