
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const env = process.env.NODE_ENV || "development";
const STATUS_ENV = process.env.NODE_ENV === "production" ? false : true;
const link = createPersistedQueryLink().concat(createHttpLink({uri: "/graphql"}));

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
	cacheControl: true,
});
server.listen(8080).then(({url}) => console.log(`🚀  Open: ${url}`));
