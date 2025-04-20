import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "./actions/valid";
import { Toaster } from "./components/UI/sonner";
import Head from "./head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
    <Head title="Login"/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster richColors/>
        </AuthProvider>
      </body>
    </html>
  );
}
