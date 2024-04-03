import { worldIDLogin } from "@/api/auth/req";
import NextAuth, { NextAuthOptions } from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      idToken: true,
      type: "oauth",
      id: "worldcoin",
      name: "Worldcoin",
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      authorization: { params: { scope: "email profile openid" } },
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          accessToken: "",
          credentialType:
            profile["https://id.worldcoin.org/beta"].credential_type,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user }) {
      const token = await worldIDLogin({ id: user.id })
      console.log('token from server', token)
      user.accessToken = token.data.accessToken
      return true;
    },

    async session({ session, newSession, token, trigger, user }) {
      console.log("session", session, newSession, token, trigger, user);
      session.accessToken = "not seeing token here";
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },

    async jwt({ user, token }) {
      token.accessToken = user?.accessToken;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
