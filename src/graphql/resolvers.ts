
import { getAllArticulos, previousDetailVenta, latestDetailVenta } from "../controllers/analisisArticulosC";

const Resolvers = {
  Query: {
    articulos: async () => await getAllArticulos(),
      ventaAnoAnterior: async (obj: any, args: any, context: any, info: any) => await previousDetailVenta(obj, args, context, info),
      ventaAnoActual: async (obj: any, args: any, context: any, info:any ) => await latestDetailVenta( obj, args, context, info ),
  },
};

export default Resolvers;
