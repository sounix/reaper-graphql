import fs from "fs";
import { makeExecutableSchema } from "graphql-tools";

// tslint:disable-next-line:max-line-length
const files = fs.readdirSync(__dirname).filter((file) => (file !== "index.js" && file.includes(".js") && !file.includes(".js.map")));

const schemas = files.map((file) => require("./" + file).default);

const schema = makeExecutableSchema({
	// tslint:disable-next-line:no-shadowed-variable
	resolvers: schemas.map((schema) => schema.resolvers),
	// tslint:disable-next-line:no-shadowed-variable
	typeDefs: schemas.map((schema) => schema.typeDef),
});

export default schema;
