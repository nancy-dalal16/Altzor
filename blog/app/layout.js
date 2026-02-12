import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

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
    siteName: "Altzor Blog",
    url: "https://altzor.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altzor Blog - AI-native Insights & Engineering Excellence",
    description: "Explore insights on AI-native engineering, data platforms, and modern product development.",
    site: "@Altzor",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
