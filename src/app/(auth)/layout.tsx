import React from "react";
import AuthLayout from "@/containers/layout/auth/auth.layout";
import { CartProvider } from "@/provider/cart-context-provider";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => (
  <AuthLayout>
    <CartProvider>{children}</CartProvider>
  </AuthLayout>
);

export default Layout;
