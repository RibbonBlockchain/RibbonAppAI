import NextAuth, { NextAuthOptions } from "next-auth";
import { phoneLogin, worldIDLogin } from "@/api/auth/req";
import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      credentials: {},
      type: "credentials",
      async authorize(credentials: any) {
        const res = await phoneLogin({
          pin: credentials.pin,
          phone: credentials.phone,
        });

        const user = { id: res.data.id, accessToken: res.data.accessToken };

        if (user) return user;

        return null;
      },
    }),
    {
      idToken: true,
      type: "oauth",
      checks: "nonce",
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
    async signIn({ user, account }) {
      switch (account?.provider) {
        case "credentials": {
          if (!user.accessToken) throw new Error("Invalid Credentials");
          return true;
        }

        case "worldcoin": {
          const token = await worldIDLogin({ id: user.id });
          user.accessToken = token.data.accessToken;
          return true;
        }

        default: {
          return false;
        }
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },

    async jwt({ user, token }) {
      if (user?.accessToken) token.accessToken = user?.accessToken;
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
