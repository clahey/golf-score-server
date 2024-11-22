import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

console.warn(`AUTH_URL: ${process.env.AUTH_URL}`)
export const { handlers, signIn, signOut, auth } =
    NextAuth({
        providers: [Google]
    })