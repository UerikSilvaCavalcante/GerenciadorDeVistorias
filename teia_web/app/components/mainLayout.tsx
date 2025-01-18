import NavBar from "./navBar";
import MainContent from "./mainContent";
import ClientProvider from "./clientProvider";

export default function MainLayout({
  children,
  id,
  width = "w-full",
}: Readonly<{
  children: React.ReactNode;
  id: string;
  width?: string;
}>) {
  return (
    <ClientProvider>
      <div className="h-full py-8 justify-start items-center flex flex-col bg-zinc-100">
        <NavBar id={id} />
        <MainContent width={width}>{children}</MainContent>
      </div>
    </ClientProvider>
  );
}
