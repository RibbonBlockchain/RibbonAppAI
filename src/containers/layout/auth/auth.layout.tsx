"use client";

import React from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/loader";
import { useSession } from "next-auth/react";

type Props = { children: React.ReactNode };

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.accessToken;
  const { data, isPending } = useGetAuth({ enabled: !!token });

  const isEnabled = !!token;
  const isLoading = (isEnabled && isPending) || session.status === "loading";

  React.useEffect(() => {
    if (isLoading) return;
    if (!data?.id) router.push("/");
  }, [data?.id, router, isLoading]);

  if (!token || isLoading) return <PageLoader />;

  return children;
};

export default AuthLayout;
