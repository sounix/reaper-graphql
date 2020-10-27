
import { gql } from "apollo-server";
import {
	proveedorAddBitacora, proveedorAddCompra,
	proveedorAddWincaja, proveedoresAll,
} from "../controllers/ProveedoresController";

export default {
	resolvers: {
		Query: {
			proveedores: async (_: any, args: any) => await proveedoresAll(_, args),
		},
	},

	typeDef: gql`

        extend type Query {
            proveedores(where: ProveedorWhereInput!, orderBy: ProveedorOrderByInput): Proveedor!,
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
    `,

};
