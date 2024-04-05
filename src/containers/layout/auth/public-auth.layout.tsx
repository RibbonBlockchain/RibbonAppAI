"use client";

import React from "react";
import { useGetAuth } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PageLoader from "@/components/loader";
import { getToken } from "@/lib/atoms/auth.atom";

type Props = { children: React.ReactNode };

const PublicAuthLayout = ({ children }: Props) => {
  const token = getToken();
  const router = useRouter();
  const session = useSession();
  const [hasMounted, setHasMounted] = React.useState(false);
  const { data, isPending } = useGetAuth({ enabled: !!token });

  const isEnabled = !!token;
  const isServer = typeof token === "undefined";

  const noToken = !isServer && !token;
  const isLoggedIn = token && data?.id;
  const isLoading = isServer || (isEnabled && isPending);

  console.log(session);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  React.useEffect(() => {
    if (isLoading || noToken) return;
    if (data?.id) router.push("/dashboard");
  }, [data?.id, router, noToken, isLoading]);

  if (!hasMounted || isServer || isLoggedIn || isLoading) return <PageLoader />;

  return children;
};

export default PublicAuthLayout;
