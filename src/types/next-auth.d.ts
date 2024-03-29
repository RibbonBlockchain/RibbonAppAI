import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface User {
    accessToken?: string;
  }

  interface Token {
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
  }
}
