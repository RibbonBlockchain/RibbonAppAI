import NextAuth, { NextAuthOptions } from "next-auth";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
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
          credentialType:
            profile["https://id.worldcoin.org/beta"].credential_type,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ account, user, credentials, email, profile }) {
      console.log("account", account, user, credentials, email, profile);
      return true;
    },

    async session({ session, newSession, token, trigger, user }) {
      console.log("session", session, newSession, token, trigger, user);
      return session;
    },

    async redirect({ baseUrl, url }) {
      console.log("baseurl", baseUrl, url);
      return "https://ribbon-app-ten.vercel.app/dashboard";
    },

    async jwt({ token }) {
      console.log("token", token);

      token.userRole = "admin";
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
