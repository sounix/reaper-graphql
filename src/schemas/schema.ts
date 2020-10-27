
import { gql } from "apollo-server";

export default {
	typeDef: gql`
        type Query {
            _empty: String
        }
    `,
};
