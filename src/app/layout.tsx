import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import Navbar from "../components/Navbar";
import { Provider } from "../components/Providers";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
})


export const metadata: Metadata = {
  title: "StudyWithNotes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(lexend.className, 'antialiased min-h-screen pt-16')}
      >
        <Provider>
          <Navbar/>
          {children}
        </Provider>
        
      </body>
    </html>
  );
}
