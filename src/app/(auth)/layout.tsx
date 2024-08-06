import React from "react";
import AuthLayout from "@/containers/layout/auth/auth.layout";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => <AuthLayout>{children}</AuthLayout>;

export default Layout;
