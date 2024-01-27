import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connect from "../../../lib/db"
import User from '../../../models/user'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({user, account}) {

      if (account.provider === 'google' || account.provider === 'github') {
        try {
          await connect()

          const userExists = await User.findOne({ email: user.email })

          if (!userExists) {
            const res = await fetch("http:localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                imageUrl: user.image,
                provider: account.provider,
              }),
            });
  
            if(res.ok) {
              return user
            }
          }
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      }
      return user
    }
  }
});

export { handler as GET, handler as POST };