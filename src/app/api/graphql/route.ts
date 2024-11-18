import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: true,
});

const handler = startServerAndCreateNextHandler<NextRequest>(
    server, 
    {context: async req => ({req}),}
)

export { handler as GET, handler as POST }