import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import TopLoadingBar from "@/components/top-loading-bar";
import { PageLoader } from "@/components/page-loader";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Avyyan Knitfab",
  description:
    "Avyyan Knitfab is a leading manufacturer of high-quality knitwear products for the fashion industry. Our company specializes in producing a wide range of knitwear items such as sweaters, cardigans, and knitted accessories that are known for their exceptional quality, durability, and stylish designs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <TopLoadingBar />
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
