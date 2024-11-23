import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/typeDefs";
import { resolvers } from "./resolvers";
import { auth } from "@/auth";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: true,
});

const handler = startServerAndCreateNextHandler<NextRequest, {userId: string|null}>(
    server,
    {
        context: async (req, res) => {
            const session = await auth()
            return { req, res, userId: session?.user?.id ?? null }
        }
    }
)

export { handler as GET, handler as POST }