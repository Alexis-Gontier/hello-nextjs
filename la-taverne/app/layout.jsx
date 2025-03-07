import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-svh">
        <Header />
        <Toaster position="top-center" richColors expand={true} />
        <main className="flex-grow px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
