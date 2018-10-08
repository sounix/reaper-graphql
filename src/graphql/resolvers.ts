import Analisis, { getAllArticulos } from "../controllers/analisisArticulosC";
const Resolvers = {
  Query: {
    articulos: async () => await getAllArticulos(),
    metadiaria: (obj: any, args: any, context: any, info: any) => Analisis(obj, args, context, info),
  },
};

export default Resolvers;
