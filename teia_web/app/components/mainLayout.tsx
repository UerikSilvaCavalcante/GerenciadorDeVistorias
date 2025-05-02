"use client";
import NavBar from "./navBar";
import MainContent from "./mainContent";
import ClientProvider from "./clientProvider";
import Head from "../head";
import NavBarMobile from "./navBarMobile";
import React from "react";

export default function MainLayout({
  children,
  id,
  title,
  width = "w-full",
}: Readonly<{
  children: React.ReactNode;
  id: string;
  title: string;
  width?: string;
}>) {
  const [isMobile, setIsMobile] = React.useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ClientProvider>
      <Head title={title} />
      <div className="h-full py-8 justify-start items-center flex flex-col bg-zinc-100">
        {isMobile ? <NavBarMobile id={id} /> : <NavBar id={id} />}
        <MainContent width={width}>{children}</MainContent>
      </div>
    </ClientProvider>
  );
}
