import controller from "../controllers/analisisArticulosC";
const Resolvers = {
  Query: {
   async articulos() {
       return await controller();
      },
   async metadiaria(obj: any, args: any, context: any, info: any) {
        return "hello";
      },
  },
};

export default Resolvers;
