import controller from "../controllers/analisisArticulosC";
const Resolvers = {
  Query: {
   async articulos() {
       return await controller();
      },
   async metadiaria(obj: any, { suc }: { suc: string }, context: any, info: any) {
        console.log(suc);
        return "hello";
      },
  },
};

export default Resolvers;
