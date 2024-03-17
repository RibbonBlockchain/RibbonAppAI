"use client";

import React from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/loader";
import { getToken } from "@/lib/atoms/auth.atom";

type Props = { children: React.ReactNode };

const AuthLayout = ({ children }: Props) => {
  const token = getToken();
  const router = useRouter();
  const { data, isPending } = useGetAuth({ enabled: !!token });

  const isEnabled = !!token;
  const isServer = typeof token === "undefined";
  const isLoading = isServer || (isEnabled && isPending);

  React.useEffect(() => {
    if (isLoading) return;
    if (!data?.id) router.push("/");
  }, [data?.id, router, isLoading]);

  if (!token || isServer || isLoading) return <PageLoader />;

  return children;
};

export default AuthLayout;
