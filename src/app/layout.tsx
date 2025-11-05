import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import CartProvider from "@/contexts/CartProvider";
import LoadingBar from "@/components/LoadingBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alanSans = localFont({
  src: "../fonts/AlanSans.ttf",
  variable: "--font-alan"
});

export const metadata = {
  title: "RevoShop",
  description: "Welcome to RevoShop, a fictional e-commerce web built by Ahmadrka.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          // dangerouslySetInnerHTML={{
          //   __html: `
          //     (function() {
          //       const savedTheme = localStorage.getItem("theme");
          //       const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          //       const theme = savedTheme || (prefersDark ? "dark" : "light");
          //       document.documentElement.setAttribute("theme", theme);
          //     })();
          //   `,
          // }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${alanSans.variable}`}>
        <CartProvider>
          <LoadingBar />
          <Navbar />
          <main style={{flex: 1}}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
