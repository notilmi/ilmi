import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ilmi a.k.a Terence",
    template: "%s | Ilmi a.k.a Terence",
  },
  description:
    "Software engineer specializing in Domain Driven Design and Test Driven Development.",
  openGraph: {
    title: "Ilmi a.k.a Terence",
    description:
      "Passionate about building scalable and maintainable applications. Posting about tech and my life",
    url: baseUrl,
    siteName: "Ilmi a.k.a Terence",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cx(fontSans.className, "antialiased max-w-2xl mx-4 mt-8 lg:mx-auto")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
