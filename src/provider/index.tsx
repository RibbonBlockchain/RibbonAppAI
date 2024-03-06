"use client";

import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./react-query.provider";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster />
    </ReactQueryProvider>
  );
};

export default RootProvider;
