"use client";
import { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 1000,
        }}
      />
    </>
  );
};

export default Providers;
