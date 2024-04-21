"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ReactFlowProvider } from "reactflow";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReactFlowProvider>
        {children}
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 1000,
          }}
        />
      </ReactFlowProvider>
    </>
  );
};

export default Providers;
