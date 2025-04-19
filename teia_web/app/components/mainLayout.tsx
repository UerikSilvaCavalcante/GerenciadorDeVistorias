import NavBar from "./navBar";
import MainContent from "./mainContent";
import ClientProvider from "./clientProvider";
import Head from "../head";

export default function MainLayout({
  children,
  id,
  title,
  width = "w-full",
}: Readonly<{
  children: React.ReactNode;
  id: string;
  title:string;
  width?: string;
}>) {

  
  return (
    <ClientProvider>
      <Head title={title}/>
      <div className="h-full py-8 justify-start items-center flex flex-col bg-zinc-100">
        <NavBar id={id} />
        <MainContent width={width}>{children}</MainContent>
      </div>
    </ClientProvider>
  );
}
