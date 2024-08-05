import React from "react";
import AuthLayout from "@/containers/layout/auth/auth.layout";

import FloatingIcon from "./dashboard/floating-icon";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => (
  <AuthLayout>
    {children}
    <FloatingIcon />
  </AuthLayout>
);

export default Layout;
