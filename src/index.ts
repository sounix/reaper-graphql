
import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const env = process.env.NODE_ENV || "development"
const status_env = process.env.NODE_ENV === "production" ? false : true;

if(status_env) {
    console.debug(`NODE_ENV: ${process.env.NODE_ENV}`)
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        env: env,
        instrospection: status_env,
        playground: status_env
    })
});
server.listen(8080).then(({url}) => console.log(`🚀  Open: ${url}`));
