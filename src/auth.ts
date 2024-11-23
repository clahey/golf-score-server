import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google";
import { getDbClient } from "./mongodb/client";

export const { handlers, signIn, signOut, auth } =
    NextAuth({
        adapter: MongoDBAdapter(getDbClient, {
            databaseName: "GolfScoreServer",
            collections: {
                Accounts: "Accounts",
                Users: "Users",
                Sessions: "Sessions",
                VerificationTokens: "VerificationTokens",
            }
        }),
        providers: [Google],
        callbacks: {
            session: async ({ session, user }) => {
                if (session?.user && user.id) {
                    session.user.id = user.id;
                }
                return session;
            },
        },
    })