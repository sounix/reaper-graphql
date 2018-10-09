import Analisis, { getAllArticulos } from "../controllers/analisisArticulosC";
const Resolvers = {
  Query: {
    articulos: async () => await getAllArticulos(),
    metadiaria: async (obj: any, args: any, context: any, info: any) => await Analisis(obj, args, context, info),
  },
};

export default Resolvers;
