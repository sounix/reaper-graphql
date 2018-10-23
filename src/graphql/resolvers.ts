
import { 
    getPreviousDetailVenta as previousDetailVenta, 
    getLatestDetailVenta as latestDetailVenta 
} from "../controllers/saleAnalysisC";
import getAllArticlesC from "../controllers/getAllArticlesC";
import getAimLatestSaleC from "../controllers/getAimLatestSaleC";
const Resolvers = {
    Query: {
        articulos: async () => await getAllArticlesC(),
        ventaAnoAnterior: async (obj: any, args: any, context: any, info: any) => await previousDetailVenta(obj, args, context, info),
        ventaAnoActual: async (obj: any, args: any, context: any, info:any ) => await latestDetailVenta( obj, args, context, info ),
        ventatotaldiaria:  async (obj: any, args: any, context: any, info: any) =>  await getAimLatestSaleC(obj, args, context, info),
    },
};

export default Resolvers;
