"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
server.listen(8080).then(({ url }) => console.log(`🚀 Open: ${url}`));
//# sourceMappingURL=index.js.map