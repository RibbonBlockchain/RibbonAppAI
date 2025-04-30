"use client";

import AuthNavLayout from "@/containers/layout/auth/auth-nav.layout";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
}

const TimelinePage = () => {
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const embedded = window.location.pathname.includes("/embed");
      setIsEmbedded(embedded);
    }
  }, []);

  return (
    <AuthNavLayout>
      <div className={isEmbedded ? "embedded-view" : ""}>
        <iframe
          src="https://tymeline.replit.app/"
          width="100%"
          height="1000"
          allowFullScreen
        ></iframe>
      </div>
    </AuthNavLayout>
  );
};

export default TimelinePage;
