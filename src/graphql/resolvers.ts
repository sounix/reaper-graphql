
import conn from "../SQL/conf";
import fucts from "../SQL/dinamicConn";

const Resolvers = {
  Query: {
    books: () => fucts(conn, "local", "vc"),
  },
};

export default Resolvers;
