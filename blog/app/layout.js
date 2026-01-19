import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Altzor Blog - AI-native Insights & Engineering Excellence",
  description: "Explore insights on AI-native engineering, data platforms, and modern product development from the Altzor team.",
  keywords: ["AI", "Data Engineering", "Product Engineering", "Altzor", "Blog"],
  authors: [{ name: "Altzor" }],
  openGraph: {
    title: "Altzor Blog",
    description: "AI-native insights and engineering excellence",
    type: "website",
    locale: "en_US",
    siteName: "Altzor Blog"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
