import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"

import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-lexical/styles.css";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Provider } from "./Provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Deric Live Doc",
  description: "App for manage doc in live mode",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: { 
          colorPrimary: "#3371FF" ,
          fontSize: '16px'
        },
      }}
    >
      <html
        lang="en"
        className={cn("h-full", "antialiased", "font-sans", inter.variable)}
        suppressHydrationWarning
      >
        <body className="min-h-full flex flex-col">
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
