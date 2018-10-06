import controller from "../controllers/analisisArticulosC";
const Resolvers = {
  Query: {
    articulos: async () => await controller(),
  },
};

export default Resolvers;
