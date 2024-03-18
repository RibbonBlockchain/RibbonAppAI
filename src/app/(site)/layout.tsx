import React from "react";
import PublicAuthLayout from "@/containers/layout/auth/public-auth.layout";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => (
  <PublicAuthLayout>{children}</PublicAuthLayout>
);

export default Layout;
