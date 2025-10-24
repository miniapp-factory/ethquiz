import { localFont } from "next/font/local";
import { MiniAppProvider } from "@/components/MiniAppProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = localFont({
  src: "./InterVariable.ttf",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground">
        <MiniAppProvider>
          <Header />
          <main className="flex flex-col min-h-screen">{children}</main>
          <Footer />
        </MiniAppProvider>
      </body>
    </html>
  );
}
