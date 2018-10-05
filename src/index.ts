
import { ApolloServer } from 'apollo-server';
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const server = new ApolloServer({typeDefs, resolvers});
server.listen(8080).then(
  ({url}) => console.log(`🚀 Open: ${url}`)
)