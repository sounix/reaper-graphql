
import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const env = process.env.NODE_ENV || "development";
const STATUS_ENV = process.env.NODE_ENV === "production" ? false : true;

if (STATUS_ENV) {
	console.debug(`NODE_ENV: ${process.env.NODE_ENV}`);
}

const server = new ApolloServer({
	typeDefs,
	// tslint:disable-next-line:object-literal-sort-keys
	resolvers,
	context: () => ({
		env,
		instrospection: STATUS_ENV,
		playground: STATUS_ENV,
	}),
});
server.listen(8080).then(({url}) => console.log(`🚀  Open: ${url}`));
